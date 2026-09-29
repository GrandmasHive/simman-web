// Server-only sales-team auth: username/password login + signed session cookie.
//
// Users come from env TEAM_USERS, a comma-separated list of
// "username:saltHex:hashHex" entries. The hash is
// scrypt(password, salt, 64, { N: 16384, r: 8, p: 1 }). Generate entries with
// `node scripts/team-user.mjs <username> <password>`.
//
// Sessions are a signed, stateless cookie (TEAM_COOKIE):
//   base64url(JSON.stringify({ u, exp })) + "." + base64url(HMAC-SHA256(TEAM_SESSION_SECRET, payloadPart))
// readSession() verifies the signature (timing-safe), the expiry, AND that the
// username still appears in TEAM_USERS — so removing a user from the env
// immediately revokes any session they already hold.
//
// FAIL CLOSED: if TEAM_SESSION_SECRET is missing/short, or TEAM_USERS is
// empty, verifyPassword/createSessionToken/readSession all refuse — nobody
// can log in and no existing token verifies.

import { cookies } from "next/headers";
import {
  createHmac,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";

export const TEAM_COOKIE = "sm_team";

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const MIN_SECRET_LENGTH = 32;

// scrypt params — must match scripts/team-user.mjs exactly, or every hash mismatches.
const SCRYPT_KEYLEN = 64;
const SCRYPT_OPTS = { N: 16384, r: 8, p: 1 } as const;

type TeamUserRecord = { username: string; salt: Buffer; hash: Buffer };
type SessionPayload = { u: string; exp: number };

function parseTeamUsers(): Map<string, TeamUserRecord> {
  const raw = process.env.TEAM_USERS ?? "";
  const map = new Map<string, TeamUserRecord>();

  for (const entry of raw.split(",")) {
    const trimmed = entry.trim();
    if (!trimmed) continue;

    const parts = trimmed.split(":");
    if (parts.length !== 3) continue;
    const [rawUsername, saltHex, hashHex] = parts;
    const username = rawUsername.trim().toLowerCase();
    if (!username || !saltHex || !hashHex) continue;

    try {
      const salt = Buffer.from(saltHex, "hex");
      const hash = Buffer.from(hashHex, "hex");
      if (salt.length === 0 || hash.length === 0) continue;
      map.set(username, { username, salt, hash });
    } catch {
      continue; // malformed hex — skip rather than crash the whole list
    }
  }

  return map;
}

function getSessionSecret(): Buffer | null {
  const secret = process.env.TEAM_SESSION_SECRET;
  if (!secret || secret.length < MIN_SECRET_LENGTH) return null;
  return Buffer.from(secret, "utf8");
}

function b64urlEncode(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf.toString("base64url");
}

function b64urlDecode(input: string): Buffer | null {
  try {
    return Buffer.from(input, "base64url");
  } catch {
    return null;
  }
}

/**
 * Verify a username/password pair against TEAM_USERS. Fails closed: an
 * unconfigured secret or an empty user list means every check returns false.
 */
export function verifyPassword(username: string, password: string): boolean {
  if (!getSessionSecret()) return false; // no secret => no usable session anyway

  const users = parseTeamUsers();
  if (users.size === 0) return false;

  const record = users.get(username.trim().toLowerCase());
  if (!record) return false;

  let derived: Buffer;
  try {
    derived = scryptSync(password, record.salt, SCRYPT_KEYLEN, SCRYPT_OPTS);
  } catch {
    return false;
  }

  if (derived.length !== record.hash.length) return false;
  return timingSafeEqual(derived, record.hash);
}

/**
 * Mint a signed session token for a verified username. Throws if
 * TEAM_SESSION_SECRET isn't configured — callers should only reach this
 * after verifyPassword() has already succeeded.
 */
export function createSessionToken(username: string): string {
  const secret = getSessionSecret();
  if (!secret) throw new Error("TEAM_SESSION_SECRET not configured");

  const payload: SessionPayload = {
    u: username.trim().toLowerCase(),
    exp: Date.now() + SESSION_TTL_MS,
  };
  const payloadPart = b64urlEncode(JSON.stringify(payload));
  const sig = createHmac("sha256", secret).update(payloadPart).digest();
  const sigPart = b64urlEncode(sig);

  return `${payloadPart}.${sigPart}`;
}

/**
 * Verify + decode a session token. Pure function (no cookie access) so it
 * works in Proxy, Route Handlers, and Server Components alike. Returns null
 * on any failure: bad shape, bad signature, expiry, missing secret, empty
 * TEAM_USERS, or a username no longer present in TEAM_USERS.
 */
export function readSession(
  token: string | undefined | null
): { username: string } | null {
  if (!token) return null;

  const secret = getSessionSecret();
  if (!secret) return null; // fail closed

  const dotIndex = token.indexOf(".");
  if (dotIndex <= 0 || dotIndex === token.length - 1) return null;
  const payloadPart = token.slice(0, dotIndex);
  const sigPart = token.slice(dotIndex + 1);

  const providedSig = b64urlDecode(sigPart);
  if (!providedSig) return null;

  const expectedSig = createHmac("sha256", secret).update(payloadPart).digest();
  if (providedSig.length !== expectedSig.length) return null;
  if (!timingSafeEqual(providedSig, expectedSig)) return null;

  const payloadBuf = b64urlDecode(payloadPart);
  if (!payloadBuf) return null;

  let payload: Partial<SessionPayload>;
  try {
    payload = JSON.parse(payloadBuf.toString("utf8"));
  } catch {
    return null;
  }
  if (typeof payload.u !== "string" || typeof payload.exp !== "number") {
    return null;
  }
  if (!Number.isFinite(payload.exp) || Date.now() > payload.exp) return null;

  // Fail closed + live revocation: the user must still exist in TEAM_USERS.
  const users = parseTeamUsers();
  if (users.size === 0) return null;
  if (!users.has(payload.u)) return null;

  return { username: payload.u };
}

/**
 * Read the session cookie via next/headers `cookies()` (Server Components /
 * Route Handlers only — NOT Proxy, which doesn't have that API). Returns the
 * logged-in username, or null.
 */
export async function getTeamUser(): Promise<string | null> {
  const store = await cookies();
  const token = store.get(TEAM_COOKIE)?.value;
  const session = readSession(token);
  return session?.username ?? null;
}
