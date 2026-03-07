"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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
  if (r <= 0) return totaalInkomen * 5;
  const annuityFactor = (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(maxMaandlast / annuityFactor);
}

function berekenMaandlast(hypotheek: number, rentePercent: number, looptijdJaar: number, lineair: boolean): number {
  const r = rentePercent / 100 / 12;
  const n = looptijdJaar * 12;
  if (lineair) {
    const renteDeel = hypotheek * r;
    const aflossingDeel = hypotheek / n;
    return Math.round((renteDeel + aflossingDeel) * 100) / 100;
  }
  const factor = (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(hypotheek * factor * 100) / 100;
}

export default function HypotheekBerekenenForm() {
  const [brutoInkomen, setBrutoInkomen] = useState(55000);
  const [partnerInkomen, setPartnerInkomen] = useState(0);
  const [rentePercent, setRentePercent] = useState(4);
  const [looptijd, setLooptijd] = useState(30);
  const [lineair, setLineair] = useState(false);
  const [hypotheekBedrag, setHypotheekBedrag] = useState<number | null>(null);

  const geschatteMax = useMemo(
    () => estimateMaxHypotheek(brutoInkomen, partnerInkomen, rentePercent, looptijd),
    [brutoInkomen, partnerInkomen, rentePercent, looptijd]
  );

  const bedragTeBerekenen = hypotheekBedrag ?? geschatteMax;
  const maandlast = useMemo(
    () => berekenMaandlast(bedragTeBerekenen, rentePercent, looptijd, lineair),
    [bedragTeBerekenen, rentePercent, looptijd, lineair]
  );

  const formatEuro = (n: number) =>
    new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="bg-nbg-lighter-green rounded-2xl p-6 lg:p-8 border border-nbg-light-gray/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-5">
          <h2 className="text-nbg-blue font-bold text-lg">Uw gegevens</h2>

          <div>
            <label className="block text-nbg-blue/80 text-sm font-medium mb-1">Bruto jaarinkomen</label>
            <input
              type="number"
              min={25000}
              max={300000}
              step={2500}
              value={brutoInkomen}
              onChange={(e) => setBrutoInkomen(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-nbg-light-gray px-4 py-2.5 text-nbg-blue focus:border-nbg-green focus:ring-2 focus:ring-nbg-green/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-nbg-blue/80 text-sm font-medium mb-1">Partner bruto jaarinkomen (optioneel)</label>
            <input
              type="number"
              min={0}
              max={300000}
              step={2500}
              value={partnerInkomen || ""}
              onChange={(e) => setPartnerInkomen(Number(e.target.value) || 0)}
              placeholder="0"
              className="w-full rounded-lg border border-nbg-light-gray px-4 py-2.5 text-nbg-blue focus:border-nbg-green focus:ring-2 focus:ring-nbg-green/20 outline-none"
            />
          </div>

          <div>
            <label className="block text-nbg-blue/80 text-sm font-medium mb-1">Rentepercentage</label>
            <select
              value={rentePercent}
              onChange={(e) => setRentePercent(Number(e.target.value))}
              className="w-full rounded-lg border border-nbg-light-gray px-4 py-2.5 text-nbg-blue focus:border-nbg-green focus:ring-2 focus:ring-nbg-green/20 outline-none"
            >
              {[2.5, 3, 3.25, 3.5, 3.75, 4, 4.25, 4.5, 4.75, 5, 5.5, 6].map((r) => (
                <option key={r} value={r}>{r}%</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-nbg-blue/80 text-sm font-medium mb-1">Looptijd</label>
            <select
              value={looptijd}
              onChange={(e) => setLooptijd(Number(e.target.value))}
              className="w-full rounded-lg border border-nbg-light-gray px-4 py-2.5 text-nbg-blue focus:border-nbg-green focus:ring-2 focus:ring-nbg-green/20 outline-none"
            >
              {[10, 15, 20, 25, 30].map((j) => (
                <option key={j} value={j}>{j} jaar</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-nbg-blue/80 text-sm font-medium mb-1">Hypotheekvorm</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="vorm"
                  checked={!lineair}
                  onChange={() => setLineair(false)}
                  className="accent-nbg-green"
                />
                <span className="text-nbg-blue">Annuïteit</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="vorm"
                  checked={lineair}
                  onChange={() => setLineair(true)}
                  className="accent-nbg-green"
                />
                <span className="text-nbg-blue">Lineair</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-nbg-blue/80 text-sm font-medium mb-1">Hypotheekbedrag (indien bekend)</label>
            <input
              type="number"
              min={50000}
              max={1500000}
              step={10000}
              value={hypotheekBedrag ?? ""}
              onChange={(e) => setHypotheekBedrag(e.target.value ? Number(e.target.value) : null)}
              placeholder={`Bijv. ${formatEuro(geschatteMax)}`}
              className="w-full rounded-lg border border-nbg-light-gray px-4 py-2.5 text-nbg-blue focus:border-nbg-green focus:ring-2 focus:ring-nbg-green/20 outline-none"
            />
          </div>
        </div>

        <div>
          <h2 className="text-nbg-blue font-bold text-lg mb-4">Uw resultaat</h2>
          <div className="bg-white rounded-xl p-6 border border-nbg-light-gray/50 space-y-4">
            <div>
              <p className="text-nbg-blue/70 text-sm">Geschatte maximale hypotheek</p>
              <p className="text-nbg-blue text-2xl font-bold">{formatEuro(geschatteMax)}</p>
            </div>
            <div>
              <p className="text-nbg-blue/70 text-sm">Maandlasten (indicatie)</p>
              <p className="text-nbg-blue text-2xl font-bold">
                {formatEuro(maandlast)}
                <span className="text-base font-normal text-nbg-blue/70">/maand</span>
              </p>
            </div>
            <p className="text-nbg-blue/60 text-sm">
              Dit is een globale indicatie. De werkelijke maximale hypotheek en maandlasten kunnen afwijken door NHG, studieschuld en andere factoren.
            </p>
            <Link
              href="/contact"
              className="mt-6 block w-full text-center rounded-xl bg-nbg-green text-white font-semibold text-[15px] py-3.5 hover:bg-nbg-green/90 transition-colors"
            >
              Plan vrijblijvend videogesprek
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
