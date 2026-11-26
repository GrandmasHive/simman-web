import { Button } from "antd";
import { photography } from "../../data/content";
import Icon from "../ui/Icon";

export default function Hero() {
  return (
    <section
      className="hero container"
      style={{ "--hero-image": `url("${photography.hero}")` }}
    >
      <div className="hero-copy">
        <p className="eyebrow reveal">
          <span className="eyebrow-line" /> PROPERTY MANAGEMENT, CONNECTED
        </p>
        <h1 className="reveal reveal-delay-1">
          Every property.
          <br />
          One <span>organised</span>
          <br />
          day.
        </h1>
        <p className="hero-description reveal reveal-delay-2">
          Property management and channel distribution for operators with
          10–500+ listings. Keep calendars connected and partner payouts
          organised, from one dashboard.
        </p>
        <div className="hero-actions reveal reveal-delay-3">
          <Button type="primary" href="/demo" className="button">
            Let's book your demo
          </Button>
          <a href="#platform" className="quiet-link">
            Explore the platform
          </a>
        </div>
        <div className="hero-assurance reveal reveal-delay-4">
          <Icon name="check" size={17} />
          <span>A personal walkthrough for your property business</span>
        </div>
        <a href="#ai-assistant" className="ai-pill reveal reveal-delay-4">
          <Icon name="sparkles" size={15} />
          Discover the AI Assistant
        </a>
      </div>
    </section>
  );
}
