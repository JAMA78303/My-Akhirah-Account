---
last_mapped: 2026-05-05T00:00:00Z
---

# Codebase Map

## System Overview

**My Akhirah Account** — a Next.js 16 (App Router) charity/Islamic giving platform backed by Convex for backend logic and data. The frontend uses Tailwind CSS v4 and React 19. Auth is handled by Clerk (staff users). Payment processing integrates Flutterwave via webhook.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Convex · Clerk · Flutterwave

## Directory Guide

```
My-Akhirah-Account/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout, Montserrat font, metadata
│   │   ├── page.tsx                  # Homepage composition (server component)
│   │   ├── globals.css               # Global styles
│   │   ├── favicon.ico
│   │   ├── donate/                   # Donation page
│   │   │   └── page.tsx
│   │   ├── campaigns/                # Campaign listing + detail
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── api/                      # Route handlers for public writes
│   │       ├── contact/              # Contact form submission
│   │       ├── donations/checkout/   # Donation checkout flow
│   │       ├── newsletter/           # Newsletter subscription
│   │       └── volunteer/            # Volunteer application
│   ├── components/
│   │   ├── index.ts                  # Barrel export for all components
│   │   ├── layout/                   # Shell components
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/                 # Homepage section components
│   │   │   ├── Banner.tsx
│   │   │   ├── EmergencyBar.tsx
│   │   │   ├── GlobalReach.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── HeroQuickDonate.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   ├── Stats.tsx
│   │   │   └── TrustSection.tsx
│   │   └── cards/                    # Content card components
│   │       ├── BlogCard.tsx
│   │       ├── CampaignCard.tsx
│   │       ├── EventCard.tsx
│   │       ├── ImpactCard.tsx
│   │       └── StoryCard.tsx
│   └── lib/
│       ├── mockData.ts               # Fallback/mock data for homepage
│       ├── server/
│       │   ├── convex.ts             # Convex HTTP client helpers (query/mutation/action)
│       │   ├── homepage.ts           # Homepage data aggregation (Convex + fallback)
│       │   └── security.ts           # Server-side security utilities
│       └── validation/
│           └── forms.ts              # Form payload validation
├── convex/                           # Backend (Convex)
│   ├── schema.ts                     # Schema: 20+ tables with indexes and search
│   ├── http.ts                       # HTTP router: Flutterwave webhook, Clerk webhook
│   ├── auth.config.ts                # Clerk auth configuration
│   ├── crons.ts                      # Scheduled jobs
│   ├── _generated/                   # Auto-generated Convex API types
│   ├── lib/                          # Shared backend utilities
│   │   ├── auth.ts                   # Auth helpers
│   │   ├── donationRules.ts          # Donation business rules
│   │   ├── dtos.ts                   # Data transfer object types
│   │   ├── permissions.ts            # Role-based access control
│   │   ├── references.ts             # Reference number generators
│   │   └── validators.ts             # Convex value validators (enums)
│   └── Domain modules:
│       ├── admin.ts                  # Admin dashboard queries/mutations
│       ├── campaigns.ts              # Campaign CRUD and listing
│       ├── donations.ts              # Donation processing and allocation
│       ├── donationCheckoutData.ts   # Checkout session data
│       ├── donors.ts                 # Donor profile management
│       ├── events.ts                 # Event CRUD and listing
│       ├── forms.ts                  # Contact, volunteer, newsletter forms
│       ├── funds.ts                  # Fund management
│       ├── impact.ts                 # Impact metrics and snapshots
│       ├── media.ts                  # Media asset upload/management
│       ├── paymentCheckout.ts        # Payment checkout flow
│       ├── paymentEvents.ts          # Payment event processing
│       ├── payments.ts               # Payment management
│       ├── paymentWebhook.ts         # Flutterwave webhook handler
│       ├── posts.ts                  # Blog post CRUD and listing
│       ├── programs.ts               # Program management
│       ├── rateLimits.ts             # Rate limiting logic
│       ├── receiptDispatch.ts        # Receipt email dispatch
│       ├── receipts.ts               # Receipt management
│       ├── search.ts                 # Full-text search
│       ├── site.ts                   # Site settings and homepage config
│       └── staff.ts                  # Staff user management + Clerk webhook
├── public/                           # Static assets
│   ├── hero-bg.jpg
│   ├── Logo Png Black@3x.png
│   └── Logo Png White@3x.png
├── docs/
│   ├── CODEBASE_MAP.md               # This file
│   ├── DESIGN.md                     # Design system & UI conventions
│   ├── README.md                     # Docs index
│   ├── onboarding/                   # Onboarding guides
│   │   └── INTERN_SETUP_AND_GIT.md
│   ├── project/                      # Project planning
│   │   └── DELIVERY_PLAN.md
│   ├── team/                         # Team coordination
│   │   ├── WORKING_AGREEMENTS.md
│   │   └── tasks/                    # Per-team-member task tracking
│   └── review artifacts (PR6_REVIEW_BLOCKERS.txt, review-pr-5-comment.txt, etc.)
├── package.json                      # Dependencies: next, react, convex, tailwind
├── next.config.mjs                   # Next.js config (strict mode)
├── tailwind.config.js                # Tailwind configuration
├── postcss.config.mjs                # PostCSS config
├── tsconfig.json                     # TypeScript config
├── eslint.config.mjs                 # ESLint config
└── convex/                           # Convex project root
```

