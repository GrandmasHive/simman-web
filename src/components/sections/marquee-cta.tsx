import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { features } from "@/lib/content";
import { nav } from "@/lib/site";

/**
 * Signature TASKS-style moment: a full-width scrolling marquee ticker paired
 * with a large pill "Book a Demo" CTA, sitting directly under the hero.
 *
 * Copy: the repeating line is the existing calendar feature's tagline from
 * src/lib/content.ts ("The same night is never double-sold") — no new copy
 * is introduced. The CTA label ("Book a Demo") is the existing
 * nav.footerResources entry, both pointing at /demo.
 *
 * Accessibility: the phrase is rendered many times for marquee width, but
 * only the very first instance is real text — every repeat after it
 * (including the entire duplicate block used for the seamless loop) is
 * aria-hidden. Decorative diamond separators are always aria-hidden.
 * Under prefers-reduced-motion the track stops animating, the filler
 * repeats and duplicate block are hidden via CSS, and what's left is one
 * static, centered line.
 */
const TICKER_LINE = features.find((f) => f.key === "calendar")!.tagline;
const DEMO_LABEL = nav.footerResources.find((l) => l.href === "/demo")!.label;
const REPEAT = 8;

function Separator() {
  return (
    <span
      aria-hidden="true"
      className="marquee-sep mx-6 inline-block size-1.5 shrink-0 rotate-45 bg-white/50 align-middle"
    />
  );
}

function TickerBlock({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={hidden ? "marquee-dup-block flex shrink-0 items-center" : "flex shrink-0 items-center"}>
      {Array.from({ length: REPEAT }).map((_, i) => (
        <span
          key={i}
          className={hidden || i > 0 ? "marquee-filler flex shrink-0 items-center" : "flex shrink-0 items-center"}
        >
          <span
            className="text-body-lg font-medium whitespace-nowrap text-white"
            aria-hidden={hidden || i > 0 ? "true" : undefined}
          >
            {TICKER_LINE}
          </span>
          <Separator />
        </span>
      ))}
    </div>
  );
}

export function MarqueeCta() {
  return (
    <section className="border-b border-border py-6">
      <div className="container-page flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
        <div className="marquee-mask min-w-0 flex-1 overflow-hidden rounded-full bg-primary py-4">
          <div className="marquee-track flex w-max items-center">
            <TickerBlock />
            <TickerBlock hidden />
          </div>
        </div>

        <Link
          href="/demo"
          className="group inline-flex shrink-0 items-center gap-4 rounded-full border-2 border-border bg-card py-2 pl-6 pr-2 text-body font-semibold text-foreground shadow-sm transition-colors hover:border-primary/40"
        >
          {DEMO_LABEL}
          {/* bg-sync-text (not raw bg-sync) — a white icon on raw --sync
              measures ~2.54:1, below the 3:1 WCAG 1.4.11 non-text minimum.
              Same fix pattern as the --sync-text text-color variant. */}
          <span className="flex size-10 items-center justify-center rounded-full bg-sync-text text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="size-5" />
          </span>
        </Link>
      </div>
    </section>
  );
}
