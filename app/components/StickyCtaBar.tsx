"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Scroll-afstand (px) na welke de sticky balk verschijnt – na hero, USP, twee kolommen, banken, erkenningen, cijfers */
const SHOW_AFTER_SCROLL = 1100;

export default function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.scrollY > SHOW_AFTER_SCROLL);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 bg-nbg-blue text-white py-3 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] max-lg:py-4 max-lg:pb-[max(0.75rem,env(safe-area-inset-bottom))] md:py-3"
      role="banner"
      aria-label="Gratis situatiecheck"
    >
      <div className="max-w-[1140px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-lg:gap-4 flex-wrap">
        <span className="text-white/90 text-sm sm:text-base font-medium text-center sm:text-left">
          Start met de gratis situatiecheck — PDF met uw gegevens en indicaties.
        </span>
        <Link
          href="/situatieschets"
          className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-nbg-green text-white font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-green hover:border-nbg-green transition-colors max-lg:min-h-[48px] text-center w-full sm:w-auto max-sm:max-w-md"
        >
          Gratis situatiecheck
        </Link>
      </div>
    </div>
  );
}
