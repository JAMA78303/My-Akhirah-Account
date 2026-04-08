import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { contentStatusValidator, normalizeSlug } from "./lib/validators";
import { requireDomainAccess } from "./lib/auth";
import { createRequestId } from "./lib/references";

function eventHref(slug: string): string {
  return `/events/${slug}`;
}

function mediaUrl(mediaId: string | undefined): string {
  return mediaId ? `/api/media/${mediaId}` : "/hero-bg.jpg";
}

export const listUpcoming = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const limit = Math.min(args.limit ?? 12, 50);
    const events = await ctx.db
      .query("events")
      .withIndex("by_status_startsAt", (q) => q.eq("status", "published"))
      .collect();

    return events
      .filter((event) => event.startsAt >= now)
      .sort((left, right) => left.startsAt - right.startsAt)
      .slice(0, limit)
      .map((event) => ({
        id: event._id,
        title: event.title,
        date: new Date(event.startsAt).toLocaleDateString("en-GB"),
        datetime: new Date(event.startsAt).toISOString(),
        location: event.locationLabel,
        imageUrl: mediaUrl(event.heroMediaId),
        href: eventHref(event.slug),
        isUpcoming: true,
      }));
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const event = await ctx.db
      .query("events")
      .withIndex("by_slug", (q) => q.eq("slug", normalizeSlug(args.slug)))
      .first();
    if (!event || event.status !== "published") {
      return null;
    }

    return {
      ...event,
      imageUrl: mediaUrl(event.heroMediaId),
      href: eventHref(event.slug),
    };
  },
});

export const create = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    summary: v.string(),
    descriptionMarkdown: v.string(),
    heroMediaId: v.optional(v.id("media_assets")),
    locationLabel: v.string(),
    locationCountry: v.optional(v.string()),
    startsAt: v.number(),
    endsAt: v.optional(v.number()),
    status: v.optional(contentStatusValidator),
    isFeatured: v.optional(v.boolean()),
    requestId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const staffUser = await requireDomainAccess(ctx, "content");
    const now = Date.now();
    const eventId = await ctx.db.insert("events", {
      slug: normalizeSlug(args.slug),
      title: args.title.trim(),
      summary: args.summary.trim(),
      descriptionMarkdown: args.descriptionMarkdown.trim(),
      heroMediaId: args.heroMediaId,
      locationLabel: args.locationLabel.trim(),
      locationCountry: args.locationCountry?.trim(),
      startsAt: args.startsAt,
      endsAt: args.endsAt,
      status: args.status ?? "draft",
      publishedAt: undefined,
      isFeatured: args.isFeatured ?? false,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("audit_logs", {
      actorStaffUserId: staffUser._id,
      entityType: "event",
      entityId: String(eventId),
      action: "create",
      beforeJson: undefined,
      afterJson: JSON.stringify(args),
      requestId: args.requestId ?? createRequestId(now),
      createdAt: now,
    });

    return eventId;
  },
});

export const publish = mutation({
  args: {
    eventId: v.id("events"),
    requestId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const staffUser = await requireDomainAccess(ctx, "content");
    const now = Date.now();
    const event = await ctx.db.get(args.eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    await ctx.db.patch(args.eventId, {
      status: "published",
      publishedAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("audit_logs", {
      actorStaffUserId: staffUser._id,
      entityType: "event",
      entityId: String(args.eventId),
      action: "publish",
      beforeJson: JSON.stringify({ status: event.status, publishedAt: event.publishedAt }),
      afterJson: JSON.stringify({ status: "published", publishedAt: now }),
      requestId: args.requestId ?? createRequestId(now),
      createdAt: now,
    });

    return { ok: true };
  },
});
