import { cn } from "@/lib/utils";
import { SyncDot } from "@/components/sync-dot";

/**
 * Screenshot callout badge (v3 design language, §6/§8) — the one genuinely
 * new UI component introduced by this design sprint. A single, consistently
 * styled dark pill that points at a specific real number visible in a
 * screenshot crop.
 *
 * Rules (do not violate these — see PRODUCTION-DESIGN-LANGUAGE.md §13):
 * 1. Only one visual style, reused everywhere it appears.
 * 2. Only render this where the referenced number is actually legible in
 *    that exact screenshot crop. Where it isn't, don't render it at all —
 *    never fabricate a callout to fill the space.
 *
 * Positioned absolutely by the caller (pass `top`/`left` via className).
 *
 * `pulse` defaults to `false`: this badge appears in up to several places
 * per page (hero + feature tabs), and the live-sync pulse animation is
 * deliberately rationed to its two existing homepage spots (see SyncDot) —
 * wiring this component up should not silently multiply that count.
 */
export function ScreenshotCallout({
  children,
  className,
  pulse = false,
}: {
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
}) {
  return (
    <span
      className={cn(
        "callout-badge tnum absolute z-10 inline-flex items-center gap-1.5 rounded-full bg-foreground px-2.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-black/25",
        className,
      )}
    >
      <SyncDot pulse={pulse} />
      {children}
    </span>
  );
}
