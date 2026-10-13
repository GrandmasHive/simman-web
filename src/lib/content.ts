/** Feature showcase — mapped to the real product screenshots in /public/screenshots. */
export const features = [
  {
    key: "pms",
    title: "Property Management Software",
    tagline: "One dashboard for every listing",
    description:
      "Manage every property, reservation, guest, and task from a single control room. Live occupancy, revenue, and activity across your whole portfolio.",
    bullets: [
      "Unified booking dashboard across 10-500+ listings",
      "Live revenue and expense tracking",
      "Guest management, tasks, and staff in one place",
    ],
    image: "/screenshots/overview.png",
    alt: "Property Management Software screenshot showing the properties, bookings, revenue and live activity dashboard",
    callout: undefined as string | undefined,
    calloutPosition: undefined as string | undefined,
    href: "/services/property-management-software",
  },
  {
    key: "channel",
    title: "Channel Manager",
    tagline: "Sell everywhere, oversell nowhere",
    description:
      "Distribute and sync listings, rates, and availability across Airbnb, Booking.com, Agoda, Expedia, and the other OTAs you list on, from one calendar.",
    bullets: [
      "OTA connections from one login",
      "Two-way, cross-channel availability sync",
      "Centralized pricing and rate rules",
    ],
    image: "/screenshots/booking.png",
    alt: "Channel Manager screenshot showing PMS bookings synced from Airbnb and other OTA channels",
    callout: undefined as string | undefined,
    calloutPosition: undefined as string | undefined,
    href: "/services/channel-manager",
  },
  {
    key: "calendar",
    title: "Calendar Sync",
    tagline: "One master calendar, every channel aligned",
    description:
      "Every booking updates your master calendar. Sync it out to your OTAs to eliminate double bookings and the manual work of keeping calendars aligned.",
    bullets: [
      "Cross-channel calendar updates",
      "Fewer double bookings",
      "Master calendar drives all distribution",
    ],
    image: "/screenshots/calendar.png",
    alt: "Calendar Sync screenshot showing a multi-property booking calendar with per-night rates",
    // No callout here: the crop doesn't show a clean top-of-frame figure to
    // point at, so the badge is hidden, not fabricated (see ITERATIONS.md v2).
    callout: undefined as string | undefined,
    calloutPosition: undefined as string | undefined,
    href: "/services/calendar-sync",
  },
  {
    key: "payouts",
    title: "Partner Accounts & Split Payouts",
    tagline: "Know who earns what, per booking",
    description:
      "Allocate properties to partners and split earnings and expenses automatically, down to each daily booking payment.",
    bullets: [
      "Automatic earnings splits per booking",
      "Track co-owner expenses and payouts",
      "Transparent partner statements",
    ],
    image: "/screenshots/payments.png",
    alt: "Partner Accounts and Split Payouts screenshot showing payments, revenue and expense records",
    // No callout here either — see the calendar entry above for why.
    callout: undefined as string | undefined,
    calloutPosition: undefined as string | undefined,
    href: "/services/partner-payouts",
  },
] as const;

// Final pricing, 2026-09-30 (see DECISIONS.md). Owners count listings,
// hotels count rooms: never cross the two words in customer-facing copy.
export const pricingTerms = [
  "18% GST added on top of all prices",
  "First 2 months free",
  "Pay monthly, or yearly and save 15%",
] as const;

export const pricingPlans = [
  {
    name: "Owners",
    audience: "Villas, homestays, flats and Airbnb listings",
    rates: [
      { amount: "₹799", unit: "per listing / month", note: "1 to 10 listings" },
      { amount: "₹499", unit: "per listing / month", note: "11 or more listings" },
    ],
    features: [
      "One listing is one bookable unit",
      "Unlimited channels per listing",
      "Cross-channel calendar sync",
      "Unified booking management",
      "Partner accounts & split payouts",
    ],
  },
  {
    name: "Hotels",
    audience: "One property with many rooms",
    rates: [
      { amount: "₹3,000", unit: "per month", note: "Platform fee" },
      { amount: "+ ₹100", unit: "per room / month", note: "For every room" },
    ],
    features: [
      "Every room type in one dashboard",
      "Unlimited channels",
      "Rate and availability sync per room type",
      "Housekeeping & task routing",
      "Reports & insights",
    ],
  },
] as const;

export const faqs = [
  {
    q: "How much does Simplified Management cost?",
    a: "Owners pay ₹799 per listing per month for 1 to 10 listings, and ₹499 per listing per month from 11 listings up. Hotels pay a ₹3,000 monthly platform fee plus ₹100 per room per month. Prices exclude GST, and 18% GST is added on top. The first 2 months are free, and yearly billing saves 15%.",
  },
  {
    q: "What counts as a listing?",
    a: "One bookable unit. A whole villa booked as one unit is one listing. A guesthouse that sells 12 rooms separately is 12 listings. Channels are unlimited, and there are no per-booking fees.",
  },
  {
    q: "Which plan is right for me?",
    a: "If you own or manage villas, homestays, flats or Airbnb units, you're on the Owners plan and pay per listing. If you run one property with many rooms, you're on the Hotels plan and pay a platform fee plus a per-room rate.",
  },
  {
    q: "Which channels do you connect to?",
    a: "Simplified Management connects to 8 major OTA channels including Airbnb, Booking.com, Agoda, Expedia, Vrbo, MakeMyTrip, Goibibo and StayVista, distributing and syncing availability from one dashboard.",
  },
  {
    q: "How does availability sync across channels?",
    a: "Availability, rates, and reservations sync across every connected channel from one master calendar, so you can keep the same night from being double-sold.",
  },
  {
    q: "Can I manage partners and split payouts?",
    a: "Yes. Allocate properties to partners and automatically split earnings and expenses per booking, with transparent statements for every co-owner.",
  },
] as const;
