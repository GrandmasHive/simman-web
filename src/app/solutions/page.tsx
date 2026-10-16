import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Solutions by Property Type",
  description:
    "Simplified Management adapts to how you operate, whether you run vacation rentals, boutique hotels, serviced apartments, or a multi-owner managed portfolio.",
  alternates: { canonical: "/solutions" },
};

const segments = [
  {
    href: "/solutions/vacation-rentals",
    title: "Vacation Rentals",
    description:
      "Sell villas and homestays across Airbnb, Vrbo, and Cleartrip without ever double-booking a peak weekend.",
  },
  {
    href: "/solutions/boutique-hotels",
    title: "Boutique Hotels",
    description:
      "Manage room-type inventory and OTA rate parity from the same front desk your team already uses.",
  },
  {
    href: "/solutions/serviced-apartments",
    title: "Serviced Apartments",
    description:
      "Blend nightly OTA demand with monthly corporate stays and keep one clean availability calendar.",
  },
  {
    href: "/solutions/property-managers",
    title: "Property Managers",
    description:
      "Run multi-owner portfolios at scale with automatic partner payouts and per-owner statements.",
  },
] as const;

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Built for how you run your properties"
        lede="Every operator distributes, prices, and settles differently. Pick the segment that matches your business and see how Simplified Management fits the way you already work."
      />
      <section className="section-pad">
        <div className="container-page grid gap-6 sm:grid-cols-2">
          {segments.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/50"
            >
              <h2 className="font-display text-xl font-bold text-foreground">{s.title}</h2>
              <p className="mt-3 text-body">{s.description}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Explore this solution
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
