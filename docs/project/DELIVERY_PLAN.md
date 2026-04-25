# 1 Month Delivery Plan

This plan runs from Saturday, April 25, 2026 to Friday, May 22, 2026.

## Week 1: Foundation and Page Structure

Goal: make the repo easy to work on and complete the public website skeleton.

Payment and platform tasks:

- Mikhail: own payment provider decisions and define the exact checkout flow.
- Mikhail: own Convex, Clerk, auth, admin access, webhook, and receipt requirements.
- Yasar: map the donor journey from homepage to donation entry points.
- Khalid: map public navigation, content hierarchy, and policy page requirements.

Feature tasks:

- Muneeb: build `/campaigns` and `/campaigns/[slug]` page structure.
- Raheema: build `/blog`, `/blog/[slug]`, `/events`, and `/events/[slug]` page structure with clean URL and heading patterns.
- Mustaf: build `/contact`, `/volunteer`, `/newsletter`, and `/programmes` page structure.

Content and QA tasks:

- James: build `/faq`, footer improvements, and trust/safeguarding content sections.
- Ahlaam: build `/about`, policy page shells, and reusable content layout blocks.

Manager checkpoints:

- Approve navigation and route map.
- Review first PR from every intern.
- Confirm page ownership and coding standards.

## Week 2: Core Features and Content Workflows

Goal: connect real data and complete normal user journeys except final payment hardening.

Payment and platform tasks:

- Mikhail: implement or harden payment provider setup, Convex data flows, Clerk access, donation validation, checkout states, and receipt requirements.
- Yasar: improve donation page UX, campaign detail layout, and donor trust content.
- Khalid: improve public page layouts, navigation, policy pages, and reusable content patterns.

Feature tasks:

- Muneeb: connect campaign UI to data interfaces approved by Mikhail, add filters, campaign progress, and donate CTAs.
- Raheema: connect post/event UI to data interfaces approved by Mikhail, add search/filter behavior, technical SEO metadata, and polish detail pages.
- Mustaf: connect forms to existing API routes, improve validation display, and add success/error states.

Content and QA tasks:

- James: add FAQ content, donor trust sections, accessibility labels, and responsive footer checks.
- Ahlaam: add about/policy content, partner sections, and responsive checks for cards.

Manager checkpoints:

- Review campaign, blog, event, and form flows.
- Confirm copy accuracy for charity work in Africa.
- Confirm that all public forms have validation and clear user feedback.

## Week 3: Payments, Admin, Receipts, and QA

Goal: finish high-risk flows and make the project testable end to end.

Payment and platform tasks:

- Mikhail: harden payment providers, webhook verification, duplicate handling, amount/currency checks, Convex flows, Clerk access, receipt creation, and audit logs.
- Yasar: run public donor journey QA and improve donation entry point copy.
- Khalid: run cross-page navigation, forms UX, and content QA.

Feature tasks:

- Muneeb: add donation UI states for one-off amount selection, campaign/fund selection, fee coverage, anonymous donation, and donor message.
- Raheema: add loading, empty, and error states across content pages; verify technical SEO for blog and event pages.
- Mustaf: polish contact, volunteer, newsletter, programme, and impact user-facing flows.

Content and QA tasks:

- James: run manual QA on mobile and desktop for homepage, campaigns, FAQ, footer, and donation entry points.
- Ahlaam: run manual QA on about, policies, blog, events, cards, and forms; log issues clearly.

Manager checkpoints:

- Test sandbox donation flow from start to receipt.
- Review payment, Convex, Clerk, and admin access work carefully.
- Confirm admin permissions cannot be bypassed from the client.

## Week 4: Production Polish and Launch

Goal: stabilize, deploy, and prepare the charity website for real donors.

Payment and platform tasks:

- Mikhail: complete production payment checklist, Convex configuration, Clerk configuration, webhook configuration, receipt reliability checks, and final deployment approval.
- Yasar: complete donor journey QA, accessibility QA, and campaign/donation page polish.
- Khalid: complete navigation QA, content QA, policy page review, and broken-link review.

Feature tasks:

- Muneeb: polish campaign pages, donation entry points, and campaign empty states.
- Raheema: polish blog/events, metadata, canonicals, structured data, internal links, and search behavior.
- Mustaf: polish forms, impact sections, programme pages, and confirmation messages.

Content and QA tasks:

- James: final content pass for spelling, broken links, image alt text, and simple accessibility checks.
- Ahlaam: final responsive QA pass across mobile, tablet, and desktop; verify policy/about pages.

Manager checkpoints:

- Run final review on all critical flows.
- Approve production deployment.
- Confirm payment provider is in live mode only after sandbox sign-off.
- Confirm launch rollback plan and post-launch monitoring owner.

## Definition of Done

A feature is done when:

- It works on mobile and desktop.
- It handles loading, empty, success, and error states where relevant.
- It validates user input on the server.
- It does not expose secrets or trust client-only values.
- It has been reviewed by Mikhail when it touches payments, Convex, Clerk, auth, admin, donor data, or schema changes.
- It passes the relevant build/lint checks.
- The PR includes clear testing notes.

## Launch Checklist

- Public pages complete: homepage, about, campaigns, campaign detail, programmes, blog, events, FAQ, contact, volunteer, policies.
- Donation checkout complete with Flutterwave sandbox evidence.
- Webhook verification complete and tested against duplicate/invalid events.
- Receipts generated and delivered or queued for retry.
- Admin access protected with Clerk and role checks owned by Mikhail.
- Staff can manage campaigns, content, forms, and impact data.
- Donor data is handled carefully and not exposed in public pages.
- SEO metadata and social sharing images are set for key pages.
- Accessibility basics checked: labels, headings, focus states, contrast, alt text.
- Production environment variables configured.
- Production deployment tested.
- Manager approves final release.
