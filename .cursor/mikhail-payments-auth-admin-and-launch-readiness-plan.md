# Mikhail Payments, Auth, Admin, and Launch Readiness Plan

## Summary

Build the production-critical donation system around `/donate` with a multi-provider payment architecture:

- **Primary provider:** Donorbox
- **Secondary local hosted checkout:** Flutterwave
- **Fallback provider:** PayPal
- **Campaign-specific external links:** LaunchGood
- **Launch currencies:** `GBP`, `USD`, `EUR`, `GHS`
- **Giving frequency:** one-off donations only for this phase
- **Admin scope:** full admin system
- **Backend:** Convex remains the source of truth for donation intents, payment events, donations, receipts, staff, audit logs, campaigns, funds, and admin access.
- **Auth:** Clerk remains the staff identity provider.

This plan treats `docs/team/tasks/MIKHAIL_TASKS.md` as the ownership checklist and turns it into implementation work across documentation, backend contracts, provider integrations, admin, verification, and launch approval.

## Current State

Observed repo state:

- `docs/project/PAYMENTS_PLAN.md` does not exist yet.
- `/donate` is already the common CTA target in current UI.
- Existing payment implementation is Flutterwave-first:
  - API entry: `src/app/api/donations/checkout/route.ts`
  - Checkout action: `convex/paymentCheckout.ts`
  - Webhook handler: `convex/paymentWebhook.ts`
  - Donation state: `convex/donations.ts`
  - Payment event log: `convex/paymentEvents.ts`
- Existing `PAYMENT_PROVIDERS` only allows `flutterwave`.
- Existing donation intent statuses are `created`, `checkout_created`, `completed`, `failed`, `expired`, `abandoned`.
- Existing code does not yet validate paid webhook amount/currency against the original intent before completing donations.
- No test harness config was found.
- `python3 ~/.agents/scripts/validate_agent_policy.py` was blocked by the local AI-flow hook during planning.

## Phase 1: Decision Document and Shared Contract

Create `docs/project/PAYMENTS_PLAN.md` as the canonical task brief before production edits.

The document must define:

- Approved donation CTA destination: `/donate`
- Launch currencies: `GBP`, `USD`, `EUR`, `GHS`
- Giving types:
  - `zakat`
  - `sadaqah`
  - `lillah`
  - `kaffarah`
  - `fidyah`
  - `qurbani`
  - `general`
- Giving frequency:
  - one-off only
  - monthly/recurring explicitly out of scope
- Required donor fields:
  - full name
  - email
  - optional phone
  - optional country
  - optional city
  - currency
  - consent for transactional email
  - optional marketing consent
- Donation fields:
  - amount in minor units
  - currency
  - giving type
  - fund ID
  - optional campaign ID
  - cover-fees flag
  - anonymous-public flag
  - optional donor message
  - selected provider
- Provider roles:
  - Donorbox primary
  - Flutterwave secondary hosted checkout
  - PayPal fallback
  - LaunchGood external campaign-link only
- Payment status model:
  - `created`
  - `checkout_created`
  - `pending`
  - `completed`
  - `failed`
  - `cancelled`
  - `expired`
  - `abandoned`
  - `duplicate_webhook`
  - `invalid_webhook`
- Non-goals:
  - recurring donations
  - client-side total calculation
  - client-side payment status trust
  - production live-mode switch before sandbox sign-off

Also add intern-facing guidance:

- Public UI PRs may link to `/donate`.
- Interns must not change payment provider, Convex schema, Clerk, auth, admin, webhook, receipt, or donor-data logic without Mikhail approval.

## Phase 2: Domain Contracts and Ubiquitous Language

Add or update `docs/GLOSSARY.md` with these project terms:

- Donation CTA
- Donation Entry
- Donation Intent
- Hosted Checkout
- Payment Provider
- Payment Event
- Payment Reference
- Donor Profile
- Completed Donation
- Donation Allocation
- Receipt
- Staff User
- Admin Access
- Campaign Link
- Launch Currency
- Provider Fallback

Use the same terms in docs, tests, types, admin UI labels, PR review comments, and API names.

## Phase 3: Payment Provider Data Model

Update Convex provider/status contracts.

Change `convex/lib/validators.ts`:

- Expand `PAYMENT_PROVIDERS` to:
  - `donorbox`
  - `flutterwave`
  - `paypal`
  - `launchgood`
- Expand donation intent statuses to include:
  - `pending`
  - `cancelled`
- Add payment processing outcomes for traceability:
  - keep `processed`, `ignored`, `failed`
  - add `duplicate`
  - add `invalid_signature`
  - add `unknown_reference`
  - add `amount_mismatch`
  - add `currency_mismatch`

