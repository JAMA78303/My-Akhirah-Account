import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalMutation, mutation, query } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import { canUseFundForGivingType } from "./lib/donationRules";
import { requireDomainAccess } from "./lib/auth";
import { createDonationReference } from "./lib/references";
import { donationIntentStatusValidator, givingTypeValidator, normalizeEmail } from "./lib/validators";

async function createUniqueReference(ctx: MutationCtx): Promise<string> {
  for (let tries = 0; tries < 5; tries += 1) {
    const reference = createDonationReference(Date.now());
    const existing = await ctx.db
      .query("donation_intents")
      .withIndex("by_reference", (q) => q.eq("reference", reference))
      .first();
    if (!existing) {
      return reference;
    }
  }
  throw new Error("Failed to allocate donation reference");
}

export const createIntent = mutation({
  args: {
    donor: v.object({
      fullName: v.string(),
      email: v.string(),
      phone: v.optional(v.string()),
      country: v.optional(v.string()),
      city: v.optional(v.string()),
      preferredCurrency: v.optional(v.string()),
      consentEmailMarketing: v.boolean(),
      consentTransactionalEmail: v.boolean(),
      source: v.optional(v.string()),
    }),
    fundId: v.id("funds"),
    campaignId: v.optional(v.id("campaigns")),
    givingType: givingTypeValidator,
    amountMinor: v.number(),
    currency: v.string(),
    coverFees: v.boolean(),
    isAnonymousPublic: v.boolean(),
    messageToCharity: v.optional(v.string()),
    expiresInMinutes: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    if (!Number.isFinite(args.amountMinor) || args.amountMinor <= 0 || !Number.isInteger(args.amountMinor)) {
      throw new Error("Invalid amount");
    }

    const fund = await ctx.db.get(args.fundId);
    if (!fund) {
      throw new Error("Fund not found");
    }

    if (!canUseFundForGivingType(fund, args.givingType)) {
      throw new Error("Fund is not compatible with this giving type");
    }

    if (args.campaignId) {
      const campaign = await ctx.db.get(args.campaignId);
      if (!campaign) {
        throw new Error("Campaign not found");
      }
      if (campaign.status !== "published") {
        throw new Error("Campaign is not active");
      }
      if (campaign.fundId !== args.fundId) {
        throw new Error("Campaign/fund mismatch");
      }
    }

    const now = Date.now();
    const email = normalizeEmail(args.donor.email);
    const existingDonor = await ctx.db
      .query("donor_profiles")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    const donorProfileId = existingDonor
      ? existingDonor._id
      : await ctx.db.insert("donor_profiles", {
          email,
          fullName: args.donor.fullName.trim(),
          phone: args.donor.phone?.trim(),
          country: args.donor.country?.trim(),
          city: args.donor.city?.trim(),
          preferredCurrency: args.donor.preferredCurrency?.toUpperCase(),
          consentEmailMarketing: args.donor.consentEmailMarketing,
          consentTransactionalEmail: args.donor.consentTransactionalEmail,
          source: args.donor.source,
          lastDonationAt: undefined,
          createdAt: now,
          updatedAt: now,
        });

    if (existingDonor) {
      await ctx.db.patch(existingDonor._id, {
        fullName: args.donor.fullName.trim(),
        phone: args.donor.phone?.trim(),
        country: args.donor.country?.trim(),
        city: args.donor.city?.trim(),
        preferredCurrency: args.donor.preferredCurrency?.toUpperCase() ?? existingDonor.preferredCurrency,
        consentEmailMarketing: args.donor.consentEmailMarketing,
        consentTransactionalEmail: args.donor.consentTransactionalEmail,
        source: args.donor.source ?? existingDonor.source,
        updatedAt: now,
      });
    }

    const reference = await createUniqueReference(ctx);
    const expiresAt = now + (args.expiresInMinutes ?? 30) * 60 * 1000;

    const intentId = await ctx.db.insert("donation_intents", {
      reference,
      status: "created",
      donorProfileId,
      fundId: args.fundId,
      campaignId: args.campaignId,
      givingType: args.givingType,
      amountMinor: Math.round(args.amountMinor),
      currency: args.currency.toUpperCase(),
      coverFees: args.coverFees,
      isAnonymousPublic: args.isAnonymousPublic,
      messageToCharity: args.messageToCharity?.trim(),
      provider: "flutterwave",
      providerSessionId: undefined,
      providerCheckoutUrl: undefined,
      expiresAt,
      completedDonationId: undefined,
      failureCode: undefined,
      createdAt: now,
      updatedAt: now,
    });

    return { intentId, reference };
  },
});

