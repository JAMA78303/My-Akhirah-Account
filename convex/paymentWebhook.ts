import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

export const handleFlutterwaveWebhook = httpAction(async (ctx, request) => {
  const webhookSecret = process.env.FLUTTERWAVE_WEBHOOK_HASH ?? "";
  const providedSignature = request.headers.get("verif-hash") ?? "";
  if (!webhookSecret || !providedSignature || providedSignature !== webhookSecret) {
    return new Response("Invalid webhook signature", { status: 401 });
  }

  const bodyText = await request.text();
  let payload: {
    id?: string | number;
    event?: string;
    data?: {
      tx_ref?: string;
      status?: string;
      amount?: number;
      currency?: string;
      id?: string | number;
    };
  };

  try {
    payload = JSON.parse(bodyText);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const providerEventId = payload.id ? String(payload.id) : `evt_${Date.now()}`;
  const eventType = payload.event ?? "unknown";
  const intentReference = payload.data?.tx_ref;
  const paymentStatus = payload.data?.status ?? "unknown";

  const upsert = await ctx.runMutation(internal.paymentEvents.upsert, {
    provider: "flutterwave",
    providerEventId,
    eventType,
    intentReference,
    payloadJson: bodyText,
    processingOutcome: "processed",
    processedAt: Date.now(),
  });

  if (upsert.isDuplicate) {
    return new Response("ok", { status: 200 });
  }

  if (!intentReference) {
    return new Response("missing tx_ref", { status: 202 });
  }

  if (paymentStatus === "successful") {
    await ctx.runMutation(internal.donations.markIntentCompleted, {
      intentReference,
      providerTransactionId: payload.data?.id ? String(payload.data.id) : providerEventId,
      paidAmountMinor: Math.round((payload.data?.amount ?? 0) * 100),
      paidCurrency: payload.data?.currency ?? "USD",
    });
    return new Response("ok", { status: 200 });
  }

  await ctx.runMutation(internal.donations.markIntentFailed, {
    intentReference,
    failureCode: paymentStatus,
  });
  return new Response("ok", { status: 200 });
});
