"use client";
/* eslint-disable @next/next/no-img-element */

// The proposal maker: form on the left, live A4 preview on the right.
// Download PDF = the browser's own "Save as PDF" (real text, tappable links).
// This tool never sends anything to a prospect. The rep sends the PDF.

import "./builder.css";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ProposalDocument } from "./proposal-document";
import { COPY, MAX_OWNER_ROWS, MAX_PROBLEMS, SITES, TODAY } from "@/lib/proposal/copy";
import { isValidIso, nextMonday, todayIso } from "@/lib/proposal/dates";
import { blankInput, fileName, hubspotNote, isReady, whatsappMessage } from "@/lib/proposal/derive";
import { quote, rupees, totalUnits } from "@/lib/proposal/pricing";
import { SAMPLES } from "@/lib/proposal/samples";
import { type Lead, leadName, prefillFromLead } from "@/lib/proposal/from-hubspot";
import type { Billing, ProposalInput, PropertyRow, Segment } from "@/lib/proposal/types";

type Draft = { input: ProposalInput; lead: Lead | null };

const DRAFT_KEY = "sm-proposal-draft-v2";
const A4_PX = 794;

function loadDraft(): Draft | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw) as Draft;
    if (d?.input?.segment !== "hotel" && d?.input?.segment !== "owner") return null;
    return d;
  } catch {
    return null;
  }
}

function saveDraft(d: Draft | null) {
  try {
    if (d) window.localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    else window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* private mode or blocked storage: the draft just isn't kept */
  }
}

const noop = () => () => {};

export function ProposalBuilder({ user, sample }: { user: string; sample: "hotel" | "owner" | null }) {
  // Render on the client only: dates depend on the rep's own clock and the
  // draft lives in their browser, so the server can't render the same thing.
  const isClient = useSyncExternalStore(noop, () => true, () => false);
  if (!isClient) return <div className="p-10 text-sm text-muted-foreground">Loading the proposal maker…</div>;
  return <Builder user={user} sample={sample} />;
}

