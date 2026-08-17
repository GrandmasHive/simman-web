import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, CalendarCheck, IndianRupee, ClipboardList } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { BrowserFrame } from "@/components/browser-frame";
import { CtaSection } from "@/components/sections/cta-section";
import { otaChannels } from "@/lib/site";

export function generateStaticParams() {
  return otaChannels.map((c) => ({ channel: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ channel: string }>;
}): Promise<Metadata> {
  const { channel } = await params;
  const ota = otaChannels.find((c) => c.slug === channel);
  if (!ota) return {};

  return {
    title: `${ota.name} Channel Manager & Sync`,
    description: `Connect and sync your ${ota.name} listings with the rest of your channels. Keep availability, rates, and reservations aligned from one dashboard.`,
    alternates: { canonical: `/integrations/${ota.slug}` },
  };
}

const syncCards = [
  {
    icon: CalendarCheck,
    title: "Availability",
    body: "Open and blocked dates stay identical everywhere. When a night sells, it closes on every channel at once, so you never oversell.",
  },
  {
    icon: IndianRupee,
    title: "Rates",
    body: "Set pricing and rate rules once in your master calendar and push them out to your connected channels.",
  },
  {
    icon: ClipboardList,
    title: "Reservations",
    body: "New bookings, modifications, and cancellations flow straight into one reservation list, so your team works from a single source of truth.",
  },
];

export default async function Page({
  params,
}: {
  params: Promise<{ channel: string }>;
}) {
  const { channel } = await params;
  const ota = otaChannels.find((c) => c.slug === channel);
  if (!ota) notFound();

  const benefits = [
    `Connect and sync your ${ota.name} listings with your master calendar`,
    `Two-way sync keeps ${ota.name} availability aligned with every other channel`,
    "Centralized rates and rate rules push to every connected channel",
    "Cross-channel updates help keep the same night from being double-sold",
    "One reservation list for bookings from every source",
  ];

  return (
    <>
      <PageHeader
        eyebrow="Integration"
        title={`${ota.name} channel manager and sync`}
        lede={`Sync your ${ota.name} listings with the rest of your channels. Keep availability, rates, and reservations aligned from one dashboard, without logging into separate extranets.`}
      />

      <section className="section-pad border-b border-border">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-sync" />
                  <span className="text-body">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-4 text-body">
              <p>
                Connect and sync your {ota.name} listings alongside every other OTA you sell on. As
                soon as a guest books, the night closes across all your channels, so you can list on
                {" "}
                {ota.name} and everywhere else without the risk of a double booking.
              </p>
              <p>
                Manage {ota.name} rates and availability from the same master calendar you use for
                the rest of your portfolio. Update a price or block a date once, and the change
                pushes out automatically to your connected channels.
              </p>
            </div>
          </div>

          <BrowserFrame
            src="/screenshots/booking.png"
            alt={`Simplified Management channel manager syncing ${ota.name} bookings, rates, and availability`}
            width={1800}
            height={1010}
          />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Two-way sync
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              What syncs with {ota.name}
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {syncCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-border bg-card p-7">
                <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-subtle text-primary">
                  <card.icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{card.title}</h3>
                <p className="mt-3 text-body">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
