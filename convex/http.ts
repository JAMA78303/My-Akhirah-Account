import { httpRouter } from "convex/server";
import { handleFlutterwaveWebhook } from "./paymentWebhook";
import { handleClerkUsersWebhook } from "./staff";

const http = httpRouter();

http.route({
  path: "/payments/webhook",
  method: "POST",
  handler: handleFlutterwaveWebhook,
});

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: handleClerkUsersWebhook,
});

export default http;
