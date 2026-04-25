# Khalid Tasks

Role: Public navigation, page structure, content organization, form UX, and cross-page QA owner  
Primary ownership: public route structure, navigation clarity, policy/about/programme content organization, form user experience, broken-link checks, and cross-page QA. Mikhail owns all payment provider, Convex, and Clerk implementation.

## Setup Checklist

- [ ] Read `README.md`.
- [ ] Read `docs/CODEBASE_MAP.md`.
- [ ] Pull the latest `main` branch before starting work.
- [ ] Create a feature branch using `feature/<short-description>` or `fix/<short-description>`.
- [ ] Confirm you can run `bun run build`.
- [ ] Do not change payment provider code.
- [ ] Do not change Convex code.
- [ ] Do not change Clerk or authentication code.

## Week 1: Public Structure Planning

- [ ] Review current homepage structure.
- [ ] Review header navigation.
- [ ] Review footer navigation.
- [ ] Map required public routes: home, about, campaigns, programmes, blog, events, FAQ, contact, volunteer, newsletter, and policies.
- [ ] Identify missing public links.
- [ ] Identify confusing navigation labels.
- [ ] Draft public site navigation notes for Mikhail.
- [ ] Draft policy page requirements with Mikhail-supplied content needs.
- [ ] Open a PR only for public navigation or layout changes.

## Week 2: Public Layout and Content Organization

- [ ] Improve public navigation consistency.
- [ ] Improve reusable page layout patterns.
- [ ] Improve about page structure if available.
- [ ] Improve programme page structure if available.
- [ ] Improve policy page structure if available.
- [ ] Improve contact page layout if available.
- [ ] Ensure links use clear labels.
- [ ] Ensure pages have clear heading hierarchy.
- [ ] Open a PR for public structure and content organization.

## Week 3: Form UX and Cross-Page QA

- [ ] Review contact form user experience.
- [ ] Review volunteer form user experience.
- [ ] Review newsletter signup user experience.
- [ ] Check forms have labels and helper text.
- [ ] Check forms have clear success and error copy.
- [ ] Check public pages on mobile.
- [ ] Check public pages on desktop.
- [ ] Log broken links clearly.
- [ ] Open a PR for form UX and public page polish assigned to you.

## Week 4: Final Navigation and Content QA

- [ ] Run broken-link checks manually across public navigation.
- [ ] Review header links.
- [ ] Review footer links.
- [ ] Review policy page links.
- [ ] Review internal links from homepage sections.
- [ ] Review internal links from blog/event/campaign cards.
- [ ] Check public page metadata where assigned.
- [ ] Check content pages have clear calls to action.
- [ ] Write navigation and content QA notes for Mikhail.
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
