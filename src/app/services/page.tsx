import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/sections/cta-section";
import { features } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Platform",
  description:
    "One platform for end-to-end property distribution: property management software, a 50+ OTA channel manager, real-time calendar sync, and partner split payouts.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Platform"
        title="One platform, end to end property distribution"
        lede="Four capabilities that run your whole portfolio from a single control room: a PMS to manage every listing, a channel manager to sell on 50+ OTAs, real-time calendar sync to end double bookings, and partner accounts that split every payout automatically."
      />

      <section className="section-pad">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Everything in one place
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Four modules, one source of truth
            </h2>
            <p className="mx-auto mt-4 text-lg text-body">
              Each capability works on its own and gets stronger together. Pick where you start,
              then switch on the rest as you scale.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.key}
                className="flex flex-col rounded-2xl border border-border bg-card p-7"
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  {feature.tagline}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 flex-1 text-body">{feature.description}</p>
                <Link
                  href={feature.href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                >
                  Learn more <ArrowRight className="size-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
