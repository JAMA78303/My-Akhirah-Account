import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireDomainAccess } from "./lib/auth";
import { mediaKindValidator } from "./lib/validators";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireDomainAccess(ctx, "content");
    return await ctx.storage.generateUploadUrl();
  },
});

export const registerAsset = mutation({
  args: {
    storageId: v.id("_storage"),
    altText: v.string(),
    caption: v.optional(v.string()),
    kind: mediaKindValidator,
  },
  handler: async (ctx, args) => {
    const staffUser = await requireDomainAccess(ctx, "content");
    const now = Date.now();
    return await ctx.db.insert("media_assets", {
      storageId: args.storageId,
      altText: args.altText.trim(),
      caption: args.caption?.trim(),
      kind: args.kind,
      status: "published",
      uploadedBy: staffUser._id,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const getAssetUrl = query({
  args: {
    mediaAssetId: v.id("media_assets"),
  },
  handler: async (ctx, args) => {
    const asset = await ctx.db.get(args.mediaAssetId);
    if (!asset) {
      return null;
    }
    const url = await ctx.storage.getUrl(asset.storageId);
    return {
      ...asset,
      url,
    };
  },
});
