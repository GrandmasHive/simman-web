// The contact details printed on a proposal (its last page and the cover's
// "Prepared by" line). Fixed per login: the rep who makes a proposal gets
// their own details on it. To change someone's details, edit REP_CONTACTS
// below and push. A login without an entry prints the company contact.
// Safe to import from client code (no secrets here).

export type Contact = {
  name: string;
  role: string;
  /** Shown as the call number, "+91 98240 04043". */
  phone: string;
  email: string;
  /** Only when WhatsApp is on a different number from `phone`. */
  whatsapp?: string;
};

// Matches the sales decks and the website (number changed 2026-09-25, email per
// Shaun 2026-09-30).
export const COMPANY_CONTACT: Contact = {
  name: "Tipusultan",
  role: "Relationship Manager",
  phone: "+91 98240 04043",
  email: "sultan@simplifiedmanagement.in",
};

/** One entry per login (the username in TEAM_USERS). */
export const REP_CONTACTS: Record<string, Contact> = {
  tipusultan: COMPANY_CONTACT,
  // ghouse: { name: "Ghouse", role: "…", phone: "+91 …", email: "…@simplifiedmanagement.in" },
};

export function contactFor(username: string): { contact: Contact; isDefault: boolean } {
  const own = REP_CONTACTS[username];
  return own ? { contact: own, isDefault: false } : { contact: COMPANY_CONTACT, isDefault: true };
}

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

export function callDigits(c: Contact): string {
  return phoneDigits(c.phone) ?? phoneDigits(COMPANY_CONTACT.phone)!;
}

export function whatsappDigits(c: Contact): string {
  return (c.whatsapp && phoneDigits(c.whatsapp)) || callDigits(c);
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts.length === 1 ? parts[0].slice(0, 2) : parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
