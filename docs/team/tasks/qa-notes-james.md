# QA notes — James (Week 3)

Owner: James (FAQ, footer, trust content, and manual QA).  
Cycle: Week 3 — Manual QA for assigned pages.  
Branch: `feature/week3-qa-james` (off `main` @ a99a2c4).  
Reference: `docs/team/tasks/JAMES_TASKS.md` (Week 3), `docs/team/tasks/navigation-map.md`, `docs/DESIGN.md`.

This document is the working log for Week 3. Every issue found during the QA pass is logged in the tables below with **page URL, device, reproduction steps, expected result, and owner** as required by `JAMES_TASKS.md`.

## Pre-flight (run before each push)

- [x] `bun run build` passes locally on `feature/week3-qa-james` (Next.js 16.1.6 Turbopack, 21 routes, no TS/compile errors).
- [x] `bun run build` re-checked after in-scope FAQ fixes (`faq/page.tsx` accordion, anchors, trust link, jump nav) and after `qa-notes-james.md` updates — **still green** (Next.js 16.1.6 Turbopack, 21 routes, no TS/compile errors).

## Re-verification scope

`JAMES_TASKS.md` currently marks two Week 3 items `[x]`:
- *Click every footer link and fix broken links in your scope.*
- *Click every donation entry point link you can see and report any link that does not go to Mikhail-approved destination.*

**Treat both as not done for this cycle.** The 8 commits that merged into `main` after those boxes were ticked added new form components (`ContactForm`, `VolunteerForm`, `NewsletterPageForm`, `PageShell`) and may have shifted link targets, so the footer link sweep (§4) and donation entry point sweep (§5) below are re-run from scratch and their statuses are kept `open` until clicked again.

## Known route/spec mismatches to remember while testing

These are deliberate discrepancies between `JAMES_TASKS.md` line 30, `navigation-map.md`, and the currently-shipped routes from `bun run build`. **Do not silently "fix" the footer to match the task list — log them.**

| Spec says | Footer.tsx wires | Built routes (from `next build`) | Treatment during QA |
|-----------|------------------|-----------------------------------|---------------------|
| `/privacy-policy` (`JAMES_TASKS.md` line 30) | `/privacy` | `/privacy` only — `/privacy-policy` is **not** built | Footer is correct; `JAMES_TASKS.md` line 30 is stale. Log to Khalid/Mikhail as a doc-vs-code spec drift, do not retarget footer. |
| `/safeguarding` (`JAMES_TASKS.md` line 30 and Transparency strip target per `navigation-map.md`) | Safeguarding tile points to `/faq` placeholder; no Safeguarding row in any footer column | **not built** | Route-level blocker for Mikhail. Confirms the transparency-strip Safeguarding placeholder is route-blocking, not just copy-blocking. |
| Transparency strip placeholders (`/privacy`, `/terms`, `/faq`) | matches | yes, all built | OK to click; navigate-and-confirm only, then flag for Mikhail per `navigation-map.md` (governance/annual-reports/safeguarding final URLs). |
| Social URLs | generic `facebook.com`, `twitter.com`, `instagram.com`, `youtube.com` | external | Out of scope to fix; log against marketing/Mikhail per `navigation-map.md`. |

---

## Scope guard

- Only execute Week 3 tasks. Do not start Week 4 yet.
- **Fix in scope (James):** FAQ, footer, trust/safeguarding content, simple text/spacing tidy-ups on pages I own.
- **Do not fix — log and assign:** payments, Convex, Clerk/auth, admin, campaign cards, programme cards, blog/events, forms internals, hero copy/imagery, donation routing.
- Final donation destination is owned by **Mikhail** — flag any donation CTA that does not match an approved destination as a blocker, do not silently retarget it.

## Owner lookup (for the "Owner" column)

| Area | Owner |
|------|-------|
| Header, public route structure, broken-link sweep, cross-page QA | Khalid |
| Hero, stats, latest updates, banners, global reach, homepage section order (Convex-backed copy) | Khalid + Mikhail (copy) |
| Campaigns list, campaign detail, donation entry points, "Active appeals" cards | Muneeb |
| Programmes, "Where your giving goes", impact, contact, volunteer, newsletter, forms | Mustaf |
| Blog, events, "Latest updates", "Upcoming events", SEO metadata | Raheema |
| About, policy pages, content blocks, card polish, responsive QA pairing | Ahlaam |
| Donor journey, campaign UX trust messaging, accessibility, release QA | Yasar |
| FAQ, footer, trust/safeguarding content, manual QA log | **James (me)** |
| Payment provider, Convex, Clerk, admin, webhooks, donation reconciliation, receipts, final approval | Mikhail |

## Test environment

- Browser: Chrome (latest stable) + Safari (latest stable) on macOS.
- Viewports: **390 × 844** (mobile, iPhone 14 baseline) and **1440 × 900** (desktop baseline).
- Method: Chrome DevTools device toolbar; verify the same issue in a real narrow window before logging.
- Base URL: `http://localhost:3000` via `bun run dev` (or the latest preview deploy if provided).
- Build sanity: `bun run build` must pass before opening any Week 3 PR.

## Severity legend

- **P1 — Blocker:** page missing, broken layout that hides content, broken/incorrect donation link, broken navigation.
- **P2 — Major:** content overflow, illegible contrast, broken footer link, missing alt text on key imagery.
- **P3 — Minor:** spacing rhythm, small wrap/orphan, label clarity.

---

## Week 3 checklist (mirrors `JAMES_TASKS.md`)

- [ ] Homepage @ 390px — log issues, fix only items in my scope (FAQ/footer/trust).
- [ ] Homepage @ 1440px — log issues, fix only items in my scope (FAQ/footer/trust).
- [ ] Campaigns @ 390px — log issues; record blocker if page is unavailable.
- [ ] Campaigns @ 1440px — log issues; record blocker if page is unavailable.
- [ ] FAQ @ 390px — log issues and fix obvious text/spacing.
- [ ] FAQ @ 1440px — log issues and fix obvious text/spacing.
- [ ] Footer link sweep — every footer link clicked on mobile + desktop; fix in-scope.
- [ ] Donation entry point sweep — every visible donation CTA recorded against Mikhail-approved destination.
- [ ] This document (`docs/team/tasks/qa-notes-james.md`) created and populated.
- [ ] Open Week 3 QA PR referencing this document.

