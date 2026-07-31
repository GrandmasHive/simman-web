import type { Metadata } from "next";
import {
  Shield,
  Lock,
  Users,
  Server,
  DatabaseBackup,
  ScrollText,
  Eye,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Trust & Security",
  description:
    "How Simplified Management is designed to protect your data: encryption in transit and at rest, access controls, backups, reliable uptime, and privacy-by-design.",
  alternates: { canonical: "/security" },
};

const measures = [
  {
    icon: Lock,
    title: "Encryption in transit and at rest",
    body: "Connections to the platform are secured with TLS, and data is designed to be encrypted while stored. The goal is that information moving to and from the app, and sitting in our database, stays protected.",
  },
  {
    icon: Users,
    title: "Access controls and roles",
    body: "Role-based access lets you decide who can see and change what. Owners, managers, and staff each get the access they need, so partner and financial data is only visible to the right people.",
  },
  {
    icon: Server,
    title: "Reliable uptime",
    body: "The platform runs on established cloud infrastructure and is designed for high availability, so your team and channels can rely on the dashboard being there when bookings come in.",
  },
  {
    icon: DatabaseBackup,
    title: "Regular backups",
    body: "We take regular backups of platform data so it can be restored in the event of a failure. Recovery processes are designed to limit data loss and downtime.",
  },
  {
    icon: ScrollText,
    title: "GDPR and India DPDP alignment",
    body: "We follow the principles of the GDPR and India's Digital Personal Data Protection (DPDP) Act, handling personal data lawfully and giving you a clear way to raise data requests.",
  },
  {
    icon: Eye,
    title: "Privacy by design",
    body: "We aim to collect only the data we need to run the service, and we build privacy considerations into how features are designed rather than bolting them on afterward.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust & Security"
        title="Your data, protected"
        lede="Property, guest, and payout data is sensitive. Here is how Simplified Management is designed to keep it secure, private, and available."
      />

      <section className="section-pad border-b border-border">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Shield className="size-6" />
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl">
              Security built into how the platform works
            </h2>
            <p className="mx-auto mt-4 text-lg text-body">
              We take a practical, layered approach to protecting your information, from how data
              travels to how it is stored, accessed, and recovered.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {measures.map((measure) => (
              <div
                key={measure.title}
                className="flex flex-col rounded-2xl border border-border bg-card p-7"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <measure.icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{measure.title}</h3>
                <p className="mt-3 text-body">{measure.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-border">
        <div className="container-page max-w-3xl">
          <div className="rounded-2xl border border-border bg-subtle p-7">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              A note on claims
            </p>
            <p className="mt-3 text-body">
              We describe the security practices we follow and design toward. If you have specific
              compliance, certification, or data-residency requirements, reach out and our team will
              walk through exactly how the platform can meet them for your portfolio.
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
