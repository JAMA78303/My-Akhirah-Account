import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import { runConvexAction, runConvexMutation } from "@/lib/server/convex";
import { consumeRateLimit, getClientIp, hashIp } from "@/lib/server/security";
import { parseDonationCheckoutForm, verifyHoneypot, verifySubmissionDelay } from "@/lib/validation/forms";

const allowedGivingTypes = new Set([
  "zakat",
  "sadaqah",
  "lillah",
  "kaffarah",
  "fidyah",
  "qurbani",
  "general",
]);
type GivingType =
  | "zakat"
  | "sadaqah"
  | "lillah"
  | "kaffarah"
  | "fidyah"
  | "qurbani"
  | "general";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    verifyHoneypot(formData);
    verifySubmissionDelay(formData);
    const payload = parseDonationCheckoutForm(formData);

    if (!allowedGivingTypes.has(payload.givingType)) {
      throw new Error("Invalid giving type");
    }

    const ipHash = hashIp(getClientIp(request));
    await consumeRateLimit("donation_checkout", ipHash, 25, 60 * 60 * 1000);

    const intent = await runConvexMutation(api.donations.createIntent, {
      donor: payload.donor,
      fundId: payload.fundId as unknown as Id<"funds">,
      campaignId: payload.campaignId ? (payload.campaignId as unknown as Id<"campaigns">) : undefined,
      givingType: payload.givingType as GivingType,
      amountMinor: payload.amountMinor,
      currency: payload.currency,
      coverFees: payload.coverFees,
      isAnonymousPublic: payload.isAnonymousPublic,
      messageToCharity: payload.messageToCharity,
      expiresInMinutes: 30,
    });

    const origin = request.nextUrl.origin;
    const checkout = await runConvexAction(api.payments.createHostedCheckout, {
      intentId: intent.intentId,
      successUrl: `${origin}/donate/success?ref=${encodeURIComponent(intent.reference)}`,
      cancelUrl: `${origin}/donate?cancelled=true`,
    });

    return NextResponse.json({
      requestId: randomUUID(),
      ...checkout,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create checkout right now." },
      { status: 400 },
    );
  }
}
