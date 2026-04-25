# Team Working Agreements

## Team

Manager and final reviewer:

- Mikhail - owns highest-risk work, reviews code, approves scope, merges PRs, and owns final launch approval

Internship team:

- Yasar
- Khalid
- Muneeb
- Raheema
- Mustaf
- James
- Ahlaam

## Working Rules

- Work on feature branches only. Do not push directly to `main`.
- Branch names should use lowercase kebab-case, such as `feature/donation-checkout` or `fix/contact-validation`.
- Keep PRs focused. A PR should solve one feature, bug, or page.
- Every PR description must include what changed, why it changed, and how to test it.
- Payments, Convex, Clerk, authentication, admin access, database, and security-sensitive work belongs to Mikhail.
- Request review early when unsure, especially before changing shared types, data flows, form submissions, or donation UI.
- Do not edit generated files in `convex/_generated/`.
- Use server-side validation for form submissions, donations, payments, permissions, and admin actions.
- Do not trust client-side values for donation totals, permissions, payment status, or staff roles.
- Prefer small, clear components and keep business logic out of UI components.

## Testing Expectations

When changing behavior, write or update the closest meaningful test first where practical. If test-first is not practical, explain the reason in the PR and provide manual verification steps.

Minimum checks before opening a PR:

```bash
bun run lint
bun run build
```

High-risk areas need stronger verification:

- Donation checkout: Mikhail tests successful, cancelled, failed, and expired payments.
- Webhooks: Mikhail tests duplicate events, invalid signatures, mismatched amounts, and unknown references.
- Forms: test invalid input, rate limiting, and successful submissions.
- Admin: test unauthorized access and each staff role.
- Receipts: test receipt creation, retry behavior, and email failure handling.

## Workstream Ownership

Mikhail owns the highest-risk work. This includes all payment providers, Convex, Clerk, authentication, admin access, webhooks, donation reconciliation, receipts, production payment setup, final security approval, final merge approval, and launch approval.

Yasar and Khalid own product, frontend, content structure, accessibility, and QA work that does not require payment provider, Convex, or Clerk changes.

Yasar:

- Donation page user experience and donor journey copy
- Campaign detail layout, trust sections, and impact storytelling
- Accessibility review for public donation entry points
- Release QA checklist support

Khalid:

- Site navigation, public page structure, and reusable layout patterns
- About, programmes, policies, and content organization
- Form UX review for contact, volunteer, and newsletter pages
- Cross-page QA and broken-link review

Muneeb, Raheema, and Mustaf own feature work with clear backend/frontend boundaries.

Muneeb:

- Campaign listing page, campaign detail page, and donation entry points
- Campaign filters, featured appeals, and progress displays
- Public campaign UI using data interfaces approved by Mikhail

Raheema:

- Blog/news pages, event pages, and content detail layouts
- Search/filter UI for posts and events
- Technical SEO for public content pages, including metadata, canonicals, structured data, internal links, and content fallback behavior

Mustaf:

- Contact form, volunteer form, newsletter signup, and form status handling
- Impact/statistics sections and programme pages
- Validation messages and success/error user feedback

James and Ahlaam own UI, content, and QA tasks, then can move to larger page sections after review.

James:

- Footer, static charity information sections, FAQ page, and trust/safeguarding content
- Mobile spacing fixes and accessibility checks on simple components
- Image alt text, link labels, and copy cleanup

Ahlaam:

- About page, team/partners section, policy pages, and reusable content blocks
- Blog/event card polish and responsive layout checks
- Manual QA notes for mobile, tablet, and desktop

## Individual Task Files

- [Task index](./tasks/README.md)
