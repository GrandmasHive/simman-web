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
const SOFTWARE = /\b(?:already using|currently (?:on|using)|using)\s+([A-Za-z0-9][\w&.' -]{1,40}?)(?=\s*(?:[.,;|—–]|$|\s+(?:and|for|with|but|since|to)\b))/i;

export type Prefill = { input: ProposalInput; filled: string[]; hints: string[] };

export function prefillFromLead(lead: Lead, current: ProposalInput): Prefill {
  const notesText = lead.notes.map((n) => n.text).join("\n");
  const company = (lead.contact?.company ?? "").trim();
  const all = [notesText, company, lead.deal?.description ?? ""].join("\n");
  const filled: string[] = [];
  const hints: string[] = [];

  // Segment: set only when the notes point one way; otherwise ask the rep
  // (never carry over the previous lead's choice).
  let segment: Segment = "hotel";
  const hotelish = HOTEL_HINT.test(all);
  const ownerish = OWNER_HINT.test(all);
  if (ownerish && !hotelish) segment = "owner";
  if (hotelish !== ownerish) filled.push(segment === "hotel" ? "type: hotel" : "type: property owner");
  else hints.push("The notes don't say hotel or property owner: pick one in step 2.");

  // A new lead is a new proposal. Keep only the rep's billing and date choices.
  const base = blankInput(segment);
  const input: ProposalInput = {
    ...base,
    billing: current.billing,
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
  if (business) {
    input.business = business;
    if (segment === "hotel") input.properties = [{ ...input.properties[0], name: business }];
    filled.push("business");
  }

  // Rooms or listings: the first "<number> <unit word>" in the newest note.
  const m = [...lead.notes.map((n) => n.text), company, lead.deal?.description ?? ""]
    .map((t) => t.match(UNITS))
    .find(Boolean);
  if (m) {
    const n = parseInt(m[1], 10);
    const word = m[2].toLowerCase();
    const isProperties = word.startsWith("propert");
    if (segment === "hotel" && !isProperties) {
      input.properties = [{ ...input.properties[0], units: n }];
      filled.push(`${n} rooms`);
    } else if (segment === "hotel" && isProperties) {
      hints.push(`The notes say ${n} properties. Make one proposal per hotel, with that hotel's rooms.`);
    } else {
      input.properties = [{ name: business, area: "", kind: "Villa", units: n }];
      filled.push(`${n} listings`);
      if (isProperties) hints.push(`The notes say ${n} properties. Split them into one row each if you know the names.`);
    }
  }

  // Booking sites named in the notes.
  for (const [site, re] of SITES) if (re.test(all) && !input.sites.includes(site)) input.sites.push(site);
  if (input.sites.length) filled.push(input.sites.join(", "));

  // Software they use today.
  const sw = notesText.match(SOFTWARE);
  if (sw) {
    input.today = ["Another software"];
    input.otherSystem = sw[1].trim();
    filled.push(`today: ${input.otherSystem}`);
  }
  if (/\bexcel\b/i.test(notesText) && !input.today.includes("Excel")) input.today.push("Excel");
  if (/\bregister\b/i.test(notesText) && !input.today.includes("A paper register")) input.today.push("A paper register");

  return { input, filled, hints };
}
