import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { campaignStatusValidator, givingTypeValidator, normalizeSlug } from "./lib/validators";
import { requireDomainAccess } from "./lib/auth";
import { createRequestId } from "./lib/references";

function campaignHref(slug: string): string {
  return `/campaigns/${slug}`;
}

function campaignImage(mediaId: string | undefined): string {
  return mediaId ? `/api/media/${mediaId}` : "/hero-bg.jpg";
}

export const listPublished = query({
  args: {
    givingType: v.optional(givingTypeValidator),
    featuredOnly: v.optional(v.boolean()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(args.limit ?? 12, 50);
    let campaigns = await ctx.db
      .query("campaigns")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();

    if (args.featuredOnly) {
      campaigns = campaigns.filter((campaign) => campaign.isFeatured);
    }

    if (args.givingType) {
      const fundIds = new Set(
        (
          await ctx.db
            .query("funds")
            .collect()
        )
          .filter((fund) => fund.givingType === args.givingType || fund.givingType === "general")
          .map((fund) => fund._id),
      );
      campaigns = campaigns.filter((campaign) => fundIds.has(campaign.fundId));
    }

    return campaigns
      .sort((left, right) => (right.publishedAt ?? 0) - (left.publishedAt ?? 0))
      .slice(0, limit)
      .map((campaign) => ({
        id: campaign._id,
        title: campaign.title,
        description: campaign.summary,
        imageUrl: campaignImage(campaign.heroMediaId),
        goal: campaign.targetAmountMinor,
        raised: campaign.raisedAmountMinorCached,
        href: campaignHref(campaign.slug),
      }));
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const campaign = await ctx.db
      .query("campaigns")
      .withIndex("by_slug", (q) => q.eq("slug", normalizeSlug(args.slug)))
      .first();

    if (!campaign || campaign.status !== "published") {
      return null;
    }

    const fund = await ctx.db.get(campaign.fundId);
    return {
      ...campaign,
      fund,
      imageUrl: campaignImage(campaign.heroMediaId),
      href: campaignHref(campaign.slug),
    };
  },
});

export const listAdmin = query({
  args: { status: v.optional(campaignStatusValidator) },
  handler: async (ctx, args) => {
    await requireDomainAccess(ctx, "content");
    let campaigns;
    if (args.status !== undefined) {
      const filterStatus = args.status;
      campaigns = await ctx.db
        .query("campaigns")
        .withIndex("by_status", (q) => q.eq("status", filterStatus))
        .collect();
    } else {
      campaigns = await ctx.db.query("campaigns").collect();
    }

    return campaigns.sort((left, right) => right.updatedAt - left.updatedAt);
  },
});

export const create = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    summary: v.string(),
    descriptionMarkdown: v.string(),
    heroMediaId: v.optional(v.id("media_assets")),
    status: v.optional(campaignStatusValidator),
    programId: v.optional(v.id("programs")),
    fundId: v.id("funds"),
    targetAmountMinor: v.number(),
    currency: v.string(),
    beneficiaryCountries: v.array(v.string()),
    isFeatured: v.optional(v.boolean()),
    startsAt: v.optional(v.number()),
    endsAt: v.optional(v.number()),
    requestId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const staffUser = await requireDomainAccess(ctx, "content");
    const now = Date.now();
    const campaignId = await ctx.db.insert("campaigns", {
      slug: normalizeSlug(args.slug),
      title: args.title.trim(),
      summary: args.summary.trim(),
      descriptionMarkdown: args.descriptionMarkdown.trim(),
      heroMediaId: args.heroMediaId,
      status: args.status ?? "draft",
      programId: args.programId,
      fundId: args.fundId,
      targetAmountMinor: Math.max(0, Math.round(args.targetAmountMinor)),
      currency: args.currency.toUpperCase(),
      raisedAmountMinorCached: 0,
      beneficiaryCountries: args.beneficiaryCountries,
      isFeatured: args.isFeatured ?? false,
      startsAt: args.startsAt,
      endsAt: args.endsAt,
      publishedAt: undefined,
      closedAt: undefined,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("audit_logs", {
      actorStaffUserId: staffUser._id,
      entityType: "campaign",
      entityId: String(campaignId),
      action: "create",
      beforeJson: undefined,
      afterJson: JSON.stringify(args),
      requestId: args.requestId ?? createRequestId(now),
      createdAt: now,
    });

    return campaignId;
  },
});

export const publish = mutation({
  args: {
    campaignId: v.id("campaigns"),
    requestId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const staffUser = await requireDomainAccess(ctx, "content");
    const now = Date.now();
    const campaign = await ctx.db.get(args.campaignId);
    if (!campaign) {
      throw new Error("Campaign not found");
    }

    await ctx.db.patch(args.campaignId, {
      status: "published",
      publishedAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("audit_logs", {
      actorStaffUserId: staffUser._id,
      entityType: "campaign",
      entityId: String(args.campaignId),
      action: "publish",
      beforeJson: JSON.stringify({ status: campaign.status, publishedAt: campaign.publishedAt }),
      afterJson: JSON.stringify({ status: "published", publishedAt: now }),
      requestId: args.requestId ?? createRequestId(now),
      createdAt: now,
    });

    return { ok: true };
  },
});

export const closeCampaign = mutation({
  args: {
    campaignId: v.id("campaigns"),
    requestId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const staffUser = await requireDomainAccess(ctx, "donations");
    const now = Date.now();
    const campaign = await ctx.db.get(args.campaignId);
    if (!campaign) {
      throw new Error("Campaign not found");
    }

    await ctx.db.patch(args.campaignId, {
      status: "closed",
      closedAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("audit_logs", {
      actorStaffUserId: staffUser._id,
      entityType: "campaign",
      entityId: String(args.campaignId),
      action: "close",
      beforeJson: JSON.stringify({ status: campaign.status }),
      afterJson: JSON.stringify({ status: "closed", closedAt: now }),
      requestId: args.requestId ?? createRequestId(now),
      createdAt: now,
    });

    return { ok: true };
  },
});
