"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/**
 * Simplified maximale hypotheek estimate.
 * Uses rough NIBUD-style logic: max monthly payment ~25% of gross,
 * then back-calculate loan from annuity formula.
 */
function estimateMaxHypotheek(
  brutoInkomen: number,
  partnerInkomen: number,
  rentePercent: number,
  looptijdJaar: number
): number {
  const totaalInkomen = brutoInkomen + partnerInkomen;
  const maxMaandlast = (totaalInkomen / 12) * 0.25;
  const r = rentePercent / 100 / 12;
  const n = looptijdJaar * 12;
  if (r <= 0) return totaalInkomen * 5; // fallback
  const annuityFactor = (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(maxMaandlast / annuityFactor);
}

type HeroHypotheekCalculatorProps = {
  /** When true, card fills its container (e.g. in a grid). When false, uses max-width for hero. */
  embedded?: boolean;
};

export default function HeroHypotheekCalculator({ embedded }: HeroHypotheekCalculatorProps) {
  const [brutoInkomen, setBrutoInkomen] = useState(55000);
  const [metPartner, setMetPartner] = useState(false);
  const [partnerInkomen, setPartnerInkomen] = useState(0);
  const [rentePercent, setRentePercent] = useState(4);
  const [looptijd, setLooptijd] = useState(30);

  const geschatteMax = useMemo(
    () => estimateMaxHypotheek(brutoInkomen, metPartner ? partnerInkomen : 0, rentePercent, looptijd),
    [brutoInkomen, metPartner, partnerInkomen, rentePercent, looptijd]
  );

  const formatEuro = (n: number) =>
    new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  return (
    <div className={`bg-white rounded-2xl p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-nbg-light-gray/50 w-full h-full flex flex-col ${embedded ? "" : "max-w-[420px]"}`}>
      <div className="border-l-4 border-nbg-green pl-4 mb-4">
        <h3 className="text-nbg-blue font-bold text-lg m-0">Maximale hypotheek</h3>
      </div>
      <div className="flex items-center gap-2 mb-5">
        <p className="text-nbg-blue/70 text-sm">Snel een indicatie</p>
        <div className="group relative inline-flex">
          <button
            type="button"
            className="flex items-center justify-center w-5 h-5 rounded-full bg-nbg-lighter-green/80 text-nbg-green hover:bg-nbg-lighter-green border border-nbg-lighter-green/80 transition-colors"
            aria-label="Meer informatie"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 absolute left-0 top-full mt-1 z-10 w-64 p-3 rounded-lg bg-nbg-blue text-white text-xs leading-snug shadow-lg transition-all duration-150">
            Dit is slechts een indicatie. Geen bindend advies. Voor persoonlijk advies maken we graag een vrijblijvend gesprek.
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between gap-3 mb-1">
            <label className="text-nbg-blue/80 text-sm font-medium">
              Bruto jaarinkomen: <span className="text-nbg-green font-semibold">{formatEuro(brutoInkomen)}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={metPartner}
                onChange={(e) => setMetPartner(e.target.checked)}
                className="w-4 h-4 rounded border-nbg-light-gray accent-nbg-green focus:ring-nbg-green/30"
              />
              <span className="text-nbg-blue/80 text-sm font-medium">Met partner</span>
            </label>
          </div>
          <input
            type="range"
            min={25000}
            max={150000}
            step={2500}
            value={brutoInkomen}
            onChange={(e) => setBrutoInkomen(Number(e.target.value))}
            className="hypo-slider w-full"
          />
        </div>

        {metPartner && (
          <div>
            <label className="block text-nbg-blue/80 text-sm font-medium mb-1">
              Inkomen partner: <span className="text-nbg-green font-semibold">{formatEuro(partnerInkomen)}</span>
            </label>
            <input
              type="range"
              min={0}
              max={150000}
              step={2500}
              value={partnerInkomen}
              onChange={(e) => setPartnerInkomen(Number(e.target.value))}
              className="hypo-slider w-full"
            />
          </div>
        )}

        <div>
          <label className="block text-nbg-blue/80 text-sm font-medium mb-1">
            Rente: <span className="text-nbg-green font-semibold">{rentePercent}%</span>
          </label>
          <input
            type="range"
            min={2.5}
            max={7}
            step={0.25}
            value={rentePercent}
            onChange={(e) => setRentePercent(Number(e.target.value))}
            className="hypo-slider w-full"
          />
        </div>

        <div>
          <label className="block text-nbg-blue/80 text-sm font-medium mb-1">
            Looptijd: <span className="text-nbg-green font-semibold">{looptijd} jaar</span>
          </label>
          <input
            type="range"
            min={10}
            max={30}
            step={5}
            value={looptijd}
            onChange={(e) => setLooptijd(Number(e.target.value))}
            className="hypo-slider w-full"
          />
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-nbg-light-gray/80">
        <p className="text-nbg-blue/70 text-sm mb-1.5">Geschatte max. hypotheek</p>
        <p className="text-nbg-blue text-[1.75rem] font-bold tracking-tight">{formatEuro(geschatteMax)}</p>
        <Link
          href="/hypotheken/hypotheek-berekenen"
          className="mt-4 block w-full text-center rounded-xl bg-nbg-green text-white font-semibold text-[15px] py-3.5 hover:bg-nbg-green/90 transition-colors active:scale-[0.99]"
        >
          Bereken nauwkeurig & plan gesprek
        </Link>
      </div>
    </div>
  );
}
