import { NextResponse } from "next/server";
import { getTeamUser } from "@/lib/team-auth";

// Sales-team "log this proposal against the deal" endpoint: sets the deal
// amount and appends a note to its description. Session is enforced by Proxy
// already (src/proxy.ts); checked again here per the Next.js authentication
// guide's defense-in-depth guidance.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;
const HUBSPOT_BASE = "https://api.hubapi.com";

const DEAL_ID_RE = /^\d+$/;
const MAX_AMOUNT = 10_000_000;
const MAX_NOTE_LENGTH = 500;

type LogBody = { dealId?: unknown; amount?: unknown; note?: unknown };

async function hubspot(path: string, init: RequestInit): Promise<Response> {
  return fetch(`${HUBSPOT_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${HUBSPOT_TOKEN}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

async function hubspotJson<T>(path: string, init: RequestInit): Promise<T> {
  const res = await hubspot(path, init);
  if (!res.ok) {
    throw new Error(`HubSpot ${path} responded ${res.status}`);
  }
  return (await res.json()) as T;
}

function validate(body: LogBody):
  | { ok: true; dealId: string; amount: number; note: string }
  | { ok: false; error: string } {
  const dealId = body.dealId;
  if (typeof dealId !== "string" || !DEAL_ID_RE.test(dealId)) {
    return { ok: false, error: "dealId must be digits only" };
  }

  const amount = body.amount;
  if (
    typeof amount !== "number" ||
    !Number.isFinite(amount) ||
    amount < 0 ||
    amount > MAX_AMOUNT
  ) {
    return { ok: false, error: `amount must be a number from 0 to ${MAX_AMOUNT}` };
  }

  const note = body.note;
  if (typeof note !== "string" || note.length < 1 || note.length > MAX_NOTE_LENGTH) {
    return { ok: false, error: "note must be 1-500 characters" };
  }

  return { ok: true, dealId, amount, note };
}

export async function POST(request: Request) {
  const username = await getTeamUser();
  if (!username) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  if (!HUBSPOT_TOKEN) {
    return NextResponse.json(
      { ok: false, error: "HubSpot is not configured" },
      { status: 502 }
    );
  }

  let body: LogBody;
  try {
    body = (await request.json()) as LogBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  const validated = validate(body);
  if (!validated.ok) {
    return NextResponse.json({ ok: false, error: validated.error }, { status: 400 });
  }
  const { dealId, amount, note } = validated;

  try {
    const current = await hubspotJson<{ properties?: { description?: string | null } }>(
      `/crm/v3/objects/deals/${dealId}?properties=description`,
      { method: "GET" }
    );
    const currentDescription = current.properties?.description ?? "";
    const description = currentDescription
      ? `${currentDescription}\n\n${note}`
      : note;

    await hubspotJson(`/crm/v3/objects/deals/${dealId}`, {
      method: "PATCH",
      body: JSON.stringify({
        properties: {
          amount: String(amount),
          description,
        },
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/team/hubspot/log]", err);
    return NextResponse.json(
      { ok: false, error: "HubSpot request failed" },
      { status: 502 }
    );
  }
}
