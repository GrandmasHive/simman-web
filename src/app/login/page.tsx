import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import { SplineRobot } from "@/components/spline-robot";
import { ChannelMotif } from "@/components/channel-motif";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Simplified Management operations dashboard.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      {/* Preconnect to Spline's CDN as early as possible — without this the browser
          doesn't start DNS/TLS for the scene file until the runtime JS chunk finishes
          loading and calls fetch, which is a fully sequential (and avoidable) delay. */}
      <link rel="preconnect" href="https://prod.spline.design" />
      <link rel="dns-prefetch" href="https://prod.spline.design" />

      {/* Form side */}
      <div className="flex items-center justify-center px-6 py-16">
        <LoginForm />
      </div>

      {/* Brand side — the robot is the hub, every OTA channel converges on it.
          Strict rule: nothing sits over the robot's upper-center head/face.
          Panel is white to match the rest of the light theme; a soft blue
          glow (glow-hero) keeps it from reading flat next to the white form. */}
      <div className="relative hidden overflow-hidden border-l border-border bg-white lg:block">
        {/* z-0 — ambient brand lighting behind everything. This is the one
            glow-treated moment on this page (v3 design language, §2/§6) —
            the Spline robot's own backdrop. The redundant .grid-texture layer
            that used to sit here was retired in v1 and is not reintroduced. */}
        <div className="pointer-events-none absolute inset-0 glow-hero opacity-60" />

        {/* z-[1] — connector lines converging on the hub, behind the robot */}
        <ChannelMotif layer="lines" className="z-[1]" />

        {/* z-[2] — the robot itself, centered and immersive, reads as the hub */}
        <SplineRobot className="absolute inset-0 z-[2] size-full" />

        {/* z-[3] — OTA channel pills in FRONT of the robot so labels stay visible */}
        <ChannelMotif layer="nodes" className="z-[3]" />

        {/* z-10 — a top-corner pill that clears the centered head entirely */}
        <div className="pointer-events-none absolute right-6 top-6 z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <Sparkles className="size-3.5 text-primary" />
            AI operations assistant, now live
          </span>
        </div>

        {/* z-10 — brand copy pinned to the BOTTOM, well clear of the head/face.
            A gradient scrim gives the copy its own separated, legible zone. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-white via-white/90 to-transparent p-10 pt-28">
          <p className="max-w-md font-display text-2xl font-bold leading-snug tracking-tight text-foreground">
            One dashboard for every listing and channel.
          </p>
          <p className="mt-3 max-w-md text-sm text-body">
            Simplified Management keeps your calendars, rates and availability in
            sync across every OTA, automatically.
          </p>

          {/* Real, defensible proof — no ratings, no live-AI claims.
              Tabular numerals (v3 design language, §3) on every real number. */}
          <dl className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <div className="flex items-baseline gap-1.5">
              <dt className="sr-only">Properties managed</dt>
              <dd className="tnum font-display font-bold text-foreground">108+</dd>
              <span className="text-muted-foreground">properties</span>
            </div>
            <span aria-hidden className="text-border">·</span>
            <div className="flex items-baseline gap-1.5">
              <dt className="sr-only">OTA channels</dt>
              <dd className="tnum font-display font-bold text-foreground">8</dd>
              <span className="text-muted-foreground">channels</span>
            </div>
            <span aria-hidden className="text-border">·</span>
            <div className="flex items-baseline gap-1.5">
              <dt className="sr-only">Sync</dt>
              <dd className="font-display font-bold text-primary">two-way</dd>
              <span className="text-muted-foreground">sync</span>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
