import { cn } from "@/lib/utils";

/**
 * Signature channel-sync motif for the login brand panel.
 *
 * OTA channel nodes sit around the upper/peripheral edge of the panel; thin
 * connector lines converge toward the center — where the robot stands — so the
 * robot reads as the hub that unifies every channel. A slow dash pulse travels
 * along each line (sync in motion). Everything is low-opacity and ambient so it
 * never competes with the robot's face (which lives upper-center).
 *
 * Pure SVG + CSS — no client JS, no heavy deps. Renders as a server component.
 * The convergence point is (50, 46) in the 100x100 viewBox: just above center,
 * clear of the robot's head, so the lines fan out and don't stack on the face.
 */

// Peripheral nodes. Positions are viewBox percentages (0–100). They hug the
// top and side edges, deliberately avoiding the upper-center head zone.
const NODES = [
  { name: "Airbnb", x: 16, y: 18, delay: "0s" },
  { name: "Booking.com", x: 74, y: 15, delay: "1.1s" },
  { name: "Agoda", x: 12, y: 42, delay: "2.2s" },
  { name: "MakeMyTrip", x: 75, y: 39, delay: "0.6s" },
  { name: "Goibibo", x: 17, y: 60, delay: "1.7s" },
  { name: "StayVista", x: 72, y: 58, delay: "2.8s" },
] as const;

// Shared convergence point (the "hub").
const HUB_X = 50;
const HUB_Y = 46;

export function ChannelMotif({
  className,
  layer = "both",
}: {
  className?: string;
  /** Split rendering so lines can sit behind the robot and pills in front. */
  layer?: "lines" | "nodes" | "both";
}) {
  const showLines = layer !== "nodes";
  const showNodes = layer !== "lines";
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {/* Connector lines converging on the hub. Non-scaling stroke keeps the
          lines hairline-thin regardless of panel size. */}
      {showLines && (
      <svg
        className="absolute inset-0 size-full text-primary"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        {NODES.map((n) => (
          <g key={n.name}>
            {/* Static faint rail */}
            <line
              x1={n.x}
              y1={n.y}
              x2={HUB_X}
              y2={HUB_Y}
              stroke="currentColor"
              strokeOpacity={0.14}
              strokeWidth={0.35}
              vectorEffect="non-scaling-stroke"
            />
            {/* Animated dash pulse traveling toward the hub */}
            <line
              x1={n.x}
              y1={n.y}
              x2={HUB_X}
              y2={HUB_Y}
              stroke="currentColor"
              strokeOpacity={0.55}
              strokeWidth={0.6}
              strokeDasharray="3 22"
              vectorEffect="non-scaling-stroke"
              className="channel-dash"
              style={{ animationDelay: n.delay }}
            />
          </g>
        ))}
        {/* Hub glow ring */}
        <circle
          cx={HUB_X}
          cy={HUB_Y}
          r={2}
          fill="currentColor"
          fillOpacity={0.18}
          className="channel-hub"
        />
      </svg>
      )}

      {/* Channel node pills. Rendered in front of the robot (see login page)
          so labels stay fully visible over the arms/body. */}
      {showNodes &&
        NODES.map((n) => (
          <div
            key={n.name}
            className="channel-node absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: n.delay }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-white/85 px-2.5 py-1 text-[10px] font-medium tracking-tight text-primary shadow-sm backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              {n.name}
            </span>
          </div>
        ))}

      {/* Scoped keyframes — kept local to the motif so nothing else is touched. */}
      <style>{`
        @keyframes channelDash {
          to { stroke-dashoffset: -25; }
        }
        @keyframes channelPulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.9; }
        }
        @keyframes channelHub {
          0%, 100% { fill-opacity: 0.12; r: 2; }
          50% { fill-opacity: 0.3; r: 2.6; }
        }
        .channel-dash {
          animation: channelDash 3.2s linear infinite;
        }
        .channel-node {
          animation: channelPulse 4s ease-in-out infinite;
        }
        .channel-hub {
          animation: channelHub 3.2s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          .channel-dash, .channel-node, .channel-hub {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
