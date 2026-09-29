#!/usr/bin/env node
// Sales-team credential generator. Plain Node, no deps.
//
// Usage:
//   node scripts/team-user.mjs <username> <password>
//     Prints a "username:saltHex:hashHex" entry for the TEAM_USERS env var
//     (comma-separate multiple entries). Hash = scrypt(password, salt, 64,
//     { N: 16384, r: 8, p: 1 }) — must match src/lib/team-auth.ts exactly.
//
//   node scripts/team-user.mjs --secret
//     Prints a random 48-byte base64url string for TEAM_SESSION_SECRET.

import { randomBytes, scryptSync } from "node:crypto";

const SALT_BYTES = 16;
const SCRYPT_KEYLEN = 64;
const SCRYPT_OPTS = { N: 16384, r: 8, p: 1 };
const SECRET_BYTES = 48;

const args = process.argv.slice(2);

if (args[0] === "--secret") {
  console.log(randomBytes(SECRET_BYTES).toString("base64url"));
  process.exit(0);
}

const [username, password] = args;
if (!username || !password) {
  console.error("Usage:");
  console.error("  node scripts/team-user.mjs <username> <password>");
  console.error("  node scripts/team-user.mjs --secret");
  process.exit(1);
}

const salt = randomBytes(SALT_BYTES);
const hash = scryptSync(password, salt, SCRYPT_KEYLEN, SCRYPT_OPTS);

console.log(`${username.trim().toLowerCase()}:${salt.toString("hex")}:${hash.toString("hex")}`);
