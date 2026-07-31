"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
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
 * The Spline scene only listens for pointer movement over its own <canvas>, so the
 * robot ignores the cursor when it's over the surrounding text/form. We forward every
 * page-wide pointer move into the canvas so the robot tracks the cursor from anywhere.
 */
export function SplineRobot({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="pointer-events-none absolute inset-0 -z-10 glow-soft" />
      <Spline
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="!h-full !w-full"
      />
    </div>
  );
}
