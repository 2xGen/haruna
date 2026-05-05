import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HypotheekBerekenenForm from "../../components/HypotheekBerekenenForm";

export const metadata = {
  title: "Hypotheek berekenen | Maximale hypotheek & maandlasten | Haruna",
  description:
    "Bereken een indicatie voor maximale hypotheek en maandlasten. Uitleg over LTI, LTV, NHG, verduurzamen en de gratis PDF-situatiecheck.",
};

export default function HypotheekBerekenenPage() {
  return (
    <>
      <Header />
      <main className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="mb-8">
          <Link href="/hypotheken" className="text-nbg-green font-medium text-[15px] hover:underline">
            ← Hypotheken
          </Link>
        </div>
        <h1 className="text-nbg-blue text-3xl lg:text-4xl font-bold mb-2">
          Hypotheek berekenen
        </h1>
        <p className="text-nbg-blue/80 text-lg mb-8">
          Bereken uw maximale hypotheek en maandlasten. Dit is een ruime indicatie — wilt u weten wat past bij uw
          inkomen, schulden en plannen, vul dan de{" "}
          <Link href="/situatieschets" className="text-nbg-primary font-semibold hover:underline">
            gratis situatiecheck
          </Link>{" "}
          in voor een PDF met meer context.
        </p>
        <HypotheekBerekenenForm />

        <article className="mt-12 lg:mt-16 space-y-10 text-nbg-blue/85 text-[17px] leading-relaxed border-t border-nbg-light-gray pt-10 lg:pt-14">
          <div>
            <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold m-0 mb-3">Hoe deze rekenmodule werkt</h2>
            <p className="m-0 mb-3">
              De schatting hierboven is bewust eenvoudig gehouden. Uw bruto jaarinkomen (en eventueel dat van uw
              partner) wordt omgezet naar een maandlast die in de buurt van gangbare{" "}
              <strong className="text-nbg-blue">rule-of-thumb</strong>-uitgangspunten blijft: ruwweg wordt uitgegaan
              van maximaal ongeveer <strong className="text-nbg-blue">25% van het bruto maandinkomen</strong> aan
              hypotheeklasten (rente en aflossing). Daarmee wordt teruggerekend welk hypotheekbedrag bij uw gekozen
              rente en looptijd past. Voor de maandlast zelf gebruikt u de klassieke formules voor{" "}
              <strong className="text-nbg-blue">annuïteit</strong> of <strong className="text-nbg-blue">lineair</strong>
              .
            </p>
            <p className="m-0 text-nbg-blue/75 text-[15px]">
              Dit is <strong className="text-nbg-blue">geen</strong> officiële BKR- of banktoets en geen
              stressrente-berekening zoals geldverstrekkers die toepassen.
            </p>
          </div>

          <div>
            <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold m-0 mb-3">Waar een echte maximale hypotheek van afhangt</h2>
            <p className="m-0 mb-4">
              In de praktijk kijken banken en adviseurs verder dan alleen inkomen en rente. Belangrijke thema&apos;s:
            </p>
            <ul className="list-none p-0 m-0 space-y-3">
              <li className="flex gap-3">
                <span className="text-nbg-green font-bold shrink-0" aria-hidden>
                  ·
                </span>
                <span>
                  <strong className="text-nbg-blue">LTI (loan-to-income):</strong> de verhouding tussen lening en
                  inkomen. Regelgeving en beleid beperken hoe hoog de lening mag zijn ten opzichte van wat u verdient;
                  partnerinkomen, zekerheid van inkomen (contract, proeftijd, ZZP) en vaste lasten spelen mee.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-nbg-green font-bold shrink-0" aria-hidden>
                  ·
                </span>
                <span>
                  <strong className="text-nbg-blue">LTV (loan-to-value):</strong> de verhouding tussen het
                  hypotheekbedrag en de <strong className="text-nbg-blue">marktwaarde</strong> van de woning (meestal
                  vastgelegd via taxatie). Doorgaans wordt tot een bepaald percentage van de waarde gefinancierd; boven
                  dat percentage is extra onderbouwing of andere regelingen nodig.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-nbg-green font-bold shrink-0" aria-hidden>
                  ·
                </span>
                <span>
                  <strong className="text-nbg-blue">Woningwaarde en eigen inbreng:</strong> hoe meer eigen geld, hoe
                  lager het benodigde leenbedrag ten opzichte van de waarde — dat kan gunstig zijn voor rente en
                  acceptatie.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-nbg-green font-bold shrink-0" aria-hidden>
                  ·
                </span>
                <span>
                  <strong className="text-nbg-blue">NHG-grens:</strong> de Nationale Hypotheek Garantie kent een
                  maximaal leenbedrag per kalenderjaar. Boven die grens is geen NHG meer mogelijk; dat kan rente en
                  voorwaarden beïnvloeden. Het actuele plafond vindt u bijvoorbeeld op{" "}
                  <a
                    href="https://www.nhg.nl/"
                    className="text-nbg-primary font-semibold hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    nhg.nl
                  </a>
                  .
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-nbg-green font-bold shrink-0" aria-hidden>
                  ·
                </span>
                <span>
                  <strong className="text-nbg-blue">Verduurzamen en extra leenruimte:</strong> voor energiebesparende
                  maatregelen kan onder voorwaarden extra financieringsruimte ontstaan ten opzichte van de reguliere LTV
                  — in de markt wordt vaak gesproken over ruimte rond <strong className="text-nbg-blue">100%</strong>{" "}
                  tot ongeveer <strong className="text-nbg-blue">106%</strong> van de woningwaarde, afhankelijk van
                  bewijs, product en actuele regels. Percentages en voorwaarden wijzigen; uw adviseur toetst wat op uw
                  dossier van toepassing is.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-nbg-green font-bold shrink-0" aria-hidden>
                  ·
                </span>
                <span>
                  <strong className="text-nbg-blue">Studieschuld en andere schulden:</strong> die tellen mee in
                  toetsingen en kunnen uw maximale leenruimte verlagen ten opzichte van deze simpele calculator.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-nbg-green font-bold shrink-0" aria-hidden>
                  ·
                </span>
                <span>
                  <strong className="text-nbg-blue">Stressrente en buffers:</strong> banken rekenen met een hogere
                  fictieve rente om te beoordelen of u de lening volhoudt als de rente stijgt — daardoor kan het
                  toegestane bedrag lager uitvallen dan een “mooie” indicatie op basis van de actuele rente alleen.
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-nbg-lighter-green/80 border border-nbg-green/20 p-5 lg:p-6">
            <h2 className="text-nbg-blue text-lg font-bold m-0 mb-2">Volgende stap</h2>
            <p className="m-0 text-nbg-blue/85 text-[16px]">
              Wilt u uw cijfers en plannen netjes op een rij met een PDF die ook documenten en gespreksvragen
              meeneemt? Start de{" "}
              <Link href="/situatieschets" className="text-nbg-primary font-semibold hover:underline">
                gratis situatiecheck
              </Link>
              . Liever meteen persoonlijk?{" "}
              <Link href="/contact#formulier" className="text-nbg-primary font-semibold hover:underline">
                Plan een kort gesprek
              </Link>
              .
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
