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

export const pricingTiers = [
  {
    name: "Starter",
    scale: "10-50 listings",
    highlight: true,
    features: [
      "Centralized PMS dashboard",
      "Unified booking management",
      "Cross-channel calendar sync",
      "Core OTA connections",
      "Guest management & tasks",
    ],
  },
  {
    name: "Growth",
    scale: "50-200 listings",
    highlight: false,
    features: [
      "Everything in Starter",
      "Expanded OTA distribution",
      "Partner accounts & split payouts",
      "Reports & insights",
      "Priority email support",
    ],
  },
  {
    name: "Scale",
    scale: "200-500+ listings",
    highlight: false,
    features: [
      "Everything in Growth",
      "Multi-property automation",
      "Advanced pricing & rules",
      "Dedicated account manager",
      "Priority support",
    ],
  },
] as const;

export const faqs = [
  {
    q: "How much does Simplified Management cost?",
    a: "Pricing is tailored to your portfolio size and the modules you use (PMS, channel manager, calendar sync, partner payouts). Request a demo and we provide a quote matched to your number of listings.",
  },
  {
    q: "Does it support large portfolios?",
    a: "Yes. The Scale plan is built for operators running 200 to 500+ listings, with full OTA distribution, partner payout automation, and priority support.",
  },
  {
    q: "How is pricing structured as I grow?",
    a: "Pricing scales with your number of listings, so it grows predictably as your portfolio grows. Exact pricing is confirmed during your demo.",
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
