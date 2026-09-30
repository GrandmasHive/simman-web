# Proposal maker (sales team)

A private page on the website where a sales rep turns a call into the final offer:
a 5-page PDF with the final price, sent to the prospect on WhatsApp.
Route: `/team/proposal`, behind a login. Settings: `/team/settings`.

Status 2026-09-30: v2 on branch `feat/sales-proposals`, PREVIEW only
(https://simman-web-git-feat-sales-proposals-dev-ops-9530.vercel.app/team/login).
Not merged to `main`, so not live on simplifiedmanagement.in yet.

## How the sales team uses it (3 steps)

1. **Log in** at `simplifiedmanagement.in/team/login`.
2. **Fill in two things:** who it's for (name, business, city or area) and what they need
   (Hotel or Home owner, and the number of rooms or listings). The price card on the right
   works out the price as you type.
3. **Tap Download proposal PDF.** The file downloads straight away. Send it on WhatsApp
   yourself. "Copy WhatsApp text" gives a short message to paste with it.

The offer is open for 1 week by default; switch to 1 month next to the Download button.
Nothing is ever sent to a prospect by this tool.

## What the PDF is

Always 5 A4 pages: cover (with the monthly price), your price worked out, your start
(4 weeks with dates, first two invoices at ₹0), everything included, next step with the
rep's contact. Week 1 starts the Monday after the proposal is made.

The PDF is built in the browser, one exact A4 image per page, with the call, WhatsApp,
email and demo links added back on top (`src/lib/proposal/export-pdf.ts`). It does not use
the browser's print window, so paper size, margins and scaling settings can't break it.

## What's fixed

- Prices: `src/lib/proposal/pricing.ts`. FINAL. Do not change.
- Every product line: `src/lib/proposal/copy.ts`, from the v2 decks.
- Default contact (until a rep saves their own in Settings): Tipusultan, Relationship Manager,
  +91 98240 04043, sultan@simplifiedmanagement.in.

## Settings (each rep's contact on their proposals)

Saved with the rep's login in a private Vercel Blob store, when `BLOB_READ_WRITE_TOKEN` is set
on the Vercel project. NOT switched on yet (needs Shaun's approval under the money rule). Until
then Settings shows "Saving isn't switched on yet" and proposals print the default contact.
On a laptop (`npm run dev`), profiles save to `.data/profiles.json` (gitignored).

## Logins (Shaun)

Users live in the env var `TEAM_USERS` (hashed passwords, never plain text).

- Add a rep: `node scripts/team-user.mjs <username> <password>`. Append the printed entry
  to `TEAM_USERS` (comma-separated).
- Remove a rep: delete their entry. Their access stops at once.
- New session secret: `node scripts/team-user.mjs --secret` into `TEAM_SESSION_SECRET`.

If either variable is missing, nobody can log in (fails closed).

## Coming next: our own CRM

The two steps map to the CRM fields being added: business name, city or area, type
(Hotel / Home owners) and count. The count must be rooms for hotels and listings for home
owners, because the price is per room or per listing.

## Go live

Merge `feat/sales-proposals` into `main` as GrandmasHive and push to `devops`.
GA4 and the Meta Pixel already skip `/team`; `/team` and `/api/team` are in robots.txt.
