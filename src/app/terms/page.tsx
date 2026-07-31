import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that govern your use of the Simplified Management website and demo request form.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Use"
        lede="These terms govern your use of the Simplified Management website and the demo request form. By using this site, you agree to them."
      />

      <section className="section-pad">
        <div className="container-page max-w-3xl space-y-6 text-body">
          <p className="text-sm text-muted-foreground">Last updated: 3 July 2026</p>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">About these terms</h2>
            <p>
              This website is operated by Simplified Management (&quot;Simplified Management&quot;,
              &quot;we&quot;, &quot;us&quot;). These Terms of Use apply to your access to and use of
              this website. If you do not agree with them, please do not use the site.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">Use of the site</h2>
            <p>
              You may use this site for lawful purposes only. You agree not to use it in any way that
              could damage, disable, or impair the site, or interfere with anyone else&apos;s use of
              it, and not to attempt unauthorized access to any part of the site or its systems.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Demo requests and submissions
            </h2>
            <p>
              When you submit a demo request or contact form, you agree to provide accurate
              information and confirm you are authorized to share it. We use the details you submit to
              respond to you and arrange a demonstration, as described in our{" "}
              <a href="/privacy" className="font-semibold text-primary hover:underline">
                Privacy Policy
              </a>
              . Submitting a request does not create any contract or obligation to purchase.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Intellectual property
            </h2>
            <p>
              The content on this site, including text, graphics, logos, and design, is owned by or
              licensed to Simplified Management and is protected by applicable laws. You may not
              copy, reproduce, or distribute it without our prior written permission, except as
              allowed for normal viewing of the site.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Information and no warranty
            </h2>
            <p>
              The information on this site is provided for general information about our products and
              is offered on an &quot;as is&quot; basis. Product features, pricing references, and any
              savings estimates are illustrative and may change. To the fullest extent permitted by
              law, we make no warranties, express or implied, about the accuracy or completeness of
              the site&apos;s content.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Limitation of liability
            </h2>
            <p>
              To the fullest extent permitted by law, Simplified Management will not be liable for any
              indirect, incidental, or consequential loss arising from your use of, or inability to
              use, this website.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">Third-party links</h2>
            <p>
              This site may contain links to third-party websites. We are not responsible for the
              content or practices of those sites, and links do not imply our endorsement.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Changes to these terms
            </h2>
            <p>
              We may update these terms from time to time. When we do, we will revise the date at the
              top of this page. Your continued use of the site means you accept the updated terms.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">Governing law</h2>
            <p>
              These terms are governed by the laws of India, and any disputes will be subject to the
              jurisdiction of the courts of Pune, Maharashtra.
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
