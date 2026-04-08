import { v } from "convex/values";
import { internalMutation } from "./_generated/server";
import { paymentProviderValidator, processingOutcomeValidator } from "./lib/validators";

export const upsert = internalMutation({
  args: {
    provider: paymentProviderValidator,
    providerEventId: v.string(),
    eventType: v.string(),
    intentReference: v.optional(v.string()),
    payloadJson: v.string(),
    processingOutcome: processingOutcomeValidator,
    processedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("payment_events")
      .withIndex("by_provider_event_id", (q) =>
        q.eq("provider", args.provider).eq("providerEventId", args.providerEventId),
      )
      .first();

    const now = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, {
        eventType: args.eventType,
        intentReference: args.intentReference,
        payloadJson: args.payloadJson,
        processingOutcome: args.processingOutcome,
        processedAt: args.processedAt ?? existing.processedAt,
      });
      return { eventId: existing._id, isDuplicate: true };
    }

    const eventId = await ctx.db.insert("payment_events", {
      provider: args.provider,
      providerEventId: args.providerEventId,
      eventType: args.eventType,
      intentReference: args.intentReference,
      payloadJson: args.payloadJson,
      receivedAt: now,
      processingOutcome: args.processingOutcome,
      processedAt: args.processedAt,
    });
    return { eventId, isDuplicate: false };
  },
});