---

## 1. Homepage — `/`

Reference section order: see `docs/team/tasks/navigation-map.md` → "Homepage — section order".

### 1a. Homepage @ 390px (mobile)

QA method this cycle: source-level + rendered-HTML analysis (dev server at `http://127.0.0.1:3003/` on this branch), Tailwind class review against `docs/DESIGN.md`. Items requiring eyes-on-pixel checks are listed under "Visual verification queue" below the table — those should be confirmed in Chrome DevTools at 390×844 before the Week 3 PR.

Most findings here are **viewport-independent** (apply equally at 1440px). They are logged once and cross-referenced in §1b instead of being duplicated.

| # | Page URL | Device / viewport | Section | Reproduction steps | Expected result | Severity | Owner | Status |
|---|----------|--------------------|---------|---------------------|-----------------|----------|-------|--------|
| H-M-1 | `/` | Chrome 390×844 (and 1440×900) | Banners (between "Latest updates" and "Where your giving goes" / between "Upcoming events" and "Active appeals") | Load `/`. Scroll past "Latest updates". Two consecutive `bg-account-black` banner sections render with the **identical** `<h2>Why Participate in Collections?</h2>`. Confirmed by rendered HTML: two h2 matches and two `bg-account-black overflow-x-clip` sections back-to-back. Root cause in `src/app/page.tsx` lines 25–28: `supportBanner = banners.find(id === "support-palestine-sudan") ?? banners[0] ?? null;` — when Convex has no `support-palestine-sudan` banner, this falls back to `banners[0]` which is the same `collections` banner that `fundraiseBanner` already selects on line 30, so the same banner is rendered twice. | Two distinct banners (or one banner) on the homepage. The "support" slot should resolve to a real support banner or be omitted, not reuse the collections banner. | P1 | Mikhail (seed `support-palestine-sudan` banner in Convex, or remove the fallback); Khalid (alternative: change `page.tsx` so `supportBanner` does not reuse `banners[0]` when that record is `collections`) | open |
| H-M-2 | `/` | Chrome 390×844 (and 1440×900) | Both rendered "Why Participate in Collections?" banners | Inspect either banner CTA in DevTools (or `grep href="/fundraise"` in rendered HTML). Both CTAs use `href="/fundraise"` with label "Start Fundraising". `/fundraise` is **not a built route** (verified against `next build` output; only 21 routes built, no `/fundraise`). `navigation-map.md` line 31 explicitly lists `/fundraise` as deferred. Changelog line 127 claims a fallback fix `/fundraise → /campaigns` shipped, but the fallback in `src/lib/server/homepage.ts` line 24 already uses `/campaigns`; the broken `/fundraise` href is coming from the **Convex `collections` banner record**, which overrides the fallback. | Banner CTA should resolve to a real route. Mikhail-approved destinations: `/campaigns` per fallback or per the changelog reconciliation, or `/donate` if treated as donation CTA. Either way, not `/fundraise` (404). | P1 | Mikhail (Convex banner content owner — update the `collections` banner `ctaHref` to `/campaigns` to match the documented fallback) | open |
| H-M-3 | `/` | Chrome 390×844 (and 1440×900) | EmergencyBar (between Hero/Stats and "Latest updates") | Open DevTools Elements panel and walk the heading sequence. Order on the page is `h1` (hero) → `h2` "Lebanon crisis appeal" → `h3` "Support current emergency appeals" → `h4` "Give to Palestine" → `h4` "Give to Sudan" → `h2` "Latest updates". The `h3` on line 74 of `src/components/sections/EmergencyBar.tsx` is structurally a peer section title (it labels the secondary cards strip), so it should be `h2` like every other peer section title on the page (Latest updates, Where your giving goes, Upcoming events, Active appeals). Today it implies the secondary cards are subordinate to "Lebanon crisis appeal", which they are not. | Heading order proceeds without skipping levels and without implying false subordination. Either promote "Support current emergency appeals" to `h2`, or wrap EmergencyBar with a single section `h2` and demote the featured appeal headline to `h3`. | P2 | Khalid (homepage section structure / EmergencyBar) | open |
| H-M-4 | `/` | Chrome 390×844 (and 1440×900) | All homepage cards and banner image | Inspect each `<img>` on the homepage. Rendered HTML has 22 `<img>` elements, 20 with `alt=""` and 2 with non-empty alts (only the emergency featured image and the footer logo). Affected components: `BlogCard.tsx` line 29 (`alt=""`), `EventCard.tsx` line 29 (`alt=""`), `ImpactCard.tsx` line 26 (`alt=""`), `CampaignCard.tsx` line 28 (`alt=""`), `Banner.tsx` line 74 (`alt=""`), `Hero.tsx` line 87 (`alt=""` — defensible: hero background is decorative under a colour overlay). For content cards the link wrapper has visible text so empty alt is *defensible* under WCAG (link text describes destination), but Week 4 task line 63 (`JAMES_TASKS.md`) requires us to *add* meaningful alts where they aid context. Treat as Week 3 P3 log + Week 4 fix. | Card hero images get descriptive alt text from their content (`alt={post.title}` etc.) or are explicitly marked decorative with documented rationale. Hero background remains `alt=""` (decorative). | P3 | Raheema (BlogCard/EventCard content side), Muneeb (CampaignCard), Mustaf (ImpactCard); pattern-side owner Khalid | open |
| H-M-5 | `/` | Chrome 390×844 (and 1440×900) | Footer transparency strip → Safeguarding tile (also surfaces on every page via global footer) | Captured in §4 (footer link sweep). Cross-listed here because the user-visible defect appears on the homepage too: clicking the Safeguarding tile in the footer goes to `/faq` instead of a safeguarding page; `/safeguarding` is not a built route. **Known placeholder documented via TODO in the Week 2 PR**; pending build-out of the safeguarding page. Logged for traceability, not net-new. | Per `navigation-map.md` line 71, Safeguarding tile should eventually point to `/safeguarding` (route to be created) or remain `/faq` with confirmed Mikhail approval. | P2 | Mikhail | known-placeholder (Week 2 PR TODO) |

