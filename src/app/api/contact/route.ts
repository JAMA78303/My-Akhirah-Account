import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../../convex/_generated/api";
import { runConvexMutation } from "@/lib/server/convex";
import { consumeRateLimit, getClientIp, hashIp } from "@/lib/server/security";
import { parseContactForm, verifyHoneypot, verifySubmissionDelay } from "@/lib/validation/forms";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    verifyHoneypot(formData);
    verifySubmissionDelay(formData);
    const payload = parseContactForm(formData);

    const ipHash = hashIp(getClientIp(request));
    await consumeRateLimit("contact", ipHash, 10, 60 * 60 * 1000);

    const result = await runConvexMutation(api.forms.submitContact, {
      ...payload,
      requestMeta: {
        ipHash,
        userAgent: request.headers.get("user-agent") ?? undefined,
        requestId: randomUUID(),
        source: "website",
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to submit contact form right now." },
      { status: 400 },
    );
  }
}
