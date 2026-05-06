# Mustaf Tasks

Role: Forms, programmes, and impact owner  
Primary ownership: contact, volunteer, newsletter, programmes, impact sections, and form feedback.

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
- [x] Ask Mikhail before changing form security, rate limiting, data flows, Convex-related interfaces, admin permissions, payment provider flow, or Clerk/auth behavior.

## Week 1: Form and Programme Page Structure

- [ ] Create a field map for the contact page in `docs/team/tasks/form-field-map.md` with field label, `name`, `type`, `autocomplete`, required/optional, and API payload key.
- [ ] Create a field map for the newsletter signup in `docs/team/tasks/form-field-map.md` with field label, `name`, `type`, `autocomplete`, required/optional, and API payload key.
- [ ] Create a field map for the volunteer page in `docs/team/tasks/form-field-map.md` with field label, `name`, `type`, `autocomplete`, required/optional, and API payload key.
- [x] Apply validation rules from `src/lib/validation/forms.ts` to visible form UI and error messages.
- [x] Use only Mikhail-approved public form fields and submission payload shape.
- [ ] Build `/contact` page shell.
- [ ] Build `/volunteer` page shell.
- [ ] Build `/newsletter` page or section shell.
- [ ] Build `/programmes` page shell.
- [x] Open a PR for form and programme page structure.

## Week 2: Form Submission and Validation

- [x] Connect contact form to the existing submission flow approved by Mikhail (Convex-backed path where implemented).
- [x] Connect volunteer form to the existing submission flow approved by Mikhail (Convex-backed path where implemented).
- [x] Connect newsletter signup to the existing submission flow approved by Mikhail (Convex-backed path where implemented).
- [x] Show inline validation messages.
- [x] Show success states after successful submission.
- [x] Show error states after failed submission.
- [x] Ensure form fields have labels.
- [x] Ensure submit buttons show loading state after submit starts.
- [ ] Ensure invalid submissions do not clear all useful user input.
- [x] Open a PR for form submission and validation.

## Week 3: Admin Lists and Impact Work

- [ ] Add user-facing contact submission status UI using the status states approved by Mikhail.
- [ ] Add user-facing volunteer application status UI using the status states approved by Mikhail.
- [ ] Add user-facing newsletter signup status UI using the status states approved by Mikhail.
- [x] Use only Mikhail-approved public impact data fields in UI.
- [x] Update `src/components/sections/Stats.tsx` to display real impact metrics cleanly.
- [x] Fix impact/statistics section layout, labels, and fallback behavior where needed.
- [ ] Connect programme page to Convex-backed programme data where available and approved by Mikhail.
- [x] Add clear empty states for programmes and impact data.
- [x] Open a PR for user-facing form status or impact work.

## Week 4: Form and Programme Polish

- [ ] Polish contact page on mobile.
- [ ] Polish contact page on desktop.
- [ ] Polish volunteer page on mobile.
- [ ] Polish volunteer page on desktop.
- [ ] Polish newsletter signup on mobile and desktop.
- [ ] Polish programme page on mobile and desktop.
- [ ] Add/fix `name`, `type`, and `autocomplete` values on all form fields.
- [ ] Fix keyboard navigation issues so all forms can be completed without a mouse.
- [ ] Run manual QA for all forms.
- [ ] Open final polish PR.

## PR Checklist

- [ ] PR explains what changed.
- [ ] PR explains why it changed.
- [ ] PR explains how to test it.
- [ ] `bun run build` passes.
- [ ] Forms show loading, success, and error states.
- [ ] Mikhail reviewed if form security, data flow, payment provider, Convex, Clerk/auth, or admin behavior was touched.
- [ ] Mikhail is requested as final reviewer.
