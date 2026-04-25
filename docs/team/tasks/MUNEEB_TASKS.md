# Muneeb Tasks

Role: Campaigns and donation entry points owner  
Primary ownership: campaigns, campaign details, campaign filters, and donation entry points.

## Setup Checklist

- [ ] Read `README.md`.
- [ ] Read `docs/CODEBASE_MAP.md`.
- [ ] Pull the latest `main` branch before starting work.
- [ ] Create a feature branch using `feature/<short-description>` or `fix/<short-description>`.
- [ ] Confirm you can run `bun run build`.
- [ ] Ask Mikhail before changing donation checkout or payment logic.
- [ ] Ask Mikhail before changing any data flow, Convex-related interface, admin permissions, payment provider flow, or Clerk/auth behavior.

## Week 1: Campaign Page Structure

- [ ] Review `src/app/page.tsx`.
- [ ] Review `src/components/cards/CampaignCard.tsx`.
- [ ] Review `src/lib/server/homepage.ts`.
- [ ] Review only the public campaign data shape approved by Mikhail.
- [ ] Build `/campaigns` page shell.
- [ ] Build `/campaigns/[slug]` page shell.
- [ ] Add campaign page metadata.
- [ ] Add loading and empty states for campaigns.
- [ ] Add navigation links from existing campaign CTAs.
- [ ] Open a PR for campaign page structure.

## Week 2: Campaign Data and Filters

- [ ] Connect `/campaigns` to the campaign data interface approved by Mikhail.
- [ ] Connect `/campaigns/[slug]` to the campaign data interface approved by Mikhail.
- [ ] Display campaign title, summary, image, countries, amount raised, and target amount.
- [ ] Add filter UI for active campaigns.
- [ ] Add filter UI for featured campaigns if supported by the approved data interface.
- [ ] Add filter UI for fund or programme when available.
- [ ] Keep filters reflected in the URL where practical.
- [ ] Add clear empty states for no matching campaigns.
- [ ] Open a PR for campaign data and filters.

## Week 3: Donation Entry Points

- [ ] Add clear donate CTAs on campaign cards.
- [ ] Add clear donate CTA on campaign detail pages.
- [ ] Build UI for one-off amount selection if assigned by Mikhail.
- [ ] Build UI for campaign or fund selection if assigned by Mikhail.
- [ ] Build UI for cover-fees option if assigned by Mikhail.
- [ ] Build UI for anonymous donation option if assigned by Mikhail.
- [ ] Build UI for donor message if assigned by Mikhail.
- [ ] Do not calculate trusted payment totals on the client.
- [ ] Ask Mikhail to review before opening the PR if donation flow is touched.
- [ ] Open a PR for donation entry UI.

## Week 4: Polish and QA

- [ ] Polish campaign listing spacing on mobile.
- [ ] Polish campaign listing spacing on desktop.
- [ ] Polish campaign detail page readability.
- [ ] Check all campaign images have useful alt text.
- [ ] Check campaign links are not broken.
- [ ] Check campaign empty states are clear.
- [ ] Check donation entry points route correctly.
- [ ] Run manual QA for campaigns on mobile, tablet, and desktop.
- [ ] Open final polish PR.

## PR Checklist

- [ ] PR explains what changed.
- [ ] PR explains why it changed.
- [ ] PR explains how to test it.
- [ ] `bun run build` passes.
- [ ] Campaign pages work on mobile and desktop.
- [ ] Mikhail reviewed if donation flow was touched.
- [ ] Mikhail is requested as final reviewer.
