// Two made-up examples, used for training reps and for checking the layout.
// Names are fictional.

import type { ProposalInput } from "./types";

export const SAMPLES: Record<"hotel" | "owner", ProposalInput> = {
  hotel: {
    segment: "hotel",
    contactName: "Anil Deshmukh",
    role: "General Manager",
    business: "Hotel Riverside",
    properties: [{ name: "Hotel Riverside", area: "Nashik", kind: "Hotel", units: 40 }],
    sites: ["Booking.com", "MakeMyTrip", "Goibibo", "Walk-ins and direct"],
    otherSite: "",
    today: ["WhatsApp", "Excel", "A paper register"],
    otherSystem: "",
    team: { frontdesk: 3, housekeeping: 6, maintenance: 1, accounts: 1 },
    problems: ["h-room-ready", "h-excel", "h-handover", "h-owner-calls", "h-gst"],
    quote: "I find out a room isn’t ready when the guest is already at the desk.",
    billing: "both",
    zeroInvoices: true,
    startDate: "2026-10-05",
    issueDate: "2026-09-25",
    validDays: 14,
  },
  owner: {
    segment: "owner",
    contactName: "Priya Nair",
    role: "",
    business: "",
    properties: [
      { name: "Casa Palms", area: "Alibaug", kind: "Villa", units: 1 },
      { name: "Flat 1202", area: "Baner, Pune", kind: "Flat", units: 1 },
      { name: "Flat 704", area: "Kharadi, Pune", kind: "Flat", units: 1 },
    ],
    sites: ["Airbnb", "MakeMyTrip"],
    otherSite: "",
    today: ["WhatsApp", "Excel"],
    otherSystem: "",
    team: { cleaner: 1, caretaker: 1 },
    problems: ["o-apps", "o-cleaner", "o-questions", "o-earnings", "o-away"],
    quote: "Every turnover is a phone call from me.",
    billing: "both",
    zeroInvoices: true,
    startDate: "2026-10-12",
    issueDate: "2026-09-25",
    validDays: 14,
  },
};
