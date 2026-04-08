import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "expire-stale-donation-intents",
  { minutes: 10 },
  internal.donations.expireStaleIntents,
  { limit: 250 },
);

crons.interval(
  "dispatch-pending-receipts",
  { minutes: 5 },
  internal.receiptDispatch.dispatchPendingReceipts,
  { limit: 50 },
);

crons.interval(
  "cleanup-expired-rate-limits",
  { hours: 1 },
  internal.rateLimits.cleanupExpired,
  { limit: 1000 },
);

export default crons;
