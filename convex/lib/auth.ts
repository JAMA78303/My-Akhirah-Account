import type { GenericMutationCtx, GenericQueryCtx } from "convex/server";
import type { DataModel, Doc } from "../_generated/dataModel";
import type { StaffRole } from "./validators";
import { assertDomainAccess, type PermissionDomain } from "./permissions";

type AuthCtx = Pick<GenericQueryCtx<DataModel>, "auth" | "db"> | Pick<GenericMutationCtx<DataModel>, "auth" | "db">;

export type StaffUserDoc = Doc<"staff_users">;

export async function getStaffUser(ctx: AuthCtx): Promise<StaffUserDoc | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity?.subject) {
    return null;
  }

  return await ctx.db
    .query("staff_users")
    .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", identity.subject))
    .first();
}

export async function requireStaffUser(ctx: AuthCtx): Promise<StaffUserDoc> {
  const staffUser = await getStaffUser(ctx);
  if (!staffUser || staffUser.status !== "active") {
    throw new Error("Unauthorized");
  }
  return staffUser;
}

export async function requireRole(ctx: AuthCtx, allowedRoles: StaffRole[]): Promise<StaffUserDoc> {
  const staffUser = await requireStaffUser(ctx);
  const staffRole = staffUser.role as StaffRole;
  if (!allowedRoles.includes(staffRole)) {
    throw new Error("Forbidden");
  }
  return staffUser;
}

export async function requireDomainAccess(ctx: AuthCtx, domain: PermissionDomain): Promise<StaffUserDoc> {
  const staffUser = await requireStaffUser(ctx);
  assertDomainAccess(staffUser.role as StaffRole, domain);
  return staffUser;
}
