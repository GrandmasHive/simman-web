import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { BrowserFrame } from "@/components/browser-frame";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Software for Serviced Apartments",
  description:
    "Run a mix of nightly OTA stays and long corporate bookings from one calendar. Keep availability clean across Airbnb and Booking.com while managing monthly tenants and invoices.",
  alternates: { canonical: "/solutions/serviced-apartments" },
};

const benefits = [
  "Hold long corporate stays and nightly OTA bookings on the same apartment calendar without one clobbering the other.",
  "Block an apartment for a monthly tenant and watch it drop off Airbnb and Booking.com automatically for that period.",
  "Keep the short-stay inventory selling across OTAs while a corporate contract runs on the unit next door.",
  "Track revenue per apartment across both booking types, so you can see whether nightly or monthly earns more on each unit.",
  "Manage guest and tenant details, expenses, and turnover tasks for every unit from one place.",
];

const reasons = [
  {
    title: "Long and short stays on one calendar",
    body: "Serviced apartments juggle a corporate tenant for six weeks and a two-night OTA guest in the same building. Simplified Management keeps both on one availability view so nothing overlaps.",
  },
  {
    title: "Corporate bookings without OTA leaks",
    body: "When you block a unit for a company contract, that apartment comes off Airbnb, Booking.com, and every other channel for those dates automatically, so you never accept a stray nightly booking on a committed unit.",
  },
  {
    title: "Clear revenue across both models",
    body: "Every apartment tracks its nightly and monthly income separately, giving you a straight answer on which units perform better as short-stay versus long-stay inventory.",
  },
];

const faqs = [
  {
    q: "Can I mix long corporate stays with nightly bookings?",
    a: "Yes. Each apartment carries one availability calendar that holds both a long corporate stay and nightly OTA bookings on other dates. Blocking a unit for a monthly tenant removes it from every OTA for that period automatically.",
  },
  {
    q: "How do I stop OTAs from booking a unit under a corporate contract?",
    a: "When a unit is committed to a corporate booking, Simplified Management blocks those dates across all connected channels, so no nightly guest can book an apartment that is already contracted.",
  },
  {
    q: "Can I see how each apartment earns across booking types?",
    a: "Each unit tracks revenue and expenses per booking, so you can compare nightly OTA income against monthly corporate income on the same apartment and decide how to position each one.",
  },
];

export default function ServicedApartmentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Software for serviced apartments"
        lede="Serviced apartments run a mix of long corporate stays and nightly OTA demand. Keep both on one clean calendar so a monthly tenant and a two-night guest never collide."
      />

      <section className="section-pad border-b border-border">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why serviced apartment operators switch
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              One calendar for long and short stays
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
            src="/screenshots/properties.png"
            alt="Serviced apartment units managing long corporate stays and nightly OTA bookings in Simplified Management"
            width={1800}
            height={1010}
          />
        </div>
      </section>

      <section className="section-pad border-b border-border">
        <div className="container-page">
          <h2 className="max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            Why serviced apartment operators choose Simplified Management
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
