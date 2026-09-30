// Each rep's contact details (Settings), saved with their login so they follow
// the rep to any device. Server only.
//
// Where they live:
//   - Vercel Blob (a private store) when BLOB_READ_WRITE_TOKEN is set. One small
//     JSON file per rep: profiles/<username>.json.
//   - A local file (.data/profiles.json, gitignored) when running on a laptop.
//   - Nowhere on Vercel without the token: reading returns the company default
//     and saving says "not switched on", so nothing is silently lost.

import { del, get, put } from "@vercel/blob";
import { promises as fs } from "node:fs";
import path from "node:path";
import { COMPANY_CONTACT, type Contact, checkContact } from "@/lib/proposal/contact";

const USERNAME = /^[a-z0-9_-]{1,32}$/;
const FILE = path.join(process.cwd(), ".data", "profiles.json");

export type Profile = {
  contact: Contact;
  /** True when the rep hasn't saved their own yet: proposals use the company default. */
  isDefault: boolean;
  /** Whether saving works in this environment. */
  canSave: boolean;
};

const blobStore = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const fileStore = () => !blobStore() && !process.env.VERCEL;
export const canSaveProfiles = () => blobStore() || fileStore();

const blobPath = (u: string) => `profiles/${u}.json`;

async function readFileStore(): Promise<Record<string, unknown>> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Record<string, unknown>;
  } catch {
    return {};
  }
}

async function readRaw(username: string): Promise<unknown | null> {
  if (blobStore()) {
    const res = await get(blobPath(username), { access: "private", useCache: false });
    if (!res || res.statusCode !== 200) return null;
    return JSON.parse(await new Response(res.stream).text());
  }
  if (fileStore()) return (await readFileStore())[username] ?? null;
  return null;
}

/** The rep's saved details, or the company default. Never throws: a store
 *  hiccup must not stop a rep making a proposal. */
export async function getProfile(username: string): Promise<Profile> {
  const fallback: Profile = { contact: COMPANY_CONTACT, isDefault: true, canSave: canSaveProfiles() };
  if (!USERNAME.test(username)) return fallback;
  try {
    const raw = await readRaw(username);
    const checked = raw ? checkContact(raw) : null;
    if (checked?.ok) return { contact: checked.contact, isDefault: false, canSave: canSaveProfiles() };
  } catch (err) {
    console.error("[team-profile] read failed:", err);
  }
  return fallback;
}

export type SaveResult = { ok: true; profile: Profile } | { ok: false; error: string; status: number };

export async function saveProfile(username: string, raw: unknown): Promise<SaveResult> {
  if (!USERNAME.test(username)) return { ok: false, error: "Unknown user.", status: 400 };
  if (!canSaveProfiles()) {
    return { ok: false, error: "Saving isn't switched on yet. Ask Shaun to switch it on.", status: 503 };
  }
  const checked = checkContact(raw);
  if (!checked.ok) return { ok: false, error: checked.error, status: 400 };
  try {
    if (blobStore()) {
      await put(blobPath(username), JSON.stringify(checked.contact), {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
    } else {
      const all = await readFileStore();
      all[username] = checked.contact;
      await fs.mkdir(path.dirname(FILE), { recursive: true });
      await fs.writeFile(FILE, JSON.stringify(all, null, 2), "utf8");
    }
  } catch (err) {
    console.error("[team-profile] save failed:", err);
    return { ok: false, error: "Couldn't save your details. Try again in a minute.", status: 502 };
  }
  return { ok: true, profile: { contact: checked.contact, isDefault: false, canSave: true } };
}

/** Back to the company default. */
export async function resetProfile(username: string): Promise<SaveResult> {
  if (!USERNAME.test(username)) return { ok: false, error: "Unknown user.", status: 400 };
  if (!canSaveProfiles()) {
    return { ok: false, error: "Saving isn't switched on yet. Ask Shaun to switch it on.", status: 503 };
  }
  try {
    if (blobStore()) {
      await del(blobPath(username));
    } else {
      const all = await readFileStore();
      delete all[username];
      await fs.mkdir(path.dirname(FILE), { recursive: true });
      await fs.writeFile(FILE, JSON.stringify(all, null, 2), "utf8");
    }
  } catch (err) {
    console.error("[team-profile] reset failed:", err);
    return { ok: false, error: "Couldn't reset. Try again in a minute.", status: 502 };
  }
  return { ok: true, profile: { contact: COMPANY_CONTACT, isDefault: true, canSave: true } };
}
