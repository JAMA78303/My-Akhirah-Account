import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
  campaignStatusValidator,
  contentStatusValidator,
  donationIntentStatusValidator,
  givingTypeValidator,
  mediaKindValidator,
  mediaStatusValidator,
  newsletterStatusValidator,
  paymentProviderValidator,
  processingOutcomeValidator,
  receiptStatusValidator,
  restrictionPolicyValidator,
  staffRoleValidator,
  staffStatusValidator,
  submissionStatusValidator,
  volunteerStatusValidator,
} from "./lib/validators";

export default defineSchema({
  site_settings: defineTable({
    key: v.string(),
    value: v.any(),
    updatedAt: v.number(),
    updatedBy: v.optional(v.id("staff_users")),
  }).index("by_key", ["key"]),

  media_assets: defineTable({
    storageId: v.id("_storage"),
    altText: v.string(),
    caption: v.optional(v.string()),
    kind: mediaKindValidator,
    status: mediaStatusValidator,
    uploadedBy: v.optional(v.id("staff_users")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_status", ["status"]),

  funds: defineTable({
    slug: v.string(),
    name: v.string(),
    summary: v.string(),
    descriptionMarkdown: v.string(),
    givingType: givingTypeValidator,
    restrictionPolicy: restrictionPolicyValidator,
    isGeneralFund: v.boolean(),
    beneficiaryRegions: v.array(v.string()),
    isActive: v.boolean(),
    defaultCampaignId: v.optional(v.id("campaigns")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),

  programs: defineTable({
    slug: v.string(),
    name: v.string(),
    summary: v.string(),
    descriptionMarkdown: v.string(),
    heroMediaId: v.optional(v.id("media_assets")),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),

  campaigns: defineTable({
    slug: v.string(),
    title: v.string(),
    summary: v.string(),
    descriptionMarkdown: v.string(),
    heroMediaId: v.optional(v.id("media_assets")),
    status: campaignStatusValidator,
    programId: v.optional(v.id("programs")),
    fundId: v.id("funds"),
    targetAmountMinor: v.number(),
    currency: v.string(),
    raisedAmountMinorCached: v.number(),
    beneficiaryCountries: v.array(v.string()),
    isFeatured: v.boolean(),
    startsAt: v.optional(v.number()),
    endsAt: v.optional(v.number()),
    publishedAt: v.optional(v.number()),
    closedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_featured", ["isFeatured"])
    .index("by_fund_status", ["fundId", "status"])
    .searchIndex("search_body", {
      searchField: "descriptionMarkdown",
      filterFields: ["status"],
    }),

  post_categories: defineTable({
    slug: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),

  posts: defineTable({
    slug: v.string(),
    title: v.string(),
    excerpt: v.string(),
    bodyMarkdown: v.string(),
    heroMediaId: v.optional(v.id("media_assets")),
    categoryId: v.id("post_categories"),
    tags: v.array(v.string()),
    status: contentStatusValidator,
    publishedAt: v.optional(v.number()),
    authorStaffUserId: v.id("staff_users"),
    featuredRank: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status_publishedAt", ["status", "publishedAt"])
    .index("by_category_status_publishedAt", ["categoryId", "status", "publishedAt"])
    .searchIndex("search_body", {
      searchField: "bodyMarkdown",
      filterFields: ["status", "categoryId"],
    }),

  events: defineTable({
    slug: v.string(),
    title: v.string(),
    summary: v.string(),
    descriptionMarkdown: v.string(),
    heroMediaId: v.optional(v.id("media_assets")),
    locationLabel: v.string(),
    locationCountry: v.optional(v.string()),
    startsAt: v.number(),
    endsAt: v.optional(v.number()),
    status: contentStatusValidator,
    publishedAt: v.optional(v.number()),
    isFeatured: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status_startsAt", ["status", "startsAt"])
    .searchIndex("search_body", {
      searchField: "descriptionMarkdown",
      filterFields: ["status"],
    }),

  impact_metrics: defineTable({
    slug: v.string(),
    label: v.string(),
    unit: v.string(),
    displayFormat: v.string(),
    sortOrder: v.number(),
    isHomepageStat: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),

  impact_snapshots: defineTable({
    metricId: v.id("impact_metrics"),
    value: v.number(),
    capturedAt: v.number(),
    programId: v.optional(v.id("programs")),
    campaignId: v.optional(v.id("campaigns")),
    note: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_metric_capturedAt", ["metricId", "capturedAt"]),

  donor_profiles: defineTable({
    email: v.string(),
    fullName: v.string(),
    phone: v.optional(v.string()),
    country: v.optional(v.string()),
    city: v.optional(v.string()),
    preferredCurrency: v.optional(v.string()),
    consentEmailMarketing: v.boolean(),
    consentTransactionalEmail: v.boolean(),
    source: v.optional(v.string()),
    lastDonationAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),

  donation_intents: defineTable({
    reference: v.string(),
    status: donationIntentStatusValidator,
    donorProfileId: v.id("donor_profiles"),
    fundId: v.id("funds"),
    campaignId: v.optional(v.id("campaigns")),
    givingType: givingTypeValidator,
    amountMinor: v.number(),
    currency: v.string(),
    coverFees: v.boolean(),
    isAnonymousPublic: v.boolean(),
    messageToCharity: v.optional(v.string()),
    provider: paymentProviderValidator,
    providerSessionId: v.optional(v.string()),
    providerCheckoutUrl: v.optional(v.string()),
    expiresAt: v.number(),
    completedDonationId: v.optional(v.id("donations")),
    failureCode: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_reference", ["reference"])
    .index("by_status_expiresAt", ["status", "expiresAt"]),

  payment_events: defineTable({
    provider: paymentProviderValidator,
    providerEventId: v.string(),
    eventType: v.string(),
    receivedAt: v.number(),
    intentReference: v.optional(v.string()),
    payloadJson: v.string(),
    processedAt: v.optional(v.number()),
    processingOutcome: processingOutcomeValidator,
  }).index("by_provider_event_id", ["provider", "providerEventId"]),

  donations: defineTable({
    reference: v.string(),
    donationIntentId: v.id("donation_intents"),
    donorProfileId: v.id("donor_profiles"),
    fundId: v.id("funds"),
    campaignId: v.optional(v.id("campaigns")),
    givingType: givingTypeValidator,
    amountMinor: v.number(),
    currency: v.string(),
    provider: paymentProviderValidator,
    providerTransactionId: v.string(),
    receivedAt: v.number(),
    receiptStatus: receiptStatusValidator,
    isAnonymousPublic: v.boolean(),
    allocationPolicyVersion: v.string(),
    createdAt: v.number(),
  })
    .index("by_reference", ["reference"])
    .index("by_donor_receivedAt", ["donorProfileId", "receivedAt"])
    .index("by_campaign_receivedAt", ["campaignId", "receivedAt"]),

  donation_allocations: defineTable({
    donationId: v.id("donations"),
    fundId: v.id("funds"),
    campaignId: v.optional(v.id("campaigns")),
    programId: v.optional(v.id("programs")),
    amountMinor: v.number(),
    currency: v.string(),
    restrictionPolicyApplied: restrictionPolicyValidator,
    createdAt: v.number(),
  }).index("by_donation", ["donationId"]),

  receipts: defineTable({
    donationId: v.id("donations"),
    receiptNumber: v.string(),
    templateVersion: v.string(),
    recipientEmail: v.string(),
    queuedAt: v.number(),
    sentAt: v.optional(v.number()),
    failedAt: v.optional(v.number()),
    deliveryProviderId: v.optional(v.string()),
    failureReason: v.optional(v.string()),
    status: receiptStatusValidator,
    retryCount: v.number(),
    nextRetryAt: v.optional(v.number()),
  }).index("by_status_nextRetryAt", ["status", "nextRetryAt"]),

  newsletter_subscribers: defineTable({
    email: v.string(),
    status: newsletterStatusValidator,
    subscribedAt: v.number(),
    unsubscribedAt: v.optional(v.number()),
    source: v.optional(v.string()),
    consentTextVersion: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),

  contact_submissions: defineTable({
    fullName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
    status: submissionStatusValidator,
    assignedTo: v.optional(v.id("staff_users")),
    createdAt: v.number(),
    resolvedAt: v.optional(v.number()),
    notesCountCached: v.number(),
  }).index("by_status_createdAt", ["status", "createdAt"]),

  volunteer_applications: defineTable({
    fullName: v.string(),
    email: v.string(),
    phone: v.string(),
    country: v.string(),
    city: v.string(),
    interests: v.array(v.string()),
    availability: v.string(),
    experience: v.optional(v.string()),
    motivation: v.string(),
    status: volunteerStatusValidator,
    assignedTo: v.optional(v.id("staff_users")),
    createdAt: v.number(),
    resolvedAt: v.optional(v.number()),
  }).index("by_status_createdAt", ["status", "createdAt"]),

  staff_users: defineTable({
    clerkUserId: v.string(),
    email: v.string(),
    fullName: v.string(),
    role: staffRoleValidator,
    status: staffStatusValidator,
    lastSeenAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_user_id", ["clerkUserId"])
    .index("by_email", ["email"]),

  audit_logs: defineTable({
    actorStaffUserId: v.optional(v.id("staff_users")),
    entityType: v.string(),
    entityId: v.optional(v.string()),
    action: v.string(),
    beforeJson: v.optional(v.string()),
    afterJson: v.optional(v.string()),
    requestId: v.string(),
    createdAt: v.number(),
  }).index("by_entity", ["entityType", "entityId"]),

  system_jobs: defineTable({
    kind: v.string(),
    status: v.string(),
    payloadJson: v.optional(v.string()),
    resultJson: v.optional(v.string()),
    error: v.optional(v.string()),
    runAfter: v.optional(v.number()),
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_status_runAfter", ["status", "runAfter"]),

  request_limits: defineTable({
    routeKey: v.string(),
    ipHash: v.string(),
    count: v.number(),
    windowStart: v.number(),
    expiresAt: v.number(),
  }).index("by_route_ip", ["routeKey", "ipHash"]),
});
