import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Privacybeleid | Haruna Hypotheek- en pensioenadvies",
  description:
    "Hoe Haruna B.V. omgaat met uw persoonsgegevens: formulieren, beveiligde opslag, uw rechten en contact.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pb-24 md:pb-20">
        <section className="bg-nbg-lighter-green pt-12 lg:pt-16 pb-10 lg:pb-12 border-b border-nbg-light-gray/40">
          <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Informatie</p>
            <h1 className="text-nbg-blue text-3xl sm:text-4xl font-bold tracking-tight">
              Privacybeleid
            </h1>
            <p className="mt-3 text-nbg-blue/70 text-[15px]">
              Laatst bijgewerkt: maart 2026
            </p>
          </div>
        </section>

        <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="max-w-none text-nbg-blue/90 text-[17px] leading-relaxed space-y-6">
            <p>
              Haruna B.V. hecht veel waarde aan de bescherming van uw persoonsgegevens. In dit privacybeleid leggen we uit welke gegevens wij verzamelen, waarvoor we die gebruiken, hoe wij ze beveiligen en welke rechten u heeft onder de Algemene Verordening Gegevensbescherming (AVG).
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-10 mb-3">Verwerkingsverantwoordelijke</h2>
            <p>
              Verwerkingsverantwoordelijke voor de verwerking van uw persoonsgegevens in het kader van deze website en onze dienstverlening is:
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

            <h2 className="text-nbg-blue text-xl font-bold mt-10 mb-3">Welke gegevens verzamelen wij?</h2>
            <p>
              Wij verwerken persoonsgegevens die u zelf aan ons verstrekt, met name wanneer u een formulier op onze website invult. Dat kan bijvoorbeeld gaan om:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>naam en contactgegevens (zoals e-mailadres en telefoonnummer);</li>
              <li>gegevens die u in het bericht of de aanvraag vermeldt (bijvoorbeeld uw vraag of situatie);</li>
              <li>indien van toepassing: gegevens die nodig zijn voor een afspraak of het beantwoorden van uw verzoek.</li>
            </ul>
            <p>
              Wij verwerken geen bijzondere persoonsgegevens via het formulier, tenzij u die vrijwillig invult en dat noodzakelijk is voor uw aanvraag. Denk daarbij aan zorgvuldigheid bij gevoelige informatie.
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-10 mb-3">Doel en grondslag</h2>
            <p>
              Wij gebruiken uw gegevens om contact met u op te nemen, uw vraag of aanvraag te beantwoorden, een afspraak te plannen en – waar dat past – u te informeren over onze diensten (hypotheek-, pensioen- en verzekeringsadvies). De grondslag is doorgaans de uitvoering van een overeenkomst of voorbereiding daarvan, dan wel uw toestemming of ons gerechtvaardigd belang om op uw verzoek te reageren.
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-10 mb-3">Opslag en beveiliging</h2>
            <p>
              De gegevens die u via formulieren verstrekt, worden <strong>veilig opgeslagen in onze database</strong>. Wij nemen passende technische en organisatorische maatregelen om misbruik, verlies en onbevoegde toegang te voorkomen. Toegang tot uw gegevens is beperkt tot personen die die informatie nodig hebben voor de uitvoering van hun werkzaamheden.
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-10 mb-3">Bewaartermijn</h2>
            <p>
              Wij bewaren uw gegevens niet langer dan nodig is voor de doeleinden waarvoor ze zijn verzameld, tenzij een langere bewaartermijn wettelijk verplicht is (bijvoorbeeld in het kader van financieel advies en administratie). Daarna worden gegevens verwijderd of geanonimiseerd, voor zover dat mogelijk is.
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-10 mb-3">Delen met derden</h2>
            <p>
              Wij verkopen uw gegevens niet. Persoonsgegevens kunnen alleen worden gedeeld met partijen die nodig zijn voor onze dienstverlening (bijvoorbeeld hosting of e-mail) of wanneer de wet dat vereist. Met zulke partijen sluiten wij waar nodig verwerkersovereenkomsten af.
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-10 mb-3">Uw rechten</h2>
            <p>
              Onder de AVG heeft u onder meer recht op inzage, rectificatie en verwijdering van uw gegevens, op beperking van de verwerking, op bezwaar en – waar van toepassing – op gegevensoverdraagbaarheid. U kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens (
              <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-nbg-green font-medium hover:underline">
                autoriteitpersoonsgegevens.nl
              </a>
              ). Voor uitoefening van uw rechten of vragen over dit beleid kunt u contact met ons opnemen via{" "}
              <a href="mailto:info@haruna.nl" className="text-nbg-green font-medium hover:underline">
                info@haruna.nl
              </a>
              .
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-10 mb-3">Cookies</h2>
            <p>
              Voor het gebruik van cookies op onze website verwijzen wij naar ons{" "}
              <Link href="/cookiebeleid" className="text-nbg-green font-medium hover:underline">
                cookiebeleid
              </Link>
              .
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-10 mb-3">Wijzigingen</h2>
            <p>
              Wij kunnen dit privacybeleid aanpassen, bijvoorbeeld bij wijzigingen in wetgeving of onze werkwijze. De actuele versie staat altijd op deze pagina, met vermelding van de datum van laatste wijziging.
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
