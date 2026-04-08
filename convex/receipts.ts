import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action, internalMutation, internalQuery, mutation } from "./_generated/server";
import { requireDomainAccess } from "./lib/auth";
import { createReceiptNumber } from "./lib/references";

export const queueReceipt = internalMutation({
  args: {
    donationId: v.id("donations"),
  },
  handler: async (ctx, args) => {
    const donation = await ctx.db.get(args.donationId);
    if (!donation) {
      throw new Error("Donation not found");
    }

    const donor = await ctx.db.get(donation.donorProfileId);
    if (!donor) {
      throw new Error("Donor profile not found");
    }

    const now = Date.now();
    await ctx.db.insert("receipts", {
      donationId: donation._id,
      receiptNumber: createReceiptNumber(now),
      templateVersion: "v1",
      recipientEmail: donor.email,
      queuedAt: now,
      sentAt: undefined,
      failedAt: undefined,
      deliveryProviderId: undefined,
      failureReason: undefined,
      status: "queued",
      retryCount: 0,
      nextRetryAt: now,
    });
    return { ok: true };
  },
});

export const listDispatchableReceipts = internalQuery({
  args: {
    before: v.number(),
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    const receipts = await ctx.db
      .query("receipts")
      .withIndex("by_status_nextRetryAt", (q) => q.eq("status", "queued"))
      .collect();
    return receipts
      .filter((receipt) => !receipt.nextRetryAt || receipt.nextRetryAt <= args.before)
      .sort((left, right) => (left.nextRetryAt ?? left.queuedAt) - (right.nextRetryAt ?? right.queuedAt))
      .slice(0, args.limit);
  },
});

export const markReceiptSent = internalMutation({
  args: {
    receiptId: v.id("receipts"),
    deliveryProviderId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const receipt = await ctx.db.get(args.receiptId);
    if (!receipt) {
      throw new Error("Receipt not found");
    }
    const now = Date.now();
    await ctx.db.patch(args.receiptId, {
      status: "sent",
      sentAt: now,
      deliveryProviderId: args.deliveryProviderId,
      failureReason: undefined,
      failedAt: undefined,
      nextRetryAt: undefined,
    });

    const donation = await ctx.db.get(receipt.donationId);
    if (donation) {
      await ctx.db.patch(receipt.donationId, {
        receiptStatus: "sent",
      });
    }
    return { ok: true };
  },
});

export const markReceiptFailed = internalMutation({
  args: {
    receiptId: v.id("receipts"),
    reason: v.string(),
    retryInMinutes: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const receipt = await ctx.db.get(args.receiptId);
    if (!receipt) {
      throw new Error("Receipt not found");
    }
    const now = Date.now();
    const retryCount = receipt.retryCount + 1;
    const shouldRetry = retryCount <= 5;
    await ctx.db.patch(args.receiptId, {
      status: shouldRetry ? "queued" : "failed",
      failedAt: now,
      failureReason: args.reason,
      retryCount,
      nextRetryAt: shouldRetry ? now + (args.retryInMinutes ?? 15) * 60 * 1000 : undefined,
    });

    const donation = await ctx.db.get(receipt.donationId);
    if (donation && !shouldRetry) {
      await ctx.db.patch(receipt.donationId, {
        receiptStatus: "failed",
      });
    }
    return { ok: true };
  },
});

export const resendReceipt = mutation({
  args: {
    receiptId: v.id("receipts"),
  },
  handler: async (ctx, args) => {
    await requireDomainAccess(ctx, "donations");
    await ctx.db.patch(args.receiptId, {
      status: "queued",
      nextRetryAt: Date.now(),
      failureReason: undefined,
    });
    return { ok: true };
  },
});

export const runReceiptDispatchNow = action({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await ctx.runAction(internal.receiptDispatch.dispatchPendingReceipts, {
      limit: args.limit ?? 20,
    });
    return { ok: true };
  },
});
