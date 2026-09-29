// Turn a HubSpot lead (contact + call notes + optional deal) into a starting
// proposal. Only fills what the notes state plainly; the rep checks the rest.

import { blankInput } from "./derive";
import type { ProposalInput, Segment } from "./types";

export type HsContact = { id: string; firstname: string; lastname: string; email: string; phone: string; company: string };
export type HsDeal = { dealId: string; dealName: string; stage: string; createdAt: string; amount: string | null; description: string };
export type HsNote = { id: string; at: string; kind: "note" | "call" | "meeting"; text: string };
export type Lead = { key: string; contact: HsContact | null; deal: HsDeal | null; notes: HsNote[]; lastActivity: string };

export function leadName(l: Lead): string {
  const n = [l.contact?.firstname, l.contact?.lastname].filter(Boolean).join(" ").trim();
  return n || dealBusiness(l.deal) || "Unnamed lead";
}

/** Website deals are named "<company> — Website demo request". */
function dealBusiness(d: HsDeal | null): string {
  return (d?.dealName ?? "").replace(/\s*[—–-]\s*Website demo request\s*$/i, "").trim();
}

const SITES: [string, RegExp][] = [
  ["Airbnb", /\bair\s?bnb\b/i],
  ["Booking.com", /\bbooking\s?\.?\s?com\b/i],
  ["MakeMyTrip", /\bmake\s?my\s?trip\b|\bmmt\b/i],
  ["Goibibo", /\bgo\s?ibibo\b/i],
  ["Agoda", /\bagoda\b/i],
];
const HOTEL_HINT = /\b(hotels?|resorts?|serviced? apartments?|guest\s?houses?|lodges?|rooms?)\b/i;
const OWNER_HINT = /\b(airbnb|villas?|home\s?stays?|flats?|bhk|cottages?)\b/i;
const UNITS = /(\d{1,4})\s*(?:[×x]\s*\d\s*bhk\s*)?(rooms?|keys|units?|listings?|villas?|flats?|cottages?|apartments?|properties|property)\b/i;
// Only "already using X" / "currently on X": a bare "using" also appears in the
// team's pasted process rules ("5 attempts ... using calls and WhatsApp").
const SOFTWARE = /\b(?:already using|currently (?:on|using))\s+([A-Za-z0-9][\w&.' -]{1,40}?)(?=\s*(?:[.,;|—–]|$|\s+(?:and|for|with|but|since|to)\b))/i;
// The team's structured call note has a "Current setup:" line (often blank).
const SETUP_FIELD = /current setup:[ \t]*([^\n|]{2,80})/i;

export type Prefill = { input: ProposalInput; filled: string[]; hints: string[] };

export function prefillFromLead(lead: Lead, current: ProposalInput): Prefill {
  const notesText = lead.notes.map((n) => n.text).join("\n");
  const company = (lead.contact?.company ?? "").trim();
  const all = [notesText, company, lead.deal?.description ?? ""].join("\n");
  const filled: string[] = [];
  const hints: string[] = [];

  // The count: the first "<number> <unit word>" in the newest note, then the
  // company box, then the deal. The website form's "Company / Total Listings"
  // box often holds just a number ("5"), which is the count, not a name.
  let count: { n: number; word: string } | null = null;
  for (const t of [...lead.notes.map((n) => n.text), company, lead.deal?.description ?? ""]) {
    const m = t.match(UNITS);
    if (m) {
      count = { n: parseInt(m[1], 10), word: m[2].toLowerCase() };
      break;
    }
  }
  const bareNumber = [company, dealBusiness(lead.deal)].find((t) => /^\d{1,4}$/.test(t));
  if (!count && bareNumber) count = { n: parseInt(bareNumber, 10), word: "" };

  // Segment: set only when the notes point one way; otherwise ask the rep
  // (never carry over the previous lead's choice). "N properties" with no
  // hotel words is an owner of N places (the owner persona is 1-10 properties).
  const hotelWords = HOTEL_HINT.test(all);
  const countSaysOwner = !!count && /^(propert|listing|villa|flat|cottage)/.test(count.word) && !hotelWords;
  const hotelish = hotelWords || (!!count && /^(rooms?|keys)$/.test(count.word));
  const ownerish = OWNER_HINT.test(all) || countSaysOwner;
  let segment: Segment = "hotel";
  if (ownerish && !hotelish) segment = "owner";
  if (hotelish !== ownerish) filled.push(segment === "hotel" ? "type: hotel" : "type: property owner");
  else hints.push("The notes don't say hotel or property owner: pick one in step 2.");

  // A new lead is a new proposal. Keep only the rep's billing and date choices.
  const base = blankInput(segment);
  const input: ProposalInput = {
    ...base,
    billing: current.billing,
    zeroInvoices: current.zeroInvoices,
    startDate: current.startDate,
    issueDate: current.issueDate,
    validDays: current.validDays,
    hubspotDealId: lead.deal?.dealId,
  };

  const name = [lead.contact?.firstname, lead.contact?.lastname].filter(Boolean).join(" ").trim();
  if (name) {
    input.contactName = name;
    filled.push("name");
  }

  // Business: the contact's company (the website form mixes in a unit count),
  // else the website deal's name.
  let business = company || dealBusiness(lead.deal);
  const inBusiness = business.match(UNITS);
  if (inBusiness) business = business.replace(inBusiness[0], "").replace(/^[\s\-–—,|/:]+|[\s\-–—,|/:]+$/g, "").trim();
  if (/^\d{1,4}$/.test(business)) business = ""; // a count, not a name
  if (business) {
    input.business = business;
    if (segment === "hotel") input.properties = [{ ...input.properties[0], name: business }];
    filled.push("business");
  }

  // Rooms or listings. Never leave a made-up number: if HubSpot has no count,
  // the field stays at 0 and the rep is told to ask.
  if (count) {
    const { n, word } = count;
    const isProperties = word.startsWith("propert");
    if (segment === "hotel" && isProperties) {
      hints.push(`The notes say ${n} properties of hotels. Make one proposal per hotel and fill in that hotel's rooms.`);
    } else if (segment === "hotel") {
      input.properties = [{ ...input.properties[0], units: n }];
      filled.push(`${n} rooms`);
    } else {
      input.properties = [{ name: business, area: "", kind: "Villa", units: n }];
      filled.push(`${n} listings`);
      if (isProperties) hints.push(`The notes say ${n} properties, filled in as ${n} listings. Split them into one row per property if you know the names.`);
    }
  }
  if (!input.properties.some((p) => p.units > 0)) {
    hints.push(`HubSpot doesn't say how many ${segment === "hotel" ? "rooms" : "listings"}: ask them and fill it in at step 3.`);
  }

  // Booking sites named in the notes.
  for (const [site, re] of SITES) if (re.test(all) && !input.sites.includes(site)) input.sites.push(site);
  if (input.sites.length) filled.push(input.sites.join(", "));

  // Software they use today.
  // Booking sites are already in the sites list; they are not "software".
  const withoutSites = (t: string) =>
    SITES.reduce((acc, [, re]) => acc.replace(new RegExp(re.source, "gi"), ""), t).replace(/\b(and|on|listed)\b|[\s,&/+.]+/gi, "");
  const swMatch = notesText.match(SOFTWARE);
  const sw = swMatch && withoutSites(swMatch[1]).length >= 2 ? swMatch : null;
  const setupRaw = notesText.match(SETUP_FIELD)?.[1].trim() ?? "";
  const setup = withoutSites(setupRaw).length >= 2 ? setupRaw : "";
  if (sw) {
    input.today = ["Another software"];
    input.otherSystem = sw[1].trim();
    filled.push(`today: ${input.otherSystem}`);
  } else if (setup && !/^(none|nothing|na|n\/a|-|not known|unknown)\b/i.test(setup)) {
    if (/whats\s?app/i.test(setup)) input.today.push("WhatsApp");
    if (/phone|call/i.test(setup)) input.today.push("Phone calls");
    if (/software|app\b|pms/i.test(setup) || !/whats\s?app|excel|register|paper|phone|call|manual/i.test(setup)) {
      input.today.push("Another software");
      input.otherSystem = setup.replace(/[.;,]+$/, "");
    }
    filled.push(`today: ${setup}`);
  }
  if (/\bexcel\b/i.test(notesText) && !input.today.includes("Excel")) input.today.push("Excel");
  if (/\bregister\b/i.test(notesText) && !input.today.includes("A paper register")) input.today.push("A paper register");

  return { input, filled, hints };
}
