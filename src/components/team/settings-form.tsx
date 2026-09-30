"use client";

// Settings: the rep's own details, printed on the last page of every proposal
// they make. Saved with their login (see src/lib/team-profile.ts).

import { useState } from "react";
import { TeamShell } from "./team-shell";
import { ContactBlock } from "@/components/proposal/proposal-document";
import { COMPANY_CONTACT, type Contact, checkContact } from "@/lib/proposal/contact";

type Note = { text: string; tone: "ok" | "warn" };

export function SettingsForm({ account, initial, isDefault: initialDefault, canSave }: {
  account: string; initial: Contact; isDefault: boolean; canSave: boolean;
}) {
  const [form, setForm] = useState<Contact>(initial);
  const [isDefault, setIsDefault] = useState(initialDefault);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<Note | null>(null);
  const [badField, setBadField] = useState<keyof Contact | null>(null);

  const set = <K extends keyof Contact>(k: K, v: Contact[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setBadField(null);
    setNote(null);
  };

  // What prints, live: tidy numbers where they are valid, as typed where not yet.
  const checked = checkContact(form);
  const shown: Contact = checked.ok ? checked.contact : { ...form, name: form.name || "Your name" };

  async function save() {
    const c = checkContact(form);
    if (!c.ok) {
      setBadField(c.field);
      return setNote({ text: c.error, tone: "warn" });
    }
    setBusy(true);
    try {
      const res = await fetch("/api/team/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(c.contact),
      });
      if (res.status === 401) return void (window.location.href = "/team/login?next=/team/settings");
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) return setNote({ text: json?.error || "Couldn't save. Try again.", tone: "warn" });
      setForm(json.contact);
      setIsDefault(false);
      setNote({ text: "Saved. Your next proposal uses these details.", tone: "ok" });
    } catch {
      setNote({ text: "Couldn't reach the site. Try again in a minute.", tone: "warn" });
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    if (!window.confirm("Go back to the company details (Tipusultan)?")) return;
    setBusy(true);
    try {
      const res = await fetch("/api/team/profile", { method: "DELETE" });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) return setNote({ text: json?.error || "Couldn't reset. Try again.", tone: "warn" });
      setForm(COMPANY_CONTACT);
      setIsDefault(true);
      setNote({ text: "Back to the company details.", tone: "ok" });
    } catch {
      setNote({ text: "Couldn't reach the site. Try again in a minute.", tone: "warn" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <TeamShell name={account} active="settings">
      <div className="tm-set">
        <section className="tm-card">
          <h1>Your details on proposals</h1>
          <p className="tm-hint" style={{ margin: "0 0 20px" }}>
            These print on the last page of every proposal you make, so prospects know who to call.
            {isDefault && " Until you save your own, proposals show the company details."}
          </p>

          <div className="tm-grid2">
            <div>
              <label className="tm-label" htmlFor="s-name">Name</label>
              <input id="s-name" className={`tm-input ${badField === "name" ? "bad" : ""}`} value={form.name} autoComplete="name"
                onChange={(e) => set("name", e.target.value)} />
            </div>
            <div>
              <label className="tm-label" htmlFor="s-role">Title</label>
              <input id="s-role" className={`tm-input ${badField === "role" ? "bad" : ""}`} value={form.role} placeholder="Relationship Manager"
                onChange={(e) => set("role", e.target.value)} />
            </div>
            <div>
              <label className="tm-label" htmlFor="s-phone">Phone for calls</label>
              <input id="s-phone" className={`tm-input ${badField === "phone" ? "bad" : ""}`} value={form.phone} inputMode="tel" autoComplete="tel"
                placeholder="+91 98240 04043" onChange={(e) => set("phone", e.target.value)} />
            </div>
            <div>
              <label className="tm-label" htmlFor="s-email">Email</label>
              <input id="s-email" className={`tm-input ${badField === "email" ? "bad" : ""}`} value={form.email} inputMode="email" autoComplete="email"
                placeholder="name@simplifiedmanagement.in" onChange={(e) => set("email", e.target.value)} />
            </div>
          </div>

          <label className="tm-check" style={{ marginTop: 16 }}>
            <input type="checkbox" checked={form.sameWhatsapp} onChange={(e) => set("sameWhatsapp", e.target.checked)} />
            WhatsApp is on the same number
          </label>
          {!form.sameWhatsapp && (
            <div style={{ marginTop: 12, maxWidth: 320 }}>
              <label className="tm-label" htmlFor="s-wa">WhatsApp number</label>
              <input id="s-wa" className={`tm-input ${badField === "whatsapp" ? "bad" : ""}`} value={form.whatsapp} inputMode="tel"
                placeholder="+91 98240 04043" onChange={(e) => set("whatsapp", e.target.value)} />
            </div>
          )}

          {!canSave && (
            <p className="tm-note warn">Saving isn&apos;t switched on yet, so changes can&apos;t be kept. Proposals use the company details for now. Ask Shaun to switch it on.</p>
          )}
          {note && <p className={`tm-note ${note.tone}`} role="status">{note.text}</p>}

          <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
            <button type="button" className="tm-btn primary" onClick={save} disabled={busy || !canSave}>{busy ? "Saving…" : "Save"}</button>
            <button type="button" className="tm-btn" onClick={reset} disabled={busy || !canSave || isDefault}>Reset to company details</button>
          </div>
        </section>

        <div>
          <span className="tm-eyebrow">How it prints (last page)</span>
          <div className="pp-doc tm-cprev" style={{ marginTop: 10 }}>
            <ContactBlock contact={shown} />
          </div>
        </div>
      </div>
    </TeamShell>
  );
}
