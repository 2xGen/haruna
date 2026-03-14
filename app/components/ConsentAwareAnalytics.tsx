"use client";

import { Analytics } from "@vercel/analytics/next";
import { useCookieConsent } from "@/app/context/CookieConsentContext";

/** Renders Vercel Analytics only when the user has accepted analytics cookies (GDPR). */
export default function ConsentAwareAnalytics() {
  const { consent } = useCookieConsent();

  if (consent?.analytics !== true) return null;

  return <Analytics />;
}
