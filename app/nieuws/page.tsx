import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsletterForm from "../components/NewsletterForm";
import ArticleCard from "./ArticleCard";
import NieuwsFilterAndList from "./NieuwsFilterAndList";
import {
  getFeaturedArticles,
  getAllSortedByDate,
  PILLAR_CONFIG,
} from "./articles-data";

export const metadata = {
  title: "Nieuws & artikelen | Haruna Hypotheek- en pensioenadvies",
  description:
    "Artikelen en gidsen over hypotheken, verzekeringen en pensioen. Blijf op de hoogte met tips en uitleg van Haruna.",
};

export default function NieuwsPage() {
  const featured = getFeaturedArticles();
  const allArticles = getAllSortedByDate();

  return (
    <>
      <Header />

      <main className="pb-24 md:pb-20">
        {/* Hero */}
        <section className="bg-nbg-lighter-green pt-14 lg:pt-20 pb-14 lg:pb-16 border-b border-nbg-light-gray/40">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Nieuws & artikelen
            </p>
            <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl leading-tight">
              Gidsen en artikelen per onderwerp
            </h1>
            <p className="mt-5 text-nbg-blue/85 text-[17px] lg:text-lg leading-relaxed max-w-xl">
              Handige uitleg en tips over hypotheken, verzekeringen en pensioen. Filter op onderwerp of bekijk de nieuwste artikelen.
            </p>
          </div>
        </section>

        {/* Uitgelichte artikelen (3) */}
        {featured.length > 0 && (
          <section className="py-10 lg:py-12 bg-white">
            <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-nbg-blue text-xl font-bold m-0 mb-6">
                Uitgelichte artikelen
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0 m-0 items-stretch">
                {featured.map((article) => (
                  <li key={article.slug} className="flex">
                    <ArticleCard article={article} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Filter + lijst (client, geen URL) */}
        <NieuwsFilterAndList allArticles={allArticles} pillarConfig={PILLAR_CONFIG} />

        {/* Newsletter */}
        <section className="bg-nbg-blue text-white py-12 lg:py-16">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl">
              <h2 className="text-white text-xl lg:text-2xl font-bold m-0 mb-2">
                Blijf op de hoogte
              </h2>
              <p className="text-white/90 text-[17px] m-0 mb-6">
                Schrijf u in voor onze nieuwsbrief en ontvang nieuwe artikelen en tips over hypotheek, verzekeringen en pensioen in uw mailbox.
              </p>
              <NewsletterForm source="nieuws" variant="nieuws" id="nieuws-newsletter-email" />
              <p className="text-white/60 text-sm mt-3 m-0">
                Geen spam. U kunt zich op elk moment uitschrijven.
              </p>
            </div>
          </div>
        </section>

        {/* Contact – Harm Jan Schouwstra */}
        <section className="pt-12 pb-6 lg:pt-14 lg:pb-8 bg-white">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">
              <div className="flex flex-shrink-0 flex-col items-center gap-3 lg:items-end">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-40 h-40 lg:w-[230px] lg:h-[230px] rounded-full overflow-hidden bg-nbg-light-gray ring-4 ring-nbg-lighter-green/50">
                    <img
                      src="https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/harmjan%20schouwstra.png"
                      alt="Harm Jan Schouwstra – hypotheekadviseur"
                      width={230}
                      height={230}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-nbg-blue font-medium text-[17px]">Harm Jan Schouwstra</span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-nbg-blue text-2xl lg:text-3xl font-bold mb-4">
                  Heeft u een vraag of wilt u een afspraak maken?<br />
                  Neem contact op – wij zijn bereikbaar.
                </h2>
                <div className="flex flex-wrap gap-3 mb-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-primary hover:text-white transition-colors"
                  >
                    Afspraak maken
                  </Link>
                </div>
                <p className="text-nbg-blue/80 text-[17px] m-0 mb-1">
                  Videobellen, e-mail of telefoon – kies wat u het prettigst vindt. Ook buiten kantoortijden bereikbaar voor al uw vragen.
                </p>
                <div className="mt-4 pt-4 border-t border-nbg-light-gray flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-nbg-lighter-green/80 text-nbg-blue px-4 py-2 text-[15px] font-medium">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nbg-green/15 text-nbg-green">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </span>
                    Veilig & vertrouwd
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-nbg-lighter-green/80 text-nbg-blue px-4 py-2 text-[15px] font-medium">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nbg-green/15 text-nbg-green">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </span>
                    Uw gegevens worden vertrouwelijk behandeld
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