**Visual verification queue (Homepage @ 390px)** — items where source review didn't surface a concrete defect but the layout is dense enough that eyes-on-device is warranted before signing off:

- Hero (`Hero.tsx`): at `max-[480px]` the section clamps to `min-h-[min(100dvh,48rem)]` (768px floor). On a 390×844 device that's ~91% of viewport for the hero alone, holding `h1` + CTAs + `HeroQuickDonate` form (frequency, fund, amount, submit). Confirm nothing wraps awkwardly, hero h1 doesn't get cut off, and the form is fully reachable without horizontal scroll.
- Stats (`Stats.tsx`): `grid-cols-2 gap-x-3` at 390px → ~165–170px columns. Labels like "Raised across emergencies last year" at `text-xs` may wrap to 3+ lines and break visual rhythm. Confirm label line count is consistent across the 4 stats.
- EmergencyBar featured (`EmergencyBar.tsx`): `text-3xl` headline at 390px (`Lebanon crisis appeal`) with body paragraphs — confirm no overflow with longer Convex-fed headlines.
- HeroQuickDonate form (`HeroQuickDonate.tsx`): `<select>` styling at 390px varies by browser; confirm select fields render at full width without truncating the longest option ("Orphan sponsorship").

If any of these turn into a concrete defect during the visual pass, append rows H-M-6+ to the table above.

### 1b. Homepage @ 1440px (desktop)

QA method: same source + rendered-HTML analysis as §1a, with focus on `lg:`/`xl:`/`2xl:` Tailwind breakpoints and `container-custom` resolution. `container-custom` resolves to `max-width: 1280px` with `padding-left/right: max(2rem, env(safe-area-inset))` at `lg+` (see `src/app/globals.css` lines 122–144). When a section adds `max-w-full` the 1280 cap is removed and content stretches to viewport width minus 64 px of side padding.

**Cross-referenced from §1a (no new rows):**

- H-M-1 (duplicate "Why Participate in Collections?" banner): even more visually obvious at 1440px, where the two `bg-account-black` strips stack edge-to-edge full-width.
- H-M-2 (banner CTAs → `/fundraise` 404): viewport-independent; same broken `href` in same components.
- H-M-3 (EmergencyBar heading hierarchy `h2 → h3 → h4`): viewport-independent.
- H-M-4 (20 of 22 `<img>` with `alt=""`): viewport-independent.
- H-M-5 (Safeguarding tile placeholder): viewport-independent; known-placeholder per Week 2 PR TODO.

| # | Page URL | Device / viewport | Section | Reproduction steps | Expected result | Severity | Owner | Status |
|---|----------|--------------------|---------|---------------------|-----------------|----------|-------|--------|
| H-D-1 | `/` | Chrome 1440×900 | EmergencyBar featured paragraphs | At 1440×900 the EmergencyBar featured panel occupies ~688px (50% column of a `max-w-full` container ≈ 1376 px wide minus internal padding). The featured paragraphs render via `EmergencyBar.tsx` lines 42–46: `<div className="space-y-3 text-sm leading-relaxed text-white/90 sm:text-base md:space-y-4">{featured.paragraphs.map((p, i) => <p>{p}</p>)}</div>`. There is **no `max-w-*` constraint** on the inner `<p>` elements, so a long Convex-fed paragraph stretches to ~600 px width — about 85–95 chars per line at `text-base`. Violates `docs/DESIGN.md` line 98: *"Keep max content widths readable. Long prose should not stretch full-width on desktop."* | Featured paragraphs cap at a readable line length (e.g. `max-w-prose` ≈ 65ch) to match the secondary-card body which already uses `max-w-prose` (line 87 of the same file). | P3 | Khalid (homepage section structure / EmergencyBar) | open |
| H-D-2 | `/` | Chrome 1440×900 | Hero subtitle | `Hero.tsx` line 76 default is `showSubtitle = false`. `src/app/page.tsx` lines 39–47 calls `<Hero ... />` without overriding the flag, so the `subtitle` prop coming from Convex (or the fallback `"Transform lives through the power of giving. Join us in building a better future…"` in `src/lib/server/homepage.ts` line 9) is **never rendered**. At 1440×900 there is plenty of vertical space below the `h1` for a subtitle line, and the prop pathway implies it was meant to be visible. Either intentional (then the Convex subtitle field is dead weight) or a regression. | Either `<Hero showSubtitle ... />` from `page.tsx` to render the subtitle at desktop, or remove `subtitle`/`secondaryCtaText` from `getHomepageData()` and `Hero` props if the design decision is to hide the subtitle for good. | P3 | Khalid (homepage hero / `page.tsx`); Mikhail to confirm intent on the Convex hero copy field | open |
| H-D-3 | `/` | Chrome 1440×900 | Page-level container width rhythm | At 1440×900, sections alternate between **full-bleed** (`container-custom max-w-full` ≈ 1376 px content): Hero, Stats, EmergencyBar, Banner, TrustSection, GlobalReach, Footer — and **capped reading width** (`container-custom` ≈ 1280 px content, with ~80 px of empty gutter each side): "Latest updates", "Where your giving goes", "Upcoming events", "Active appeals" (all four `<section className="section bg-purity-white">` blocks in `src/app/page.tsx`). The pattern reads as intentional (coloured/imagery sections bleed, white card grids cap), but it's not documented in `docs/DESIGN.md` and is invisible until you A/B side-by-side. Suggest documenting or normalising. | Either codify the pattern in `docs/DESIGN.md` ("full-bleed for coloured/imagery sections, capped for card grids") or normalise all card grids to also use `max-w-full` for a consistent rhythm. | P3 | Khalid (homepage structure) + Mikhail (DESIGN.md owner if codifying) | open |

---

**Visual verification queue (Homepage @ 1440px)** — desktop-specific eyes-on items:

