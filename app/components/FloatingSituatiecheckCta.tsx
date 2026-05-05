"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Zelfde drempel als StickyCtaBar — balk verschijnt na deze scroll, FAB schuift omhoog. */
const STICKY_BAR_SCROLL = 1100;

export default function FloatingSituatiecheckCta() {
  const pathname = usePathname();
  const [barLikelyVisible, setBarLikelyVisible] = useState(false);

  useEffect(() => {
    const check = () => setBarLikelyVisible(window.scrollY > STICKY_BAR_SCROLL);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  if (pathname?.startsWith("/situatieschets")) return null;

  return (
    <Link
      href="/situatieschets"
      className={`fixed right-4 sm:right-6 z-[48] inline-flex items-center gap-2 rounded-full bg-nbg-green text-white font-semibold text-[14px] sm:text-[15px] pl-4 pr-5 py-3.5 shadow-[0_6px_24px_rgba(118,163,72,0.45)] hover:bg-nbg-green/90 hover:shadow-[0_8px_28px_rgba(118,163,72,0.5)] transition-all duration-200 max-lg:min-h-[52px] max-w-[min(100vw-2rem,20rem)] ${
        barLikelyVisible
          ? "bottom-28 max-lg:bottom-[7.5rem] max-lg:pb-[max(0.25rem,env(safe-area-inset-bottom))]"
          : "bottom-6 max-lg:bottom-[max(1.25rem,env(safe-area-inset-bottom))]"
      }`}
      aria-label="Gratis situatiecheck — PDF situatieschets"
    >
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <span className="leading-tight">Gratis situatiecheck</span>
    </Link>
  );
}
