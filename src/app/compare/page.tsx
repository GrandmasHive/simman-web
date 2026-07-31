import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Compare",
  description:
    "Comparing channel managers for India? See how Simplified Management approaches OTA coverage, partner payouts, real-time sync, and local support.",
  alternates: { canonical: "/compare" },
};

const competitors = [
  {
    slug: "hostaway",
    name: "Hostaway",
    blurb: "Compare capabilities operators tell us matter when choosing between Hostaway and Simplified Management.",
  },
  {
    slug: "guesty",
    name: "Guesty",
    blurb: "See how Simplified Management approaches OTA coverage, payouts, and support next to Guesty.",
  },
  {
    slug: "lodgify",
    name: "Lodgify",
    blurb: "A fair look at what matters when weighing Lodgify against Simplified Management.",
  },
];

const strengths = [
  "Coverage for India OTAs like MakeMyTrip and Goibibo, alongside Airbnb, Booking.com, Agoda, and Expedia",
  "Partner accounts that split earnings and expenses automatically, per booking",
  "Real-time, two-way calendar sync so the same night is never double-sold",
  "Local support in your time zone, based in Viman Nagar, Pune",
];

export default function ComparePage() {
  return (
    <>
      <PageHeader
        eyebrow="Compare"
        title="Choosing a channel manager for India"
        lede="If you are evaluating channel managers, it helps to compare the things that actually affect day-to-day operations. Here is how Simplified Management fits, and how it stacks up against tools operators often consider."
      />

      <section className="section-pad border-b border-border">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Side-by-side
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Compare Simplified Management
            </h2>
            <p className="mx-auto mt-4 text-lg text-body">
              We keep these comparisons fair and factual. Pick a tool below to see the capabilities
              operators tell us matter most.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {competitors.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/50"
              >
                <h3 className="font-display text-xl font-semibold">
                  vs {c.name}
                </h3>
                <p className="mt-3 flex-1 text-body">{c.blurb}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  Read comparison <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why operators choose us
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Built for how India operates
            </h2>
            <p className="mt-4 text-lg text-body">
              Many platforms are built for other markets first. Simplified Management is designed
              around the OTAs, payout structures, and support expectations that matter for operators
              in India.
            </p>
          </div>
          <ul className="space-y-4">
            {strengths.map((s) => (
              <li key={s} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sync/15 text-sync-text">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span className="text-body">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
