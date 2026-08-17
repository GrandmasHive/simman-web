import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrowserFrame } from "@/components/browser-frame";
import { SyncDot } from "@/components/sync-dot";
import { productStats, site, otaChannels } from "@/lib/site";
import { FeatureTabs } from "@/components/sections/feature-tabs";
import { BigFeature } from "@/components/sections/big-feature";
import { ProofSection } from "@/components/sections/proof-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { MarqueeCta } from "@/components/sections/marquee-cta";

export default function Home() {
  return (
    <>
      {/* HERO — the one glow-treated screenshot on this page lives on the
          hero frame itself (see BrowserFrame's `glow` prop below), not as a
          full-section wash. The old sitewide .glow-hero/.grid-texture pair
          is retired here per the v3 design language (§2/§6). */}
      <section className="relative overflow-hidden">
        <div className="container-page grid items-center gap-14 py-16 lg:grid-cols-[1.02fr_1.1fr] lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-label font-medium text-muted-foreground">
              <SyncDot />
              Property Management Software &amp; Channel Manager
            </span>
            <h1 className="mt-6 text-balance font-display text-display font-extrabold leading-[1.04] tracking-tight">
              One dashboard for every listing and channel.
            </h1>
            <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-body">
              The PMS and channel manager for operators running 10-500+ listings. Sync calendars
              across Airbnb, Booking.com, and the other channels you list on, cutting down double
              bookings, manual updates, and messy partner payouts.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/demo">
                  Request a Demo <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">Explore the Platform</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Prefer to talk?{" "}
              {site.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="mr-3 font-semibold text-foreground hover:text-primary">
                  {p.label}
                </a>
              ))}
            </p>
          </div>

          <BrowserFrame
            src="/screenshots/overview.png"
            alt="Simplified Management dashboard showing 108 properties, active bookings, today's check-ins and check-outs, revenue and expenses chart, and a live check-in activity feed"
            width={1800}
            height={1010}
            priority
            glow
          />
        </div>
      </section>

      <MarqueeCta />

      {/* LOGO CLOUD / STAT BAND */}
      <section className="border-b border-border py-14">
        <div className="container-page">
          <p className="text-center text-sm text-muted-foreground">
            Distribute across the channels your guests actually book on
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-lg font-semibold text-muted-foreground/70">
            {otaChannels.map((c) => (
              <span key={c.slug}>{c.name}</span>
            ))}
          </div>

          {/* Dense/informational spacing scale (v3 design language, §4): cell
              padding uses the strict 4px-multiple --space tokens (py-6/px-4),
              kept separate from the fluid narrative rhythm above. */}
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {productStats.map((s) => (
              <div key={s.label} className="bg-background px-4 py-6 text-center">
                <div className="flex items-center justify-center gap-1.5 font-display text-h2 font-extrabold text-foreground tnum">
                  {s.live && <SyncDot />}
                  {s.value}
                </div>
                <div className="mt-1 text-body-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeatureTabs />
      <BigFeature />
      <ProofSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
