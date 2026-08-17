import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { BrowserFrame } from "@/components/browser-frame";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Property Management for Boutique Hotels",
  description:
    "Manage room-type inventory, keep OTA rate parity, and run the front desk from one dashboard. Distribute across Booking.com, Agoda, Expedia, and the other channels you list on.",
  alternates: { canonical: "/solutions/boutique-hotels" },
};

const benefits = [
  "Sell by room type instead of a single listing, so deluxe, suite, and standard inventory each stay in sync across every OTA.",
  "Hold the same rate everywhere and protect parity across Booking.com, Agoda, and Expedia without editing each extranet by hand.",
  "See arrivals, departures, and in-house guests for the day so the front desk always knows who is coming and going.",
  "Close out a room type in seconds when it sells out or goes under maintenance, and reopen it just as fast.",
  "Assign housekeeping and maintenance tasks per room the moment a checkout is confirmed.",
];

const reasons = [
  {
    title: "Room-type inventory that stays accurate",
    body: "A boutique property is not one listing, it is a set of room types with different counts and rates. Simplified Management tracks availability per type and pushes the right count to every channel.",
  },
  {
    title: "Rate parity you do not have to police",
    body: "Set a room-type rate once and it applies across Booking.com, Agoda, Expedia, and MakeMyTrip together. No more logging into five extranets to keep prices aligned.",
  },
  {
    title: "A front desk view for daily operations",
    body: "Today's arrivals, departures, and occupancy sit on one screen alongside guest details and tasks, so your reception team runs the day without switching tools.",
  },
];

const faqs = [
  {
    q: "Can it handle multiple room types and rate plans?",
    a: "Yes. You define each room type with its own inventory count and rates, and Simplified Management syncs the correct availability and pricing per type across every connected OTA.",
  },
  {
    q: "How does it keep my rates the same across OTAs?",
    a: "You set a rate per room type inside Simplified Management and it distributes to Booking.com, Agoda, Expedia, and other channels together. Because pricing flows from one place, parity holds without manual extranet edits.",
  },
  {
    q: "Does it help my front desk with daily arrivals?",
    a: "The dashboard shows the day's arrivals, departures, and in-house guests with their booking details, so your reception team can check guests in and out and hand off housekeeping tasks from a single view.",
  },
];

export default function BoutiqueHotelsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Property management for boutique hotels"
        lede="A boutique hotel is a set of room types, not a single listing. Keep inventory and rate parity accurate across every OTA, and give your front desk one place to run the day."
      />

      <section className="section-pad border-b border-border">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why boutique hotels switch
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              Room-type inventory and parity, handled
            </h2>
            <ul className="mt-8 space-y-4">
              {benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-sync" />
                  <span className="text-body">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <BrowserFrame
            src="/screenshots/booking.png"
            alt="Boutique hotel room-type inventory and OTA distribution in the Simplified Management dashboard"
            width={1800}
            height={1010}
          />
        </div>
      </section>

      <section className="section-pad border-b border-border">
        <div className="container-page">
          <h2 className="max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            Why boutique hotel operators choose Simplified Management
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-2xl border border-border bg-card p-7">
                <h3 className="font-display text-lg font-semibold text-foreground">{r.title}</h3>
                <p className="mt-3 text-body">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqs} />
      <CtaSection />
    </>
  );
}
