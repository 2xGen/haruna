import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AfspraakMakenForm from "../components/AfspraakMakenForm";

export const metadata = {
  title: "Pensioen | Haruna Hypotheek- en pensioenadvies",
  description:
    "Pensioenadvies voor werkgevers, werknemers en ondernemers. Is uw pensioen nog op maat? Wij helpen met helder advies – erkend door AFM.",
};

const PENSIOEN_GUIDES = [
  {
    title: "Pensioen voor werkgevers en werknemers",
    description: "Collectieve regelingen, communicatie en beheer. Wij helpen u de pensioenvoorziening goed in te richten.",
    href: "#werkgevers",
    image: null,
  },
  {
    title: "Pensioen als ondernemer (DGA)",
    description: "Eigen beheer, verzekerde regelingen of fiscaal-juridische vraagstukken. Advies op maat voor directeuren-grootaandeelhouders.",
    href: "#dga",
    image: null,
  },
  {
    title: "Rond uw pensionering",
    description: "Pensioen rond de ingangsdatum, inkomensplanning of een second opinion. We denken graag met u mee.",
    href: "#pensionering",
    image: null,
  },
];

export default function PensioenPage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-nbg-lighter-green pt-12 lg:pt-20 pb-14 lg:pb-20">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-start">
              <div>
                <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-3">Pensioen</p>
                <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-5xl xl:text-[3rem] font-bold tracking-tight max-w-2xl">
                  Pensioen – advies voor uw inkomen later
                </h1>
                <p className="mt-5 text-nbg-blue/80 text-[17px] lg:text-lg leading-relaxed max-w-xl">
                  Past uw pensioen nog bij uw plannen? Is uw voorziening voldoende? Wij helpen u graag in de complexiteit van pensioen – voor werkgevers, werknemers en ondernemers. Vergunninghouder AFM voor pensioenadvisering.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.3)]"
                  >
                    Afspraak maken
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </Link>
                </div>
                <p className="mt-8 text-nbg-blue/70 text-sm">
                  Snel naar:{" "}
                  <Link href="#werkgevers" className="text-nbg-green font-medium hover:underline">Werkgevers & werknemers</Link>
                  {" · "}
                  <Link href="#dga" className="text-nbg-green font-medium hover:underline">Ondernemers (DGA)</Link>
                  {" · "}
                  <Link href="#pensionering" className="text-nbg-green font-medium hover:underline">Rond pensionering</Link>
                </p>
              </div>
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <h3 className="text-nbg-blue font-bold text-lg m-0 mb-2">Vrijblijvend pensioenadvies</h3>
                <p className="text-nbg-blue/80 text-[15px] m-0 mb-4">
                  Vragen over uw pensioen? Plan een gesprek – we kijken samen of uw voorziening nog past bij uw wensen en plannen.
                </p>
                <ul className="space-y-1.5 mb-5 text-nbg-blue/85 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0" aria-hidden />
                    Werkgevers & werknemers – collectieve regelingen
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0" aria-hidden />
                    Ondernemers (DGA) – eigen beheer of verzekerd
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0" aria-hidden />
                    Rond pensionering – inkomensplanning, second opinion
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-5 py-3 w-full hover:bg-nbg-green/90 transition-colors"
                >
                  Afspraak maken
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* USP strip */}
        <section className="bg-nbg-green text-white py-4 px-4">
          <div className="max-w-[1140px] mx-auto">
            <div className="flex flex-wrap justify-evenly items-center gap-y-3 gap-x-2">
              <p className="text-[17px] m-0">Onafhankelijk hypotheekadvies</p>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0 hidden sm:block" aria-hidden />
              <p className="text-[17px] m-0">WFT pensioen – erkend door AFM</p>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0 hidden sm:block" aria-hidden />
              <p className="text-[17px] m-0">Online & videobellen</p>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0 hidden sm:block" aria-hidden />
              <p className="text-[17px] m-0">Volledige transparantie over kosten.</p>
            </div>
          </div>
        </section>

        {/* Voor werkgevers en werknemers */}
        <section id="werkgevers" className="py-14 lg:py-20 bg-white scroll-mt-20">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              <div className="lg:col-span-7">
                <div className="border-l-4 border-nbg-green pl-5 mb-6">
                  <h2 className="text-nbg-blue text-2xl lg:text-3xl font-bold m-0">Voor werkgevers en werknemers</h2>
                </div>
                <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-6">
                  Wij adviseren werkgevers en werknemers over pensioen. Van het opzetten of verlengen van een collectieve pensioenregeling tot communicatie naar uw medewerkers en het beheer van de administratie. We controleren de pensioenuitvoerder en adviseren over waardeoverdrachten en actuariële berekeningen.
                </p>
                <ul className="space-y-2 text-nbg-blue/85 text-[17px]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                    Opzetten of verlengen van uw collectieve pensioenregeling
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                    Pensioencommunicatie naar werknemers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                    Pensioenadministratie en -beheer, controle uitvoerder
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                    Advies waardeoverdrachten en second opinion
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-5 flex items-start">
                <div className="bg-nbg-lighter-green/60 rounded-2xl p-6 border border-nbg-light-gray/50 w-full">
                  <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Advies op maat</p>
                  <p className="text-nbg-blue/80 text-[15px] m-0 mb-4">
                    Plan een vrijblijvend gesprek – dan bekijken we samen wat uw organisatie nodig heeft.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-3 w-full hover:bg-nbg-primary hover:text-white transition-colors"
                  >
                    Afspraak maken
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Voor ondernemers (DGA) */}
        <section id="dga" className="py-14 lg:py-20 bg-nbg-lighter-green scroll-mt-20">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              <div className="lg:col-span-7">
                <div className="border-l-4 border-nbg-green pl-5 mb-6">
                  <h2 className="text-nbg-blue text-2xl lg:text-3xl font-bold m-0">Voor ondernemers (DGA)</h2>
                </div>
                <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-6">
                  Bent u directeur-grootaandeelhouder? Dan zijn er specifieke mogelijkheden voor uw pensioen. Wij helpen met eigen beheer of verzekerde pensioenregelingen, fiscaal-juridische vraagstukken en het opstellen van juridische documenten. Ook voor het extern verzekeren van eigen beheer, herverzekeren van nabestaandenpensioen of het verzekeren van arbeidsongeschiktheid.
                </p>
                <ul className="space-y-2 text-nbg-blue/85 text-[17px]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                    Eigen beheer pensioenberekeningen en verzekerde regelingen
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                    Fiscaal-juridisch advies en opstellen documenten
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                    Extern verzekeren eigen beheer, herverzekeren nabestaandenpensioen
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                    Verzekeren van arbeidsongeschiktheid
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-5 flex items-start">
                <div className="bg-white/80 rounded-2xl p-6 border border-nbg-light-gray/50 w-full shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Advies op maat</p>
                  <p className="text-nbg-blue/80 text-[15px] m-0 mb-4">
                    Plan een vrijblijvend gesprek – dan bekijken we samen wat bij uw situatie past.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-3 w-full hover:bg-nbg-primary hover:text-white transition-colors"
                  >
                    Afspraak maken
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rond pensionering */}
        <section id="pensionering" className="py-14 lg:py-20 bg-white scroll-mt-20">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              <div className="lg:col-span-7">
                <div className="border-l-4 border-nbg-green pl-5 mb-6">
                  <h2 className="text-nbg-blue text-2xl lg:text-3xl font-bold m-0">Rond uw pensionering</h2>
                </div>
                <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-6">
                  Komt uw pensioen binnenkort ingang of wilt u uw situatie laten doorrekenen? Wij helpen met inkomensplanning, het in kaart brengen van uw huidige regeling en een second opinion. Ook bij een gouden handdruk, ontslagvergoeding of begeleiding bij ontslag denken we graag met u mee.
                </p>
                <ul className="space-y-2 text-nbg-blue/85 text-[17px]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                    Uw pensioen rond de ingangsdatum van uw oudedagsvoorziening
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                    Pensioen- en inkomensplanning, second opinion
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
                    Gouden handdruk, ontslagvergoeding en begeleiding
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-5 flex items-start">
                <div className="bg-nbg-lighter-green/60 rounded-2xl p-6 border border-nbg-light-gray/50 w-full">
                  <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Advies op maat</p>
                  <p className="text-nbg-blue/80 text-[15px] m-0 mb-4">
                    Plan een vrijblijvend gesprek – dan bekijken we samen wat u nodig heeft.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-3 w-full hover:bg-nbg-primary hover:text-white transition-colors"
                  >
                    Afspraak maken
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Erkend */}
        <section className="bg-white py-6 border-b border-nbg-light-gray">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-3">
              <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-nbg-lighter-green/80 text-nbg-blue text-[14px] font-medium">
                <svg className="w-4 h-4 text-nbg-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Vergunninghouder AFM
              </span>
              <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-nbg-lighter-green/80 text-nbg-blue text-[14px] font-medium">
                <svg className="w-4 h-4 text-nbg-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                WFT pensioenadvisering
              </span>
            </div>
          </div>
        </section>

        {/* Handige gidsen */}
        <section className="bg-nbg-lighter-green py-12 lg:py-16">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
              <h2 className="text-nbg-blue text-2xl font-bold m-0">Handige gidsen over pensioen</h2>
              <Link href="/nieuws" className="text-nbg-primary font-medium text-[17px] hover:underline inline-flex items-center gap-1">
                Meer artikelen
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
              </Link>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0 m-0 items-stretch">
              {PENSIOEN_GUIDES.map((guide) => (
                <li key={guide.title} className="flex">
                  <article className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50 hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)] transition-shadow flex flex-col w-full">
                    <div className="aspect-[2/1] shrink-0 overflow-hidden bg-nbg-lighter-green/80">
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-nbg-green/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-nbg-blue text-lg font-bold leading-snug">
                        <Link href={guide.href} className="text-nbg-blue hover:text-nbg-green">
                          {guide.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-nbg-blue/80 text-[15px] line-clamp-2 flex-1">{guide.description}</p>
                      <Link href={guide.href} className="inline-block mt-3 text-nbg-green font-medium text-[15px] hover:underline shrink-0">
                        Lees meer →
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
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
                      alt="Harm Jan Schouwstra – adviseur"
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
                  Vragen over pensioen of een afspraak maken?<br />
                  Neem contact op – wij helpen u graag.
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
                  Videobellen, e-mail of telefoon – kies wat u het prettigst vindt. Ook buiten kantoortijden bereikbaar.
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

        {/* Trust strip */}
        <section className="bg-nbg-lighter-green py-8 lg:py-10">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10 text-nbg-blue/90">
              <span className="inline-flex items-center gap-2 text-[15px] font-medium">
                <svg className="w-5 h-5 text-nbg-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Plan een vrijblijvend gesprek
              </span>
              <span className="inline-flex items-center gap-2 text-[15px] font-medium">
                <svg className="w-5 h-5 text-nbg-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Online via videobellen
              </span>
              <span className="inline-flex items-center gap-2 text-[15px] font-medium">
                <svg className="w-5 h-5 text-nbg-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Ook &apos;s avonds mogelijk
              </span>
            </div>
          </div>
        </section>

        {/* Contact / Afspraak form */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-7">
                <div className="bg-nbg-lighter-green/60 rounded-2xl p-6 sm:p-8 lg:p-10 border border-nbg-light-gray/50">
                  <div className="border-l-4 border-nbg-green pl-5 mb-6">
                    <h2 className="text-nbg-blue text-xl font-bold m-0">Vraag een afspraak aan</h2>
                  </div>
                  <p className="text-nbg-blue/80 text-[17px] mb-6">
                    Heeft u vragen over pensioen of wilt u een vrijblijvend gesprek? Vul het formulier in – wij nemen zo snel mogelijk contact op.
                  </p>
                  <AfspraakMakenForm />
                </div>
              </div>
              <aside className="lg:col-span-5 space-y-6">
                <div className="bg-nbg-blue text-white rounded-2xl p-6 lg:p-8">
                  <h3 className="text-lg font-bold m-0">Direct contact</h3>
                  <p className="mt-3 text-white/85 text-[15px] leading-relaxed m-0">
                    Ook bereikbaar via telefoon of e-mail voor spoedvragen.
                  </p>
                  <ul className="mt-6 space-y-4 list-none p-0 m-0">
                    <li>
                      <a href="tel:0786849331" className="flex items-center gap-3 text-white/95 hover:text-white transition-colors">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-nbg-green">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                        </span>
                        <span className="font-medium">078 684 93 31</span>
                      </a>
                    </li>
                    <li>
                      <a href="mailto:info@haruna.nl" className="flex items-center gap-3 text-white/95 hover:text-white transition-colors">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-nbg-green">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </span>
                        <span className="font-medium">info@haruna.nl</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
