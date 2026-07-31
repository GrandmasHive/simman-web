export type Block =
  | { h2: string }
  | { p: string }
  | { ul: string[] };

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string; // ISO
  readingMinutes: number;
  content: Block[];
};

export const posts: Post[] = [
  {
    slug: "stop-double-bookings-airbnb-booking-com",
    title: "How to stop double bookings across Airbnb and Booking.com",
    description:
      "Double bookings cost you money and reviews. Here is how real-time channel sync eliminates them across every OTA you sell on.",
    category: "Channel Management",
    date: "2026-06-20",
    readingMinutes: 6,
    content: [
      { p: "If you list the same property on Airbnb, Booking.com, Agoda and a few other channels, a double booking is not a matter of if, but when. The moment two guests book the same night on two different platforms, you are forced to cancel one, eat the penalty, and take a hit on your ranking and reviews." },
      { h2: "Why double bookings happen" },
      { p: "Each OTA keeps its own copy of your calendar. Unless those calendars talk to each other instantly, there is always a window where one channel does not know a night was just sold on another. Manual updates and iCal links, which sync on a delay, leave that window wide open." },
      { ul: [
        "Manual calendar updates are slow and easy to forget",
        "iCal imports can lag by hours, long enough to oversell",
        "The more channels you add, the higher the collision risk",
      ] },
      { h2: "The fix: real-time two-way sync" },
      { p: "A channel manager keeps one master calendar and pushes every change to every connected OTA the instant it happens. When a night sells on Booking.com, it is blocked on Airbnb, Agoda and the rest within seconds, not hours." },
      { p: "With Simplified Management, your availability, rates and reservations stay in lockstep across 50+ channels from one dashboard, so the same night is never sold twice." },
      { h2: "What to look for in a channel manager" },
      { ul: [
        "True two-way, real-time sync (not delayed iCal)",
        "Coverage of the OTAs your guests actually use, including MakeMyTrip and Goibibo for India",
        "A single master calendar that drives all distribution",
      ] },
    ],
  },
  {
    slug: "channel-manager-vs-pms",
    title: "Channel manager vs PMS: what is the difference?",
    description:
      "PMS, channel manager, booking engine: the terms get mixed up. Here is a plain-English guide to what each one does and why you need both.",
    category: "Guides",
    date: "2026-06-14",
    readingMinutes: 5,
    content: [
      { p: "If you are shopping for property software, you have probably seen PMS and channel manager used almost interchangeably. They are not the same thing, and understanding the difference helps you buy the right tool." },
      { h2: "What a PMS does" },
      { p: "A property management system (PMS) is your operational control room. It handles reservations, guests, housekeeping tasks, staff, payments and reporting for your whole portfolio in one place." },
      { h2: "What a channel manager does" },
      { p: "A channel manager is your distribution engine. It connects your listings to OTAs like Airbnb, Booking.com and Agoda, and keeps availability, rates and bookings synced across all of them in real time." },
      { h2: "Why you want both" },
      { p: "On their own, each solves half the problem. Together, they let you run operations and distribution from a single source of truth, which is exactly how Simplified Management is built: PMS and channel manager in one dashboard." },
      { ul: [
        "PMS: run day-to-day operations",
        "Channel manager: distribute and sync across OTAs",
        "One combined platform: no data silos, no double entry",
      ] },
    ],
  },
  {
    slug: "ota-distribution-guide-india",
    title: "A practical guide to OTA distribution for Indian rentals",
    description:
      "From Airbnb and Booking.com to MakeMyTrip and Goibibo, here is how to build an OTA distribution strategy for the Indian short-term rental market.",
    category: "Distribution",
    date: "2026-06-06",
    readingMinutes: 7,
    content: [
      { p: "The Indian short-term rental market has its own mix of channels. Getting distribution right means covering the global OTAs and the domestic platforms your guests actually book on." },
      { h2: "The channels that matter in India" },
      { ul: [
        "Global: Airbnb, Booking.com, Agoda, Expedia, Vrbo",
        "Domestic: MakeMyTrip, Goibibo, Cleartrip",
        "Premium villas: StayVista and similar curated platforms",
      ] },
      { h2: "Distribute widely, oversell never" },
      { p: "The more channels you list on, the more bookings you capture, but only if availability stays accurate everywhere. Real-time sync is what makes wide distribution safe." },
      { h2: "Price with intent" },
      { p: "Centralized rate control lets you set and adjust pricing across every channel from one place, so you are never leaving revenue on the table or fighting rate parity issues by hand." },
      { p: "Simplified Management connects to 50+ OTAs, including the Indian platforms, and syncs everything from a single dashboard." },
    ],
  },
  {
    slug: "split-payouts-property-co-owners",
    title: "How to split payouts fairly with property co-owners",
    description:
      "Co-owned and investor-backed properties make payouts messy. Here is how to automate earnings and expense splits per booking.",
    category: "Operations",
    date: "2026-05-28",
    readingMinutes: 5,
    content: [
      { p: "When properties are co-owned or backed by investors, every booking raises the same question: who earns what, and who pays for what? Doing this by hand in spreadsheets is slow and error-prone." },
      { h2: "The problem with manual splits" },
      { ul: [
        "Every booking needs its share calculated separately",
        "Expenses have to be attributed to the right property and owner",
        "Owners want transparent statements they can trust",
      ] },
      { h2: "Automating partner payouts" },
      { p: "With partner accounts, you allocate properties (or shares of them) to partners once, then earnings and expenses split automatically on every booking, down to each daily payment. Everyone sees a clear statement." },
      { p: "Simplified Management handles this natively, so co-owned portfolios stay transparent without the spreadsheet gymnastics." },
    ],
  },
];

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  return Array.from(new Set(posts.map((p) => p.category)));
}

export function categorySlug(category: string): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getPostsByCategorySlug(slug: string): Post[] {
  return getAllPosts().filter((p) => categorySlug(p.category) === slug);
}

export function getRelatedPosts(slug: string, limit = 2): Post[] {
  const current = getPost(slug);
  if (!current) return [];
  return getAllPosts()
    .filter((p) => p.slug !== slug && p.category === current.category)
    .concat(getAllPosts().filter((p) => p.slug !== slug && p.category !== current.category))
    .slice(0, limit);
}
