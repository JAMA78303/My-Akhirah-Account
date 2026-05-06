# Ahlaam Tasks

Role: About, policy pages, content blocks, and responsive QA owner  
Primary ownership: about page, policy pages, partner/team sections, reusable content blocks, card polish, and responsive QA.

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
- [x] Ask for review before changing shared card components.

## Week 1: About and Policy Pages

- [x] Reuse layout/content patterns from `src/app/page.tsx` when building about/policy sections.
- [x] Reuse and extend existing components in `src/components/sections/` instead of creating duplicates.
- [ ] Build `/about` with these sections: intro, mission, Africa focus, how we work, team, partners, and CTA to `/contact`.
- [ ] Build `/privacy-policy` with readable section headings and placeholder content blocks marked `TODO: Mikhail copy`.
- [ ] Build `/terms` with readable section headings and placeholder content blocks marked `TODO: Mikhail copy`.
- [ ] Build `/safeguarding` with readable section headings and placeholder content blocks marked `TODO: Mikhail copy`.
- [ ] Add a team section with placeholder cards for name, role, and short bio.
- [ ] Add a partners section with placeholder cards for partner name, region, and work type.
- [ ] Create one reusable `ContentSection` component only if at least 2 pages use it.
- [ ] Fix mobile spacing on `/about` so sections do not touch the viewport edge.
- [ ] Fix desktop spacing on `/about` so content width stays readable.
- [ ] Open a PR for about and policy pages.

## Week 2: About, Policy, and Partner Content

- [ ] Replace `/about` placeholder copy with Mikhail-approved copy.
- [ ] Replace `/privacy-policy` placeholder copy with Mikhail-approved copy.
- [ ] Replace `/terms` placeholder copy with Mikhail-approved copy.
- [ ] Replace `/safeguarding` placeholder copy with Mikhail-approved copy.
- [ ] Replace team placeholder cards with Mikhail-approved team entries.
- [ ] Replace partner placeholder cards with Mikhail-approved partner entries.
- [ ] Fix unclear headings so each section purpose is obvious.
- [ ] Rewrite long paragraphs into mobile-readable blocks.
- [ ] Add/fix useful alt text for images on these pages.
- [ ] Fix links so they point only to real pages or approved external URLs.
- [ ] Open a PR for about and policy content.

## Week 3: Card Polish and QA

- [x] Update `src/components/cards/BlogCard.tsx` to handle long titles/excerpts without layout break.
- [x] Update `src/components/cards/EventCard.tsx` to handle long titles/excerpts without layout break.
- [x] Update `src/components/cards/CampaignCard.tsx` to handle long titles/excerpts without layout break.
- [x] Add clear link/button labels for every card action.
- [x] Fix mobile readability issues for all three card types.
- [x] Fix desktop alignment issues for all three card types.
- [ ] Create `docs/team/tasks/qa-notes-ahlaam.md` with each remaining issue, page, screenshot reference, and owner.
- [x] Open a PR for card polish after fixing at least one confirmed card layout issue or attach `docs/team/tasks/qa-notes-ahlaam.md` if no card changes are needed.

## Week 4: Final Responsive QA

- [ ] Test about page on mobile.
- [ ] Test about page on tablet.
- [ ] Test about page on desktop.
- [ ] Test policy pages on mobile.
- [ ] Test policy pages on desktop.
- [ ] Test blog cards on mobile and desktop.
- [ ] Test event cards on mobile and desktop.
- [ ] Test campaign cards on mobile and desktop.
- [ ] Fix spacing and text-wrapping issues across assigned pages.
- [ ] Open final QA or polish PR.

## PR Checklist

- [ ] PR explains what changed.
- [ ] PR explains why it changed.
- [ ] PR explains how to test it.
- [ ] `bun run build` passes.
- [ ] Page works on mobile and desktop.
- [ ] Mikhail is requested as final reviewer.
