import type { StaffRole } from "./validators";

export const DOMAIN_PERMISSIONS: Record<
  "content" | "donations" | "supporters" | "settings" | "dashboard",
  StaffRole[]
> = {
  content: ["super_admin", "content_editor"],
  donations: ["super_admin", "fundraising_ops"],
  supporters: ["super_admin", "supporter_care", "fundraising_ops"],
  settings: ["super_admin"],
  dashboard: ["super_admin", "content_editor", "fundraising_ops", "supporter_care"],
};

export type PermissionDomain = keyof typeof DOMAIN_PERMISSIONS;

export function canAccessDomain(role: StaffRole, domain: PermissionDomain): boolean {
  return DOMAIN_PERMISSIONS[domain].includes(role);
}

export function assertDomainAccess(role: StaffRole, domain: PermissionDomain): void {
  if (!canAccessDomain(role, domain)) {
    throw new Error(`Forbidden for role "${role}" on domain "${domain}"`);
  }
}
