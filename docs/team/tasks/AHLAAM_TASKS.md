# Ahlaam Tasks

Role: About, policy pages, content blocks, and responsive QA owner  
Primary ownership: about page, policy pages, partner/team sections, reusable content blocks, card polish, and responsive QA.

## Setup Checklist

- [ ] Read `README.md`.
- [ ] Read `docs/CODEBASE_MAP.md`.
- [ ] Pull the latest `main` branch before starting work.
- [ ] Create a feature branch using `feature/<short-description>` or `fix/<short-description>`.
- [ ] Confirm you can run `bun run build`.
- [ ] Ask for review before changing shared card components.

## Week 1: About and Policy Page Shells

- [ ] Review `src/app/page.tsx`.
- [ ] Review existing section components in `src/components/sections/`.
- [ ] Build `/about` page shell.
- [ ] Build policy page shells assigned by Mikhail.
- [ ] Add team section shell if content is available.
- [ ] Add partner section shell if content is available.
- [ ] Add reusable content block components only if they are genuinely reused.
- [ ] Check about page works on mobile.
- [ ] Check about page works on desktop.
- [ ] Open a PR for about and policy page shells.

## Week 2: About, Policy, and Partner Content

- [ ] Add about page content supplied by Mikhail.
- [ ] Add policy content supplied by Mikhail.
- [ ] Add team content supplied by Mikhail.
- [ ] Add partner content supplied by Mikhail.
- [ ] Check page headings are clear.
- [ ] Check paragraphs are readable on mobile.
- [ ] Check images have useful alt text.
- [ ] Check links point to real pages or approved external URLs.
- [ ] Open a PR for about and policy content.

## Week 3: Card Polish and QA

- [ ] Review `src/components/cards/BlogCard.tsx`.
- [ ] Review `src/components/cards/EventCard.tsx`.
- [ ] Review `src/components/cards/CampaignCard.tsx`.
- [ ] Check cards handle long titles.
- [ ] Check cards handle long excerpts.
- [ ] Check cards have clear links or buttons.
- [ ] Check cards are readable on mobile.
- [ ] Check cards align cleanly on desktop.
- [ ] Log issues clearly and assign them to the right developer.
- [ ] Open a PR for card polish if assigned.

## Week 4: Final Responsive QA

- [ ] Test about page on mobile.
- [ ] Test about page on tablet.
- [ ] Test about page on desktop.
- [ ] Test policy pages on mobile.
- [ ] Test policy pages on desktop.
- [ ] Test blog cards on mobile and desktop.
- [ ] Test event cards on mobile and desktop.
- [ ] Test campaign cards on mobile and desktop.
- [ ] Check spacing and text wrapping across assigned pages.
- [ ] Open final QA or polish PR.

## PR Checklist

- [ ] PR explains what changed.
- [ ] PR explains why it changed.
- [ ] PR explains how to test it.
- [ ] `bun run build` passes.
- [ ] Page works on mobile and desktop.
- [ ] Mikhail is requested as final reviewer.
