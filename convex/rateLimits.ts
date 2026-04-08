import { v } from "convex/values";
import { internalMutation, mutation } from "./_generated/server";

export const consume = mutation({
  args: {
    routeKey: v.string(),
    ipHash: v.string(),
    windowMs: v.number(),
    maxRequests: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const record = await ctx.db
      .query("request_limits")
      .withIndex("by_route_ip", (q) => q.eq("routeKey", args.routeKey).eq("ipHash", args.ipHash))
      .first();

    if (!record || record.expiresAt <= now) {
      await ctx.db.insert("request_limits", {
        routeKey: args.routeKey,
        ipHash: args.ipHash,
        count: 1,
        windowStart: now,
        expiresAt: now + args.windowMs,
      });
      return { allowed: true, remaining: args.maxRequests - 1 };
    }

    const nextCount = record.count + 1;
    await ctx.db.patch(record._id, {
      count: nextCount,
      expiresAt: Math.max(record.expiresAt, now + args.windowMs),
    });
    return {
      allowed: nextCount <= args.maxRequests,
      remaining: Math.max(0, args.maxRequests - nextCount),
    };
  },
});

export const cleanupExpired = internalMutation({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const records = await ctx.db.query("request_limits").collect();
    const stale = records
      .filter((record) => record.expiresAt <= now)
      .slice(0, Math.min(args.limit ?? 500, 1000));
    for (const record of stale) {
      await ctx.db.delete(record._id);
    }
    return { deleted: stale.length };
  },
});
