// What a sales rep fills in for one proposal. Everything printed on the
// proposal comes from this object plus the fixed copy in ./copy.ts.

export type Segment = "hotel" | "owner";
export type Billing = "both" | "monthly" | "yearly";

/** One property. For a hotel there is exactly one row and `units` = rooms.
 *  For an owner, `units` = listings (things a guest can book on their own). */
export type PropertyRow = {
  name: string;
  area: string;
  kind: string;
  units: number;
};

export type ProposalInput = {
  segment: Segment;
  contactName: string;
  /** Hotels only: Owner, General Manager, Operations Manager. */
  role: string;
  business: string;
  properties: PropertyRow[];
  sites: string[];
  otherSite: string;
  today: string[];
  otherSystem: string;
  team: Record<string, number>;
  /** Problem ids from the segment's fixed list in ./copy.ts (max 5). */
  problems: string[];
  /** Optional: one sentence the prospect said on the call. */
  quote: string;
  billing: Billing;
  /** Week 1 starts on this date (YYYY-MM-DD). */
  startDate: string;
  /** The date the proposal is made (YYYY-MM-DD). */
  issueDate: string;
  validDays: number;
  /** Set when the details came from a HubSpot deal. */
  hubspotDealId?: string;
};
