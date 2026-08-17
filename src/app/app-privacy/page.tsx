import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "App Privacy Policy",
  description:
    "How the Simplified Management application handles personal data for hotels, their guests, and their staff.",
  alternates: { canonical: "/app-privacy" },
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

export default function AppPrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="App Privacy Policy"
        lede="This policy explains how the Simplified Management application handles personal data for the hotels that use it, and for their guests and staff."
      />

      <section className="section-pad">
        <div className="container-page max-w-3xl space-y-6 text-body">
          <p className="text-sm text-muted-foreground">Last updated: 19 August 2026</p>

          <p>
            This policy covers the Simplified Management application at{" "}
            <span className="font-mono text-sm">app.simplifiedmanagement.in</span> (the
            &quot;Platform&quot;). Personal data collected through this website — including the
            demo request form — is covered by our separate{" "}
            <a href="/privacy" className="font-semibold text-primary hover:underline">
              website Privacy Policy
            </a>
            .
          </p>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">1. Who we are</h2>
            <p>
              The Platform is operated by Simplified Management Private Limited, a private limited
              company registered in Pune, Maharashtra, India.
            </p>
            <p>
              Registered office: 805, 8th Floor, SkyVista, Viman Nagar, Pune, Maharashtra 411014,
              India
              <br />
              CIN: U62099PN2026PTC254686
              <br />
              GSTIN: 24AAHCB0758N1ZG
              <br />
              Contact:{" "}
              <a
                href="mailto:privacy@simplifiedmanagement.in"
                className="font-semibold text-primary hover:underline"
              >
                privacy@simplifiedmanagement.in
              </a>
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              2. What the Platform does
            </h2>
            <p>
              Simplified Management is a hotel operations platform. It provides reservation
              management, housekeeping and daily staff routing, task management, laundry and
              inventory tracking, damage and late-checkout logging, guest check-in records,
              invoicing including GST invoices, and reporting.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              3. Our role under the DPDP Act 2023
            </h2>
            <p>
              <strong>Where we act as a Data Processor.</strong> For personal data belonging to our
              customers&apos; guests and staff — reservation records, guest identity documents,
              housekeeping assignments, invoices — our customer (the hotel or property operator) is
              the Data Fiduciary. They decide what data is collected and why. We process it only on
              their documented instructions. If you are a guest of a property that uses Simplified
              Management and you want your data accessed, corrected, or erased, your request goes
              to that property. We will support them in answering it, but we cannot act on it
              independently.
            </p>
            <p>
              <strong>Where we act as a Data Fiduciary.</strong> For our direct relationship with
              our customers — account holders&apos; names and email addresses, login and audit
              records, billing data, support correspondence — we determine the purpose ourselves and
              are responsible for it directly.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              4. Personal data we process
            </h2>
            <p className="font-semibold text-foreground">On behalf of our customers (processor role)</p>
            <LegalTable
              headers={["Category", "Examples", "Source"]}
              rows={[
                [
                  "Guest reservation data",
                  "Name, stay dates, room, rate, revenue, booking channel, reservation status",
                  "Synced from the customer's PMS",
                ],
                [
                  "Guest identity documents",
                  "Identity documents uploaded during check-in, where the customer's process requires them",
                  "Uploaded by guest or by customer staff",
                ],
                [
                  "Foreign national records",
                  "Data required for Form C reporting to the FRRO",
                  "Customer check-in process",
                ],
                [
                  "Guest financial data",
                  "Invoice line items, GST details, payment status, refunds",
                  "Generated in the Platform",
                ],
                [
                  "Customer staff data",
                  "Staff names, work email addresses, assigned role, property assignments, daily routing, task assignment and completion records",
                  "Entered by the customer",
                ],
              ]}
            />
            <p className="pt-2 font-semibold text-foreground">
              As a Data Fiduciary (our own customers)
            </p>
            <LegalTable
              headers={["Category", "Examples"]}
              rows={[
                ["Account data", "Name, work email address, assigned role, account status"],
                ["Authentication and audit", "Login timestamps, actions taken in the Platform"],
                ["Billing data", "Subscription tier, invoices, payment records"],
                ["Support data", "Correspondence with our support team"],
              ]}
            />
            <p className="pt-2">
              We do not sell personal data. We do not use guest personal data to advertise to
              guests. We do not use one customer&apos;s data for the benefit of another.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">5. Purposes</h2>
            <p>
              We process personal data to operate the Platform for our customers: syncing and
              displaying reservations, assigning and tracking housekeeping work, generating invoices
              and GST documentation, producing reports, maintaining security and audit records,
              providing support, and meeting our own legal obligations.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">6. Retention</h2>
            <p>
              We delete personal data when its retention period expires, unless a longer period is
              required by law or by an active legal proceeding.
            </p>
            <LegalTable
              headers={["Data", "Retention"]}
              rows={[
                ["Guest identity documents", "12 months after checkout, then permanently deleted"],
                [
                  "Foreign national / Form C records",
                  "12 months after submission to the authorities",
                ],
                ["Booking and reservation records", "6 years"],
                [
                  "Invoices, GST records, payment records",
                  "72 months (6 years), as required under GST law",
                ],
                [
                  "Customer staff records",
                  "Duration of the staff member's engagement, plus 3 years",
                ],
                [
                  "Account, authentication and audit data",
                  "Duration of the customer relationship, plus 12 months",
                ],
              ]}
            />
            <p>
              Customers may instruct us to delete their data earlier, subject to the statutory
              minimums above. On termination, customer data is deleted within 90 days unless a
              longer period is agreed in writing.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              7. Where data is stored
            </h2>
            <p>
              All personal data processed by the Platform is stored on infrastructure located in
              India. We do not transfer personal data outside India.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              8. Sub-processors
            </h2>
            <p>
              We use a limited number of third-party service providers to operate the Platform. Each
              is bound by contract to process personal data only on our instructions and to maintain
              appropriate security.
            </p>
            <LegalTable
              headers={["Sub-processor", "Purpose", "Country"]}
              rows={[
                ["Supabase", "Database, authentication, and file storage for the Platform", "India"],
                [
                  "MSG91",
                  "WhatsApp messaging — booking confirmations, check-in links, guest welcome messages",
                  "India",
                ],
                [
                  "The customer's own PMS provider (eZee Technosys or iPMS247, depending on property)",
                  "Source of reservation data synced into the Platform",
                  "India",
                ],
                [
                  "MakeMyTrip / Goibibo",
                  "Booking and cancellation sync, where the customer has this channel active",
                  "India",
                ],
              ]}
            />
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">9. Security</h2>
            <p>
              We maintain administrative, technical, and physical safeguards appropriate to the
              sensitivity of the data, including role-based access control, encryption of data in
              transit, access logging, and restricted internal access on a need-to-know basis.
            </p>
            <p>
              No system is perfectly secure. In the event of a personal data breach we will notify
              the Data Protection Board of India and affected Data Fiduciaries without undue delay,
              as required under the DPDP Act 2023.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">10. Your rights</h2>
            <p>
              If we are the Data Fiduciary for your data (our direct customers), you may request
              access to your personal data, correction of inaccurate data, erasure, and nomination
              of another person to exercise your rights in the event of death or incapacity. You may
              also withdraw consent where processing is based on consent.
            </p>
            <p>
              If you are a guest of a property that uses the Platform, direct your request to that
              property. They are the Data Fiduciary.
            </p>
            <p>
              Requests to us go to{" "}
              <a
                href="mailto:privacy@simplifiedmanagement.in"
                className="font-semibold text-primary hover:underline"
              >
                privacy@simplifiedmanagement.in
              </a>
              .
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              11. Grievance Officer
            </h2>
            <p>
              In accordance with the DPDP Act 2023 and the Information Technology Rules, our
              Grievance Officer is:
            </p>
            <p>
              Anil Kale, Product Development Manager
              <br />
              Phone: +91 96656 66254
              <br />
              Email:{" "}
              <a
                href="mailto:grievance@simplifiedmanagement.in"
                className="font-semibold text-primary hover:underline"
              >
                grievance@simplifiedmanagement.in
              </a>
              <br />
              Address: 805, 8th Floor, SkyVista, Viman Nagar, Pune, Maharashtra 411014, India
            </p>
            <p>We will acknowledge grievances within 48 hours and resolve them within 30 days.</p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              12. Children&apos;s data
            </h2>
            <p>
              The Platform is a business tool and is not directed at children. We do not knowingly
              process the personal data of anyone under 18 as an account holder. Guest records may
              include minors travelling with adults; such data is processed on the instructions of
              our customer and is subject to the same retention and security controls.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">13. Changes</h2>
            <p>
              We will post any material change to this policy on this page and update the &quot;Last
              updated&quot; date. Customers will be notified in advance of changes that materially
              affect how we process their data.
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
