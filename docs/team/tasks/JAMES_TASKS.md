# James Tasks

Role: FAQ, footer, trust content, and QA owner  
Primary ownership: FAQ, footer, trust/safeguarding content, simple accessibility checks, and manual QA.

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
- [x] Ask for review before changing shared layout components.

## Week 1: FAQ and Footer

- [x] Update `src/components/layout/Footer.tsx` links and layout for desktop + mobile readability.
- [x] Update `src/components/sections/TrustSection.tsx` copy and structure for clear trust messaging.
- [ ] Build `/faq` with sections for donations, receipts, Zakat/Sadaqah, volunteering, contact, and transparency.
- [ ] Add at least 4 FAQ items per section using placeholder answers marked `TODO: Mikhail copy` where final copy is missing.
- [x] Add footer links for `/about`, `/campaigns`, `/programmes`, `/blog`, `/events`, `/faq`, `/contact`, `/volunteer`, `/newsletter`, `/privacy-policy`, `/terms`, and `/safeguarding`.
- [ ] Add a trust/safeguarding section below the FAQ that links to `/safeguarding`, `/contact`, and `/volunteer`.
- [x] Fix footer at 390px width so link groups stack cleanly, text does not overflow, and tap targets are at least 44px high.
- [x] Fix footer at 1440px width so link groups align consistently and no column has awkward wrapping.
- [x] Open a PR for FAQ and footer work.

## Week 2: Donor Trust Content

- [ ] Add 3 donor trust content blocks: "Transparent Giving", "Local Delivery", and "Receipts and Updates".
- [ ] Add 3 safeguarding content blocks: "Report a Concern", "Volunteer Conduct", and "Beneficiary Care".
- [ ] Add a "How Donations Are Used" section with 3 steps: choose an appeal, donate securely, receive updates.
- [x] Fix any trust-content links that do not point to real pages or approved planned routes.
- [x] Rewrite/format content blocks to be easy to scan on mobile (short sections, clear headings).
- [x] Fix heading hierarchy in new trust/FAQ content blocks.
- [x] Replace weak button labels with clear action labels.
- [x] Open a PR for donor trust content.

## Week 3: Manual QA for Assigned Pages

- [ ] Test homepage at 390px mobile width and fix obvious text/spacing issues in your scope.
- [ ] Test homepage at 1440px desktop width and fix obvious text/spacing issues in your scope.
- [ ] Test campaigns page at 390px mobile width and record blockers if the page is not available.
- [ ] Test campaigns page at 1440px desktop width and record blockers if the page is not available.
- [ ] Test FAQ page at 390px mobile width and fix obvious text/spacing issues.
- [ ] Test FAQ page at 1440px desktop width and fix obvious text/spacing issues.
- [x] Click every footer link and fix broken links in your scope.
- [x] Click every donation entry point link you can see and report any link that does not go to Mikhail-approved destination.
- [ ] Create `docs/team/tasks/qa-notes-james.md` with page URL, device, reproduction steps, expected result, and owner for each issue.

## Week 4: Final Content and Accessibility Pass

- [ ] Fix spelling and grammar issues on assigned pages.
- [ ] Fix broken links on assigned pages.
- [ ] Add/fix image alt text on assigned pages.
- [ ] Rewrite unclear button text on assigned pages.
- [ ] Fix simple keyboard navigation issues on assigned pages.
- [ ] Fix mobile spacing issues on assigned pages.
- [ ] Fix desktop spacing issues on assigned pages.
- [ ] Open final QA or polish PR.

## PR Checklist

- [ ] PR explains what changed.
- [ ] PR explains why it changed.
- [ ] PR explains how to test it.
- [ ] `bun run build` passes.
- [ ] Page works on mobile and desktop.
- [ ] Mikhail is requested as final reviewer.
