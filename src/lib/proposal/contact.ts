// The contact details printed on a proposal (its last page and the cover's
// "Prepared by" line). Each rep can set their own in Settings; until they do,
// proposals use the company default below. Safe to import from client code.

export type Contact = {
  name: string;
  role: string;
  /** Shown as the call number, "+91 98240 04043". */
  phone: string;
  email: string;
  /** True when WhatsApp is on the same number as `phone`. */
  sameWhatsapp: boolean;
  /** Only used when `sameWhatsapp` is false. */
  whatsapp: string;
};

// Matches the sales decks and the website (number changed 2026-09-25, email per
// Shaun 2026-09-30).
export const COMPANY_CONTACT: Contact = {
  name: "Tipusultan",
  role: "Relationship Manager",
  phone: "+91 98240 04043",
  email: "sultan@simplifiedmanagement.in",
  sameWhatsapp: true,
  whatsapp: "",
};

export const SITE = {
  name: "simplifiedmanagement.in",
  url: "https://simplifiedmanagement.in",
  demo: "simplifiedmanagement.in/demo",
  demoUrl: "https://simplifiedmanagement.in/demo",
};

export const WA_PROPOSAL_TEXT = encodeURIComponent(
  "Hi, I have a question about my Simplified Management proposal.",
);

/** Digits only, with the +91 country code: "919824004043". */
export function phoneDigits(input: string): string | null {
  let d = input.replace(/\D/g, "");
  if (d.startsWith("91") && d.length === 12) d = d.slice(2);
  else if (d.startsWith("0") && d.length === 11) d = d.slice(1);
  if (!/^[6-9]\d{9}$/.test(d)) return null;
  return "91" + d;
}

/** "+91 98240 04043" from any way of typing an Indian mobile number, or null. */
export function formatPhone(input: string): string | null {
  const d = phoneDigits(input);
  return d ? `+91 ${d.slice(2, 7)} ${d.slice(7)}` : null;
}

export function callDigits(c: Contact): string {
  return phoneDigits(c.phone) ?? phoneDigits(COMPANY_CONTACT.phone)!;
}

export function whatsappDigits(c: Contact): string {
  return (!c.sameWhatsapp && phoneDigits(c.whatsapp)) || callDigits(c);
}

export type ContactCheck =
  | { ok: true; contact: Contact }
  | { ok: false; error: string; field: keyof Contact };

/** Validates and tidies a contact typed in Settings. */
export function checkContact(raw: unknown): ContactCheck {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim().replace(/\s+/g, " ") : "");
  const name = str(r.name);
  const role = str(r.role);
  const email = str(r.email).toLowerCase();
  const sameWhatsapp = r.sameWhatsapp !== false;

  if (name.length < 2 || name.length > 60) return { ok: false, error: "Enter your name (2 to 60 letters).", field: "name" };
  if (role.length > 60) return { ok: false, error: "Keep the title under 60 characters.", field: "role" };

  const phone = formatPhone(str(r.phone));
  if (!phone) return { ok: false, error: "Enter a 10-digit Indian mobile number, like 98240 04043.", field: "phone" };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 100) {
    return { ok: false, error: "Enter a valid email address.", field: "email" };
  }

  let whatsapp = "";
  if (!sameWhatsapp) {
    const w = formatPhone(str(r.whatsapp));
    if (!w) return { ok: false, error: "Enter the WhatsApp number as a 10-digit Indian mobile.", field: "whatsapp" };
    whatsapp = w;
  }
  return { ok: true, contact: { name, role, phone, email, sameWhatsapp, whatsapp } };
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts.length === 1 ? parts[0].slice(0, 2) : parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
