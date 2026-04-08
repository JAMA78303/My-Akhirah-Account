/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as campaigns from "../campaigns.js";
import type * as crons from "../crons.js";
import type * as donationCheckoutData from "../donationCheckoutData.js";
import type * as donations from "../donations.js";
import type * as donors from "../donors.js";
import type * as events from "../events.js";
import type * as forms from "../forms.js";
import type * as funds from "../funds.js";
import type * as http from "../http.js";
import type * as impact from "../impact.js";
import type * as lib_auth from "../lib/auth.js";
import type * as lib_donationRules from "../lib/donationRules.js";
import type * as lib_dtos from "../lib/dtos.js";
import type * as lib_permissions from "../lib/permissions.js";
import type * as lib_references from "../lib/references.js";
import type * as lib_validators from "../lib/validators.js";
import type * as media from "../media.js";
import type * as paymentCheckout from "../paymentCheckout.js";
import type * as paymentEvents from "../paymentEvents.js";
import type * as paymentWebhook from "../paymentWebhook.js";
import type * as payments from "../payments.js";
import type * as posts from "../posts.js";
import type * as programs from "../programs.js";
import type * as rateLimits from "../rateLimits.js";
import type * as receiptDispatch from "../receiptDispatch.js";
import type * as receipts from "../receipts.js";
import type * as search from "../search.js";
import type * as site from "../site.js";
import type * as staff from "../staff.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  campaigns: typeof campaigns;
  crons: typeof crons;
  donationCheckoutData: typeof donationCheckoutData;
  donations: typeof donations;
  donors: typeof donors;
  events: typeof events;
  forms: typeof forms;
  funds: typeof funds;
  http: typeof http;
  impact: typeof impact;
  "lib/auth": typeof lib_auth;
  "lib/donationRules": typeof lib_donationRules;
  "lib/dtos": typeof lib_dtos;
  "lib/permissions": typeof lib_permissions;
  "lib/references": typeof lib_references;
  "lib/validators": typeof lib_validators;
  media: typeof media;
  paymentCheckout: typeof paymentCheckout;
  paymentEvents: typeof paymentEvents;
  paymentWebhook: typeof paymentWebhook;
  payments: typeof payments;
  posts: typeof posts;
  programs: typeof programs;
  rateLimits: typeof rateLimits;
  receiptDispatch: typeof receiptDispatch;
  receipts: typeof receipts;
  search: typeof search;
  site: typeof site;
  staff: typeof staff;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
