import { RefreshCw, SplitSquareHorizontal, ShieldCheck, Zap } from "lucide-react";
import { BrowserFrame } from "@/components/browser-frame";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    icon: RefreshCw,
    title: "Real-time sync",
    body: "Every booking updates every channel instantly. No refresh, no lag, no double sell.",
  },
  {
    icon: SplitSquareHorizontal,
    title: "Automatic payouts",
    body: "Split earnings and expenses across partners, down to each daily booking payment.",
  },
  {
    icon: Zap,
    title: "One control room",
    body: "Properties, bookings, guests, tasks, and finance in a single live dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Built to scale",
    body: "From 10 to 500+ listings, with automation and rules that grow with you.",
  },
];

export function BigFeature() {
  return (
    <section className="section-pad border-b border-border">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            See every booking, sync every channel, act in seconds.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-body">
            A single source of truth for your whole portfolio, updated in real time across every OTA
            you sell on.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl">
          <BrowserFrame
            src="/screenshots/properties.png"
            alt="Simplified Management properties and bookings across the portfolio"
            width={2000}
            height={1120}
          />

        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <div
              key={c.title}
              className={cn(
                "rounded-2xl border border-border p-6",
                i % 2 === 0 ? "bg-primary/8" : "bg-sync/8",
              )}
            >
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-card text-primary">
                <c.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
