"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Web3Forms access key. Deliberately inlined as the fallback rather than left to an
// environment variable: simplifiedmanagement.in is built and served by a Vercel account
// we do not control, so we cannot set env vars for the live site — and with no key this
// form silently drops the lead (see the local-capture branch below) while still showing
// /thank-you and firing the GA4 generate_lead + Meta Lead conversion events. A real
// NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY still overrides this. The key is public by design:
// it ships in the rendered form markup on every page load, and is free to rotate.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
  "436ad4a1-8628-4d57-9e21-c5ae4c3366e3";

export function DemoForm() {
  const router = useRouter();
  const [status, setStatus] = useState<null | string>(null);
  const [pending, setPending] = useState(false);
  const hasLiveKey = WEB3FORMS_ACCESS_KEY && !WEB3FORMS_ACCESS_KEY.startsWith("__");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!(form.elements.namedItem("consent") as HTMLInputElement)?.checked) {
      setStatus("Please accept the Privacy Policy to continue.");
      return;
    }
    setPending(true);
    setStatus(null);

    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    try {
      // Primary: our own endpoint → HubSpot CRM (Contact + Deal, realtime) + email.
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`lead endpoint ${res.status}`);
    } catch {
      // Fallback: post straight to Web3Forms so a lead is never dropped, even if
      // our endpoint is unreachable. (Skipped only if no key is available at all.)
      try {
        if (hasLiveKey) {
          await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { Accept: "application/json" },
            body: fd,
          });
        } else {
          console.info("[demo-request] captured locally:", data);
        }
      } catch {
        /* never block the user */
      }
    } finally {
      // Always route to the thank-you page (fires GA4 generate_lead + Meta Lead).
      router.push("/thank-you");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
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
        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          {pending ? "Sending..." : "Request Demo"}
        </Button>
      </div>
    </form>
  );
}