- Hero composition at 1440×900: `h1` clamps to **72 px** (`clamp(1.625rem, 4.2vw + 0.85rem, 4.5rem)` resolves to 72 px once viewport ≥ 1338 px), CTAs underneath, and a **512 px** form column on the right (`HeroQuickDonate` `xl:max-w-[min(100%,32rem)]`). Hero `min-h` is `min(100dvh, 52rem)` so on a 900 px tall window the section is ~832 px — confirm the form, h1, and CTAs all fit without scroll on first paint and the right column doesn't overlap the headline.
- Stats `md:grid-cols-4` at 1440×900: ~340 px per column with `lg:text-5xl` (48 px) values and `md:text-base` (16 px) labels. Confirm whether the column width is meant to be this wide (could look sparse) — design decision, not a defect from source.
- EmergencyBar featured image (left/right depending on flow): half-column at ~688 px wide × min 420 px tall, `object-cover`. Confirm crop is acceptable for the Convex-supplied image.
- Banner image cropping at 1440×900: half-column ~688 px × min 320 px, `object-cover`. The duplicate banner (H-M-1) renders this twice — confirm crop and that the back-to-back duplication is visually obvious in DevTools.
- TrustSection at 1440×900: header `max-w-3xl` (768 px) and "Amanah in every donation" callout `max-w-4xl` (896 px), both centred, but the 3-card grid below uses no `max-w` and spans the full `max-w-full` container (~1376 px content). Confirm the card row reading wider than the introductory callout above doesn't break the section's visual hierarchy.
- Footer at 1440 px: `lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,1fr))]` 4-column grid; the Week 1 task on `JAMES_TASKS.md` line 33 ("Fix footer at 1440px width so link groups align consistently") is marked `[x]` — confirm column alignment, no awkward wrapping in any of the four columns at 1440 px. Captured separately in §4 footer link sweep.

## 2. Campaigns — `/campaigns`

If the page returns 404 or renders an empty placeholder only, log a **P1 blocker** addressed to **Muneeb** with a screenshot path and stop further drill-down — do not attempt to fix campaign content.

### 2a. Campaigns @ 390px (mobile)

**Page availability:** confirmed served (HTTP 200, 44 KB rendered HTML at `http://127.0.0.1:3003/campaigns`); `/campaigns` is a built static route per `next build`. No P1 absence-blocker to log.

**Tap target audit (390px):** scanned the rendered HTML for interactive elements with class-based heights — 14 `min-h-11` and 4 `h-11` elements found, no sub-44 px targets detected from class scan. ✓ Visual verification still warranted for default-styled `<select>`s (not present on this page).

**Donation CTA audit (390px):** scanned all `href`s on the rendered page. Only `/donate` reference is the **Donate** button inside the global Header mobile drawer (Header.tsx line 209). Campaign cards link to `/campaigns/[slug]` placeholders. **No `/donate` CTA on the campaigns listing page body itself** — captured as C-M-3.

**Heading hierarchy (page body only, excluding global header/footer):** `h1` "Support active appeals" → 3× `h3` (one per `CampaignCard.tsx` line 35). **`h2` is missing.**

| # | Page URL | Device / viewport | Section | Reproduction steps | Expected result | Severity | Owner | Status |
|---|----------|--------------------|---------|---------------------|-----------------|----------|-------|--------|
| C-M-1 | `/campaigns` | Chrome 390×844 (and 1440×900) | Page heading hierarchy | Open `/campaigns`, walk the heading sequence in DevTools Elements panel. After global `<header>` (no h-tags in nav), page body renders `<h1>Support active appeals</h1>` then jumps directly to three `<h3>` campaign titles (`Emergency food & medicine`, `Rebuild & recover`, `Orphan sponsorship fund`). No `<h2>` between them. Root cause: `CampaignCard.tsx` line 35 hardcodes `<h3>` for the card title — fine on the homepage where the `Active appeals` section provides an `<h2>` parent, but on `/campaigns` there is no `<h2>` so the h3s float without a parent. | Heading order proceeds without skipping levels. Either wrap the card grid in a single `<h2>` (e.g. "Active appeals" or "Live campaigns") so the h3 children are anchored, or promote `CampaignCard`'s heading to `<h2>` on listing-page usage via a `headingLevel` prop. | P2 | Muneeb | open |
| C-M-2 | `/campaigns` | Chrome 390×844 (and 1440×900) | Page data source | `src/app/(site)/campaigns/page.tsx` line 3 imports `mockCampaigns` directly and renders it on line 27 — **no Convex query**. Contrast with `src/lib/server/homepage.ts` line 50 which fetches `api.campaigns.listPublished` for the homepage "Active appeals" grid. Today the homepage and `/campaigns` show the same content only because Convex falls back to the mock; once Mikhail seeds real campaign data, the homepage and the dedicated campaigns listing will diverge — new campaigns will appear on the homepage but NOT on `/campaigns`. | `/campaigns` should query Convex via the same `api.campaigns.listPublished` path the homepage uses, with `mockCampaigns` as the fallback only when the Convex result is empty (mirror the pattern in `getHomepageData`). | P2 | Muneeb | open |
| C-M-3 | `/campaigns` | Chrome 390×844 (and 1440×900) | Page-level donate CTA | Load `/campaigns` and look for any visible "Donate now" / "Give now" button in the main content. There is none. The page's intro paragraph (`page.tsx` line 19–22) reads "Choose a live campaign and help fund urgent relief…" but provides **no in-page donation entry point** — users can only donate by tapping a card (→ `/campaigns/[slug]` placeholder per `navigation-map.md` line 121) or by opening the mobile menu and tapping the Header "Donate" button. At 390 px this is friction; at 1440 px the same gap exists. | A page-level Donate CTA pair near the `<h1>` (e.g. primary `Donate to general fund → /donate`, secondary `Choose a campaign ↓` anchor to the card grid). Alternatively, each `CampaignCard` exposes a "Donate" button in addition to the wrapper link. Decide with Mikhail which destination is approved (general `/donate` vs campaign-scoped). | P2 | Muneeb (+ Mikhail to approve destination) | open |
| C-M-4 | `/campaigns` | Chrome 390×844 (and 1440×900) | Campaign card hero images | Same class of issue as H-M-4 on the homepage. All 3 `<img>` rendered by `CampaignCard.tsx` line 28 use `alt=""`. Defensible because the card wrapper is a link with the campaign title as visible text, but for an appeals listing page where the imagery is editorially meaningful (faces / contexts), descriptive alts add value. Card hero pattern: `<Image src={imageUrl} alt="" ...>`. | Either pass a meaningful `alt` via the `CampaignCard` prop API (e.g. `imageAlt` from Convex / mock data), or explicitly mark decorative and document. Week 4 line 63 of `JAMES_TASKS.md` covers the fix; log here for traceability. | P3 | Muneeb | open |

