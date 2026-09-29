import { NextResponse } from "next/server";
import { getTeamUser } from "@/lib/team-auth";

// Sales-team lead lookup. The sales team logs calls as NOTES on HubSpot
// contacts (most leads have no deal yet), so a "lead" here is a contact plus
// its call notes, plus its deal if one exists. Website demo requests arrive as
// deals, so deals are searched too. Read-only.
// Session is enforced by Proxy already (src/proxy.ts); checked again here per
// the Next.js authentication guide's defence-in-depth advice.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;
const HUBSPOT_BASE = "https://api.hubapi.com";
const MAX_RESULTS = 15;
const MAX_NOTES = 8;

const DEAL_PROPERTIES = ["dealname", "dealstage", "createdate", "amount", "description"];
const CONTACT_PROPERTIES = ["firstname", "lastname", "email", "phone", "company", "createdate", "notes_last_updated"];

type HsObject = { id: string; properties: Record<string, string | null> };
type ObjectType = "contacts" | "deals" | "notes" | "calls" | "meetings";

type Contact = { id: string; firstname: string; lastname: string; email: string; phone: string; company: string };
type Deal = { dealId: string; dealName: string; stage: string; createdAt: string; amount: string | null; description: string };
type Note = { id: string; at: string; kind: "note" | "call" | "meeting"; text: string };
type Lead = { key: string; contact: Contact | null; deal: Deal | null; notes: Note[]; lastActivity: string };

async function hubspotJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${HUBSPOT_BASE}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${HUBSPOT_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  // Never forward HubSpot's error body: it can echo request context.
  if (!res.ok) throw new Error(`HubSpot ${path} responded ${res.status}`);
  return (await res.json()) as T;
}

async function search(type: "contacts" | "deals", body: Record<string, unknown>): Promise<HsObject[]> {
  const json = await hubspotJson<{ results?: HsObject[] }>(`/crm/v3/objects/${type}/search`, { limit: MAX_RESULTS, ...body });
  return json.results ?? [];
}

async function batchRead(type: ObjectType, ids: string[], properties: string[]): Promise<Map<string, HsObject>> {
  const map = new Map<string, HsObject>();
  for (let i = 0; i < ids.length; i += 100) {
    const chunk = ids.slice(i, i + 100);
    const json = await hubspotJson<{ results?: HsObject[] }>(`/crm/v3/objects/${type}/batch/read`, {
      properties,
      inputs: chunk.map((id) => ({ id })),
    });
    for (const o of json.results ?? []) map.set(o.id, o);
  }
  return map;
}

/** v4 batch association read: fromId -> associated ids of toType. */
async function associations(from: ObjectType, to: ObjectType, ids: string[]): Promise<Map<string, string[]>> {
  const map = new Map<string, string[]>();
  if (ids.length === 0) return map;
  const json = await hubspotJson<{ results?: Array<{ from: { id: string }; to?: Array<{ toObjectId: string | number }> }> }>(
    `/crm/v4/associations/${from}/${to}/batch/read`,
    { inputs: ids.map((id) => ({ id })) },
  );
  for (const e of json.results ?? []) map.set(String(e.from.id), (e.to ?? []).map((t) => String(t.toObjectId)));
  return map;
}

/** HubSpot note bodies are HTML. Keep line breaks, drop tags, decode entities. */
function htmlToText(html: string): string {
  return html
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h\d)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim();
}

const toContact = (c: HsObject): Contact => ({
  id: c.id,
  firstname: c.properties.firstname ?? "",
  lastname: c.properties.lastname ?? "",
  email: c.properties.email ?? "",
  phone: c.properties.phone ?? "",
  company: c.properties.company ?? "",
});

const toDeal = (d: HsObject): Deal => ({
  dealId: d.id,
  dealName: d.properties.dealname ?? "",
  stage: d.properties.dealstage ?? "",
  createdAt: d.properties.createdate ?? "",
  amount: d.properties.amount ?? null,
  description: d.properties.description ?? "",
});

