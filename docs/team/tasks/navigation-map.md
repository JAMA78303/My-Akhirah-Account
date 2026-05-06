# Navigation & public route map

Owner: Khalid (Week 1 — public structure planning).  
Last updated: 2026-05-01.

This document is the single source of truth for **header/footer routes**, **homepage section order**, and **policy placeholders** pending final copy from Mikhail.

---

## Shared product route set (header + footer)

These URLs are the **only** primary destinations we ship in global navigation (aligned with `KHALID_TASKS.md`):

| Route | Purpose |
|-------|---------|
| `/` | Homepage |
| `/about` | Mission, story, trust |
| `/campaigns` | Appeal listings & campaign detail (slugs TBD per CMS) |
| `/programmes` | Long-running programme areas & programme detail |
| `/blog` | Articles & updates |
| `/events` | Events calendar & event detail |
| `/faq` | Frequently asked questions |
| `/contact` | Contact options & enquiry (form polish Week 3) |
| `/volunteer` | Volunteer information & application entry |
| `/newsletter` | Dedicated signup context + form |

**Policies (legal):** `/privacy`, `/terms` (linked from footer **Legal**). FAQ lives at `/faq` (not only inside legal).

**Giving:** `/donate` and `/donate/success` are used by CTAs and the payments checkout return URLs. **Final donation destination rules** (e.g. hosted checkout vs campaign-only) are **owned by Mikhail** — do not change payment/Convex code without review.

**Deferred (removed from global nav until product approves pages):** `/team`, `/careers`, `/partners`, `/fundraise`, `/zakat`, `/projects` as a **top-level** nav label (programme content uses `/programmes`).

---

## Header — main navigation (desktop + mobile)

Order left → right (same labels everywhere):

| # | Label | URL |
|---|--------|-----|
| 1 | Home | `/` |
| 2 | About | `/about` |
| 3 | Campaigns | `/campaigns` |
| 4 | Programmes | `/programmes` |
| 5 | Blog | `/blog` |
| 6 | Events | `/events` |
| 7 | FAQ | `/faq` |
| 8 | Contact | `/contact` |
| 9 | Volunteer | `/volunteer` |
| 10 | Newsletter | `/newsletter` |

Mobile drawer ends with primary **Donate** CTA → `/donate` (unchanged behaviour).

---

## Footer — column map

| Column title | Links (label → URL) |
|--------------|---------------------|
| **Discover** | Campaigns → `/campaigns`, Programmes → `/programmes`, Blog → `/blog`, Events → `/events`, FAQ → `/faq` |
| **Organisation** | About → `/about`, Contact → `/contact`, Volunteer → `/volunteer`, Newsletter → `/newsletter` |
| **Get involved** | Donate → `/donate` |
| **Legal** | Privacy → `/privacy`, Terms → `/terms`, FAQ → `/faq` |

**Transparency strip (above columns):** three tiles are lightweight entry points until governance PDFs exist:

| Tile | Current link | Copy / asset owner |
|------|----------------|---------------------|
| Governance | `/privacy` | Mikhail: board structure, policies index, PDFs or Notion links |
| Annual reports | `/terms` | **Placeholder routing** — replace with `/reports` or dedicated URL when reports ship; body copy TBD |
| Safeguarding | `/faq` | **Placeholder** — should become `/safeguarding` or FAQ section with reporting routes; copy TBD |

> **Blocker for Mikhail:** confirm final URLs for reports & safeguarding (keep or replace placeholders above).

**Social icons:** still generic network roots (`facebook.com`, etc.) — replace with **real organisation profiles** when marketing supplies URLs.

---

## Homepage — section order (ship target)

Order top → bottom (matches `src/app/page.tsx`):

1. **Hero** — Convex-backed title, imagery, primary/secondary CTAs (secondary may point to `/about` or programmes; primary stays donation-aligned per Mikhail).
2. **Stats** — impact numbers strip.
3. **Emergency bar** — featured appeal + two secondary cards (mock CTAs → `/donate` until Convex drives hrefs).
4. **Latest updates** — blog cards; “View all” → `/blog`.
5. **Banner** — Convex banner (e.g. Palestine/Sudan) when present.
6. **Where your giving goes** — impact/programme cards; “View all” → `/programmes`.
7. **Upcoming events** — event cards; “View all” → `/events`.
8. **Banner** — collections/fundraise when present.
9. **Active appeals** — campaign cards; “View all” → `/campaigns`.
10. **Trust** — three trust pillars (mock; no outbound links yet).
11. **Global reach** — map band.
12. **Banner** — “Our story” when present.

Footer is global (newsletter form + link columns).

---

## Policy page content requirements

| Page | Must include (high level) | Status |
|------|---------------------------|--------|
| `/privacy` | Data controller, lawful basis, cookies, donor data, retention, rights, contact for privacy | Placeholder outline until legal copy |
| `/terms` | Use of site, donations disclaimer, liability limits, governing law | Placeholder outline until legal copy |
| `/faq` | Zakat, eligibility, fees, receipt timing, safeguarding pointer | Structure only; answers TBD |

**Missing from Mikhail / legal:** final statutory wording, charity registration numbers, registered address, ICO registration if applicable, cookie policy granularity, refund/chargeback policy cross-links to Flutterwave terms.

---

## Dynamic slugs (blog, events, campaigns, programmes)

Detail URLs follow:

- `/blog/[slug]`
- `/events/[slug]`
- `/campaigns/[slug]`
- `/programmes/[slug]`

Until CMS-driven pages exist, each slug renders a **thin placeholder** (“Content coming soon”) so internal links from cards do not 404.

---

## Changelog (implementation)

- **2026-05-01:** Initial map + route implementation in app router `(site)` group, header/footer alignment, homepage `viewAllHref` fix (`/projects` → `/programmes`), mock impact card hrefs → `/programmes/...`, homepage fallback banner CTA (`/fundraise` → `/campaigns`), default hero secondary CTA (`/zakat` → `/faq`). Convex-backed homepage copy may still override these when present in the database.
