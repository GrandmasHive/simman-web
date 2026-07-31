"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// WIRE ME (added last, before ads): create a free Web3Forms account and set the
// access key via the NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY environment variable (in Vercel
// project settings, not hardcoded). Web3Forms needs no backend and works on any host.
// Until the key is set, submissions are captured locally and the user still reaches
// /thank-you, where the GA4 generate_lead + Meta Lead conversion events fire.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "__WEB3FORMS_ACCESS_KEY__";

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

    try {
      if (hasLiveKey) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.message || "Submission failed");
      } else {
        // Local capture until the key is wired.
        const data = Object.fromEntries(new FormData(form).entries());
        console.info("[demo-request] captured locally:", data);
      }
      router.push("/thank-you");
    } catch {
      // Never block the user — still route to the thank-you page.
      router.push("/thank-you");
    } finally {
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
          <Label htmlFor="properties">Company / Total Properties</Label>
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
