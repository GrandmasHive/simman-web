export const CONSENT_KEY = "simman_consent";
export const CONSENT_VERSION = 1;
export const CONSENT_OPEN_EVENT = "simman:open-consent";

export const GA_ID = "G-66919LQZJG";
export const META_PIXEL = "1360745635969895";

export type Consent = { v: number; analytics: boolean; ts: string };

export function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    if (c && c.v === CONSENT_VERSION && typeof c.analytics === "boolean") return c;
    return null;
  } catch {
    return null;
  }
}

export function writeConsent(analytics: boolean): void {
  try {
    const c: Consent = { v: CONSENT_VERSION, analytics, ts: new Date().toISOString() };
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
  } catch {
    /* storage blocked: choice applies to this page view only */
  }
}

let loaded = false;

/** Injects GA4 and Meta Pixel. Call only after the visitor accepts. */
export function loadTrackers(): void {
  if (loaded) return;
  loaded = true;
  const w = window as unknown as Record<string, unknown> & {
    dataLayer?: unknown[];
    gtag?: (...a: unknown[]) => void;
    fbq?: (...a: unknown[]) => void;
    _fbq?: unknown;
  };
  w[`ga-disable-${GA_ID}`] = false;

  // GA4
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () {
    // gtag.js needs the real `arguments` object, not an array
    // eslint-disable-next-line prefer-rest-params
    (w.dataLayer as unknown[]).push(arguments);
  };
  const g = w.gtag as (...a: unknown[]) => void;
  g("js", new Date());
  g("config", GA_ID);
  const ga = document.createElement("script");
  ga.async = true;
  ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(ga);

  // Meta Pixel
  if (!w.fbq) {
    type Fbq = ((...a: unknown[]) => void) & {
      queue: unknown[];
      loaded: boolean;
      version: string;
      push: unknown;
      callMethod?: (...a: unknown[]) => void;
    };
    const n: Fbq = Object.assign(
      (...args: unknown[]) => {
        if (n.callMethod) n.callMethod(...args);
        else n.queue.push(args);
      },
      { queue: [] as unknown[], loaded: true, version: "2.0", push: null as unknown },
    );
    n.push = n;
    w.fbq = n;
    if (!w._fbq) w._fbq = n;
    const fb = document.createElement("script");
    fb.async = true;
    fb.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(fb);
  }
  w.fbq!("init", META_PIXEL);
  w.fbq!("track", "PageView");
}

/** Stops trackers in the current page and deletes their cookies. */
export function revokeTrackers(): void {
  const w = window as unknown as Record<string, unknown> & { fbq?: (...a: unknown[]) => void };
  w[`ga-disable-${GA_ID}`] = true;
  try {
    w.fbq?.("consent", "revoke");
  } catch {
    /* ignore */
  }
  try {
    const host = window.location.hostname;
    const parts = host.split(".");
    const domains = new Set<string>(["", host, `.${host}`]);
    if (parts.length > 2) domains.add(`.${parts.slice(-2).join(".")}`);
    if (parts.length > 1) domains.add(`.${parts.slice(-2).join(".")}`);
    const names = document.cookie
      .split(";")
      .map((c) => c.split("=")[0].trim())
      .filter((n) => n === "_fbp" || n === "_fbc" || n === "_ga" || n.startsWith("_ga_") || n.startsWith("_gcl_"));
    for (const name of names) {
      for (const d of domains) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
      }
    }
  } catch {
    /* ignore */
  }
}
