# Raheema Tasks

Role: Blog, events, content search, and technical SEO owner  
Primary ownership: blog/news pages, event pages, content search/filter UI, technical SEO metadata, structured data, internal links, and content states.

## Setup Checklist

- [ ] Read `README.md`.
- [ ] Read `docs/CODEBASE_MAP.md`.
- [ ] Pull the latest `main` branch before starting work.
- [ ] Create a feature branch using `feature/<short-description>` or `fix/<short-description>`.
- [ ] Confirm you can run `bun run build`.
- [ ] Ask Mikhail before changing any data flow, Convex-related interface, admin permissions, payment provider flow, or Clerk/auth behavior.

## Week 1: Blog and Event Page Structure

- [ ] Review `src/components/cards/BlogCard.tsx`.
- [ ] Review `src/components/cards/EventCard.tsx`.
- [ ] Review only the public post and event data shapes approved by Mikhail.
- [ ] Review existing site metadata in `src/app/layout.tsx`.
- [ ] Review existing homepage heading structure in `src/app/page.tsx`.
- [ ] Build `/blog` page shell.
- [ ] Build `/blog/[slug]` page shell.
- [ ] Build `/events` page shell.
- [ ] Build `/events/[slug]` page shell.
- [ ] Use lowercase, hyphenated URL patterns for content slugs.
- [ ] Ensure each page has one clear `<h1>`.
- [ ] Ensure headings follow a logical `<h1>` to `<h2>` to `<h3>` order.
- [ ] Add loading and empty states for blog and events.
- [ ] Open a PR for blog and event page structure with heading/URL notes.

## Week 2: Content Data and Filters

- [ ] Connect `/blog` to the post data interface approved by Mikhail.
- [ ] Connect `/blog/[slug]` to the post data interface approved by Mikhail.
- [ ] Connect `/events` to the event data interface approved by Mikhail.
- [ ] Connect `/events/[slug]` to the event data interface approved by Mikhail.
- [ ] Display titles, excerpts, published dates, tags, categories, event dates, and locations where available.
- [ ] Add search/filter UI for posts.
- [ ] Add search/filter UI for events.
- [ ] Keep search or filter state in the URL where practical.
- [ ] Confirm filtered URLs do not create low-value duplicate pages.
- [ ] Use descriptive internal link text instead of "click here" or vague labels.
- [ ] Add breadcrumb-style navigation where it fits the page design.
- [ ] Add clear empty states for no matching content.
- [ ] Open a PR for content data, filters, and internal linking.

## Week 3: States and Technical SEO

- [ ] Add polished loading states for blog listing.
- [ ] Add polished loading states for event listing.
- [ ] Add clear error states for failed content loading.
- [ ] Add unique `<title>` metadata for blog listing.
- [ ] Add unique `<title>` metadata for blog detail pages.
- [ ] Add unique `<title>` metadata for event listing.
- [ ] Add unique `<title>` metadata for event detail pages.
- [ ] Add accurate meta descriptions for blog listing and detail pages.
- [ ] Add accurate meta descriptions for event listing and detail pages.
- [ ] Add Open Graph title, description, URL, and image metadata where available.
- [ ] Add Twitter card metadata where available.
- [ ] Add self-referencing canonical URLs for indexable blog and event pages.
- [ ] Confirm search/filter parameter pages canonicalize to the right main page unless Mikhail approves indexable filtered pages.
- [ ] Add Article JSON-LD for blog detail pages where content is available.
- [ ] Add Event JSON-LD for event detail pages where content is available.
- [ ] Ensure structured data matches visible on-page content.
- [ ] Check heading hierarchy on all blog and event pages.
- [ ] Check image alt text on all blog and event cards.
- [ ] Open a PR for states, metadata, canonicals, and structured data.

## Week 4: Polish, Internal Links, and SEO QA

- [ ] Polish blog listing layout on mobile.
- [ ] Polish blog listing layout on desktop.
- [ ] Polish event listing layout on mobile.
- [ ] Polish event listing layout on desktop.
- [ ] Add internal links from homepage cards to detail pages.
- [ ] Check blog and event links are not broken.
- [ ] Check cards handle long titles and excerpts.
- [ ] Check every important blog/event page is reachable within 3 clicks from the homepage.
- [ ] Check listing pages link to detail pages with descriptive anchor text.
- [ ] Check meaningful images have descriptive alt text.
- [ ] Check decorative images use empty alt text where appropriate.
- [ ] Check images reserve layout space to reduce CLS.
- [ ] Check blog and event pages are mobile friendly.
- [ ] Check no blog/event page has duplicate titles or duplicate descriptions.
- [ ] Check sitemap coverage with Mikhail if sitemap generation is implemented.
- [ ] Check `robots.txt` behavior with Mikhail if robots rules are implemented.
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
