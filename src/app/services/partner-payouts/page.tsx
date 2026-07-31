import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { BrowserFrame } from "@/components/browser-frame";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { features } from "@/lib/content";

const feature = features.find((f) => f.key === "payouts")!;

export const metadata: Metadata = {
  title: "Partner Accounts & Split Payouts",
  description:
    "Allocate properties to partners and split earnings and expenses automatically, down to each daily booking payment, with transparent statements for every co-owner.",
  alternates: { canonical: "/services/partner-payouts" },
};

const included = [
  {
    title: "Per-property allocation",
    body: "Assign each property to its owner or partner and set the split once. Every booking that follows is divided automatically.",
  },
  {
    title: "Earnings & expense splits",
    body: "Revenue and shared costs are apportioned per booking, so each partner sees exactly what they earned and what they owe.",
  },
  {
    title: "Transparent statements",
    body: "Give every co-owner a clear, itemised statement they can trust, without you exporting spreadsheets at month end.",
  },
];

const faqItems = [
  {
    q: "How are splits calculated?",
    a: "You set the split per property once, and earnings and expenses are apportioned automatically for every booking, down to each daily booking payment. No manual math at month end.",
  },
  {
    q: "Can each partner see their own numbers?",
    a: "Yes. Every co-owner gets a transparent statement of what they earned and what expenses were deducted, so payout conversations start from agreed figures.",
  },
  {
    q: "What if partners share costs like cleaning or maintenance?",
    a: "Shared expenses can be tracked against the property and split alongside earnings, so the statement reflects the true net position for each partner.",
  },
];

export default function PartnerPayoutsPage() {
  return (
    <>
      <PageHeader
        eyebrow={feature.tagline}
        title="Split every payout automatically, per booking"
        lede="Allocate properties to partners and split earnings and expenses automatically, down to each daily booking payment. Replace month-end spreadsheet reconciliation with statements every co-owner can trust."
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
                When you manage properties on behalf of other owners, payouts are where trust is won
                or lost. Here each booking is split the moment it is paid, so the numbers are always
                current and always defensible.
              </p>
              <p>
                Set the arrangement per property once, and earnings and shared expenses flow into
                each partner&apos;s account on their own. No end-of-month spreadsheet marathon, no
                manual apportioning across hundreds of bookings.
              </p>
              <p>
                Every partner gets a clear statement of what they earned and what was deducted, so
                payout day is a formality rather than a negotiation.
              </p>
            </div>
          </div>

          <BrowserFrame
            src="/screenshots/payments.png"
            alt="Simplified Management partner payouts splitting earnings and expenses per booking"
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
              Clean payouts for every co-owner
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
