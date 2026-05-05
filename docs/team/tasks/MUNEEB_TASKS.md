# Muneeb Tasks

Role: Campaigns and donation entry points owner  
Primary ownership: campaigns, campaign details, campaign filters, and donation entry points.

## Shared Product Contract

- [x] Use the shared header/footer route set: `/`, `/about`, `/campaigns`, `/programmes`, `/blog`, `/events`, `/faq`, `/contact`, `/volunteer`, `/newsletter`.
- [x] Use the existing brand colors, spacing, buttons, and card patterns instead of inventing a separate visual style.
- [x] Point every donation CTA to the destination approved by Mikhail.
- [x] Do not change payment provider, Convex, Clerk/auth, or admin files.
- [x] Keep every new page mobile-first and readable at mobile, tablet, and desktop widths.

## Setup Checklist

- [x] Read `README.md`.
- [x] Read `docs/CODEBASE_MAP.md`.
- [x] Pull the latest `main` branch before starting work.
- [x] Create a feature branch using `feature/<short-description>` or `fix/<short-description>`.
- [ ] Confirm you can run `bun run build`.
- [x] Ask Mikhail before changing donation checkout or payment logic.
- [x] Ask Mikhail before changing any data flow, Convex-related interface, admin permissions, payment provider flow, or Clerk/auth behavior.

## Week 1: Campaign Page Structure

- [x] Extract campaign UI patterns from `src/app/page.tsx` and reuse them on `/campaigns`.
- [x] Refactor/update `src/components/cards/CampaignCard.tsx` to support listing + detail page needs.
- [ ] Create the campaign listing loading state to visually match the homepage campaign card layout.
- [x] Use only Mikhail-approved public campaign fields (title, slug, image, summary, totals, countries, status).
- [ ] Build `/campaigns` page shell.
- [ ] Build `/campaigns/[slug]` page shell.
- [ ] Add campaign page metadata.
- [ ] Add loading and empty states for campaigns.
- [x] Add navigation links from existing campaign CTAs.
- [x] Open a PR for campaign page structure.

## Week 2: Campaign Data and Filters

- [ ] Connect `/campaigns` to the Mikhail-approved campaign data interface, with no hardcoded production data in final PR.
- [ ] Connect `/campaigns/[slug]` to the Mikhail-approved campaign detail data interface, with no hardcoded production data in final PR.
- [ ] Display campaign title, summary, image, countries, amount raised, and target amount.
- [ ] Add filter UI for active campaigns.
- [ ] Add featured-campaign filter UI only after Mikhail confirms the approved data interface includes `isFeatured`.
- [ ] Add fund/programme filter UI using the approved `fund` or `programme` field; if neither field is approved, add a note to the PR explaining that the filter is blocked by missing approved data.
- [ ] Keep filters reflected in the URL where practical.
- [ ] Add clear empty states for no matching campaigns.
- [ ] Open a PR for campaign data and filters.

## Week 3: Donation Entry Points

- [ ] Add clear donate CTAs on campaign cards.
- [ ] Add clear donate CTA on campaign detail pages.
- [ ] Build one-off amount selection UI only from the fields in Mikhail's approved donation UI brief.
- [ ] Build campaign/fund selection UI only from the fields in Mikhail's approved donation UI brief.
- [ ] Build cover-fees option UI only from the fields in Mikhail's approved donation UI brief.
- [ ] Build anonymous donation option UI only from the fields in Mikhail's approved donation UI brief.
- [ ] Build donor message UI only from the fields in Mikhail's approved donation UI brief.
- [ ] Ensure campaign and fund selection options shown in UI come from Mikhail-approved Convex data.
- [ ] Do not calculate trusted payment totals on the client.
- [ ] Ask Mikhail to review before opening the PR if donation flow is touched.
- [ ] Open a PR for donation entry UI.

## Week 4: Polish and QA

- [ ] Polish campaign listing spacing on mobile.
- [ ] Polish campaign listing spacing on desktop.
- [ ] Polish campaign detail page readability.
- [ ] Add/fix alt text for every campaign image.
- [ ] Fix all broken campaign links in listing and detail pages.
- [ ] Replace the campaigns empty state with this structure: heading "No Campaigns Found", one sentence explaining filters, and a CTA linking to `/contact`.
- [x] Fix donation entry routes so every donation CTA points to the expected destination.
- [ ] Run manual QA for campaigns on mobile, tablet, and desktop.
- [ ] Open final polish PR.

## PR Checklist

- [x] PR explains what changed.
- [x] PR explains why it changed.
- [x] PR explains how to test it.
- [x] `bun run build` passes.
- [x] Campaign pages work on mobile and desktop.
- [ ] Mikhail reviewed if donation flow was touched.
- [ ] Mikhail is requested as final reviewer.
