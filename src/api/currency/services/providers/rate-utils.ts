/**
 * Formats a Date as the YYYY-MM-DD string every central bank API in this
 * module expects.
 */
export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * Central banks quote rates per an arbitrary unit ("scale"/"quantity",
 * e.g. "10 RUB" or "100 JPY"). Normalize to a rate per 1 unit so every
 * provider returns a directly comparable number.
 */
export function normalizeRate(rate: number, scale = 1): number {
  const safeScale = scale > 0 ? scale : 1;

  return Math.round((rate / safeScale) * 1e6) / 1e6;
}
