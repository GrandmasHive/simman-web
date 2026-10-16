import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingPlans, pricingTerms } from "@/lib/content";

export function PricingSection({
  withHeader = true,
  headingLevel = "h2",
}: {
  withHeader?: boolean;
  /** "h1" on /pricing, where this heading is the page title; "h2" where it sits inside another page. */
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;
  return (
    <section id="pricing" className="section-pad">
      <div className="container-page">
        {withHeader && (
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Pricing</p>
            <Heading className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Two plans. Pick the one that fits your property.
            </Heading>
            <p className="mt-4 text-lg text-body">
              Owners pay per listing. Hotels pay a platform fee plus a rate per room.
            </p>
          </div>
        )}

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col rounded-2xl border-2 border-border bg-card p-8"
            >
              {/* Dense/informational spacing scale (v3 design language, §4):
                  badge padding, list gaps, and the amount's top offset all
                  land on the strict 4px-multiple --space stops. */}
              <h3 className="inline-flex w-fit items-center rounded-full border border-border bg-subtle px-3 py-1 font-display text-base font-bold">
                {plan.name}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{plan.audience}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {plan.rates.map((rate) => (
                  <div key={rate.note} className="rounded-xl border border-border bg-subtle p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {rate.note}
                    </p>
                    <p className="mt-2 font-display text-2xl font-bold">{rate.amount}</p>
                    <p className="text-sm text-muted-foreground">{rate.unit}</p>
                  </div>
                ))}
              </div>
              <ul className="mt-6 flex-1 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-body">
                    <Check className="mt-0.5 size-4 shrink-0 text-sync" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 w-full">
                <Link href="/demo">Book a demo</Link>
              </Button>
            </div>
          ))}
        </div>

        <ul className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-x-6 gap-y-2">
          {pricingTerms.map((term) => (
            <li key={term} className="flex items-center gap-2 text-sm font-medium text-body">
              <Check className="size-4 shrink-0 text-sync" strokeWidth={3} />
              {term}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
