import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Grievance Officer",
  description:
    "Contact the Grievance Officer of Simplified Management Private Limited for privacy or personal data complaints under the DPDP Act 2023.",
  alternates: { canonical: "/grievance" },
};

export default function GrievancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Grievance Officer"
        lede="If you have a complaint about how we handle your personal data, write to our Grievance Officer."
      />

      <section className="section-pad">
        <div className="container-page max-w-3xl space-y-6 text-body">
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">Contact details</h2>
            <p>
              In accordance with the DPDP Act 2023 and the Information Technology Rules, our
              Grievance Officer is:
            </p>
            <p>
              Anil Kale, Product Development Manager
              <br />
              Simplified Management Private Limited
              <br />
              Email:{" "}
              <a
                href="mailto:grievance@simplifiedmanagement.in"
                className="font-semibold text-primary hover:underline"
              >
                grievance@simplifiedmanagement.in
              </a>
              <br />
              Phone:{" "}
              <a href="tel:+919665666254" className="font-semibold text-primary hover:underline">
                +91 96656 66254
              </a>
              <br />
              Address: 805, 8th Floor, SkyVista, Viman Nagar, Pune 411014
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              How long it takes
            </h2>
            <p>We will acknowledge grievances within 48 hours and resolve them within 30 days.</p>
            <p>
              If your complaint is not resolved, you can complain to the Data Protection Board of
              India.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">Related policies</h2>
            <p>
              Read our{" "}
              <a href="/privacy" className="font-semibold text-primary hover:underline">
                Privacy Policy
              </a>{" "}
              for this website and our{" "}
              <a href="/app-privacy" className="font-semibold text-primary hover:underline">
                App Privacy Policy
              </a>{" "}
              for the Simplified Management application.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
