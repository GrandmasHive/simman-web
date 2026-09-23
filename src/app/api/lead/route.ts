import { NextResponse } from "next/server";

// This route runs server-side on Vercel so the HubSpot token never reaches the
// browser. It does two independent things per lead and never lets one failure
// kill the other:
//   1. Upsert a HubSpot Contact + create a Deal in the sales pipeline (realtime CRM).
//   2. Send the Web3Forms email notification (preserves the pre-existing behaviour).
// The client (demo-form.tsx) posts here; if this endpoint is unreachable or 500s,
// the form falls back to posting Web3Forms directly, so a lead is never dropped.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;
const HUBSPOT_BASE = "https://api.hubapi.com";

// Deal pipeline + entry stage (verified via the pipelines API 2026-09-24).
const DEAL_PIPELINE = "default";
const DEAL_STAGE = "appointmentscheduled";
// HubSpot-defined association: Deal -> Contact.
const DEAL_TO_CONTACT_TYPE_ID = 3;

// Web3Forms email notification. Public key by design; env overrides if set.
const WEB3FORMS_ACCESS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY ?? "436ad4a1-8628-4d57-9e21-c5ae4c3366e3";

type LeadInput = {
  name?: string;
  email?: string;
  phone?: string;
  properties?: string; // "Company / Total Listings" field on the form
  message?: string;
  // "demo" (default) = hot lead → Contact + Deal on the sales pipeline.
  // "resource" = content download → Contact only, so the pipeline stays clean.
  kind?: "demo" | "resource";
  subject?: string; // email notification subject (passthrough)
};

function splitName(full?: string): { firstname: string; lastname: string } {
  const parts = (full ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstname: "", lastname: "" };
  if (parts.length === 1) return { firstname: parts[0], lastname: "" };
  return { firstname: parts[0], lastname: parts.slice(1).join(" ") };
}

async function hubspot(path: string, init: RequestInit) {
  return fetch(`${HUBSPOT_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${HUBSPOT_TOKEN}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

async function findContactId(email: string): Promise<string | null> {
  const res = await hubspot("/crm/v3/objects/contacts/search", {
    method: "POST",
    body: JSON.stringify({
      filterGroups: [
        { filters: [{ propertyName: "email", operator: "EQ", value: email }] },
      ],
      properties: ["email"],
      limit: 1,
    }),
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json?.results?.[0]?.id ?? null;
}

async function upsertContact(lead: LeadInput): Promise<string> {
  const { firstname, lastname } = splitName(lead.name);
  const properties: Record<string, string> = {
    email: lead.email!,
    lifecyclestage: "lead",
    hs_lead_status: "NEW",
  };
  if (firstname) properties.firstname = firstname;
  if (lastname) properties.lastname = lastname;
  if (lead.phone) properties.phone = lead.phone;
  if (lead.properties) properties.company = lead.properties;

  const existingId = await findContactId(lead.email!);
  if (existingId) {
    await hubspot(`/crm/v3/objects/contacts/${existingId}`, {
      method: "PATCH",
      body: JSON.stringify({ properties }),
    });
    return existingId;
  }

  const res = await hubspot("/crm/v3/objects/contacts", {
    method: "POST",
    body: JSON.stringify({ properties }),
  });
  if (!res.ok) throw new Error(`contact create failed: ${res.status} ${await res.text()}`);
  const json = await res.json();
  return json.id as string;
}

async function createDeal(lead: LeadInput, contactId: string): Promise<void> {
  const label = lead.properties || lead.name || lead.email || "Unknown";
  const description = [
    "Inbound demo request from simplifiedmanagement.in",
    "",
    `Name: ${lead.name || "-"}`,
    `Email: ${lead.email || "-"}`,
    `Phone: ${lead.phone || "-"}`,
    `Company / Listings: ${lead.properties || "-"}`,
    "",
    "Message:",
    lead.message || "(none)",
    "",
    "Source: simman website (/demo)",
  ].join("\n");

  const res = await hubspot("/crm/v3/objects/deals", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        dealname: `${label} — Website demo request`,
        pipeline: DEAL_PIPELINE,
        dealstage: DEAL_STAGE,
        description,
      },
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: DEAL_TO_CONTACT_TYPE_ID,
            },
          ],
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`deal create failed: ${res.status} ${await res.text()}`);
}

async function sendWeb3FormsEmail(lead: LeadInput): Promise<void> {
  await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: lead.subject || "New Demo Request - Simplified Management",
      from_name: "Simplified Management Website",
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      properties: lead.properties,
      message: lead.message,
    }),
  });
}

export async function POST(request: Request) {
  let lead: LeadInput;
  try {
    lead = (await request.json()) as LeadInput;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  if (!lead.email || !/.+@.+\..+/.test(lead.email)) {
    return NextResponse.json({ ok: false, error: "email required" }, { status: 400 });
  }

  // Run both sinks independently; a failure in one must not block the other.
  const results = await Promise.allSettled([
    (async () => {
      if (!HUBSPOT_TOKEN) throw new Error("HUBSPOT_TOKEN not set");
      const contactId = await upsertContact(lead);
      // Only demo requests become deals on the sales pipeline; resource
      // downloads land as contacts so the board isn't flooded with soft leads.
      if (lead.kind !== "resource") await createDeal(lead, contactId);
    })(),
    sendWeb3FormsEmail(lead),
  ]);

  const hubspotOk = results[0].status === "fulfilled";
  const emailOk = results[1].status === "fulfilled";

  if (results[0].status === "rejected") {
    console.error("[api/lead] hubspot failed:", results[0].reason);
  }
  if (results[1].status === "rejected") {
    console.error("[api/lead] web3forms failed:", results[1].reason);
  }

  // If nothing landed, tell the client so it can fall back to a direct submit.
  if (!hubspotOk && !emailOk) {
    return NextResponse.json({ ok: false, hubspot: false, email: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true, hubspot: hubspotOk, email: emailOk });
}
