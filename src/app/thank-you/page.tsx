import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConversionTracker } from "@/components/conversion-tracker";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thanks for your demo request. The Simplified Management team will reply within 24 business hours.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <section className="section-pad">
      <ConversionTracker />
      <div className="container-page max-w-2xl text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-sync/15 text-sync-text">
          <CheckCircle2 className="size-9" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-extrabold sm:text-4xl">Thank you. We&apos;re on it.</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-body">
          Your demo request has reached our team. We&apos;ll get back to you within 24 business hours to
          schedule a walkthrough tailored to your portfolio. Prefer to talk sooner? Call or WhatsApp us now.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <a href={`https://wa.me/${site.whatsapp}?text=Hi%2C%20I%20just%20requested%20a%20demo%20of%20Simplified%20Management.`}>
              Chat on WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-body">
          Call us:{" "}
          {site.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="mr-3 font-semibold text-primary hover:underline">
              {p.label}
            </a>
          ))}
        </p>
      </div>
    </section>
  );
}
