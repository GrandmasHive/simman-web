# Proposal maker (sales team)

A private page on the website where a sales rep makes a personalised proposal PDF
for a prospect, after the sales deck. Route: `/team/proposal`, behind a login.

Status 2026-09-29: branch `feat/sales-proposals` pushed; PREVIEW at
https://simman-web-git-feat-sales-proposals-dev-ops-9530.vercel.app/team/login.
Not merged to `main`, so not live on simplifiedmanagement.in yet.

## How the sales team uses it (3 steps)

1. **Log in** at `simplifiedmanagement.in/team/login`. Find the prospect in HubSpot
   (name, phone, email or business), or skip that and type their details.
2. **Fill in what they told you on the call.** Hotel or property owner, rooms or listings,
   booking sites, how they run it today, their team, up to 5 problems, the start date.
   The preview on the right is exactly what the prospect gets.
3. **Tap Download PDF**, choose "Save as PDF", and send the file on WhatsApp yourself.
   "Copy WhatsApp message" gives you a short intro to paste with it.
   Nothing is ever sent to a prospect by this tool.

Tips: make proposals on a laptop (Chrome or Edge). If a yellow "page is too full"
note appears, do what it says before downloading.

## What's fixed and what the rep can change

- Prices: `src/lib/proposal/pricing.ts`. FINAL. Do not change.
- Every product claim: `src/lib/proposal/copy.ts`, copied from the v2 decks. Reps can
  only pick problems from this list, so they can't promise anything new.
- Contact on every proposal: Tipusultan, +91 98240 04043, sultan@simplifiedmanagement.in.
- Defaults Shaun can override:
  - The 2 free months count from the Week 1 start date. Page 5 shows the first two
    invoices at ₹0 (free plan) and the first paid one; the rep can switch that off.
  - One hotel per proposal (one ₹3,000 platform fee).
  - Only Airbnb, Booking.com and MakeMyTrip are promised to "come in on their own".
  - Amounts are rounded to the rupee.

## Logins (Shaun)

Users live in the env var `TEAM_USERS` (hashed passwords, never plain text).

- Add a rep: `node scripts/team-user.mjs <username> <password>`. Append the printed entry
  to `TEAM_USERS` (comma-separated).
- Remove a rep: delete their entry. Their access stops at once.
- New session secret: `node scripts/team-user.mjs --secret` into `TEAM_SESSION_SECRET`.

If either variable is missing, nobody can log in (fails closed).

## Run it locally

```bash
npm run dev -- -p 3100
```

Then open http://localhost:3100/team/login. Local test user: see `.env.local` (gitignored).
Samples: `/team/proposal?sample=hotel` and `/team/proposal?sample=owner`.

## Deploy state (2026-09-29)

- Done: Vercel env `TEAM_SESSION_SECRET` (sensitive) and `TEAM_USERS` (tipusultan, ghouse)
  set for Production + Preview. `HUBSPOT_TOKEN` was already there.
- Done: GA4 + Meta Pixel skip `/team` (guard in `src/app/layout.tsx`).
- Kept: the "Log this proposal on the HubSpot deal" button (rep clicks + confirms; sets the
  deal amount and appends one note line). Not yet run against live data.
- To go live: merge `feat/sales-proposals` into `main` as GrandmasHive and push to `devops`.

## Files

- `src/app/team/proposal/page.tsx`: the page (checks the session)
- `src/components/proposal/`: form (`proposal-builder.tsx`) and the 7 A4 pages
  (`proposal-document.tsx`, `proposal.css`)
- `src/lib/proposal/`: pricing, dates, deck copy, samples
- `src/lib/team-auth.ts`, `src/proxy.ts`, `src/app/api/team/*`, `src/app/team/login/`: login + HubSpot
- `public/brand/simman-wordmark.svg`: the real logo (from Media-Kit/source)
