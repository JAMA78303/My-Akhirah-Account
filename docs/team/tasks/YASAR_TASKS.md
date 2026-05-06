# Yasar Tasks

Role: Donor journey, campaign UX, trust content, accessibility, and release QA owner  
Primary ownership: public donation experience, campaign detail presentation, donor trust messaging, accessibility review, and release QA support. Mikhail owns all payment provider, Convex, and Clerk implementation.

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
- [x] Do not change payment provider code.
- [x] Do not change Convex code.
- [x] Do not change Clerk or authentication code.

## Week 1: Donor Journey Planning

- [x] List every homepage donation entry point in a short table (section name + button text + destination URL).
- [x] List every campaign-card donation entry point in a short table (card type + button text + destination URL).
- [x] List every header/footer donation link and confirm each target URL is correct.
- [ ] Create a donor journey flow with exact steps from homepage to donation decision (at least 5 steps).
- [x] Identify where Zakat, Sadaqah, Sadaqah Jariyah, and general donations should appear in the UI.
- [x] Draft donor-facing copy for donation entry sections.
- [x] Draft trust copy explaining secure donation handling without naming unconfirmed providers.
- [ ] Share donor journey notes with Mikhail.
- [x] Open a PR only for frontend copy or layout changes.

## Week 2: Campaign and Donation Page UX

- [ ] Update campaign detail page layout so title, impact summary, and donation CTA are visible without extra scrolling.
- [x] Update donation entry section layout with clear amount block, campaign/fund context, and a single primary CTA.
- [x] Add clear donor trust messaging near donation CTAs.
- [x] Add clear "where your donation goes" content blocks.
- [ ] Add clear payment-method placeholder UI only if Mikhail has approved the copy.
- [ ] Create a donation CTA table in `docs/team/tasks/donor-journey-map.md` with source page, CTA text, destination URL, and Mikhail approval status; fix any CTA with the wrong destination.
- [x] Ensure donation UI does not calculate totals or trust client-side payment values.
- [x] Open a PR for campaign and donation UX work.

## Week 3: Accessibility and Donor Journey QA

- [x] Test donation entry points with keyboard navigation.
- [x] Fix missing or weak focus states on donation CTAs so keyboard users can always see current focus.
- [x] Rewrite unclear button/link labels so each label clearly describes the action (for example, "Donate to Clean Water").
- [ ] Fix mobile donation entry layout issues (spacing, overflow, unreadable text) found during QA.
- [ ] Fix desktop donation entry layout issues (alignment, spacing, CTA visibility) found during QA.
- [x] Fix campaign card/detail overflow issues for long campaign names.
- [x] Fix wrapping/truncation issues for long country/programme labels.
- [ ] Log each issue with page URL, device, reproduction steps, and owner in a QA note.
- [x] Open a PR for accessibility fixes assigned to you.

## Week 4: Release QA Support

- [ ] Run donor journey QA from homepage to donation entry point.
- [ ] Run donor journey QA from campaigns page to donation entry point.
- [ ] Run donor journey QA from campaign detail page to donation entry point.
- [ ] Finalize donation CTA copy so wording is consistent across homepage, listing, and detail pages.
- [ ] Update trust content to remove any claims that cannot be verified.
- [ ] Fix remaining mobile spacing issues in donation and campaign sections.
- [ ] Fix remaining desktop spacing issues in donation and campaign sections.
- [ ] Submit one release QA note for Mikhail with pass/fail status for each journey and links to related PRs.
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
