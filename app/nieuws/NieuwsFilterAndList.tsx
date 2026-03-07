"use client";

import { useState, useMemo } from "react";
import ArticleCard from "./ArticleCard";
import type { Article, Pillar } from "./articles-data";
import { getPillars, PILLAR_CONFIG, LIST_PER_PAGE } from "./articles-data";

const Chevron = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512">
    <path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" />
  </svg>
);

export default function NieuwsFilterAndList({
  allArticles,
  pillarConfig,
}: {
  allArticles: Article[];
  pillarConfig: typeof PILLAR_CONFIG;
}) {
  const [selectedPillar, setSelectedPillar] = useState<Pillar | undefined>(undefined);
  const [page, setPage] = useState(1);

  const pillars = getPillars();

  const filtered = useMemo(() => {
    if (!selectedPillar) return allArticles;
    return allArticles.filter((a) => a.pillar === selectedPillar);
  }, [allArticles, selectedPillar]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / LIST_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * LIST_PER_PAGE;
  const paginatedArticles = filtered.slice(start, start + LIST_PER_PAGE);

  const handlePillarClick = (p: Pillar | undefined) => {
    setSelectedPillar(p);
    setPage(1);
  };

  const config = selectedPillar ? pillarConfig[selectedPillar] : null;

  return (
    <section className="py-10 lg:py-12 bg-nbg-lighter-green">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-nbg-blue text-xl font-bold m-0">
            {config ? `${config.label} – alle artikelen` : "Meest recente artikelen"}
          </h2>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter op onderwerp">
            <button
              type="button"
              onClick={() => handlePillarClick(undefined)}
              className={`rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                !selectedPillar
                  ? "bg-nbg-green text-white"
                  : "bg-white border border-nbg-light-gray text-nbg-blue hover:bg-nbg-lighter-green/50"
              }`}
            >
              Alle
            </button>
            {pillars.map((p) => {
              const isActive = selectedPillar === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePillarClick(p)}
                  className={`rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                    isActive
                      ? "bg-nbg-green text-white"
                      : "bg-white border border-nbg-light-gray text-nbg-blue hover:bg-nbg-lighter-green/50"
                  }`}
                >
                  {pillarConfig[p].label}
                </button>
              );
            })}
          </div>
        </div>

        {paginatedArticles.length === 0 ? (
          <p className="text-nbg-blue/80 text-[17px] m-0">
            Geen artikelen gevonden voor dit filter.
          </p>
        ) : (
          <>
            <p className="text-nbg-blue/70 text-[15px] mb-6 m-0">
              {filtered.length} {filtered.length === 1 ? "artikel" : "artikelen"}
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0 m-0 items-stretch">
              {paginatedArticles.map((article) => (
                <li key={article.slug} className="flex">
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <nav
                className="flex flex-wrap justify-center items-center gap-2 mt-10 pt-8 border-t border-nbg-light-gray"
                aria-label="Paginering"
              >
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={safePage <= 1}
                  className="inline-flex items-center gap-1 rounded-lg border border-nbg-light-gray bg-white px-4 py-2 text-nbg-blue font-medium text-[15px] hover:bg-nbg-lighter-green/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                >
                  <span className="rotate-180 inline-block">
                    <Chevron />
                  </span>
                  Vorige
                </button>
                <span className="px-4 py-2 text-nbg-blue/80 text-[15px]">
                  Pagina {safePage} van {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={safePage >= totalPages}
                  className="inline-flex items-center gap-1 rounded-lg border border-nbg-light-gray bg-white px-4 py-2 text-nbg-blue font-medium text-[15px] hover:bg-nbg-lighter-green/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                >
                  Volgende
                  <Chevron />
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}
