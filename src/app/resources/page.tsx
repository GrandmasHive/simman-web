import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/sections/cta-section";
import { ResourceGate, type Resource } from "@/components/resource-gate";

export const metadata: Metadata = {
  title: "Free Templates",
  description:
    "Free spreadsheet templates for short-term rental and property operators: a booking and payout tracker, and a GST-ready invoice template.",
  alternates: { canonical: "/resources" },
};

const resources: Resource[] = [
  {
    slug: "booking-payout-tracker",
    title: "Booking & Payout Tracker",
    description:
      "A ready-to-use spreadsheet for logging bookings and calculating partner payout splits, with the formulas already built in.",
    file: "/resources/booking-payout-tracker.xlsx",
    fileLabel: "the tracker",
    note: "Includes a Read Me tab covering how to use it.",
  },
  {
    slug: "gst-ready-invoice-template",
    title: "GST-Ready Invoice Template",
    description:
      "A formatted invoice template laid out for GST line items, so you are not building an invoice from scratch for every booking.",
    file: "/resources/gst-ready-invoice-template.xlsx",
    fileLabel: "the template",
    note: "Formatting only — confirm the applicable GST rate with a CA before use.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Free templates for property operators"
        lede="Two spreadsheets we built for our own operators: a booking and payout tracker, and a GST-ready invoice template. Enter your email once to unlock both."
      />

      <section className="section-pad">
        <div className="container-page max-w-3xl">
          <ResourceGate resources={resources} />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
