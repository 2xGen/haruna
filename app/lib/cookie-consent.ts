/** Cookie consent for GDPR: stored in cookie + localStorage (client-side). */

export const COOKIE_CONSENT_KEY = "haruna_cookie_consent";
export const COOKIE_CONSENT_MAX_AGE_DAYS = 365;

export type CookieConsent = {
  analytics: boolean;
  /** When the user made the choice (ISO string) */
  timestamp: string;
};

export function parseConsent(value: string | null): CookieConsent | null {
  if (!value || typeof value !== "string") return null;
  try {
    const parsed = JSON.parse(value) as unknown;
    if (parsed && typeof parsed === "object" && "analytics" in parsed && typeof (parsed as CookieConsent).analytics === "boolean") {
      return parsed as CookieConsent;
    }
  } catch {
    // ignore
  }
  return null;
}
