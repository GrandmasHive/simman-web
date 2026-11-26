import { useEffect, useState } from "react";

export default function LogoIntro() {
  const [phase, setPhase] = useState("hold");

  useEffect(() => {
    if (sessionStorage.getItem("sm-intro-done")) {
      setPhase("gone");
      return;
    }
    sessionStorage.setItem("sm-intro-done", "1");
    const t1 = setTimeout(() => setPhase("fly"), 900);
    const t2 = setTimeout(() => setPhase("gone"), 1550);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`logo-intro${phase === "fly" ? " logo-intro--fly" : ""}`} aria-hidden="true">
      <div className="logo-intro-inner">
        <img src="/images/logo-full.png" alt="" />
      </div>
    </div>
  );
}
