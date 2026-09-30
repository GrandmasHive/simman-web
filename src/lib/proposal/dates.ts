// Date helpers. Dates are plain YYYY-MM-DD strings handled in UTC, so the
// server, the rep's browser and the printed PDF always agree on the day.

const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function parse(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1));
}

export function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function isValidIso(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(parse(s).getTime()) && iso(parse(s)) === s;
}

export function addDays(d: Date, n: number): Date {
  return new Date(d.getTime() + n * 86400000);
}

/** Same day of the month, n months later; clamps 31 Jan + 1 month to 28/29 Feb. */
export function addMonths(d: Date, n: number): Date {
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth() + n;
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y, m, Math.min(d.getUTCDate(), last)));
}

export function todayIso(): string {
  const now = new Date();
  return iso(new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())));
}

/** The next Monday strictly after the given date. */
export function nextMonday(fromIso: string): string {
  const d = parse(fromIso);
  const add = ((8 - d.getUTCDay()) % 7) || 7;
  return iso(addDays(d, add));
}

/** "5 October 2026" */
export const fmtDate = (d: Date) => `${d.getUTCDate()}\u00a0${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
/** "Monday 5 October" */
export const fmtDayMonth = (d: Date) => `${DAYS[d.getUTCDay()]} ${d.getUTCDate()}\u00a0${MONTHS[d.getUTCMonth()]}`;
/** "5 Oct" */
export const fmtShort = (d: Date) => `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()].slice(0, 3)}`;

/** "5 to 11 Oct", or "26 Oct to 1 Nov" across a month end. */
export function fmtRange(a: Date, b: Date): string {
  if (a.getUTCMonth() === b.getUTCMonth()) return `${a.getUTCDate()} to ${fmtShort(b)}`;
  return `${fmtShort(a)} to ${fmtShort(b)}`;
}

export type Schedule = {
  start: Date;
  /** Invoice dates: month 1 and month 2 (free plan, Rs 0), then the first paid one. */
  invoices: Date[];
  weeks: { from: Date; to: Date }[];
  goLive: Date;
  freeUntil: Date;
  firstBill: Date;
  issued: Date;
  validUntil: Date;
};

// Week 1 starts the Monday after the proposal is made. The two free months
// (invoiced at Rs 0) count from that start. The offer is open 1 week or 1 month.
export function schedule(issueIso: string, validFor: "week" | "month"): Schedule {
  const start = parse(nextMonday(issueIso));
  const weeks = [0, 1, 2, 3].map((w) => ({ from: addDays(start, w * 7), to: addDays(start, w * 7 + 6) }));
  const firstBill = addMonths(start, 2);
  const issued = parse(issueIso);
  return {
    start,
    invoices: [start, addMonths(start, 1), firstBill],
    weeks,
    goLive: weeks[3].from,
    freeUntil: addDays(firstBill, -1),
    firstBill,
    issued,
    validUntil: validFor === "month" ? addMonths(issued, 1) : addDays(issued, 7),
  };
}
