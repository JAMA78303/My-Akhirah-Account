export interface CampaignCardData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  goal: number;
  raised: number;
  href: string;
}

export interface PostCardData {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  href: string;
  date?: string;
  datetime?: string;
}

export interface EventCardData {
  id: string;
  title: string;
  date: string;
  datetime?: string;
  location: string;
  imageUrl: string;
  href: string;
  isUpcoming?: boolean;
}

export interface ImpactCardData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  stat?: string;
  statLabel?: string;
  href?: string;
}

export interface HomepagePayload {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaHref: string;
    secondaryCtaText: string;
    secondaryCtaHref: string;
    backgroundImage: string;
  };
  banners: Array<{
    id: string;
    title: string;
    description: string;
    ctaText: string;
    ctaHref: string;
    imageUrl: string;
    variant: "primary" | "secondary" | "gold";
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
  campaigns: CampaignCardData[];
  posts: PostCardData[];
  events: EventCardData[];
  impacts: ImpactCardData[];
}

export interface DonationCheckoutInput {
  donor: {
    fullName: string;
    email: string;
    phone?: string;
    country?: string;
    city?: string;
  };
  fundId: string;
  campaignId?: string;
  givingType:
    | "zakat"
    | "sadaqah"
    | "lillah"
    | "kaffarah"
    | "fidyah"
    | "qurbani"
    | "general";
  amountMinor: number;
  currency: string;
  coverFees: boolean;
  isAnonymousPublic: boolean;
  messageToCharity?: string;
  consentEmailMarketing: boolean;
  consentTransactionalEmail: boolean;
}

export interface DonationCheckoutResult {
  reference: string;
  checkoutUrl: string;
}

export interface AdminDashboardSummary {
  openContacts: number;
  openVolunteers: number;
  pendingReceipts: number;
  recentDonationsCount: number;
  totalRaisedMinorLast30Days: number;
}
