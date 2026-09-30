// FINAL pricing (Shaun, 2026-09-25). Do not change or "fix" these numbers.
// Hotels: Rs 3,000 a month platform fee + Rs 100 per room a month.
// Owners: Rs 799 per listing a month for 1-10 listings; at 11 or more,
//         Rs 499 applies to EVERY listing (so 10 costs more than 11-16: intended).
// Yearly = 15% off. GST 18% is extra. First 2 months free. No setup fee.

import type { ProposalInput } from "./types";

export const HOTEL_PLATFORM_FEE = 3000;
export const HOTEL_PER_ROOM = 100;
export const OWNER_RATE = 799;
export const OWNER_BULK_RATE = 499;
export const OWNER_BULK_FROM = 11;
export const GST_RATE = 0.18;
export const YEARLY_DISCOUNT = 0.15;

export type Quote = {
  units: number;
  lines: { label: string; amount: number }[];
  rate: number;
  monthly: number;
  monthlyGst: number;
  monthlyTotal: number;
  yearFull: number;
  yearlySaving: number;
  yearly: number;
  yearlyGst: number;
  yearlyTotal: number;
  yearlyPerMonth: number;
};

export function totalUnits(input: ProposalInput): number {
  const n = Math.floor(Number(input.count));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** Every figure is rounded to the nearest rupee, and shown totals add up. */
export function quote(input: ProposalInput): Quote {
  const units = totalUnits(input);
  let monthly: number;
  let rate: number;
  let lines: Quote["lines"];
  if (input.segment === "hotel") {
    rate = HOTEL_PER_ROOM;
    monthly = HOTEL_PLATFORM_FEE + units * HOTEL_PER_ROOM;
    lines = [
      { label: "Platform fee", amount: HOTEL_PLATFORM_FEE },
      { label: `${units} ${units === 1 ? "room" : "rooms"} × ₹${inr(HOTEL_PER_ROOM)}`, amount: units * HOTEL_PER_ROOM },
    ];
  } else {
    rate = units >= OWNER_BULK_FROM ? OWNER_BULK_RATE : OWNER_RATE;
    monthly = units * rate;
    lines = [{ label: `${units} ${units === 1 ? "listing" : "listings"} × ₹${inr(rate)}`, amount: monthly }];
  }
  const monthlyGst = Math.round(monthly * GST_RATE);
  const yearFull = monthly * 12;
  const yearly = Math.round(yearFull * (1 - YEARLY_DISCOUNT));
  const yearlyGst = Math.round(yearly * GST_RATE);
  return {
    units,
    lines,
    rate,
    monthly,
    monthlyGst,
    monthlyTotal: monthly + monthlyGst,
    yearFull,
    yearlySaving: yearFull - yearly,
    yearly,
    yearlyGst,
    yearlyTotal: yearly + yearlyGst,
    yearlyPerMonth: Math.round(yearly / 12),
  };
}

/** Indian digit grouping: 168650 -> "1,68,650". */
export function inr(n: number): string {
  const neg = n < 0;
  const s = String(Math.round(Math.abs(n)));
  if (s.length <= 3) return (neg ? "-" : "") + s;
  const last = s.slice(-3);
  let rest = s.slice(0, -3);
  const parts: string[] = [];
  while (rest.length > 2) {
    parts.unshift(rest.slice(-2));
    rest = rest.slice(0, -2);
  }
  if (rest) parts.unshift(rest);
  return (neg ? "-" : "") + [...parts, last].join(",");
}

export const rupees = (n: number) => `₹${inr(n)}`;
