import Link from "next/link";
import { InstagramIcon, FacebookIcon, YoutubeIcon, LinkedinIcon } from "@/components/icons";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-subtle">
      <div className="container-page py-14">
        {/* TASKS-style giant logo block, sitting beside the existing link
            columns instead of a small inline wordmark. */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="flex flex-col justify-between rounded-3xl bg-primary p-8 text-white sm:p-10">
            <Link href="/" className="inline-flex flex-col gap-4">
              <span className="inline-block size-10 rounded-xl bg-white/15" aria-hidden />
              <span className="font-display text-4xl leading-[0.95] font-extrabold tracking-tight sm:text-5xl">
                Simplified
                <br />
                Management
              </span>
            </Link>
            <p className="mt-8 max-w-xs text-sm leading-relaxed text-blue-50">
              Centralized PMS and channel manager that automates distribution across 50+ global OTA
              channels.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-display text-sm font-semibold text-foreground">Contact</h3>
              <p className="mt-4 text-sm text-body">
                {site.address.locality},<br />
                {site.address.region}, {site.address.country}
              </p>
              <p className="mt-3 text-sm">
                {site.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="mr-3 text-primary hover:underline">
                    {p.label}
                  </a>
                ))}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a href={site.socials.instagram} aria-label="Instagram" className="text-muted-foreground hover:text-primary">
                  <InstagramIcon className="size-5" />
                </a>
                <a href={site.socials.facebook} aria-label="Facebook" className="text-muted-foreground hover:text-primary">
                  <FacebookIcon className="size-5" />
                </a>
                <a href={site.socials.youtube} aria-label="YouTube" className="text-muted-foreground hover:text-primary">
                  <YoutubeIcon className="size-5" />
                </a>
                <a href={site.socials.linkedin} aria-label="LinkedIn" className="text-muted-foreground hover:text-primary">
                  <LinkedinIcon className="size-5" />
                </a>
              </div>
            </div>

            <FooterCol title="Product" links={nav.services} />
            <FooterCol title="Company" links={nav.footerCompany} />
            <FooterCol title="Resources" links={nav.footerResources} />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Simplified Management. All rights reserved.</p>
          <a href={site.email && `mailto:${site.email}`} className="hover:text-primary">
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-body hover:text-primary">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
