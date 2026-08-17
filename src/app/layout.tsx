import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";
import { OrgSchema } from "@/components/org-schema";

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

const GA_ID = "G-66919LQZJG";
const META_PIXEL = "1360745635969895";

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
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL}');fbq('track','PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL}&ev=PageView&noscript=1`}
          />
        </noscript>

        <OrgSchema />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
