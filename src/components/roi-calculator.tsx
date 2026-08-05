"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, IndianRupee, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Transparent, defensible assumptions. All labeled as estimates in the UI.
const AUTOMATION_HOURS_REMOVED = 0.7; // ~70% of manual calendar/booking hours removed
const OPS_COST_PER_HOUR = 250; // assumed ops labor cost, INR/hour
const WEEKS_PER_MONTH = 4.33;
const BOOKINGS_PER_PROPERTY_PER_MONTH = 8; // conservative monthly bookings per listing
const DOUBLE_BOOKING_RISK_RATE = 0.01; // ~1% of bookings at risk of a costly double-booking
const NIGHTS_LOST_PER_INCIDENT = 2; // nights of revenue typically lost per incident

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const num = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

function clampNum(value: string): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return n;
}

export function RoiCalculator() {
  const [properties, setProperties] = useState(20);
  const [channels, setChannels] = useState(4);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [nightlyRate, setNightlyRate] = useState(3500);

  // Hours saved
  const monthlyManualHours = hoursPerWeek * WEEKS_PER_MONTH;
  const hoursSavedPerMonth = monthlyManualHours * AUTOMATION_HOURS_REMOVED;

  // Ops cost saved
  const opsCostSaved = hoursSavedPerMonth * OPS_COST_PER_HOUR;

  // Revenue protected from double-bookings
  const monthlyBookings = properties * BOOKINGS_PER_PROPERTY_PER_MONTH;
  const bookingsAtRisk = monthlyBookings * DOUBLE_BOOKING_RISK_RATE;
  const revenueProtected = bookingsAtRisk * NIGHTS_LOST_PER_INCIDENT * nightlyRate;

  const totalMonthly = opsCostSaved + revenueProtected;

  const results = [
    {
      icon: Clock,
      label: "Manual hours saved / month",
      value: `${num.format(Math.round(hoursSavedPerMonth))} hrs`,
      note: "Assuming automation removes about 70% of manual calendar and booking work.",
    },
    {
      icon: IndianRupee,
      label: "Operations cost saved / month",
      value: inr.format(Math.round(opsCostSaved)),
      note: `Hours saved valued at an assumed ${inr.format(OPS_COST_PER_HOUR)}/hour of ops time.`,
    },
    {
      icon: ShieldCheck,
      label: "Revenue protected / month",
      value: inr.format(Math.round(revenueProtected)),
      note: "Avoided losses from double-bookings, based on a small share of monthly bookings at risk.",
    },
  ];

  return (
    <section className="section-pad">
      <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-border bg-card p-7">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Your portfolio
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold">Enter your numbers</h2>
          <p className="mt-3 text-body">Results update live as you type.</p>

          <div className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="properties">Number of listings</Label>
              <Input
                id="properties"
                type="number"
                min={0}
                inputMode="numeric"
                value={properties}
                onChange={(e) => setProperties(clampNum(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="channels">Number of channels / OTAs</Label>
              <Input
                id="channels"
                type="number"
                min={0}
                inputMode="numeric"
                value={channels}
                onChange={(e) => setChannels(clampNum(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours">Hours / week on manual calendar & booking work</Label>
              <Input
                id="hours"
                type="number"
                min={0}
                inputMode="numeric"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(clampNum(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Average nightly rate (₹)</Label>
              <Input
                id="rate"
                type="number"
                min={0}
                inputMode="numeric"
                value={nightlyRate}
                onChange={(e) => setNightlyRate(clampNum(e.target.value))}
              />
            </div>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Channels are shown for context. More channels usually means more manual sync work, which
            is captured in your weekly hours above.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-subtle p-7">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Estimated monthly value
            </p>
            <p className="mt-3 font-display text-4xl font-bold text-sync">
              {inr.format(Math.round(totalMonthly))}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Combined estimated ops savings and revenue protected each month.
            </p>
          </div>

          <div className="grid gap-4">
            {results.map((r) => (
              <div key={r.label} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <r.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">{r.label}</p>
                    <p className="font-display text-2xl font-bold">{r.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{r.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-sm font-semibold">Estimates only</p>
            <p className="mt-2 text-sm text-body">
              These figures are illustrative estimates based on general assumptions, not a quote or a
              guarantee of results. Actual savings depend on your listings, channels, rates, and
              how your team works. Assumptions used: automation removes about 70% of manual hours,
              ops time valued at {inr.format(OPS_COST_PER_HOUR)}/hour, roughly{" "}
              {BOOKINGS_PER_PROPERTY_PER_MONTH} bookings per listing per month with about{" "}
              {(DOUBLE_BOOKING_RISK_RATE * 100).toFixed(0)}% at risk of a double-booking costing{" "}
              {NIGHTS_LOST_PER_INCIDENT} nights.
            </p>
            <Button asChild size="lg" className="mt-5">
              <Link href="/demo">
                Request a demo <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
