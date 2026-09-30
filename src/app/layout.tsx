import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { OrgSchema } from "@/components/org-schema";
import { CookieConsent } from "@/components/cookie-consent";

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
  metadataBase: new URL("https://simplifiedmanagement.in"),
  title: {
    default:
      "Simplified Management - Property Management Software & Channel Manager",
    template: "%s | Simplified Management",
  },
  description:
    "Simplified Management is a centralized property management software (PMS) and channel manager. Sync calendars, automate OTA distribution, and split partner payouts from one dashboard.",
  applicationName: "Simplified Management",
  keywords: [
    "property management software",
    "channel manager",
    "PMS",
    "OTA distribution",
    "vacation rental software",
    "Airbnb channel manager",
    "Booking.com sync",
    "India",
  ],
  openGraph: {
    type: "website",
    siteName: "Simplified Management",
    url: "https://simplifiedmanagement.in",
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
        <CookieConsent />
      </body>
    </html>
  );
}
