import { type ClassValue, clsx } from "clsx";

/**
 * Utility to merge Tailwind classes conditionally.
 * Usage: cn("base-class", condition && "conditional-class", "another-class")
 */
export function cn(...inputs: ClassValue[]) {
  return inputs
    .flat()
    .filter(Boolean)
    .join(" ")
    .trim();
}

/**
 * Format currency for tour pricing.
 * e.g. formatPrice(1340) → "€1,340"
 */
export function formatPrice(amount: number, locale = "en-GB"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
