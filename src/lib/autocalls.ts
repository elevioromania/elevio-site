import type { BusinessType } from "./leads";

const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  restaurant: "un restaurant sau o cafenea",
  magazin: "un magazin",
  service_auto: "un service auto",
  medical: "un cabinet medical sau o clinică",
  beauty: "un salon sau studio beauty",
  altul: "afacerea dumneavoastră",
};

export function businessTypeLabel(type: BusinessType): string {
  return BUSINESS_TYPE_LABELS[type] ?? BUSINESS_TYPE_LABELS.altul;
}

/** Normalizes a Romanian phone number to E.164 (+40...). */
export function toE164Romania(rawPhone: string): string | null {
  const digits = rawPhone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) {
    return /^\+\d{8,15}$/.test(digits) ? digits : null;
  }
  if (digits.startsWith("0") && digits.length === 10) {
    return `+4${digits}`;
  }
  if (digits.startsWith("40") && digits.length === 11) {
    return `+${digits}`;
  }
  return null;
}