**Visual verification queue (Campaigns @ 390px)** — eyes-on items the source pass cannot decide:

- `<h1>Support active appeals</h1>` is `text-3xl` (30 px) at mobile; confirm it doesn't break onto an awkward 2-line wrap on 390 px.
- Each `CampaignCard` title uses `line-clamp-2` (`CampaignCard.tsx` line 35). Confirm the three mock titles ("Emergency food & medicine", "Rebuild & recover", "Orphan sponsorship fund") all fit within 2 lines at 390 px without truncating mid-word.
- `CampaignProgress` (card variant, `CampaignProgress.tsx` line 81): the two-span row "£X raised" vs "of £Y" at `text-sm` (14 px). Confirm long currency values (e.g. £1,250,000) don't overlap at 390 px width.

### 2b. Campaigns @ 1440px (desktop)

QA method: source review of `lg:` Tailwind classes + container resolution at 1440 px. `src/app/(site)/campaigns/page.tsx` uses bare `container-custom` (no `max-w-full`), so content caps at 1280 px with ~80 px viewport-gutters each side at 1440 px; inside the container the usable width is 1216 px (1280 − 32 left − 32 right padding at `lg+`). 3-column card grid at `lg:grid-cols-3 lg:gap-8` → each card ≈ (1216 − 64) ÷ 3 = **384 px wide**; card content ≈ 344 px (after `md:p-5` × 2).

**Cross-referenced from §2a (no new rows — all viewport-independent):**

- C-M-1 (page heading hierarchy skips `<h2>`): identical at desktop; `<h1>` sits at `md:text-5xl` (48 px) and the three `<h3>` card titles render at `text-lg` (18 px), still no `<h2>` between them.
- C-M-2 (page uses `mockCampaigns` directly, no Convex query): viewport-independent.
- C-M-3 (no page-level donate CTA): the empty top-right area at 1440 px (see C-D-1 below) makes this gap more visually obvious at desktop, but it's the same defect.
- C-M-4 (3 campaign card hero images with `alt=""`): viewport-independent.

| # | Page URL | Device / viewport | Section | Reproduction steps | Expected result | Severity | Owner | Status |
|---|----------|--------------------|---------|---------------------|-----------------|----------|-------|--------|
| C-D-1 | `/campaigns` | Chrome 1440×900 | Intro block + adjacent empty space above the card grid | At 1440×900, the intro block (`<div className="mb-8 max-w-3xl md:mb-10">` in `src/app/(site)/campaigns/page.tsx` line 16) caps at `max-w-3xl` = **768 px** and is left-aligned inside the 1216 px content area. That leaves **~448 px of empty space to the right** of the eyebrow / `<h1>` / intro paragraph, all the way down to where the card grid begins. The 3-column card grid below uses the full 1216 px. The mismatch reads as an unfinished top-right zone at desktop — exactly the kind of real estate that would normally host quick stats, a filter strip, or a featured-appeal callout. `MUNEEB_TASKS.md` line 4 lists "campaign filters" as Muneeb's ownership, suggesting filters are the planned occupant. Not a defect at 390 px (viewport bounds the block); only surfaces at desktop. | Either extend the intro block to span the full content width (drop `max-w-3xl` and let prose wrap normally with a sensible `max-w-prose` on the paragraph only), or land the planned campaign filter strip / quick-stats card in the right-hand zone so the top of the page feels intentional at 1440 px. | P3 | Muneeb | open |

---

**Visual verification queue (Campaigns @ 1440px)** — desktop-specific eyes-on items:

- `<h1>` at `md:text-5xl` (48 px) inside `max-w-3xl` (768 px) wrapper: "Support active appeals" should fit on a single line; confirm the wrap point is sensible if Convex content is longer.
- 3-column card grid: cards are 384 px wide × `aspect-video` image (216 px tall), `flex h-full flex-col` with description `flex-1` and progress bar at the bottom. All three cards should align top *and* bottom evenly — confirm in DevTools that no card is taller than its row peers due to text differences.
- `CampaignProgress` (card variant) row at 1440 px: ~344 px card content width, currency strings ("£312,000 raised" / "of £500,000") at `text-sm`. Should not overlap; confirm with the longest mock value pair.
- Card `card` class has a 1 px teal-tinted border and a 1 px / 2 px shadow against a `bg-purity-white` page background. Confirm visual separation between cards and page at desktop scale (defaults from `globals.css` lines 102–114).
- Section vertical padding at 1440 px (`.section` clamps to 5 rem = **80 px** top + 80 px bottom). With only one section on this page, total above-the-fold padding is 80 px between Header bottom and the eyebrow — confirm it doesn't read as cramped against the global Header height (~68 px at md+).

## 3. FAQ — `/faq`

In my scope to fix. Aim to close out P2/P3 issues in the same PR rather than just log them. Anything that requires copy from Mikhail must be marked `TODO: Mikhail copy` in the source and logged here as a content blocker, **not** silently filled.

### 3a. FAQ @ 390px (mobile)

QA method: source review of `src/app/(site)/faq/page.tsx` + `bun run build` after fixes. `DonorTrustSection.tsx`, `SafeguardingSection.tsx`, and `HowDonationsAreUsed.tsx` are **not present** in the repo (grep / glob); trust content on `/faq` is the inline block at the bottom of the same file only.

