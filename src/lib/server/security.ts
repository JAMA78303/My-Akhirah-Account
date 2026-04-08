import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";
import { api } from "../../../convex/_generated/api";
import { runConvexMutation } from "./convex";

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function hashIp(rawIp: string): string {
  return createHash("sha256").update(rawIp).digest("hex");
}

export async function consumeRateLimit(routeKey: string, ipHash: string, maxRequests: number, windowMs: number): Promise<void> {
  const response = await runConvexMutation(api.rateLimits.consume, {
    routeKey,
    ipHash,
    maxRequests,
    windowMs,
  });

  if (!response.allowed) {
    throw new Error("Rate limit exceeded");
  }
}
