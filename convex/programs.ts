import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireDomainAccess } from "./lib/auth";
import { normalizeSlug } from "./lib/validators";

export const listActive = query({
  args: {},
  handler: async (ctx) => {
    const programs = await ctx.db.query("programs").collect();
    return programs.filter((program) => program.isActive);
  },
});

export const create = mutation({
  args: {
    slug: v.string(),
    name: v.string(),
    summary: v.string(),
    descriptionMarkdown: v.string(),
    heroMediaId: v.optional(v.id("media_assets")),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireDomainAccess(ctx, "content");
    const now = Date.now();
    return await ctx.db.insert("programs", {
      slug: normalizeSlug(args.slug),
      name: args.name.trim(),
      summary: args.summary.trim(),
      descriptionMarkdown: args.descriptionMarkdown.trim(),
      heroMediaId: args.heroMediaId,
      isActive: args.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    });
  },
});
