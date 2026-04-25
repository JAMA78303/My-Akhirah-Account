# James Tasks

Role: FAQ, footer, trust content, and QA owner  
Primary ownership: FAQ, footer, trust/safeguarding content, simple accessibility checks, and manual QA.

## Setup Checklist

- [ ] Read `README.md`.
- [ ] Read `docs/CODEBASE_MAP.md`.
- [ ] Pull the latest `main` branch before starting work.
- [ ] Create a feature branch using `feature/<short-description>` or `fix/<short-description>`.
- [ ] Confirm you can run `bun run build`.
- [ ] Ask for review before changing shared layout components.

## Week 1: FAQ and Footer

- [ ] Review `src/components/layout/Footer.tsx`.
- [ ] Review `src/components/sections/TrustSection.tsx`.
- [ ] Build `/faq` page shell.
- [ ] Add FAQ sections for donations, receipts, Zakat/Sadaqah if supplied by Mikhail, volunteering, and contact.
- [ ] Improve footer links for public pages.
- [ ] Add trust or safeguarding content sections where assigned.
- [ ] Check footer works on mobile.
- [ ] Check footer works on desktop.
- [ ] Open a PR for FAQ and footer work.

## Week 2: Donor Trust Content

- [ ] Add donor trust content blocks where assigned.
- [ ] Add safeguarding content blocks where assigned.
- [ ] Add simple "how donations are used" content where assigned.
- [ ] Check all new links go to real pages or planned routes.
- [ ] Check content is easy to scan on mobile.
- [ ] Check headings are in the right order.
- [ ] Check buttons use clear labels.
- [ ] Open a PR for donor trust content.

## Week 3: Manual QA for Assigned Pages

- [ ] Test homepage on mobile.
- [ ] Test homepage on desktop.
- [ ] Test campaigns page on mobile if available.
- [ ] Test campaigns page on desktop if available.
- [ ] Test FAQ page on mobile.
- [ ] Test FAQ page on desktop.
- [ ] Test footer links.
- [ ] Test donation entry point links.
- [ ] Log clear notes for anything broken.
- [ ] Share QA notes with Mikhail and the relevant developer.

## Week 4: Final Content and Accessibility Pass

- [ ] Check spelling on assigned pages.
- [ ] Check broken links on assigned pages.
- [ ] Check image alt text on assigned pages.
- [ ] Check buttons have clear text.
- [ ] Check simple keyboard navigation on assigned pages.
- [ ] Check mobile spacing on assigned pages.
- [ ] Check desktop spacing on assigned pages.
- [ ] Open final QA or polish PR.

## PR Checklist

- [ ] PR explains what changed.
- [ ] PR explains why it changed.
- [ ] PR explains how to test it.
- [ ] `bun run build` passes.
- [ ] Page works on mobile and desktop.
- [ ] Mikhail is requested as final reviewer.
