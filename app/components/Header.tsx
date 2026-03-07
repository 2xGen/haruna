"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  { label: "Hypotheken", href: "/hypotheken" },
  { label: "Financiering", href: "/financiering" },
  { label: "Pensioen", href: "/pensioen" },
  { label: "Verzekeringen", href: "/verzekeringen" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Nieuws", href: "/nieuws" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Main nav – NBG: logo left, menu, then two buttons (filled green + outline) */}
      <header className="sticky top-0 z-50 bg-white border-b border-nbg-light-gray">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-[84px]">
            <Link href="/" className="flex items-center">
              <Image
                src="https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/haruna%20hypotheek%20advies%20nederland.png"
                alt="Haruna"
                width={192}
                height={64}
                className="h-16 w-auto object-contain"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-0">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-nbg-blue hover:text-nbg-primary text-[17px] font-normal transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="ml-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-3 hover:bg-nbg-primary hover:text-white transition-colors no-underline"
                >
                  Afspraak maken
                </Link>
              </div>
            </nav>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-nbg-blue min-w-[48px] min-h-[48px] flex items-center justify-center -mr-2"
              aria-label="Menu openen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {menuOpen && (
            <nav className="lg:hidden py-4 border-t border-nbg-light-gray">
              <ul className="flex flex-col gap-0">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 text-nbg-blue text-[17px] border-b border-nbg-light-gray last:border-0"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-4">
                  <Link href="/contact" onClick={() => setMenuOpen(false)} className="block text-center py-3 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] hover:bg-nbg-primary hover:text-white transition-colors">
                    Afspraak maken
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
