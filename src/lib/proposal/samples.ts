// Two made-up examples, used for training reps and for checking the layout.
// Names are fictional.

import type { ProposalInput } from "./types";

export const SAMPLES: Record<"hotel" | "owner", ProposalInput> = {
  hotel: {
    segment: "hotel",
    contactName: "Anil Deshmukh",
    business: "Hotel Riverside",
    area: "Nashik",
    count: 40,
    issueDate: "2026-09-25",
    validFor: "week",
  },
  owner: {
    segment: "owner",
    contactName: "Priya Nair",
    business: "",
    area: "Alibaug and Pune",
    count: 3,
    issueDate: "2026-09-25",
    validFor: "week",
  },
};
