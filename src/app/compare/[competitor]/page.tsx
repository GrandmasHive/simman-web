import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/sections/cta-section";

const competitors: Record<string, { name: string }> = {
  hostaway: { name: "Hostaway" },
  guesty: { name: "Guesty" },
  lodgify: { name: "Lodgify" },
};

export function generateStaticParams() {
  return [{ competitor: "hostaway" }, { competitor: "guesty" }, { competitor: "lodgify" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>;
}): Promise<Metadata> {
  const { competitor } = await params;
  const entry = competitors[competitor];
  if (!entry) return {};
  return {
    title: `Simplified Management vs ${entry.name}`,
    description: `If you are comparing ${entry.name} with Simplified Management, here is what operators in India tell us matters: OTA coverage, partner payouts, real-time sync, and local support.`,
    alternates: { canonical: `/compare/${competitor}` },
  };
}

const capabilities = [
  {
    title: "India OTA coverage",
    body: "Distribute and sync across India-focused OTAs like MakeMyTrip and Goibibo, alongside Airbnb, Booking.com, Agoda, Expedia, and Vrbo, from one dashboard.",
  },
  {
    title: "Partner payouts",
    body: "Allocate properties to partners and automatically split earnings and expenses per booking, with transparent statements for every co-owner.",
  },
  {
    title: "Real-time calendar sync",
    body: "Two-way, real-time availability sync keeps every channel aligned, so the same night is never double-sold.",
  },
  {
    title: "Local support",
    body: "A team based in Viman Nagar, Pune, in your time zone, that understands the OTAs and payment flows you work with.",
  },
];

export default async function CompetitorComparePage({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  const { competitor } = await params;
  const entry = competitors[competitor];
  if (!entry) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Compare"
        title={`Simplified Management vs ${entry.name}`}
        lede={`Both platforms help you manage listings and distribute across OTAs. If you are weighing ${entry.name} against Simplified Management, this page focuses on the capabilities operators in India tell us matter most.`}
      />

      <section className="section-pad border-b border-border">
        <div className="container-page max-w-3xl">
          <Link
            href="/compare"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="size-4" /> All comparisons
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-primary">
            A fair comparison
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
            What operators tell us matters
          </h2>
          <p className="mt-4 text-lg text-body">
            {entry.name} is an established tool used by property operators. Rather than make claims
            about its roadmap or pricing, we focus here on what Simplified Management offers, so you
            can line it up against your own evaluation of {entry.name}. If you are comparing{" "}
            {entry.name} with Simplified Management, here is what operators tell us matters.
          </p>
        </div>
      </section>

      <section className="section-pad border-b border-border">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              What Simplified Management offers
            </h2>
            <p className="mx-auto mt-4 text-lg text-body">
              Use these as a checklist when you evaluate {entry.name} or any other platform.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-7"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-sync/15 text-sync-text">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{cap.title}</h3>
                <p className="mt-3 text-body">{cap.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border">
        <div className="container-page max-w-3xl">
          <div className="rounded-2xl border border-border bg-subtle p-7">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Do your own diligence
            </p>
            <p className="mt-3 text-body">
              Every portfolio is different. The best way to compare {entry.name} and Simplified
              Management is to see both against your real properties, channels, and payout structure.
              Request a demo and we will map the platform to how your team actually works.
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
