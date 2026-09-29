# Proposal maker (sales team)

A private page on the website where a sales rep makes a personalised proposal PDF
for a prospect, after the sales deck. Route: `/team/proposal`, behind a login.

Status 2026-09-25: built and tested LOCALLY on branch `feat/sales-proposals`. Not deployed.

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
  - The 2 free months count from the Week 1 start date.
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

## Before deploying (not done yet)

1. Vercel project env (Production): add `TEAM_SESSION_SECRET` and `TEAM_USERS` with REAL
   rep logins (not the local test user). `HUBSPOT_TOKEN` is already there.
2. Decide: GA4 + Meta Pixel load on every page from the root layout, so team visits count
   as site PageViews. Exclude `/team` first if that matters.
3. Decide: keep or remove the "Log this proposal on the HubSpot deal" button. It sets the
   deal amount (12 months, before GST) and appends one note line. It only runs when the rep
   clicks it and confirms. It has not been run against live data.
4. Commit as GrandmasHive (or the deploy blocks), merge `feat/sales-proposals` into `main`,
   push to the `devops` remote. Check `/team/login` on a preview first.

## Files

- `src/app/team/proposal/page.tsx`: the page (checks the session)
- `src/components/proposal/`: form (`proposal-builder.tsx`) and the 7 A4 pages
  (`proposal-document.tsx`, `proposal.css`)
- `src/lib/proposal/`: pricing, dates, deck copy, samples
- `src/lib/team-auth.ts`, `src/proxy.ts`, `src/app/api/team/*`, `src/app/team/login/`: login + HubSpot
- `public/brand/simman-wordmark.svg`: the real logo (from Media-Kit/source)
