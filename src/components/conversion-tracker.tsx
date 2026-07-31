"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fires the single lead conversion when the /thank-you page is reached. */
export function ConversionTracker() {
  useEffect(() => {
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
