# Mustaf Tasks

Role: Forms, programmes, and impact owner  
Primary ownership: contact, volunteer, newsletter, programmes, impact sections, and form feedback.

## Setup Checklist

- [ ] Read `README.md`.
- [ ] Read `docs/CODEBASE_MAP.md`.
- [ ] Pull the latest `main` branch before starting work.
- [ ] Create a feature branch using `feature/<short-description>` or `fix/<short-description>`.
- [ ] Confirm you can run `bun run build`.
- [ ] Ask Mikhail before changing form security, rate limiting, data flows, Convex-related interfaces, admin permissions, payment provider flow, or Clerk/auth behavior.

## Week 1: Form and Programme Page Structure

- [ ] Review `src/app/api/contact/route.ts`.
- [ ] Review `src/app/api/newsletter/route.ts`.
- [ ] Review `src/app/api/volunteer/route.ts`.
- [ ] Review `src/lib/validation/forms.ts`.
- [ ] Review only the public form submission interface approved by Mikhail.
- [ ] Build `/contact` page shell.
- [ ] Build `/volunteer` page shell.
- [ ] Build `/newsletter` page or section shell.
- [ ] Build `/programmes` page shell.
- [ ] Open a PR for form and programme page structure.

## Week 2: Form Submission and Validation

- [ ] Connect contact form to the existing API route.
- [ ] Connect volunteer form to the existing API route.
- [ ] Connect newsletter signup to the existing API route.
- [ ] Show inline validation messages.
- [ ] Show success states after successful submission.
- [ ] Show error states after failed submission.
- [ ] Ensure form fields have labels.
- [ ] Ensure submit buttons show loading state after submit starts.
- [ ] Ensure invalid submissions do not clear all useful user input.
- [ ] Open a PR for form submission and validation.

## Week 3: Admin Lists and Impact Work

- [ ] Add or support user-facing contact submission status UI if assigned by Mikhail.
- [ ] Add or support user-facing volunteer application status UI if assigned by Mikhail.
- [ ] Add or support user-facing newsletter signup status UI if assigned by Mikhail.
- [ ] Review only the public impact data shape approved by Mikhail.
- [ ] Review `src/components/sections/Stats.tsx`.
- [ ] Improve impact/statistics sections where needed.
- [ ] Connect programme page to programme data where available.
- [ ] Add clear empty states for programmes and impact data.
- [ ] Open a PR for user-facing form status or impact work.

## Week 4: Form and Programme Polish

- [ ] Polish contact page on mobile.
- [ ] Polish contact page on desktop.
- [ ] Polish volunteer page on mobile.
- [ ] Polish volunteer page on desktop.
- [ ] Polish newsletter signup on mobile and desktop.
- [ ] Polish programme page on mobile and desktop.
- [ ] Check all form fields have useful `name`, `type`, and `autocomplete` values.
- [ ] Check all forms can be completed with keyboard navigation.
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
