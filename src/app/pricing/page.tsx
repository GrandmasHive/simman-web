import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/pricing-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simplified Management pricing is matched to your portfolio scale and confirmed with a custom quote during a demo. Plans for operators running 10 to 500+ properties.",
  alternates: { canonical: "/pricing" },
};

// The pricing-relevant subset of the shared FAQ list.
const pricingFaqs = faqs.slice(0, 3);

export default function PricingPage() {
  return (
    <>
      <PricingSection />
      <FaqSection items={pricingFaqs} />
      <CtaSection />
    </>
  );
}
