// Small helpers that turn the rep's input into printable text.

import { COPY, NAMED_SITES, type Problem } from "./copy";
import { fmtDayMonth, nextMonday, schedule, todayIso } from "./dates";
import { quote, rupees, totalUnits } from "./pricing";
import type { ProposalInput, Segment } from "./types";

export function unitsLabel(segment: Segment, n: number): string {
  const c = COPY[segment];
  return `${n} ${n === 1 ? c.unitOne : c.unitMany}`;
}

/** "Airbnb and MakeMyTrip", "Airbnb, Booking.com and MakeMyTrip" */
export function joinAnd(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

export function allSites(input: ProposalInput): string[] {
  const other = input.otherSite.trim();
  return [...input.sites, ...(other ? [other] : [])];
}

export function todayMethods(input: ProposalInput): string[] {
  return input.today.map((t) =>
    t === "Another software" && input.otherSystem.trim() ? input.otherSystem.trim() : t,
  );
}

export function teamChips(input: ProposalInput): string[] {
  return COPY[input.segment].teamRoles
    .map((r) => ({ r, n: Math.floor(input.team[r.id] || 0) }))
    .filter(({ n }) => n > 0)
    .map(({ r, n }) => `${n} ${n === 1 ? r.one : r.many}`);
}

/** The picked problems, in list order, with any {sites} filled in. Only the
 *  three sites the decks name are ever promised to come in on their own. */
export function pickedProblems(input: ProposalInput): Problem[] {
  const named = NAMED_SITES.filter((s) => input.sites.includes(s));
  return COPY[input.segment].problems
    .filter((p) => input.problems.includes(p.id))
    .map((p) => {
      if (!p.changes.includes("{sites}")) return p;
      const changes = named.length
        ? p.changes.replace("{sites}", joinAnd(named))
        : "Bookings come in on their own and land in one calendar.";
      return { ...p, changes };
    });
}

/** Distinct areas, e.g. "Alibaug and Pune" (text after the last comma). */
export function areasLabel(input: ProposalInput): string {
  const areas: string[] = [];
  for (const p of input.properties) {
    const a = p.area.split(",").pop()?.trim();
    if (a && !areas.includes(a)) areas.push(a);
  }
  return joinAnd(areas);
}

export function displayBusiness(input: ProposalInput): string {
  return input.business.trim() || input.contactName.trim() || "you";
}

export function firstName(input: ProposalInput): string {
  return input.contactName.trim().split(/\s+/)[0] || "";
}

function slug(s: string): string {
  return s.normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-") || "Prospect";
}

export function fileName(input: ProposalInput): string {
  return `Simplified-Management-Proposal-${slug(displayBusiness(input))}-${input.issueDate}`;
}

/** A message the rep can paste into WhatsApp with the PDF. Copy only: the
 *  tool never sends anything. */
export function whatsappMessage(input: ProposalInput): string {
  const q = quote(input);
  const s = schedule(input.startDate, input.issueDate, input.validDays);
  const hi = firstName(input) ? `Hi ${firstName(input)},` : "Hi,";
  const price = input.billing === "yearly"
    ? `${rupees(q.yearly)} a year (15% off)`
    : `${rupees(q.monthly)} a month`;
  return [
    `${hi} thank you for your time today.`,
    `Here is your Simplified Management proposal for ${displayBusiness(input)}: ${unitsLabel(input.segment, q.units)} at ${price} plus GST, with the first 2 months free.`,
    `Week one can start on ${fmtDayMonth(s.start)}. Any questions, just reply here.`,
  ].join("\n\n");
}

/** One line for the HubSpot deal description. */
export function hubspotNote(input: ProposalInput): string {
  const q = quote(input);
  const s = schedule(input.startDate, input.issueDate, input.validDays);
  const d = (x: Date) => x.toISOString().slice(0, 10);
  return `Proposal made ${input.issueDate}: ${unitsLabel(input.segment, q.units)}, ${rupees(q.monthly)} a month + GST (yearly ${rupees(q.yearly)} + GST), start ${d(s.start)}, valid to ${d(s.validUntil)}.`;
}

export function blankInput(segment: Segment = "hotel"): ProposalInput {
  const issue = todayIso();
  return {
    segment,
    contactName: "",
    role: segment === "hotel" ? "General Manager" : "",
    business: "",
    properties: [{ name: "", area: "", kind: COPY[segment].kinds[0], units: segment === "hotel" ? 20 : 1 }],
    sites: [],
    otherSite: "",
    today: [],
    otherSystem: "",
    team: {},
    problems: [],
    quote: "",
    billing: "both",
    zeroInvoices: true,
    startDate: nextMonday(issue),
    issueDate: issue,
    validDays: 14,
  };
}

export function isReady(input: ProposalInput): string | null {
  if (!input.contactName.trim() && !input.business.trim()) return "Add the prospect's name or business name.";
  if (totalUnits(input) < 1) return input.segment === "hotel" ? "Add the number of rooms." : "Add at least one listing.";
  return null;
}
