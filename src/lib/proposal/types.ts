// What a sales rep fills in for one proposal. Everything printed on the
// proposal comes from this object, the rep's contact (Settings) and the fixed
// copy in ./copy.ts. The proposal is the final offer: who it's for, what they
// need, the price and the start dates.

export type Segment = "hotel" | "owner";
export type Validity = "week" | "month";

export type ProposalInput = {
  segment: Segment;
  contactName: string;
  business: string;
  /** City or area, e.g. "Nashik" or "Alibaug and Pune". */
  area: string;
  /** Rooms (hotel) or listings (owner: things a guest can book on their own).
   *  0 until the rep fills it in: the tool never shows a made-up count. */
  count: number;
  /** The date the proposal is made (YYYY-MM-DD). Week 1 starts the next Monday. */
  issueDate: string;
  /** The offer is open for 1 week (default) or 1 month from issueDate. */
  validFor: Validity;
};
