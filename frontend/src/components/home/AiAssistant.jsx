import { Button } from "antd";
import { useEffect, useRef, useState } from "react";
import Icon from "../ui/Icon";

const TEXT_SETS = [
  [
    { text: "A little intelligence.", blueFrom: 9 },
    { text: "Right where" },
    { text: "you work." },
  ],
  [
    { text: "One dashboard." },
    { text: "Every channel." },
    { text: "Zero chaos." },
  ],
  [
    { text: "Every booking." },
    { text: "Every channel." },
    { text: "One place." },
  ],
  [
    { text: "Less switching." },
    { text: "More managing." },
    { text: "More time." },
  ],
  [
    { text: "Happy guests." },
    { text: "Smooth checkouts." },
    { text: "Every time." },
  ],
  [
    { text: "Live data." },
    { text: "Smart answers." },
    { text: "Right now." },
  ],
  [
    { text: "Every listing." },
    { text: "One clear" },
    { text: "view." },
  ],
];

const SPEED = 80;
const ERASE = 32;
const LINE_PAUSE = 600;
const HOLD = 5000;
const NEXT_PAUSE = 400;

function useTypewriter(triggered) {
  const [anim, setAnim] = useState({ setIdx: 0, phase: "typing", lineIdx: 0, chars: 0 });
  const timer = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!triggered || started.current) return;
    started.current = true;

    function run(setIdx, phase, lineIdx, chars) {
      const lines = TEXT_SETS[setIdx];

      if (phase === "typing") {
        const line = lines[lineIdx];
        if (!line) {
          const last = lines.length - 1;
          setAnim({ setIdx, phase: "holding", lineIdx: last, chars: lines[last].text.length });
          timer.current = setTimeout(() => run(setIdx, "erasing", last, lines[last].text.length), HOLD);
          return;
        }
        if (chars < line.text.length) {
          const next = chars + 1;
          setAnim({ setIdx, phase: "typing", lineIdx, chars: next });
          timer.current = setTimeout(() => run(setIdx, "typing", lineIdx, next), SPEED);
        } else {
          timer.current = setTimeout(() => run(setIdx, "typing", lineIdx + 1, 0), LINE_PAUSE);
        }
      } else if (phase === "erasing") {
        if (chars > 0) {
          const next = chars - 1;
          setAnim({ setIdx, phase: "erasing", lineIdx, chars: next });
          timer.current = setTimeout(() => run(setIdx, "erasing", lineIdx, next), ERASE);
        } else if (lineIdx > 0) {
          const prevLen = lines[lineIdx - 1].text.length;
          setAnim({ setIdx, phase: "erasing", lineIdx: lineIdx - 1, chars: prevLen });
          timer.current = setTimeout(() => run(setIdx, "erasing", lineIdx - 1, prevLen), ERASE);
        } else {
          const nextSet = (setIdx + 1) % TEXT_SETS.length;
          setAnim({ setIdx: nextSet, phase: "typing", lineIdx: 0, chars: 0 });
          timer.current = setTimeout(() => run(nextSet, "typing", 0, 0), NEXT_PAUSE);
        }
      }
    }

    run(0, "typing", 0, 0);
    return () => clearTimeout(timer.current);
  }, [triggered]);

  return anim;
}

export default function AiAssistant() {
  const sectionRef = useRef(null);
  const [triggered, setTriggered] = useState(false);
  const anim = useTypewriter(triggered);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function renderLines() {
    const lines = TEXT_SETS[anim.setIdx];
    const { phase, lineIdx, chars } = anim;
    const nodes = [];

    for (let i = 0; i < lines.length; i++) {
      if (i > lineIdx) break;
      const line = lines[i];
      const isActive = i === lineIdx;
      const displayCount = isActive ? chars : line.text.length;
      const visible = line.text.slice(0, displayCount);
      const cursor = isActive ? <span className="typing-cursor" key="cur">|</span> : null;

      let content;
      if (line.blueFrom != null) {
        const plain = visible.slice(0, Math.min(visible.length, line.blueFrom));
        const blue = visible.length > line.blueFrom ? visible.slice(line.blueFrom) : "";
        content = <>{plain}{blue && <span>{blue}</span>}{cursor}</>;
      } else {
        content = <>{visible}{cursor}</>;
      }

      nodes.push(<span key={`${anim.setIdx}-${i}`} className="typing-line">{content}</span>);
      if (i < lineIdx) nodes.push(<br key={`br${i}`} />);
    }
    return nodes;
  }

  return (
    <section id="ai-assistant" className="ai-section" ref={sectionRef}>
      <div className="container ai-layout">
        <div className="ai-copy reveal">
          <p className="eyebrow">
            <Icon name="sparkles" size={17} /> AI ASSISTANT
          </p>
          <h2 className="typing-h2">{renderLines()}</h2>
          <p>
            Meet the AI Assistant inside Simplified Management. Explore it
            alongside your property workflows in a personal walkthrough with our
            team.
          </p>
          <div className="ai-divider" />
          <h3>See what it can do for your operation.</h3>
          <p className="ai-secondary">
            Bring your everyday questions to the demo. We'll show you the
            assistant and explain the capabilities available in the platform.
          </p>
          <Button type="primary" className="button ai-demo" href="/demo">
            See the AI Assistant in action
          </Button>
          <a className="ai-product-link" href="#product-screenshots">
            Explore the actual product screens
          </a>
        </div>
        <figure className="ai-artwork reveal reveal-delay-2">
          <img
            src="/images/ai-assistant-occupancy.png"
            alt="Actual Simplified Management AI Assistant panel open over the reservations calendar"
            loading="lazy"
            width="1335"
            height="878"
          />
          <figcaption>Actual product screenshot · AI Assistant in the reservations view</figcaption>
        </figure>
      </div>
    </section>
  );
}
