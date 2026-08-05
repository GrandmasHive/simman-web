import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingTiers } from "@/lib/content";
import { cn } from "@/lib/utils";

export function PricingSection({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <section id="pricing" className="section-pad">
      <div className="container-page">
        {withHeader && (
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Pricing</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Pricing matched to your portfolio scale
            </h2>
            <p className="mt-4 text-lg text-body">
              Pricing is based on your number of listings, so it scales predictably as you
              grow. Your exact quote is confirmed during a demo.
            </p>
          </div>
        )}

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "flex flex-col rounded-2xl border-2 bg-card p-8",
                tier.highlight
                  ? "border-primary shadow-xl shadow-primary/10"
                  : "border-border",
              )}
            >
              {/* Dense/informational spacing scale (v3 design language, §4):
                  badge padding, list gaps, and the amount's top offset all
                  land on the strict 4px-multiple --space stops. */}
              {tier.highlight && (
                <span className="mb-4 inline-flex w-fit rounded-full bg-sync/15 px-4 py-1 text-xs font-semibold text-sync-text">
                  Most popular
                </span>
              )}
              <h3 className="inline-flex w-fit items-center rounded-full border border-border bg-subtle px-3 py-1 font-display text-base font-bold">
                {tier.name}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{tier.scale}</p>
              <p className="mt-6 font-display text-2xl font-bold">
                Custom<span className="text-base font-normal text-muted-foreground"> / quoted on demo</span>
              </p>
              <ul className="mt-6 flex-1 space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-body">
                    <Check className="mt-0.5 size-4 shrink-0 text-sync" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="mt-8 w-full"
                variant={tier.highlight ? "default" : "outline"}
              >
                <Link href="/demo">Request a quote</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
