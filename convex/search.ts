import { v } from "convex/values";
import { query } from "./_generated/server";

export const global = query({
  args: {
    query: v.string(),
    type: v.optional(v.union(v.literal("post"), v.literal("campaign"), v.literal("event"))),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const searchQuery = args.query.trim().toLowerCase();
    if (!searchQuery) {
      return [];
    }
    const limit = Math.min(args.limit ?? 15, 50);
    const output: Array<{
      type: "post" | "campaign" | "event";
      id: string;
      title: string;
      excerpt: string;
      href: string;
    }> = [];

    if (!args.type || args.type === "post") {
      const posts = await ctx.db
        .query("posts")
        .withIndex("by_status_publishedAt", (q) => q.eq("status", "published"))
        .collect();
      for (const post of posts) {
        if (
          post.title.toLowerCase().includes(searchQuery) ||
          post.excerpt.toLowerCase().includes(searchQuery) ||
          post.bodyMarkdown.toLowerCase().includes(searchQuery)
        ) {
          output.push({
            type: "post",
            id: post._id,
            title: post.title,
            excerpt: post.excerpt,
            href: `/blog/${post.slug}`,
          });
        }
      }
    }

    if (!args.type || args.type === "campaign") {
      const campaigns = await ctx.db
        .query("campaigns")
        .withIndex("by_status", (q) => q.eq("status", "published"))
        .collect();
      for (const campaign of campaigns) {
        if (
          campaign.title.toLowerCase().includes(searchQuery) ||
          campaign.summary.toLowerCase().includes(searchQuery) ||
          campaign.descriptionMarkdown.toLowerCase().includes(searchQuery)
        ) {
          output.push({
            type: "campaign",
            id: campaign._id,
            title: campaign.title,
            excerpt: campaign.summary,
            href: `/campaigns/${campaign.slug}`,
          });
        }
      }
    }

    if (!args.type || args.type === "event") {
      const events = await ctx.db
        .query("events")
        .withIndex("by_status_startsAt", (q) => q.eq("status", "published"))
        .collect();
      for (const event of events) {
        if (
          event.title.toLowerCase().includes(searchQuery) ||
          event.summary.toLowerCase().includes(searchQuery) ||
          event.descriptionMarkdown.toLowerCase().includes(searchQuery)
        ) {
          output.push({
            type: "event",
            id: event._id,
            title: event.title,
            excerpt: event.summary,
            href: `/events/${event.slug}`,
          });
        }
      }
    }

    return output.slice(0, limit);
  },
});
