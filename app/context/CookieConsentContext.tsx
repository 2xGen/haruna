"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { COOKIE_CONSENT_KEY, COOKIE_CONSENT_MAX_AGE_DAYS, parseConsent, type CookieConsent } from "@/app/lib/cookie-consent";

type CookieConsentContextValue = {
  consent: CookieConsent | null;
  setConsent: (value: CookieConsent) => void;
  openBanner: boolean;
  setOpenBanner: (open: boolean) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function getStoredConsent(): CookieConsent | null {
  if (typeof document === "undefined") return null;
  const fromCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_CONSENT_KEY}=`));
  const value = fromCookie ? decodeURIComponent(fromCookie.split("=")[1] ?? "") : null;
  const parsed = parseConsent(value);
  if (parsed) return parsed;
  try {
    const local = localStorage.getItem(COOKIE_CONSENT_KEY);
    return parseConsent(local);
  } catch {
    return null;
  }
}

function writeConsent(consent: CookieConsent) {
  const value = JSON.stringify(consent);
  document.cookie = `${COOKIE_CONSENT_KEY}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_CONSENT_MAX_AGE_DAYS * 24 * 60 * 60}; SameSite=Lax`;
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    // ignore
  }
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentState] = useState<CookieConsent | null>(null);
  const [openBanner, setOpenBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setConsentState(getStoredConsent());
    setMounted(true);
  }, []);

  const setConsent = useCallback((value: CookieConsent) => {
    const withTimestamp = { ...value, timestamp: new Date().toISOString() };
    writeConsent(withTimestamp);
    setConsentState(withTimestamp);
    setOpenBanner(false);
  }, []);

  const value: CookieConsentContextValue = {
    consent: mounted ? consent : null,
    setConsent,
    openBanner,
    setOpenBanner,
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
}
