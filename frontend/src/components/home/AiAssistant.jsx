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
            A little intelligence.
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
            src="/images/ai-assistant-screenshot.png"
            alt="Actual Simplified Management AI Assistant panel open over the reservations calendar, answering a question about last month's occupancy with sourced figures and caveats"
            loading="lazy"
            width="1916"
            height="867"
          />
          <figcaption>Actual product screenshot · AI Assistant in the reservations view</figcaption>
        </figure>
      </div>
    </section>
  );
}
