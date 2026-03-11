import Link from "next/link";
import Header from "./components/Header";
import HeroHypotheekCalculator from "./components/HeroHypotheekCalculator";
import Footer from "./components/Footer";
import BankLogosCarousel from "./components/BankLogosCarousel";
import FaqSection from "./components/FaqSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ArticleCard from "./nieuws/ArticleCard";
import { getFeaturedArticles } from "./nieuws/articles-data";

export default function HomePage() {
  const featured = getFeaturedArticles();
  return (
    <>
      <Header />

      <main className="pb-24 md:pb-20">
        {/* Hero – clean two-column: headline, tagline, 2 CTAs (simple buttons) + quick links; image right */}
        <section className="bg-nbg-lighter-green pt-10 sm:pt-14 lg:pt-16 pb-14 sm:pb-16 lg:pb-20">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-14 items-center">
              <div className="lg:pr-4">
                <p className="text-nbg-primary font-semibold text-base uppercase tracking-wider mb-4">
                  Hypotheek & pensioen
                </p>
                <h1 className="text-nbg-blue text-4xl sm:text-5xl lg:text-[3rem] xl:text-[3.25rem] font-bold leading-[1.12] tracking-tight" id="hero-heading">
                  Haruna, duidelijk en persoonlijk advies
                </h1>
                <p className="mt-5 text-nbg-blue/80 text-lg sm:text-xl max-w-lg leading-relaxed">
                  Persoonlijk advies voor hypotheek, pensioen en verzekeringen. Online via videobellen – makkelijk, snel en waar u ook bent.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/hypotheken/hypotheek-berekenen"
                    className="inline-flex items-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-5 py-3 hover:bg-nbg-green/90 transition-colors"
                  >
                    Hypotheek Berekenen
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-3 hover:bg-nbg-primary hover:text-white transition-colors"
                  >
                    Afspraak maken
                  </Link>
                </div>
                <p className="mt-8 text-nbg-blue/70 text-base">
                  Snel naar:{" "}
                  <Link href="/hypotheken/hypotheek-berekenen" className="text-nbg-green font-medium hover:underline">Hypotheek berekenen</Link>
                  {" · "}
                  <Link href="/contact#schade" className="text-nbg-green font-medium hover:underline">Schade melden</Link>
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <HeroHypotheekCalculator />
              </div>
            </div>
          </div>
          </section>

        {/* USP strip – trust signals with balls between */}
        <section className="bg-nbg-green text-white py-4 px-4">
          <div className="max-w-[1140px] mx-auto">
            <div className="flex flex-wrap justify-evenly items-center gap-y-3 gap-x-2">
              <p className="text-[17px] m-0">Onafhankelijk hypotheekadvies</p>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0 hidden sm:block" aria-hidden />
              <p className="text-[17px] m-0">100% transparant</p>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0 hidden sm:block" aria-hidden />
              <p className="text-[17px] m-0">Meer dan 30 jaar ervaring</p>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0 hidden sm:block" aria-hidden />
              <p className="text-[17px] m-0">Online &amp; videobellen</p>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0 hidden sm:block" aria-hidden />
              <p className="text-[17px] m-0">Gecertificeerd adviseur</p>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0 hidden sm:block" aria-hidden />
              <p className="text-[17px] m-0">Volledige transparantie over kosten.</p>
            </div>
          </div>
        </section>

        {/* Two-column block – equal-height cards, aligned CTAs */}
        <section className="bg-nbg-blue py-16 lg:py-20">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
              {/* Onze diensten */}
              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-white/10 flex flex-col h-full">
                <div className="border-l-4 border-nbg-green pl-5 mb-5">
                  <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold m-0">
                    Onze diensten
                  </h2>
                </div>
                <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                  Hypotheek, leningen, krediet, pensioen en verzekeringen – wij adviseren u graag. Online via videobellen, makkelijk en snel.
                </p>
                <ul className="space-y-3 flex-1">
                  <li className="flex items-start gap-3 text-nbg-blue text-[17px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                    <span><Link href="/hypotheken" className="text-nbg-green font-medium hover:underline">Hypotheken</Link> – maximale hypotheek, advies op maat</span>
                  </li>
                  <li className="flex items-start gap-3 text-nbg-blue text-[17px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                    <span><Link href="/verzekeringen" className="text-nbg-green font-medium hover:underline">Verzekeringen</Link> – zekerheid op maat</span>
                  </li>
                  <li className="flex items-start gap-3 text-nbg-blue text-[17px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                    <span><Link href="/pensioen" className="text-nbg-green font-medium hover:underline">Pensioen</Link> – inkomen voor later</span>
                  </li>
                  <li className="flex items-start gap-3 text-nbg-blue text-[17px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                    <span><Link href="/financiering" className="text-nbg-green font-medium hover:underline">Financiering</Link> – particulier en zakelijk</span>
                  </li>
                </ul>
                <div className="mt-auto pt-6">
                  <Link href="/hypotheken" className="inline-flex items-center justify-center gap-2 py-4 px-7 border-2 border-nbg-green text-nbg-green rounded-xl font-semibold text-[17px] hover:bg-nbg-green hover:text-white transition-all w-full sm:w-auto">
                    Meer over onze diensten
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
              {/* Klaar voor uw hypotheek – lead gen */}
              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-white/10 flex flex-col h-full">
                <div className="border-l-4 border-nbg-green pl-5 mb-5">
                  <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold m-0">
                    Klaar voor uw hypotheek?
                  </h2>
                </div>
                <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4 flex-1">
                  Ontdek wat u kunt lenen en plan een vrijblijvend videogesprek. Onafhankelijk en transparant advies – online via videobellen – persoonlijk, makkelijk en snel.
                </p>
                <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/hypotheken/hypotheek-berekenen"
                    className="group inline-flex items-center justify-center gap-2.5 py-4 px-7 bg-nbg-green text-white rounded-xl font-semibold text-[17px] shadow-[0_4px_14px_rgba(118,163,72,0.35)] hover:bg-nbg-green/90 hover:shadow-[0_6px_20px_rgba(118,163,72,0.4)] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    Hypotheek Berekenen
                    <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2.5 py-4 px-7 border-2 border-nbg-blue/20 text-nbg-blue rounded-xl font-semibold text-[17px] bg-nbg-blue/[0.03] hover:border-nbg-primary hover:bg-nbg-primary/10 hover:text-nbg-primary transition-all duration-200"
                  >
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    Plan een afspraak
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BankLogosCarousel />

        {/* Erkenningen – SEH, AFM, NVB, gecertificeerd */}
        <section className="bg-white py-4 lg:py-6">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-3">
              <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-nbg-lighter-green/80 text-nbg-blue text-[14px] font-medium">
                <svg className="w-4 h-4 shrink-0 text-nbg-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                SEH Erkend Financieel Adviseur
              </div>
              <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-nbg-lighter-green/80 text-nbg-blue text-[14px] font-medium">
                <svg className="w-4 h-4 shrink-0 text-nbg-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Vergunninghouder AFM
              </div>
              <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-nbg-lighter-green/80 text-nbg-blue text-[14px] font-medium">
                <svg className="w-4 h-4 shrink-0 text-nbg-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Lid van de NVB
              </div>
              <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-nbg-lighter-green/80 text-nbg-blue text-[14px] font-medium">
                <svg className="w-4 h-4 shrink-0 text-nbg-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Gecertificeerd hypotheekadviseur
              </div>
            </div>
          </div>
        </section>

        {/* Cijfers / statistieken */}
        <section className="bg-nbg-blue py-14 lg:py-16">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center">
              <div>
                <p className="text-white text-3xl lg:text-4xl font-bold m-0 tracking-tight">800+</p>
                <p className="text-white/80 text-[15px] m-0 mt-2">Klanten geholpen</p>
              </div>
              <div>
                <p className="text-white text-3xl lg:text-4xl font-bold m-0 tracking-tight">30+</p>
                <p className="text-white/80 text-[15px] m-0 mt-2">Jaar ervaring</p>
              </div>
              <div>
                <p className="text-white text-3xl lg:text-4xl font-bold m-0 tracking-tight">4,9</p>
                <p className="text-white/80 text-[15px] m-0 mt-2">Sterren beoordeling</p>
              </div>
              <div>
                <p className="text-white text-3xl lg:text-4xl font-bold m-0 tracking-tight">Onafhankelijk</p>
                <p className="text-white/80 text-[15px] m-0 mt-2">hypotheekadvies</p>
              </div>
            </div>
          </div>
        </section>

        <div id="sticky-cta-sentinel" className="h-0 w-full" aria-hidden />

        {/* Uitgelichte artikelen – same data as /nieuws (articles-data.ts) */}
        {featured.length > 0 && (
          <section className="bg-nbg-lighter-green py-12 lg:py-16">
            <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                <h2 className="text-nbg-blue text-2xl font-bold m-0">
                  Uitgelichte artikelen
                </h2>
                <Link href="/nieuws" className="text-nbg-primary font-medium text-[17px] hover:underline inline-flex items-center gap-1">
                  Bekijk meer artikelen
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </Link>
              </div>
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

        <TestimonialsSection />

        <FaqSection />

        {/* Lead magnet – checklist / CTA */}
        <section className="bg-nbg-green text-white py-12 lg:py-14">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-white text-xl lg:text-2xl font-bold m-0 mb-2">
                  Download de hypotheek-checklist
                </h2>
                <p className="text-white/90 text-[17px] m-0">
                  Weet wat u nodig heeft bij uw hypotheekaanvraag. Vraag de gratis checklist aan.
                </p>
              </div>
              <Link
                href="/contact?aanvraag=checklist"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-nbg-green font-semibold text-[15px] px-6 py-3 hover:bg-white/95 transition-colors shrink-0 w-full md:w-auto"
              >
                Checklist aanvragen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact – heading + outline buttons + trust badges */}
        <section className="pt-12 pb-6 lg:pt-14 lg:pb-8">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">
              <div className="flex flex-shrink-0 flex-col items-center gap-3 lg:items-end">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-40 h-40 lg:w-[230px] lg:h-[230px] rounded-full overflow-hidden bg-nbg-light-gray ring-4 ring-nbg-lighter-green/50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
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
