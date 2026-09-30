import { WhatsappIcon } from "@/components/icons";
import { site } from "@/lib/site";

export function WhatsappButton() {
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=Hi%2C%20I%27d%20like%20a%20demo%20of%20Simplified%20Management.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{ bottom: "calc(1.25rem + var(--consent-h, 0px))" }}
      className="fixed right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform hover:scale-105"
    >
      <WhatsappIcon className="size-7" />
    </a>
  );
}
