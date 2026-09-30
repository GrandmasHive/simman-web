"use client";

// The proposal maker: three short steps on the left, a live price estimate on
// the right. Download PDF = the browser's own "Save as PDF" (real text, tappable
// links). This tool never sends anything to a prospect: the rep sends the PDF.

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ProposalDocument } from "./proposal-document";
import { TeamShell } from "@/components/team/team-shell";
import { type Contact, initials } from "@/lib/proposal/contact";
import { COPY } from "@/lib/proposal/copy";
import { fmtDate, fmtDayMonth, fmtShort, schedule, todayIso } from "@/lib/proposal/dates";
import { PAGES, blankInput, displayBusiness, fileName, isReady, unitsLabel, whatsappMessage } from "@/lib/proposal/derive";
import { quote, rupees } from "@/lib/proposal/pricing";
import { SAMPLES } from "@/lib/proposal/samples";
import type { ProposalInput, Segment, Validity } from "@/lib/proposal/types";

const DRAFT_KEY = "sm-proposal-draft-v5";
const A4_PX = 794;
const MAX_COUNT = { hotel: 2000, owner: 500 };

function loadDraft(): ProposalInput | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw) as ProposalInput;
    if ((d?.segment !== "hotel" && d?.segment !== "owner") || typeof d.count !== "number") return null;
    return d;
  } catch {
    return null;
  }
}

function saveDraft(d: ProposalInput) {
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
  } catch {
    /* private mode or blocked storage: the draft just isn't kept */
  }
}

const noop = () => () => {};

export function ProposalBuilder(props: {
  name: string;
  contact: Contact;
  isDefaultContact: boolean;
  sample: "hotel" | "owner" | null;
}) {
  // Client only: dates depend on the rep's own clock and the draft lives in their browser.
  const isClient = useSyncExternalStore(noop, () => true, () => false);
  if (!isClient) return <div className="tm"><p style={{ padding: 40, color: "#64748b" }}>Loading the proposal maker…</p></div>;
  return <Builder {...props} />;
}

type Note = { text: string; tone: "info" | "warn" | "ok" };

