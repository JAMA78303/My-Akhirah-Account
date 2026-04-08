import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
  contactInputValidator,
  newsletterInputValidator,
  normalizeEmail,
  submissionStatusValidator,
  volunteerInputValidator,
  volunteerStatusValidator,
} from "./lib/validators";
import { requireDomainAccess } from "./lib/auth";
import { createRequestId } from "./lib/references";

export const subscribeNewsletter = mutation({
  args: newsletterInputValidator,
  handler: async (ctx, args) => {
    const now = Date.now();
    const email = normalizeEmail(args.email);
    const existing = await ctx.db
      .query("newsletter_subscribers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!existing) {
      await ctx.db.insert("newsletter_subscribers", {
        email,
        status: "active",
        subscribedAt: now,
        unsubscribedAt: undefined,
        source: args.source ?? args.requestMeta?.source,
        consentTextVersion: args.consentTextVersion,
        createdAt: now,
        updatedAt: now,
      });
      return { status: "subscribed" as const };
    }

    await ctx.db.patch(existing._id, {
      status: "active",
      unsubscribedAt: undefined,
      source: args.source ?? args.requestMeta?.source ?? existing.source,
      consentTextVersion: args.consentTextVersion,
      updatedAt: now,
    });
    return { status: "reactivated" as const };
  },
});

export const submitContact = mutation({
  args: contactInputValidator,
  handler: async (ctx, args) => {
    const now = Date.now();
    const id = await ctx.db.insert("contact_submissions", {
      fullName: args.fullName.trim(),
      email: normalizeEmail(args.email),
      phone: args.phone?.trim(),
      subject: args.subject.trim(),
      message: args.message.trim(),
      status: "new",
      assignedTo: undefined,
      createdAt: now,
      resolvedAt: undefined,
      notesCountCached: 0,
    });
    return { id, status: "created" as const };
  },
});

export const submitVolunteer = mutation({
  args: volunteerInputValidator,
  handler: async (ctx, args) => {
    const now = Date.now();
    const id = await ctx.db.insert("volunteer_applications", {
      fullName: args.fullName.trim(),
      email: normalizeEmail(args.email),
      phone: args.phone.trim(),
      country: args.country.trim(),
      city: args.city.trim(),
      interests: args.interests.map((interest) => interest.trim()).filter(Boolean),
      availability: args.availability.trim(),
      experience: args.experience?.trim(),
      motivation: args.motivation.trim(),
      status: "new",
      assignedTo: undefined,
      createdAt: now,
      resolvedAt: undefined,
    });
    return { id, status: "created" as const };
  },
});

export const listContactSubmissions = query({
  args: {
    status: v.optional(submissionStatusValidator),
  },
  handler: async (ctx, args) => {
    await requireDomainAccess(ctx, "supporters");
    let records;
    if (args.status !== undefined) {
      const filterStatus = args.status;
      records = await ctx.db
        .query("contact_submissions")
        .withIndex("by_status_createdAt", (q) => q.eq("status", filterStatus))
        .collect();
    } else {
      records = await ctx.db.query("contact_submissions").collect();
    }
    return records.sort((left, right) => right.createdAt - left.createdAt);
  },
});

export const listVolunteerApplications = query({
  args: {
    status: v.optional(volunteerStatusValidator),
  },
  handler: async (ctx, args) => {
    await requireDomainAccess(ctx, "supporters");
    let records;
    if (args.status !== undefined) {
      const filterStatus = args.status;
      records = await ctx.db
        .query("volunteer_applications")
        .withIndex("by_status_createdAt", (q) => q.eq("status", filterStatus))
        .collect();
    } else {
      records = await ctx.db.query("volunteer_applications").collect();
    }
    return records.sort((left, right) => right.createdAt - left.createdAt);
  },
});

export const updateContactStatus = mutation({
  args: {
    submissionId: v.id("contact_submissions"),
    status: submissionStatusValidator,
    requestId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const staffUser = await requireDomainAccess(ctx, "supporters");
    const now = Date.now();
    const record = await ctx.db.get(args.submissionId);
    if (!record) {
      throw new Error("Contact submission not found");
    }

    await ctx.db.patch(args.submissionId, {
      status: args.status,
      resolvedAt: args.status === "responded" || args.status === "archived" ? now : undefined,
      assignedTo: record.assignedTo ?? staffUser._id,
    });

    await ctx.db.insert("audit_logs", {
      actorStaffUserId: staffUser._id,
      entityType: "contact_submission",
      entityId: String(args.submissionId),
      action: "update_status",
      beforeJson: JSON.stringify({ status: record.status }),
      afterJson: JSON.stringify({ status: args.status }),
      requestId: args.requestId ?? createRequestId(now),
      createdAt: now,
    });
    return { ok: true };
  },
});

export const updateVolunteerStatus = mutation({
  args: {
    applicationId: v.id("volunteer_applications"),
    status: volunteerStatusValidator,
    requestId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const staffUser = await requireDomainAccess(ctx, "supporters");
    const now = Date.now();
    const record = await ctx.db.get(args.applicationId);
    if (!record) {
      throw new Error("Volunteer application not found");
    }

    await ctx.db.patch(args.applicationId, {
      status: args.status,
      resolvedAt: args.status === "accepted" || args.status === "rejected" || args.status === "archived" ? now : undefined,
      assignedTo: record.assignedTo ?? staffUser._id,
    });

    await ctx.db.insert("audit_logs", {
      actorStaffUserId: staffUser._id,
      entityType: "volunteer_application",
      entityId: String(args.applicationId),
      action: "update_status",
      beforeJson: JSON.stringify({ status: record.status }),
      afterJson: JSON.stringify({ status: args.status }),
      requestId: args.requestId ?? createRequestId(now),
      createdAt: now,
    });
    return { ok: true };
  },
});
