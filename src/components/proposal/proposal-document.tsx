/* eslint-disable @next/next/no-img-element */
// The printable proposal: 5 A4 portrait pages, the final offer.
// Cover, your price, your start (with dates and invoices), everything
// included, next step.

import "./proposal.css";
import { COPY } from "@/lib/proposal/copy";
import {
  type Contact, SITE, WA_PROPOSAL_TEXT, callDigits, whatsappDigits,
} from "@/lib/proposal/contact";
import { fmtDate, fmtDayMonth, fmtRange, schedule } from "@/lib/proposal/dates";
import { PAGES, displayBusiness, unitsLabel } from "@/lib/proposal/derive";
import { OWNER_BULK_FROM, OWNER_BULK_RATE, quote, rupees } from "@/lib/proposal/pricing";
import type { ProposalInput } from "@/lib/proposal/types";
import { LineArt } from "./line-art";

const LOGO = "/brand/simman-wordmark.svg";

function Tick({ size = 22 }: { size?: number }) {
  return (
    <svg className="pp-tick" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#2563eb"
      strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Page({ eyebrow, n, total, foot, children, end, fix, className = "" }: {
  eyebrow: string; n: number; total: number; foot: string; children: React.ReactNode;
  /** What the rep can remove if this page overflows (shown by the maker). */
  fix?: string;
  /** Replaces the standard footer (the last page signs off instead). */
  end?: React.ReactNode; className?: string;
}) {
  return (
    <section className={`pp-page ${className}`} data-fix={fix}>
      <div className="pp-head">
        <span className="pp-eyebrow">{eyebrow}</span>
        <img className="pp-logo" src={LOGO} alt="Simplified Management" />
      </div>
      {children}
      {end ?? (
        <div className="pp-foot">
          <span>{foot}</span>
          <span>{n} / {total}</span>
        </div>
      )}
    </section>
  );
}

/** The "Call or WhatsApp" box on the last page. */
export function ContactBlock({ contact }: { contact: Contact }) {
  return (
    <div className="pp-contact">
      <div>
        <span className="pp-label">Call or WhatsApp</span>
        <a className="pp-phone" href={`tel:+${callDigits(contact)}`}>{contact.phone}</a>
        <div className="pp-person">{[contact.name, contact.role].filter(Boolean).join(", ")}</div>
      </div>
      <div className="pp-rule" />
      <div className="pp-rows">
        <div className="pp-row"><span>Email</span><a href={`mailto:${contact.email}`}>{contact.email}</a></div>
        <div className="pp-row"><span>See the demo again</span><a href={SITE.demoUrl}>{SITE.demo}</a></div>
      </div>
      <a className="pp-wa" href={`https://wa.me/${whatsappDigits(contact)}?text=${WA_PROPOSAL_TEXT}`}>Message us on WhatsApp</a>
    </div>
  );
}

export function ProposalDocument({ input, contact }: { input: ProposalInput; contact: Contact }) {
  const c = COPY[input.segment];
  const q = quote(input);
  const s = schedule(input.issueDate, input.validFor);
  const hotel = input.segment === "hotel";
  const business = displayBusiness(input);
  const units = unitsLabel(input.segment, q.units);
  const where = input.area.trim();
  const showMonthly = true;
  const showYearly = true;
  const zeroInvoices = true;
  const total = PAGES;
  const foot = `Proposal for ${business} · ${fmtDate(s.issued)}`;
  let n = 1;
  // No "Prepared for" line when the cover title already is their name.
  const prepared = input.contactName.trim() && input.business.trim()
    ? <>Prepared for <b>{input.contactName.trim()}</b></>
    : null;

  return (
    <div className="pp-doc">
      {/* 1. Cover */}
      <section className="pp-page pp-cover" data-fix="use a shorter business name">
        <div className="pp-glow" />
        <img className="pp-cover-logo" src={LOGO} alt="Simplified Management" />
        <span className="pp-kicker">Proposal · {c.kicker}</span>
        <h1 className={`pp-h1 ${business.length > 30 ? "pp-xlong" : business.length > 18 ? "pp-long" : ""}`}>A proposal for <em>{business}</em></h1>
        {prepared && <p className="pp-for">{prepared}</p>}
        <div className="pp-setup">
          <div className="pp-setup-top">
            <span className="pp-setup-n">{units}</span>
            {where && <span className="pp-setup-where">{where}</span>}
          </div>
          {q.units > 0 && (
            <div className="pp-setup-price">
              <div><span className="pp-setup-amt">{rupees(q.monthly)}</span> a month + GST</div>
              <div className="pp-setup-note">or {rupees(q.yearly)} a year + GST. Your first two invoices are ₹0.</div>
            </div>
          )}
        </div>
        <div className="pp-cover-mid">
          <p className="pp-promise">{c.promise}</p>
          <LineArt kind={input.segment} width={330} />
        </div>
        <div className="pp-cover-foot">
          <span className="pp-sign">Keep it simple.</span>
          <div className="pp-meta">
            <span><b>{fmtDate(s.issued)}</b> · valid until {fmtDate(s.validUntil)}</span>
            <span>Prepared by {[contact.name, contact.role].filter(Boolean).join(", ")}</span>
          </div>
        </div>
      </section>

      {/* 4. Your price */}
      <Page eyebrow="Your price" n={++n} total={total} foot={foot}>
        <h2 className="pp-h2">Your price, worked out.</h2>
        <p className="pp-sub">{c.priceWho}</p>
        <div className="pp-calc">
          {q.lines.map((l) => (
            <div className="pp-calc-row" key={l.label}>
              <span>{l.label}</span><span className="pp-leader" /><span>{rupees(l.amount)}</span>
            </div>
          ))}
          {!hotel && q.units >= OWNER_BULK_FROM && (
            <span className="pp-calc-note">With {OWNER_BULK_FROM} or more listings, every listing is {rupees(OWNER_BULK_RATE)} a month.</span>
          )}
          <div className="pp-calc-total">
            <span>Your monthly price</span>
            <span>{rupees(q.monthly)}<small>+ GST</small></span>
          </div>
        </div>
        <div className={`pp-options ${showMonthly && showYearly ? "pp-two" : ""}`}>
          {showMonthly && (
            <div className="pp-option">
              <div className="pp-option-head"><span className="pp-option-title">Pay monthly</span></div>
              <span className="pp-option-line">{rupees(q.monthly)} + GST 18% {rupees(q.monthlyGst)}</span>
              <div className="pp-option-total"><span>{rupees(q.monthlyTotal)}</span><span>a month</span></div>
              <span className="pp-option-foot">Total with GST added.</span>
            </div>
          )}
          {showYearly && (
            <div className="pp-option">
              <div className="pp-option-head">
                <span className="pp-option-title">Pay yearly</span>
                <span className="pp-badge">Save 15%</span>
              </div>
              <span className="pp-option-line">{rupees(q.yearFull)} less 15% = {rupees(q.yearly)}<br />+ GST 18% {rupees(q.yearlyGst)}</span>
              <div className="pp-option-total"><span>{rupees(q.yearlyTotal)}</span><span>a year</span></div>
              <span className="pp-option-foot">Total with GST added. That is {rupees(q.yearlyPerMonth)} a month before GST, and you save {rupees(q.yearlySaving)}.</span>
            </div>
          )}
        </div>
        <div className="pp-offers">
          {c.chips.map((o) => (
            <div className="pp-offer" key={o.title}>
              <Tick size={20} />
              <div><div className="pp-offer-title">{o.title}</div><div className="pp-offer-text">{o.text}</div></div>
            </div>
          ))}
        </div>
        <div className="pp-grow" />
        <p className="pp-fine">GST of 18% is extra and shown above. Amounts are rounded to the nearest rupee; your GST invoice shows the exact figures. You pay every month, or once a year.</p>
      </Page>

      {/* 5. Your start, with dates */}
      <Page eyebrow="How you start" n={++n} total={total} foot={foot}>
        <h2 className="pp-h2 pp-h2-sm">{c.weeksH2}</h2>
        <p className="pp-sub">Week one starts on {fmtDayMonth(s.start)}. The first two months cost you nothing.</p>
        <div className="pp-weeks">
          {c.weeks(units).map((w, i) => (
            <div className="pp-week" key={i}>
              <span className="pp-week-n">{i + 1}</span>
              <div>
                <div className="pp-week-when">
                  Week {i + 1} · {i === 3 ? `from ${fmtDayMonth(s.weeks[3].from)}` : fmtRange(s.weeks[i].from, s.weeks[i].to)}
                </div>
                <div className="pp-week-title">{w.title}</div>
                <div className="pp-week-text">{w.text}</div>
              </div>
            </div>
          ))}
        </div>
        {zeroInvoices ? (
          <div className="pp-invoices">
            <span className="pp-label">Your first invoices</span>
            {s.invoices.map((d, i) => (
              <div className={`pp-inv ${i < 2 ? "pp-inv-free" : ""}`} key={i}>
                <span className="pp-inv-date">{fmtDate(d)}</span>
                <span className="pp-inv-what">{i < 2 ? `Month ${i + 1} · free plan` : "Month 3 onwards"}</span>
                <span className="pp-inv-amt">
                  {i < 2 ? "₹0" : showMonthly ? <>{rupees(q.monthly)}<small> + GST a month</small></> : <>{rupees(q.yearly)}<small> + GST a year</small></>}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="pp-free">
              <div><span className="pp-label">Your free months</span><div className="pp-free-v">{fmtDate(s.start)}<br />to {fmtDate(s.freeUntil)}</div></div>
              <div><span className="pp-label">Your first bill</span><div className="pp-free-v">{fmtDate(s.firstBill)}</div></div>
            </div>
            <div className="pp-leave"><Tick size={20} /><span><b>{c.assurances[2].title}.</b> {c.assurances[2].text}</span></div>
          </>
        )}
      </Page>

      {/* 6. Everything included */}
      <Page eyebrow="Everything included" n={++n} total={total} foot={foot}>
        <h2 className="pp-h2 pp-h2-sm">Everything included.</h2>
        <div className="pp-groups">
          {c.groups.map((g) => (
            <div className="pp-group" key={g.title}>
              <span className="pp-group-title">{g.title}</span>
              <ul>{g.items.map((it) => <li key={it}><Tick size={16} /><span>{it}</span></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="pp-grow" />
        <div className="pp-noadd">
          <Tick />
          <div>
            <b>No add-ons. No cut of your bookings.</b>
            <span>{c.includedNote} Owner Payouts, Auto Invoicing and Review Management are part of the price.</span>
          </div>
        </div>
      </Page>

      {/* 7. Next step */}
      <Page eyebrow="Next step" n={++n} total={total} foot={foot} end={
        <div className="pp-end">
          <span className="pp-sign">Keep it simple.</span>
          <a href={SITE.url}><span>{SITE.name}</span></a>
        </div>
      }>
        <h2 className="pp-h2 pp-h2-xl">Call today.<br />Start on {fmtDate(s.start).replace(/ \d{4}$/, "")}.</h2>
        <p className="pp-sub">This proposal is valid until {fmtDate(s.validUntil)}. Your first two months are free, and they start the day you do.</p>
        <div className="pp-steps">
          <span className="pp-label">When you say yes</span>
          <div className="pp-step"><span className="pp-step-n">1</span><span>Tell {contact.name} on a call or on WhatsApp.</span></div>
          <div className="pp-step"><span className="pp-step-n">2</span><span>Week one starts on {fmtDayMonth(s.start)} with a call about how you run things today.</span></div>
          <div className="pp-step"><span className="pp-step-n">3</span><span>
            You go live on {fmtDayMonth(s.goLive)}.{" "}
            {zeroInvoices
              ? <>Your first two invoices are ₹0. The first paid one is on {fmtDate(s.firstBill)}.</>
              : <>Your first bill comes on {fmtDate(s.firstBill)}.</>}
          </span></div>
        </div>
        <ContactBlock contact={contact} />
        <div className="pp-grow" />
      </Page>
    </div>
  );
}
