import { channels } from "../../data/channels";

const LogoList = () =>
  channels.map((c) => (
    <a
      key={c.name}
      href="/integrations"
      aria-label={`Explore ${c.name} integration`}
      className="channel-logo"
      data-tooltip={c.name}
    >
      <img src={c.logo} alt={c.name} loading="lazy" />
    </a>
  ));

export default function Channels() {
  return (
    <section className="channels">
      <div className="container">
        <p className="reveal">Your channels. One connected conversation.</p>
      </div>

      {/* Desktop: CSS infinite scroll — 4 copies for gap-free endless loop */}
      <div className="channel-marquee-wrap">
        <div className="channel-names channel-names--scroll">
          <LogoList />
          <LogoList />
          <LogoList />
          <LogoList />
        </div>
      </div>

      {/* Mobile: static centered grid */}
      <div className="container">
        <div className="channel-names channel-names--static reveal reveal-delay-1">
          <LogoList />
        </div>

        <small className="reveal reveal-delay-2">
          Explore supported connections and synchronisation methods with our
          team.
        </small>
      </div>
    </section>
  );
}
