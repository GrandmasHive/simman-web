"use client";

import { useEffect } from "react";
import { LEAD_CONFIRMED_KEY } from "@/components/lead-error";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires the single lead conversion on /thank-you, but only when the demo form set
 * the confirmed-lead flag after the email alert confirmed the lead. The flag is consumed, so a
 * direct visit or a refresh of /thank-you does not report a conversion.
 */
export function ConversionTracker() {
  useEffect(() => {
    let confirmed = false;
    try {
      confirmed = sessionStorage.getItem(LEAD_CONFIRMED_KEY) !== null;
      sessionStorage.removeItem(LEAD_CONFIRMED_KEY);
    } catch {
      confirmed = false;
    }
    if (!confirmed) return;
    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        form: "demo-request",
        page_location: window.location.href,
      });
    }
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead");
    }
  }, []);
  return null;
}
