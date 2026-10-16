import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/pricing-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simplified Management pricing: owners pay ₹799 per listing per month (₹499 from 11 listings), hotels pay ₹1,000 a month (₹3,000 from 16 rooms) plus ₹100 per room. Plus 18% GST, first 2 months free.",
  alternates: { canonical: "/pricing" },
};

// The pricing-relevant subset of the shared FAQ list.
const pricingFaqs = faqs.slice(0, 3);

export default function PricingPage() {
  return (
    <>
      <PricingSection headingLevel="h1" />
      <FaqSection items={pricingFaqs} />
      <CtaSection />
    </>
  );
}
