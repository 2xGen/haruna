import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PAGE_URL = "https://haruna.nl/hypotheek-checklist";
const FEATURED_IMAGE =
  "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/hypotheek%20checlist.jpg";

const FOR_WHO = [
  "Starters die voor het eerst een woning kopen",
  "Doorstromers die verhuizen naar een andere woning",
  "Mensen die hun hypotheek willen oversluiten naar een andere geldverstrekker",
  "Ondernemers en ZZP'ers die een hypotheek willen aanvragen",
];

const STEP_1 = [
  "Geldig legitimatiebewijs (paspoort of identiteitskaart - rijbewijs is niet altijd voldoende)",
  "Burgerservicenummer (BSN)",
  "Bewijs van uw huidige woonsituatie (huurcontract of eigendomsbewijs)",
];

const STEP_2_EMPLOYEE = [
  "Laatste drie salarisstroken",
  "Werkgeversverklaring (niet ouder dan 3 maanden) - uw werkgever vult dit in",
  "Jaaropgave van het voorgaande jaar",
  "Bij variabel inkomen: loonstroken van de afgelopen 12 maanden",
];

const STEP_2_ENTREPRENEUR = [
  "Definitieve aanslag inkomstenbelasting van de afgelopen drie jaar",
  "Jaarrekeningen van de afgelopen drie jaar - opgesteld door een accountant",
  "Uittreksel KvK (niet ouder dan 3 maanden)",
  "Opgave lopende opdrachten of orderportefeuille indien beschikbaar",
];

const STEP_2_BENEFIT = [
  "Uitkeringsspecificatie of pensioenoverzicht",
  "Beslissingsbrief van de uitkerende instantie",
  "Bij meerdere inkomstenbronnen: alle relevante documenten per inkomstenbron",
];

const STEP_3 = [
  "Koopovereenkomst (voorlopig koopcontract) zodra deze is getekend",
  "Taxatierapport van een gecertificeerde taxateur (meestal verplicht)",
  "Bouwkundige keuring indien van toepassing (aanbevolen bij oudere woningen)",
  "Energielabel van de woning",
  "VvE-documenten bij appartementen: jaarcijfers, notulen en reservefonds",
];

const STEP_4 = [
  "Overzicht van lopende leningen (persoonlijke lening, autolening, DUO-studieschuld)",
  "Creditcardlimieten, ook als u de kaart weinig gebruikt",
  "Alimentatieverplichtingen indien van toepassing",
  "Overzicht van spaargeld en beleggingen (kan uw aanvraag versterken)",
  "BKR-registratie controleren via mijnbkr.nl",
];

const STEP_5 = [
  "Recente hypotheekopgave van uw huidige geldverstrekker (openstaand saldo en rentevaste periode)",
  "Actuele WOZ-beschikking of taxatierapport van uw woning",
  "Overzicht van eventuele verbouwingen of verduurzamingsmaatregelen",
];

const COMMON_MISTAKES = [
  {
    title: "Te laat beginnen met documenten verzamelen",
    body: "Een werkgeversverklaring, taxatierapport en accountantsverklaring kosten tijd. Begin idealiter vier tot zes weken voor uw gewenste passeerdatum bij de notaris.",
  },
  {
    title: "Verkeerde of verouderde documenten aanleveren",
    body: "Een werkgeversverklaring ouder dan drie maanden wordt meestal niet geaccepteerd. Controleer daarom altijd de datum en geldigheid.",
  },
  {
    title: "Schulden of verplichtingen vergeten te vermelden",
    body: "Geldverstrekkers toetsen op BKR-gegevens. Niet gemelde verplichtingen zorgen vrijwel altijd voor vertraging of afwijzing.",
  },
  {
    title: "Grote aankopen doen vlak voor de aanvraag",
    body: "Nieuwe kredieten of financieringen verlagen direct uw leencapaciteit. Wacht bij voorkeur tot na de passeerdatum.",
  },
  {
    title: "Bijkomende kosten onderschatten",
    body: "Naast de koopprijs betaalt u onder meer overdrachtsbelasting, notaris-, taxatie- en advieskosten. Houd rekening met circa 3% tot 6% eigen middelen.",
  },
  {
    title: "Als ZZP'er te weinig historie kunnen aantonen",
    body: "Veel geldverstrekkers vragen drie volledige boekjaren. Met een kortere ondernemershistorie zijn er soms nog opties, maar die zijn beperkter.",
  },
];

const TIMELINE_ROWS = [
  ["Orientatie en adviesgesprek", "1-2 weken"],
  ["Documenten verzamelen", "2-4 weken"],
  ["Aanvraag indienen bij geldverstrekker", "1-2 weken behandeltijd"],
  ["Taxatie laten uitvoeren", "1-2 weken"],
  ["Offerte ontvangen en tekenen", "enkele werkdagen tot 1 week"],
  ["Notarispassering", "op afgesproken datum"],
];