## Key Workflows

### Homepage Data Flow
1. `src/app/page.tsx` (server component) calls `getHomepageData()`
2. `src/lib/server/homepage.ts` fires 6 parallel Convex queries via `fetchConvexQuery()`
3. Convex returns published content; falls back to `mockData.ts` if empty or on error
4. Components render the aggregated `HomepagePayload`

### Public Write Flow
1. Client submits form to `src/app/api/<route>/route.ts`
2. Route handler validates payload via `src/lib/validation/forms.ts`
3. Server handler calls Convex mutation via `runConvexMutation()`

### Payment Flow
1. Client initiates checkout → `src/app/api/donations/checkout/`
2. Server creates donation intent via Convex mutation
3. Payment provider (Flutterwave) redirects for payment
4. Webhook posted to `convex/http.ts` → `handleFlutterwaveWebhook`
5. Payment event reconciled, donation marked complete, receipt queued

### Auth Flow
- Clerk manages user sessions
- Staff users synced via Clerk webhook → `convex/staff.ts:handleClerkUsersWebhook`
- Role-based permissions enforced in `convex/lib/permissions.ts`

## Data Model (Convex Tables)

| Table | Purpose | Key Indexes |
|-------|---------|-------------|
| `site_settings` | Key-value site config | `by_key` |
| `media_assets` | Uploaded images/media | `by_status` |
| `funds` | Giving funds | `by_slug` |
| `programs` | Charity programs | `by_slug` |
| `campaigns` | Fundraising campaigns | `by_slug`, `by_status`, `by_featured`, `by_fund_status`, search |
| `post_categories` | Blog categories | `by_slug` |
| `posts` | Blog posts | `by_slug`, `by_status_publishedAt`, `by_category_status_publishedAt`, search |
| `events` | Events | `by_slug`, `by_status_startsAt`, search |
| `impact_metrics` | Metric definitions | `by_slug` |
| `impact_snapshots` | Metric point-in-time values | `by_metric_capturedAt` |
| `donor_profiles` | Donor contact info | `by_email` |
| `donation_intents` | Pending donations | `by_reference`, `by_status_expiresAt` |
| `payment_events` | Webhook event log | `by_provider_event_id` |
| `donations` | Completed donations | `by_reference`, `by_donor_receivedAt`, `by_campaign_receivedAt` |
| `donation_allocations` | Fund allocation splits | `by_donation` |
| `receipts` | Tax receipts | `by_status_nextRetryAt` |
| `newsletter_subscribers` | Email list | `by_email` |
| `contact_submissions` | Contact form entries | `by_status_createdAt` |
| `volunteer_applications` | Volunteer signups | `by_status_createdAt` |
| `staff_users` | Internal staff (Clerk-synced) | `by_clerk_user_id`, `by_email` |
| `audit_logs` | Change audit trail | `by_entity` |
| `system_jobs` | Background job queue | `by_status_runAfter` |
| `request_limits` | Rate limiting | `by_route_ip` |

## Known Risks

- **Mock data fallback**: `homepage.ts` silently falls back to `mockData.ts` on Convex errors — production should alert on fallback usage.
- **Partial route coverage**: `/donate` and `/campaigns` (including `[slug]`) are implemented. `/blog`, `/events`, `/about`, and other href targets are not yet implemented.
- **Non-pristine worktree**: Active development in progress; avoid broad refactors outside backend and homepage data integration.
- **Generated files**: `convex/_generated/` is auto-generated — do not hand-edit.
