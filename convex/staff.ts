import { v } from "convex/values";
import { internal } from "./_generated/api";
import { httpAction, internalMutation, mutation, query } from "./_generated/server";
import { requireDomainAccess } from "./lib/auth";
import { normalizeEmail, staffRoleValidator } from "./lib/validators";

export const upsertFromClerk = internalMutation({
  args: {
    clerkUserId: v.string(),
    email: v.string(),
    fullName: v.string(),
    role: v.optional(staffRoleValidator),
    status: v.optional(v.union(v.literal("active"), v.literal("suspended"))),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const existing = await ctx.db
      .query("staff_users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", args.clerkUserId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        email: normalizeEmail(args.email),
        fullName: args.fullName.trim(),
        role: args.role ?? existing.role,
        status: args.status ?? existing.status,
        updatedAt: now,
      });
      return existing._id;
    }

    return await ctx.db.insert("staff_users", {
      clerkUserId: args.clerkUserId,
      email: normalizeEmail(args.email),
      fullName: args.fullName.trim(),
      role: args.role ?? "supporter_care",
      status: args.status ?? "active",
      lastSeenAt: undefined,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const suspendFromClerk = internalMutation({
  args: {
    clerkUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("staff_users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", args.clerkUserId))
      .first();
    if (!existing) {
      return { ok: true };
    }
    await ctx.db.patch(existing._id, {
      status: "suspended",
      updatedAt: Date.now(),
    });
    return { ok: true };
  },
});

export const listStaffUsers = query({
  args: {},
  handler: async (ctx) => {
    await requireDomainAccess(ctx, "settings");
    return await ctx.db.query("staff_users").collect();
  },
});

export const setStaffRole = mutation({
  args: {
    staffUserId: v.id("staff_users"),
    role: staffRoleValidator,
  },
  handler: async (ctx, args) => {
    await requireDomainAccess(ctx, "settings");
    await ctx.db.patch(args.staffUserId, {
      role: args.role,
      updatedAt: Date.now(),
    });
    return { ok: true };
  },
});

export const handleClerkUsersWebhook = httpAction(async (ctx, request) => {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (webhookSecret) {
    const token = request.headers.get("x-webhook-secret");
    if (!token || token !== webhookSecret) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  const payload = (await request.json()) as {
    type?: string;
    data?: {
      id?: string;
      email_addresses?: Array<{ email_address?: string }>;
      first_name?: string | null;
      last_name?: string | null;
      full_name?: string | null;
    };
  };

  if (!payload.data?.id) {
    return new Response("Missing user id", { status: 400 });
  }

  if (payload.type === "user.deleted") {
    await ctx.runMutation(internal.staff.suspendFromClerk, {
      clerkUserId: payload.data.id,
    });
    return new Response("ok", { status: 200 });
  }

  const email = payload.data.email_addresses?.[0]?.email_address;
  if (!email) {
    return new Response("Missing email", { status: 400 });
  }

  const fullName =
    payload.data.full_name ??
    [payload.data.first_name ?? "", payload.data.last_name ?? ""].join(" ").trim() ??
    "Staff User";

  await ctx.runMutation(internal.staff.upsertFromClerk, {
    clerkUserId: payload.data.id,
    email,
    fullName,
  });

  return new Response("ok", { status: 200 });
});
