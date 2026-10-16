export const site = {
  name: "Simplified Management",
  shortName: "Simplified",
  url: "https://www.simplifiedmanagement.in",
  loginUrl: "https://app.simplifiedmanagement.in/login",
  description:
    "Every booking, task and payout for every listing, on one screen. Bookings from every site you list on in one view, a calendar that flags clashes, and a statement for every owner.",
  email: "info@simplifiedmanagement.in",
  address: {
    locality: "Viman Nagar, Pune",
    region: "Maharashtra",
    country: "India",
  },
  phones: [
    { label: "+91 98240 04043", tel: "+919824004043" },
  ],
  whatsapp: "919824004043",
  socials: {
    instagram: "https://www.instagram.com/simplified_management.in/",
    facebook: "https://www.facebook.com/profile.php?id=61591756372165",
    linkedin: "https://www.linkedin.com/company/simplified-management-in/",
    youtube: "https://www.youtube.com/@simplified_management",
  },
} as const;

export const nav = {
  primary: [
    { label: "Product", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Pricing", href: "/pricing" },
    { label: "Integrations", href: "/integrations" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  solutions: [
    { label: "Vacation Rentals", href: "/solutions/vacation-rentals" },
    { label: "Boutique Hotels", href: "/solutions/boutique-hotels" },
    { label: "Serviced Apartments", href: "/solutions/serviced-apartments" },
    { label: "Property Managers", href: "/solutions/property-managers" },
  ],
  services: [
    { label: "Property Management Software", href: "/services/property-management-software" },
    { label: "Channel Manager", href: "/services/channel-manager" },
    { label: "Calendar Sync", href: "/services/calendar-sync" },
    { label: "Partner Payouts", href: "/services/partner-payouts" },
  ],
  footerCompany: [
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Security", href: "/security" },
    { label: "ROI Calculator", href: "/roi-calculator" },
    { label: "Contact", href: "/contact" },
  ],
  footerResources: [
    { label: "Blog", href: "/blog" },
    { label: "Free Templates", href: "/resources" },
    { label: "Integrations", href: "/integrations" },
    { label: "Compare", href: "/compare" },
    { label: "Book a Demo", href: "/demo" },
    { label: "Privacy", href: "/privacy" },
    { label: "App Privacy", href: "/app-privacy" },
    { label: "Terms", href: "/terms" },
    { label: "DPA", href: "/dpa" },
  ],
} as const;

/** OTA channels used across integrations + "works with" logo rows. */
export const otaChannels = [
  { name: "Airbnb", slug: "airbnb" },
  { name: "Booking.com", slug: "booking-com" },
  { name: "Agoda", slug: "agoda" },
  { name: "Expedia", slug: "expedia" },
  { name: "Vrbo", slug: "vrbo" },
  { name: "MakeMyTrip", slug: "makemytrip" },
  { name: "Goibibo", slug: "goibibo" },
  { name: "Cleartrip", slug: "cleartrip" },
] as const;

/** Real, defensible product metrics (from the live app) — used instead of a fabricated rating. */
export const productStats = [
  { value: "10-500+", label: "Listings per operator", live: false },
  { value: "50+", label: "Indian & global OTAs", live: false },
  { value: "Two-way", label: "Calendar sync", live: false },
  { value: "15+", label: "Operations modules", live: false },
] as const;
