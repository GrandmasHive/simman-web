// WhatsApp messages to website leads, sent server-side through Meta's WhatsApp
// Cloud API (graph.facebook.com, no reseller). Off until WHATSAPP_TOKEN and
// WHATSAPP_PHONE_NUMBER_ID are set on Vercel. A failed send is logged only.
//
// Two Meta-approved templates, language "en" (wording in docs/whatsapp-templates.md):
//   lead_thank_you        body {{1}} = first name
//   lead_details_request  static URL button to /get-started
// Each message costs about Rs 0.15 (Meta utility rate, India).

const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const GRAPH = "https://graph.facebook.com/v21.0";
const THANKS_TEMPLATE = process.env.WHATSAPP_THANKS_TEMPLATE || "lead_thank_you";
const DETAILS_TEMPLATE = process.env.WHATSAPP_DETAILS_TEMPLATE || "lead_details_request";
const TIMEOUT_MS = 5000;

export const whatsappEnabled = Boolean(TOKEN && PHONE_NUMBER_ID);

// Form input to WhatsApp's digits-only international format. A bare 10-digit
// number is Indian. Returns null when it can't be a real mobile number.
export function toWhatsAppNumber(raw?: string): string | null {
  const hadPlus = (raw ?? "").trim().startsWith("+");
  let d = (raw ?? "").replace(/\D/g, "");
  if (!hadPlus && d.length === 11 && d.startsWith("0")) d = d.slice(1);
  if (!hadPlus && d.length === 10) d = `91${d}`;
  if (d.startsWith("91")) return /^91[6-9]\d{9}$/.test(d) ? d : null;
  return hadPlus && d.length >= 8 && d.length <= 15 ? d : null;
}

// Only a plain first name goes into a message, so the form can't be used to
// send someone arbitrary text.
export function firstName(full?: string): string {
  const first = (full ?? "").trim().split(/\s+/)[0] ?? "";
  return /^[\p{L}][\p{L}'.-]{0,29}$/u.test(first) ? first : "there";
}

async function sendTemplate(to: string, name: string, components: unknown[]): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${GRAPH}/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: { name, language: { code: "en" }, components },
      }),
      signal: controller.signal,
    });
    if (!res.ok) console.error(`[whatsapp] ${name} failed:`, res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error(`[whatsapp] ${name} error:`, err);
    return false;
  } finally {
    clearTimeout(timer);
  }
}

// The thank-you, then the details request, in order so they arrive in order.
// Returns false when nothing could be sent.
export async function sendLeadWhatsApp(lead: { phone?: string; name?: string }): Promise<boolean> {
  if (!whatsappEnabled) return false;
  const to = toWhatsAppNumber(lead.phone);
  if (!to) return false;

  const thanked = await sendTemplate(to, THANKS_TEMPLATE, [
    { type: "body", parameters: [{ type: "text", text: firstName(lead.name) }] },
  ]);
  if (!thanked) return false;
  await sendTemplate(to, DETAILS_TEMPLATE, []);
  return true;
}
