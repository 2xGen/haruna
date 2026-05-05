"use client";

import type { ReactNode } from "react";
import { CookieConsentProvider } from "@/app/context/CookieConsentContext";
import StickyCtaBar from "@/app/components/StickyCtaBar";
import FloatingSituatiecheckCta from "@/app/components/FloatingSituatiecheckCta";
import CookieBanner from "@/app/components/CookieBanner";
import ConsentAwareAnalytics from "@/app/components/ConsentAwareAnalytics";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <CookieConsentProvider>
      {children}
      <StickyCtaBar />
      <FloatingSituatiecheckCta />
      <CookieBanner />
      <ConsentAwareAnalytics />
    </CookieConsentProvider>
  );
}
