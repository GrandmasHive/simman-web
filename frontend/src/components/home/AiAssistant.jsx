import { Button } from "antd";
import Icon from "../ui/Icon";

export default function AiAssistant() {
  return (
    <section id="ai-assistant" className="ai-section">
      <div className="container ai-layout">
        <div className="ai-copy reveal">
          <p className="eyebrow">
            <Icon name="sparkles" size={17} /> AI ASSISTANT
          </p>
          <h2>
            A little <span>intelligence.</span>
            <br />
            Right where
            <br />
            you work.
          </h2>
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
            alt="Actual Simplified Management AI Assistant panel open over the reservations calendar, answering 'What was occupancy last month?' with the occupancy percentage, sold and available unit-nights, caveats, its sourcing, and suggested follow-up questions"
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
