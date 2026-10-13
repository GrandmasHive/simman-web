"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";

const GA_ID = "G-66919LQZJG";
const META_PIXEL = "1360745635969895";

const CONSENT_KEY = "sm-cookie-consent";
const OPEN_EVENT = "sm-open-cookie-settings";
const CHANGE_EVENT = "sm-cookie-consent-change";

type Consent = "granted" | "denied";

function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// On the server (and during hydration) the choice is unknown: render no banner
// and no trackers until the browser has read the saved choice.
const UNKNOWN = "unknown" as const;

/** Reopens the banner, e.g. from the footer "Cookie settings" link. */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/**
 * Google Analytics and the Meta Pixel load only after the visitor accepts.
 * Accept and Reject are the same size and one click each, and the choice can be
 * changed later from the footer. Rejecting after accepting reloads the page so
 * the already-loaded trackers are dropped.
 */
export function CookieConsent() {
  const stored = useSyncExternalStore(subscribe, readConsent, () => UNKNOWN);
  // Holds the choice when storage is blocked, so it still applies on this page view.
  const [session, setSession] = useState<Consent | null>(null);
  const [reopened, setReopened] = useState(false);
  const consent = stored === UNKNOWN ? null : (stored ?? session);
  const open = stored !== UNKNOWN && (reopened || consent === null);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  function choose(next: Consent) {
    const wasGranted = consent === "granted";
    try {
      localStorage.setItem(CONSENT_KEY, next);
    } catch {
      // Storage blocked: fall back to this page view only.
    }
    setSession(next);
    setReopened(false);
    window.dispatchEvent(new Event(CHANGE_EVENT));
    if (wasGranted && next === "denied") window.location.reload();
  }

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL}');fbq('track','PageView');`}
          </Script>
        </>
      )}

      {open && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie choices"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border border-border bg-background p-5 shadow-xl shadow-black/15 sm:inset-x-6 sm:bottom-6"
        >
          <p className="font-display text-base font-semibold text-foreground">Cookies on this site</p>
          <p className="mt-2 text-sm leading-relaxed text-body">
            We use cookies the site needs to work. With your OK we also use Google Analytics to see
            which pages help visitors, and the Meta Pixel to measure our ads. You can change this any
            time from &ldquo;Cookie settings&rdquo; in the footer. Details are in our{" "}
            <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:max-w-sm">
            <Button variant="outline" size="lg" onClick={() => choose("denied")}>
              Reject
            </Button>
            <Button size="lg" onClick={() => choose("granted")}>
              Accept
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie settings
    </button>
  );
}
