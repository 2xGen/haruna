import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Vergelijkingskaart hypotheek | Haruna Hypotheek- en pensioenadvies",
  description:
    "Vergelijkingskaart hypotheek van Haruna. Informatie over onze financiële dienstverlening, diensten, onafhankelijkheid en gemiddelde prijzen.",
};

const SectionTitle = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <div id={id} className="border-l-4 border-nbg-green pl-5 mb-4 scroll-mt-24">
    <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold m-0">{children}</h2>
  </div>
);

export default function VergelijkingskaartHypotheekPage() {
  return (
    <>
      <Header />

      <main className="pb-24 md:pb-20">
        {/* Hero */}
        <section className="bg-nbg-lighter-green pt-12 lg:pt-20 pb-14 lg:pb-16">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Vergelijkingskaart
            </p>
            <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
              Vergelijkingskaart hypotheek
            </h1>
            <p className="mt-5 text-nbg-blue/85 text-[17px] lg:text-lg leading-relaxed max-w-3xl">
              Op deze vergelijkingskaart staat informatie over onze financiële dienstverlening. Als u meerdere vergelijkingskaarten verzamelt, kunt u financiële dienstverleners met elkaar vergelijken. Door oriëntatiegesprekken te voeren met verschillende financiële dienstverleners, kunt u bepalen welke het beste bij u past.
            </p>
            <p className="mt-6 text-nbg-blue/70 text-sm">
              <a
                href="https://www.wijzeringeldzaken.nl/vergelijkingskaart"
                target="_blank"
                rel="noopener noreferrer"
                className="text-nbg-green font-medium hover:underline"
              >
                Meer over vergelijkingskaarten op wijzeringeldzaken.nl →
              </a>
            </p>
          </div>
        </section>

        {/* Contactgegevens */}
        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle>Haruna – contactgegevens</SectionTitle>
            <div className="rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-6 lg:p-8 max-w-xl">
              <p className="text-nbg-blue font-semibold text-lg m-0">Haruna BV</p>
              <p className="text-nbg-blue/85 text-[17px] m-0 mt-1">
                Perengaarde 57<br />
                3344 PR Hendrik Ido Ambacht
              </p>
              <ul className="mt-4 space-y-1 list-none p-0 m-0 text-nbg-blue/85 text-[17px]">
                <li><a href="https://www.haruna.nl" className="text-nbg-green hover:underline">www.haruna.nl</a></li>
                <li><a href="tel:0786849331" className="text-nbg-green hover:underline">078 684 93 31</a></li>
                <li><a href="mailto:info@haruna.nl" className="text-nbg-green hover:underline">info@haruna.nl</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Wat kunnen we voor je doen */}
        <section id="diensten" className="py-10 lg:py-14 bg-nbg-lighter-green/40">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle id="diensten">Wat kan deze financiële dienstverlener voor u doen?</SectionTitle>
            <p className="text-nbg-blue/85 text-[17px] mb-6 m-0">
              <strong className="text-nbg-blue">Hypotheek</strong> en <strong className="text-nbg-blue">verzekeringen bij de hypotheek</strong>. Wij geven advies én regelen het contract. We kijken naar uw persoonlijke situatie, adviseren welke hypotheek of verzekering geschikt is, en zorgen ervoor dat u het contract kunt afsluiten.
            </p>

            <div className="space-y-6">
              <div className="rounded-2xl bg-white border border-nbg-light-gray/50 p-6 lg:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <h3 className="text-nbg-blue font-bold text-lg m-0 mb-2">Advies geven én contract regelen</h3>
                <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0 mb-3">
                  We kijken naar uw persoonlijke situatie. Daarna adviseren we welke hypotheek of verzekering geschikt is. Ook zorgen we ervoor dat u het contract kunt afsluiten.
                </p>
                <p className="text-nbg-blue/70 text-[15px] m-0">
                  Deze dienstverlener levert de dienst &apos;advies geven en contract regelen&apos; voor hypotheken en voor verzekeringen bij de hypotheek.
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-nbg-light-gray/50 p-6 lg:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <h3 className="text-nbg-blue font-bold text-lg m-0 mb-2">Alleen contract regelen</h3>
                <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0 mb-3">
                  U kiest zelf een hypotheek of verzekering. Wij zorgen ervoor dat u het contract kunt afsluiten.
                </p>
                <p className="text-nbg-blue/70 text-[15px] m-0">
                  Deze dienstverlener levert de dienst &apos;alleen contract regelen&apos; voor hypotheken en voor verzekeringen bij de hypotheek.
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-nbg-light-gray/50 p-6 lg:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <h3 className="text-nbg-blue font-bold text-lg m-0 mb-2">Alleen advies geven</h3>
                <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0 mb-3">
                  We kijken naar uw persoonlijke situatie. Daarna adviseren we welke hypotheek of verzekering geschikt is.
                </p>
                <p className="text-nbg-blue/70 text-[15px] m-0">
                  Deze dienstverlener levert de dienst &apos;alleen advies geven&apos; voor hypotheken en voor verzekeringen bij de hypotheek.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Soorten hypotheken en verzekeringen */}
        <section id="producten" className="py-10 lg:py-14 bg-white">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle id="producten">Bij welke hypotheken en verzekeringen?</SectionTitle>
            <p className="text-nbg-blue/85 text-[17px] mb-6 m-0">
              De dienstverlening geldt bij de volgende producten:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl bg-nbg-lighter-green/50 border border-nbg-light-gray/40 p-5">
                <h4 className="text-nbg-blue font-semibold text-base m-0 mb-3">Hypotheken</h4>
                <ul className="space-y-1.5 text-nbg-blue/85 text-[15px] list-none p-0 m-0">
                  <li className="flex items-center gap-2"><span className="text-nbg-green">✓</span> Annuïteitenhypotheek</li>
                  <li className="flex items-center gap-2"><span className="text-nbg-green">✓</span> Lineaire hypotheek</li>
                  <li className="flex items-center gap-2"><span className="text-nbg-green">✓</span> Spaarhypotheek</li>
                  <li className="flex items-center gap-2"><span className="text-nbg-green">✓</span> Beleggingshypotheek</li>
                  <li className="flex items-center gap-2"><span className="text-nbg-green">✓</span> Aflossingsvrije hypotheek</li>
                  <li className="flex items-center gap-2"><span className="text-nbg-green">✓</span> Levenhypotheek</li>
                  <li className="flex items-center gap-2"><span className="text-nbg-green">✓</span> Krediethypotheek</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-nbg-lighter-green/50 border border-nbg-light-gray/40 p-5">
                <h4 className="text-nbg-blue font-semibold text-base m-0 mb-3">Verzekeringen bij de hypotheek</h4>
                <ul className="space-y-1.5 text-nbg-blue/85 text-[15px] list-none p-0 m-0">
                  <li className="flex items-center gap-2"><span className="text-nbg-green">✓</span> Overlijdensrisicoverzekering<sup className="text-nbg-blue/60">1</sup></li>
                  <li className="flex items-center gap-2"><span className="text-nbg-green">✓</span> Betalingsbeschermer<sup className="text-nbg-blue/60">2</sup></li>
                </ul>
                <p className="text-nbg-blue/70 text-sm mt-4 m-0">
                  Op deze vergelijkingskaart staan alleen verzekeringen naast uw hypotheek. Wij kunnen ook andere verzekeringen bieden. Vraag daarnaar in het gesprek.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hoe advies krijgen */}
        <section id="advies" className="py-10 lg:py-14 bg-nbg-lighter-green/40">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle id="advies">Hoe kunt u advies krijgen?</SectionTitle>
            <p className="text-nbg-blue/85 text-[17px] mb-6 m-0">
              U kunt op verschillende manieren advies krijgen. De donkerblauwe iconen geven aan wat bij ons mogelijk is. Een combinatie kan ook. De manier van advies geven kan invloed hebben op de kosten. Vraag ons naar de verschillen in kosten.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2 py-2.5 px-4 rounded-full bg-nbg-light-gray/60 text-nbg-blue/70 text-[15px] font-medium">
                Niet bij ons op kantoor
              </span>
              <span className="inline-flex items-center gap-2 py-2.5 px-4 rounded-full bg-nbg-blue text-white text-[15px] font-medium">
                ✓ Bij u thuis
              </span>
              <span className="inline-flex items-center gap-2 py-2.5 px-4 rounded-full bg-nbg-blue text-white text-[15px] font-medium">
                ✓ Videogesprek
              </span>
              <span className="inline-flex items-center gap-2 py-2.5 px-4 rounded-full bg-nbg-blue text-white text-[15px] font-medium">
                ✓ Telefoongesprek
              </span>
              <span className="inline-flex items-center gap-2 py-2.5 px-4 rounded-full bg-nbg-blue text-white text-[15px] font-medium">
                ✓ Online
              </span>
            </div>
          </div>
        </section>

        {/* Onafhankelijk advies */}
        <section id="onafhankelijk" className="py-10 lg:py-14 bg-white">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle id="onafhankelijk">Geeft deze dienstverlener onafhankelijk advies?</SectionTitle>
            <p className="text-nbg-blue/85 text-[17px] mb-6 m-0">
              Onafhankelijk advies over producten moet aan twee voorwaarden voldoen.
            </p>
            <div className="space-y-6">
              <div className="rounded-2xl border border-nbg-light-gray/50 p-6">
                <h4 className="text-nbg-blue font-semibold m-0 mb-3">Hypotheek</h4>
                <ul className="space-y-2 text-nbg-blue/85 text-[15px] list-none p-0 m-0">
                  <li><strong>Voorwaarde 1 – genoeg hypotheken vergelijken:</strong> Deze dienstverlener voldoet. Wij vergelijken genoeg hypotheken.</li>
                  <li><strong>Voorwaarde 2 – niet uitsluitend hypotheken van verbonden aanbieders:</strong> Deze dienstverlener voldoet.</li>
                </ul>
                <p className="mt-3 text-nbg-green font-medium text-[15px] m-0">Ja, onafhankelijk</p>
              </div>
              <div className="rounded-2xl border border-nbg-light-gray/50 p-6">
                <h4 className="text-nbg-blue font-semibold m-0 mb-3">Verzekeringen bij de hypotheek</h4>
                <ul className="space-y-2 text-nbg-blue/85 text-[15px] list-none p-0 m-0">
                  <li><strong>Voorwaarde 1 – genoeg verzekeringen vergelijken:</strong> Deze dienstverlener voldoet. Wij vergelijken genoeg verzekeringen.</li>
                  <li><strong>Voorwaarde 2 – niet uitsluitend verzekeringen van verbonden aanbieders:</strong> Deze dienstverlener voldoet.</li>
                </ul>
                <p className="mt-3 text-nbg-green font-medium text-[15px] m-0">Ja, onafhankelijk</p>
              </div>
            </div>
          </div>
        </section>

        {/* Waarom kiezen */}
        <section className="py-10 lg:py-14 bg-nbg-lighter-green/40">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle>Waarom Haruna kiezen?</SectionTitle>
            <p className="text-nbg-blue/85 text-[17px] leading-relaxed max-w-3xl m-0">
              Haruna stelt hoge eisen aan kwaliteit en persoonlijke service. Wij ontzorgen de klant op het gebied van financiële producten. Haruna laat graag de klant zijn of haar wens uitkomen, op korte en lange termijn.
            </p>
          </div>
        </section>

        {/* Prijzen */}
        <section id="prijzen" className="py-10 lg:py-14 bg-white">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle id="prijzen">Wat betaalt u aan deze dienstverlener?</SectionTitle>
            <p className="text-nbg-blue/85 text-[17px] mb-6 m-0">
              Hier vindt u alleen gemiddelde prijzen. De gemiddelde prijs is de prijs die klanten betalen in een vergelijkbare situatie. Hoe complexer uw financiële situatie, hoe meer u meestal betaalt. Uw adviseur informeert u over de precieze prijs. Laat afspraken ook altijd vastleggen.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-nbg-light-gray/50 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <table className="w-full min-w-[600px] text-left text-[15px]">
                <thead>
                  <tr className="bg-nbg-lighter-green/60 border-b border-nbg-light-gray/50">
                    <th className="p-4 font-semibold text-nbg-blue align-top">Dienst</th>
                    <th className="p-4 font-semibold text-nbg-blue align-top">In loondienst<br /><span className="font-normal text-nbg-blue/70 text-sm">niet eerder woning gekocht</span></th>
                    <th className="p-4 font-semibold text-nbg-blue align-top">In loondienst<br /><span className="font-normal text-nbg-blue/70 text-sm">wel eerder woning gekocht</span></th>
                    <th className="p-4 font-semibold text-nbg-blue align-top">Zelfstandig ondernemer<br /><span className="font-normal text-nbg-blue/70 text-sm">niet eerder woning gekocht</span></th>
                    <th className="p-4 font-semibold text-nbg-blue align-top">Zelfstandig ondernemer<br /><span className="font-normal text-nbg-blue/70 text-sm">wel eerder woning gekocht</span></th>
                  </tr>
                </thead>
                <tbody className="text-nbg-blue/85">
                  <tr className="border-b border-nbg-light-gray/40">
                    <td className="p-4 font-medium">Advies geven en contract regelen</td>
                    <td className="p-4">€ 2.350</td>
                    <td className="p-4">€ 2.850</td>
                    <td className="p-4">€ 3.350</td>
                    <td className="p-4">€ 3.600</td>
                  </tr>
                  <tr className="border-b border-nbg-light-gray/40">
                    <td className="p-4 font-medium">Alleen contract regelen</td>
                    <td className="p-4">€ 1.000</td>
                    <td className="p-4">€ 1.250</td>
                    <td className="p-4">€ 1.000</td>
                    <td className="p-4">€ 1.000</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Alleen advies geven</td>
                    <td className="p-4">€ 1.350</td>
                    <td className="p-4">€ 1.600</td>
                    <td className="p-4">€ 2.350</td>
                    <td className="p-4">€ 2.600</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-nbg-blue/75 text-[15px] mt-6 mb-4 m-0">
              De voorkeur gaat uit naar het leveren van de volledige dienst tot aan het passeren bij de notaris.
            </p>
            <p className="text-nbg-blue/75 text-[15px] m-0">
              Bij alleen contract regelen zonder advies doet u de kennis- en ervaringstoets.* U kiest zelf het product. Dit betekent dat u zelf – zonder hulp van een adviseur – beoordeelt of het product geschikt is voor uw situatie.
            </p>
            <p className="text-nbg-blue/60 text-sm mt-4 m-0">
              * De kennis- en ervaringstoets is een verplichte toets bij veel financiële producten. In de toets geeft u antwoord op vragen over het product en de risico&apos;s. Zo ziet u of u voldoende weet over de risico&apos;s. De uitkomst helpt u om in te schatten of het verantwoord is om een contract te regelen zonder advies.
            </p>
          </div>
        </section>

        {/* Toekomst en onderhoud */}
        <section id="toekomst" className="py-10 lg:py-14 bg-nbg-lighter-green/40">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle id="toekomst">Wat kan deze dienstverlener in de toekomst voor u betekenen?</SectionTitle>
            <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4 m-0">
              Ga bij veranderingen in uw persoonlijke situatie altijd terug naar een financiële dienstverlener. Door deze veranderingen past de hypotheek of verzekering misschien niet meer bij uw situatie. Bijvoorbeeld omdat uw gezinssituatie of inkomen verandert. Dan betaalt u misschien te veel of loopt u meer risico dan u wilt.
            </p>
            <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4 m-0">
              Voor een oriëntatiegesprek kunt u altijd bij een financiële dienstverlener terecht. Is er een belangrijke verandering in uw hypotheek en/of verzekering? Dan neemt de dienstverlener of aanbieder contact met u op, zonder dat u daarvoor betaalt.
            </p>
            <div className="rounded-2xl bg-white border border-nbg-light-gray/50 p-6 mt-6">
              <h4 className="text-nbg-blue font-semibold m-0 mb-2">Onderhoudsdiensten<sup className="text-nbg-blue/60">3</sup></h4>
              <p className="text-nbg-blue/85 text-[17px] m-0 mb-2">
                Voor onderhoudsdiensten betaalt u een bedrag via een vast tarief.
              </p>
              <p className="text-nbg-green font-medium text-[15px] m-0">
                Ja, deze dienstverlener biedt ook onderhoudsdiensten aan.
              </p>
            </div>
            <p className="text-nbg-blue/70 text-sm mt-6 m-0">
              Meer informatie over andere dienstverlening in de toekomst:{" "}
              <Link href="https://www.haruna.nl" className="text-nbg-green font-medium hover:underline">www.haruna.nl</Link>
            </p>
          </div>
        </section>

        {/* Voetnoten */}
        <section className="py-10 lg:py-14 bg-white border-t border-nbg-light-gray/50">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle>Toelichtingen</SectionTitle>
            <ol className="space-y-4 text-nbg-blue/80 text-[15px] leading-relaxed list-decimal list-inside m-0 pl-2">
              <li>
                <strong>Overlijdensrisicoverzekering:</strong> Als u een hypotheek afsluit, kunt u ook een overlijdensrisicoverzekering afsluiten. Bij een overlijdensrisicoverzekering krijgen nabestaanden een bedrag als u overlijdt. Met dit bedrag kunnen zij bijvoorbeeld (een deel van) de hypotheek aflossen.
              </li>
              <li>
                <strong>Betalingsbeschermer:</strong> Als u een hypotheek afsluit, kunt u ook een betalingsbeschermer afsluiten. Bij een betalingsbeschermer (ook woonlastenverzekering genoemd) krijgt u bijvoorbeeld een uitkering voor uw woonlasten als u arbeidsongeschikt of werkloos wordt.
              </li>
              <li>
                <strong>Onderhoudsdiensten:</strong> Met onderhoudsdiensten kan een financiële dienstverlener samen met u in de gaten houden of er veranderingen zijn waardoor een aanpassing in uw hypotheek of verzekering nodig is.
              </li>
            </ol>
          </div>
        </section>

        {/* Terug / contact */}
        <section className="py-10 bg-nbg-lighter-green/40">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4">
              <Link
                href="/hypotheken"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                ← Hypotheken
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors"
              >
                Afspraak maken
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