function Builder({ user, sample }: { user: string; sample: "hotel" | "owner" | null }) {
  const [draft] = useState<Draft | null>(() => (sample ? null : loadDraft()));
  const [input, setInput] = useState<ProposalInput>(() =>
    sample ? structuredClone(SAMPLES[sample]) : draft?.input ?? blankInput("hotel"));
  const [lead, setLead] = useState<Lead | null>(() => draft?.lead ?? null);
  const [msg, setMsg] = useState<string>("");
  const [scale, setScale] = useState(0.6);
  const [docHeight, setDocHeight] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sample) saveDraft({ input, lead });
  }, [input, lead, sample]);

  // The preview is laid out at full A4 size (exactly like the print) and only
  // scaled visually. CSS zoom would re-wrap text at small sizes and lie about fit.
  useEffect(() => {
    const frame = previewRef.current;
    const doc = docRef.current;
    if (!frame || !doc) return;
    const ro = new ResizeObserver(() => {
      setScale(Math.min(1, Math.max(0.3, (frame.clientWidth - 8) / A4_PX)));
      setDocHeight(doc.offsetHeight);
    });
    ro.observe(frame);
    ro.observe(doc);
    return () => ro.disconnect();
  }, []);

  // Warn the rep if what they typed makes a page too full to print cleanly.
  const [overflow, setOverflow] = useState<{ n: number; fix: string }[]>([]);
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    let live = true;
    const check = () => {
      if (!live) return;
      const pages = Array.from(el.querySelectorAll<HTMLElement>(".pp-page"));
      const bad = pages
        .map((p, i) => ({ n: i + 1, fix: p.dataset.fix || "remove something", over: p.scrollHeight > p.clientHeight + 1 }))
        .filter((p) => p.over)
        .map(({ n, fix }) => ({ n, fix }));
      setOverflow((prev) => (JSON.stringify(prev) === JSON.stringify(bad) ? prev : bad));
    };
    const id = requestAnimationFrame(check);
    document.fonts?.ready.then(check);
    return () => {
      live = false;
      cancelAnimationFrame(id);
    };
  }, [input]);

  const c = COPY[input.segment];
  const q = quote(input);
  const set = <K extends keyof ProposalInput>(k: K, v: ProposalInput[K]) => setInput((p) => ({ ...p, [k]: v }));
  const toggle = (k: "sites" | "today" | "problems", v: string) =>
    setInput((p) => {
      const has = p[k].includes(v);
      if (!has && k === "problems" && p.problems.length >= MAX_PROBLEMS) return p;
      return { ...p, [k]: has ? p[k].filter((x) => x !== v) : [...p[k], v] };
    });
  const setRow = (i: number, patch: Partial<PropertyRow>) =>
    setInput((p) => ({ ...p, properties: p.properties.map((r, j) => (j === i ? { ...r, ...patch } : r)) }));

  function switchSegment(seg: Segment) {
    if (seg === input.segment) return;
    const fresh = blankInput(seg);
    setInput((p) => ({
      ...fresh,
      contactName: p.contactName, business: p.business, sites: p.sites, otherSite: p.otherSite,
      today: p.today, otherSystem: p.otherSystem, quote: p.quote, billing: p.billing,
      startDate: p.startDate, issueDate: p.issueDate, validDays: p.validDays, hubspotDealId: p.hubspotDealId,
      // Keep the count the rep (or HubSpot) already gave.
      properties: [{ ...fresh.properties[0], name: seg === "hotel" ? p.business : "", units: totalUnits(p) }],
    }));
  }

  function applyLead(l: Lead) {
    const { input: next, filled, hints } = prefillFromLead(l, input);
    setInput(next);
    setLead(l);
    setMsg(
      (filled.length ? `Filled in from HubSpot: ${filled.join(", ")}. ` : "Nothing to fill in from HubSpot yet. ") +
      "Check against the call notes, then fill in the rest." + (hints.length ? " " + hints.join(" ") : ""),
    );
  }

  function clearLead() {
    setLead(null);
    set("hubspotDealId", undefined);
  }

  function download() {
    const err = isReady(input);
    if (err) {
      setMsg(err);
      return;
    }
    const prev = document.title;
    document.title = fileName(input);
    const restore = () => {
      document.title = prev;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    setMsg("In the print window, choose “Save as PDF”, then Save. Then send the file on WhatsApp yourself.");
    window.print();
  }

  async function copyMessage() {
    const text = whatsappMessage(input);
    try {
      await navigator.clipboard.writeText(text);
      setMsg("WhatsApp message copied. Paste it in the chat with the PDF.");
    } catch {
      window.prompt("Copy this message:", text);
    }
  }

  async function logOnDeal() {
    const deal = lead?.deal;
    if (!input.hubspotDealId || !deal) return;
    const note = hubspotNote(input);
    const amount = q.monthly * 12;
    const ok = window.confirm(
      `Add this proposal to the HubSpot deal "${deal.dealName}"?\n\n` +
      `Deal amount: ${rupees(amount)} (12 months, before GST)\nNote: ${note}\n\nThis does not message the prospect.`,
    );
    if (!ok) return;
    try {
      const r = await fetch("/api/team/hubspot/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dealId: input.hubspotDealId, amount, note }),
      });
      if (r.status === 401) return goLogin();
      const j = await r.json();
      setMsg(j.ok ? "Logged on the HubSpot deal." : `HubSpot didn't save it: ${j.error || "unknown error"}`);
    } catch {
      setMsg("Couldn't reach HubSpot. Try again in a minute.");
    }
  }

  function startNew() {
    if (!window.confirm("Start a new proposal? This clears the form.")) return;
    setInput(blankInput(input.segment));
    setLead(null);
    setMsg("");
    if (sample) window.history.replaceState(null, "", "/team/proposal");
  }

  function goLogin() {
    window.location.href = "/team/login?next=/team/proposal";
  }

  async function logout() {
    try {
      await fetch("/api/team/logout", { method: "POST" });
    } finally {
      window.location.href = "/team/login";
    }
  }

  const ownerRows = input.properties;
  const problems = c.problems.filter((p) => !(input.segment === "hotel" && input.role === "Owner" && p.id === "h-owner-calls"));

  return (
    <div className="pb-shell flex min-h-dvh flex-col bg-[#f1f5f9] lg:h-dvh lg:flex-row">
      {/* ---------------- form ---------------- */}
      <aside className="pb-noprint flex w-full shrink-0 flex-col border-r border-border bg-white lg:w-[480px]">
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div className="flex flex-col gap-1">
            <img src="/brand/simman-wordmark.svg" alt="Simplified Management" className="h-[18px] w-auto self-start" />
            <span className="text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground">Proposal maker</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-body">
            <span>{user}</span>
            <button type="button" onClick={logout} className="rounded-md border border-border px-2.5 py-1 text-xs font-medium hover:bg-muted">Log out</button>
          </div>
        </div>

        <div className="flex-1 space-y-7 overflow-y-auto px-5 py-6">
          <HubspotSearch lead={lead} onPick={applyLead} onClear={clearLead} onUnauthorized={goLogin} />

          <Section n={2} title="Who is it for?">
            <Segmented
              value={input.segment}
              options={[["hotel", "Hotel"], ["owner", "Property owner"]]}
              onChange={(v) => switchSegment(v as Segment)}
            />
            <Field label="Contact name">
              <TextInput value={input.contactName} onChange={(v) => set("contactName", v)} placeholder="e.g. Anil Deshmukh" />
            </Field>
            {input.segment === "hotel" && (
              <Field label="Their role">
                <Select value={input.role} options={c.roles} onChange={(v) => set("role", v)} />
              </Field>
            )}
            <Field label={input.segment === "hotel" ? "Business name" : "Business name (optional)"}
              hint={input.segment === "owner" ? "Leave empty to use their name on the cover." : undefined}>
              <TextInput value={input.business} onChange={(v) => set("business", v)}
                placeholder={input.segment === "hotel" ? "e.g. Hotel Riverside" : "e.g. Palm Stays"} />
            </Field>
          </Section>

          <Section n={3} title={input.segment === "hotel" ? "Their hotel" : "Their properties"}>
            {input.segment === "hotel" ? (
              <div className="grid grid-cols-2 gap-3">
                <Field label="Hotel name" className="col-span-2">
                  <TextInput value={input.properties[0].name} onChange={(v) => setRow(0, { name: v })} placeholder="e.g. Hotel Riverside" />
                </Field>
                <Field label="City or area">
                  <TextInput value={input.properties[0].area} onChange={(v) => setRow(0, { area: v })} placeholder="e.g. Nashik" />
                </Field>
                <Field label="Type">
                  <Select value={input.properties[0].kind} options={c.kinds} onChange={(v) => setRow(0, { kind: v })} />
                </Field>
                <Field label="Rooms" className="col-span-2" hint="One hotel per proposal. For a second hotel, make a second proposal.">
                  <NumberInput value={input.properties[0].units} min={1} max={2000} onChange={(v) => setRow(0, { units: v })} />
                </Field>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  A listing is one thing a guest can book on its own. A whole villa is 1. A homestay that lets 4 rooms separately is 4.
                </p>
                {ownerRows.map((r, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_76px_28px] items-end gap-2 rounded-lg border border-border p-2.5">
                    <Field label={i === 0 ? "Property" : undefined}>
                      <TextInput value={r.name} onChange={(v) => setRow(i, { name: v })} placeholder="Name" />
                    </Field>
                    <Field label={i === 0 ? "Area" : undefined}>
                      <TextInput value={r.area} onChange={(v) => setRow(i, { area: v })} placeholder="e.g. Baner, Pune" />
                    </Field>
                    <Field label={i === 0 ? "Listings" : undefined}>
                      <NumberInput value={r.units} min={0} max={200} onChange={(v) => setRow(i, { units: v })} />
                    </Field>
                    <button type="button" aria-label="Remove property" disabled={ownerRows.length === 1}
                      onClick={() => set("properties", ownerRows.filter((_, j) => j !== i))}
                      className="mb-1.5 h-7 rounded text-lg leading-none text-muted-foreground hover:text-destructive disabled:opacity-30">×</button>
                    <div className="col-span-4 -mt-0.5">
                      <Select value={r.kind} options={c.kinds} onChange={(v) => setRow(i, { kind: v })} small />
                    </div>
                  </div>
                ))}
                {ownerRows.length < MAX_OWNER_ROWS && (
                  <button type="button" onClick={() => set("properties", [...ownerRows, { name: "", area: "", kind: c.kinds[0], units: 1 }])}
                    className="text-sm font-medium text-primary hover:underline">+ Add a property</button>
                )}
              </div>
            )}
            <div className="rounded-lg bg-accent px-3 py-2 text-sm text-accent-foreground">
              {q.units < 1
                ? <span className="text-amber-800">Add the number of {input.segment === "hotel" ? "rooms" : "listings"} to work out the price.</span>
                : <>Price: <b>{rupees(q.monthly)} a month</b> + GST, or {rupees(q.yearly)} a year + GST</>}
            </div>
          </Section>

          <Section n={4} title="How they work today">
            <Field label="Where their bookings come from">
              <Chips options={SITES} selected={input.sites} onToggle={(v) => toggle("sites", v)} />
              <TextInput value={input.otherSite} onChange={(v) => set("otherSite", v)} placeholder="Another site (optional)" />
            </Field>
            <Field label="How they run it today">
              <Chips options={TODAY} selected={input.today} onToggle={(v) => toggle("today", v)} />
              {input.today.includes("Another software") && (
                <TextInput value={input.otherSystem} onChange={(v) => set("otherSystem", v)} placeholder="Which software?" />
              )}
            </Field>
            <Field label="Their team">
              <div className="grid grid-cols-2 gap-2">
                {c.teamRoles.map((r) => (
                  <label key={r.id} className="flex items-center justify-between gap-2 rounded-md border border-border px-2.5 py-1.5 text-sm">
                    <span className="capitalize">{r.many}</span>
                    <NumberInput value={input.team[r.id] || 0} min={0} max={500} small
                      onChange={(v) => set("team", { ...input.team, [r.id]: v })} />
                  </label>
                ))}
              </div>
            </Field>
          </Section>

          <Section n={5} title="What they told you">
            <Field label={`Problems they mentioned (pick up to ${MAX_PROBLEMS})`}
              hint="Each one prints with its fix, word for word from the deck.">
              <div className="space-y-1.5">
                {problems.map((p) => {
                  const on = input.problems.includes(p.id);
                  const full = !on && input.problems.length >= MAX_PROBLEMS;
                  return (
                    <label key={p.id} className={`flex cursor-pointer items-start gap-2.5 rounded-md border px-2.5 py-2 text-sm ${on ? "border-primary bg-accent" : "border-border"} ${full ? "opacity-45" : ""}`}>
                      <input type="checkbox" className="mt-0.5 accent-[#2563eb]" checked={on} disabled={full} onChange={() => toggle("problems", p.id)} />
                      <span>{p.said}</span>
                    </label>
                  );
                })}
              </div>
            </Field>
            <Field label="In their words (optional)" hint="One sentence they said on the call. It prints as a quote.">
              <textarea value={input.quote} maxLength={160} rows={2} onChange={(e) => set("quote", e.target.value)}
                className="w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/40"
                placeholder="e.g. Every turnover is a phone call from me." />
            </Field>
          </Section>

          <Section n={6} title="Price and dates">
            <Field label="Show the price as">
              <Segmented value={input.billing}
                options={[["both", "Monthly + yearly"], ["monthly", "Monthly"], ["yearly", "Yearly"]]}
                onChange={(v) => set("billing", v as Billing)} />
            </Field>
            <label className="flex cursor-pointer items-start gap-2.5 rounded-md border border-border px-2.5 py-2 text-sm">
              <input type="checkbox" className="mt-0.5 accent-[#2563eb]" checked={input.zeroInvoices !== false}
                onChange={(e) => set("zeroInvoices", e.target.checked)} />
              <span>
                Show the first two invoices at ₹0 (free plan)
                <span className="block text-xs text-muted-foreground">Off: shows the free months and the first bill date instead.</span>
              </span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Week 1 starts">
                <DateInput value={input.startDate} onChange={(v) => set("startDate", v)} fallback={nextMonday(todayIso())} />
              </Field>
              <Field label="Valid for (days)">
                <NumberInput value={input.validDays} min={1} max={90} onChange={(v) => set("validDays", v)} />
              </Field>
              <Field label="Proposal date" className="col-span-2">
                <DateInput value={input.issueDate} onChange={(v) => set("issueDate", v)} fallback={todayIso()} />
              </Field>
            </div>
          </Section>
        </div>

        {/* actions */}
        <div className="space-y-2.5 border-t border-border bg-white px-5 py-4">
          {overflow.map((o) => (
            <p key={o.n} className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800" role="alert">
              Page {o.n} is too full to print cleanly: {o.fix}.
            </p>
          ))}
          {msg && <p className="rounded-md bg-muted px-3 py-2 text-sm text-body" role="status">{msg}</p>}
          <button type="button" onClick={download}
            className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-base font-semibold text-white hover:bg-[#1d4ed8]">
            Download PDF
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={copyMessage} className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted">Copy WhatsApp message</button>
            <button type="button" onClick={startNew} className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted">Start a new proposal</button>
          </div>
          {lead?.deal && (
            <button type="button" onClick={logOnDeal} className="w-full rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted">
              Log this proposal on the HubSpot deal
            </button>
          )}
          <p className="text-xs text-muted-foreground">File name: {fileName(input)}.pdf</p>
        </div>
      </aside>

      {/* ---------------- live preview ---------------- */}
      <main className="pb-preview flex-1 overflow-y-auto px-4 py-6 lg:px-8">
        <div ref={previewRef} className="mx-auto w-full max-w-[810px]">
          <div className="pb-noprint mb-4 flex items-center justify-between text-sm text-body">
            <span>Preview · what the prospect gets</span>
            <span className="text-muted-foreground">A4, {input.problems.length ? 7 : 6} pages</span>
          </div>
          <div className="pb-frame mx-auto overflow-hidden" style={{ width: A4_PX * scale, height: docHeight * scale }}>
            <div ref={docRef} className="pb-scale" style={{ width: A4_PX, transform: `scale(${scale})`, transformOrigin: "top left" }}>
              <ProposalDocument input={input} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------------- HubSpot search ---------------- */

const fmtWhen = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
};

