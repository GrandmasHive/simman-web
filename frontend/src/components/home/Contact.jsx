import { Button, Input, Select } from "antd";
import { useRef, useState } from "react";

const FORM_ENDPOINT = "https://formspree.io/f/maeolobz";

export default function Contact({ mode = "demo" }) {
  const isContact = mode === "contact";
  const params = new URLSearchParams(window.location.search);
  const context = params.get("channel")
    ? `I'd like to discuss the ${params.get("channel")} connection.`
    : params.get("interest")
      ? `I'd like a walkthrough for ${params.get("interest")}.`
      : "";
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [portfolio, setPortfolio] = useState(undefined);
  const [interest, setInterest] = useState("The full platform");
  const portfolioRef = useRef(null);
  async function handleSubmit(event) {
    event.preventDefault();
    if (!portfolio) {
      setStatus("Please select your portfolio size.");
      portfolioRef.current?.focus();
      return;
    }
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set(
      "_subject",
      isContact ? "Property management enquiry" : "Platform demo enquiry",
    );
    setSubmitting(true);
    setStatus("");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus(
        "Thank you — we've received your details and will be in touch shortly.",
      );
      form.reset();
      setPortfolio(undefined);
      setInterest("The full platform");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus(
        "Something went wrong sending your enquiry. Please email us directly at info@simplifiedmanagement.in.",
      );
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <section id="contact" className="contact-section">
      <div className="container contact-layout">
        <div className="contact-copy">
          <p className="eyebrow">MORE ROOM FOR WHAT MATTERS</p>
          <h2>
            Your next chapter
            <br />
            starts with a<br />
            <em>simpler day.</em>
          </h2>
          <p>
            Let's explore what connected property management could look like for
            your business.
          </p>
          <div className="contact-links">
            <a href="tel:+919824004043">+91 98240 04043</a>
            <a href="mailto:info@simplifiedmanagement.in">
              info@simplifiedmanagement.in
            </a>
          </div>
        </div>
        <form className="demo-form" onSubmit={handleSubmit}>
          <h3>
            {isContact ? "Start a conversation" : "Book your personal demo"}
          </h3>
          <p>
            {isContact
              ? "Tell us about your properties and how we can help."
              : "A conversation around your properties and priorities."}
          </p>
          <div className="form-row">
            <label htmlFor="demo-name">
              Your name
              <Input
                id="demo-name"
                name="name"
                autoComplete="name"
                placeholder="Full name"
                required
              />
            </label>
            <label htmlFor="demo-email">
              Work email
              <Input
                id="demo-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
              />
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="demo-phone">
              Phone <span>(optional)</span>
              <Input
                id="demo-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Your contact number"
              />
            </label>
            <label htmlFor="demo-portfolio">
              Portfolio size
              <Select
                ref={portfolioRef}
                id="demo-portfolio"
                aria-required="true"
                className="site-select"
                classNames={{ popup: { root: "site-select-popup" } }}
                placeholder="Select properties"
                value={portfolio}
                onChange={(value) => { setPortfolio(value); setStatus(""); }}
                options={["1–10 properties", "11–50 properties", "51–200 properties", "200+ properties"].map(value => ({ value, label: value }))}
              />
              <input type="hidden" name="portfolio" value={portfolio || ""} />
            </label>
          </div>
          <label htmlFor="demo-interest">
            I'd like to explore
            <Select
              id="demo-interest"
              className="site-select"
              classNames={{ popup: { root: "site-select-popup" } }}
              value={interest}
              onChange={setInterest}
              options={["The full platform", "Property management", "Channel management", "Partner accounts", "The mobile app", "The AI Assistant"].map(value => ({ value, label: value }))}
            />
            <input type="hidden" name="interest" value={interest} />
          </label>
          <label htmlFor="demo-message">
            Anything else? <span>(optional)</span>
            <Input.TextArea
              id="demo-message"
              name="message"
              rows="3"
              defaultValue={context}
              placeholder="Tell us what you want to simplify."
            />
          </label>
          <Button
            type="primary"
            className="button"
            htmlType="submit"
            loading={submitting}
          >
            {isContact ? "Send my enquiry" : "Send my demo request"}
          </Button>
          <small className="form-note">
            We'll get back to you within one business day.
          </small>
          <p className="form-status" role="status">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}


