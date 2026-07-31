import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { BrowserFrame } from "@/components/browser-frame";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { features } from "@/lib/content";

const feature = features.find((f) => f.key === "calendar")!;

export const metadata: Metadata = {
  title: "Real-Time Calendar Sync",
  description:
    "Every booking updates every channel instantly. Eliminate double bookings and the manual work of keeping OTA calendars aligned across your whole portfolio.",
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
    title: "Instant two-way updates",
    body: "A booking, block, or cancellation on any channel pushes to all the others in real time, with no refresh or manual export.",
  },
  {
    step: "3",
    title: "Zero double bookings",
    body: "Because the same night can only be open in one place at a time, guests never book a night that is already sold.",
  },
];

const faqItems = [
  {
    q: "How fast does the calendar actually sync?",
    a: "Availability, rates, and reservations sync in real time. The moment a night sells on one channel, it closes on every other connected channel, so the same night is never double-sold.",
  },
  {
    q: "What happens if a guest cancels?",
    a: "A cancellation reopens those nights across every channel automatically, so the availability goes straight back on sale without anyone re-listing it by hand.",
  },
  {
    q: "Do I still need to update calendars manually anywhere?",
    a: "No. The master calendar drives all distribution, so you manage availability in one place and every OTA stays aligned on its own.",
  },
];

export default function CalendarSyncPage() {
  return (
    <>
      <PageHeader
        eyebrow={feature.tagline}
        title="The same night is never double-sold"
        lede="Every booking updates every channel instantly. Real-time calendar sync eliminates double bookings and the daily manual work of keeping availability aligned across every OTA you sell on."
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
                cannot undo. Real-time sync removes the gap that causes them: availability updates
                everywhere the instant a night is sold.
              </p>
              <p>
                Your master calendar drives every channel. When one platform takes a booking, the
                others close that night automatically, so there is no window where two guests can
                claim the same room.
              </p>
              <p>
                For a large portfolio, that means no more end-of-day calendar reconciliation. Your
                team spends its time on guests and turnovers, not on chasing calendars into
                agreement.
              </p>
            </div>
          </div>

          <BrowserFrame
            src="/screenshots/calendar.png"
            alt="Simplified Management master calendar syncing availability across channels in real time"
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
              One calendar, every channel, always in agreement
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
