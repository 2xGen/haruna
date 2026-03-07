import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Over ons | Haruna Hypotheek- en pensioenadvies",
  description:
    "Over Haruna. Persoonlijk advies voor hypotheek, pensioen en verzekeringen. Gecertificeerd adviseur – online via videobellen. Ontmoet Harm Jan Schouwstra.",
};

export default function OverOnsPage() {
  return (
    <>
      <Header />

      <main className="pb-24 md:pb-20">
        {/* Hero */}
        <section className="bg-nbg-lighter-green pt-12 lg:pt-20 pb-14 lg:pb-20">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
              <div>
                <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-3">
                  Over Haruna
                </p>
                <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-5xl xl:text-[3rem] font-bold tracking-tight max-w-2xl">
                  Persoonlijk advies, helder en op maat
                </h1>
                <p className="mt-5 text-nbg-blue/80 text-[17px] lg:text-lg leading-relaxed max-w-xl">
                  Haruna is uw adviseur voor hypotheek, pensioen en verzekeringen. Wij geloven in transparantie, maatwerk en een menselijke aanpak. Online bereikbaar, zodat u advies krijgt waar en wanneer het u uitkomt.
                </p>
                <p className="mt-8 text-nbg-blue/70 text-sm">
                  <Link href="/hypotheken" className="text-nbg-green font-medium hover:underline">Hypotheken</Link>
                  {" · "}
                  <Link href="/verzekeringen" className="text-nbg-green font-medium hover:underline">Verzekeringen</Link>
                  {" · "}
                  <Link href="/pensioen" className="text-nbg-green font-medium hover:underline">Pensioen</Link>
                  {" · "}
                  <Link href="/contact" className="text-nbg-green font-medium hover:underline">Contact</Link>
                </p>
              </div>
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <div className="flex flex-col items-center text-center">
                  <div className="w-36 h-36 rounded-full overflow-hidden bg-nbg-light-gray ring-4 ring-nbg-lighter-green/50 mb-4">
                    <img
                      src="https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/harmjan%20schouwstra.png"
                      alt="Harm Jan Schouwstra – hypotheek- en pensioenadviseur"
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-nbg-blue font-bold text-lg m-0 mb-1">Harm Jan Schouwstra</h3>
                  <p className="text-nbg-blue/70 text-[15px] m-0 mb-5">
                    Hypotheek- en pensioenadviseur
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-5 py-3 w-full hover:bg-nbg-green/90 transition-colors"
                  >
                    Afspraak maken
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* USP strip */}
        <section className="bg-nbg-green text-white py-4 px-4">
          <div className="max-w-[1140px] mx-auto">
            <div className="flex flex-wrap justify-evenly items-center gap-y-3 gap-x-2">
              <p className="text-[17px] m-0">Onafhankelijk advies</p>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0 hidden sm:block" aria-hidden />
              <p className="text-[17px] m-0">SEH Erkend Financieel Adviseur</p>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0 hidden sm:block" aria-hidden />
              <p className="text-[17px] m-0">Erkend door AFM</p>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0 hidden sm:block" aria-hidden />
              <p className="text-[17px] m-0">Meer dan 30 jaar ervaring</p>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0 hidden sm:block" aria-hidden />
              <p className="text-[17px] m-0">Online & videobellen</p>
              <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0 hidden sm:block" aria-hidden />
              <p className="text-[17px] m-0">Geen verborgen kosten</p>
            </div>
          </div>
        </section>

        {/* Missie – content links, card rechts */}
        <section className="py-14 lg:py-20 bg-white">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-8">
                <div className="border-l-4 border-nbg-green pl-5 mb-6">
                  <h2 className="text-nbg-blue text-2xl lg:text-3xl font-bold m-0">Onze missie</h2>
                </div>
                <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                  Wij willen financiële beslissingen begrijpelijk en behapbaar maken. Of het nu gaat om een hypotheek, uw pensioen of de juiste verzekeringen: u krijgt advies in gewone taal, zonder jargon. Wij denken met u mee, zijn transparant over kosten en werken alleen in uw belang. Zo kunt u met vertrouwen keuzes maken voor uw toekomst.
                </p>
              </div>
              <div className="lg:col-span-4">
                <div className="rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-6 lg:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <h3 className="text-nbg-blue font-bold text-lg m-0 mb-3">Wat wij belangrijk vinden</h3>
                  <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Advies in gewone taal
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Transparant over kosten
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Altijd in uw belang
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Keuzes met vertrouwen
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visie – card links, content rechts */}
        <section className="py-14 lg:py-20 bg-nbg-lighter-green/50">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-4 order-2 lg:order-1">
                <div className="rounded-2xl bg-white border border-nbg-light-gray/50 p-6 lg:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <h3 className="text-nbg-blue font-bold text-lg m-0 mb-3">Onze aanpak</h3>
                  <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Online & videobellen
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Vakmanschap & persoonlijk
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Langetermijnrelaties
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Tevreden klanten centraal
                    </li>
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 mt-5 text-nbg-green font-semibold text-[15px] hover:underline"
                  >
                    Afspraak maken
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
              <div className="lg:col-start-5 lg:col-span-8 order-1 lg:order-2">
                <div className="border-l-4 border-nbg-green pl-5 mb-6">
                  <h2 className="text-nbg-blue text-2xl lg:text-3xl font-bold m-0">Onze visie</h2>
                </div>
                <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                  Advies moet toegankelijk zijn. Daarom werken wij graag online: via videobellen regelt u zaken in uw eigen tempo, waar u ook bent. Wij combineren vakmanschap met een persoonlijke aanpak. Langetermijnrelaties en tevreden klanten staan centraal – niet omzet, maar het beste advies voor uw situatie.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Harm Jan – wie is hij */}
        <section className="pt-14 pb-8 lg:pt-20 lg:pb-10 bg-white">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="flex flex-col items-center lg:items-start">
                  <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden bg-nbg-light-gray ring-4 ring-nbg-lighter-green/50">
                    <img
                      src="https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/harmjan%20schouwstra.png"
                      alt="Harm Jan Schouwstra"
                      width={256}
                      height={256}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-nbg-blue font-semibold text-[17px] mt-4">Harm Jan Schouwstra</span>
                  <span className="text-nbg-blue/70 text-[15px]">Hypotheek- en pensioenadviseur</span>
                </div>
              </div>
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="border-l-4 border-nbg-green pl-5 mb-6">
                  <h2 className="text-nbg-blue text-2xl lg:text-3xl font-bold m-0">Harm Jan Schouwstra</h2>
                </div>
                <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4 m-0">
                  Harm Jan is de drijvende kracht achter Haruna. Met meer dan 30 jaar ervaring in hypotheek- en pensioenadvies helpt hij particulieren en ondernemers bij het maken van de juiste keuzes. Hij werkt onafhankelijk, is SEH Erkend Financieel Adviseur (reg.nr. 18934), erkend door de AFM en lid van de NVB.
                </p>
                <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                  Zijn aanpak is direct en helder: geen wollig taalgebruik, maar concrete antwoorden op uw vragen. Of u nu een eerste huis koopt, uw pensioen wilt laten controleren of verzekeringen wilt afstemmen – u krijgt advies op maat, in een gesprek dat bij u past.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-nbg-lighter-green/80 text-nbg-blue text-[14px] font-medium">
                    <svg className="w-4 h-4 shrink-0 text-nbg-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    SEH Erkend Financieel Adviseur
                  </span>
                  <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-nbg-lighter-green/80 text-nbg-blue text-[14px] font-medium">
                    <svg className="w-4 h-4 shrink-0 text-nbg-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Erkend door AFM
                  </span>
                  <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-nbg-lighter-green/80 text-nbg-blue text-[14px] font-medium">
                    <svg className="w-4 h-4 shrink-0 text-nbg-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Lid van de NVB
                  </span>
                  <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-nbg-lighter-green/80 text-nbg-blue text-[14px] font-medium">
                    <svg className="w-4 h-4 shrink-0 text-nbg-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Gecertificeerd hypotheekadviseur
                  </span>
                </div>
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-primary hover:text-white transition-colors"
                  >
                    Afspraak maken
                  </Link>
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
