import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function CtaSection() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border-2 border-primary/15 bg-primary/8 px-8 py-16 text-center sm:px-16">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Start simplifying your operations
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-body">
            From 10 to 500+ properties, automate OTA distribution and partner payouts, and scale your
            property business.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/demo">
                Request Platform Demo <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href={`tel:${site.phones[0].tel}`}>Call {site.phones[0].label}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
