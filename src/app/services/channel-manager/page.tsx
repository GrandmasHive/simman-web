import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { BrowserFrame } from "@/components/browser-frame";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { features } from "@/lib/content";

const feature = features.find((f) => f.key === "channel")!;

export const metadata: Metadata = {
  title: "Channel Manager",
  description:
    "Distribute and sync listings, rates, and availability across Airbnb, Booking.com, Agoda, Expedia, and 50+ OTAs from one calendar. Sell everywhere, oversell nowhere.",
  alternates: { canonical: "/services/channel-manager" },
};

const steps = [
  {
    step: "1",
    title: "Connect your channels",
    body: "Link Airbnb, Booking.com, Agoda, Expedia, MakeMyTrip, Goibibo, StayVista, and more from one login, no separate extranets to juggle.",
  },
  {
    step: "2",
    title: "Set rates and rules once",
    body: "Manage pricing, minimum stays, and availability centrally. Push the same rules to every channel or tailor them per platform.",
  },
  {
    step: "3",
    title: "Sell with confidence",
    body: "A booking on any channel instantly closes that night everywhere else, so you fill more nights without ever overselling.",
  },
];

const faqItems = [
  {
    q: "Which channels can I connect?",
    a: "Simplified Management connects to 50+ OTAs, including Airbnb, Booking.com, Agoda, Expedia, Vrbo, MakeMyTrip, Goibibo, and StayVista, all managed from one dashboard.",
  },
  {
    q: "Will connecting more channels cause double bookings?",
    a: "No. Availability syncs two-way in real time, so the moment a night sells on one channel it closes on every other, whether you are on two channels or twenty.",
  },
  {
    q: "Can I price differently on different platforms?",
    a: "Yes. Set a central rate and apply per-channel adjustments where you need them, so you can account for commissions and demand without managing separate calendars.",
  },
];

export default function ChannelManagerPage() {
  return (
    <>
      <PageHeader
        eyebrow={feature.tagline}
        title="Sell on 50+ OTAs from a single calendar"
        lede="Distribute and sync your listings, rates, and availability across Airbnb, Booking.com, Agoda, Expedia, and 50+ other channels from one place. Reach more guests without the manual updates or the risk of selling the same night twice."
      />

      <section className="section-pad border-b border-border">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <ul className="space-y-4">
              {feature.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-sync" />
                  <span className="text-body">{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-4 text-body">
              <p>
                Every channel you sell on pulls from one master calendar. Update a rate or block a
                date once, and the change lands on Airbnb, Booking.com, Agoda, and the rest without
                a single copy-paste.
              </p>
              <p>
                Wider distribution usually means more manual work and more mistakes. Here it means
                the opposite: more channels filling more nights, all driven from a view your whole
                team can trust.
              </p>
              <p>
                When a reservation comes in, it flows straight into your dashboard alongside every
                other booking, so distribution and operations stay in lockstep.
              </p>
            </div>
          </div>

          <BrowserFrame
            src="/screenshots/booking.png"
            alt="Simplified Management channel manager syncing bookings across OTAs"
            width={1800}
            height={1010}
          />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              From scattered listings to one calendar
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="rounded-2xl border border-border bg-card p-7">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-subtle font-display text-lg font-bold text-primary">
                  {item.step}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faqItems} />
      <CtaSection />
    </>
  );
}
