import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { OnboardForm } from "@/components/onboard-form";

export const metadata: Metadata = {
  title: "Share Your Property Details",
  description: "Tell the Simplified Management team about your listings so we can set up your account.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/get-started" },
};

// Linked from the WhatsApp details message every website lead gets. The answers
// go to the email alert only, matched to the lead by their WhatsApp number.
export default function GetStartedPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get started"
        title="Tell us about your properties"
        lede="10 quick questions. Our team in Pune uses your answers to set up your account before we call."
      />
      <section className="section-pad">
        <div className="container-page max-w-2xl">
          <OnboardForm />
        </div>
      </section>
    </>
  );
}
