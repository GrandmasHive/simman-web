import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Data Processing Agreement",
  description:
    "The Data Processing Agreement that governs how Simplified Management processes personal data on behalf of its customers.",
  alternates: { canonical: "/dpa" },
};

function LegalTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-subtle">
            {headers.map((h) => (
              <th
                key={h}
                className="border-b border-border px-4 py-3 text-left font-semibold text-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-subtle/50" : undefined}>
              {row.map((cell, j) => (
                <td key={j} className="border-b border-border px-4 py-3 align-top text-body">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DpaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Data Processing Agreement"
        lede="This Data Processing Agreement (DPA) forms part of the agreement between Simplified Management and each customer using the Platform, and governs how we process personal data on their behalf."
      />

      <section className="section-pad">
        <div className="container-page max-w-3xl space-y-6 text-body">
          <p className="text-sm text-muted-foreground">Last updated: 19 August 2026</p>

          <p>
            This DPA forms part of the agreement between Simplified Management Private Limited
            (CIN U62099PN2026PTC254686) (&quot;Processor&quot;, &quot;we&quot;) and the customer
            identified in the applicable order form or account signup (&quot;Fiduciary&quot;,
            &quot;you&quot;, &quot;Customer&quot;) for use of the Simplified Management application
            (the &quot;Platform&quot;). It should be read alongside our{" "}
            <a href="/app-privacy" className="font-semibold text-primary hover:underline">
              App Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/terms" className="font-semibold text-primary hover:underline">
              Terms of Use
            </a>
            .
          </p>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">1. Roles</h2>
            <p>
              The Customer is the Data Fiduciary for all personal data of its guests and staff
              processed through the Platform, as defined under the Digital Personal Data Protection
              Act 2023 (&quot;DPDP Act&quot;). The Customer determines the purpose and means of
              processing that data. The Processor processes that data solely on the Customer&apos;s
              documented instructions, which are given by the Customer&apos;s use of the
              Platform&apos;s features and any written instruction the Customer separately provides.
            </p>
            <p>
              This DPA does not apply to personal data the Processor holds about the Customer&apos;s
              own account users (name, email, login records, billing data) — that relationship is
              governed by the Terms of Use, under which the Processor acts as Data Fiduciary
              directly.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              2. Scope of processing
            </h2>
            <LegalTable
              headers={["", ""]}
              rows={[
                [
                  "Subject matter",
                  "Provision of the Platform: reservation management, housekeeping and staff task routing, laundry and inventory tracking, guest check-in and identity document handling, invoicing and GST documentation, and reporting",
                ],
                ["Duration", "The term of the Customer's subscription, plus the retention periods in §6"],
                [
                  "Nature of processing",
                  "Storage, display, computation (occupancy/revenue reporting), transmission (sync with the Customer's PMS), deletion",
                ],
                [
                  "Categories of data subjects",
                  "The Customer's guests; the Customer's staff (housekeepers, supervisors, admins)",
                ],
                [
                  "Categories of personal data",
                  "See App Privacy Policy §4 — reservation data, guest identity documents, Form C / foreign-national records, invoice and payment data, staff assignment records",
                ],
              ]}
            />
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              3. Processor obligations
            </h2>
            <p>The Processor shall:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                Process personal data only on the Customer&apos;s documented instructions, including
                regarding cross-border transfer — noting that, per App Privacy Policy §7, all
                processing currently occurs on infrastructure located in India
              </li>
              <li>Ensure personnel authorized to process the data are bound by confidentiality</li>
              <li>Implement the security measures described in §7 below</li>
              <li>
                Assist the Customer, at the Customer&apos;s reasonable request, in responding to data
                principal requests (access, correction, erasure) it receives regarding its guests or
                staff
              </li>
              <li>
                Notify the Customer without undue delay after becoming aware of a personal data
                breach affecting the Customer&apos;s data (see §4)
              </li>
              <li>
                Delete or return all personal data at the end of the relationship, per §6, unless
                retention is required by law
              </li>
              <li>
                Make available to the Customer the information reasonably necessary to demonstrate
                compliance with this DPA
              </li>
              <li>Not engage a sub-processor without the authorization in §5</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              4. Breach notification
            </h2>
            <p>
              The Processor will notify the Customer within 72 hours of becoming aware of a personal
              data breach affecting the Customer&apos;s data, including: the nature of the breach,
              categories and approximate number of data subjects and records affected, likely
              consequences, and measures taken or proposed. The Customer remains responsible for any
              notification obligations it has to the Data Protection Board of India or to affected
              individuals.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">5. Sub-processors</h2>
            <p>
              The Customer authorizes the Processor to engage the following sub-processors, each
              bound by written terms no less protective than this DPA:
            </p>
            <LegalTable
              headers={["Sub-processor", "Purpose"]}
              rows={[
                ["Supabase", "Database, authentication, and file storage"],
                [
                  "MSG91",
                  "WhatsApp messaging (booking confirmations, check-in links, guest communications)",
                ],
                [
                  "The Customer's own PMS provider (eZee Technosys or iPMS247)",
                  "Reservation data source",
                ],
                ["MakeMyTrip / Goibibo", "Booking and cancellation sync, where active"],
              ]}
            />
            <p>
              The Processor will notify the Customer of any intended change to this list at least 30
              days in advance, giving the Customer the opportunity to object on reasonable
              data-protection grounds.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              6. Retention and deletion
            </h2>
            <p>
              The Processor will retain and delete Customer data in line with the schedule in App
              Privacy Policy §6. On termination of the Customer&apos;s subscription, the Processor
              will delete all Customer data within 90 days, except data it is required to retain by
              law (statutory GST/invoice records to 6 years; other categories per the same schedule).
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              7. Security measures
            </h2>
            <p>
              The Processor maintains: role-based access control differentiating access levels
              within the Platform; encryption of data in transit; access logging; and restricted
              internal access on a need-to-know basis. Details available on request.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">8. Audit</h2>
            <p>
              The Customer may request, no more than once per 12 months, evidence of the
              Processor&apos;s compliance with this DPA (e.g. a summary of security controls or a
              relevant certification). On-site audits, if required, will be scheduled by mutual
              agreement.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">9. Liability</h2>
            <p>
              Governed by the limitation of liability terms in the Customer&apos;s Terms of Use,
              except where the DPDP Act or other applicable law prevents such limitation.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">10. Precedence</h2>
            <p>
              In the event of conflict between this DPA and the Terms of Use on matters of personal
              data processing, this DPA controls.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">Contact us</h2>
            <p>
              Simplified Management Private Limited
              <br />
              {site.address.locality}, {site.address.region}, {site.address.country}
              <br />
              <a
                href="mailto:privacy@simplifiedmanagement.in"
                className="font-semibold text-primary hover:underline"
              >
                privacy@simplifiedmanagement.in
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
