import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Algemene voorwaarden | Haruna Hypotheek- en pensioenadvies",
  description:
    "Algemene voorwaarden van Haruna B.V. voor hypotheek-, pensioen- en verzekeringsadvies en het gebruik van haruna.nl.",
};

export default function AlgemeneVoorwaardenPage() {
  return (
    <>
      <Header />
      <main className="pb-24 md:pb-20">
        <section className="bg-nbg-lighter-green pt-12 lg:pt-16 pb-10 lg:pb-12 border-b border-nbg-light-gray/40">
          <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Informatie</p>
            <h1 className="text-nbg-blue text-3xl sm:text-4xl font-bold tracking-tight">
              Algemene voorwaarden
            </h1>
            <p className="mt-3 text-nbg-blue/70 text-[15px]">
              Laatst bijgewerkt: maart 2026
            </p>
          </div>
        </section>

        <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="max-w-none text-nbg-blue/90 text-[17px] leading-relaxed space-y-6">
            <p>
              Deze algemene voorwaarden gelden voor alle aanbiedingen, offertes en overeenkomsten tussen u en Haruna B.V. betreffende hypotheek-, pensioen- en verzekeringsadvies en voor het gebruik van onze website, tenzij schriftelijk anders is overeengekomen.
            </p>

            <div className="rounded-xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 text-nbg-blue">
              <p className="font-semibold m-0 mb-2">HARUNA B.V.</p>
              <p className="m-0 mb-1">Perengaarde 57</p>
              <p className="m-0 mb-3">3344 PR Hendrik-Ido-Ambacht</p>
              <p className="m-0 mb-1">KvK: 24425182</p>
              <p className="m-0 mb-3">
                Haruna B.V. is ingeschreven bij de AFM onder vergunningsnummer <strong>12017699</strong>.
              </p>
              <p className="m-0">
                E-mail:{" "}
                <a href="mailto:info@haruna.nl" className="text-nbg-green font-medium hover:underline">
                  info@haruna.nl
                </a>
              </p>
            </div>

            <h2 className="text-nbg-blue text-xl font-bold mt-10 mb-3">Dienstverlening</h2>
            <p>
              Haruna verleent onafhankelijk financieel advies op het gebied van hypotheken, pensioen en verzekeringen, in lijn met de geldende wet- en regelgeving en de eisen van de Autoriteit Financiële Markten (AFM). Advies is altijd gebaseerd op de door u verstrekte gegevens en uw wensen; u bent zelf verantwoordelijk voor de juistheid en volledigheid van die informatie.
            </p>
            <p>
              Een advies of aanbeveling is geen garantie voor een bepaalde uitkomst (bijvoorbeeld bij een hypotheekaanvraag of acceptatie door een aanbieder). Marktomstandigheden, productvoorwaarden en wetgeving kunnen wijzigen.
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-10 mb-3">Afspraken en tarieven</h2>
            <p>
              Honorarium en werkwijze worden in beginsel per opdracht of traject met u besproken en vastgelegd. Eventuele kosten van derden (bijvoorbeeld notaris of taxateur) komen, voor zover van toepassing, apart bij u in rekening, tenzij anders afgesproken.
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-10 mb-3">Gegevens en privacy</h2>
            <p>
              Voor de verwerking van persoonsgegevens verwijzen wij naar ons{" "}
              <Link href="/privacy" className="text-nbg-green font-medium hover:underline">
                privacybeleid
              </Link>
              . Door gebruik te maken van onze diensten gaat u ermee akkoord dat wij gegevens verwerken zoals daar beschreven, voor zover dat nodig is voor de uitvoering van de overeenkomst.
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-10 mb-3">Website</h2>
            <p>
              De inhoud van haruna.nl is met zorg samengesteld en dient ter algemene informatie. Geen enkele pagina op deze site vormt juridisch of fiscaal advies; voor uw persoonlijke situatie kunt u contact met ons opnemen. Wij streven naar een goed bereikbare site, maar kunnen niet garanderen dat de website te allen tijde ononderbroken of foutloos beschikbaar is.
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-10 mb-3">Aansprakelijkheid</h2>
            <p>
              Haruna levert advies en bemiddeling in overeenstemming met de geldende beroepsregels. Resultaten hangen ook af van partijen buiten Haruna (bijvoorbeeld banken en verzekeraars). Wat precies geldt voor uw situatie – inclusief eventuele aansprakelijkheid – legt Haruna vast in de concrete opdracht of overeenkomst met u, of kunt u bij Haruna navragen. Deze website vervangt geen individuele afspraken of juridisch advies daarover.
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-10 mb-3">Klachten</h2>
            <p>
              Heeft u een klacht over onze dienstverlening, neem dan eerst contact met ons op via{" "}
              <a href="mailto:info@haruna.nl" className="text-nbg-green font-medium hover:underline">
                info@haruna.nl
              </a>
              . Wij zoeken samen met u naar een oplossing. Daarnaast kunt u zich wenden tot de geschillencommissie of de AFM, voor zover dat voor uw situatie van toepassing is; zie ook ons dienstverleningsdocument waar van toepassing.
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-10 mb-3">Toepasselijk recht</h2>
            <p>
              Op alle overeenkomsten met Haruna is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland, tenzij de wet dwingend anders voorschrijft.
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-10 mb-3">Wijzigingen</h2>
            <p>
              Haruna kan deze algemene voorwaarden wijzigen. De versie die geldt voor uw opdracht is de versie die u bij aanvaarding van de opdracht heeft ontvangen of die op onze website stond, tenzij wij u schriftelijk op een nieuwe versie wijzen. Voor lopende opdrachten informeren wij u bij wezenlijke wijzigingen waar nodig.
            </p>

            <p className="text-nbg-blue/80 text-[15px] pt-4">
              Vragen over deze voorwaarden? Neem gerust{" "}
              <Link href="/contact" className="text-nbg-green font-medium hover:underline">
                contact
              </Link>{" "}
              met ons op.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-nbg-light-gray">
            <Link href="/" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
              <span className="rotate-180 inline-block">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
              </span>
              Terug naar home
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
