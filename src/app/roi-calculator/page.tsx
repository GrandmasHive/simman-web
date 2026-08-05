import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { RoiCalculator } from "@/components/roi-calculator";

export const metadata: Metadata = {
  title: "ROI Calculator",
  description:
    "Estimate the hours and money you could save by automating calendar sync and OTA distribution across your listing portfolio. Estimates only, not a quote.",
  alternates: { canonical: "/roi-calculator" },
};

export default function RoiCalculatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="ROI Calculator"
        title="See what automation could save you"
        lede="Enter a few details about your portfolio to estimate the manual hours, operations cost, and revenue you could protect each month. All figures are estimates to help you plan, not a quote."
      />
      <RoiCalculator />
    </>
  );
}
