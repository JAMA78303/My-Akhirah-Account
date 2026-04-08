export interface RequestMetaInput {
  source?: string;
  requestId?: string;
  userAgent?: string;
  ipHash?: string;
}

function readString(formData: FormData, key: string, options?: { required?: boolean; max?: number }): string | undefined {
  const value = formData.get(key);
  if (typeof value !== "string") {
    if (options?.required) {
      throw new Error(`Missing ${key}`);
    }
    return undefined;
  }

  const trimmed = value.trim();
  if (options?.required && !trimmed) {
    throw new Error(`Missing ${key}`);
  }
  if (options?.max && trimmed.length > options.max) {
    throw new Error(`${key} is too long`);
  }
  return trimmed;
}

function readBoolean(formData: FormData, key: string): boolean {
  const value = formData.get(key);
  return value === "true" || value === "on" || value === "1";
}

function readInteger(formData: FormData, key: string, options?: { min?: number; max?: number }): number {
  const raw = readString(formData, key, { required: true });
  const value = Number(raw);
  if (!Number.isFinite(value) || !Number.isInteger(value)) {
    throw new Error(`${key} must be an integer`);
  }
  if (options?.min !== undefined && value < options.min) {
    throw new Error(`${key} must be >= ${options.min}`);
  }
  if (options?.max !== undefined && value > options.max) {
    throw new Error(`${key} must be <= ${options.max}`);
  }
  return value;
}

export function verifyHoneypot(formData: FormData, honeypotKey = "company"): void {
  const value = formData.get(honeypotKey);
  if (typeof value === "string" && value.trim().length > 0) {
    throw new Error("Spam detected");
  }
}

export function verifySubmissionDelay(formData: FormData, key = "startedAt", minDelayMs = 1000): void {
  const startedAt = Number(formData.get(key));
  if (!Number.isFinite(startedAt)) {
    return;
  }
  if (Date.now() - startedAt < minDelayMs) {
    throw new Error("Submission too fast");
  }
}

export function parseNewsletterForm(formData: FormData) {
  return {
    email: readString(formData, "email", { required: true, max: 255 })!,
    consentTextVersion: readString(formData, "consentTextVersion", { required: true, max: 40 })!,
    source: readString(formData, "source", { max: 80 }),
  };
}

export function parseContactForm(formData: FormData) {
  return {
    fullName: readString(formData, "fullName", { required: true, max: 160 })!,
    email: readString(formData, "email", { required: true, max: 255 })!,
    phone: readString(formData, "phone", { max: 60 }),
    subject: readString(formData, "subject", { required: true, max: 200 })!,
    message: readString(formData, "message", { required: true, max: 6000 })!,
  };
}

export function parseVolunteerForm(formData: FormData) {
  const interestsRaw = readString(formData, "interests", { required: true, max: 600 })!;
  const interests = interestsRaw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  return {
    fullName: readString(formData, "fullName", { required: true, max: 160 })!,
    email: readString(formData, "email", { required: true, max: 255 })!,
    phone: readString(formData, "phone", { required: true, max: 60 })!,
    country: readString(formData, "country", { required: true, max: 100 })!,
    city: readString(formData, "city", { required: true, max: 100 })!,
    interests,
    availability: readString(formData, "availability", { required: true, max: 200 })!,
    experience: readString(formData, "experience", { max: 4000 }),
    motivation: readString(formData, "motivation", { required: true, max: 4000 })!,
  };
}

export function parseDonationCheckoutForm(formData: FormData) {
  return {
    donor: {
      fullName: readString(formData, "fullName", { required: true, max: 160 })!,
      email: readString(formData, "email", { required: true, max: 255 })!,
      phone: readString(formData, "phone", { max: 60 }),
      country: readString(formData, "country", { max: 100 }),
      city: readString(formData, "city", { max: 100 }),
      preferredCurrency: readString(formData, "currency", { required: true, max: 10 })!,
      consentEmailMarketing: readBoolean(formData, "consentEmailMarketing"),
      consentTransactionalEmail: readBoolean(formData, "consentTransactionalEmail"),
      source: readString(formData, "source", { max: 80 }),
    },
    fundId: readString(formData, "fundId", { required: true, max: 64 })!,
    campaignId: readString(formData, "campaignId", { max: 64 }),
    givingType: readString(formData, "givingType", { required: true, max: 32 })!,
    amountMinor: readInteger(formData, "amountMinor", { min: 1 }),
    currency: readString(formData, "currency", { required: true, max: 10 })!,
    coverFees: readBoolean(formData, "coverFees"),
    isAnonymousPublic: readBoolean(formData, "isAnonymousPublic"),
    messageToCharity: readString(formData, "messageToCharity", { max: 400 }),
  };
}
