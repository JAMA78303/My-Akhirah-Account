# Mikhail Tasks

Role: Manager, final reviewer, and owner of the hardest/highest-risk work  
Primary ownership: all payment providers, Convex, Clerk, authentication, admin access, webhooks, donation reconciliation, receipts, production payment setup, critical security approval, merges, and launch approval.

## Shared Product Contract

- [ ] Approve the shared header/footer route set: `/`, `/about`, `/campaigns`, `/programmes`, `/blog`, `/events`, `/faq`, `/contact`, `/volunteer`, `/newsletter`.
- [ ] Approve the donation CTA destination before interns wire donation entry points.
- [ ] Own every payment provider, Convex, Clerk/auth, admin, webhook, receipt, donor-data, and production-secret change.
- [ ] Keep intern PRs focused on public UI, content, QA, and approved data interfaces.
- [ ] Resolve cross-team conflicts before merging overlapping UI changes.

## Setup Checklist

- [x] Read `README.md`.
- [x] Read `docs/CODEBASE_MAP.md`.
- [x] Confirm the internship route map and ownership plan.
- [ ] Confirm all interns have access to the repo.
- [ ] Confirm no intern receives production secrets.
- [ ] Confirm sandbox credentials are available for local payment testing.
- [ ] Confirm branch protection and PR review rules are set on GitHub.
- [x] Confirm all Convex changes are owned by Mikhail.
- [x] Confirm all Clerk changes are owned by Mikhail.
- [x] Confirm all payment provider changes are owned by Mikhail.

## Week 1: Critical Flow Decisions

- [x] Write the exact donation checkout flow in `docs/project/PAYMENTS_PLAN.md`.
- [x] Add required donation fields to `docs/project/PAYMENTS_PLAN.md`.
- [x] Add supported launch currencies to `docs/project/PAYMENTS_PLAN.md`.
- [x] Add supported giving types to `docs/project/PAYMENTS_PLAN.md`.
- [x] Add campaign/fund selection behavior to `docs/project/PAYMENTS_PLAN.md`.
- [x] Add fee coverage behavior to `docs/project/PAYMENTS_PLAN.md`.
- [x] Add anonymous donation behavior to `docs/project/PAYMENTS_PLAN.md`.
- [x] Add donor message behavior to `docs/project/PAYMENTS_PLAN.md`.
- [ ] Define Donorbox integration approach.
- [x] Define Flutterwave integration approach.
- [ ] Define LaunchGood campaign-link approach if used.
- [ ] Define PayPal fallback approach if used.
- [x] Define Convex schema and data access requirements.
- [x] Define Clerk auth and admin access requirements.
- [ ] Confirm Flutterwave sandbox setup.
- [x] Confirm Flutterwave redirect URLs.
- [x] Confirm Flutterwave webhook URLs.
- [x] Confirm payment status states: pending, paid, failed, cancelled, expired, duplicate webhook, invalid webhook.
- [ ] Approve or request changes on Yasar's donor journey notes with written feedback.
- [ ] Approve or request changes on Khalid's navigation/content hierarchy notes with written feedback.
- [ ] Complete first-pass PR reviews for every intern with at least one actionable comment each.

## Week 2: Payment Checkout Implementation

- [x] Implement or harden donation intent creation.
- [ ] Implement or harden Donorbox integration if selected.
- [x] Implement or harden Flutterwave integration if selected.
- [ ] Implement or harden LaunchGood campaign links if selected.
- [ ] Implement or harden PayPal fallback if selected.
- [x] Implement or harden Convex queries, mutations, actions, schema, and webhooks.
- [x] Implement or harden Clerk auth, staff sync, and admin access.
- [x] Ensure donation amounts are calculated and validated server-side.
- [x] Ensure campaign and fund IDs are validated server-side.
- [x] Ensure currency is validated server-side.
- [x] Ensure client-side values are never trusted for payment status or totals.
- [x] Implement or harden Flutterwave checkout redirect creation.
- [ ] Implement clear failed payment state.
- [ ] Implement clear cancelled payment state.
- [ ] Implement clear expired payment state.
- [ ] Verify checkout behavior with Flutterwave sandbox.
- [ ] Ask Yasar to QA public donation entry points.
- [ ] Ask Khalid to QA navigation and public content flows.
- [ ] For every intern PR covering public pages, campaign pages, content pages, or forms, leave approve/request-changes feedback, verify the PR checklist, and merge only PRs that meet requirements.

## Week 3: Webhooks, Reconciliation, and Receipts

- [x] Implement or harden Flutterwave webhook signature verification.
- [x] Reject invalid webhook signatures.
- [x] Handle duplicate webhook events without duplicate donations.
- [x] Validate webhook amount against the original donation intent.
- [x] Validate webhook currency against the original donation intent.
- [x] Handle unknown payment references safely.
- [x] Record payment events for traceability.
- [x] Convert successful payment intents into completed donations.
- [x] Ensure receipt creation works after successful donation.
- [x] Ensure receipt retry behavior does not duplicate donations.
- [x] Ensure audit logs capture payment-critical changes.
- [x] Ensure Convex data flows are validated server-side.
- [x] Ensure Clerk/admin access checks are validated server-side.
- [ ] Test successful sandbox donation from checkout to receipt.
- [ ] Test failed payment flow.
- [ ] Test cancelled payment flow.
- [ ] Test duplicate webhook flow.
- [ ] Test invalid webhook signature flow.

## Week 4: Final Review and Launch Approval

- [ ] Close or merge all open PRs after final checklist validation.
- [ ] Confirm public pages are complete.
- [ ] Confirm donation checkout is complete.
- [x] Confirm webhook verification is complete.
- [x] Confirm receipt flow is complete.
- [x] Confirm admin access is protected.
- [x] Confirm donor data is not exposed publicly.
- [ ] Confirm environment variables are configured for production.
- [x] Confirm production secrets are not committed.
- [ ] Confirm payment provider remains in sandbox until final approval.
- [ ] Confirm production webhook URL is configured.
- [ ] Confirm production redirect URLs are configured.
- [ ] Confirm rollback plan.
- [ ] Confirm post-launch monitoring owner.
- [ ] Approve production deployment.
- [ ] Approve switch to live payment mode only after sandbox sign-off.

## Review Checklist for Intern PRs

- [ ] PR explains what changed.
- [ ] PR explains why it changed.
- [ ] PR explains how to test it.
- [ ] `bun run build` passes or the blocker is clearly explained.
- [ ] UI works on mobile and desktop when relevant.
- [ ] Server-side validation exists where relevant.
- [ ] No secrets or `.env` files are committed.
- [ ] Payment, webhook, donor data, auth, admin, Clerk, and Convex schema changes are owned and reviewed by Mikhail before merge.
- [ ] Intern PRs do not change payment provider, Convex, Clerk, auth, or admin files unless explicitly assigned by Mikhail.
- [ ] Scope is small enough to review safely.