function Builder({ name, contact, isDefaultContact, sample }: {
  name: string; contact: Contact; isDefaultContact: boolean; sample: "hotel" | "owner" | null;
}) {
  const [input, setInput] = useState<ProposalInput>(() =>
    // A proposal is always dated today, so a draft or example never shows an expired offer.
    ({ ...(sample ? structuredClone(SAMPLES[sample]) : loadDraft() ?? blankInput("hotel")), issueDate: todayIso() }));
  const [note, setNote] = useState<Note | null>(null);
  const [preview, setPreview] = useState(false);
  const [overflow, setOverflow] = useState<{ n: number; fix: string }[]>([]);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sample) saveDraft(input);
  }, [input, sample]);

  // Warn the rep if what they typed makes a page too full to print cleanly.
  // The document is laid out at full A4 size off-screen, so this check is exact.
  useEffect(() => {
    const el = printRef.current;
    if (!el) return;
    let live = true;
    const check = () => {
      if (!live) return;
      const bad = Array.from(el.querySelectorAll<HTMLElement>(".pp-page"))
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
  }, [input, contact]);

  const c = COPY[input.segment];
  const hotel = input.segment === "hotel";
  const q = quote(input);
  const s = schedule(input.issueDate, input.validFor);
  const who = input.contactName.trim() || input.business.trim();
  const noun = hotel ? "rooms" : "listings";

  const set = <K extends keyof ProposalInput>(k: K, v: ProposalInput[K]) => setInput((p) => ({ ...p, [k]: v }));
  const setCount = (n: number) => set("count", Math.min(MAX_COUNT[input.segment], Math.max(0, Math.floor(n) || 0)));

  function switchSegment(seg: Segment) {
    if (seg === input.segment) return;
    // Only the type changes; keep everything the rep typed.
    setInput((p) => ({ ...p, segment: seg, count: Math.min(MAX_COUNT[seg], p.count) }));
    setNote(null);
  }

  function download() {
    const err = isReady(input);
    if (err) return setNote({ text: err, tone: "warn" });
    if (overflow.length) {
      return setNote({ text: `Page ${overflow[0].n} is too full to print: ${overflow[0].fix}.`, tone: "warn" });
    }
    const prev = document.title;
    document.title = fileName(input);
    const restore = () => {
      document.title = prev;
      window.removeEventListener("afterprint", restore);
    };
    window.addEventListener("afterprint", restore);
    setNote({ text: "In the window that opens, choose “Save as PDF”, then save. Send the file on WhatsApp yourself.", tone: "info" });
    window.print();
  }

  async function copyMessage() {
    const err = isReady(input);
    if (err) return setNote({ text: err, tone: "warn" });
    const text = whatsappMessage(input, contact);
    try {
      await navigator.clipboard.writeText(text);
      setNote({ text: "WhatsApp message copied. Paste it in the chat with the PDF.", tone: "ok" });
    } catch {
      window.prompt("Copy this message:", text);
    }
  }

  function startNew() {
    if (!window.confirm("Start a new proposal? This clears the form.")) return;
    setInput(blankInput(input.segment));
    setNote(null);
    if (sample) window.history.replaceState(null, "", "/team/proposal");
  }

  function openPreview() {
    const err = isReady(input);
    if (err) return setNote({ text: err, tone: "warn" });
    setPreview(true);
  }

  const estimate = (
    <aside className="tm-card tm-est" aria-label="Price estimate">
      <span className="tm-eyebrow">Estimate</span>
      <div className="tm-est-name">{who || "New proposal"}</div>
      <div className="tm-hint">
        {[c.label, q.units > 0 ? unitsLabel(input.segment, q.units) : "", input.area.trim()].filter(Boolean).join(" · ")}
      </div>

      {q.units < 1 ? (
        <p className="tm-big-empty" style={{ marginTop: 18 }}>Add the number of {noun} to work out the price.</p>
      ) : (
        <>
          <div style={{ marginTop: 18 }}>
            <span className="tm-big">{rupees(q.monthly)}</span>{" "}
            <span style={{ fontSize: 15, color: "var(--body)" }}>a month + GST</span>
          </div>
          <div className="tm-hint" style={{ marginTop: 4 }}>
            {q.lines.map((l, i) => (hotel && i === 0 ? `${l.label} ${rupees(l.amount)}` : l.label)).join(" + ")}
          </div>
          <div className="tm-tiles">
            <div className="tm-tile"><div className="tm-hint">Monthly, with GST</div><div className="v">{rupees(q.monthlyTotal)}</div></div>
            <div className="tm-tile">
              <div className="tm-hint">Yearly, with GST <span className="tm-badge">15% off</span></div>
              <div className="v">{rupees(q.yearlyTotal)}</div>
            </div>
          </div>
          <div className="tm-inv">
            <div><span className="k">{fmtShort(s.invoices[0])} · Month 1</span><span className="free">₹0</span></div>
            <div><span className="k">{fmtShort(s.invoices[1])} · Month 2</span><span className="free">₹0</span></div>
            <div><span className="k">{fmtShort(s.invoices[2])} onwards</span><b>{rupees(q.monthly)} + GST</b></div>
            <div><span className="k">Starts</span><span>{fmtDayMonth(s.start)}</span></div>
          </div>
        </>
      )}

      <div className="tm-who">
        <span className="tm-avatar" aria-hidden="true">{initials(contact.name)}</span>
        <div>
          On the PDF: <b>{contact.name}</b> · {contact.phone}
          {isDefaultContact && <> (company details)</>}
          <br /><Link href="/team/settings" className="tm-link-b">Change in Settings</Link>
        </div>
      </div>

      {overflow.map((o) => (
        <p key={o.n} className="tm-note warn" role="alert">Page {o.n} is too full to print: {o.fix}.</p>
      ))}
      {note && <p className={`tm-note ${note.tone === "info" ? "" : note.tone}`} role="status">{note.text}</p>}

      <div style={{ marginTop: 16 }}>
        <span className="tm-label">Offer open for</span>
        <div className="tm-seg" role="group" aria-label="Offer open for">
          {([["week", "1 week"], ["month", "1 month"]] as [Validity, string][]).map(([v, label]) => (
            <button key={v} type="button" aria-pressed={input.validFor === v} onClick={() => set("validFor", v)}>{label}</button>
          ))}
        </div>
        <div className="tm-hint" style={{ marginTop: 6 }}>Until {fmtDate(s.validUntil)}</div>
      </div>
      <div style={{ marginTop: 14 }}>
        <button type="button" className="tm-btn primary lg" onClick={download}>Download proposal PDF</button>
      </div>
      <div className="tm-actions">
        <button type="button" className="tm-btn" onClick={openPreview}>Preview PDF</button>
        <button type="button" className="tm-btn" onClick={copyMessage}>Copy WhatsApp text</button>
      </div>
      <div className="tm-foot">{PAGES} pages · {fileName(input)}.pdf</div>
    </aside>
  );

  return (
    <TeamShell
      name={name}
      active="proposals"
      actions={<button type="button" className="tm-btn tm-nav-hide" onClick={startNew}>+ New proposal</button>}
      mobileBar={
        <div className="tm-mbar">
          <div>
            <div className="p">
              {q.units < 1 ? "Add " + noun : <>{rupees(q.monthly)}<small> /month + GST</small></>}
            </div>
            {q.units > 0 && <div className="tm-hint">₹0 for the first two months</div>}
          </div>
          <button type="button" className="tm-btn primary" onClick={download}>Download</button>
        </div>
      }
      extra={
        <>
          <div className="tm-print" ref={printRef} aria-hidden="true">
            <ProposalDocument input={input} contact={contact} />
          </div>
          {preview && <PreviewWindow input={input} contact={contact} onClose={() => setPreview(false)} onDownload={download} />}
        </>
      }
    >
      <div className="tm-main">
        <div className="tm-steps">
          {/* 1. Who */}
          <section className="tm-card">
            <div className="tm-step-h"><span className="tm-num">1</span><h2>Who is it for</h2></div>
            <div className="tm-grid2">
              <div>
                <label className="tm-label" htmlFor="f-name">Contact name</label>
                <input id="f-name" className="tm-input" value={input.contactName} placeholder="Anil Deshmukh" autoComplete="off"
                  onChange={(e) => set("contactName", e.target.value)} />
              </div>
              <div>
                <label className="tm-label" htmlFor="f-biz">Business name <span className="tm-hint">(optional)</span></label>
                <input id="f-biz" className="tm-input" value={input.business} placeholder={hotel ? "Hotel Riverside" : "Palm Stays"} autoComplete="off"
                  onChange={(e) => set("business", e.target.value)} />
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <label className="tm-label" htmlFor="f-area">City or area <span className="tm-hint">(optional)</span></label>
              <input id="f-area" className="tm-input" value={input.area} placeholder={hotel ? "Nashik" : "Alibaug and Pune"} autoComplete="off"
                onChange={(e) => set("area", e.target.value)} />
            </div>
          </section>

          {/* 2. Need */}
          <section className="tm-card">
            <div className="tm-step-h"><span className="tm-num">2</span><h2>What they need</h2></div>
            <div className="tm-seg" role="group" aria-label="Type of customer">
              <button type="button" aria-pressed={hotel} onClick={() => switchSegment("hotel")}>Hotel</button>
              <button type="button" aria-pressed={!hotel} onClick={() => switchSegment("owner")}>Home owner</button>
            </div>
            <div className="tm-need">
              <div>
                <label className="tm-label" htmlFor="f-count">{hotel ? "Rooms" : "Listings"}</label>
                <div className="tm-counter">
                  <button type="button" className="tm-cbtn" aria-label={`Fewer ${noun}`} onClick={() => setCount(input.count - 1)}>−</button>
                  <input id="f-count" className="tm-cval" inputMode="numeric" placeholder="0" value={input.count || ""}
                    onChange={(e) => setCount(parseInt(e.target.value.replace(/\D/g, ""), 10))} />
                  <button type="button" className="tm-cbtn" aria-label={`More ${noun}`} onClick={() => setCount(input.count + 1)}>+</button>
                </div>
              </div>
              <p className="tm-hint" style={{ maxWidth: 320 }}>
                {hotel
                  ? "One hotel per proposal. For a second hotel, make a second proposal."
                  : "A listing is one thing a guest can book on its own: a room, a villa or a flat. A homestay that lets 4 rooms separately is 4."}
              </p>
            </div>
          </section>


        </div>

        {estimate}
      </div>
    </TeamShell>
  );
}

/** The proposal pages in a window, scaled to fit. Opened from "Preview PDF". */
function PreviewWindow({ input, contact, onClose, onDownload }: {
  input: ProposalInput; contact: Contact; onClose: () => void; onDownload: () => void;
}) {
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0);
  const docRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerWidth - 24) / A4_PX));
    fit();
    window.addEventListener("resize", fit);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", fit);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  useEffect(() => {
    const el = docRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="tm-modal tm-noprint" role="dialog" aria-modal="true" aria-label="Proposal preview">
      <div className="tm-modal-bar">
        <b style={{ fontSize: 15 }}>{displayBusiness(input)} · {PAGES} pages</b>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" className="tm-btn primary sm" onClick={() => { onClose(); setTimeout(onDownload, 50); }}>Download PDF</button>
          <button type="button" className="tm-btn sm" onClick={onClose}>Close</button>
        </div>
      </div>
      <div className="tm-modal-body">
        <div className="tm-frame" style={{ width: A4_PX * scale, height: height * scale }}>
          <div ref={docRef} style={{ width: A4_PX, transform: `scale(${scale})`, transformOrigin: "top left" }}>
            <ProposalDocument input={input} contact={contact} />
          </div>
        </div>
      </div>
    </div>
  );
}
