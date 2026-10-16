import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { OrgSchema } from "@/components/org-schema";
import { CookieConsent } from "@/components/cookie-consent";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Simplified Management - Property Management Software for Indian Rentals and Hotels",
    template: "%s | Simplified Management",
  },
  description:
    "Every booking, task and payout for every listing, on one screen. Bookings from every site you list on in one view, a calendar that flags clashes, and a statement for every owner.",
  applicationName: "Simplified Management",
  keywords: [
    "property management software",
    "PMS",
    "homestay management software",
    "villa management software",
    "vacation rental software",
    "hotel software India",
    "India",
  ],
  openGraph: {
    type: "website",
    siteName: "Simplified Management",
    url: site.url,
    images: ["/og-image.png"],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`} style={{ colorScheme: "light" }}>
      <body className="min-h-dvh flex flex-col bg-background text-foreground antialiased">
        <OrgSchema />
        <SiteChrome>{children}</SiteChrome>
        {/* GA4 and Meta Pixel load from here, only after the visitor accepts. */}
        <CookieConsent />
      </body>
    </html>
  );
}
