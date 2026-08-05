import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { BrowserFrame } from "@/components/browser-frame";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { features } from "@/lib/content";

const feature = features.find((f) => f.key === "pms")!;

export const metadata: Metadata = {
  title: "Property Management Software",
  description:
    "Run every property, reservation, guest, and task from one live dashboard. Property management software built for operators handling 10 to 500+ listings.",
  alternates: { canonical: "/services/property-management-software" },
};

const included = [
  {
    title: "Portfolio dashboard",
    body: "Occupancy, revenue, and today's arrivals and departures across every property, refreshed live.",
  },
  {
    title: "Reservations & guests",
    body: "Every booking, guest profile, and message thread in one timeline, no matter which channel it came from.",
  },
  {
    title: "Tasks & housekeeping",
    body: "Assign cleaning, maintenance, and check-in prep to staff and track it to completion per property.",
  },
];

const faqItems = [
  {
    q: "Is this suitable for a portfolio of a few hundred listings?",
    a: "Yes. The dashboard is built for operators running 10 to 500+ listings, with filtering, search, and per-property views so a large portfolio stays as easy to work as a handful of units.",
  },
  {
    q: "Does it replace my spreadsheets and separate booking tools?",
    a: "That is the goal. Reservations, guests, revenue, expenses, tasks, and staff live in one system, so you stop reconciling spreadsheets and copying data between tools.",
  },
  {
    q: "Can my team use it, not just the owner?",
    a: "Yes. Staff and housekeeping can be assigned tasks and given access to the properties they work on, while you keep the full portfolio view.",
  },
];

export default function PropertyManagementSoftwarePage() {
  return (
    <>
      <PageHeader
        eyebrow={feature.tagline}
        title="Run your whole portfolio from one control room"
        lede="Manage every property, reservation, guest, and task from a single dashboard. See live occupancy, revenue, and activity across your entire portfolio, without stitching together spreadsheets and five different logins."
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
                Every reservation, expense, and guest interaction rolls up into one live view, so
                you always know what your portfolio is earning and where your attention is needed
                today.
              </p>
              <p>
                Instead of jumping between OTA extranets and booking spreadsheets, your team works
                from a single screen. New bookings, cancellations, and payments appear the moment
                they happen.
              </p>
              <p>
                As you add properties, the dashboard scales with you. Filter by building, city, or
                owner, and drill into any single unit without losing the portfolio picture.
              </p>
            </div>
          </div>

          <BrowserFrame
            src="/screenshots/overview.png"
            alt="Simplified Management portfolio dashboard with live occupancy, revenue, and activity"
            width={1800}
            height={1010}
          />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              What&apos;s included
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              One system for the whole operation
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {included.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-7">
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
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