export const markIntentFailed = internalMutation({
  args: {
    intentReference: v.string(),
    failureCode: v.string(),
  },
  handler: async (ctx, args) => {
    const intent = await ctx.db
      .query("donation_intents")
      .withIndex("by_reference", (q) => q.eq("reference", args.intentReference))
      .first();
    if (!intent || intent.status === "completed" || intent.status === "expired") {
      return { ok: true };
    }

    await ctx.db.patch(intent._id, {
      status: "failed",
      failureCode: args.failureCode,
      updatedAt: Date.now(),
    });
    return { ok: true };
  },
});

export const markIntentCompleted = internalMutation({
  args: {
    intentReference: v.string(),
    providerTransactionId: v.string(),
    paidAmountMinor: v.number(),
    paidCurrency: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const intent = await ctx.db
      .query("donation_intents")
      .withIndex("by_reference", (q) => q.eq("reference", args.intentReference))
      .first();

    if (!intent) {
      throw new Error("Donation intent not found");
    }

    if (intent.status === "completed" && intent.completedDonationId) {
      return { donationId: intent.completedDonationId, alreadyProcessed: true };
    }

    if (intent.status === "expired") {
      throw new Error("Donation intent expired");
    }

    const donationReference = `GIFT-${intent.reference}`;
    const donationId = await ctx.db.insert("donations", {
      reference: donationReference,
      donationIntentId: intent._id,
      donorProfileId: intent.donorProfileId,
      fundId: intent.fundId,
      campaignId: intent.campaignId,
      givingType: intent.givingType,
      amountMinor: Math.round(args.paidAmountMinor),
      currency: args.paidCurrency.toUpperCase(),
      provider: intent.provider,
      providerTransactionId: args.providerTransactionId,
      receivedAt: now,
      receiptStatus: "queued",
      isAnonymousPublic: intent.isAnonymousPublic,
      allocationPolicyVersion: "v1",
      createdAt: now,
    });

    const fund = await ctx.db.get(intent.fundId);
    if (!fund) {
      throw new Error("Fund not found for allocation");
    }

    const campaign = intent.campaignId ? await ctx.db.get(intent.campaignId) : null;

    await ctx.db.insert("donation_allocations", {
      donationId,
      fundId: intent.fundId,
      campaignId: intent.campaignId,
      programId: campaign?.programId,
      amountMinor: Math.round(args.paidAmountMinor),
      currency: args.paidCurrency.toUpperCase(),
      restrictionPolicyApplied: fund.restrictionPolicy,
      createdAt: now,
    });

    if (intent.campaignId && campaign) {
      await ctx.db.patch(intent.campaignId, {
        raisedAmountMinorCached: campaign.raisedAmountMinorCached + Math.round(args.paidAmountMinor),
        updatedAt: now,
      });
    }

    await ctx.db.patch(intent._id, {
      status: "completed",
      completedDonationId: donationId,
      updatedAt: now,
      failureCode: undefined,
    });

    await ctx.db.patch(intent.donorProfileId, {
      lastDonationAt: now,
      updatedAt: now,
    });

    await ctx.scheduler.runAfter(0, internal.receipts.queueReceipt, {
      donationId,
    });

    return { donationId, alreadyProcessed: false };
  },
});

export const expireStaleIntents = internalMutation({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const limit = Math.min(args.limit ?? 100, 500);
    const openIntents = await ctx.db
      .query("donation_intents")
      .withIndex("by_status_expiresAt", (q) => q.eq("status", "created"))
      .collect();
    const checkoutIntents = await ctx.db
      .query("donation_intents")
      .withIndex("by_status_expiresAt", (q) => q.eq("status", "checkout_created"))
      .collect();

    const stale = [...openIntents, ...checkoutIntents]
      .filter((intent) => intent.expiresAt <= now)
      .slice(0, limit);

    for (const intent of stale) {
      await ctx.db.patch(intent._id, {
        status: "expired",
        updatedAt: now,
      });
    }

    return { expired: stale.length };
  },
});

export const listRecent = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireDomainAccess(ctx, "donations");
    const limit = Math.min(args.limit ?? 20, 100);
    const donations = await ctx.db.query("donations").collect();
    return donations.sort((left, right) => right.receivedAt - left.receivedAt).slice(0, limit);
  },
});

export const listIntentsByStatus = query({
  args: {
    status: donationIntentStatusValidator,
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireDomainAccess(ctx, "donations");
    const intents = await ctx.db
      .query("donation_intents")
      .withIndex("by_status_expiresAt", (q) => q.eq("status", args.status))
      .collect();
    return intents.slice(0, Math.min(args.limit ?? 50, 200));
  },
});
