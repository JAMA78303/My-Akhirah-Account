import { v } from "convex/values";
import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";

export const dispatchPendingReceipts: ReturnType<typeof internalAction> = internalAction({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const limit = Math.min(args.limit ?? 20, 100);
    const queued = await ctx.runQuery(internal.receipts.listDispatchableReceipts, {
      before: now,
      limit,
    });

    for (const receipt of queued) {
      await ctx.runMutation(internal.receipts.markReceiptSent, {
        receiptId: receipt._id,
        deliveryProviderId: `stub-${Date.now()}`,
      });
    }

    return { processed: queued.length };
  },
});
