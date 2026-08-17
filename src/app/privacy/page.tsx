import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Simplified Management collects, uses, and protects personal data submitted through our website and demo request form.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        lede="This policy explains how Simplified Management handles personal data collected through this website and our demo request form."
      />

      <section className="section-pad">
        <div className="container-page max-w-3xl space-y-6 text-body">
          <p className="text-sm text-muted-foreground">Last updated: 3 July 2026</p>

          <p className="rounded-lg border border-border bg-subtle px-4 py-3 text-sm">
            This policy covers this website and the demo request form only. If you use the
            Simplified Management application as a hotel, guest, or staff member, see our{" "}
            <a href="/app-privacy" className="font-semibold text-primary hover:underline">
              App Privacy Policy
            </a>{" "}
            instead.
          </p>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">Who we are</h2>
            <p>
              This website is operated by Simplified Management (&quot;Simplified Management&quot;,
              &quot;we&quot;, &quot;us&quot;). We provide property management software and a channel
              manager for property operators. If you have questions about this policy, contact us at{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-primary hover:underline">
                {site.email}
              </a>
              .
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Information we collect
            </h2>
            <p>
              We collect information you provide directly, such as when you submit a demo request or
              contact form. This may include your name, business name, email address, phone number,
              details about your property portfolio, and any message you send us.
            </p>
            <p>
              We may also collect limited technical information automatically, such as your IP
              address, browser type, and how you use the site, to keep the site secure and improve
              it.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              How we use your information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Respond to your demo requests, enquiries, and support messages;</li>
              <li>Schedule and deliver product demonstrations;</li>
              <li>Provide, maintain, and improve our website and services;</li>
              <li>Send you service-related communications you have requested;</li>
              <li>Comply with legal obligations and protect against misuse.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">Legal basis</h2>
            <p>
              Where applicable, we process personal data on the basis of your consent, our
              legitimate interest in operating and growing our business, and to take steps at your
              request before entering into a contract.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Sharing your information
            </h2>
            <p>
              We do not sell your personal data. We may share it with trusted service providers who
              help us operate the website and communicate with you (for example, hosting, analytics,
              and email providers), under obligations to protect it. We may also disclose information
              where required by law.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">Data retention</h2>
            <p>
              We keep personal data only for as long as needed for the purposes described above, to
              comply with legal obligations, and to resolve disputes.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">Your rights</h2>
            <p>
              Depending on your location, you may have rights to access, correct, delete, or
              restrict the use of your personal data, and to withdraw consent. We aim to handle
              personal data in line with the principles of the GDPR and India&apos;s Digital Personal
              Data Protection (DPDP) Act. To exercise any right, email us at{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-primary hover:underline">
                {site.email}
              </a>
              .
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">Security</h2>
            <p>
              We use reasonable technical and organizational measures designed to protect personal
              data. No method of transmission or storage is completely secure, but we work to keep
              your information safe.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Changes to this policy
            </h2>
            <p>
              We may update this policy from time to time. When we do, we will revise the date at the
              top of this page.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">Contact us</h2>
            <p>
              Simplified Management
              <br />
              {site.address.locality}, {site.address.region}, {site.address.country}
              <br />
              <a href={`mailto:${site.email}`} className="font-semibold text-primary hover:underline">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
