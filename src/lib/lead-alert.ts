// Email alert for every website lead, sent from the BROWSER to Web3Forms.
// Web3Forms' free plan rejects server-side calls (403 "Use our API in client
// side... Pro plan is required"), so this cannot run on the server. The key is
// public by design: Web3Forms access keys only allow sending to the account's
// own inbox. NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY overrides it if set.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "436ad4a1-8628-4d57-9e21-c5ae4c3366e3";

const TIMEOUT_MS = 8000;

type LeadFields = Record<string, FormDataEntryValue>;

// Every website lead goes to the email alert only; the site sends nothing to a
// CRM. Resolves true only when the alert is accepted.
export async function submitLead(fields: LeadFields): Promise<boolean> {
  return sendLeadAlert(fields);
}

// Resolves true only when Web3Forms answers success: true. Never throws.
async function sendLeadAlert(fields: LeadFields): Promise<boolean> {
  // consent and kind are form bookkeeping; the email needs neither.
  const rest = { ...fields };
  delete rest.consent;
  delete rest.kind;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...rest, access_key: WEB3FORMS_ACCESS_KEY }),
      signal: controller.signal,
    });
    const json = await res.json().catch(() => null);
    return res.ok && json?.success === true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
