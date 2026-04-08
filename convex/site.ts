import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import type { HomepagePayload } from "./lib/dtos";
import { createRequestId } from "./lib/references";
import { requireDomainAccess } from "./lib/auth";

const defaultHomepage: HomepagePayload = {
  hero: {
    title: "Zakat is our Sacred Duty",
    subtitle:
      "Transform lives through the power of giving. Join us in building a better future for communities in need around the world.",
    ctaText: "Donate Now",
    ctaHref: "/donate",
    secondaryCtaText: "Learn More",
    secondaryCtaHref: "/about",
    backgroundImage: "/hero-bg.jpg",
  },
  banners: [
    {
      id: "collections",
      title: "Why Participate in Collections?",
      description:
        "Your contributions, no matter how small, create ripples of change across communities. Every pound raised goes directly towards transforming lives and supporting those in need.",
      ctaText: "Start Fundraising",
      ctaHref: "/fundraise",
      imageUrl: "/hero-bg.jpg",
      variant: "secondary",
    },
    {
      id: "our-story",
      title: "Our Story",
      description:
        "For over 15 years, My Akhirah Account has been dedicated to serving humanity and helping Muslims invest in their hereafter through meaningful charitable work.",
      ctaText: "About Us",
      ctaHref: "/about",
      imageUrl: "/hero-bg.jpg",
      variant: "primary",
    },
  ],
  stats: [],
  campaigns: [],
  posts: [],
  events: [],
  impacts: [],
};

export const getHomepage = query({
  args: {},
  handler: async (ctx): Promise<HomepagePayload> => {
    const homepageSetting = await ctx.db
      .query("site_settings")
      .withIndex("by_key", (q) => q.eq("key", "homepage"))
      .first();

    const heroSetting = await ctx.db
      .query("site_settings")
      .withIndex("by_key", (q) => q.eq("key", "hero"))
      .first();

    const bannerSetting = await ctx.db
      .query("site_settings")
      .withIndex("by_key", (q) => q.eq("key", "homepage_banners"))
      .first();

    const statsSetting = await ctx.db
      .query("site_settings")
      .withIndex("by_key", (q) => q.eq("key", "homepage_stats"))
      .first();

    const payload = {
      ...defaultHomepage,
      ...(homepageSetting?.value ?? {}),
      hero: {
        ...defaultHomepage.hero,
        ...(heroSetting?.value ?? {}),
      },
      banners: Array.isArray(bannerSetting?.value) ? bannerSetting?.value : defaultHomepage.banners,
      stats: Array.isArray(statsSetting?.value) ? statsSetting?.value : defaultHomepage.stats,
    } as HomepagePayload;

    return payload;
  },
});

export const getFooter = query({
  args: {},
  handler: async (ctx) => {
    const footerSetting = await ctx.db
      .query("site_settings")
      .withIndex("by_key", (q) => q.eq("key", "footer"))
      .first();

    const newsletterSetting = await ctx.db
      .query("site_settings")
      .withIndex("by_key", (q) => q.eq("key", "newsletter"))
      .first();

    return {
      footer: footerSetting?.value ?? null,
      newsletter: newsletterSetting?.value ?? null,
    };
  },
});

export const upsertSetting = mutation({
  args: {
    key: v.string(),
    value: v.any(),
    requestId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const staffUser = await requireDomainAccess(ctx, "settings");
    const now = Date.now();
    const existing = await ctx.db
      .query("site_settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        value: args.value,
        updatedAt: now,
        updatedBy: staffUser._id,
      });
    } else {
      await ctx.db.insert("site_settings", {
        key: args.key,
        value: args.value,
        updatedAt: now,
        updatedBy: staffUser._id,
      });
    }

    await ctx.db.insert("audit_logs", {
      actorStaffUserId: staffUser._id,
      entityType: "site_settings",
      entityId: args.key,
      action: "upsert_setting",
      beforeJson: existing ? JSON.stringify(existing.value) : undefined,
      afterJson: JSON.stringify(args.value),
      requestId: args.requestId ?? createRequestId(now),
      createdAt: now,
    });

    return { ok: true };
  },
});
