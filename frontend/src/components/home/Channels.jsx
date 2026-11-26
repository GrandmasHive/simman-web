import { channels } from "../../data/channels";

export default function Channels() {
  return (
    <section className="channels">
      <div className="container">
        <p className="reveal">Your channels. One connected conversation.</p>
        <div className="channel-names reveal reveal-delay-1">
          {channels.map((c) => (
            <a
              key={c.name}
              href="/integrations"
              aria-label={`Explore ${c.name} integration`}
              className="channel-logo"
              data-tooltip={c.name}
            >
              <img src={c.logo} alt={c.name} loading="lazy" />
            </a>
          ))}
        </div>
        <small className="reveal reveal-delay-2">
          Explore supported connections and synchronisation methods with our
          team.
        </small>
      </div>
    </section>
  );
}
