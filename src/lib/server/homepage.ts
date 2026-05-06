import { api } from "../../../convex/_generated/api";
import type { HomepagePayload } from "../../../convex/lib/dtos";
import { mockBlogs, mockCampaigns, mockEvents, mockImpacts, mockStats } from "../mockData";
import { fetchConvexQuery } from "./convex";

const fallbackHomepage: HomepagePayload = {
  hero: {
    title: "Zakat is our Sacred Duty",
    subtitle:
      "Transform lives through the power of giving. Join us in building a better future for communities in need around the world.",
    ctaText: "Donate Now",
    ctaHref: "/donate",
    secondaryCtaText: "Learn More",
    secondaryCtaHref: "/about",
    backgroundImage: "/hero-bg.jpg",
  },
  banners: [
    {
      id: "collections",
      title: "Why Participate in Collections?",
      description:
        "Your contributions, no matter how small, create ripples of change across communities. Every pound raised goes directly towards transforming lives and supporting those in need.",
      ctaText: "Explore campaigns",
      ctaHref: "/campaigns",
      imageUrl: "/hero-bg.jpg",
      variant: "secondary",
    },
    {
      id: "our-story",
      title: "Our Story",
      description:
        "For over 15 years, My Akhirah Account has been dedicated to serving humanity and helping Muslims invest in their hereafter through meaningful charitable work.",
      ctaText: "About Us",
      ctaHref: "/about",
      imageUrl: "/hero-bg.jpg",
      variant: "primary",
    },
  ],
  stats: mockStats,
  campaigns: mockCampaigns,
  posts: mockBlogs,
  events: mockEvents,
  impacts: mockImpacts,
};

export async function getHomepageData(): Promise<HomepagePayload> {
  try {
    const [siteData, campaigns, posts, events, stats, impacts] = await Promise.all([
      fetchConvexQuery(api.site.getHomepage, {}),
      fetchConvexQuery(api.campaigns.listPublished, { limit: 6 }),
      fetchConvexQuery(api.posts.listPublished, { limit: 6 }),
      fetchConvexQuery(api.events.listUpcoming, { limit: 6 }),
      fetchConvexQuery(api.impact.listHomepageStats, {}),
      fetchConvexQuery(api.impact.listImpactCards, { limit: 8 }),
    ]);

    const statsFromConvex =
      stats.length > 0 ? stats : siteData.stats.length > 0 ? siteData.stats : [];

    return {
      ...fallbackHomepage,
      ...siteData,
      campaigns: campaigns.length > 0 ? campaigns : fallbackHomepage.campaigns,
      posts: posts.length > 0 ? posts : fallbackHomepage.posts,
      events: events.length > 0 ? events : fallbackHomepage.events,
      stats:
        statsFromConvex.length > 0 ? statsFromConvex : fallbackHomepage.stats,
      impacts: impacts.length > 0 ? impacts : fallbackHomepage.impacts,
    };
  } catch {
    return fallbackHomepage;
  }
}
