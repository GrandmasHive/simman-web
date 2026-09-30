import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DemoForm } from "@/components/demo-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Demo",
  description:
    "Book a personalized demo of Simplified Management. See the PMS, channel manager, calendar sync, and partner payouts tailored to your portfolio.",
  alternates: { canonical: "/demo" },
};

const points = [
  "A walkthrough tailored to your number of listings",
  "See calendar sync and OTA distribution in action",
  "Partner payout automation for co-owned properties",
  "Which plan fits you, and what your first bill looks like",
];

export default function DemoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Request a Demo"
        title="See Simplified Management in action"
        lede="Share a few details and our team replies within 24 business hours to schedule a walkthrough built around your portfolio."
      />
      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-display text-2xl font-bold">What you&apos;ll see</h2>
            <ul className="mt-6 space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sync/15 text-sync-text">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-body">{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-xl border border-border bg-subtle p-5">
              <p className="text-sm font-semibold">Prefer to talk now?</p>
              <p className="mt-2 text-sm text-body">
                {site.phones.map((ph) => (
                  <a key={ph.tel} href={`tel:${ph.tel}`} className="mr-3 font-semibold text-primary hover:underline">
                    {ph.label}
                  </a>
                ))}
              </p>
              <a
                href={`https://wa.me/${site.whatsapp}?text=Hi%2C%20I%27d%20like%20a%20demo%20of%20Simplified%20Management.`}
                className="mt-3 inline-flex text-sm font-semibold text-sync hover:underline"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
          <DemoForm />
        </div>
      </section>
    </>
  );
}