Update `convex/schema.ts`:

- `donation_intents`
  - add `selectedProvider`
  - keep `provider` only if used as the active checkout provider, otherwise migrate to `selectedProvider`
  - add optional `providerCheckoutUrl`
  - add optional `providerSessionId`
  - add optional `providerPaymentId`
  - add optional `cancelledAt`
  - add optional `lastWebhookEventId`
- `payment_events`
  - add optional `signatureVerified`
  - add optional `rawProviderStatus`
  - add optional `providerPaymentId`
  - add optional `amountMinor`
  - add optional `currency`
  - keep `payloadJson`
- Add indexes where needed:
  - donation intents by provider/session ID
  - payment events by provider/payment ID if provider APIs require lookup

Regenerate Convex types after schema changes using the repo’s existing Convex workflow.

## Phase 4: Checkout API Contract

Keep the public entrypoint:

- `POST /api/donations/checkout`

Request source remains `FormData` for current UI compatibility.

Add or enforce these accepted fields:

- `fullName`
- `email`
- `phone`
- `country`
- `city`
- `fundId`
- `campaignId`
- `givingType`
- `amountMinor`
- `currency`
- `coverFees`
- `isAnonymousPublic`
- `messageToCharity`
- `selectedProvider`

Server-side rules:

- Reject unsupported currency unless it is one of `GBP`, `USD`, `EUR`, `GHS`.
- Reject unsupported provider unless it is one of `donorbox`, `flutterwave`, `paypal`, `launchgood`.
- Reject recurring/monthly values for this phase.
- Validate amount as positive integer minor units.
- Validate campaign/fund relationship in Convex.
- Validate giving type compatibility with fund in Convex.
- Never trust client-side totals or payment status.
- Rate-limit checkout creation by hashed IP.
- Return a provider-agnostic response shape:

```ts
type CheckoutResponse = {
  requestId: string;
  reference: string;
  provider: "donorbox" | "flutterwave" | "paypal" | "launchgood";
  checkoutUrl: string;
  status: "checkout_created" | "pending";
};
```

## Phase 5: Provider Integration Layer

Introduce a provider abstraction in Convex or server-side code.

Suggested files:

- `convex/lib/paymentProviders.ts`
- `convex/paymentCheckout.ts`
- optional provider modules:
  - `convex/paymentProviders/donorbox.ts`
  - `convex/paymentProviders/flutterwave.ts`
  - `convex/paymentProviders/paypal.ts`
  - `convex/paymentProviders/launchgood.ts`

Required interface:

```ts
type CreateCheckoutInput = {
  intentId: Id<"donation_intents">;
  reference: string;
  amountMinor: number;
  currency: "GBP" | "USD" | "EUR" | "GHS";
  donorEmail: string;
  donorName: string;
  donorPhone?: string;
  fundId: Id<"funds">;
  campaignId?: Id<"campaigns">;
  givingType: GivingType;
  messageToCharity?: string;
  successUrl: string;
  cancelUrl: string;
};

type CreateCheckoutResult = {
  provider: PaymentProvider;
  providerSessionId?: string;
  providerPaymentId?: string;
  checkoutUrl: string;
  status: "checkout_created" | "pending";
};
```

Provider behavior:

- Donorbox:
  - Primary provider.
  - Generate/resolve a Donorbox campaign/form checkout URL.
  - Persist the Donorbox reference mapping in `donation_intents`.
  - If Donorbox webhook support is available in the account, process webhooks into `payment_events`; otherwise document manual reconciliation as a launch risk.
- Flutterwave:
  - Keep existing hosted checkout flow.
  - Add currency allowlist.
  - Keep `tx_ref` as the canonical payment reference.
  - Keep webhook verification via `FLUTTERWAVE_WEBHOOK_HASH`.
- PayPal:
  - Fallback checkout URL creation.
  - Use provider transaction/order ID for reconciliation.
  - Add webhook validation if PayPal webhook is enabled.
- LaunchGood:
  - External campaign-link only.
  - Do not mark local donations completed automatically unless LaunchGood webhook/API reconciliation is explicitly configured.
  - Store outbound references where possible for later reconciliation.

## Phase 6: Donation Reconciliation Hardening

Update `convex/donations.ts`.

Required behavior:

- `markIntentCompleted` must compare paid amount and currency to the original intent before creating a completed donation.
- If amount mismatches:
  - do not create a donation
  - mark event outcome `amount_mismatch`
  - keep the intent in a non-completed failure/review state
- If currency mismatches:
  - do not create a donation
  - mark event outcome `currency_mismatch`
- If intent reference is unknown:
  - record payment event as `unknown_reference`
  - return safely without throwing to the provider
