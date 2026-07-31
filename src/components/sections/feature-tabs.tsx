"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { BrowserFrame } from "@/components/browser-frame";
import { ScreenshotCallout } from "@/components/screenshot-callout";
import { features } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FeatureTabs() {
  const [active, setActive] = useState(0);
  const feature = features[active];

  return (
    <section id="features" className="section-pad bg-subtle">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            The Platform
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Everything you need to run distribution
          </h2>
          <p className="mt-4 text-lg text-body">
            One connected system for listings, calendars, channels, and payouts, built for operators
            running 10 to 500+ properties.
          </p>
        </div>

        {/* Tabs — restyled as TASKS-style bordered, alternating-tint mini
            cards with a dark numbered pill badge. Same click-to-switch
            behavior as before; only the visual treatment changed. */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <button
              key={f.key}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={cn(
                "flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors",
                i % 2 === 0 ? "bg-primary/8" : "bg-sync/8",
                i === active
                  ? "border-foreground/60 shadow-sm"
                  : "border-border hover:border-foreground/30",
              )}
            >
              <span className="tnum flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "text-sm font-semibold",
                  i === active ? "text-foreground" : "text-body",
                )}
              >
                {f.title}
              </span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              {feature.tagline}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold">{feature.title}</h3>
            <p className="mt-4 text-body">{feature.description}</p>
            <ul className="mt-6 space-y-3">
              {feature.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sync/15 text-sync-text">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-body">{b}</span>
                </li>
              ))}
            </ul>
            <Link
              href={feature.href}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Learn more <ArrowRight className="size-4" />
            </Link>
          </div>

          <BrowserFrame
            src={feature.image}
            alt={feature.alt}
            width={1800}
            height={1010}
            key={feature.image}
            overlay={
              feature.callout ? (
                <ScreenshotCallout className={feature.calloutPosition}>{feature.callout}</ScreenshotCallout>
              ) : undefined
            }
          />
        </div>
      </div>
    </section>
  );
}
