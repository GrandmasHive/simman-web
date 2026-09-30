import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { DemoForm } from "@/components/demo-form";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Simplified Management. Email, call, or WhatsApp us, or request a platform demo. Based in Viman Nagar, Pune, India.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your portfolio"
        lede="Questions about the platform, pricing, or a migration from your current tools? Reach us directly, or request a demo and we'll respond within 24 business hours."
      />
      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <ContactRow icon={<Mail className="size-5" />} label="Email">
              <a href={`mailto:${site.email}`} className="text-primary hover:underline">
                {site.email}
              </a>
            </ContactRow>
            <ContactRow icon={<Phone className="size-5" />} label="Phone">
              {site.phones.map((p) => (
                <a key={p.tel} href={`tel:${p.tel}`} className="mr-3 text-primary hover:underline">
                  {p.label}
                </a>
              ))}
            </ContactRow>
            <ContactRow icon={<MessageCircle className="size-5" />} label="WhatsApp">
              <a
                href={`https://wa.me/${site.whatsapp}?text=Hi%2C%20I%27d%20like%20a%20demo%20of%20Simplified%20Management.`}
                className="text-sync hover:underline"
              >
                Chat on WhatsApp
              </a>
            </ContactRow>
            <ContactRow icon={<MapPin className="size-5" />} label="Office">
              {site.address.locality},<br />
              {site.address.region}, {site.address.country}
            </ContactRow>
            <p className="text-sm text-muted-foreground">
              Privacy or data complaints:{" "}
              <Link href="/grievance" className="font-semibold text-primary hover:underline">
                contact our Grievance Officer
              </Link>
              .
            </p>
          </div>
          <DemoForm />
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <div className="mt-1 text-body">{children}</div>
      </div>
    </div>
  );
}
