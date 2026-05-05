import type { Metadata } from "next";
import Link from "next/link";

import Footer from "../components/Footer";
import Header from "../components/Header";
import SituatieschetsWizard from "../components/situatieschets/SituatieschetsWizard";

export const metadata: Metadata = {
  title: "Gratis situatiecheck | Haruna",
  description:
    "Kies uw onderwerp: hypotheek-PDF met indicaties en checklist, of direct een kennismaking voor pensioen, verzekeringen of financiering. Geen account nodig voor de hypotheek-situatieschets.",
  alternates: { canonical: "https://haruna.nl/situatieschets" },
};

export default function SituatieschetsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2 m-0">
              Situatiecheck · hypotheek, pensioen, verzekeringen, financiering
            </p>
            <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight max-w-3xl m-0">
              Eerst kiezen waar u hulp bij wilt
            </h1>
            <p className="mt-4 text-nbg-blue/80 text-[17px] lg:text-lg leading-relaxed max-w-2xl m-0">
              <strong className="text-nbg-blue">Hypotheek:</strong> vul de wizard in en download meteen een PDF met uw
              gegevens, een ruwe indicatie voor maximale hypotheek en maandlast, een documentchecklist en
              gespreksvragen. <strong className="text-nbg-blue">Pensioen, verzekeringen of financiering:</strong> we
              sturen u door naar het afspraakformulier met het juiste onderwerp al gekozen — daar plant u een kort
              videogesprek.
            </p>
            <ul className="mt-5 flex flex-wrap gap-3 list-none p-0 m-0 text-[15px] text-nbg-blue/85">
              <li className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
                <span className="text-nbg-green font-bold" aria-hidden>
                  ✓
                </span>
                Geen account nodig
              </li>
              <li className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
                <span className="text-nbg-green font-bold" aria-hidden>
                  ✓
                </span>
                Contact alleen als u een adviseur wilt laten meekijken
              </li>
              <li className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
                <span className="text-nbg-green font-bold" aria-hidden>
                  ✓
                </span>
                Hypotheek-PDF: geen productadvies in het document — wel voorbereiding
              </li>
            </ul>
            <p className="mt-4 text-sm text-nbg-blue/70 m-0">
              Liever meteen persoonlijk contact?{" "}
              <Link href="/contact#formulier" className="text-nbg-primary font-semibold hover:underline">
                Plan een kort gesprek
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
            <SituatieschetsWizard />
          </div>
        </section>

        <section className="bg-nbg-lighter-green/50 border-t border-nbg-light-gray py-10 lg:py-14">
          <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold m-0 mb-4">
              Wat u in uw situatieschets terugvindt
            </h2>
            <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0 mb-4">
              De PDF is uw voorbereidingsdocument: wat u zelf invult, netjes op een rij — handig om mee te nemen of
              door te sturen vóór een gesprek met een erkend adviseur.
            </p>
            <ul className="list-none p-0 m-0 space-y-3 text-nbg-blue/85 text-[17px] leading-relaxed">
              <li className="flex gap-3">
                <span className="text-nbg-green font-bold shrink-0" aria-hidden>
                  ·
                </span>
                <span>
                  <strong className="text-nbg-blue">Uw cijfers:</strong> inkomen (en partner), type contract, studieschuld
                  en andere posten, spaargeld en uw richting qua koopsom of streefbedrag.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-nbg-green font-bold shrink-0" aria-hidden>
                  ·
                </span>
                <span>
                  <strong className="text-nbg-blue">Helder voor het gesprek:</strong> wat in uw situatie opvalt, een
                  korte toelichting bij de indicaties (geen productadvies) en voorbeeldvragen die u aan uw adviseur
                  kunt stellen.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-nbg-green font-bold shrink-0" aria-hidden>
                  ·
                </span>
                <span>
                  <strong className="text-nbg-blue">Geen vast leenbedrag op basis van deze PDF alleen:</strong> dat
                  hoort bij uw dossier en uw adviseur. Wilt u vooraf een ruwe bandbreedte? Gebruik de rekenhulp op de{" "}
                  <Link href="/hypotheken" className="text-nbg-primary font-semibold hover:underline">
                    hypotheekpagina
                  </Link>{" "}
                  of neem contact op voor maatwerk.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-nbg-green font-bold shrink-0" aria-hidden>
                  ·
                </span>
                <span>
                  <strong className="text-nbg-blue">Ruimte om zelf aan te vullen:</strong> noteer onderaan of in de
                  kantlijn wat u nog wilt vragen tijdens het gesprek.
                </span>
              </li>
            </ul>
            <p className="mt-6 text-nbg-blue/80 text-[15px] leading-relaxed m-0">
              <strong className="text-nbg-blue">Geen hypotheekadvies vanuit dit formulier.</strong> Haruna structureert
              uw invoer en helpt u voorbereiden. Voor een offerte, bindende leencapaciteit of productkeuze heeft u
              altijd een erkend adviseur nodig — dat kan bij ons, in een vervolggesprek.
            </p>
            <p className="mt-6 text-nbg-blue/80 text-[15px] m-0">
              Meer achtergrond over hypotheken in gewone taal?{" "}
              <Link href="/hypotheken" className="text-nbg-primary font-semibold hover:underline">
                Hypotheken bij Haruna
              </Link>{" "}
              ·{" "}
              <Link href="/contact" className="text-nbg-primary font-semibold hover:underline">
                Contact
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
