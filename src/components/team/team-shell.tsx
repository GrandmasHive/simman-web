"use client";
/* eslint-disable @next/next/no-img-element */

// The frame around every signed-in team screen: logo, the rep's name and Log out. `extra` renders outside the on-screen frame, so it
// is the place for things that must print (the proposal pages) or float (the
// preview window).

import "./team.css";
import { initials } from "@/lib/proposal/contact";

export function TeamShell({ name, actions, extra, mobileBar, children }: {
  name: string;
  actions?: React.ReactNode;
  extra?: React.ReactNode;
  mobileBar?: React.ReactNode;
  children: React.ReactNode;
}) {
  async function logout() {
    try {
      await fetch("/api/team/logout", { method: "POST" });
    } finally {
      window.location.href = "/team/login";
    }
  }

  return (
    <div className="tm">
      <div className="tm-noprint">
        <header className="tm-bar">
          <div className="tm-bar-l">
            <img className="tm-logo" src="/brand/simman-wordmark.svg" alt="Simplified Management" />
          </div>
          <div className="tm-bar-r">
            {actions}
            <span className="tm-avatar" aria-hidden="true">{initials(name)}</span>
            <span className="tm-user">{name}</span>
            <button type="button" className="tm-link" onClick={logout}>Log out</button>
          </div>
        </header>
        <div className={mobileBar ? "tm-with-mbar" : undefined}>{children}</div>
        {mobileBar}
      </div>
      {extra}
    </div>
  );
}