- Duplicate webhook:
  - no duplicate donation
  - no duplicate allocation
  - no duplicate receipt
  - record duplicate outcome
- Expired intent:
  - do not complete automatically
  - record as failed/review-needed unless product policy says otherwise
- Completed intent:
  - return existing completed donation ID and `alreadyProcessed: true`

## Phase 7: Webhook Architecture

Refactor provider webhook handling into provider-specific handlers.

Routes:

- Existing Convex HTTP route for Flutterwave stays active.
- Add routes for Donorbox and PayPal if credentials/webhook docs are confirmed.
- LaunchGood webhook route only if LaunchGood supports the chosen campaign integration.

Each webhook handler must:

- Verify signature or shared secret before parsing into trusted payment state.
- Store raw payload in `payment_events`.
- Record invalid signatures without exposing sensitive data.
- Never create a donation before amount/currency/reference validation.
- Return provider-friendly success responses for duplicate/ignored events.
- Return `401` for invalid signatures.
- Return `202` for unknown references or ignored events.

## Phase 8: Receipts

Harden receipt flow around idempotency.

Files:

- `convex/receipts.ts`
- `convex/receiptDispatch.ts`
- `convex/donations.ts`

Required behavior:

- Receipt creation only happens after a completed donation exists.
- Receipt queue retries must not create duplicate donations.
- Receipt retry must use the existing receipt row where present.
- Receipt status remains one of:
  - `queued`
  - `sent`
  - `failed`
- Add audit/payment event trace from completed donation to receipt.
- Keep provider-specific receipt references out of public UI unless explicitly approved.

## Phase 9: Clerk, Staff, Permissions, and Full Admin

Harden Clerk and build full admin.

Auth/backend requirements:

- Keep Clerk as staff identity provider.
- Require server-side domain access checks for every admin query/mutation.
- No admin access based on client-side role flags.
- Clerk webhook must reject unauthorized requests.
- Staff roles remain:
  - `super_admin`
  - `content_editor`
  - `fundraising_ops`
  - `supporter_care`

Admin UI scope:

- Add protected admin route group, for example:
  - `src/app/admin/layout.tsx`
  - `src/app/admin/page.tsx`
  - `src/app/admin/donations/page.tsx`
  - `src/app/admin/payment-events/page.tsx`
  - `src/app/admin/receipts/page.tsx`
  - `src/app/admin/campaigns/page.tsx`
  - `src/app/admin/funds/page.tsx`
  - `src/app/admin/staff/page.tsx`
  - `src/app/admin/audit/page.tsx`
- Admin capabilities:
  - dashboard summary
  - list/search donations
  - list payment events and processing outcomes
  - inspect webhook failures
  - list/retry failed receipts
  - manage campaign/fund metadata
  - manage staff roles
  - view audit logs
- Use Convex as the admin data boundary.
- Use Clerk session checks plus Convex role checks.
- Add audit logs for:
  - staff role changes
  - campaign/fund changes
  - payment-critical manual actions
  - receipt retry actions
  - provider configuration changes if represented in app state

## Phase 10: Public Donation UI Alignment

Keep `/donate` as the approved destination.

Implement or align:

- `/donate`
- `/donate/success`
- `/donate/cancelled` or `/donate?cancelled=true`
- clear failed payment state
- clear cancelled payment state
- clear expired payment state

Donation UI must:

- submit to `POST /api/donations/checkout`
- pass `selectedProvider`
- support currencies `GBP`, `USD`, `EUR`, `GHS`
- support giving types from the Convex validator
- show one-off only
- include fee coverage, anonymous donation, donor message
- never calculate trusted totals client-side
- use server response checkout URL for redirect
- preserve accessibility:
  - labels for every form field
  - visible focus states
  - semantic buttons/links
  - mobile 44px minimum touch targets

## Phase 11: Environment and Secret Contract

Document required env vars in `.env.example` and `docs/project/PAYMENTS_PLAN.md`.

Expected variables:

```bash
# Convex
CONVEX_URL=
CONVEX_DEPLOYMENT=

# Clerk
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_WEBHOOK_SECRET=

# Flutterwave
FLUTTERWAVE_SECRET_KEY=
FLUTTERWAVE_WEBHOOK_HASH=

# Donorbox
DONORBOX_API_KEY=
DONORBOX_WEBHOOK_SECRET=
DONORBOX_BASE_URL=

# PayPal
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_WEBHOOK_ID=
PAYPAL_ENVIRONMENT=sandbox

# LaunchGood
LAUNCHGOOD_BASE_URL=
```

Rules:

