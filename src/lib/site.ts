export const site = {
  name: "Simplified Management",
  shortName: "Simplified",
  url: "https://simplifiedmanagement.in",
  loginUrl: "https://app.simplifiedmanagement.in/login",
  description:
    "Centralized property management software (PMS) and channel manager. Sync calendars, automate OTA distribution, and split partner payouts from one dashboard.",
  email: "info@simplifiedmanagement.in",
  address: {
    locality: "Viman Nagar, Pune",
    region: "Maharashtra",
    country: "India",
  },
  phones: [
    { label: "+91 98250 25388", tel: "+919825025388" },
    { label: "+91 95193 06090", tel: "+919519306090" },
  ],
  whatsapp: "919825025388",
  socials: {
    instagram: "https://www.instagram.com/simplified_management.in/",
    facebook: "https://www.facebook.com/profile.php?id=61591756372165",
    youtube: "https://www.youtube.com/",
    linkedin: "https://www.linkedin.com/",
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
    { label: "Integrations", href: "/integrations" },
    { label: "Compare", href: "/compare" },
    { label: "Book a Demo", href: "/demo" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
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
  { name: "StayVista", slug: "stayvista" },
] as const;

/** Real, defensible product metrics (from the live app) — used instead of a fabricated rating. */
export const productStats = [
  { value: "10-500+", label: "Listings per operator", live: false },
  { value: "50+", label: "OTA channels", live: false },
  { value: "Real-time", label: "Calendar sync", live: true },
  { value: "15+", label: "Operations modules", live: false },
] as const;