| # | Page URL | Device / viewport | Section | Reproduction steps | Expected result | Severity | Owner | Status |
|---|----------|--------------------|---------|---------------------|-----------------|----------|-------|--------|
| F-M-1 | `/faq` | Chrome 390×844 | Trust block → Safeguarding policy link | Before fix on **this branch (post-`main` merge)**: link targeted **`/safeguarding`** (route not built; 404). | Link targets a real route until `/safeguarding` exists. | P2 | James | **Fixed** — `href="/faq#transparency"`, label "Safeguarding policy", `title` explains placeholder. **Overlap with Week 2:** On `feature/week2-donor-trust`, the same control already avoided `/safeguarding` via **`href="#contact"`** plus inline TODO (*point to /safeguarding when the dedicated page exists*). Week 3 baseline had regressed to `/safeguarding` (or never picked up Week 2); this fix **re-applies that intent** with a **different anchor** (`#transparency` vs `#contact`). **Not a byte-for-byte duplicate of Week 2** — confirm with **Mikhail** which in-page target is preferred for the PR. |
| F-M-2 | `/faq` | Chrome 390×844 | FAQ `<details>` accordions + section intros | Long questions used `absolute right-0` chevrons with `pr-7` on summary; text could run under the +/− at narrow widths. Open/close content had no `min-w-0` / `overflow-hidden` on the card, so nested grid could theoretically overflow 390px with long unbroken strings. Long section intros (e.g. Zakat block) had no `break-words`. | Question and control never overlap; accordion body wraps without horizontal page scroll; intros wrap cleanly. | P3 | James | **Fixed** — summary `flex` + chevron `shrink-0`; `details` `min-w-0 overflow-hidden`; answer `max-w-full break-words`; grid `min-w-0`; section intro `break-words` |
| F-M-3 | `/faq` | Chrome 390×844 | In-page anchors (`#donations`, etc.) | Section `<article id={section.id}>` existed but there was no on-page link list; hash navigation from external links could land with sticky header overlapping the section title. | Users can jump to sections predictably; scroll position clears sticky header. | P3 | James | **Fixed** — "Jump to a topic" nav with `Link` to each `#id`; `scroll-mt-28` on each section `article`. **PR flag — beyond text/spacing:** This is a **new navigational affordance** (topic jump strip), not a typo or spacing tweak alone. **Request Mikhail review** in the Week 3 PR description (copy, IA, and whether this should stay vs. a slimmer pattern). |
| F-M-4 | `/faq` | Chrome 390×844 | `DonorTrustSection`, `SafeguardingSection`, `HowDonationsAreUsed` | `JAMES_TASKS.md` Week 1 lists dedicated sections/blocks; fix-scope files named in Week 3 instructions **do not exist** in the codebase. FAQ only renders inline trust block in `faq/page.tsx`. | Week 1 deliverables: extract or add those section components and wire them on `/faq` per design. | — | James | **Week 1 gap — do not fix in this QA cycle** |
| F-M-5 | `/faq` | Chrome 390×844 | FAQ answers (all sections) | Every answer is still `TODO: Mikhail copy` per Week 1 task line 29 (`JAMES_TASKS.md`). | Final donor-facing answers from Mikhail. | — | James (copy pipeline) / Mikhail | **Week 1 gap — do not fix in this QA cycle** (not a layout defect) |
| F-M-6 | `/faq` | Chrome 390×844 | Heading hierarchy | Walk DOM: hero `h1` → each FAQ section `h2` (article titles) → trust strip `h2` — no skipped levels for main landmarks. (`<summary>` is not a heading; OK.) | Logical h1 → h2 outline. | — | James | **Verified OK** (no change required) |
| F-M-7 | `/faq` | Chrome 390×844 | Donation CTA on page body | No primary "Donate" link in FAQ main or trust strip (only `/contact`, `/volunteer`, safeguarding link). Header/footer donate still available site-wide. | Optional: add Mikhail-approved donate entry in trust strip if product wants it. | P3 | James / Mikhail | **Logged** — out of Week 3 scope unless Mikhail approves destination; defer |

**Tap targets @ 390px:** trust links and new jump-topic links use `min-h-11` (44px). Accordion `<summary>` uses `min-h-11`. ✓

**Cross-reference:** Footer safeguarding tile behaviour remains per H-M-5 / §4 (known placeholder); FAQ trust link now matches built-route expectation for this page only.

**Mikhail — PR review (explicit):** The **“Jump to a topic”** strip (F-M-3) is a **new navigation feature**, not a text/spacing-only tweak. Please confirm in the Week 3 PR whether to keep it, slim it (e.g. fewer pills / dropdown), or replace with another pattern.

### 3b. FAQ @ 1440px (desktop)

**Cross-reference (already fixed @ 390px — do not re-log):**

- **F-M-1** (safeguarding / dead-route link): fixed on this branch; see §3a row for Week 2 overlap note (`#contact` on `feature/week2-donor-trust` vs `/faq#transparency` here) and Mikhail sign-off.
- **F-M-2** (accordion layout / overflow / intro `break-words`): viewport-independent; same markup at 1440px.
- **F-M-3** ("Jump to a topic" + `scroll-mt-28`): viewport-independent; **Mikhail PR review** flagged in §3a F-M-3 Status column.

QA method: source review at `lg+` breakpoints (`container-custom` ≈ 1280px content width, ~80px outer gutters at 1440px viewport).

| # | Page URL | Device / viewport | Section | Reproduction steps | Expected result | Severity | Owner | Status |
|---|----------|--------------------|---------|---------------------|-----------------|----------|-------|--------|
| F-D-1 | `/faq` | Chrome 1440×900 | Teal hero band — intro copy width | Outer wrapper uses `container-custom max-w-full` (full-bleed teal to padded edges). Inner block is `max-w-3xl` (768px) **left-aligned**. At 1440px usable content ≈1216px inside the container, leaving **~448px empty teal** to the right of the eyebrow / `h1` / hero paragraph (same structural pattern as campaigns **C-D-1**). | Either intentional editorial “breathing room” or match campaigns decision: widen hero copy, centre the block, or add a right-rail element. | P3 | Mikhail | open — **Layout choice — should the FAQ hero be centred or remain left-aligned at desktop widths? Awaiting Mikhail direction before fixing.** |

