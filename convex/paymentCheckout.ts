import { v } from "convex/values";
import { internal } from "./_generated/api";
import { action } from "./_generated/server";

function parseFlutterwaveResponse(data: unknown): { checkoutUrl: string; sessionId: string } {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid payment provider response");
  }

  const payload = data as {
    data?: {
      link?: string;
      id?: string | number;
    };
  };
  const checkoutUrl = payload.data?.link;
  const sessionId = payload.data?.id ? String(payload.data.id) : "";
  if (!checkoutUrl || !sessionId) {
    throw new Error("Payment provider did not return checkout session");
  }
  return { checkoutUrl, sessionId };
}

export const createHostedCheckout: ReturnType<typeof action> = action({
  args: {
    intentId: v.id("donation_intents"),
    successUrl: v.string(),
    cancelUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const intent = await ctx.runQuery(internal.donationCheckoutData.getIntentCheckoutData, {
      intentId: args.intentId,
    });
    if (!intent) {
      throw new Error("Donation intent not found");
    }

    const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
    if (!secretKey) {
      throw new Error("FLUTTERWAVE_SECRET_KEY is not configured");
    }

    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref: intent.reference,
        amount: intent.amountMajor,
        currency: intent.currency,
        redirect_url: args.successUrl,
        customer: {
          email: intent.donorEmail,
          name: intent.donorName,
          phone_number: intent.donorPhone,
        },
        customizations: {
          title: "My Akhirah Account",
          description: intent.messageToCharity ?? "Donation",
        },
        meta: {
          donation_reference: intent.reference,
          fund_id: intent.fundId,
          campaign_id: intent.campaignId ?? null,
          giving_type: intent.givingType,
          cancel_url: args.cancelUrl,
        },
      }),
    });

    if (!response.ok) {
      const failure = await response.text();
      throw new Error(`Checkout creation failed: ${failure}`);
    }

    const body = await response.json();
    const { checkoutUrl, sessionId } = parseFlutterwaveResponse(body);

    await ctx.runMutation(internal.donationCheckoutData.updateCheckoutSession, {
      intentId: args.intentId,
      providerSessionId: sessionId,
      checkoutUrl,
    });

    return {
      reference: intent.reference,
      checkoutUrl,
    };
  },
});
