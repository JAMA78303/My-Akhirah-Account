import { v } from "convex/values";

export const GIVING_TYPES = [
  "zakat",
  "sadaqah",
  "lillah",
  "kaffarah",
  "fidyah",
  "qurbani",
  "general",
] as const;

export const RESTRICTION_POLICIES = [
  "strict",
  "preferred",
  "unrestricted",
] as const;

export const CONTENT_STATUSES = [
  "draft",
  "scheduled",
  "published",
  "archived",
] as const;

export const CAMPAIGN_STATUSES = [
  "draft",
  "scheduled",
  "published",
  "closed",
  "archived",
] as const;

export const DONATION_INTENT_STATUSES = [
  "created",
  "checkout_created",
  "completed",
  "failed",
  "expired",
  "abandoned",
] as const;

export const NEWSLETTER_STATUSES = ["active", "unsubscribed", "bounced"] as const;

export const SUBMISSION_STATUSES = [
  "new",
  "in_review",
  "responded",
  "archived",
] as const;

export const VOLUNTEER_STATUSES = [
  "new",
  "screening",
  "contacted",
  "accepted",
  "rejected",
  "archived",
] as const;

export const STAFF_ROLES = [
  "super_admin",
  "content_editor",
  "fundraising_ops",
  "supporter_care",
] as const;

export const STAFF_STATUSES = ["active", "suspended"] as const;

export const RECEIPT_STATUSES = ["queued", "sent", "failed"] as const;

export const PAYMENT_PROVIDERS = ["flutterwave"] as const;

export const PROCESSING_OUTCOMES = ["processed", "ignored", "failed"] as const;

export const MEDIA_KINDS = ["image", "video", "document"] as const;
export const MEDIA_STATUSES = ["draft", "published", "archived"] as const;

export type GivingType = (typeof GIVING_TYPES)[number];
export type RestrictionPolicy = (typeof RESTRICTION_POLICIES)[number];
export type ContentStatus = (typeof CONTENT_STATUSES)[number];
export type CampaignStatus = (typeof CAMPAIGN_STATUSES)[number];
export type DonationIntentStatus = (typeof DONATION_INTENT_STATUSES)[number];
export type StaffRole = (typeof STAFF_ROLES)[number];

function enumValidator<const T extends readonly string[]>(values: T) {
  return v.union(...values.map((entry) => v.literal(entry)));
}

export const givingTypeValidator = enumValidator(GIVING_TYPES);
export const restrictionPolicyValidator = enumValidator(RESTRICTION_POLICIES);
export const contentStatusValidator = enumValidator(CONTENT_STATUSES);
export const campaignStatusValidator = enumValidator(CAMPAIGN_STATUSES);
export const donationIntentStatusValidator = enumValidator(DONATION_INTENT_STATUSES);
export const newsletterStatusValidator = enumValidator(NEWSLETTER_STATUSES);
export const submissionStatusValidator = enumValidator(SUBMISSION_STATUSES);
export const volunteerStatusValidator = enumValidator(VOLUNTEER_STATUSES);
export const staffRoleValidator = enumValidator(STAFF_ROLES);
export const staffStatusValidator = enumValidator(STAFF_STATUSES);
export const receiptStatusValidator = enumValidator(RECEIPT_STATUSES);
export const paymentProviderValidator = enumValidator(PAYMENT_PROVIDERS);
export const processingOutcomeValidator = enumValidator(PROCESSING_OUTCOMES);
export const mediaKindValidator = enumValidator(MEDIA_KINDS);
export const mediaStatusValidator = enumValidator(MEDIA_STATUSES);

export const slugValidator = v.string();
export const emailValidator = v.string();
export const phoneValidator = v.string();
export const currencyValidator = v.string();
export const amountMinorValidator = v.number();

export const requestMetaValidator = v.object({
  ipHash: v.optional(v.string()),
  userAgent: v.optional(v.string()),
  requestId: v.optional(v.string()),
  source: v.optional(v.string()),
});

export const newsletterInputValidator = v.object({
  email: emailValidator,
  consentTextVersion: v.string(),
  source: v.optional(v.string()),
  requestMeta: v.optional(requestMetaValidator),
});

export const contactInputValidator = v.object({
  fullName: v.string(),
  email: emailValidator,
  phone: v.optional(phoneValidator),
  subject: v.string(),
  message: v.string(),
  requestMeta: v.optional(requestMetaValidator),
});

export const volunteerInputValidator = v.object({
  fullName: v.string(),
  email: emailValidator,
  phone: phoneValidator,
  country: v.string(),
  city: v.string(),
  interests: v.array(v.string()),
  availability: v.string(),
  experience: v.optional(v.string()),
  motivation: v.string(),
  requestMeta: v.optional(requestMetaValidator),
});

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizeSlug(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}
