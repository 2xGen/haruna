import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticleCard from "../ArticleCard";
import {
  type Pillar,
  isValidPillar,
  PILLAR_CONFIG,
  getArticlesForPillarPaginated,
  ARCHIVE_PER_PAGE,
} from "../articles-data";

const CHEVRON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512">
    <path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" />
  </svg>
);

function Pagination({
  slug,
  currentPage,
  totalPages,
}: {
  slug: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const base = `/nieuws/${slug}`;
  const prev =
    currentPage > 1
      ? currentPage === 2
        ? base
        : `${base}?page=${currentPage - 1}`
      : null;
  const next =
    currentPage < totalPages ? `${base}?page=${currentPage + 1}` : null;

  return (
    <nav
      className="flex flex-wrap justify-center items-center gap-2 mt-12 pt-8 border-t border-nbg-light-gray"
      aria-label="Paginering"
    >
      {prev ? (
        <Link
          href={prev}
          className="inline-flex items-center gap-1 rounded-lg border border-nbg-light-gray bg-white px-4 py-2 text-nbg-blue font-medium text-[15px] hover:bg-nbg-lighter-green/50 transition-colors"
        >
          <span className="rotate-180 inline-block">{CHEVRON}</span>
          Vorige
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-lg border border-nbg-light-gray/50 bg-nbg-light-gray/30 px-4 py-2 text-nbg-blue/50 text-[15px] cursor-not-allowed">
          Vorige
        </span>
      )}

      <span className="px-4 py-2 text-nbg-blue/80 text-[15px]">
        Pagina {currentPage} van {totalPages}
      </span>

      {next ? (
        <Link
          href={next}
          className="inline-flex items-center gap-1 rounded-lg border border-nbg-light-gray bg-white px-4 py-2 text-nbg-blue font-medium text-[15px] hover:bg-nbg-lighter-green/50 transition-colors"
        >
          Volgende
          {CHEVRON}
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-lg border border-nbg-light-gray/50 bg-nbg-light-gray/30 px-4 py-2 text-nbg-blue/50 text-[15px] cursor-not-allowed">
          Volgende
        </span>
      )}
    </nav>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (isValidPillar(slug)) {
    const config = PILLAR_CONFIG[slug as Pillar];
    return {
      title: `Nieuws – ${config.label} | Haruna Hypotheek- en pensioenadvies`,
      description: `Artikelen en gidsen over ${config.label.toLowerCase()}. ${config.description}`,
    };
  }
  return { title: "Nieuws | Haruna Hypotheek- en pensioenadvies" };
}

export default async function NieuwsSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;

  // Pillar archive: /nieuws/hypotheken, /nieuws/verzekeringen, /nieuws/pensioen
  if (isValidPillar(slug)) {
    const pillar = slug as Pillar;
    const config = PILLAR_CONFIG[pillar];
    const page = Math.max(1, parseInt(String(pageParam || "1"), 10) || 1);
    const { articles, total, totalPages } = getArticlesForPillarPaginated(
      pillar,
      page,
      ARCHIVE_PER_PAGE
    );
    const currentPage = Math.min(page, totalPages);

    return (
      <>
        <Header />

        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10">
            <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">
                  Nieuws
                </Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">{config.label}</span>
              </nav>
              <h1 className="text-nbg-blue text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight m-0">
                {config.label} – alle artikelen
              </h1>
              <p className="mt-2 text-nbg-blue/80 text-[17px] m-0">
                {total} {total === 1 ? "artikel" : "artikelen"}
              </p>
            </div>
          </section>

          <section className="py-10 lg:py-14 bg-white">
            <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
              {articles.length === 0 ? (
                <p className="text-nbg-blue/80 text-[17px] m-0">
                  Er staan nog geen artikelen in deze categorie.{" "}
                  <Link href="/nieuws" className="text-nbg-green font-medium hover:underline">
                    Terug naar nieuws
                  </Link>
                </p>
              ) : (
                <>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0 items-stretch">
                    {articles.map((article) => (
                      <li key={article.slug} className="flex">
                        <ArticleCard article={article} />
                      </li>
                    ))}
                  </ul>
                  <Pagination
                    slug={slug}
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                </>
              )}
            </div>
          </section>

          <section className="py-8 bg-nbg-lighter-green">
            <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                href="/nieuws"
                className="inline-flex items-center gap-2 text-nbg-green font-semibold hover:underline"
              >
                ← Alle onderwerpen
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  // Article page: /nieuws/<article-slug>
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-nbg-blue">Artikel</h1>
        <p className="mt-4 text-nbg-blue/80">
          Dit artikel wordt binnenkort toegevoegd.
        </p>
        <Link href="/nieuws" className="mt-6 inline-block text-nbg-green font-semibold hover:underline">
          ← Naar nieuws
        </Link>
      </main>
      <Footer />
    </>
  );
}
