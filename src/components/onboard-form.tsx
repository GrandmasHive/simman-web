"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LeadError } from "@/components/lead-error";
import { sendLeadAlert } from "@/lib/lead-alert";
import { site } from "@/lib/site";

export const BOOKING_SITES = [
  "Airbnb",
  "Booking.com",
  "MakeMyTrip",
  "Goibibo",
  "Agoda",
  "Expedia",
  "Vrbo",
  "StayVista",
  "Direct / WhatsApp",
  "Other",
];

const TRACKING = ["Excel or Google Sheets", "WhatsApp groups", "Other software", "Notebook", "Other"];

function Choice({ name, value, type = "radio", required }: { name: string; value: string; type?: "radio" | "checkbox"; required?: boolean }) {
  return (
    <label className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
      <input type={type} name={name} value={value} required={required} />
      {value}
    </label>
  );
}

export function OnboardForm() {
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [done, setDone] = useState(false);
  const [kind, setKind] = useState<"listings" | "hotel">("listings");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setFailed(false);
    const fd = new FormData(e.currentTarget);
    const answers = {
      name: String(fd.get("name") ?? ""),
      business: String(fd.get("business") ?? ""),
      type: String(fd.get("type") ?? ""),
      units: String(fd.get("units") ?? ""),
      cities: String(fd.get("cities") ?? ""),
      sites: fd.getAll("sites").map(String).join(", "),
      tracking: String(fd.get("tracking") ?? ""),
      sharedOwners: String(fd.get("sharedOwners") ?? ""),
      team: String(fd.get("team") ?? ""),
      bestTime: String(fd.get("bestTime") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
    };
    // Honeypot ticked: act as if it worked and send nothing.
    if (fd.get("botcheck")) {
      setDone(true);
      return;
    }

    const sent = await sendLeadAlert({
      subject: "Onboarding details - Simplified Management",
      from_name: "Simplified Management Website",
      ...answers,
    });

    if (!sent) {
      setFailed(true);
      setPending(false);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-sync-text" />
        <h2 className="mt-4 font-display text-2xl font-bold">Thank you. We have your details.</h2>
        <p className="mt-3 text-body">
          Our team will call or WhatsApp you at the time you picked. To talk sooner, call or WhatsApp{" "}
          <a href={`tel:${site.phones[0].tel}`} className="font-semibold text-primary hover:underline">
            {site.phones[0].label}
          </a>
          .
        </p>
      </div>
    );
  }

  const unit = kind === "hotel" ? "rooms" : "listings";

  return (
    <form onSubmit={onSubmit} className="grid gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <input type="checkbox" name="botcheck" tabIndex={-1} className="hidden" aria-hidden />

      <div className="grid gap-1.5">
        <Label htmlFor="ob-name">1. Your name</Label>
        <Input id="ob-name" name="name" required autoComplete="name" placeholder="Rajesh Kumar" />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="ob-business">2. Business or property name</Label>
        <Input id="ob-business" name="business" required placeholder="Coastal Stays Goa" />
      </div>

      <fieldset className="grid gap-2">
        <legend className="mb-2 text-sm font-medium">3. What do you run?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          <label className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
            <input type="radio" name="type" value="Listings (villas, homestays, flats)" required defaultChecked onChange={() => setKind("listings")} />
            Listings (villas, homestays, flats)
          </label>
          <label className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm">
            <input type="radio" name="type" value="Hotel" onChange={() => setKind("hotel")} />
            A hotel
          </label>
        </div>
      </fieldset>

      <div className="grid gap-1.5">
        <Label htmlFor="ob-units">4. How many {unit}?</Label>
        <Input id="ob-units" name="units" type="number" min={1} max={100000} required inputMode="numeric" placeholder="8" />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="ob-cities">5. Which cities are they in?</Label>
        <Input id="ob-cities" name="cities" required placeholder="Goa, Lonavala" />
      </div>

      <fieldset className="grid gap-2">
        <legend className="mb-2 text-sm font-medium">6. Which booking sites do you use?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {BOOKING_SITES.map((s) => (
            <Choice key={s} name="sites" value={s} type="checkbox" />
          ))}
        </div>
      </fieldset>

      <fieldset className="grid gap-2">
        <legend className="mb-2 text-sm font-medium">7. How do you track bookings today?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {TRACKING.map((t) => (
            <Choice key={t} name="tracking" value={t} required />
          ))}
        </div>
      </fieldset>

      <fieldset className="grid gap-2">
        <legend className="mb-2 text-sm font-medium">8. Do two or more owners share the money from any property?</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          <Choice name="sharedOwners" value="Yes" required />
          <Choice name="sharedOwners" value="No" />
        </div>
      </fieldset>

      <div className="grid gap-1.5">
        <Label htmlFor="ob-team">9. How many people work on your properties? (caretakers, housekeeping, accounts)</Label>
        <Input id="ob-team" name="team" type="number" min={0} max={10000} inputMode="numeric" placeholder="5" />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="ob-time">10. Best day and time for a 15-minute call</Label>
        <Input id="ob-time" name="bestTime" required placeholder="Tuesday after 4 pm" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="ob-phone">WhatsApp number</Label>
          <Input id="ob-phone" name="phone" type="tel" required pattern="[+0-9 ()-]{10,20}" autoComplete="tel" placeholder="+91 98765 43210" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="ob-email">Email (optional)</Label>
          <Input id="ob-email" name="email" type="email" autoComplete="email" placeholder="rajesh@coastalstays.in" />
        </div>
      </div>

      {failed && <LeadError />}
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Sending..." : "Send my details"}
      </Button>
    </form>
  );
}
