import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Wraps a (light) product screenshot in a dark browser-window chrome so it reads
 * as intentional content on the dark theme, with a soft brand glow behind it.
 *
 * Elevation (v3 design language, §6): `glow` defaults to false. Exactly one
 * screenshot per page should ever set `glow`, the homepage hero — every other
 * instance (feature-tabs, inner-page screenshots) renders with the plain,
 * neutral `--shadow-shot-plain` token. Do not flip this default; set `glow`
 * explicitly per call site instead, so the one-glow-per-page rule stays
 * visible in the code, not just in convention.
 */
export function BrowserFrame({
  src,
  alt,
  width,
  height,
  priority = false,
  url = "app.simplifiedmanagement.in",
  glow = false,
  overlay,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  url?: string;
  glow?: boolean;
  /** Absolutely-positioned content (e.g. <ScreenshotCallout />) rendered over the image. */
  overlay?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {glow && <div className="pointer-events-none absolute -inset-6 -z-10 glow-soft" aria-hidden="true" />}
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-border bg-[#0d0f14] ring-1 ring-white/5",
          glow ? "shot-frame-glow" : "shot-frame-plain",
        )}
      >
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-white/8 bg-[#0a0b0f] px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/70" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/70" />
          <span className="size-2.5 rounded-full bg-[#28c840]/70" />
          <div className="ml-3 hidden flex-1 justify-center sm:flex">
            <div className="rounded-md bg-white/5 px-3 py-1 text-[11px] font-medium text-muted-foreground">
              {url}
            </div>
          </div>
        </div>
        {/* screenshot */}
        <div className="relative">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className="h-auto w-full"
          />
          {/* subtle edge integration on the dark theme */}
          <div className="pointer-events-none absolute inset-0 rounded-b-xl ring-1 ring-inset ring-black/20" />
          {overlay}
        </div>
      </div>
    </div>
  );
}