async function findLeads(q: string): Promise<Lead[]> {
  // 1. Matching contacts and deals. With no search text: the contacts with the
  //    most recent call notes, plus the most recent deals.
  const [contacts, deals] = await Promise.all([
    q
      ? search("contacts", { query: q, properties: CONTACT_PROPERTIES })
      : search("contacts", {
          filterGroups: [{ filters: [{ propertyName: "notes_last_updated", operator: "HAS_PROPERTY" }] }],
          sorts: [{ propertyName: "notes_last_updated", direction: "DESCENDING" }],
          properties: CONTACT_PROPERTIES,
        }),
    search("deals", {
      ...(q ? { query: q } : {}),
      sorts: [{ propertyName: "createdate", direction: "DESCENDING" }],
      properties: DEAL_PROPERTIES,
    }),
  ]);

  const contactById = new Map(contacts.map((c) => [c.id, c]));
  const dealById = new Map(deals.map((d) => [d.id, d]));

  // 2. Link deals and contacts both ways, then fetch whatever is missing.
  const [dealToContacts, contactToDeals] = await Promise.all([
    associations("deals", "contacts", [...dealById.keys()]),
    associations("contacts", "deals", [...contactById.keys()]),
  ]);
  const missingContacts = [...dealToContacts.values()].map((ids) => ids[0]).filter((id) => id && !contactById.has(id));
  const missingDeals = [...contactToDeals.values()].map((ids) => ids[0]).filter((id) => id && !dealById.has(id));
  const [moreContacts, moreDeals] = await Promise.all([
    batchRead("contacts", [...new Set(missingContacts)], CONTACT_PROPERTIES),
    batchRead("deals", [...new Set(missingDeals)], DEAL_PROPERTIES),
  ]);
  for (const [id, c] of moreContacts) contactById.set(id, c);
  for (const [id, d] of moreDeals) dealById.set(id, d);

  // 3. One lead per contact; deals with no contact become their own lead.
  const leads = new Map<string, { contactId: string | null; dealId: string | null }>();
  for (const id of contactById.keys()) leads.set(`c:${id}`, { contactId: id, dealId: contactToDeals.get(id)?.[0] ?? null });
  for (const id of dealById.keys()) {
    const cid = dealToContacts.get(id)?.[0];
    if (cid) {
      const lead = leads.get(`c:${cid}`) ?? { contactId: cid, dealId: null };
      lead.dealId = lead.dealId ?? id;
      leads.set(`c:${cid}`, lead);
    } else {
      leads.set(`d:${id}`, { contactId: null, dealId: id });
    }
  }

  // 4. Call notes (and any logged calls or meetings) for every lead.
  const contactIds = [...leads.values()].map((l) => l.contactId).filter((x): x is string => !!x);
  const dealIds = [...leads.values()].map((l) => l.dealId).filter((x): x is string => !!x);
  const kinds = [
    ["notes", ["hs_note_body", "hs_timestamp"]],
    ["calls", ["hs_call_title", "hs_call_body", "hs_timestamp"]],
    ["meetings", ["hs_meeting_title", "hs_meeting_body", "hs_internal_meeting_notes", "hs_timestamp"]],
  ] as const;
  const notesByKey = new Map<string, Note[]>();
  for (const [type, props] of kinds) {
    const [fromContacts, fromDeals] = await Promise.all([
      associations("contacts", type, contactIds),
      associations("deals", type, dealIds),
    ]);
    const ids = new Set<string>([...fromContacts.values(), ...fromDeals.values()].flat());
    const objects = await batchRead(type, [...ids], [...props]);
    const kind = type === "notes" ? "note" : type === "calls" ? "call" : "meeting";
    const add = (key: string, id: string) => {
      const o = objects.get(id);
      if (!o) return;
      const p = o.properties;
      const title = p.hs_call_title || p.hs_meeting_title || "";
      const body = htmlToText(p.hs_note_body || p.hs_call_body || p.hs_meeting_body || p.hs_internal_meeting_notes || "");
      const text = [title, body].filter(Boolean).join(": ");
      if (!text) return;
      const list = notesByKey.get(key) ?? [];
      if (!list.some((n) => n.id === id)) list.push({ id, at: p.hs_timestamp ?? "", kind, text });
      notesByKey.set(key, list);
    };
    for (const [key, lead] of leads) {
      if (lead.contactId) for (const id of fromContacts.get(lead.contactId) ?? []) add(key, id);
      if (lead.dealId) for (const id of fromDeals.get(lead.dealId) ?? []) add(key, id);
    }
  }

  // 5. Shape, newest activity first.
  const out: Lead[] = [...leads].map(([key, l]) => {
    const c = l.contactId ? contactById.get(l.contactId) : undefined;
    const d = l.dealId ? dealById.get(l.dealId) : undefined;
    const notes = (notesByKey.get(key) ?? []).sort((a, b) => Date.parse(b.at) - Date.parse(a.at)).slice(0, MAX_NOTES);
    const times = [notes[0]?.at, c?.properties.notes_last_updated, d?.properties.createdate, c?.properties.createdate]
      .map((t) => Date.parse(t ?? ""))
      .filter((t) => !Number.isNaN(t));
    return {
      key,
      contact: c ? toContact(c) : null,
      deal: d ? toDeal(d) : null,
      notes,
      lastActivity: times.length ? new Date(Math.max(...times)).toISOString() : "",
    };
  });
  out.sort((a, b) => Date.parse(b.lastActivity || "0") - Date.parse(a.lastActivity || "0"));
  return out.slice(0, MAX_RESULTS);
}

// POST with the search text in the body, so names and phone numbers never land
// in URLs (and so never in hosting request logs).
export async function POST(request: Request) {
  const username = await getTeamUser();
  if (!username) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  if (!HUBSPOT_TOKEN) return NextResponse.json({ ok: false, error: "HubSpot is not configured" }, { status: 502 });

  let q = "";
  try {
    const body = (await request.json()) as { q?: unknown };
    q = typeof body.q === "string" ? body.q.trim().slice(0, 200) : "";
  } catch {
    /* empty or invalid body = most recent leads */
  }

  try {
    return NextResponse.json({ ok: true, leads: await findLeads(q) });
  } catch (err) {
    console.error("[api/team/hubspot/search]", err);
    return NextResponse.json({ ok: false, error: "HubSpot request failed" }, { status: 502 });
  }
}
