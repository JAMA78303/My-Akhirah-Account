import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

export const updateCheckoutSession = internalMutation({
  args: {
    intentId: v.id("donation_intents"),
    providerSessionId: v.string(),
    checkoutUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const intent = await ctx.db.get(args.intentId);
    if (!intent) {
      throw new Error("Donation intent not found");
    }
    if (intent.status !== "created" && intent.status !== "checkout_created") {
      throw new Error("Donation intent is not open");
    }

    await ctx.db.patch(args.intentId, {
      status: "checkout_created",
      providerSessionId: args.providerSessionId,
      providerCheckoutUrl: args.checkoutUrl,
      updatedAt: Date.now(),
    });
    return { ok: true };
  },
});

export const getIntentCheckoutData = internalQuery({
  args: {
    intentId: v.id("donation_intents"),
  },
  handler: async (ctx, args) => {
    const intent = await ctx.db.get(args.intentId);
    if (!intent) {
      return null;
    }
    const donor = await ctx.db.get(intent.donorProfileId);
    if (!donor) {
      throw new Error("Donor profile not found");
    }

    return {
      reference: intent.reference,
      amountMajor: Math.round(intent.amountMinor) / 100,
      currency: intent.currency,
      donorEmail: donor.email,
      donorName: donor.fullName,
      donorPhone: donor.phone ?? undefined,
      messageToCharity: intent.messageToCharity ?? undefined,
      fundId: String(intent.fundId),
      campaignId: intent.campaignId ? String(intent.campaignId) : undefined,
      givingType: intent.givingType,
    };
  },
});
