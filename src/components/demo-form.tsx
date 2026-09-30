"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LEAD_CONFIRMED_KEY, LeadError } from "@/components/lead-error";

export function DemoForm() {
  const router = useRouter();
  const [status, setStatus] = useState<null | string>(null);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!(form.elements.namedItem("consent") as HTMLInputElement)?.checked) {
      setStatus("Please accept the Privacy Policy to continue.");
      return;
    }
    setPending(true);
    setStatus(null);
    setFailed(false);

    const data = Object.fromEntries(new FormData(form).entries());

    // /api/lead returns 200 + ok only after HubSpot or Web3Forms confirms the lead.
    // Anything else keeps the visitor here with their input and an inline error;
    // /thank-you (and its GA4 + Meta conversion) is reached only on confirmed success.
    let confirmed = false;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => null);
      confirmed = res.ok && json?.ok === true;
    } catch {
      confirmed = false;
    }

    if (!confirmed) {
      setFailed(true);
      setPending(false);
      return;
    }

    try {
      sessionStorage.setItem(LEAD_CONFIRMED_KEY, "demo-request");
    } catch {
      /* storage blocked: lead is recorded, the conversion just goes untracked */
    }
    router.push("/thank-you");
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <input type="hidden" name="subject" value="New Demo Request - Simplified Management" />
      <input type="hidden" name="from_name" value="Simplified Management Website" />
      <input type="checkbox" name="botcheck" tabIndex={-1} className="hidden" aria-hidden />

      <div className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" required placeholder="Rajesh Kumar" autoComplete="name" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="email">Work Email</Label>
          <Input id="email" name="email" type="email" required placeholder="rajesh@builders.in" autoComplete="email" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" autoComplete="tel" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="properties">Company / Total Listings</Label>
          <Input id="properties" name="properties" placeholder="Builders Stay - 150 listings" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your listings, current channels, and what you'd like to solve."
          />
        </div>
        <label className="flex items-start gap-2 text-sm text-body">
          <input type="checkbox" name="consent" required className="mt-1" />
          <span>
            I agree to the{" "}
            <a href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>{" "}
            and consent to being contacted.
          </span>
        </label>
        {status && <p className="text-sm text-destructive">{status}</p>}
        {failed && <LeadError />}
        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          {pending ? "Sending..." : "Request Demo"}
        </Button>
      </div>
    </form>
  );
}
