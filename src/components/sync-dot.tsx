import { cn } from "@/lib/utils";

/**
 * Live-sync pulse dot — the one new animation introduced by the v3 design
 * language (see design-mockups/iterations-2026-07-07/ITERATIONS.md, "v3", and
 * PRODUCTION-DESIGN-LANGUAGE.md §7). A small, deliberate echo of the
 * product's real-time-sync claim, used in the homepage hero eyebrow and the
 * "Real-time" stat cell.
 *
 * ITERATIONS.md flags this as "the one genuinely new addition needing a
 * deliberate yes/no decision," not an approved fix — so it's implemented as
 * a single, clearly-named component with one toggle. To disable the pulse
 * everywhere it's used (falling back to a plain static status dot), flip the
 * default below to `false`. No other file needs to change.
 */
export function SyncDot({
  pulse = true,
  className,
}: {
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn("dot-sync", !pulse && "dot-sync--static", className)}
      aria-hidden="true"
    />
  );
}
