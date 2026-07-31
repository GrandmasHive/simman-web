import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { BrowserFrame } from "@/components/browser-frame";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Channel Management for Vacation Rentals",
  description:
    "Sync villas and homestays across Airbnb, Vrbo, StayVista, and 50+ OTAs in real time. End double bookings on peak weekends and price for seasonality from one calendar.",
  alternates: { canonical: "/solutions/vacation-rentals" },
};

const benefits = [
  "List the same villa on Airbnb, Vrbo, StayVista, and Booking.com without maintaining separate calendars for each.",
  "A confirmed booking blocks the night everywhere instantly, so a long weekend is never sold twice.",
  "Set higher rates for festival dates, school holidays, and long weekends, then let them apply across every channel at once.",
  "Track each home's occupancy and revenue on its own, even when the same guest journey spans multiple listings.",
  "Hand cleaning and turnover tasks to on-ground staff the moment a checkout is confirmed.",
];

const reasons = [
  {
    title: "No more peak-weekend double bookings",
    body: "Vacation demand clusters on the same handful of dates. Real-time two-way sync means the night a guest books on Airbnb disappears from Vrbo and StayVista before the next enquiry lands.",
  },
  {
    title: "Seasonal pricing without spreadsheets",
    body: "Set rate rules for peak, shoulder, and off-season once. Simplified Management pushes them to every connected OTA so you stop hand-editing prices channel by channel.",
  },
  {
    title: "Every home accounted for",
    body: "Whether you run five homestays or fifty villas, each property carries its own bookings, revenue, and expense trail, so you always know which home is actually earning.",
  },
];

const faqs = [
  {
    q: "Can I connect my Airbnb, Vrbo, and StayVista listings together?",
    a: "Yes. Simplified Management connects to 50+ OTAs including Airbnb, Vrbo, StayVista, Booking.com, and MakeMyTrip. You manage one master calendar per property and availability syncs both ways across every channel in real time.",
  },
  {
    q: "How does it stop double bookings on busy weekends?",
    a: "The moment a night is booked on any channel, it is blocked everywhere else instantly. There is no overnight refresh or manual calendar update, so the same peak date is never sold on two platforms.",
  },
  {
    q: "Can I charge more during peak season and holidays?",
    a: "You set rate rules for seasons, festivals, and long weekends once, and they apply across all connected OTAs. You can also override pricing for specific dates on a single property when you need to.",
  },
];

export default function VacationRentalsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Channel management for vacation rentals"
        lede="Villas and homestays live or die on peak-weekend availability. Distribute across Airbnb, Vrbo, and StayVista from one calendar, price for seasonality, and never sell the same night twice."
      />

      <section className="section-pad border-b border-border">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why vacation rental hosts switch
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              One calendar for every listing you own
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
            src="/screenshots/calendar.png"
            alt="Real-time availability calendar syncing a vacation rental across Airbnb, Vrbo, and StayVista"
            width={1800}
            height={1010}
          />
        </div>
      </section>

      <section className="section-pad border-b border-border">
        <div className="container-page">
          <h2 className="max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            Why vacation rental operators choose Simplified Management
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
