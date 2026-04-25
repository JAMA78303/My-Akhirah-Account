# Yasar Tasks

Role: Donor journey, campaign UX, trust content, accessibility, and release QA owner  
Primary ownership: public donation experience, campaign detail presentation, donor trust messaging, accessibility review, and release QA support. Mikhail owns all payment provider, Convex, and Clerk implementation.

## Setup Checklist

- [ ] Read `README.md`.
- [ ] Read `docs/CODEBASE_MAP.md`.
- [ ] Pull the latest `main` branch before starting work.
- [ ] Create a feature branch using `feature/<short-description>` or `fix/<short-description>`.
- [ ] Confirm you can run `bun run build`.
- [ ] Do not change payment provider code.
- [ ] Do not change Convex code.
- [ ] Do not change Clerk or authentication code.

## Week 1: Donor Journey Planning

- [ ] Review homepage donation entry points.
- [ ] Review campaign card donation entry points.
- [ ] Review header and footer donation links.
- [ ] Map the donor journey from homepage to donation decision.
- [ ] Identify where Zakat, Sadaqah, Sadaqah Jariyah, and general donations should appear in the UI.
- [ ] Draft donor-facing copy for donation entry sections.
- [ ] Draft trust copy explaining secure donation handling without naming unconfirmed providers.
- [ ] Share donor journey notes with Mikhail.
- [ ] Open a PR only for frontend copy or layout changes.

## Week 2: Campaign and Donation Page UX

- [ ] Improve campaign detail page layout if available.
- [ ] Improve donation entry section layout if available.
- [ ] Add clear donor trust messaging near donation CTAs.
- [ ] Add clear "where your donation goes" content blocks.
- [ ] Add clear payment-method placeholder UI only if Mikhail has approved the copy.
- [ ] Check that donation CTAs route to Mikhail-approved destinations.
- [ ] Ensure donation UI does not calculate totals or trust client-side payment values.
- [ ] Open a PR for campaign and donation UX work.

## Week 3: Accessibility and Donor Journey QA

- [ ] Test donation entry points with keyboard navigation.
- [ ] Check focus states on donation CTAs.
- [ ] Check button and link labels are clear.
- [ ] Check donation entry content on mobile.
- [ ] Check donation entry content on desktop.
- [ ] Check campaign pages handle long campaign names.
- [ ] Check campaign pages handle long country/programme labels.
- [ ] Log issues clearly for Mikhail or the relevant page owner.
- [ ] Open a PR for accessibility fixes assigned to you.

## Week 4: Release QA Support

- [ ] Run donor journey QA from homepage to donation entry point.
- [ ] Run donor journey QA from campaigns page to donation entry point.
- [ ] Run donor journey QA from campaign detail page to donation entry point.
- [ ] Check final donation CTA copy.
- [ ] Check trust content is accurate and not overpromising.
- [ ] Check mobile spacing for donation and campaign sections.
- [ ] Check desktop spacing for donation and campaign sections.
- [ ] Write release QA notes for Mikhail.
- [ ] Open final polish PR if needed.

## PR Checklist

- [ ] PR explains what changed.
- [ ] PR explains why it changed.
- [ ] PR explains how to test it.
- [ ] `bun run build` passes.
- [ ] No payment provider code was changed.
- [ ] No Convex code was changed.
- [ ] No Clerk/auth code was changed.
- [ ] Mikhail is requested as final reviewer.
