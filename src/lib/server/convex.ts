import { ConvexHttpClient } from "convex/browser";
import type { FunctionReference } from "convex/server";

function resolveConvexUrl(): string {
  const value = process.env.NEXT_PUBLIC_CONVEX_URL ?? process.env.CONVEX_URL;
  if (!value) {
    throw new Error("Missing NEXT_PUBLIC_CONVEX_URL (or CONVEX_URL) for server-side Convex access.");
  }
  return value;
}

export function getServerConvexClient(): ConvexHttpClient {
  return new ConvexHttpClient(resolveConvexUrl());
}

export async function fetchConvexQuery<QueryRef extends FunctionReference<"query">>(
  queryRef: QueryRef,
  args: QueryRef["_args"],
): Promise<QueryRef["_returnType"]> {
  const client = getServerConvexClient();
  return await client.query(queryRef, args);
}

export async function runConvexMutation<MutationRef extends FunctionReference<"mutation">>(
  mutationRef: MutationRef,
  args: MutationRef["_args"],
): Promise<MutationRef["_returnType"]> {
  const client = getServerConvexClient();
  return await client.mutation(mutationRef, args);
}

export async function runConvexAction<ActionRef extends FunctionReference<"action">>(
  actionRef: ActionRef,
  args: ActionRef["_args"],
): Promise<ActionRef["_returnType"]> {
  const client = getServerConvexClient();
  return await client.action(actionRef, args);
}
