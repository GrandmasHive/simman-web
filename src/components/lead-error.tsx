import { site } from "@/lib/site";

/** Key set only after the email alert confirms a lead; /thank-you consumes it once. */
export const LEAD_CONFIRMED_KEY = "simman_lead_confirmed";

/**
 * Shown when the email alert did not confirm delivery. The visitor stays on the form
 * with their input intact and gets the phone + WhatsApp routes as a fallback.
 */
export function LeadError({ className = "" }: { className?: string }) {
  const phone = site.phones[0];
  return (
    <div role="alert" className={`rounded-lg border border-destructive/40 p-3 text-sm text-destructive ${className}`}>
      We couldn&apos;t send your request just now. Your details are still in the form, so please
      try again, or reach us directly: call{" "}
      <a href={`tel:${phone.tel}`} className="font-semibold underline">
        {phone.label}
      </a>{" "}
      or{" "}
      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold underline"
      >
        WhatsApp us
      </a>
      .
    </div>
  );
}
