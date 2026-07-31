/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

/** The real Simplified Management wordmark (transparent, reads on dark). */
export function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/logo.webp"
      alt="Simplified Management"
      className={cn("h-7 w-auto", className)}
    />
  );
}
