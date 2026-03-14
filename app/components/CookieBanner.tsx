"use client";

import Link from "next/link";
import { useCookieConsent } from "@/app/context/CookieConsentContext";

export default function CookieBanner() {
  const { consent, setConsent, openBanner, setOpenBanner } = useCookieConsent();

  const show = openBanner || consent === null;

  if (!show) return null;

  const acceptAll = () => {
    setConsent({ analytics: true, timestamp: new Date().toISOString() });
  };

  const necessaryOnly = () => {
    setConsent({ analytics: false, timestamp: new Date().toISOString() });
  };

  return (
    <div
      role="dialog"
      aria-label="Cookievoorkeuren"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-5 md:p-6 max-w-[1140px] mx-auto max-lg:pb-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <div className="rounded-2xl bg-nbg-blue text-white shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/10 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Cookies</h3>
            <p className="text-white/90 text-[15px] leading-relaxed m-0">
              Wij gebruiken cookies voor een goede werking van de site en, met uw toestemming, voor analyse en inzicht in bezoek. U kunt kiezen voor alleen noodzakelijke cookies of alles accepteren. Uw keuze kunt u later wijzigen via Cookievoorkeuren in de footer.{" "}
              <Link href="/cookiebeleid" className="text-white underline hover:text-nbg-primary transition-colors">
                Meer in ons cookiebeleid
              </Link>
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={necessaryOnly}
              className="rounded-lg border-2 border-white/40 bg-transparent text-white font-medium text-[15px] px-5 py-2.5 hover:bg-white/10 transition-colors"
            >
              Alleen noodzakelijk
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-green/90 transition-colors"
            >
              Alles accepteren
            </button>
          </div>
        </div>
        {openBanner && (
          <button
            type="button"
            onClick={() => setOpenBanner(false)}
            className="mt-4 text-white/70 text-sm hover:text-white transition-colors"
            aria-label="Sluiten"
          >
            Sluiten
          </button>
        )}
      </div>
    </div>
  );
}
