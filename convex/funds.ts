import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireDomainAccess } from "./lib/auth";
import { createRequestId } from "./lib/references";
import {
  givingTypeValidator,
  normalizeSlug,
  restrictionPolicyValidator,
} from "./lib/validators";

export const listActive = query({
  args: {},
  handler: async (ctx) => {
    const funds = await ctx.db.query("funds").collect();
    return funds.filter((fund) => fund.isActive);
  },
});

export const listAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireDomainAccess(ctx, "donations");
    return await ctx.db.query("funds").collect();
  },
});

export const create = mutation({
  args: {
    slug: v.string(),
    name: v.string(),
    summary: v.string(),
    descriptionMarkdown: v.string(),
    givingType: givingTypeValidator,
    restrictionPolicy: restrictionPolicyValidator,
    isGeneralFund: v.boolean(),
    beneficiaryRegions: v.array(v.string()),
    isActive: v.optional(v.boolean()),
    requestId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const staffUser = await requireDomainAccess(ctx, "donations");
    const now = Date.now();
    const fundId = await ctx.db.insert("funds", {
      slug: normalizeSlug(args.slug),
      name: args.name.trim(),
      summary: args.summary.trim(),
      descriptionMarkdown: args.descriptionMarkdown.trim(),
      givingType: args.givingType,
      restrictionPolicy: args.restrictionPolicy,
      isGeneralFund: args.isGeneralFund,
      beneficiaryRegions: args.beneficiaryRegions,
      isActive: args.isActive ?? true,
      defaultCampaignId: undefined,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("audit_logs", {
      actorStaffUserId: staffUser._id,
      entityType: "fund",
      entityId: String(fundId),
      action: "create",
      beforeJson: undefined,
      afterJson: JSON.stringify(args),
      requestId: args.requestId ?? createRequestId(now),
      createdAt: now,
    });
    return fundId;
  },
});

export const updateStatus = mutation({
  args: {
    fundId: v.id("funds"),
    isActive: v.boolean(),
    requestId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const staffUser = await requireDomainAccess(ctx, "donations");
    const now = Date.now();
    const fund = await ctx.db.get(args.fundId);
    if (!fund) {
      throw new Error("Fund not found");
    }
    await ctx.db.patch(args.fundId, {
      isActive: args.isActive,
      updatedAt: now,
    });
    await ctx.db.insert("audit_logs", {
      actorStaffUserId: staffUser._id,
      entityType: "fund",
      entityId: String(args.fundId),
      action: "update_status",
      beforeJson: JSON.stringify({ isActive: fund.isActive }),
      afterJson: JSON.stringify({ isActive: args.isActive }),
      requestId: args.requestId ?? createRequestId(now),
      createdAt: now,
    });
    return { ok: true };
  },
});
