# Khalid Tasks

Role: Public navigation, page structure, content organization, form UX, and cross-page QA owner  
Primary ownership: public route structure, navigation clarity, policy/about/programme content organization, form user experience, broken-link checks, and cross-page QA. Mikhail owns all payment provider, Convex, and Clerk implementation.

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

## Week 1: Public Structure Planning

- [ ] Create `docs/team/tasks/navigation-map.md` with the final homepage section order to ship.
- [x] List every header nav item with its destination URL and fix wrong or missing links.
- [x] List every footer nav item with its destination URL and fix wrong or missing links.
- [x] Map required public routes: home, about, campaigns, programmes, blog, events, FAQ, contact, volunteer, newsletter, and policies.
- [x] Add missing public links for required routes (about, campaigns, programmes, blog, events, FAQ, contact, volunteer, newsletter, policies).
- [x] Rename confusing navigation labels to clear user-facing wording.
- [ ] Add final menu labels and route map to `docs/team/tasks/navigation-map.md`.
- [ ] Add policy page content requirements to `docs/team/tasks/navigation-map.md`, including required pages and missing copy from Mikhail.
- [x] Open a PR only for public navigation or layout changes.

## Week 2: Public Layout and Content Organization

- [x] Update header/footer labels so the same route has the same label everywhere.
- [x] Create or update one reusable page layout pattern for intro, body sections, and CTA footer.
- [ ] Build/fix about page section structure so intro, mission, and key content blocks are clearly separated.
- [ ] Build/fix programme page structure with clear section headings and scannable content grouping.
- [ ] Build/fix policy page structure with consistent heading levels and readable section spacing.
- [ ] Build/fix contact page layout with clear contact options and form placement.
- [x] Rewrite unclear link labels so each link states destination intent.
- [x] Fix heading hierarchy so each page has one `<h1>` and logical `<h2>/<h3>` order.
- [x] Open a PR for public structure and content organization.

## Week 3: Form UX and Cross-Page QA

- [ ] Fix contact form UX issues (field order, spacing, and button clarity).
- [ ] Fix volunteer form UX issues (field grouping, readability, and submit flow).
- [ ] Fix newsletter signup UX issues (input clarity and submit feedback).
- [ ] Add missing labels/helper text to all form fields you touch.
- [ ] Add clear success and error copy for all form submissions you touch.
- [ ] Fix mobile layout issues found across assigned public pages.
- [ ] Fix desktop layout issues found across assigned public pages.
- [ ] Create a broken-link list with source page + broken URL + intended destination, then fix all links in your scope.
- [ ] Open a PR for form UX and public page polish assigned to you.

## Week 4: Final Navigation and Content QA

- [ ] Run broken-link checks manually across public navigation.
- [ ] Fix all broken header links found in final QA.
- [ ] Fix all broken footer links found in final QA.
- [ ] Fix all broken policy page links found in final QA.
- [ ] Fix broken internal links from homepage sections.
- [ ] Fix broken internal links from blog/event/campaign cards.
- [ ] Fill in missing metadata fields on assigned public pages.
- [ ] Add or improve weak calls to action on assigned content pages.
- [ ] Submit one final navigation/content QA report to Mikhail with completed fixes and remaining blockers.
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
