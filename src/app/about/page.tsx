import type { Metadata } from "next";
import { Compass, ShieldCheck, Repeat } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/sections/cta-section";
import { productStats } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Simplified Management builds property management software and a channel manager for multi-property operators in India. Learn what we believe and where we are based.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Compass,
    title: "One source of truth",
    body: "Operators lose hours reconciling spreadsheets, OTA extranets, and WhatsApp threads. We put every property, booking, and payout in one place so the numbers always agree.",
  },
  {
    icon: Repeat,
    title: "Automate the repetitive",
    body: "Manual calendar updates and copy-paste rate changes are where mistakes and double bookings happen. We automate the repetitive work so your team can focus on guests and growth.",
  },
  {
    icon: ShieldCheck,
    title: "Built for how India operates",
    body: "From MakeMyTrip and Goibibo to partner payout splits and local support, we design for the realities of running rentals and boutique stays across India.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Software that ends the spreadsheet chaos of multi-property operations"
        lede="Simplified Management is a property management platform and channel manager built for operators who run anywhere from 10 to 500+ listings across many OTAs, owners, and locations."
      />

      <section className="section-pad border-b border-border">
        <div className="container-page max-w-3xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Our mission
          </p>
          <p className="text-lg text-body">
            Running multiple properties should not mean living inside a dozen browser tabs and a
            fragile spreadsheet. As portfolios grow, the manual work of keeping calendars aligned,
            rates in sync, and payouts fair grows faster than the revenue. That gap is where money
            and time quietly leak out.
          </p>
          <p className="text-lg text-body">
            We built Simplified Management to close that gap. One dashboard manages every listing,
            reservation, guest, and task. A channel manager distributes availability across 50+ OTAs
            and keeps them synced in real time, so the same night is never sold twice. Partner
            accounts split earnings and expenses automatically, down to each booking.
          </p>
          <p className="text-lg text-body">
            The goal is simple: give property operators a calm, reliable control room, so growing to
            the next 100 listings feels like less work, not more.
          </p>
        </div>
      </section>

      <section className="section-pad border-b border-border">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              What we believe
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              The principles behind the product
            </h2>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-7"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <value.icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{value.title}</h3>
                <p className="mt-3 text-body">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {productStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card p-7 text-center"
              >
                <p className="font-display text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border">
        <div className="container-page max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Where we are
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
            Based in Viman Nagar, Pune, India
          </h2>
          <p className="mt-4 text-lg text-body">
            Our team works out of Viman Nagar, Pune, and supports property operators across India.
            Being local means we understand the OTAs, payment flows, and support expectations that
            matter here, and we are in your time zone when you need us.
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