**Visual verification queue (FAQ @ 1440px):**

- **Jump to a topic** chips: `flex flex-wrap` at 1440px — confirm two-row wrap does not collide with section header below and tap targets stay ≥44px.
- **Two-column FAQ grid** (`md:grid-cols-2`): each accordion ≈ half of ~1216px minus gaps — very wide reading measure for answers when Mikhail copy lands; consider `max-w-prose` on answer `<p>` later if lines feel long (optional polish, not logged as defect until real copy exists).
- **Trust strip** (`max-w-4xl` inner card on full-width teal): centred card leaves wide teal margins at 1440px — confirm matches brand intent vs. full-bleed card.

**Build after FAQ fixes:** `bun run build` run after accordion / jump nav / safeguarding / intro `break-words` changes — green (see Pre-flight).

---

## 4. Footer link sweep

Re-verified **2026-05-12** against `src/components/layout/Footer.tsx` and `docs/team/tasks/navigation-map.md`.

**Method:** For each internal `href`, ran `GET http://127.0.0.1:3025{path}` against a short-lived **`next start`** (production mode) after `bun run build`. “Actual URL on click” for internal routes is the resolved path (Next `<Link>` does not rewrite these targets). For social roots, ran `curl -L` and recorded **final** HTTP status after redirects.

**Result:** Every internal footer target returned **HTTP 200**. No `Footer.tsx` href typos or wrong paths — **no in-scope code change required.**

**Not exercised this pass:** In-footer **NewsletterSubscribeForm** `POST /api/newsletter` (requires honeypot / timing fields and Convex); leave **Mustaf** for manual submit test.

| Group | Label / icon | Expected href (`Footer.tsx`) | Actual destination (GET / final URL) | HTTP | Matches `navigation-map.md`? | Notes | Owner | Status |
|-------|----------------|------------------------------|----------------------------------------|------|-------------------------------|-------|-------|--------|
| **Logo** | My Akhirah Account (image link) | `/` | `/` | 200 | Yes (Home) | — | Khalid | verified |
| **1. Discover** | Campaigns | `/campaigns` | `/campaigns` | 200 | Yes | — | Muneeb | verified |
| **1. Discover** | Programmes | `/programmes` | `/programmes` | 200 | Yes | — | Mustaf | verified |
| **1. Discover** | Blog | `/blog` | `/blog` | 200 | Yes | — | Raheema | verified |
| **1. Discover** | Events | `/events` | `/events` | 200 | Yes | — | Raheema | verified |
| **1. Discover** | FAQ | `/faq` | `/faq` | 200 | Yes | — | James | verified |
| **2. Organisation** | About us | `/about` | `/about` | 200 | Yes (map label “About”; same route) | Cosmetic label drift only | Ahlaam / Khalid | verified |
| **2. Organisation** | Contact | `/contact` | `/contact` | 200 | Yes | — | Mustaf | verified |
| **2. Organisation** | Volunteer | `/volunteer` | `/volunteer` | 200 | Yes | — | Mustaf | verified |
| **2. Organisation** | Newsletter | `/newsletter` | `/newsletter` | 200 | Yes | — | Mustaf | verified |
| **3. Get involved** | Donate | `/donate` | `/donate` | 200 | Yes | Dynamic route; still 200 HTML shell | Mikhail | verified |
| **4. Legal** | Privacy | `/privacy` | `/privacy` | 200 | Yes | `JAMES_TASKS.md` “/privacy-policy” is stale spec; footer matches map | Ahlaam | verified |
| **4. Legal** | Terms | `/terms` | `/terms` | 200 | Yes | — | Ahlaam | verified |
| **4. Legal** | FAQ | `/faq` | `/faq` | 200 | Yes | Duplicate label OK per map (Legal + Discover) | James | verified |
| **5. Transparency** | Governance tile | `/privacy` | `/privacy` | 200 | Yes | Placeholder until governance content / URLs final | Mikhail | verified |
| **5. Transparency** | Annual reports tile | `/terms` | `/terms` | 200 | Yes | Placeholder per map until `/reports` or dedicated URL | Mikhail | verified |
| **5. Transparency** | Safeguarding tile | `/faq` | `/faq` | 200 | Yes | Placeholder per map (`/faq` until `/safeguarding`); **not** a 404 | Mikhail | verified |
| **6. Social** | Facebook | `https://facebook.com` | `https://www.facebook.com/` (redirect) | 200 | Placeholder per map | Replace with org profile when marketing supplies URL | Marketing / Mikhail | verified |
| **6. Social** | Twitter / X | `https://twitter.com` | `https://x.com/` (redirect) | 200 | Placeholder per map | Same | Marketing / Mikhail | verified |
| **6. Social** | Instagram | `https://instagram.com` | `https://www.instagram.com/` (redirect) | 200 | Placeholder per map | Same | Marketing / Mikhail | verified |
| **6. Social** | YouTube | `https://youtube.com` | `https://www.youtube.com/` (redirect) | 200 | Placeholder per map | Same | Marketing / Mikhail | verified |
| **Newsletter** | Footer form submit | `POST /api/newsletter` | *(not run)* | — | — | Automated POST skipped (honeypot + `startedAt`); manual smoke test recommended | Mustaf | open |

**Fix policy (unchanged):** No edits to `Footer.tsx` this sweep — all wired routes are valid. Replacing transparency placeholders, real social URLs, and newsletter API behaviour remain **out of scope** for this PR unless product directs.

---

## 5. Donation entry point sweep (Task 8)

**Scope this pass:** **`/`** (homepage) and **`/faq`** only. Global **Header** (mobile drawer Donate) and **Footer** (Get involved → Donate) appear on both pages — listed once under “Global chrome” with a note.

**Rules followed:** No edits to donation targets, payment routes, or Convex-backed content — **record only**. Every row below is owned by **Mikhail** for approval / remediation.

