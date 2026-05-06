# Raheema Tasks

Role: Blog, events, content search, and technical SEO owner  
Primary ownership: blog/news pages, event pages, content search/filter UI, technical SEO metadata, structured data, internal links, and content states.

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
- [x] Ask Mikhail before changing any data flow, Convex-related interface, admin permissions, payment provider flow, or Clerk/auth behavior.

## Week 1: Blog and Event Page Structure

- [x] Update `src/components/cards/BlogCard.tsx` to support real title length, excerpt length, and date display.
- [x] Update `src/components/cards/EventCard.tsx` to support real event date/location display and long titles.
- [x] Use only Mikhail-approved public post/event fields (title, slug, excerpt, image, date, tags/category, location).
- [ ] Add blog/event metadata using the same title template and description style as `src/app/layout.tsx`.
- [x] Make blog/event heading hierarchy match the homepage pattern: one page `<h1>`, section `<h2>`, card/detail subheadings `<h3>`.
- [ ] Build `/blog` page shell.
- [ ] Build `/blog/[slug]` page shell.
- [ ] Build `/events` page shell.
- [ ] Build `/events/[slug]` page shell.
- [x] Use lowercase, hyphenated URL patterns for content slugs.
- [x] Ensure each page has one clear `<h1>`.
- [x] Ensure headings follow a logical `<h1>` to `<h2>` to `<h3>` order.
- [x] Add loading and empty states for blog and events.
- [x] Open a PR for blog and event page structure with heading/URL notes.

## Week 2: Content Data and Filters

- [ ] Connect `/blog` to the Mikhail-approved post data interface, with no hardcoded production data in final PR.
- [ ] Connect `/blog/[slug]` to the Mikhail-approved post detail data interface, with no hardcoded production data in final PR.
- [ ] Connect `/events` to the Mikhail-approved event data interface, with no hardcoded production data in final PR.
- [ ] Connect `/events/[slug]` to the Mikhail-approved event detail data interface, with no hardcoded production data in final PR.
- [ ] Display titles, excerpts, published dates, tags, categories, event dates, and locations where available.
- [ ] Add search/filter UI for posts.
- [ ] Add search/filter UI for events.
- [ ] Keep search or filter state in the URL where practical.
- [ ] Set canonical behavior for filtered URLs so low-value duplicate pages are not indexable.
- [ ] Use descriptive internal link text instead of "click here" or vague labels.
- [ ] Add breadcrumb-style navigation where it fits the page design.
- [ ] Add clear empty states for no matching content.
- [ ] Open a PR for content data, filters, and internal linking.

## Week 3: States and Technical SEO

- [ ] Add polished loading states for blog listing.
- [ ] Add polished loading states for event listing.
- [ ] Add clear error states for failed content loading.
- [ ] Ensure SEO metadata and structured data use real Convex content values (title, summary, date, slug, image) where available.
- [ ] Add unique `<title>` metadata for blog listing.
- [ ] Add unique `<title>` metadata for blog detail pages.
- [ ] Add unique `<title>` metadata for event listing.
- [ ] Add unique `<title>` metadata for event detail pages.
- [ ] Add accurate meta descriptions for blog listing and detail pages.
- [ ] Add accurate meta descriptions for event listing and detail pages.
- [ ] Add Open Graph title, description, URL, and image metadata where available.
- [ ] Add Twitter card metadata where available.
- [ ] Add self-referencing canonical URLs for indexable blog and event pages.
- [ ] Set search/filter parameter pages to canonicalize to `/blog` or `/events` unless Mikhail provides written approval for indexable filtered pages.
- [ ] Add Article JSON-LD for blog detail pages where content is available.
- [ ] Add Event JSON-LD for event detail pages where content is available.
- [ ] Ensure structured data matches visible on-page content.
- [ ] Fix heading hierarchy issues on all blog and event pages.
- [ ] Add/fix alt text for all meaningful images on blog and event cards.
- [ ] Open a PR for states, metadata, canonicals, and structured data.

## Week 4: Polish, Internal Links, and SEO QA

- [ ] Polish blog listing layout on mobile.
- [ ] Polish blog listing layout on desktop.
- [ ] Polish event listing layout on mobile.
- [ ] Polish event listing layout on desktop.
- [ ] Add internal links from homepage cards to detail pages.
- [ ] Fix all broken blog/event links in listing and detail pages.
- [ ] Fix card layout for long titles and long excerpts.
- [ ] Add missing internal links so key blog/event pages are reachable within 3 clicks from homepage.
- [ ] Rewrite weak anchor text on listing pages to descriptive link text.
- [ ] Add/fix descriptive alt text for meaningful images.
- [ ] Set empty alt text for decorative images.
- [ ] Set image dimensions/aspect handling to reduce CLS.
- [ ] Fix mobile usability issues on blog/event pages.
- [ ] Resolve duplicate title/description metadata issues.
- [ ] Verify sitemap coverage with Mikhail and add missing pages where required.
- [ ] Verify `robots.txt` rules with Mikhail and fix incorrect allow/disallow rules.
- [ ] Create a short SEO QA note listing remaining issues and owner.
- [ ] Run manual QA for blog and events on mobile, tablet, and desktop.
- [ ] Open final polish PR.

## PR Checklist

- [ ] PR explains what changed.
- [ ] PR explains why it changed.
- [ ] PR explains how to test it.
- [ ] `bun run build` passes.
- [ ] Blog and event pages work on mobile and desktop.
- [ ] Metadata, canonical, and structured data changes are described in the PR.
- [ ] Internal links and heading hierarchy were checked.
- [ ] Mikhail is requested as final reviewer.
