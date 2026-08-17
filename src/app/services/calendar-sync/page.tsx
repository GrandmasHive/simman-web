import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { BrowserFrame } from "@/components/browser-frame";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { features } from "@/lib/content";

const feature = features.find((f) => f.key === "calendar")!;

export const metadata: Metadata = {
  title: "Calendar Sync",
  description:
    "Keep one master calendar and sync it out to your OTAs, cutting down double bookings and the manual work of keeping calendars aligned across your whole portfolio.",
  alternates: { canonical: "/services/calendar-sync" },
};

const steps = [
  {
    step: "1",
    title: "One master calendar",
    body: "Every property has a single source of truth for availability that every connected channel reads from.",
  },
  {
    step: "2",
    title: "Two-way updates",
    body: "A booking, block, or cancellation on any connected channel syncs back to your master calendar, and changes you make there sync out to the rest.",
  },
  {
    step: "3",
    title: "Fewer double bookings",
    body: "Because the same night is tracked in one place, guests are far less likely to book a night that is already sold.",
  },
];

const faqItems = [
  {
    q: "How does the calendar sync work?",
    a: "Availability, rates, and reservations sync across every connected channel from your master calendar. When a night sells on one channel, that update flows through to the others, so you can keep the same night from being double-sold.",
  },
  {
    q: "What happens if a guest cancels?",
    a: "A cancellation reopens those nights on your master calendar, and that availability syncs back out to your connected channels, so you are not re-listing it by hand.",
  },
  {
    q: "Do I still need to update calendars manually anywhere?",
    a: "No. The master calendar drives distribution, so you manage availability in one place and sync it out to every connected OTA instead of updating each one separately.",
  },
];

export default function CalendarSyncPage() {
  return (
    <>
      <PageHeader
        eyebrow={feature.tagline}
        title="Keep the same night from being double-sold"
        lede="Every booking updates your master calendar, which syncs out to every OTA you sell on. Cut down double bookings and the daily manual work of keeping availability aligned across your portfolio."
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
                A double booking costs you a refund, a scramble to rehouse a guest, and a review you
                cannot undo. Calendar sync is built to close the gap that causes them: one master
                calendar that every connected channel reads from and writes back to.
              </p>
              <p>
                Your master calendar drives every channel. When one platform takes a booking, that
                update syncs across your other connected channels, so there is far less risk of two
                guests claiming the same room.
              </p>
              <p>
                For a large portfolio, that means far less end-of-day calendar reconciliation. Your
                team spends its time on guests and turnovers, not on chasing calendars into
                agreement.
              </p>
            </div>
          </div>

          <BrowserFrame
            src="/screenshots/calendar.png"
            alt="Simplified Management master calendar syncing availability across channels"
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
              One calendar, every channel, kept in sync
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
