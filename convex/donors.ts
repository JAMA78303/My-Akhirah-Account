import { v } from "convex/values";
import { query } from "./_generated/server";
import { requireDomainAccess } from "./lib/auth";
import { normalizeEmail } from "./lib/validators";

export const getByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    await requireDomainAccess(ctx, "donations");
    const email = normalizeEmail(args.email);
    const donor = await ctx.db
      .query("donor_profiles")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();
    if (!donor) {
      return null;
    }

    const donations = (await ctx.db.query("donations").collect())
      .filter((entry) => entry.donorProfileId === donor._id)
      .sort((left, right) => right.receivedAt - left.receivedAt)
      .slice(0, 20);

    return {
      donor,
      donations,
    };
  },
});

export const listRecent = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireDomainAccess(ctx, "donations");
    const donors = await ctx.db.query("donor_profiles").collect();
    return donors.sort((left, right) => (right.lastDonationAt ?? 0) - (left.lastDonationAt ?? 0)).slice(0, Math.min(args.limit ?? 50, 200));
  },
});
