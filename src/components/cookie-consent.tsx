"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CONSENT_OPEN_EVENT,
  loadTrackers,
  readConsent,
  revokeTrackers,
  writeConsent,
} from "@/lib/consent";

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = readConsent();
    if (c?.analytics) loadTrackers();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- consent lives in localStorage, only readable after mount
    if (!c) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  // Reserve space so the banner never sits on top of page content
  // (for example the demo form's submit button on mobile).
  useEffect(() => {
    const root = document.documentElement;
    if (!open || !ref.current) {
      root.style.removeProperty("--consent-h");
      document.body.style.paddingBottom = "";
      return;
    }
    const el = ref.current;
    const apply = () => {
      const h = `${el.offsetHeight}px`;
      root.style.setProperty("--consent-h", h);
      document.body.style.paddingBottom = h;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--consent-h");
      document.body.style.paddingBottom = "";
    };
  }, [open]);

  const choose = useCallback((analytics: boolean) => {
    writeConsent(analytics);
    if (analytics) loadTrackers();
    else revokeTrackers();
    setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.25)]"
    >
      <div className="container-page flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-body">
          We use Google Analytics and Meta Pixel to measure visits and ads. They load only if you
          accept. Details are in our{" "}
          <Link href="/privacy" className="font-semibold text-primary hover:underline">
            privacy policy
          </Link>
          .
        </p>
        <div className="grid shrink-0 grid-cols-2 gap-3 sm:w-72">
          <Button variant="outline" size="lg" onClick={() => choose(false)}>
            Reject
          </Button>
          <Button variant="outline" size="lg" onClick={() => choose(true)}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
    >
      Cookie settings
    </button>
  );
}
