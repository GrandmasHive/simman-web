"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <RobotLoader />,
});

function RobotLoader() {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="relative">
        <div className="size-16 animate-pulse rounded-full bg-primary/20 blur-xl" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-6 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        </div>
      </div>
    </div>
  );
}

/**
 * Cursor-reactive 3D robot (Spline scene). Client-only + lazy-loaded so it never
 * blocks the initial paint or SEO.
 *
 * The parent panel is only ever shown at `lg` and up (`hidden lg:block`), but a
 * CSS `display:none` doesn't stop React from mounting what's underneath it — so
 * without the viewport gate below, every mobile visitor would still download the
 * Spline runtime chunk and fetch the ~1.3MB scene file for a robot they can never
 * see. Gating the render itself on `min-width: 1024px` (Tailwind's `lg`) means the
 * dynamic import, and the scene fetch it triggers, never happens on mobile at all.
 *
 * The Spline scene only listens for pointer movement over its own <canvas>, so the
 * robot ignores the cursor when it's over the surrounding text/form. We forward every
 * page-wide pointer move into the canvas so the robot tracks the cursor from anywhere.
 */
export function SplineRobot({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setShouldLoad(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setShouldLoad(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const container = ref.current;
    if (!container) return;

    const forward = (e: PointerEvent | MouseEvent) => {
      // Ignore our own synthetic events to avoid a feedback loop.
      if (!e.isTrusted) return;
      const canvas = container.querySelector("canvas");
      if (!canvas) return;
      const init = {
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: false,
        cancelable: true,
      };
      canvas.dispatchEvent(new PointerEvent("pointermove", init));
      canvas.dispatchEvent(new MouseEvent("mousemove", init));
    };

    window.addEventListener("pointermove", forward, { passive: true });
    window.addEventListener("mousemove", forward, { passive: true });
    return () => {
      window.removeEventListener("pointermove", forward);
      window.removeEventListener("mousemove", forward);
    };
  }, [shouldLoad]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="pointer-events-none absolute inset-0 -z-10 glow-soft" />
      {shouldLoad && (
        <Spline
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="!h-full !w-full"
        />
      )}
    </div>
  );
}
