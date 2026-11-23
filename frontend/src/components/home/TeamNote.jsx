import { teamNote } from "../../data/content";

export default function TeamNote() {
  return (
    <section className="section container team-note">
      <blockquote>
        <p>{teamNote}</p>
        <cite>The Simplified Management team · Pune, India</cite>
      </blockquote>
    </section>
  );
}
