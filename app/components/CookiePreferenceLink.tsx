"use client";

import { useCookieConsent } from "@/app/context/CookieConsentContext";

/** Link/button that reopens the cookie banner (for footer "Cookievoorkeuren"). */
export default function CookiePreferenceLink({
  className,
  children = "Cookievoorkeuren",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { setOpenBanner } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={() => setOpenBanner(true)}
      className={className}
    >
      {children}
    </button>
  );
}
