import { AlertTriangle, CalendarCheck, FileText, LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Homepage hero illustration: a simplified, coded view of the dashboard with
 * sample data, plus two floating highlight cards. It replaces the full-size
 * app screenshot, which was unreadable at hero size and carried real guest
 * names and revenue. Every name and number below is sample data, and the
 * frame says so. It only shows what the app does today: bookings from each
 * channel on one calendar, a clash flagged for review, and an owner statement.
 */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Short labels for phone width, where a 2-night bar is too narrow for the full name.
const SHORT: Record<string, string> = { Airbnb: "Airbnb", "Booking.com": "Booking", MakeMyTrip: "MMT", Direct: "Direct" };

const CHANNEL = {
  Airbnb: "bg-[#FF5A5F]/15 text-[#C2363B] border-[#FF5A5F]/30",
  "Booking.com": "bg-[#003580]/10 text-[#003580] border-[#003580]/25",
  MakeMyTrip: "bg-[#E8312F]/10 text-[#B42320] border-[#E8312F]/25",
  Direct: "bg-emerald-500/10 text-emerald-700 border-emerald-500/25",
} as const;

type Bar = { start: number; span: number; channel: keyof typeof CHANNEL; clash?: boolean };

const ROWS: { name: string; bars: Bar[] }[] = [
  { name: "Sea View Villa", bars: [{ start: 0, span: 3, channel: "Airbnb" }, { start: 4, span: 3, channel: "Direct" }] },
  { name: "Hill Cottage", bars: [{ start: 1, span: 2, channel: "MakeMyTrip" }, { start: 3, span: 3, channel: "Booking.com" }] },
  { name: "Lake Studio", bars: [{ start: 0, span: 2, channel: "Booking.com" }, { start: 2, span: 3, channel: "Airbnb", clash: true }] },
  { name: "Garden Flat", bars: [{ start: 2, span: 4, channel: "Direct" }] },
];

function Kpi({ icon: Icon, label, value, tone }: { icon: typeof LogIn; label: string; value: string; tone: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5">
      <span className={cn("hidden size-8 shrink-0 place-items-center rounded-md sm:grid", tone)}>
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[11px] text-muted-foreground">{label}</span>
        <span className="block font-display text-lg font-bold leading-tight text-foreground tnum">{value}</span>
      </span>
    </div>
  );
}

export function HeroMock({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative", className)}
      role="img"
      aria-label="Illustration of the Simplified Management dashboard with sample data: today's check-ins and check-outs, a week calendar with bookings from Airbnb, Booking.com, MakeMyTrip and direct bookings, one clash flagged for review, and an owner statement."
    >
      <div className="pointer-events-none absolute -inset-6 -z-10 glow-soft" aria-hidden="true" />
      <div className="overflow-hidden rounded-xl border border-border bg-[#0d0f14] ring-1 ring-white/5 shot-frame-glow">
        {/* window chrome, matching BrowserFrame */}
        <div className="flex items-center gap-2 border-b border-white/8 bg-[#0a0b0f] px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/70" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/70" />
          <span className="size-2.5 rounded-full bg-[#28c840]/70" />
          <div className="ml-3 hidden flex-1 justify-center sm:flex">
            <div className="rounded-md bg-white/5 px-3 py-1 text-[11px] font-medium text-muted-foreground">
              app.simplifiedmanagement.in
            </div>
          </div>
        </div>

        <div className="bg-subtle p-4 sm:p-5" aria-hidden="true">
          <div className="flex items-center justify-between">
            <p className="font-display text-sm font-bold text-foreground">Today</p>
            <span className="rounded-full border border-border bg-card px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              Sample data
            </span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <Kpi icon={LogIn} label="Check-ins" value="6" tone="bg-emerald-500/10 text-emerald-600" />
            <Kpi icon={LogOut} label="Check-outs" value="4" tone="bg-amber-500/10 text-amber-600" />
            <Kpi icon={CalendarCheck} label="This week" value="23 nights" tone="bg-primary/10 text-primary" />
          </div>

          {/* week calendar */}
          <div className="mt-3 rounded-lg border border-border bg-card p-3">
            <div className="grid grid-cols-[84px_repeat(7,minmax(0,1fr))] gap-y-2 text-[10px] sm:grid-cols-[100px_repeat(7,minmax(0,1fr))]">
              <span />
              {DAYS.map((d) => (
                <span key={d} className="text-center font-medium text-muted-foreground">
                  {d}
                </span>
              ))}
              {ROWS.map((row) => (
                <div key={row.name} className="contents">
                  <span className="truncate pr-2 font-medium leading-6 text-foreground">{row.name}</span>
                  <div className="relative col-span-7 h-6">
                    {row.bars.map((b) => (
                      <span
                        key={b.start}
                        className={cn(
                          "absolute inset-y-0 flex items-center truncate rounded-md border px-1.5 font-medium",
                          CHANNEL[b.channel],
                          b.clash && "ring-2 ring-amber-400 ring-offset-1 ring-offset-card",
                        )}
                        style={{ left: `calc(${(b.start / 7) * 100}% + 2px)`, width: `calc(${(b.span / 7) * 100}% - 4px)` }}
                      >
                        <span className="sm:hidden">{SHORT[b.channel]}</span>
                        <span className="hidden sm:inline">{b.channel}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-amber-700">
              <AlertTriangle className="size-3.5" aria-hidden />
              Clash on Wed at Lake Studio. Review it.
            </p>
          </div>
        </div>
      </div>

      {/* floating highlight cards (sample data) */}
      <div
        className="absolute -right-3 -top-5 hidden w-52 rounded-xl border border-border bg-card p-3 shadow-lg sm:block lg:-right-6"
        aria-hidden="true"
      >
        <p className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <FileText className="size-3.5 text-primary" aria-hidden />
          Owner statement · October
        </p>
        <p className="mt-1 text-xs font-semibold text-foreground">Sea View Villa</p>
        <p className="mt-0.5 font-display text-xl font-bold text-foreground tnum">₹86,400 net</p>
        <p className="text-[10px] text-muted-foreground">After expenses and your fee</p>
      </div>
      <div
        className="absolute -bottom-14 right-4 hidden w-56 rounded-xl border border-border bg-card p-3 shadow-lg sm:block lg:right-10"
        aria-hidden="true"
      >
        <p className="text-[11px] font-medium text-muted-foreground">New booking · MakeMyTrip</p>
        <p className="mt-1 text-xs font-semibold text-foreground">Hill Cottage · 3 nights</p>
        <p className="text-[10px] text-muted-foreground">Added to the calendar with the other channels</p>
      </div>
    </div>
  );
}