const SUMMARY_PERSONAL = [
  "Geldig legitimatiebewijs",
  "BSN",
  "Bewijs huidige woonsituatie",
];

const SUMMARY_INCOME = [
  "Salarisstroken (laatste 3) of jaarrekeningen (laatste 3 jaar)",
  "Werkgeversverklaring of KvK-uittreksel",
  "Jaaropgave(n)",
];

const SUMMARY_HOUSE = [
  "Koopovereenkomst",
  "Taxatierapport",
  "Energielabel",
  "VvE-documenten (bij appartement)",
];

const SUMMARY_FINANCIAL = [
  "Overzicht lopende leningen en verplichtingen",
  "BKR-registratie gecheckt",
  "Overzicht eigen spaargeld",
];

const SUMMARY_REFINANCE = [
  "Hypotheekopgave huidige geldverstrekker",
  "WOZ-beschikking of taxatierapport",
];

const FAQ_ITEMS = [
  {
    question: "Hoe lang van tevoren moet ik beginnen met mijn hypotheekaanvraag?",
    answer:
      "Start bij voorkeur minimaal zes tot acht weken voor uw gewenste passeerdatum. Bij zelfstandigen of complexere dossiers is extra tijd vaak verstandig.",
  },
  {
    question: "Kan ik ook een hypotheek krijgen als ZZP'er?",
    answer:
      "Ja. De eisen zijn vaak strenger dan bij loondienst. Veel geldverstrekkers vragen drie jaarcijfers en belastingaangiften, maar er bestaan ook trajecten met meer maatwerk.",
  },
  {
    question: "Wat is een werkgeversverklaring en wie vult deze in?",
    answer:
      "Een werkgeversverklaring is een officieel document over uw inkomen, dienstverband en contractvorm. Uw werkgever of HR-afdeling vult dit in.",
  },
  {
    question: "Telt mijn studieschuld mee bij de hypotheekaanvraag?",
    answer:
      "Ja. Een DUO-schuld wordt meegenomen in de berekening van uw maximale hypotheek. Het effect hangt af van de schuldhoogte en het leenstelsel.",
  },
  {
    question: "Wat zijn kosten koper?",
    answer:
      "Kosten koper zijn de bijkomende kosten bij aankoop van een bestaande woning, zoals overdrachtsbelasting, notariskosten en soms makelaarskosten. Deze betaalt u uit eigen middelen.",
  },
  {
    question: "Wat is NHG?",
    answer:
      "Nationale Hypotheek Garantie biedt extra zekerheid bij betalingsproblemen en kan zorgen voor een lagere rente. Er geldt een maximale koopsomgrens.",
  },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Hypotheek Checklist 2026",
  description:
    "Stap voor stap overzicht van alle documenten en stappen voor een hypotheekaanvraag in Nederland",
  step: [
    { "@type": "HowToStep", name: "Persoonlijke documenten verzamelen" },
    { "@type": "HowToStep", name: "Inkomensdocumenten verzamelen" },
    { "@type": "HowToStep", name: "Woningdocumenten verzamelen" },
    { "@type": "HowToStep", name: "Financiele situatie in kaart brengen" },
    { "@type": "HowToStep", name: "Aanvraag indienen" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export const metadata: Metadata = {
  title: "Hypotheek Checklist 2026 — Alles wat u nodig heeft voor uw aanvraag",
  description:
    "Gratis hypotheek checklist voor 2026. Welke documenten heeft u nodig, wat zijn de stappen en welke fouten moet u vermijden? Volledig overzicht voor kopers en oversluiting.",
  alternates: {
    canonical: "/hypotheek-checklist",
  },
  openGraph: {
    title: "Hypotheek Checklist 2026 — Alles wat u nodig heeft voor uw aanvraag",
    description:
      "Gratis hypotheek checklist voor 2026. Welke documenten heeft u nodig, wat zijn de stappen en welke fouten moet u vermijden?",
    url: PAGE_URL,
    type: "article",
    images: [
      {
        url: FEATURED_IMAGE,
        width: 1200,
        height: 630,
        alt: "Hypotheek checklist 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hypotheek Checklist 2026",
    description:
      "Overzicht van documenten, stappen, fouten en doorlooptijden bij een hypotheekaanvraag.",
    images: [FEATURED_IMAGE],
  },
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 list-none p-0 m-0">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
          <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 list-none p-0 m-0">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-nbg-green/15 text-nbg-green mt-0.5"
            aria-hidden
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M16.704 5.293a1 1 0 00-1.408 0l-6.07 6.07-2.121-2.121a1 1 0 00-1.414 1.414l2.828 2.828a1 1 0 001.414 0l6.778-6.778a1 1 0 000-1.413z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="text-nbg-blue/85 text-[16px] leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function HypotheekChecklistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />
      <main className="pb-20 md:pb-24">
        <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
              <Link href="/hypotheken" className="hover:text-nbg-green">
                Hypotheken
              </Link>
              <span className="mx-2">/</span>
              <span className="text-nbg-blue font-medium">Hypotheek checklist</span>
            </nav>
            <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight m-0">
              Hypotheek Checklist 2026 — Alles wat u nodig heeft voor uw aanvraag
            </h1>
            <p className="mt-5 text-nbg-blue/80 text-[17px] lg:text-lg leading-relaxed">
              Een hypotheek aanvragen vraagt om goede voorbereiding. Banken en geldverstrekkers beoordelen uw
              aanvraag op basis van inkomen, schulden en de waarde van de woning. Hoe completer uw dossier,
              hoe soepeler het proces verloopt. Deze checklist helpt u om niets te vergeten.
            </p>
          </div>
        </section>

        <article className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="rounded-2xl overflow-hidden border border-nbg-light-gray/50 shadow-[0_4px_20px_rgba(0,0,0,0.06)] mb-10">
            <Image
              src={FEATURED_IMAGE}
              alt="Checklist voor hypotheekaanvraag"
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          <section>
            <h2 className="text-nbg-blue text-2xl font-bold mb-4">Voor wie is deze checklist?</h2>
            <BulletList items={FOR_WHO} />
          </section>

          <section className="mt-10">
            <h2 className="text-nbg-blue text-2xl font-bold mb-4">Stap 1 — Uw persoonlijke documenten</h2>
            <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
              Dit heeft u vrijwel altijd nodig, ongeacht uw situatie.
            </p>
            <BulletList items={STEP_1} />
          </section>

          <section className="mt-10">
            <h2 className="text-nbg-blue text-2xl font-bold mb-4">Stap 2 — Inkomensdocumenten</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-nbg-blue text-xl font-semibold mb-3">In loondienst</h3>
                <BulletList items={STEP_2_EMPLOYEE} />
              </div>
              <div>
                <h3 className="text-nbg-blue text-xl font-semibold mb-3">ZZP&apos;er of ondernemer</h3>
                <BulletList items={STEP_2_ENTREPRENEUR} />
              </div>
              <div>
                <h3 className="text-nbg-blue text-xl font-semibold mb-3">Uitkering of pensioen</h3>
                <BulletList items={STEP_2_BENEFIT} />
              </div>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-nbg-blue text-2xl font-bold mb-4">Stap 3 — Documenten over de woning</h2>
            <BulletList items={STEP_3} />
          </section>

          <section className="mt-10">
            <h2 className="text-nbg-blue text-2xl font-bold mb-4">
              Stap 4 — Overzicht van uw huidige financiele situatie
            </h2>
            <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
              Geldverstrekkers kijken niet alleen naar inkomen, maar ook naar bestaande verplichtingen.
            </p>
            <BulletList items={STEP_4} />
          </section>

          <section className="mt-10">
            <h2 className="text-nbg-blue text-2xl font-bold mb-4">Stap 5 — Bij oversluiten</h2>
            <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
              Wilt u uw hypotheek oversluiten? Dan zijn er bovenop de standaarddocumenten extra stukken nodig.
            </p>
            <BulletList items={STEP_5} />
          </section>

          <section className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <h2 className="text-nbg-blue text-2xl font-bold mb-5">Veelgemaakte fouten bij een hypotheekaanvraag</h2>
            <div className="space-y-5">
              {COMMON_MISTAKES.map((mistake) => (
                <div key={mistake.title}>
                  <h3 className="text-nbg-blue text-lg font-semibold m-0 mb-1">{mistake.title}</h3>
                  <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">{mistake.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-nbg-blue text-2xl font-bold mb-4">Maximale hypotheek — waar hangt het van af?</h2>
            <div className="space-y-4 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p className="m-0">
                De maximale hypotheek hangt vooral af van twee onderdelen: uw toetsinkomen en de marktwaarde
                van de woning.
              </p>
              <p className="m-0">
                <strong className="text-nbg-blue">1. Uw inkomen (toetsinkomen)</strong>
                <br />
                Geldverstrekkers berekenen op basis van uw bruto jaarinkomen welk maandbedrag verantwoord is.
                Bij twee inkomens telt het hoogste inkomen volledig mee en een deel van het tweede inkomen.
              </p>
              <p className="m-0">
                <strong className="text-nbg-blue">2. De waarde van de woning</strong>
                <br />
                In de basis mag u maximaal 100% van de marktwaarde lenen, bepaald via taxatie. Kosten voor
                inrichting of andere extra uitgaven betaalt u doorgaans uit eigen middelen.
              </p>
              <p className="m-0">
                <strong className="text-nbg-blue">Nationale Hypotheek Garantie (NHG)</strong>
                <br />
                Voor woningen tot een bepaalde grens kunt u mogelijk in aanmerking komen voor NHG. Dit kan
                rentevoordeel geven en extra zekerheid bieden. Controleer altijd de actuele NHG-grens.
              </p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-nbg-blue text-2xl font-bold mb-4">Tijdlijn — hoe lang duurt een hypotheekaanvraag?</h2>
            <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
              Een hypotheektraject duurt in de praktijk vaak ongeveer 4 tot 8 weken vanaf het eerste gesprek
              tot akkoord van de geldverstrekker. Met een volledig dossier kan het sneller gaan, terwijl
              complexere aanvragen of piekdrukte bij banken juist extra tijd vragen.
            </p>

            <div className="overflow-x-auto rounded-xl border border-nbg-light-gray/60">
              <table className="w-full border-collapse">
                <thead className="bg-nbg-lighter-green/60">
                  <tr>
                    <th className="text-left text-nbg-blue font-semibold text-[15px] px-4 py-3">Stap</th>
                    <th className="text-left text-nbg-blue font-semibold text-[15px] px-4 py-3">Gemiddelde doorlooptijd</th>
                  </tr>
                </thead>
                <tbody>
                  {TIMELINE_ROWS.map(([step, duration]) => (
                    <tr key={step} className="border-t border-nbg-light-gray/50">
                      <td className="px-4 py-3 text-nbg-blue/85 text-[15px]">{step}</td>
                      <td className="px-4 py-3 text-nbg-blue/85 text-[15px]">{duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5">
              <h3 className="text-nbg-blue text-xl font-semibold mb-3">Factoren die de snelheid beinvloeden</h3>
              <BulletList
                items={[
                  "Compleetheid van het dossier: ontbrekende stukken veroorzaken vrijwel altijd vertraging.",
                  "Drukte bij de geldverstrekker: in piekperiodes kunnen wachttijden oplopen.",
                  "Type aanvraag: bijvoorbeeld startersconstructies of verbouwingen kunnen meer afstemming vragen.",
                ]}
              />
            </div>
          </section>

          <section className="mt-10 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8">
            <h2 className="text-nbg-blue text-2xl font-bold mb-5">Checklist samenvatting — alles op een rij</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-nbg-blue text-lg font-semibold mb-3">Persoonlijk</h3>
                <CheckList items={SUMMARY_PERSONAL} />
              </div>
              <div>
                <h3 className="text-nbg-blue text-lg font-semibold mb-3">Inkomen</h3>
                <CheckList items={SUMMARY_INCOME} />
              </div>
              <div>
                <h3 className="text-nbg-blue text-lg font-semibold mb-3">Woning</h3>
                <CheckList items={SUMMARY_HOUSE} />
              </div>
              <div>
                <h3 className="text-nbg-blue text-lg font-semibold mb-3">Financiele situatie</h3>
                <CheckList items={SUMMARY_FINANCIAL} />
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-nbg-blue text-lg font-semibold mb-3">Bij oversluiten</h3>
              <CheckList items={SUMMARY_REFINANCE} />
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-nbg-blue text-2xl font-bold mb-6">Veelgestelde vragen over hypotheken</h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-xl border border-nbg-light-gray/60 bg-white px-5 py-4"
                >
                  <summary className="cursor-pointer list-none text-nbg-blue font-semibold text-[17px] flex items-center justify-between gap-3">
                    {item.question}
                    <span className="text-nbg-green transition-transform group-open:rotate-180" aria-hidden>
                      ▼
                    </span>
                  </summary>
                  <p className="mt-3 mb-0 text-nbg-blue/85 text-[16px] leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
            <h2 className="text-white text-2xl font-bold m-0 mb-2">Neem contact op met Haruna</h2>
            <p className="text-white/90 text-[17px] leading-relaxed m-0 mb-5">
              Een hypotheek aanvragen begint met een goed gesprek. Bij Haruna bespreken we uw situatie, uw
              mogelijkheden en wat er nodig is voor uw aanvraag — zonder verplichtingen.
            </p>
            <div className="space-y-2 mb-6">
              <p className="m-0 text-white/95 text-[17px]">
                <a href="tel:0786849331" className="hover:underline">
                  078 684 93 31
                </a>
              </p>
              <p className="m-0 text-white/95 text-[17px]">
                <a href="mailto:contact@haruna.nl" className="hover:underline">
                  contact@haruna.nl
                </a>
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors w-full sm:w-auto"
            >
              Plan een gesprek
            </Link>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
