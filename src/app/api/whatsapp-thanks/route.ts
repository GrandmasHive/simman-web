import { NextResponse } from "next/server";
import { sendLeadWhatsApp } from "@/lib/whatsapp";

// Called by the browser (src/lib/lead-alert.ts) after the email alert accepts a
// lead. Sends the WhatsApp thank-you and the details request. It stores nothing:
// leads live in the email alert only (Shaun, 13 Oct 2026: no CRM).

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_HOSTS = ["simplifiedmanagement.in", "www.simplifiedmanagement.in", "localhost"];

export async function POST(request: Request) {
  // Only our own pages may trigger a paid message. Vercel previews are allowed
  // so the flow can be tested before a deploy.
  const origin = request.headers.get("origin");
  let host = "";
  try {
    host = origin ? new URL(origin).hostname : "";
  } catch {
    host = "";
  }
  if (!ALLOWED_HOSTS.includes(host) && !host.endsWith("-dev-ops-9530.vercel.app")) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  let body: { name?: string; phone?: string; botcheck?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (body.botcheck) return NextResponse.json({ ok: true });

  const sent = await sendLeadWhatsApp({ name: body.name, phone: body.phone });
  return NextResponse.json({ ok: sent });
}
