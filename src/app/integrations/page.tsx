import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, RefreshCw, Link2, Globe } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { otaChannels } from "@/lib/site";

export const metadata: Metadata = {
  title: "OTA Integrations & Channel Manager",
  description:
    "Connect and sync your listings across 50+ OTA channels including Airbnb, Booking.com, Agoda, Expedia, Vrbo, MakeMyTrip, Goibibo and StayVista from one dashboard.",
  alternates: { canonical: "/integrations" },
};

const steps = [
  {
    icon: Link2,
    title: "Connect your channels",
    body: "Link every OTA where you already list, plus your own direct booking site, to a single master calendar in Simplified Management.",
  },
  {
    icon: Globe,
    title: "Map rooms and rates once",
    body: "Match each listing to its rooms, rate plans, and pricing. Set it up a single time and manage it from one place from then on.",
  },
  {
    icon: RefreshCw,
    title: "Sync in real time",
    body: "Every booking, cancellation, and rate change pushes to every channel instantly, so the same night is never double-sold.",
  },
];

const faqItems = [
  {
    q: "Which channels can I connect?",
    a: "Simplified Management connects to 50+ OTA channels including Airbnb, Booking.com, Agoda, Expedia, Vrbo, MakeMyTrip, Goibibo and StayVista, distributing and syncing availability from one dashboard.",
  },
  {
    q: "How fast does availability sync across channels?",
    a: "Availability, rates, and reservations sync in real time across every connected channel, so the same night is never double-sold.",
  },
  {
    q: "Is the sync two-way?",
    a: "Yes. A booking on any channel updates your master calendar, and any change you make in Simplified Management pushes back out to every connected channel automatically.",
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Integrations"
        title="Connect to 50+ OTA channels from one dashboard"
        lede="Distribute your listings everywhere your guests book and keep availability, rates, and reservations in sync automatically. Connect the OTAs you already use and manage them all from a single master calendar."
      />

      <section className="section-pad border-b border-border">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Popular channels
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Sync the OTAs your guests already book on
            </h2>
            <p className="mx-auto mt-4 text-lg text-body">
              These are some of the most-used channels our operators connect. Pick one to see how the
              two-way sync works for that platform.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {otaChannels.map((channel) => (
              <Link
                key={channel.slug}
                href={`/integrations/${channel.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <h3 className="font-display text-lg font-semibold">{channel.name}</h3>
                <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-subtle px-2.5 py-1 text-xs font-medium text-sync">
                  <RefreshCw className="size-3" />
                  Two-way sync
                </span>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all group-hover:gap-2.5">
                  View integration <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              How the channel manager works
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-border bg-card p-7">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-subtle text-primary">
                    <step.icon className="size-5" />
                  </span>
                  <span className="font-display text-sm font-semibold text-muted-foreground">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-body">{step.body}</p>
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
