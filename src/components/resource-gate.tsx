"use client";

import { useState } from "react";
import { Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LeadError } from "@/components/lead-error";
import { submitLead } from "@/lib/lead-alert";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type Resource = {
  slug: string;
  title: string;
  description: string;
  file: string;
  fileLabel: string;
  note?: string;
};

/**
 * Email-gated download list. One email capture unlocks every resource passed
 * in. Sends the same email alert as the /demo form and unlocks only once
 * delivery is confirmed. Fires a
 * distinct "lead_magnet_download" conversion event (GA4 + Meta) instead of
 * demo-request's "generate_lead", so the two lead sources stay attributable
 * separately in analytics.
 */
export function ResourceGate({ resources }: { resources: Resource[] }) {
  const [unlocked, setUnlocked] = useState(false);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<null | string>(null);
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

    // Unlock and fire the conversion only after the email alert confirms.
    const confirmed = await submitLead({ ...data, kind: "resource" });

    if (!confirmed) {
      setFailed(true);
      setPending(false);
      return;
    }

    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", "lead_magnet_download", {
          form: "resources-gate",
          resources: resources.map((r) => r.slug).join(","),
          page_location: window.location.href,
        });
      }
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", { content_name: "resource_download" });
      }
    } catch {
      /* analytics must never block the downloads of a confirmed lead */
    }
    setUnlocked(true);
    setPending(false);
  }

  if (unlocked) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {resources.map((r) => (
          <a
            key={r.slug}
            href={r.file}
            download
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary"
          >
            <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-subtle text-primary">
              <Download className="size-4" />
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold">{r.title}</h3>
            <p className="mt-2 flex-1 text-sm text-body">{r.description}</p>
            {r.note && <p className="mt-3 text-xs text-muted-foreground">{r.note}</p>}
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Download {r.fileLabel} <Download className="size-3.5" />
            </span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <input type="hidden" name="subject" value="New Lead Magnet Request - Simplified Management" />
      <input type="hidden" name="from_name" value="Simplified Management Website" />
      <input type="checkbox" name="botcheck" tabIndex={-1} className="hidden" aria-hidden />

      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        <Lock className="size-4" />
        Enter your email to unlock both templates
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <div className="grid gap-1.5">
          <Label htmlFor="rg-name">Name</Label>
          <Input id="rg-name" name="name" placeholder="Rajesh Kumar" autoComplete="name" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="rg-email">Work Email</Label>
          <Input
            id="rg-email"
            name="email"
            type="email"
            required
            placeholder="rajesh@builders.in"
            autoComplete="email"
          />
        </div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Unlocking..." : "Get the Templates"}
        </Button>
      </div>

      <label className="mt-4 flex items-start gap-2 text-sm text-body">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>
          I agree to the{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>{" "}
          and consent to being contacted.
        </span>
      </label>

      {status && <p className="mt-3 text-sm text-destructive">{status}</p>}
      {failed && <LeadError className="mt-3" />}
    </form>
  );
}
