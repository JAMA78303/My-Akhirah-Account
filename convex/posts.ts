import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { contentStatusValidator, normalizeSlug } from "./lib/validators";
import { requireDomainAccess, requireStaffUser } from "./lib/auth";
import { createRequestId } from "./lib/references";

function postHref(slug: string): string {
  return `/blog/${slug}`;
}

function mediaUrl(mediaId: string | undefined): string {
  return mediaId ? `/api/media/${mediaId}` : "/hero-bg.jpg";
}

export const listPublished = query({
  args: {
    categorySlug: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = Math.min(args.limit ?? 12, 50);
    let posts = await ctx.db
      .query("posts")
      .withIndex("by_status_publishedAt", (q) => q.eq("status", "published"))
      .collect();

    if (args.categorySlug) {
      const category = await ctx.db
        .query("post_categories")
        .withIndex("by_slug", (q) => q.eq("slug", normalizeSlug(args.categorySlug!)))
        .first();

      posts = category ? posts.filter((post) => post.categoryId === category._id) : [];
    }

    const categories = await ctx.db.query("post_categories").collect();
    const categoryById = new Map(categories.map((category) => [String(category._id), category]));

    return posts
      .sort((left, right) => (right.publishedAt ?? 0) - (left.publishedAt ?? 0))
      .slice(0, limit)
      .map((post) => ({
        id: post._id,
        title: post.title,
        category: categoryById.get(String(post.categoryId))?.name ?? "General",
        excerpt: post.excerpt,
        imageUrl: mediaUrl(post.heroMediaId),
        href: postHref(post.slug),
        date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-GB") : undefined,
        datetime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
      }));
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", normalizeSlug(args.slug)))
      .first();
    if (!post || post.status !== "published") {
      return null;
    }

    const category = await ctx.db.get(post.categoryId);
    return {
      ...post,
      category,
      imageUrl: mediaUrl(post.heroMediaId),
      href: postHref(post.slug),
    };
  },
});

export const listCategories = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("post_categories").collect();
  },
});

export const createCategory = mutation({
  args: {
    slug: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireDomainAccess(ctx, "content");
    const now = Date.now();
    return await ctx.db.insert("post_categories", {
      slug: normalizeSlug(args.slug),
      name: args.name.trim(),
      description: args.description?.trim(),
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const create = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    excerpt: v.string(),
    bodyMarkdown: v.string(),
    heroMediaId: v.optional(v.id("media_assets")),
    categoryId: v.id("post_categories"),
    tags: v.array(v.string()),
    status: v.optional(contentStatusValidator),
    featuredRank: v.optional(v.number()),
    requestId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const staffUser = await requireStaffUser(ctx);
    const now = Date.now();
    const postId = await ctx.db.insert("posts", {
      slug: normalizeSlug(args.slug),
      title: args.title.trim(),
      excerpt: args.excerpt.trim(),
      bodyMarkdown: args.bodyMarkdown.trim(),
      heroMediaId: args.heroMediaId,
      categoryId: args.categoryId,
      tags: args.tags.map((tag) => tag.trim()).filter(Boolean),
      status: args.status ?? "draft",
      publishedAt: undefined,
      authorStaffUserId: staffUser._id,
      featuredRank: args.featuredRank,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("audit_logs", {
      actorStaffUserId: staffUser._id,
      entityType: "post",
      entityId: String(postId),
      action: "create",
      beforeJson: undefined,
      afterJson: JSON.stringify(args),
      requestId: args.requestId ?? createRequestId(now),
      createdAt: now,
    });

    return postId;
  },
});

export const publish = mutation({
  args: { postId: v.id("posts"), requestId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const staffUser = await requireDomainAccess(ctx, "content");
    const now = Date.now();
    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new Error("Post not found");
    }

    await ctx.db.patch(args.postId, {
      status: "published",
      publishedAt: now,
      updatedAt: now,
    });

    await ctx.db.insert("audit_logs", {
      actorStaffUserId: staffUser._id,
      entityType: "post",
      entityId: String(args.postId),
      action: "publish",
      beforeJson: JSON.stringify({ status: post.status, publishedAt: post.publishedAt }),
      afterJson: JSON.stringify({ status: "published", publishedAt: now }),
      requestId: args.requestId ?? createRequestId(now),
      createdAt: now,
    });

    return { ok: true };
  },
});
