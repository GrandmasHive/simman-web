import { CalendarX2, Clock, Wallet, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const outcomes = [
  {
    icon: CalendarX2,
    title: "Never oversell a night again",
    body: "Two-way real-time sync blocks the same night across every channel the instant it books.",
  },
  {
    icon: Clock,
    title: "Cut manual calendar work to zero",
    body: "Stop updating Airbnb, Booking.com, and spreadsheets by hand. One calendar drives them all.",
  },
  {
    icon: Wallet,
    title: "Know every partner's share",
    body: "Earnings and expenses split automatically per booking, with clear statements for co-owners.",
  },
  {
    icon: Building2,
    title: "Run 500 properties like 5",
    body: "Portfolio-wide automation, tasks, and reporting keep large operations calm and controlled.",
  },
];

export function ProofSection() {
  return (
    <section className="section-pad border-b border-border bg-subtle">
      <div className="container-page">
        {/* Split header (TASKS pattern): small eyebrow label left, huge bold
            H2 right, instead of the previous centered stack. */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Why operators switch
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-bold sm:text-4xl lg:text-right">
            Built for operators who refuse to babysit their calendar
          </h2>
        </div>

        {/* Full-width numbered rows, alternating soft blue/green tints, dark
            number pill per row — same four outcomes and copy as before. */}
        <div className="mt-12 space-y-4">
          {outcomes.map((o, i) => (
            <div
              key={o.title}
              className={cn(
                "flex flex-col gap-4 rounded-2xl border border-border p-6 sm:flex-row sm:items-center sm:gap-6",
                i % 2 === 0 ? "bg-primary/8" : "bg-sync/8",
              )}
            >
              <span className="tnum flex size-11 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-bold text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-card text-primary">
                <o.icon className="size-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">{o.title}</h3>
                <p className="mt-1 leading-relaxed text-body">{o.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
