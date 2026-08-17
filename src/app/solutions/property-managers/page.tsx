import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { BrowserFrame } from "@/components/browser-frame";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Software for Property Managers",
  description:
    "Run multi-owner portfolios of 10 to 500+ listings. Automate partner payouts, split earnings per booking, and give every owner a transparent statement from one dashboard.",
  alternates: { canonical: "/solutions/property-managers" },
};

const benefits = [
  "Allocate each property to its owner or partner and split earnings and expenses automatically, down to every daily booking payment.",
  "Give each owner a clear statement of what their properties earned and what was deducted, without building spreadsheets by hand.",
  "Distribute an entire portfolio of 10 to 500+ listings across your OTAs from one login instead of separate accounts.",
  "Manage staff, tasks, and turnovers across every property so on-ground teams know exactly what to do at each unit.",
  "Track occupancy, revenue, and expenses across the whole book of business, then drill into any single owner or property.",
];

const reasons = [
  {
    title: "Partner payouts that calculate themselves",
    body: "You manage properties for many owners on different terms. Simplified Management splits earnings and expenses per booking automatically, so payouts are correct without a month-end spreadsheet marathon.",
  },
  {
    title: "Transparency every owner can see",
    body: "Each owner gets a clean statement of bookings, revenue, and deductions for their properties, which keeps trust high and cuts the back-and-forth over who earned what.",
  },
  {
    title: "Built to scale from 10 to 500+",
    body: "Add owners and properties without adding logins or tools. One dashboard runs distribution, operations, and settlement across the entire portfolio as it grows.",
  },
];

const faqs = [
  {
    q: "Can I manage properties for many different owners?",
    a: "Yes. You allocate each property to an owner or partner, and Simplified Management tracks bookings, revenue, and expenses per owner. Earnings and costs are split automatically per booking based on the terms you set.",
  },
  {
    q: "How are partner payouts and statements handled?",
    a: "Payouts are calculated automatically as bookings come in, splitting earnings and expenses down to each daily payment. Every owner gets a transparent statement, so you avoid manual month-end reconciliation.",
  },
  {
    q: "Does it scale to a large portfolio?",
    a: "The platform is built for operators running 10 to 500+ listings. You distribute across your OTAs, run operations, and settle partner payouts from one dashboard, adding owners and listings without extra tools.",
  },
];

export default function PropertyManagersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Software for property managers"
        lede="Managing properties for many owners means distribution, operations, and settlement at scale. Automate partner payouts, keep every owner statement transparent, and run 10 to 500+ listings from one dashboard."
      />

      <section className="section-pad border-b border-border">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why property managers switch
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              Multi-owner portfolios, settled automatically
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
            src="/screenshots/payments.png"
            alt="Partner payout splits and per-owner statements across a managed property portfolio in Simplified Management"
            width={1800}
            height={1010}
          />
        </div>
      </section>

      <section className="section-pad border-b border-border">
        <div className="container-page">
          <h2 className="max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            Why property managers choose Simplified Management
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
