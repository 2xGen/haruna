"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function berekenMaandlast(hypotheek: number, rentePercent: number, looptijdJaar: number): number {
  const r = rentePercent / 100 / 12;
  const n = looptijdJaar * 12;
  const factor = (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(hypotheek * factor * 100) / 100;
}

export default function RenteBerekenen() {
  const [hypotheek, setHypotheek] = useState(300000);
  const [rentePercent, setRentePercent] = useState(4);
  const [looptijd, setLooptijd] = useState(30);

  const maandlast = useMemo(
    () => berekenMaandlast(hypotheek, rentePercent, looptijd),
    [hypotheek, rentePercent, looptijd]
  );

  const formatEuro = (n: number) =>
    new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-nbg-light-gray/50 w-full h-full flex flex-col">
      <div className="border-l-4 border-nbg-green pl-4 mb-4">
        <h3 className="text-nbg-blue font-bold text-lg m-0">Rente & maandlasten</h3>
      </div>
      <p className="text-nbg-blue/70 text-sm mb-5">Bekijk wat u per maand betaalt bij uw gekozen rente.</p>

      <div className="space-y-5">
        <div>
          <label className="block text-nbg-blue/80 text-sm font-medium mb-1">
            Hypotheekbedrag: <span className="text-nbg-green font-semibold">{formatEuro(hypotheek)}</span>
          </label>
          <input
            type="range"
            min={100000}
            max={600000}
            step={25000}
            value={hypotheek}
            onChange={(e) => setHypotheek(Number(e.target.value))}
            className="hypo-slider w-full"
          />
        </div>

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
        <p className="text-nbg-blue/70 text-sm mb-1.5">Maandlast (annuïtair)</p>
        <p className="text-nbg-blue text-[1.75rem] font-bold tracking-tight">{formatEuro(maandlast)}/maand</p>
        <Link
          href="/hypotheken/hypotheek-berekenen"
          className="mt-4 block w-full text-center rounded-xl bg-nbg-green text-white font-semibold text-[15px] py-3.5 hover:bg-nbg-green/90 transition-colors active:scale-[0.99]"
        >
          Uitgebreide berekening
        </Link>
      </div>
    </div>
  );
}
