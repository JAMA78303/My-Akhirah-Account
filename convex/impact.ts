import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireDomainAccess } from "./lib/auth";
import { createRequestId } from "./lib/references";
import { normalizeSlug } from "./lib/validators";

function formatStatValue(value: number, format: string): string {
  if (format === "currency_short") {
    return new Intl.NumberFormat("en-GB", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }
  if (format === "integer") {
    return new Intl.NumberFormat("en-GB", {
      maximumFractionDigits: 0,
    }).format(value);
  }
  return `${value}`;
}

export const listHomepageStats = query({
  args: {},
  handler: async (ctx) => {
    const metrics = await ctx.db.query("impact_metrics").collect();
    const statMetrics = metrics
      .filter((metric) => metric.isHomepageStat)
      .sort((left, right) => left.sortOrder - right.sortOrder);

    const output: Array<{ value: string; label: string }> = [];
    for (const metric of statMetrics) {
      const snapshot = await ctx.db
        .query("impact_snapshots")
        .withIndex("by_metric_capturedAt", (q) => q.eq("metricId", metric._id))
        .order("desc")
        .first();

      if (!snapshot) {
        continue;
      }

      output.push({
        value: formatStatValue(snapshot.value, metric.displayFormat),
        label: metric.label,
      });
    }

    return output;
  },
});

export const listImpactCards = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(args.limit ?? 8, 20);
    const metrics = (await ctx.db.query("impact_metrics").collect())
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .slice(0, limit);

    const cards: Array<{
      id: string;
      title: string;
      description: string;
      imageUrl: string;
      stat?: string;
      statLabel?: string;
      href?: string;
    }> = [];

    for (const metric of metrics) {
      const snapshot = await ctx.db
        .query("impact_snapshots")
        .withIndex("by_metric_capturedAt", (q) => q.eq("metricId", metric._id))
        .order("desc")
        .first();

      cards.push({
        id: metric._id,
        title: metric.label,
        description: snapshot?.note ?? "Measured impact updated regularly.",
        imageUrl: "/hero-bg.jpg",
        stat: snapshot ? formatStatValue(snapshot.value, metric.displayFormat) : undefined,
        statLabel: metric.unit,
        href: `/projects?metric=${metric.slug}`,
      });
    }

    return cards;
  },
});

export const createMetric = mutation({
  args: {
    slug: v.string(),
    label: v.string(),
    unit: v.string(),
    displayFormat: v.string(),
    sortOrder: v.number(),
    isHomepageStat: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireDomainAccess(ctx, "content");
    const now = Date.now();
    return await ctx.db.insert("impact_metrics", {
      slug: normalizeSlug(args.slug),
      label: args.label.trim(),
      unit: args.unit.trim(),
      displayFormat: args.displayFormat.trim(),
      sortOrder: args.sortOrder,
      isHomepageStat: args.isHomepageStat,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const addSnapshot = mutation({
  args: {
    metricId: v.id("impact_metrics"),
    value: v.number(),
    capturedAt: v.optional(v.number()),
    programId: v.optional(v.id("programs")),
    campaignId: v.optional(v.id("campaigns")),
    note: v.optional(v.string()),
    requestId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const staffUser = await requireDomainAccess(ctx, "content");
    const now = Date.now();
    const snapshotId = await ctx.db.insert("impact_snapshots", {
      metricId: args.metricId,
      value: args.value,
      capturedAt: args.capturedAt ?? now,
      programId: args.programId,
      campaignId: args.campaignId,
      note: args.note?.trim(),
      createdAt: now,
    });

    await ctx.db.insert("audit_logs", {
      actorStaffUserId: staffUser._id,
      entityType: "impact_snapshot",
      entityId: String(snapshotId),
      action: "create",
      beforeJson: undefined,
      afterJson: JSON.stringify(args),
      requestId: args.requestId ?? createRequestId(now),
      createdAt: now,
    });

    return snapshotId;
  },
});