**Expected destination (baseline for this log):** Per `docs/team/tasks/navigation-map.md` (Giving: `/donate`, `/donate/success`; deferred top-level **`/fundraise`**). Unless Mikhail has published a different rule, treat **primary donation CTAs** as approved when they resolve to **`/donate`** (including `GET /donate` and Quick-donate navigation to **`/donate?…`** query strings). **`/fundraise`** is **not** a shipped route in the current build → **blocker** for any visible CTA still pointing there.

**Verification:** `next start` (production) + `curl` on prerendered HTML for `/` and `/faq` (2026-05-12). Homepage HTML contained **`href="/donate"`** (6 anchor instances — includes responsive duplicate hero CTAs in the DOM) and **`href="/fundraise"`** (4 string occurrences, including RSC payload echo — **2 user-visible** “Start Fundraising” banner buttons matching duplicate collections banners from Convex; see **H-M-1 / H-M-2**).

| # | Page | Check area | Label (visible text) | Current `href` / behaviour | Expected (Mikhail-approved baseline) | Correct? | Owner | Notes |
|---|------|------------|----------------------|----------------------------|----------------------------------------|------------|--------|-------|
| D8-G1 | `/` and `/faq` | Global — mobile drawer ( `< lg` ) | **Donate** | `/donate` | `/donate` | **Yes** | Mikhail | Same `Header.tsx` drawer on every page. |
| D8-G2 | `/` and `/faq` | Global — footer Get involved | **Donate** | `/donate` | `/donate` | **Yes** | Mikhail | `Footer.tsx`. |
| D8-G3 | `/` and `/faq` | Global — desktop header bar | *(no standalone Donate control)* | — | `/donate` *if* a desktop Donate is required by product | **N/A** | Mikhail | Donate only in mobile drawer today; desktop nav is route links only. Confirm with Mikhail whether a persistent desktop Donate is desired. |
| D8-1 | `/` | Hero — primary CTA | **Donate Now** (copy from Convex / fallback) | `/donate` | `/donate` | **Yes** | Mikhail | `Hero.tsx` uses `ctaHref` from `getHomepageData()`; fallback in `src/lib/server/homepage.ts` is `/donate`. Two `<a href="/donate">` “Donate Now” nodes can exist in HTML for responsive `HeroCtas` placement. |
| D8-2 | `/` | Hero — Quick donate form | **Donate** (submit button) | Client navigation to **`/donate?type=…&fund=…&amount=…`** (no `href`; `HeroQuickDonate.tsx`) | `/donate` (+ optional query) | **Yes** | Mikhail | Still the approved checkout entry; query params are part of the flow. |
| D8-3 | `/` | Emergency bar — featured button | **Donate now** | `/donate` | `/donate` | **Yes** | Mikhail | `mockEmergencyFeatured.ctaHref` in `mockData.ts`. |
| D8-4 | `/` | Emergency bar — secondary card 1 | **Give to Palestine** (whole card link) | `/donate` | `/donate` | **Yes** | Mikhail | Mock `href: "/donate"`. |
| D8-5 | `/` | Emergency bar — secondary card 2 | **Give to Sudan** (whole card link) | `/donate` | `/donate` | **Yes** | Mikhail | Mock `href: "/donate"`. |
| D8-6 | `/` | Homepage banners — “Collections” CTA (×2 on-screen) | **Start Fundraising** | **`/fundraise`** | **`/donate`** *or* **`/campaigns`** (per product; map defers `/fundraise`) | **No — Blocker** | Mikhail | Convex-backed banner overrides fallback (`homepage.ts` fallback already uses `/campaigns`). Route **`/fundraise`** is **not** built → 404. Same finding as **H-M-2**. **Do not change in this PR** — Convex / content owner. |
| D8-7 | `/` | Active appeals — campaign cards (×3) | Card title / whole card (e.g. **Emergency food & medicine**) | `/campaigns/emergency-aid`, `/campaigns/rebuild`, `/campaigns/orphans` | Appeal detail route (then donate UX) per map | **Yes** *(route set)* | Mikhail | Not a direct `/donate` link; entry to appeal detail. Confirm with Mikhail that post-click donate path on `/campaigns/[slug]` matches approval (Muneeb owns page). |
| D8-8 | `/faq` | FAQ page body + trust strip | *(none)* | — | `/donate` only if product adds one | **N/A** | Mikhail | No Donate button or link in `faq/page.tsx` body or trust links (`/faq#transparency`, `/contact`, `/volunteer`). Same as **F-M-7**. Global chrome still provides `/donate` via **D8-G1 / D8-G2**. |

**Summary**

| Page | Approved `/donate` entry points | Blockers |
|------|----------------------------------|----------|
| **`/`** | Hero primary, Quick donate submit, mobile drawer Donate, emergency featured + 2 cards, footer Donate | **2×** visible **Start Fundraising → `/fundraise`** (collections banner; Convex). |
| **`/faq`** | Mobile drawer Donate, footer Donate only | None in page-specific content. |

**Other routes:** A full-site donation sweep (`/about`, `/campaigns`, `/programmes`, etc.) was **not** requested for Task 8 — repeat this template there when Mikhail wants sign-off.

---

## Cross-cutting notes

- For every section header on every page tested, capture: **does the heading hierarchy (h1 → h2 → h3) read in order?** Log inversions as P2 to Ahlaam (content blocks) or the section owner.
- Capture screenshots into `docs/team/tasks/qa-screenshots/james/<page>-<viewport>-<id>.png` and reference the filename in the **Notes** column (folder created when the first screenshot is added).
- Any issue I fix in this cycle gets its **Status** moved from `open` → `fixed in <PR number>`; anything assigned out moves to `logged → <owner>`.

## Definition of done for Week 3

- All checklist items above are checked.
- Every issue row has page URL, device, reproduction steps, expected result, and owner filled in.
- Every in-scope fix (FAQ, footer, trust content, simple text/spacing) is shipped in the Week 3 PR.
- Out-of-scope issues are linked from the Week 3 PR description and pinged to their owners (Mikhail for donation destination questions, others per the lookup table).
- `bun run build` passes locally on the QA branch before requesting Mikhail as final reviewer.
