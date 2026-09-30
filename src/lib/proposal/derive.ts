// Small helpers that turn the rep's input into printable text.

import type { Contact } from "./contact";
import { COPY } from "./copy";
import { fmtDate, fmtDayMonth, schedule, todayIso } from "./dates";
import { quote, rupees, totalUnits } from "./pricing";
import type { ProposalInput, Segment } from "./types";

/** The proposal is always the same 5 pages: cover, price, start, included, next step. */
export const PAGES = 5;

export function unitsLabel(segment: Segment, n: number): string {
  const c = COPY[segment];
  return `${n} ${n === 1 ? c.unitOne : c.unitMany}`;
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
export function whatsappMessage(input: ProposalInput, contact: Contact): string {
  const q = quote(input);
  const s = schedule(input.issueDate, input.validFor);
  const hi = firstName(input) ? `Hi ${firstName(input)},` : "Hi,";
  return [
    `${hi} thank you for your time today.`,
    `Here is your Simplified Management proposal for ${displayBusiness(input)}: ${unitsLabel(input.segment, q.units)} at ${rupees(q.monthly)} a month plus GST, or ${rupees(q.yearly)} a year plus GST (15% off). Your first two invoices are ₹0.`,
    `Week one can start on ${fmtDayMonth(s.start)}. This offer is open until ${fmtDate(s.validUntil)}. Any questions, just reply here.`,
    `${contact.name}, Simplified Management`,
  ].join("\n\n");
}

export function blankInput(segment: Segment = "hotel"): ProposalInput {
  const issue = todayIso();
  return {
    segment,
    contactName: "",
    business: "",
    area: "",
    // 0 until the rep fills it in: never show a made-up count.
    count: 0,
    issueDate: issue,
    validFor: "week",
  };
}

export function isReady(input: ProposalInput): string | null {
  if (!input.contactName.trim() && !input.business.trim()) return "Add the prospect's name or business name.";
  if (totalUnits(input) < 1) return input.segment === "hotel" ? "Add the number of rooms." : "Add the number of listings.";
  return null;
}