- No production secrets committed.
- Sandbox mode until explicit launch approval.
- Production redirect URLs and webhook URLs must be documented before live switch.
- Provider live-mode switch is a launch checklist item, not part of normal implementation.

## Phase 12: Test-First Implementation Strategy

Because behavior changes are payment-critical, use TDD evidence.

Before production edits:

- Record RED evidence with:
  - `python3 ~/.agents/scripts/tdd_evidence.py record-red ...`
- After passing implementation:
  - `python3 ~/.agents/scripts/tdd_evidence.py record-green ...`

If the local test harness does not exist, first add a minimal test setup.

Recommended test setup:

- Use Vitest for pure validation and provider-contract tests.
- Add tests for server parsing/validation where practical.
- Add Convex-focused tests for donation/payment business rules if project tooling supports it.
- Use Playwright later for critical donation/admin UI flows once routes exist.

Minimum test cases:

Checkout validation:

- rejects unsupported currency
- accepts `GBP`, `USD`, `EUR`, `GHS`
- rejects unsupported provider
- rejects recurring/monthly donation for this phase
- rejects invalid giving type
- rejects invalid amount
- creates intent with server-side amount/currency/provider validation

Provider checkout:

- Donorbox primary returns provider-agnostic checkout response
- Flutterwave fallback returns provider-agnostic checkout response
- PayPal fallback returns provider-agnostic checkout response
- LaunchGood returns external campaign URL and does not mark donation complete automatically

Webhook/reconciliation:

- invalid signature returns `401`
- duplicate event does not duplicate donation
- successful event completes exactly one donation
- unknown reference is recorded safely
- amount mismatch does not complete donation
- currency mismatch does not complete donation
- failed provider status marks intent failed
- cancelled provider status marks intent cancelled
- expired intent is not completed automatically

Receipts:

- completed donation queues one receipt
- duplicate webhook does not queue second receipt
- failed receipt retry does not create duplicate donation
- successful receipt marks donation receipt status

Admin/auth:

- unauthenticated admin access denied
- suspended staff denied
- role without permission denied
- `fundraising_ops` can access donation/payment admin
- `content_editor` cannot access payment-critical actions
- `super_admin` can manage staff roles
- staff role changes write audit logs

Frontend/browser:

- `/donate` renders on mobile and desktop
- donation form has labels and keyboard focus
- provider/currency selection works
- submit redirects only from server-provided checkout URL
- success/cancel/failure states render correctly
- admin routes require auth

Verification commands:

```bash
bun run build
bun run lint
bun test
```

If `bun test` is not configured, add a test script and run the configured equivalent.

## Phase 13: Intern PR Review Operating Plan

For each intern PR:

- Confirm PR explains:
  - what changed
  - why it changed
  - how to test
- Run or verify `bun run build`.
- Check mobile/desktop UI where relevant.
- Confirm all donation CTAs point to `/donate`.
- Block PRs that alter:
  - payment providers
  - Convex schema
  - Clerk/auth
  - admin access
  - webhooks
  - donor data
  - receipts
  - payment status logic
- Leave at least one actionable comment per first-pass review.
- Merge only focused PRs that meet the checklist.

## Phase 14: Launch Approval Checklist

Before production deployment:

- Public pages complete.
- `/donate` complete.
- Donorbox primary checkout configured.
- Flutterwave sandbox checkout verified.
- PayPal sandbox fallback verified.
- LaunchGood campaign links verified if used.
- Webhook signature verification complete.
- Duplicate webhook handling complete.
- Amount/currency validation complete.
- Receipt flow complete.
- Full admin routes protected.
- Donor data not exposed publicly.
- Production secrets not committed.
- Production env vars configured outside repo.
- Provider mode remains sandbox until final approval.
- Production redirect URLs configured.
- Production webhook URLs configured.
- Rollback plan documented.
- Post-launch monitoring owner documented.
- Mikhail approves production deployment.
- Mikhail approves live payment mode only after sandbox sign-off.

## Assumptions and Defaults

- Ghanaian currency means ISO currency code `GHS`.
- `/donate` is the only approved donation CTA destination for intern work.
- One-off donations only; monthly/recurring is out of scope.
- Donorbox is primary even though current code is Flutterwave-first.
- Flutterwave remains supported because the repo already has checkout and webhook infrastructure.
- PayPal is fallback, not the default visible provider unless Donorbox/Flutterwave cannot be used.
- LaunchGood is external campaign-link support, not local automatic reconciliation unless webhook/API capability is confirmed.
- Full admin system includes donation/payment/receipt/staff/campaign/fund/audit surfaces, but public content CRUD can be phased if needed after payment-critical admin is complete.
- No production live-mode switch happens during implementation without explicit approval.
