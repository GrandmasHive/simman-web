const prompts = [
  "What was occupancy last month?",
  "Who is arriving today?",
  "Show every unit by month",
  "Which platform brings in the most bookings?",
  "Compare today's revenue to today's expenses",
  "What can you not answer yet?",
];

export default function AiAssistantPrompts() {
  return (
    <section id="ai-assistant-prompts" className="section ai-example">
      <div className="container ai-example-layout">
        <div className="ai-example-copy reveal">
          <p className="eyebrow">ASK IT ANYTHING</p>
          <h2>One question. A real answer.</h2>
          <p>
            Ask it the way you'd ask a colleague. Occupancy, revenue,
            expenses, arrivals, bookings by channel — the AI Assistant
            answers from your own portfolio data, right inside the
            dashboard.
          </p>
          <ul className="ai-prompts ai-prompts--light">
            {prompts.map((prompt, index) => (
              <li
                key={prompt}
                className={`reveal reveal-delay-${Math.min(index + 1, 6)}`}
              >
                "{prompt}"
              </li>
            ))}
          </ul>
        </div>
        <figure className="ai-example-artwork reveal reveal-delay-2">
          <img
            src="/images/ai-assistant-channel-comparison.png"
            alt="Actual Simplified Management AI Assistant panel answering 'Which platform brings in the most bookings?' with a channel-by-channel breakdown of bookings, sold nights and net revenue, plus sourcing notes and caveats"
            loading="lazy"
            width="1917"
            height="867"
          />
          <figcaption>
            Actual product screenshot · AI Assistant comparing bookings by
            channel
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
