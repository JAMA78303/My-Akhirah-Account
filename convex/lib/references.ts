function randomToken(length: number): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let value = "";
  for (let index = 0; index < length; index += 1) {
    value += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return value;
}

function datePrefix(now: Date): string {
  const year = now.getUTCFullYear().toString().slice(-2);
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

export function createDonationReference(nowMs: number): string {
  return `DON-${datePrefix(new Date(nowMs))}-${randomToken(6)}`;
}

export function createReceiptNumber(nowMs: number): string {
  return `RCP-${datePrefix(new Date(nowMs))}-${randomToken(7)}`;
}

export function createRequestId(nowMs: number): string {
  return `REQ-${nowMs}-${randomToken(5)}`;
}
