import type { Doc } from "../_generated/dataModel";

const STRICT_ONLY_TYPES = new Set(["zakat", "kaffarah", "fidyah", "qurbani"]);

export function canUseFundForGivingType(
  fund: Pick<Doc<"funds">, "givingType" | "restrictionPolicy" | "isActive">,
  selectedGivingType: string,
): boolean {
  if (!fund.isActive) {
    return false;
  }

  if (fund.givingType !== selectedGivingType && fund.givingType !== "general") {
    return false;
  }

  if (STRICT_ONLY_TYPES.has(selectedGivingType) && fund.restrictionPolicy === "unrestricted") {
    return false;
  }

  if (selectedGivingType === "general" && fund.restrictionPolicy === "strict" && fund.givingType !== "general") {
    return false;
  }

  return true;
}