function HubspotSearch({ lead, onPick, onClear, onUnauthorized }: {
  lead: Lead | null; onPick: (l: Lead) => void; onClear: () => void; onUnauthorized: () => void;
}) {
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<Lead[] | null>(null);
  const [err, setErr] = useState("");

  async function run(e?: React.FormEvent) {
    e?.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const r = await fetch("/api/team/hubspot/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: q.trim() }),
      });
      if (r.status === 401) return onUnauthorized();
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || "search failed");
      setResults(j.leads as Lead[]);
    } catch {
      setErr("Couldn't reach HubSpot. You can still type everything in by hand.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section n={1} title="Find them in HubSpot" optional>
      {lead ? (
        <div className="space-y-2.5 rounded-lg border border-primary/40 bg-accent/60 p-3 text-sm">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-semibold text-foreground">{leadName(lead)}</div>
              <div className="text-body">
                {[lead.contact?.phone, lead.contact?.email, lead.contact?.company].filter(Boolean).join(" · ") || "No contact details"}
              </div>
              {lead.deal && <div className="text-xs text-muted-foreground">Deal: {lead.deal.dealName}</div>}
            </div>
            <button type="button" onClick={onClear} className="shrink-0 text-xs font-medium text-primary hover:underline">Change</button>
          </div>
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Call notes from HubSpot{lead.notes.length ? ` (${lead.notes.length})` : ""}
            </div>
            {lead.notes.length === 0 ? (
              <p className="text-xs text-muted-foreground">No call notes logged yet.</p>
            ) : (
              <ul className="max-h-56 space-y-2 overflow-y-auto pr-1">
                {lead.notes.map((n) => (
                  <li key={n.id} className="rounded-md bg-white px-2.5 py-2 text-[13px] leading-snug text-foreground">
                    <div className="mb-0.5 text-[11px] text-muted-foreground">{fmtWhen(n.at)}{n.kind !== "note" ? ` · ${n.kind}` : ""}</div>
                    <div className="whitespace-pre-wrap">{n.text}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {lead.deal?.description && (
            <details className="text-xs text-body">
              <summary className="cursor-pointer font-medium">What they sent on the website</summary>
              <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap font-sans">{lead.deal.description}</pre>
            </details>
          )}
        </div>
      ) : (
        <>
          <form onSubmit={run} className="flex gap-2">
            <TextInput value={q} onChange={setQ} placeholder="Name, phone, email or business" />
            <button type="submit" disabled={busy} className="shrink-0 rounded-md bg-foreground px-3 text-sm font-medium text-white disabled:opacity-60">
              {busy ? "…" : q.trim() ? "Search" : "Latest calls"}
            </button>
          </form>
          {err && <p className="text-sm text-destructive">{err}</p>}
          {results && (
            results.length === 0 ? <p className="text-sm text-muted-foreground">Nobody found. Type their details below.</p> : (
              <ul className="max-h-80 space-y-1.5 overflow-y-auto">
                {results.map((l) => (
                  <li key={l.key}>
                    <button type="button" onClick={() => onPick(l)}
                      className="w-full rounded-md border border-border px-3 py-2 text-left text-sm hover:border-primary hover:bg-accent">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-medium text-foreground">{leadName(l)}</span>
                        <span className="shrink-0 text-[11px] text-muted-foreground">{fmtWhen(l.lastActivity)}</span>
                      </div>
                      <div className="line-clamp-2 text-xs text-muted-foreground">
                        {l.notes[0]?.text || (l.deal ? "Website demo request" : "No call notes yet")}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )
          )}
          <p className="text-xs text-muted-foreground">Not in HubSpot? Skip this and type their details below.</p>
        </>
      )}
    </Section>
  );
}

/* ---------------- small form parts ---------------- */

function Section({ n, title, optional, children }: { n: number; title: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="flex items-center gap-2 font-[family-name:var(--font-jakarta)] text-[15px] font-bold text-foreground">
        <span className="flex size-6 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">{n}</span>
        {title}
        {optional && <span className="text-xs font-normal text-muted-foreground">optional</span>}
      </h2>
      {children}
    </section>
  );
}

function Field({ label, hint, className = "", children }: { label?: string; hint?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <span className="text-[13px] font-medium text-foreground">{label}</span>}
      {children}
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none focus:border-ring focus:ring-[3px] focus:ring-ring/40";

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={inputCls} />;
}

function NumberInput({ value, onChange, min, max, small }: {
  value: number; onChange: (v: number) => void; min: number; max: number; small?: boolean;
}) {
  return (
    <input
      type="number" inputMode="numeric" min={min} max={max} value={Number.isFinite(value) ? value : ""}
      onChange={(e) => {
        const v = e.target.value === "" ? 0 : Math.floor(Number(e.target.value));
        onChange(Number.isFinite(v) ? Math.min(max, Math.max(0, v)) : 0);
      }}
      className={small ? "w-16 rounded border border-input bg-white px-2 py-1 text-right text-sm outline-none focus:border-ring" : inputCls}
    />
  );
}

function DateInput({ value, onChange, fallback }: { value: string; onChange: (v: string) => void; fallback: string }) {
  return (
    <input type="date" value={value} onChange={(e) => onChange(isValidIso(e.target.value) ? e.target.value : fallback)} className={inputCls} />
  );
}

function Select({ value, options, onChange, small }: { value: string; options: string[]; onChange: (v: string) => void; small?: boolean }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className={small ? "w-full rounded border border-input bg-white px-2 py-1 text-xs text-body" : inputCls}>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function Segmented({ value, options, onChange }: { value: string; options: [string, string][]; onChange: (v: string) => void }) {
  return (
    <div className="flex rounded-lg border border-border bg-muted p-1">
      {options.map(([v, label]) => (
        <button key={v} type="button" onClick={() => onChange(v)}
          className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${value === v ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
          {label}
        </button>
      ))}
    </div>
  );
}

function Chips({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const on = selected.includes(o);
        return (
          <button key={o} type="button" onClick={() => onToggle(o)} aria-pressed={on}
            className={`rounded-full border px-3 py-1 text-sm ${on ? "border-primary bg-primary text-white" : "border-border bg-white text-body hover:border-primary/50"}`}>
            {o}
          </button>
        );
      })}
    </div>
  );
}
