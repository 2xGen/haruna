import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticleCard from "../ArticleCard";
import ArticleFaqAccordion from "../ArticleFaqAccordion";
import {
  type Pillar,
  isValidPillar,
  PILLAR_CONFIG,
  getArticlesForPillarPaginated,
  ARCHIVE_PER_PAGE,
  ARTICLES,
} from "../articles-data";

const SAMENWONEN_FAQS = [
  {
    question: "Moet u getrouwd zijn om samen een huis te kopen?",
    answer:
      "Nee, u hoeft niet getrouwd te zijn om samen een woning te kopen. Veel stellen kopen samen een huis terwijl zij samenwonen zonder huwelijk of geregistreerd partnerschap. Het is wel belangrijk om goed vast te leggen wie welk deel van de woning bezit en hoe de hypotheek wordt betaald.",
  },
  {
    question: "Is een samenlevingscontract verplicht?",
    answer:
      "Een samenlevingscontract is niet verplicht, maar wel vaak verstandig. In een samenlevingscontract kunt u afspraken vastleggen over bijvoorbeeld de verdeling van kosten, bezittingen en wat er gebeurt met de woning als u uit elkaar gaat of als u of uw partner overlijdt.",
  },
  {
    question: "Erft uw partner automatisch als u samenwoont?",
    answer:
      "Nee, wanneer u samenwoont zonder huwelijk of geregistreerd partnerschap erft uw partner niet automatisch. Als u wilt dat uw partner erfgenaam wordt, moet u dit laten vastleggen in een testament bij de notaris.",
  },
  {
    question: "Hebben samenwonende partners recht op elkaars pensioen?",
    answer:
      "Niet automatisch. Voor veel pensioenregelingen moet u uw partner eerst officieel aanmelden om recht te hebben op een nabestaandenpensioen. Het is daarom verstandig om dit te controleren bij uw pensioenuitvoerder.",
  },
  {
    question: "Wanneer bent u fiscaal partner als u samenwoont?",
    answer:
      "U bent niet automatisch fiscaal partner wanneer u samenwoont. In sommige situaties kan dit wel het geval zijn, bijvoorbeeld wanneer u samen een woning bezit of een notarieel samenlevingscontract heeft. De exacte voorwaarden worden bepaald door de Belastingdienst.",
  },
];

const ANNUITAIR_LINEAIR_FAQS = [
  {
    question: "Wat is het verschil tussen een annuïteitenhypotheek en een lineaire hypotheek?",
    answer:
      "Bij een annuïteitenhypotheek betaalt u een vast maandbedrag dat bestaat uit rente en aflossing. Bij een lineaire hypotheek lost u iedere maand een vast bedrag af, waardoor de maandlasten gedurende de looptijd dalen.",
  },
  {
    question: "Welke hypotheekvorm heeft lagere maandlasten?",
    answer:
      "Een annuïteitenhypotheek heeft meestal lagere maandlasten aan het begin van de looptijd. Bij een lineaire hypotheek liggen de maandlasten in de eerste jaren vaak hoger.",
  },
  {
    question: "Welke hypotheek is goedkoper over de hele looptijd?",
    answer:
      "Bij een lineaire hypotheek betaalt u doorgaans minder totale rente, omdat de hypotheekschuld sneller daalt.",
  },
  {
    question: "Kan ik later van hypotheekvorm veranderen?",
    answer:
      "In sommige situaties is het mogelijk om uw hypotheek aan te passen of over te sluiten. Dit hangt af van uw hypotheekverstrekker en uw financiële situatie.",
  },
  {
    question: "Is een annuïteitenhypotheek geschikt voor starters?",
    answer:
      "Veel starters kiezen voor een annuïteitenhypotheek omdat de maandlasten aan het begin vaak lager liggen. Welke hypotheek het beste past, hangt echter altijd af van de persoonlijke situatie.",
  },
];

const ZAKELIJKE_VERZEKERINGEN_FAQS = [
  {
    question: "Welke verzekeringen zijn verplicht voor ondernemers?",
    answer:
      "Voor veel ondernemers zijn er geen algemene verzekeringsplichten. In sommige sectoren of beroepen kan een specifieke verzekering wel verplicht zijn, bijvoorbeeld een beroepsaansprakelijkheidsverzekering.",
  },
  {
    question: "Heb ik als zzp'er ook zakelijke verzekeringen nodig?",
    answer:
      "Ook voor zelfstandigen zonder personeel kunnen bepaalde verzekeringen relevant zijn. Denk bijvoorbeeld aan aansprakelijkheid of arbeidsongeschiktheid. Welke verzekeringen passend zijn, hangt af van de werkzaamheden en risico's.",
  },
  {
    question: "Wat is het verschil tussen een bedrijfsaansprakelijkheidsverzekering en een beroepsaansprakelijkheidsverzekering?",
    answer:
      "Een bedrijfsaansprakelijkheidsverzekering richt zich meestal op schade aan personen of spullen van anderen. Een beroepsaansprakelijkheidsverzekering kan betrekking hebben op financiële schade door fouten in advies of dienstverlening.",
  },
  {
    question: "Kan ik meerdere zakelijke verzekeringen combineren?",
    answer:
      "In sommige gevallen bieden verzekeraars pakketten waarbij meerdere zakelijke verzekeringen worden gecombineerd. Of dit passend is, hangt af van de situatie van de ondernemer.",
  },
  {
    question: "Hoe bepaal ik welke verzekeringen mijn onderneming nodig heeft?",
    answer:
      "Een goede eerste stap is het in kaart brengen van de risico's binnen uw onderneming. Op basis daarvan kan worden bekeken welke verzekeringen mogelijk relevant zijn.",
  },
];

const HUIS_KOPEN_56_FAQS = [
  {
    question: "Kan ik als 56-plusser nog een hypotheek krijgen?",
    answer:
      "Ja, dat is vaak mogelijk. Geldverstrekkers kijken naar uw inkomen, pensioen en financiële situatie. Ook de waarde van uw woning en eventuele overwaarde kunnen een rol spelen.",
  },
  {
    question: "Wordt mijn pensioeninkomen meegenomen bij een hypotheekaanvraag?",
    answer:
      "Ja. Wanneer u dichter bij de pensioenleeftijd komt, kijken geldverstrekkers vaak naar het verwachte pensioeninkomen bij het bepalen van de maximale hypotheek.",
  },
  {
    question: "Kan ik mijn overwaarde gebruiken zonder te verhuizen?",
    answer:
      "In sommige gevallen is dat mogelijk. Afhankelijk van uw situatie kunt u de hypotheek aanpassen of een nieuwe hypotheek afsluiten om een deel van de overwaarde te benutten.",
  },
  {
    question: "Is verhuizen op latere leeftijd nog mogelijk met een hypotheek?",
    answer:
      "Ja, dat kan. Vooral wanneer de nieuwe woning lagere woonlasten heeft, kan een hypotheekaanvraag vaak nog steeds mogelijk zijn.",
  },
  {
    question: "Is persoonlijk hypotheekadvies verstandig voor 56-plussers?",
    answer:
      "Ja. Omdat inkomen, pensioen en vermogen een rol spelen, is persoonlijk advies vaak belangrijk om alle mogelijkheden goed in kaart te brengen.",
  },
];

const VERZEKERINGEN_BIJ_HYPOTHEEK_FAQS = [
  {
    question: "Is een overlijdensrisicoverzekering verplicht bij een hypotheek?",
    answer:
      "Dat is niet altijd het geval. In sommige situaties kan een geldverstrekker een overlijdensrisicoverzekering verplicht stellen, bijvoorbeeld wanneer de hypotheek relatief hoog is ten opzichte van de waarde van de woning.",
  },
  {
    question: "Wat is het doel van een overlijdensrisicoverzekering bij een hypotheek?",
    answer:
      "Een overlijdensrisicoverzekering kan financiële zekerheid bieden wanneer een van de partners overlijdt. Het uitgekeerde bedrag kan bijvoorbeeld worden gebruikt om een deel van de hypotheek af te lossen.",
  },
  {
    question: "Bestaan spaarverzekeringen bij hypotheken nog?",
    answer:
      "Bij nieuwe hypotheken komen spaarverzekeringen minder vaak voor vanwege veranderingen in fiscale regelgeving. Wel bestaan er nog veel bestaande hypotheken waarbij een spaarverzekering is gekoppeld.",
  },
  {
    question: "Wat is het verschil tussen een spaarverzekering en een beleggingsverzekering?",
    answer:
      "Bij een spaarverzekering wordt vermogen opgebouwd tegen een vooraf bepaalde structuur. Bij een beleggingsverzekering wordt premie (gedeeltelijk) belegd, waardoor de uiteindelijke waarde kan fluctueren.",
  },
  {
    question: "Is het verstandig om mijn hypotheekverzekering te laten controleren?",
    answer:
      "Sommige mensen kiezen ervoor om hun hypotheek en bijbehorende verzekeringen periodiek te laten bekijken. Zo kan worden vastgesteld of deze nog aansluiten bij de huidige financiële situatie.",
  },
];

const PARTICULIERE_VERZEKERINGEN_FAQS = [
  {
    question: "Welke verzekering is verplicht voor mijn woning?",
    answer:
      "Een opstalverzekering is verplicht wanneer u een hypotheek heeft. Voor andere verzekeringen geldt dit niet, maar ze kunnen wel verstandig zijn.",
  },
  {
    question: "Wat is het verschil tussen een opstal- en inboedelverzekering?",
    answer:
      "Een opstalverzekering dekt schade aan de woning zelf, terwijl een inboedelverzekering schade aan uw spullen in huis dekt.",
  },
  {
    question: "Is een aansprakelijkheidsverzekering echt nodig?",
    answer:
      "Hoewel niet verplicht, kan een aansprakelijkheidsverzekering grote financiële gevolgen voorkomen bij schade aan derden of hun spullen.",
  },
  {
    question: "Kan ik mijn auto en woning in één pakket verzekeren?",
    answer:
      "Veel verzekeraars bieden gecombineerde pakketten aan, bijvoorbeeld woonhuis + inboedel + aansprakelijkheid of autoverzekering, vaak met korting op de premie.",
  },
  {
    question: "Hoe bepaal ik welke dekking voor mij passend is?",
    answer:
      "Uw persoonlijke situatie, bezittingen, gezinssamenstelling en dagelijkse activiteiten zijn bepalend. Bij Haruna kijken we graag met u mee naar uw situatie en brengen we samen de risico's en passende verzekeringen in kaart.",
  },
];

const PENSIOEN_UITSTELLEN_FAQS = [
  {
    question: "Kan ik mijn pensioen altijd uitstellen?",
    answer:
      "Ja, in veel gevallen kan dit, maar er gelden voorwaarden afhankelijk van uw pensioenregeling en leeftijd.",
  },
  {
    question: "Wordt mijn maandelijkse uitkering hoger bij uitstel?",
    answer:
      "Doorgaans wel. Door later te starten, wordt de uitkering over een kortere periode verdeeld.",
  },
  {
    question: "Heeft uitstel gevolgen voor mijn AOW?",
    answer:
      "De AOW-leeftijd blijft gelijk, maar het totale inkomen kan anders belast worden afhankelijk van uw uitgestelde pensioen.",
  },
  {
    question: "Is uitstellen fiscaal voordelig?",
    answer:
      "Dat hangt af van uw inkomen, pensioenproducten en persoonlijke situatie. Bij Haruna kunnen we dit samen met u doorrekenen.",
  },
  {
    question: "Moet ik ook mijn partner informeren bij uitstel?",
    answer:
      "Ja, uitstel kan gevolgen hebben voor nabestaandenpensioen en toeslagen.",
  },
];

const PENSIOEN_VOOR_WERKGEVERS_EN_WERKNEMERS_FAQS = [
  {
    question: "Is een pensioenregeling verplicht voor mijn bedrijf?",
    answer:
      "Dat hangt af van de cao en sector. Veel werkgevers bieden vrijwillig een regeling aan, maar sommige cao's schrijven een collectieve pensioenregeling voor.",
  },
  {
    question: "Wat is het verschil tussen een uitkeringsovereenkomst en een premieovereenkomst?",
    answer:
      "Bij een uitkeringsovereenkomst is de uitkering vooraf vastgesteld; bij een premieovereenkomst is de premie vast en hangt de uiteindelijke uitkering af van beleggingsresultaten.",
  },
  {
    question: "Hoe kan ik mijn werknemers goed informeren over hun pensioen?",
    answer:
      "Via jaaroverzichten, informatiebijeenkomsten, digitale portals en persoonlijke uitleg door HR of een adviseur.",
  },
  {
    question: "Kan ik pensioenbeheer uitbesteden?",
    answer:
      "Ja, veel werkgevers schakelen een pensioenadviseur of administratiekantoor in voor administratie, naleving van wetgeving en rapportages.",
  },
  {
    question: "Welke fiscale voordelen biedt een collectieve pensioenregeling?",
    answer:
      "Premies zijn vaak fiscaal aftrekbaar voor werkgevers en belastingvrij voor werknemers tot bepaalde grenzen, afhankelijk van de regeling en actuele wetgeving.",
  },
];

const PENSIOEN_ALS_ONDERNEMER_DGA_FAQS = [
  {
    question: "Kan ik als DGA eigen beheer combineren met een verzekerde regeling?",
    answer:
      "Ja, dat kan. Het vergt echter een zorgvuldig fiscaal-juridisch plan om risico's te beperken.",
  },
  {
    question: "Hoe bepaal ik hoeveel pensioen ik als DGA kan opbouwen?",
    answer:
      "Dit hangt af van uw salaris, winst van de bv, fiscale maxima en de gekozen pensioenregeling.",
  },
  {
    question: "Zijn pensioenpremies aftrekbaar voor mijn bv?",
    answer:
      "Ja, maar er gelden specifieke fiscale regels en maxima waar u rekening mee moet houden.",
  },
  {
    question: "Wat zijn de risico's van pensioen in eigen beheer?",
    answer:
      "Risico's zijn onder andere fiscale wijzigingen, liquiditeitsproblemen in de bv en beperkingen bij overdracht van de onderneming.",
  },
  {
    question: "Is het verstandig om een adviseur in te schakelen?",
    answer:
      "Ja, pensioen voor DGA's is complex. Bij Haruna kijken we graag met u mee. Als onafhankelijk adviseur helpen we u inzicht te krijgen in uw opties en risico's, zodat u een goed onderbouwde keuze kunt maken.",
  },
];

const CHEVRON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512">
    <path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" />
  </svg>
);

function Pagination({
  slug,
  currentPage,
  totalPages,
}: {
  slug: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const base = `/nieuws/${slug}`;
  const prev =
    currentPage > 1
      ? currentPage === 2
        ? base
        : `${base}?page=${currentPage - 1}`
      : null;
  const next =
    currentPage < totalPages ? `${base}?page=${currentPage + 1}` : null;

  return (
    <nav
      className="flex flex-wrap justify-center items-center gap-2 mt-12 pt-8 border-t border-nbg-light-gray"
      aria-label="Paginering"
    >
      {prev ? (
        <Link
          href={prev}
          className="inline-flex items-center gap-1 rounded-lg border border-nbg-light-gray bg-white px-4 py-2 text-nbg-blue font-medium text-[15px] hover:bg-nbg-lighter-green/50 transition-colors"
        >
          <span className="rotate-180 inline-block">{CHEVRON}</span>
          Vorige
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-lg border border-nbg-light-gray/50 bg-nbg-light-gray/30 px-4 py-2 text-nbg-blue/50 text-[15px] cursor-not-allowed">
          Vorige
        </span>
      )}

      <span className="px-4 py-2 text-nbg-blue/80 text-[15px]">
        Pagina {currentPage} van {totalPages}
      </span>

      {next ? (
        <Link
          href={next}
          className="inline-flex items-center gap-1 rounded-lg border border-nbg-light-gray bg-white px-4 py-2 text-nbg-blue font-medium text-[15px] hover:bg-nbg-lighter-green/50 transition-colors"
        >
          Volgende
          {CHEVRON}
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-lg border border-nbg-light-gray/50 bg-nbg-light-gray/30 px-4 py-2 text-nbg-blue/50 text-[15px] cursor-not-allowed">
          Volgende
        </span>
      )}
    </nav>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (isValidPillar(slug)) {
    const config = PILLAR_CONFIG[slug as Pillar];
    return {
      title: `Nieuws – ${config.label} | Haruna Hypotheek- en pensioenadvies`,
      description: `Artikelen en gidsen over ${config.label.toLowerCase()}. ${config.description}`,
    };
  }
  if (slug === "samenwonen-wat-moet-u-regelen") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Samenwonen: wat moet u regelen?"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Gaat u samenwonen of woont u al samen? Lees wat u financieel en juridisch moet regelen rond hypotheek, vermogen en elkaar.",
    };
  }
  if (slug === "huis-kopen-56-plusser") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Een huis kopen als 56-plusser"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Hypotheekmogelijkheden voor 56-plussers. Lees over pensioeninkomen, overwaarde en verhuizen op latere leeftijd.",
    };
  }
  if (slug === "annuitair-vs-lineair-aflossen") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Annuïtair vs. lineair aflossen"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Het verschil tussen annuïtair en lineair aflossen. Welke hypotheekvorm past bij uw situatie? Voor- en nadelen op een rij.",
    };
  }
  if (slug === "welke-verzekeringen-heeft-uw-onderneming-nodig") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Welke verzekeringen heeft uw onderneming nodig?"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Als ondernemer wilt u uw bedrijf goed beschermen. Lees welke risico's er spelen en welke verzekeringen daarbij passen.",
    };
  }
  if (slug === "verzekeringen-bij-uw-hypotheek") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Verzekeringen bij uw hypotheek"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Spaar-, risico- en overlijdensverzekering. Welke verzekeringen horen bij een hypotheek en wat past bij u?",
    };
  }
  if (slug === "wat-kunt-u-als-particulier-verzekeren") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Wat kunt u als particulier verzekeren?"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Van opstal en inboedel tot aansprakelijkheid, auto en reizen. Welke particuliere verzekeringen passen bij u?",
    };
  }
  if (slug === "pensioen-uitstellen") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Pensioen uitstellen: wat zijn de gevolgen?"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Overweegt u om later met pensioen te gaan? Dit kan financieel en persoonlijk voordelen bieden, maar er zijn ook aandachtspunten.",
    };
  }
  if (slug === "pensioen-voor-werkgevers-en-werknemers") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Pensioen voor werkgevers en werknemers"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Collectieve regelingen, communicatie en beheer. Wij helpen u de pensioenvoorziening goed in te richten.",
    };
  }
  if (slug === "pensioen-als-ondernemer-dga") {
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      title: `${article?.title ?? "Pensioen als ondernemer (DGA)"} | Haruna Hypotheek- en pensioenadvies`,
      description:
        article?.description ??
        "Eigen beheer, verzekerde regelingen of fiscaal-juridische vraagstukken. Advies op maat voor directeuren-grootaandeelhouders.",
    };
  }
  return { title: "Nieuws | Haruna Hypotheek- en pensioenadvies" };
}

export default async function NieuwsSlugPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;

  // Pillar archive: /nieuws/hypotheken, /nieuws/verzekeringen, /nieuws/pensioen
  if (isValidPillar(slug)) {
    const pillar = slug as Pillar;
    const config = PILLAR_CONFIG[pillar];
    const page = Math.max(1, parseInt(String(pageParam || "1"), 10) || 1);
    const { articles, total, totalPages } = getArticlesForPillarPaginated(
      pillar,
      page,
      ARCHIVE_PER_PAGE
    );
    const currentPage = Math.min(page, totalPages);

    return (
      <>
        <Header />

        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10">
            <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">
                  Nieuws
                </Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">{config.label}</span>
              </nav>
              <h1 className="text-nbg-blue text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight m-0">
                {config.label} – alle artikelen
              </h1>
              <p className="mt-2 text-nbg-blue/80 text-[17px] m-0">
                {total} {total === 1 ? "artikel" : "artikelen"}
              </p>
            </div>
          </section>

          <section className="py-10 lg:py-14 bg-white">
            <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
              {articles.length === 0 ? (
                <p className="text-nbg-blue/80 text-[17px] m-0">
                  Er staan nog geen artikelen in deze categorie.{" "}
                  <Link href="/nieuws" className="text-nbg-green font-medium hover:underline">
                    Terug naar nieuws
                  </Link>
                </p>
              ) : (
                <>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0 items-stretch">
                    {articles.map((article) => (
                      <li key={article.slug} className="flex">
                        <ArticleCard article={article} />
                      </li>
                    ))}
                  </ul>
                  <Pagination
                    slug={slug}
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                </>
              )}
            </div>
          </section>

          <section className="py-8 bg-nbg-lighter-green">
            <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
              <Link
                href="/nieuws"
                className="inline-flex items-center gap-2 text-nbg-green font-semibold hover:underline"
              >
                ← Alle onderwerpen
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  // Article page: /nieuws/<article-slug>
  if (slug === "samenwonen-wat-moet-u-regelen") {
    const article = ARTICLES.find((a) => a.slug === slug);

    const listItem = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const samenwonenFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: SAMENWONEN_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(samenwonenFaqSchema) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          {/* Hero */}
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Samenwonen: wat moet u regelen?</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Hypotheken</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Samenwonen: wat moet u regelen?
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-[15px] text-nbg-blue/70">
                {article?.date && <time>{article.date}</time>}
                <span className="w-1.5 h-1.5 rounded-full bg-nbg-light-gray" aria-hidden />
                <span>Samenwonen & hypotheek</span>
              </div>
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                In dit artikel leest u wat u moet regelen wanneer u gaat samenwonen, vooral als u samen een huis wilt kopen of een hypotheek heeft.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Samenwonend stel dat financiële zaken bespreekt"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                Gaat u binnenkort samenwonen of woont u al samen? Dan is het verstandig om een aantal financiële en juridische zaken goed te regelen. Samenwonen heeft namelijk gevolgen voor uw hypotheek, vermogen en uw rechten ten opzichte van elkaar.
              </p>
              <p>
                Veel stellen denken dat samenwonen automatisch dezelfde rechten geeft als trouwen of een geregistreerd partnerschap. In de praktijk is dat vaak niet zo.
              </p>
            </div>

            {/* Callout */}
            <div className="mt-8 rounded-xl border-l-4 border-nbg-primary bg-nbg-lighter-green/50 py-4 px-5">
              <p className="text-nbg-blue text-[17px] font-medium m-0">
                Zonder afspraken op papier blijven u en uw partner voor de wet namelijk twee afzonderlijke personen.
              </p>
            </div>

            <p className="mt-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              In dit artikel leggen we uit wat belangrijk is om te regelen wanneer u gaat samenwonen. De informatie is gebaseerd op de regelgeving zoals die geldt in maart 2026. Wet- en regelgeving kan veranderen; laat u daarom goed en actueel informeren door een adviseur of notaris. Bij Haruna kijken we graag met u mee naar uw situatie.
            </p>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-nbg-primary text-nbg-primary font-medium text-[14px] px-4 py-2 hover:bg-nbg-primary hover:text-white transition-colors"
            >
              Afspraak maken
            </Link>

            {/* In het kort – key points card */}
            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Samenwonen en uw financiële situatie
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Een samenlevingscontract
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Samen een huis kopen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Erfenis, pensioen en nabestaandenvoorzieningen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Fiscaal partnerschap
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Trouwen of geregistreerd partnerschap
                </li>
              </ul>
            </div>

            {/* Section block – card */}
            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Samenwonen en uw financiële situatie</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Wanneer u samenwoont, deelt u meestal de kosten van het huishouden. Denk aan:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem("hypotheek of huur")}
                {listItem("energiekosten")}
                {listItem("lokale belastingen")}
                {listItem("verzekeringen")}
                {listItem("boodschappen en andere vaste lasten")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Toch verandert er juridisch niets zolang u niets officieel vastlegt. Dat betekent dat er volgens de wet geen gezamenlijke bezittingen of gezamenlijke financiële verplichtingen zijn, tenzij u dit zelf laat vastleggen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Daarom kiezen veel stellen ervoor om afspraken te maken in een samenlevingscontract.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Een samenlevingscontract: duidelijke afspraken</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een samenlevingscontract is een overeenkomst die u bij een notaris laat opstellen. Hierin kunt u belangrijke afspraken vastleggen, zoals:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem("hoe u de kosten van het huishouden verdeelt")}
                {listItem("wie eigenaar is van welke bezittingen")}
                {listItem("wat er gebeurt met de woning als u of uw partner overlijdt")}
                {listItem("hoe spaargeld of investeringen worden verdeeld bij beëindiging van de relatie")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Een samenlevingscontract is niet verplicht, maar kan veel onduidelijkheid en discussies voorkomen. Vooral wanneer u samen een huis koopt of grote financiële verplichtingen aangaat, is het verstandig om dit goed te regelen met een notaris.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Samen een huis kopen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                U hoeft niet getrouwd te zijn om samen een huis te kopen. Veel stellen kopen samen een woning terwijl zij alleen samenwonen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">Belangrijke punten om vast te leggen zijn onder andere:</p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem("wie welk deel van de woning bezit (eigendomsverhouding)")}
                {listItem("hoe de hypotheek en maandlasten worden betaald")}
                {listItem("wat er gebeurt als u uit elkaar gaat")}
                {listItem("wat er gebeurt bij overlijden van één van de partners")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                De eigendomsverhouding legt u vast bij de notaris in de akte van levering. Aanvullende afspraken kunt u opnemen in een samenlevingscontract of andere overeenkomst. Een goede afstemming tussen hypotheekadviseur en notaris is hierbij belangrijk.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Erfenis, pensioen en nabestaandenvoorzieningen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Als u samenwoont zonder huwelijk of geregistreerd partnerschap, erft uw partner niet automatisch van u. Zonder testament gaat een nalatenschap meestal naar familieleden, zoals ouders, broers of zussen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Wilt u dat uw partner uw erfgenaam wordt? Dan moet u dat via een testament laten vastleggen bij de notaris. Die kan ook adviseren over eventuele risico&apos;s en fiscale gevolgen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Ook voor pensioen geldt dat samenwonende partners niet automatisch recht hebben op een nabestaandenpensioen. Vaak moet u uw partner eerst officieel aanmelden bij de pensioenuitvoerder. Controleer daarom:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem("of er sprake is van nabestaandenpensioen")}
                {listItem("of uw partner aangemeld moet worden")}
                {listItem("welke voorwaarden de pensioenregeling stelt aan samenwonen")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Fiscaal partnerschap</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Wanneer u niets vastlegt, bent u niet automatisch fiscaal partner. Daardoor kunt u bepaalde fiscale voordelen niet benutten, zoals het verdelen van aftrekposten in de aangifte inkomstenbelasting.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                In sommige situaties kunt u wel fiscaal partner worden, bijvoorbeeld als u samen een woning bezit of een notarieel samenlevingscontract hebt. De exacte voorwaarden worden bepaald door de Belastingdienst.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Ook kunt u in sommige gevallen toeslagpartner zijn, bijvoorbeeld voor huurtoeslag of zorgtoeslag. Het is belangrijk om goed te kijken welke regels voor u gelden en of wijzigingen in uw situatie doorgegeven moeten worden.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Trouwen of geregistreerd partnerschap</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Naast samenwonen met een samenlevingscontract kunt u ook kiezen voor een huwelijk of geregistreerd partnerschap. De regels zijn in grote lijnen vergelijkbaar, maar er zijn verschillen in bijvoorbeeld beëindiging en sommige juridische gevolgen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Sinds 2018 geldt standaard beperkte gemeenschap van goederen. Dat betekent dat alleen het vermogen dat tijdens het huwelijk wordt opgebouwd gezamenlijk is. Vermogen dat u al had vóór het huwelijk blijft van uzelf, tenzij u samen andere afspraken maakt (bijvoorbeeld in huwelijkse voorwaarden).
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Welke vorm het beste past, hangt af van uw wensen en situatie. Een notaris kan u helpen de verschillen helder in beeld te krijgen.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Wat is voor u de beste keuze?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Welke samenlevingsvorm het beste bij u past, hangt af van uw persoonlijke situatie. Denk bijvoorbeeld aan:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem("of u een gezamenlijke woning heeft of wilt kopen")}
                {listItem("of er kinderen zijn of een kinderwens is")}
                {listItem("hoe uw pensioen en eventuele nabestaandenvoorzieningen geregeld zijn")}
                {listItem("hoe u vermogen en erfenissen wilt verdelen")}
                {listItem("welke fiscale voordelen of gevolgen er zijn")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Door vooraf goed na te denken over deze onderwerpen voorkomt u later veel onduidelijkheid. Het geeft rust als u weet dat zaken rondom uw woning, vermogen en toekomst goed geregeld zijn.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Persoonlijk advies bij samenwonen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Gaat u samenwonen en wilt u weten wat u het beste kunt regelen rond uw hypotheek en bredere financiële situatie? Tijdens een vrijblijvend gesprek kijken we samen naar uw plannen en brengen we de gevolgen voor uw maandlasten, risico&apos;s en toekomst in beeld.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Haruna is onafhankelijk adviseur en denkt met u mee welke oplossing past bij uw situatie. Voor juridische documenten, zoals een testament of samenlevingscontract, werken wij graag samen met uw notaris of kunnen wij u desgewenst doorverwijzen.
              </p>
            </section>

            {/* CTA block – prominent card */}
            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Samenwonen en uw hypotheek goed geregeld?</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Wilt u weten wat samenwonen betekent voor uw hypotheek, maandlasten en financiële situatie? Plan een vrijblijvend videogesprek – dan kijken we samen wat bij u past.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Afspraak maken
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            {/* FAQ – accordion */}
            <section className="mt-12" aria-labelledby="samenwonen-faq-heading">
              <h2 id="samenwonen-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over samenwonen
              </h2>
              <ArticleFaqAccordion items={SAMENWONEN_FAQS} />
            </section>

            {/* Related link card */}
            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over hypotheken</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Bereken uw maximale hypotheek, vergelijk rentestanden en plan een vrijblijvend gesprek.
              </p>
              <Link href="/hypotheken" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar hypotheken
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <p className="mt-8 text-nbg-blue/60 text-[13px]">
              Dit artikel is bedoeld als algemene informatie en vervangt geen persoonlijk advies. Voor juridische of fiscale vragen adviseren wij u een notaris of fiscalist te raadplegen.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
            >
              Afspraak maken
            </Link>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Een huis kopen als 56-plusser
  if (slug === "huis-kopen-56-plusser") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItem56 = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const huisKopen56FaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: HUIS_KOPEN_56_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(huisKopen56FaqSchema) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Een huis kopen als 56-plusser</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Hypotheken</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Een huis kopen als 56-plusser
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-[15px] text-nbg-blue/70">
                {article?.date && <time>{article.date}</time>}
                <span className="w-1.5 h-1.5 rounded-full bg-nbg-light-gray" aria-hidden />
                <span>Senioren en hypotheek</span>
              </div>
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                In dit artikel leest u hoe hypotheekverstrekkers omgaan met hypotheekaanvragen van 56-plussers en welke mogelijkheden er zijn wanneer u op latere leeftijd een woning wilt kopen of verhuizen.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="56-plusser die nadenkt over een nieuwe woning of hypotheek"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                Wilt u op latere leeftijd verhuizen of een nieuwe woning kopen? Dan kan het lastiger lijken om een hypotheek te krijgen. Toch zijn er de afgelopen jaren steeds meer mogelijkheden gekomen voor huiseigenaren van 56 jaar en ouder.
              </p>
              <p>
                Geldverstrekkers kijken namelijk niet alleen meer naar het inkomen van nu, maar ook naar de toekomstige financiële situatie en de werkelijke woonlasten. Hierdoor kunnen senioren in sommige gevallen toch meer lenen dan zij denken.
              </p>
              <p>
                De informatie in dit artikel is gebaseerd op de regelgeving en marktpraktijk zoals die geldt in 2026. Voor uw persoonlijke situatie kunnen andere voorwaarden gelden. Bij Haruna adviseren wij u graag onafhankelijk en deskundig over uw situatie, zodat u de beste keuzes kunt maken.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-nbg-primary text-nbg-primary font-medium text-[14px] px-4 py-2 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Afspraak maken
              </Link>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Waarom een hypotheek voor 56-plussers soms lastiger is
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Pensioeninkomen en maximale hypotheek
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Kijken naar werkelijke woonlasten
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Overwaarde gebruiken
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Verhuizen op latere leeftijd
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Waarom een hypotheek voor 56-plussers soms lastiger is</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Wanneer u een hypotheek aanvraagt, kijkt een geldverstrekker vooral naar uw inkomen. Dit inkomen bepaalt hoeveel u maximaal kunt lenen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bent u 56 jaar of ouder? Dan kijken hypotheekverstrekkers vaak ook naar uw toekomstige pensioeninkomen. Dat inkomen ligt in veel gevallen lager dan het inkomen tijdens uw werkzame leven.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Daardoor kan de maximale hypotheek soms lager uitvallen, zelfs wanneer uw huidige woonlasten goed betaalbaar zijn.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Pensioeninkomen en maximale hypotheek</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij het berekenen van een hypotheek wordt meestal rekening gehouden met:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem56("uw huidige inkomen")}
                {listItem56("uw verwachte pensioeninkomen")}
                {listItem56("uw leeftijd en de resterende looptijd van de hypotheek")}
                {listItem56("eventuele bestaande schulden")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Omdat pensioeninkomen vaak lager is dan het huidige salaris, kan dit invloed hebben op het bedrag dat u kunt lenen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Toch betekent dit niet automatisch dat een hypotheek niet mogelijk is. Geldverstrekkers kijken steeds vaker naar de totale financiële situatie van de aanvrager.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Kijken naar werkelijke woonlasten</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                In sommige situaties kijken geldverstrekkers niet alleen naar het inkomen, maar ook naar de werkelijke woonlasten. Dat betekent bijvoorbeeld dat wordt gekeken naar:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem56("de huidige hypotheeklasten")}
                {listItem56("uw maandelijkse uitgaven")}
                {listItem56("uw spaargeld of vermogen")}
                {listItem56("de waarde van uw woning")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Wanneer uw woonlasten ook na pensionering goed betaalbaar blijven, kan dit positief meewegen bij een hypotheekaanvraag.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Overwaarde gebruiken</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Veel huiseigenaren die al langer in hun woning wonen, hebben te maken met overwaarde. Dit betekent dat de woning meer waard is geworden dan de resterende hypotheek.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Deze overwaarde kan soms worden gebruikt om:
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Dit kan bijvoorbeeld interessant zijn wanneer u uw woning wilt aanpassen of extra financiële ruimte wilt creëren.
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem56("de woning te verbouwen of aan te passen")}
                {listItem56("extra financiële ruimte te creëren")}
                {listItem56("een deel van het vermogen vrij te maken")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                In sommige gevallen kan dit via een nieuwe hypotheek of een aanpassing van de bestaande hypotheek.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Verhuizen op latere leeftijd</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Sommige mensen kiezen ervoor om op latere leeftijd te verhuizen naar een woning die beter past bij hun situatie. Denk bijvoorbeeld aan:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem56("een gelijkvloerse woning")}
                {listItem56("een kleinere woning met lagere lasten")}
                {listItem56("een woning dichter bij voorzieningen of familie")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Omdat de woonlasten in zo&apos;n situatie soms lager zijn, kan een hypotheek alsnog mogelijk zijn.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Wat zijn uw hypotheekmogelijkheden als 56-plusser?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Iedere situatie is anders. Factoren zoals inkomen, pensioen, vermogen en de waarde van uw woning spelen allemaal een rol bij het bepalen van uw mogelijkheden.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij Haruna kijken we graag met u mee om inzicht te krijgen in:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItem56("hoeveel u maximaal kunt lenen")}
                {listItem56("wat uw maandlasten worden")}
                {listItem56("of u overwaarde kunt gebruiken")}
                {listItem56("welke hypotheekvorm het beste bij u past")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Persoonlijk advies voor 56-plussers</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bent u 56 jaar of ouder en denkt u na over een nieuwe woning of het aanpassen van uw hypotheek? Dan kan het verstandig zijn om uw mogelijkheden goed in kaart te brengen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Tijdens een vrijblijvend gesprek bekijken we samen uw situatie en bespreken we welke oplossingen passen bij uw wensen en toekomstplannen. Haruna helpt u graag met duidelijk en onafhankelijk advies.
              </p>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Hypotheekmogelijkheden bekijken?</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Wilt u weten wat u kunt lenen of welke mogelijkheden er zijn met uw huidige woning en eventuele overwaarde? Plan een vrijblijvend videogesprek en wij denken met u mee.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Afspraak maken
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="faq-56-heading">
              <h2 id="faq-56-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over een hypotheek voor 56-plussers
              </h2>
              <ArticleFaqAccordion items={HUIS_KOPEN_56_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over hypotheken</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Bereken uw maximale hypotheek, vergelijk rentestanden en plan een vrijblijvend gesprek.
              </p>
              <Link href="/hypotheken" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar hypotheken
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <p className="mt-8 text-nbg-blue/60 text-[13px]">
              Dit artikel is bedoeld als algemene informatie en vervangt geen persoonlijk advies. Voor uw situatie kunnen andere voorwaarden gelden. Bij Haruna kijken we graag met u mee naar uw situatie.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
            >
              Afspraak maken
            </Link>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Annuïtair vs. lineair aflossen
  if (slug === "annuitair-vs-lineair-aflossen") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemAL = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const annuitairLineairFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: ANNUITAIR_LINEAIR_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(annuitairLineairFaqSchema) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Annuïtair vs. lineair aflossen</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Hypotheken</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Annuïtair of lineair: welke hypotheek past bij u?
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-[15px] text-nbg-blue/70">
                {article?.date && <time>{article.date}</time>}
                <span className="w-1.5 h-1.5 rounded-full bg-nbg-light-gray" aria-hidden />
                <span>Annuïtair vs. lineair aflossen</span>
              </div>
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                In dit artikel leggen we uit hoe annuïtair en lineair aflossen werken en welke hypotheekvorm het beste bij uw situatie past.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Het verschil tussen annuïtair en lineair aflossen"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                Wanneer u een hypotheek afsluit, krijgt u vrijwel altijd de keuze tussen verschillende aflosvormen. De twee meest voorkomende hypotheekvormen in Nederland zijn de annuïteitenhypotheek en de lineaire hypotheek.
              </p>
              <p>
                Maar wat is precies het verschil? En welke vorm past het beste bij uw financiële situatie?
              </p>
              <p>
                In dit artikel leggen we uit hoe beide hypotheekvormen werken, wat de belangrijkste verschillen zijn en waar u op moet letten bij het maken van een keuze.
              </p>
              <p>
                De informatie in dit artikel is gebaseerd op de regelgeving en marktpraktijk zoals die geldt in 2026. Voor uw persoonlijke situatie kunnen andere voorwaarden gelden. Bij Haruna adviseren wij u graag onafhankelijk en deskundig over uw situatie, zodat u de beste keuzes kunt maken.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-nbg-primary text-nbg-primary font-medium text-[14px] px-4 py-2 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Afspraak maken
              </Link>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Wat is een annuïteitenhypotheek
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Wat is een lineaire hypotheek
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Het verschil tussen annuïtair en lineair aflossen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Voor- en nadelen van beide hypotheekvormen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Welke hypotheek past bij uw situatie
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Wat is een annuïteitenhypotheek?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij een annuïteitenhypotheek betaalt u elke maand een vast bruto maandbedrag. Dit bedrag bestaat uit twee onderdelen:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemAL("rente")}
                {listItemAL("aflossing")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                In het begin van de looptijd bestaat het grootste deel van de maandlast uit rente. Naarmate de hypotheek loopt, verandert dit: u gaat steeds meer aflossen en minder rente betalen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Het totale bruto maandbedrag blijft gedurende de rentevaste periode meestal ongeveer gelijk, waardoor deze hypotheekvorm vaak als overzichtelijk wordt ervaren.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Wat is een lineaire hypotheek?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij een lineaire hypotheek lost u iedere maand een vast bedrag van de hypotheekschuld af.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Omdat de hypotheekschuld elke maand lager wordt, betaalt u ook steeds minder rente. Daardoor dalen uw maandlasten gedurende de looptijd van de hypotheek.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                De maandlasten zijn aan het begin van de looptijd meestal hoger dan bij een annuïteitenhypotheek, maar nemen daarna geleidelijk af.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Het verschil tussen annuïtair en lineair aflossen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Het verschil tussen een annuïteitenhypotheek en een lineaire hypotheek zit vooral in de manier waarop u aflost en hoe uw maandlasten zich gedurende de looptijd ontwikkelen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Het grootste verschil tussen beide hypotheekvormen zit in de ontwikkeling van de maandlasten.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 mb-4">
                <div className="rounded-xl border border-nbg-light-gray/50 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <h4 className="text-nbg-blue font-semibold text-base m-0 mb-2">Annuïteitenhypotheek</h4>
                  <ul className="space-y-1.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Maandlast blijft in het begin ongeveer gelijk
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      In het begin betaalt u meer rente
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Aflossing neemt later toe
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl border border-nbg-light-gray/50 bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <h4 className="text-nbg-blue font-semibold text-base m-0 mb-2">Lineaire hypotheek</h4>
                  <ul className="space-y-1.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Hogere maandlasten aan het begin
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      Maandlasten dalen gedurende de looptijd
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                      U lost sneller af op de hypotheekschuld
                    </li>
                  </ul>
                </div>
              </div>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Door deze verschillen kan de ene hypotheekvorm beter aansluiten bij uw financiële situatie dan de andere.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Voor- en nadelen van een annuïteitenhypotheek</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium">Voordelen:</p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemAL("Vaak lagere maandlasten aan het begin")}
                {listItemAL("Overzichtelijke maandlasten")}
                {listItemAL("Populaire hypotheekvorm voor starters")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium">Aandachtspunten:</p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemAL("U lost in het begin langzamer af")}
                {listItemAL("U betaalt over de totale looptijd meestal meer rente dan bij een lineaire hypotheek")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Voor- en nadelen van een lineaire hypotheek</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium">Voordelen:</p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemAL("U lost sneller af op uw hypotheek")}
                {listItemAL("Totale rentelasten zijn vaak lager")}
                {listItemAL("Maandlasten dalen na verloop van tijd")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-3 font-medium">Aandachtspunten:</p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemAL("Hogere maandlasten aan het begin")}
                {listItemAL("Niet altijd passend wanneer het budget in de eerste jaren beperkt is")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Hypotheekrenteaftrek en aflossen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Voor nieuwe hypotheken geldt dat u in Nederland alleen recht heeft op hypotheekrenteaftrek wanneer de hypotheek in maximaal 30 jaar volledig wordt afgelost. Daarom zijn de annuïteitenhypotheek en lineaire hypotheek tegenwoordig de meest gebruikte hypotheekvormen voor nieuwe leningen.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Welke hypotheek past bij uw situatie?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Welke hypotheekvorm het beste bij u past, hangt onder andere af van:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemAL("uw inkomen en financiële ruimte")}
                {listItemAL("uw toekomstplannen")}
                {listItemAL("uw leeftijd")}
                {listItemAL("hoeveel zekerheid u wilt in uw maandlasten")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Wanneer u bijvoorbeeld lagere maandlasten aan het begin belangrijk vindt, kan een annuïteitenhypotheek aantrekkelijk zijn. Wilt u juist sneller aflossen en lagere totale rentelasten, dan kan een lineaire hypotheek beter passen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Bij Haruna kijken we graag met u mee om de verschillen in kaart te brengen en te berekenen wat de maandlasten in uw situatie zouden zijn.
              </p>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Hypotheekvorm kiezen?</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Twijfelt u tussen een annuïteitenhypotheek en een lineaire hypotheek? Of wilt u weten welke maandlasten passen bij uw situatie? Tijdens een vrijblijvend gesprek bekijken we samen uw mogelijkheden en leggen we duidelijk uit welke hypotheekvorm het beste aansluit bij uw financiële situatie en toekomstplannen.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Afspraak maken
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="annuitair-lineair-faq-heading">
              <h2 id="annuitair-lineair-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over annuïtair en lineair aflossen
              </h2>
              <ArticleFaqAccordion items={ANNUITAIR_LINEAIR_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over hypotheken</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Bereken uw maximale hypotheek, vergelijk rentestanden en plan een vrijblijvend gesprek.
              </p>
              <Link href="/hypotheken" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar hypotheken
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <p className="mt-8 text-nbg-blue/60 text-[13px]">
              Dit artikel is bedoeld als algemene informatie en vervangt geen persoonlijk advies. Voor uw situatie kunnen andere voorwaarden gelden. Bij Haruna kijken we graag met u mee naar uw situatie.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
            >
              Afspraak maken
            </Link>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Welke verzekeringen heeft uw onderneming nodig?
  if (slug === "welke-verzekeringen-heeft-uw-onderneming-nodig") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemV = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const zakelijkeVerzekeringenFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: ZAKELIJKE_VERZEKERINGEN_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(zakelijkeVerzekeringenFaqSchema) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Welke verzekeringen heeft uw onderneming nodig?</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Verzekeringen</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Belangrijke verzekeringen voor ondernemers
              </h1>
              {article?.date && (
                <div className="text-[15px] text-nbg-blue/70">
                  <time>{article.date}</time>
                </div>
              )}
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                In dit artikel leest u welke risico&apos;s ondernemers vaak tegenkomen en welke verzekeringen daarbij kunnen passen.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Welke verzekeringen heeft uw onderneming nodig?"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                Als ondernemer neemt u dagelijks beslissingen over uw bedrijf. Daarbij hoort ook het nadenken over risico&apos;s. Denk bijvoorbeeld aan schade, aansprakelijkheid of het tijdelijk wegvallen van inkomsten. Met de juiste zakelijke verzekeringen kunt u bepaalde financiële risico&apos;s voor uw onderneming beperken.
              </p>
              <p>
                Welke verzekeringen voor u relevant zijn, hangt af van uw onderneming, de sector waarin u actief bent en uw persoonlijke situatie. In dit artikel leest u welke risico&apos;s ondernemers vaak tegenkomen en welke soorten verzekeringen daarbij kunnen passen.
              </p>
              <p>
                De informatie in dit artikel is gebaseerd op de regelgeving en marktpraktijk zoals die geldt in 2026. Voor uw persoonlijke situatie kunnen andere voorwaarden gelden. Bij Haruna adviseren wij u graag onafhankelijk en deskundig over uw verzekeringen en financiële situatie, zodat u de beste keuzes kunt maken voor uzelf en uw gezin.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-nbg-primary text-nbg-primary font-medium text-[14px] px-4 py-2 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Afspraak maken
              </Link>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Waarom verzekeringen voor ondernemers belangrijk kunnen zijn
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Veelvoorkomende risico&apos;s voor ondernemingen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Veelvoorkomende verzekeringen voor ondernemers
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Wanneer bepaalde verzekeringen relevant kunnen zijn
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Hoe u bepaalt welke verzekeringen bij uw onderneming passen
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Waarom verzekeringen voor ondernemers belangrijk kunnen zijn</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Ondernemen brengt kansen met zich mee, maar ook risico&apos;s. Sommige risico&apos;s zijn klein en goed zelf op te vangen, terwijl andere gebeurtenissen grote financiële gevolgen kunnen hebben. Denk bijvoorbeeld aan:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemV("schade aan uw bedrijfspand of inventaris")}
                {listItemV("aansprakelijkheid voor schade bij derden")}
                {listItemV("ziekte of arbeidsongeschiktheid")}
                {listItemV("cyberincidenten of datalekken")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Met een passende verzekering kunnen ondernemers zich beschermen tegen financiële gevolgen van bepaalde gebeurtenissen. Het is daarbij belangrijk om goed te kijken welke risico&apos;s voor uw onderneming relevant zijn.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Veelvoorkomende risico&apos;s voor ondernemingen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Elke onderneming heeft te maken met verschillende soorten risico&apos;s. Welke risico&apos;s het meest relevant zijn, hangt onder andere af van:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemV("de branche waarin u actief bent")}
                {listItemV("het aantal medewerkers")}
                {listItemV("het type werkzaamheden")}
                {listItemV("het gebruik van bedrijfsmiddelen")}
                {listItemV("de afhankelijkheid van digitale systemen")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Een ondernemer met personeel heeft bijvoorbeeld andere risico&apos;s dan een zelfstandig ondernemer zonder personeel. Door deze risico&apos;s in kaart te brengen, kan duidelijk worden welke verzekeringen mogelijk passend zijn.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Veelvoorkomende verzekeringen voor ondernemers</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-6">
                Er zijn verschillende verzekeringen die ondernemers kunnen overwegen. Hieronder staan enkele voorbeelden van verzekeringen die vaak voorkomen bij bedrijven.
              </p>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Bedrijfsaansprakelijkheidsverzekering</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-6">
                Een bedrijfsaansprakelijkheidsverzekering (AVB) kan dekking bieden wanneer uw onderneming aansprakelijk wordt gesteld voor schade aan personen of spullen van anderen tijdens de werkzaamheden. Dit type verzekering komt veel voor bij zowel zelfstandigen als bedrijven met personeel.
              </p>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Beroepsaansprakelijkheidsverzekering</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-6">
                Een beroepsaansprakelijkheidsverzekering kan relevant zijn voor ondernemers die advies geven of specialistische diensten leveren. Wanneer een fout in advies of dienstverlening leidt tot financiële schade bij een klant, kan deze verzekering in sommige gevallen dekking bieden.
              </p>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Bedrijfsschadeverzekering</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-6">
                Een bedrijfsschadeverzekering kan helpen wanneer uw bedrijf tijdelijk stil komt te liggen door bijvoorbeeld brand of andere schade. De verzekering kan in bepaalde situaties bijdragen aan het opvangen van gemiste inkomsten gedurende de periode dat het bedrijf niet volledig kan draaien.
              </p>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Arbeidsongeschiktheidsverzekering voor ondernemers</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-6">
                Voor veel zelfstandigen kan een arbeidsongeschiktheidsverzekering (AOV) een manier zijn om inkomen te beschermen wanneer zij door ziekte of een ongeval tijdelijk of langdurig niet kunnen werken. Omdat ondernemers meestal geen recht hebben op een werknemersverzekering, kan het belangrijk zijn om na te denken over deze risico&apos;s.
              </p>

              <h3 className="text-nbg-blue text-lg font-semibold mb-2">Cyberverzekering</h3>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Steeds meer ondernemingen werken digitaal en slaan gegevens online op. Daardoor kunnen cyberrisico&apos;s een rol spelen. Een cyberverzekering kan in bepaalde situaties ondersteuning bieden bij schade door cyberincidenten, zoals datalekken of digitale aanvallen.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Welke verzekeringen passen bij uw onderneming?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Welke verzekeringen relevant zijn voor uw onderneming, hangt af van verschillende factoren, zoals:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemV("de aard van uw werkzaamheden")}
                {listItemV("het type klanten dat u bedient")}
                {listItemV("het aantal medewerkers")}
                {listItemV("uw financiële buffer")}
                {listItemV("de risico&apos;s die u zelf kunt of wilt dragen")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Niet iedere ondernemer heeft dezelfde verzekeringen nodig. Het kan daarom verstandig zijn om eerst uw bedrijfsrisico&apos;s in kaart te brengen. Op basis daarvan kan worden bekeken welke verzekeringen mogelijk passend zijn.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Uw bedrijfsrisico&apos;s in kaart brengen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Veel ondernemers kiezen ervoor om periodiek te kijken naar hun verzekeringen en risico&apos;s. Naarmate een onderneming groeit of verandert, kunnen ook de risico&apos;s veranderen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Door regelmatig te evalueren welke risico&apos;s spelen binnen uw onderneming, kunt u bepalen of uw verzekeringen nog aansluiten bij uw situatie. Bij Haruna kijken we graag met u mee om uw risico&apos;s inzichtelijk te maken en verschillende verzekeringsmogelijkheden te bespreken.
              </p>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Inzicht in uw zakelijke verzekeringen</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Wilt u weten welke risico&apos;s er spelen binnen uw onderneming en welke verzekeringen daarbij mogelijk passen? Tijdens een vrijblijvend gesprek bekijken we samen uw situatie en bespreken we welke aandachtspunten relevant kunnen zijn voor uw bedrijf.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Afspraak maken
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="zakelijke-verzekeringen-faq-heading">
              <h2 id="zakelijke-verzekeringen-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over verzekeringen voor ondernemers
              </h2>
              <ArticleFaqAccordion items={ZAKELIJKE_VERZEKERINGEN_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over verzekeringen</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Zakelijk, particulier en verzekeringen bij uw hypotheek.
              </p>
              <Link href="/verzekeringen" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar verzekeringen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <p className="mt-8 text-nbg-blue/60 text-[13px]">
              Dit artikel is bedoeld als algemene informatie en vervangt geen persoonlijk advies. Voor uw situatie kunnen andere voorwaarden gelden. Bij Haruna kijken we graag met u mee naar uw situatie.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
            >
              Afspraak maken
            </Link>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Verzekeringen bij uw hypotheek
  if (slug === "verzekeringen-bij-uw-hypotheek") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemHyp = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const verzekeringenHypotheekFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: VERZEKERINGEN_BIJ_HYPOTHEEK_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(verzekeringenHypotheekFaqSchema) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Verzekeringen bij uw hypotheek</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Verzekeringen</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Spaar-, risico- en overlijdensverzekeringen bij een hypotheek
              </h1>
              {article?.date && (
                <div className="text-[15px] text-nbg-blue/70">
                  <time>{article.date}</time>
                </div>
              )}
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                In dit artikel leest u welke verzekeringen bij een hypotheek horen – van overlijdensrisico tot spaar- en beleggingsverzekering – en wat bij u past.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Verzekeringen bij uw hypotheek"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                Wanneer u een hypotheek afsluit, komt u vaak ook verschillende soorten verzekeringen tegen. Sommige verzekeringen waren vroeger standaard gekoppeld aan een hypotheek, terwijl andere bedoeld zijn om bepaalde financiële risico&apos;s af te dekken.
              </p>
              <p>
                Denk bijvoorbeeld aan een overlijdensrisicoverzekering, een spaarverzekering of een verzekering die bedoeld is om nabestaanden financieel te beschermen.
              </p>
              <p>
                Welke verzekeringen relevant zijn bij een hypotheek, hangt af van uw persoonlijke situatie, de hypotheekvorm en de voorwaarden van de geldverstrekker.
              </p>
              <p>
                In dit artikel leggen we uit welke verzekeringen vaak voorkomen bij een hypotheek en wanneer deze een rol kunnen spelen.
              </p>
              <p>
                De informatie in dit artikel is gebaseerd op de regelgeving en marktpraktijk zoals die geldt in 2026. Voor uw persoonlijke situatie kunnen andere voorwaarden gelden. Bij Haruna adviseren wij u graag onafhankelijk en deskundig over uw situatie, zodat u de beste keuzes kunt maken.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-nbg-primary text-nbg-primary font-medium text-[14px] px-4 py-2 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Afspraak maken
              </Link>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Waarom verzekeringen een rol kunnen spelen bij een hypotheek
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Overlijdensrisicoverzekering bij een hypotheek
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Spaar- en beleggingsverzekeringen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Wanneer een verzekering verplicht kan zijn
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Welke verzekering bij uw situatie kan passen
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Waarom verzekeringen een rol kunnen spelen bij een hypotheek</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een hypotheek is voor veel mensen de grootste financiële verplichting die zij aangaan. Daarom kan het belangrijk zijn om na te denken over situaties waarin het betalen van de hypotheeklasten moeilijker wordt.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Denk bijvoorbeeld aan:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemHyp("overlijden van een partner")}
                {listItemHyp("langdurige arbeidsongeschiktheid")}
                {listItemHyp("veranderingen in inkomen")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Sommige verzekeringen zijn bedoeld om financiële risico&apos;s in zulke situaties te beperken. Andere verzekeringen waren vooral gekoppeld aan oudere hypotheekvormen. Het is daarom goed om te begrijpen welke verzekeringen mogelijk een rol spelen bij uw hypotheek.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Overlijdensrisicoverzekering bij een hypotheek</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een overlijdensrisicoverzekering is een verzekering die een bedrag uitkeert wanneer de verzekerde overlijdt binnen de looptijd van de verzekering.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Dit bedrag kan bijvoorbeeld worden gebruikt om:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemHyp("een deel van de hypotheek af te lossen")}
                {listItemHyp("de maandlasten voor de achterblijvende partner te verlagen")}
                {listItemHyp("financiële zekerheid te bieden voor het gezin")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                In sommige situaties kan een geldverstrekker een overlijdensrisicoverzekering verplicht stellen, bijvoorbeeld wanneer de hypotheek relatief hoog is ten opzichte van de waarde van de woning.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Spaarverzekering bij een hypotheek</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Bij oudere hypotheekvormen kwam vaak een spaarverzekering voor. Hierbij werd gedurende de looptijd van de hypotheek vermogen opgebouwd binnen een verzekering.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Dit opgebouwde bedrag kon aan het einde van de looptijd worden gebruikt om (een deel van) de hypotheek af te lossen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Deze constructie werd vaak gebruikt bij:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemHyp("spaarhypotheken")}
                {listItemHyp("beleggingshypotheken")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Sinds veranderingen in de fiscale regels worden deze hypotheekvormen bij nieuwe hypotheken minder vaak afgesloten, maar veel bestaande hypotheken hebben nog steeds een gekoppelde verzekering.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Beleggingsverzekering bij een hypotheek</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Sommige hypotheken zijn gekoppeld aan een beleggingsverzekering. Hierbij wordt premie ingelegd die (gedeeltelijk) wordt belegd met als doel vermogen op te bouwen voor het aflossen van de hypotheek.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Omdat beleggingen kunnen schommelen in waarde, kan het uiteindelijke kapitaal hoger of lager uitvallen dan verwacht.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Voor mensen met een bestaande beleggingsverzekering kan het daarom verstandig zijn om regelmatig te bekijken hoe de verzekering zich ontwikkelt en of deze nog past bij de financiële situatie.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Wanneer kan een verzekering verplicht zijn?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Niet alle verzekeringen bij een hypotheek zijn verplicht. In sommige gevallen kan een geldverstrekker echter wel bepaalde voorwaarden stellen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een overlijdensrisicoverzekering kan bijvoorbeeld gevraagd worden wanneer:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemHyp("de hypotheek hoog is ten opzichte van de woningwaarde")}
                {listItemHyp("er sprake is van een gezamenlijke hypotheek")}
                {listItemHyp("de financiële risico&apos;s voor de geldverstrekker groter zijn")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Of een verzekering verplicht is, hangt af van de voorwaarden van de geldverstrekker en de specifieke situatie.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Welke verzekering past bij uw situatie?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Welke verzekeringen relevant zijn bij een hypotheek, hangt af van verschillende factoren, zoals:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemHyp("uw inkomen en financiële buffer")}
                {listItemHyp("of u een partner of gezin heeft")}
                {listItemHyp("de hoogte van de hypotheek")}
                {listItemHyp("de hypotheekvorm")}
                {listItemHyp("uw toekomstplannen")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Niet iedere situatie vraagt om dezelfde oplossing. Daarom kan het verstandig zijn om goed te bekijken welke risico&apos;s voor u een rol spelen en hoe u daarmee wilt omgaan.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Bij Haruna kijken we graag met u mee om inzicht te krijgen in de verschillende mogelijkheden.
              </p>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Inzicht in verzekeringen bij uw hypotheek</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Wilt u weten welke verzekeringen een rol spelen bij uw hypotheek of welke risico&apos;s relevant zijn voor uw situatie? Tijdens een vrijblijvend gesprek bekijken we samen uw situatie en leggen we uit welke verzekeringen vaak voorkomen bij hypotheken en waar u op kunt letten.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Afspraak maken
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="verzekeringen-hypotheek-faq-heading">
              <h2 id="verzekeringen-hypotheek-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over verzekeringen bij een hypotheek
              </h2>
              <ArticleFaqAccordion items={VERZEKERINGEN_BIJ_HYPOTHEEK_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over verzekeringen</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Zakelijk, particulier en verzekeringen bij uw hypotheek.
              </p>
              <Link href="/verzekeringen" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar verzekeringen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <p className="mt-8 text-nbg-blue/60 text-[13px]">
              Dit artikel is bedoeld als algemene informatie en vervangt geen persoonlijk advies. Voor uw situatie kunnen andere voorwaarden gelden. Bij Haruna kijken we graag met u mee naar uw situatie.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
            >
              Afspraak maken
            </Link>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Wat kunt u als particulier verzekeren?
  if (slug === "wat-kunt-u-als-particulier-verzekeren") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemPart = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const particuliereVerzekeringenFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: PARTICULIERE_VERZEKERINGEN_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(particuliereVerzekeringenFaqSchema) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Wat kunt u als particulier verzekeren?</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Verzekeringen</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Wat kunt u als particulier verzekeren?
              </h1>
              {article?.date && (
                <div className="text-[15px] text-nbg-blue/70">
                  <time>{article.date}</time>
                </div>
              )}
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                In dit artikel leest u welke particuliere verzekeringen vaak voorkomen – van opstal en inboedel tot aansprakelijkheid, auto en reizen – en waar u op kunt letten bij het kiezen van dekking.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Wat kunt u als particulier verzekeren?"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                Als particulier kunt u zich op verschillende manieren verzekeren om financiële risico&apos;s te beperken. Denk aan schade door brand, diefstal of waterschade, maar ook aan aansprakelijkheid of schade tijdens het reizen.
              </p>
              <p>
                Welke verzekeringen u nodig heeft, hangt af van uw persoonlijke situatie, uw woonomgeving en uw bezittingen. In dit artikel leggen we uit welke verzekeringen vaak voorkomen en waar u op kunt letten bij het kiezen van dekking.
              </p>
              <p>
                De informatie in dit artikel is gebaseerd op de regelgeving en marktpraktijk zoals die geldt in 2026. Voor uw persoonlijke situatie kunnen andere voorwaarden gelden. Bij Haruna adviseren wij u graag onafhankelijk en deskundig over uw situatie, zodat u de beste keuzes kunt maken.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-nbg-primary text-nbg-primary font-medium text-[14px] px-4 py-2 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Afspraak maken
              </Link>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Waarom particuliere verzekeringen belangrijk kunnen zijn
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Woonhuisverzekering (opstal)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Inboedelverzekering
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Aansprakelijkheidsverzekering
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Auto- en reisverzekeringen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Hoe u bepaalt welke verzekeringen passen bij uw situatie
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Waarom particuliere verzekeringen belangrijk kunnen zijn</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Schade kan onverwacht optreden, bijvoorbeeld door:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemPart("brand, storm of waterschade")}
                {listItemPart("diefstal of vandalisme")}
                {listItemPart("schade aan anderen of hun spullen")}
                {listItemPart("ongelukken tijdens het reizen of onderweg")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Met passende verzekeringen kunt u de financiële gevolgen van dergelijke gebeurtenissen beperken. Het is daarbij belangrijk om te kijken naar uw persoonlijke situatie en risico&apos;s die u zelf kunt dragen.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Woonhuisverzekering (opstalverzekering)</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een opstalverzekering dekt schade aan uw woning door bijvoorbeeld brand, storm, blikseminslag of water. Een opstalverzekering is verplicht wanneer u een hypotheek heeft. Ook als u uw woning volledig zelf bezit, kan het verstandig zijn om een opstalverzekering af te sluiten om onverwachte kosten te voorkomen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Denk bij een opstalverzekering aan:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemPart("de waarde van uw woning en bijgebouwen")}
                {listItemPart("het soort dekking (standaard of allrisk)")}
                {listItemPart("eventuele aanvullende clausules voor specifieke risico&apos;s")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Bij Haruna kijken we graag met u mee om de juiste dekking te bepalen op basis van uw woning en situatie.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Inboedelverzekering</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een inboedelverzekering dekt schade aan uw persoonlijke bezittingen in huis, zoals meubels, elektronica en kleding. De verzekering kan uitkering bieden bij:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemPart("brand, diefstal of waterschade")}
                {listItemPart("schade door lekkage of kortsluiting")}
                {listItemPart("verlies van spullen door een inbraak")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Let op: de dekking kan verschillen per verzekeraar, bijvoorbeeld bij schade buiten huis of bijzondere bezittingen zoals sieraden of kunst.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Aansprakelijkheidsverzekering</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Een aansprakelijkheidsverzekering (AVP) beschermt u wanneer u schade veroorzaakt aan derden of hun spullen. Voorbeelden:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemPart("Uw kind stoot een dure vaas om bij de buren")}
                {listItemPart("U rijdt per ongeluk schade aan bij een ander in uw woning of tuin")}
                {listItemPart("Een ongeluk tijdens sport of hobby veroorzaakt schade")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Deze verzekering is vaak relatief goedkoop, maar kan grote financiële gevolgen voorkomen.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Auto- en reisverzekeringen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Veel particulieren hebben ook behoefte aan verzekeringen buiten hun woonhuis en inboedel:
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-2 font-medium">
                Autoverzekering
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Verplicht bij bezit van een auto; kan WA, WA+ (beperkt casco) of allrisk zijn.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-2 font-medium">
                Reisverzekering
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Dekt schade, diefstal of medische kosten tijdens een vakantie of zakenreis. Het kiezen van de juiste dekking hangt af van uw vervoermiddel, reisgedrag en persoonlijke wensen.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Hoe bepaalt u welke verzekeringen passen bij uw situatie?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Welke verzekeringen u nodig heeft, hangt af van:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemPart("de waarde van uw woning en bezittingen")}
                {listItemPart("uw gezinssituatie en eventuele kinderen")}
                {listItemPart("uw dagelijkse activiteiten en hobby&apos;s")}
                {listItemPart("het risico dat u zelf kunt dragen")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Niet iedereen heeft dezelfde verzekeringen nodig. Het kan daarom verstandig zijn om uw situatie goed in kaart te brengen en periodiek te bekijken of uw verzekeringen nog passen. Bij Haruna kijken we graag met u mee naar de relevante risico&apos;s en verzekeringsopties voor uw persoonlijke situatie.
              </p>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Inzicht in particuliere verzekeringen</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Wilt u weten welke verzekeringen belangrijk zijn voor uw woning, inboedel en persoonlijke bezittingen? Tijdens een vrijblijvend gesprek kijken we samen naar uw situatie en bespreken we welke verzekeringen mogelijk relevant zijn en waar u op kunt letten.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Afspraak maken
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="particuliere-verzekeringen-faq-heading">
              <h2 id="particuliere-verzekeringen-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over particuliere verzekeringen
              </h2>
              <ArticleFaqAccordion items={PARTICULIERE_VERZEKERINGEN_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over verzekeringen</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Zakelijk, particulier en verzekeringen bij uw hypotheek.
              </p>
              <Link href="/verzekeringen" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar verzekeringen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <p className="mt-8 text-nbg-blue/60 text-[13px]">
              Dit artikel is bedoeld als algemene informatie en vervangt geen persoonlijk advies. Voor uw situatie kunnen andere voorwaarden gelden. Bij Haruna kijken we graag met u mee naar uw situatie.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
            >
              Afspraak maken
            </Link>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Pensioen uitstellen: wat zijn de gevolgen?
  if (slug === "pensioen-uitstellen") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemPen = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const pensioenUitstellenFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: PENSIOEN_UITSTELLEN_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pensioenUitstellenFaqSchema) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Pensioen uitstellen: wat zijn de gevolgen?</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Pensioen</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Pensioen uitstellen: wat u moet weten
              </h1>
              {article?.date && (
                <div className="text-[15px] text-nbg-blue/70">
                  <time>{article.date}</time>
                </div>
              )}
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Overweegt u later met pensioen te gaan? We leggen uit wat de gevolgen zijn en waar u op moet letten.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Pensioen uitstellen: wat zijn de gevolgen?"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                De informatie in dit artikel is gebaseerd op de regelgeving en marktpraktijk zoals die geldt in maart 2026. Voor uw persoonlijke situatie kunnen andere voorwaarden gelden. Bij Haruna adviseren wij u graag onafhankelijk en deskundig over uw pensioen- en financiële situatie, zodat u de beste keuzes kunt maken voor uzelf en uw organisatie.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-nbg-primary text-nbg-primary font-medium text-[14px] px-4 py-2 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Afspraak maken
              </Link>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Waarom pensioen uitstellen?
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Financiële gevolgen van later pensioen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Pensioenopbouw bij uitstel
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Fiscale gevolgen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Wat u kunt overwegen voordat u besluit uit te stellen
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Waarom pensioen uitstellen?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Er zijn verschillende redenen waarom mensen kiezen hun pensioen uit te stellen:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemPen("Hoger pensioen: Door langer door te werken bouwt u extra pensioen op en ontvangt u vaak een hogere maandelijkse uitkering.")}
                {listItemPen("Betere financiële situatie: Later pensioen kan helpen om tekorten in de oude dag te voorkomen of om een comfortabele levensstandaard te behouden.")}
                {listItemPen("Gezondheid en werkplezier: Sommige mensen voelen zich fit genoeg om langer te werken en vinden het prettig om actief te blijven.")}
                {listItemPen("Verlaging van pensioenleeftijdrisico's: Het uitstellen kan bijdragen aan het afdekken van inflatie of langere levensverwachting.")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Financiële gevolgen van later pensioen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Wanneer u uw pensioen uitstelt, veranderen uw inkomsten en fiscale situatie. Belangrijke effecten zijn onder andere:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemPen("Hogere maandelijkse uitkering: Uw pensioenuitkering wordt berekend over een kortere periode, waardoor de maandelijkse uitbetaling hoger uitvalt.")}
                {listItemPen("Uitstel van AOW-uitkering: De AOW-leeftijd blijft hetzelfde, maar u ontvangt de AOW later, afhankelijk van de gekozen regeling.")}
                {listItemPen("Kortere uitkeringsperiode bij overlijden: Door later te starten, ontvangt u in totaal mogelijk minder lang uitkering bij vroeg overlijden.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Het is belangrijk om deze aspecten goed te overzien, zodat u een weloverwogen keuze maakt.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Pensioenopbouw bij uitstel</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Het uitstellen van pensioen kan effect hebben op zowel uw werknemerspensioen als het aanvullende pensioen:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemPen("Werkgeverspensioen: Veel regelingen verhogen de opbouwwaarde wanneer u langer doorwerkt.")}
                {listItemPen("Individuele pensioenproducten: Bij lijfrente of pensioenbeleggingen kan uitstel betekenen dat u langer premies betaalt en meer vermogen opbouwt.")}
                {listItemPen("Nabestaandenpensioen: Controleer of uitstel gevolgen heeft voor uw partnerpensioen.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Bij Haruna kijken we graag met u mee om te berekenen hoeveel uitstel financieel voordeel oplevert en welke producten het beste aansluiten bij uw situatie.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Fiscale gevolgen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Pensioenuitstel kan fiscale implicaties hebben:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemPen("Belastingdruk later: Omdat uw uitkering hoger is, kan uw inkomen in die periode hoger belast worden.")}
                {listItemPen("Mogelijke extra ruimte voor belastinguitstel: In sommige situaties kan uitstel fiscale voordelen bieden bij lijfrente of aanvullend pensioen.")}
                {listItemPen("Aanpassing toeslagen: Hoger inkomen kan invloed hebben op toeslagen zoals zorgtoeslag of huurtoeslag.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Het is verstandig om uw situatie met een adviseur te bespreken voordat u besluit uw pensioen uit te stellen; bij Haruna kijken we graag met u mee.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Wat u kunt overwegen voordat u besluit uit te stellen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Voordat u uw pensioen uitstelt, is het goed om deze vragen te overwegen:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemPen("Wat is mijn financiële situatie nu en straks?")}
                {listItemPen("Hoeveel langer wil en kan ik werken?")}
                {listItemPen("Welke pensioenproducten heb ik, en wat verandert er bij uitstel?")}
                {listItemPen("Zijn er fiscale of sociale gevolgen voor mij of mijn partner?")}
                {listItemPen("Wil ik risico's spreiden of mijn uitkering verhogen?")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Door deze punten in kaart te brengen, kunt u een beslissing nemen die past bij uw wensen en financiële situatie.
              </p>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Persoonlijk advies over pensioenuitstel</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Overweegt u uw pensioen uit te stellen en wilt u weten wat dit betekent voor uw inkomsten, fiscale situatie en toekomstige levensstandaard? Tijdens een vrijblijvend gesprek brengen we uw situatie in kaart en bespreken we welke opties bij u passen.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Afspraak maken
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="pensioen-uitstellen-faq-heading">
              <h2 id="pensioen-uitstellen-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over pensioen uitstellen
              </h2>
              <ArticleFaqAccordion items={PENSIOEN_UITSTELLEN_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over pensioen</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Pensioenadvies, werkgevers, ondernemers en pensionering.
              </p>
              <Link href="/pensioen" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar pensioen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <p className="mt-8 text-nbg-blue/60 text-[13px]">
              Dit artikel is bedoeld als algemene informatie en vervangt geen persoonlijk advies. Voor uw situatie kunnen andere voorwaarden gelden. Bij Haruna kijken we graag met u mee naar uw situatie.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
            >
              Afspraak maken
            </Link>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Pensioen als ondernemer (DGA)
  if (slug === "pensioen-als-ondernemer-dga") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemDga = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const pensioenDgaFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: PENSIOEN_ALS_ONDERNEMER_DGA_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pensioenDgaFaqSchema) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Pensioen als ondernemer (DGA)</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Pensioen</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Pensioen als ondernemer (DGA): eigen beheer, verzekerde regelingen en fiscale vraagstukken
              </h1>
              {article?.date && (
                <div className="text-[15px] text-nbg-blue/70">
                  <time>{article.date}</time>
                </div>
              )}
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Als directeur-grootaandeelhouder (DGA) heeft u specifieke mogelijkheden voor pensioenopbouw. We leggen uit hoe eigen beheer, verzekerde regelingen en fiscale aspecten werken en hoe Haruna u helpt met maatwerkadvies.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Pensioen als ondernemer (DGA)"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                De informatie in dit artikel is gebaseerd op de regelgeving en marktpraktijk zoals die geldt in maart 2026. Voor uw persoonlijke situatie kunnen andere voorwaarden gelden. Bij Haruna adviseren wij DGA&apos;s onafhankelijk en deskundig over hun pensioenstructuur, zodat u een goed onderbouwde keuze maakt voor uw toekomst en die van uw onderneming.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-nbg-primary text-nbg-primary font-medium text-[14px] px-4 py-2 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Afspraak maken
              </Link>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Pensioenopbouw als DGA
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Eigen beheer vs. verzekerde regelingen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Fiscale en juridische aandachtspunten
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Belangrijke keuzes bij pensioenplanning
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Persoonlijk advies voor uw situatie
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Pensioenopbouw als DGA</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Als DGA heeft u andere mogelijkheden dan reguliere werknemers. U kunt bijvoorbeeld pensioen opbouwen via uw eigen bv (eigen beheer), via een verzekerde regeling of door te kiezen voor een combinatie van regelingen.
              </p>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">Belangrijke punten:</p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemDga("Het pensioen is afhankelijk van uw salaris, winst en beschikbare middelen in de bv.")}
                {listItemDga("De keuze tussen eigen beheer of verzekerde regeling bepaalt zowel de flexibiliteit als de fiscale positie van uw pensioen.")}
                {listItemDga("Regelmatig bijsturen is belangrijk, omdat fiscale regels en pensioenwetgeving kunnen veranderen.")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Eigen beheer of verzekerde regelingen?</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                <strong className="text-nbg-blue">Eigen beheer:</strong>
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemDga("U bouwt pensioen op binnen de bv, vaak via een oudedagsreserve of een pensioen in eigen beheer.")}
                {listItemDga("Voordelen: maximale controle, flexibiliteit in opbouw en uitkering.")}
                {listItemDga("Let op: fiscale regels voor eigen beheer zijn complex en vereisen deskundige begeleiding.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                <strong className="text-nbg-blue">Verzekerde regeling:</strong>
              </p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemDga("Pensioen wordt afgesloten bij een verzekeraar, zoals een middelloon- of eindloonregeling.")}
                {listItemDga("Voordelen: zekerheid over uitkering, administratieve ontzorging.")}
                {listItemDga("Nadelen: minder flexibiliteit dan eigen beheer, afhankelijk van verzekeringsvoorwaarden.")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Fiscale en juridische aandachtspunten</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Pensioen als DGA kent specifieke fiscale regels:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemDga("Premies zijn vaak aftrekbaar binnen de bv, maar er gelden maxima en voorwaarden.")}
                {listItemDga("Uitkeringen worden belast in box 1 bij uw persoonlijke inkomstenbelasting.")}
                {listItemDga("Bij het combineren van eigen beheer en verzekerde regelingen is een juiste structuur cruciaal om belastingrisico's te vermijden.")}
                {listItemDga("Bij bedrijfsoverdracht of verkoop van de bv kan pensioenopbouw invloed hebben op de fiscale afrekening.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Het is daarom essentieel om:
              </p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemDga("Een fiscaal-juridisch plan op te stellen.")}
                {listItemDga("Te beoordelen welke pensioenregeling het beste past bij uw financiële situatie en toekomstplannen.")}
                {listItemDga("Periodiek te herzien, zodat uw pensioenstrategie actueel blijft.")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Belangrijke keuzes bij pensioenplanning</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Als DGA moet u nadenken over:
              </p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemDga("Hoeveel pensioen u wilt opbouwen en welk inkomen u nodig heeft na pensionering.")}
                {listItemDga("De mate van zekerheid versus flexibiliteit.")}
                {listItemDga("Samenhang met uw persoonlijke vermogen en andere financiële regelingen.")}
                {listItemDga("Eventuele nabestaandenvoorzieningen of overlijdensrisico.")}
              </ul>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Persoonlijk advies voor DGA&apos;s</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Wilt u inzicht in uw pensioenmogelijkheden als directeur-grootaandeelhouder? Haruna helpt u met een onafhankelijk advies op maat. We bekijken samen: welke pensioenregeling het beste past bij uw bv en persoonlijke situatie, mogelijkheden voor eigen beheer of verzekerde regelingen, en de fiscale en juridische implicaties van uw keuzes.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Afspraak maken
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="pensioen-dga-faq-heading">
              <h2 id="pensioen-dga-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over pensioen als DGA
              </h2>
              <ArticleFaqAccordion items={PENSIOEN_ALS_ONDERNEMER_DGA_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over pensioen</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Pensioenadvies, werkgevers, ondernemers en pensionering.
              </p>
              <Link href="/pensioen" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar pensioen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <p className="mt-8 text-nbg-blue/60 text-[13px]">
              Dit artikel is bedoeld als algemene informatie en vervangt geen persoonlijk advies. Voor uw situatie kunnen andere voorwaarden gelden. Bij Haruna kijken we graag met u mee naar uw situatie.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
            >
              Afspraak maken
            </Link>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  // Article: Pensioen voor werkgevers en werknemers
  if (slug === "pensioen-voor-werkgevers-en-werknemers") {
    const article = ARTICLES.find((a) => a.slug === slug);
    const listItemWg = (children: ReactNode) => (
      <li className="flex items-start gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-2" aria-hidden />
        <span className="text-nbg-blue/85 text-[17px] leading-relaxed">{children}</span>
      </li>
    );

    const pensioenWerkgeversFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: PENSIOEN_VOOR_WERKGEVERS_EN_WERKNEMERS_FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pensioenWerkgeversFaqSchema) }}
        />
        <Header />
        <main className="pb-24 md:pb-20">
          <section className="bg-nbg-lighter-green pt-10 lg:pt-14 pb-8 lg:pb-10 border-b border-nbg-light-gray/40">
            <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="text-[15px] text-nbg-blue/70 mb-4" aria-label="Breadcrumb">
                <Link href="/nieuws" className="hover:text-nbg-green">Nieuws</Link>
                <span className="mx-2">/</span>
                <span className="text-nbg-blue font-medium">Pensioen voor werkgevers en werknemers</span>
              </nav>
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Pensioen</p>
              <h1 className="text-nbg-blue text-3xl sm:text-4xl lg:text-[2.25rem] font-bold tracking-tight leading-tight mb-3">
                Pensioen voor werkgevers en werknemers: alles wat u moet weten
              </h1>
              {article?.date && (
                <div className="text-[15px] text-nbg-blue/70">
                  <time>{article.date}</time>
                </div>
              )}
            </div>
          </section>

          <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <div className="mb-6 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <p className="text-nbg-blue text-[17px] leading-relaxed font-medium m-0">
                Een goede pensioenvoorziening is belangrijk voor werkgever en werknemer. We leggen uit hoe collectieve regelingen, communicatie en beheer goed te regelen zijn.
              </p>
            </div>

            {article?.image && (
              <div className="mb-10 rounded-2xl overflow-hidden bg-nbg-light-gray shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50">
                <img
                  src={article.image}
                  alt="Pensioen voor werkgevers en werknemers"
                  className="w-full h-full max-h-[380px] object-cover"
                />
              </div>
            )}

            <div className="space-y-6 text-nbg-blue/85 text-[17px] leading-relaxed">
              <p>
                De informatie in dit artikel is gebaseerd op de regelgeving en marktpraktijk zoals die geldt in maart 2026. Voor uw persoonlijke situatie kunnen andere voorwaarden gelden. Bij Haruna helpen wij u graag met onafhankelijk en deskundig pensioenadvies, zodat u zeker weet dat uw regeling goed aansluit bij uw organisatie en medewerkers.
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-nbg-primary text-nbg-primary font-medium text-[14px] px-4 py-2 hover:bg-nbg-primary hover:text-white transition-colors"
              >
                Afspraak maken
              </Link>
            </div>

            <div className="mt-10 rounded-2xl bg-white border border-nbg-light-gray/60 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7">
              <h3 className="text-nbg-blue font-bold text-lg m-0 mb-4">Wat komt in dit artikel?</h3>
              <ul className="space-y-2.5 list-none p-0 m-0 text-nbg-blue/85 text-[15px]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Waarom pensioen belangrijk is voor werkgevers en werknemers
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Collectieve pensioenregelingen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Communicatie en informatievoorziening
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Beheer en administratie van pensioen
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0 mt-1.5" aria-hidden />
                  Tips voor een goed ingerichte pensioenvoorziening
                </li>
              </ul>
            </div>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Waarom pensioen belangrijk is voor werkgevers en werknemers</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Pensioen is een belangrijke arbeidsvoorwaarde en speelt een grote rol in de financiële zekerheid van werknemers na hun werkzame leven. Voor werkgevers geldt dat een goed geregeld pensioen:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemWg("Bijdraagt aan het aantrekken en behouden van talent")}
                {listItemWg("Fiscale voordelen kan bieden")}
                {listItemWg("Wettelijke verplichtingen en cao-afspraken naleeft")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Voor werknemers betekent een goed pensioen dat ze:
              </p>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemWg("Zich geen zorgen hoeven te maken over inkomen na pensionering")}
                {listItemWg("Mogelijk profiteren van collectieve voordelen, zoals lagere kosten of hogere uitkeringen")}
                {listItemWg("Inzicht hebben in hun toekomstige financiële situatie")}
              </ul>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Collectieve pensioenregelingen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Veel werkgevers kiezen voor een collectieve pensioenregeling voor hun werknemers. Dit kan via een pensioenfonds of een verzekeraar en heeft verschillende kenmerken:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemWg("Premieopbouw: Werknemers en werkgevers betalen gezamenlijk premie voor de toekomstige uitkering.")}
                {listItemWg("Risicodeling: Risico's zoals levensverwachting, beleggingsresultaten en arbeidsongeschiktheid worden collectief gedragen.")}
                {listItemWg("Soorten regelingen: Uitkeringsovereenkomst: De pensioenuitkering is vooraf vastgelegd, de premie varieert. Premieovereenkomst: De premie is vast, de uitkering hangt af van beleggingsresultaten.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Een collectieve regeling kan efficiënter en voordeliger zijn dan individuele regelingen, vooral voor kleine en middelgrote ondernemingen.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Communicatie en informatievoorziening</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Duidelijke communicatie over pensioen is cruciaal voor zowel werkgevers als werknemers:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemWg("Transparantie: Werknemers moeten weten wat hun pensioenopbouw inhoudt, hoe het wordt belegd en welke rechten ze hebben.")}
                {listItemWg("Jaarlijkse overzichten: Een pensioenoverzicht per werknemer helpt om inzicht te krijgen in opgebouwde rechten en toekomstige uitkeringen.")}
                {listItemWg("Pensioenkeuzes: Werknemers informeren over keuzes, zoals uitstel van pensioen, risicodekking en extra vrijwillige inleg.")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Een goede communicatie voorkomt misverstanden en zorgt dat werknemers weloverwogen keuzes kunnen maken.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-white border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Beheer en administratie van pensioen</h2>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed mb-4">
                Het beheer van een pensioenregeling omvat meerdere onderdelen:
              </p>
              <ul className="space-y-2 list-none p-0 m-0 mb-4">
                {listItemWg("Administratie van opbouw en premiebetalingen")}
                {listItemWg("Verwerking van wijzigingen zoals arbeidsduur, salarisaanpassingen en nieuwe medewerkers")}
                {listItemWg("Jaarlijkse rapportages en fiscale aangiftes")}
                {listItemWg("Toezicht en naleving van regelgeving")}
              </ul>
              <p className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                Werkgevers kunnen dit zelf organiseren of uitbesteden aan gespecialiseerde pensioen- of HR-dienstverleners.
              </p>
            </section>

            <section className="mt-8 rounded-2xl bg-nbg-lighter-green/40 border border-nbg-light-gray/50 p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">Tips voor een goed ingerichte pensioenvoorziening</h2>
              <ul className="space-y-2 list-none p-0 m-0">
                {listItemWg("Start tijdig: Begin met een duidelijke pensioenstrategie voor uw organisatie.")}
                {listItemWg("Betrek medewerkers: Zorg dat werknemers begrijpen wat hun rechten en keuzes zijn.")}
                {listItemWg("Controleer regelmatig: Evalueer de regeling periodiek en pas aan waar nodig.")}
                {listItemWg("Houd regelgeving bij: Pensioenregels veranderen; zorg dat u altijd compliant bent.")}
                {listItemWg("Gebruik deskundige ondersteuning: Bij Haruna kijken we graag met u mee bij selectie van producten, communicatie en beheer.")}
              </ul>
            </section>

            <section className="mt-12 rounded-2xl bg-nbg-blue text-white p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(27,49,86,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 className="text-white text-xl lg:text-2xl font-bold mb-2">Persoonlijk advies over pensioen voor werkgevers en werknemers</h2>
                  <p className="text-white/90 text-[17px] m-0">
                    Wilt u uw pensioenvoorziening goed regelen voor uw organisatie en medewerkers? Tijdens een vrijblijvend gesprek kijken we samen naar uw situatie, bespreken we mogelijke regelingen en adviseren we over communicatie, beheer en fiscale gevolgen.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.4)] shrink-0"
                >
                  Afspraak maken
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </section>

            <section className="mt-12" aria-labelledby="pensioen-werkgevers-faq-heading">
              <h2 id="pensioen-werkgevers-faq-heading" className="text-nbg-blue text-xl lg:text-2xl font-bold mb-6">
                Veelgestelde vragen over pensioen voor werkgevers en werknemers
              </h2>
              <ArticleFaqAccordion items={PENSIOEN_VOOR_WERKGEVERS_EN_WERKNEMERS_FAQS} />
            </section>

            <div className="mt-10 rounded-2xl bg-nbg-lighter-green/60 border border-nbg-light-gray/50 p-5 sm:p-6">
              <p className="text-nbg-blue font-semibold text-[15px] m-0 mb-2">Meer over pensioen</p>
              <p className="text-nbg-blue/80 text-[15px] m-0 mb-3">
                Pensioenadvies, werkgevers, ondernemers en pensionering.
              </p>
              <Link href="/pensioen" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                Naar pensioen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <p className="mt-8 text-nbg-blue/60 text-[13px]">
              Dit artikel is bedoeld als algemene informatie en vervangt geen persoonlijk advies. Voor uw situatie kunnen andere voorwaarden gelden. Bij Haruna kijken we graag met u mee naar uw situatie.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-primary hover:text-white transition-colors"
            >
              Afspraak maken
            </Link>

            <div className="mt-10 pt-6 border-t border-nbg-light-gray">
              <Link href="/nieuws" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
                <span className="rotate-180 inline-block">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
                </span>
                Terug naar nieuws
              </Link>
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-nbg-blue">Artikel</h1>
        <p className="mt-4 text-nbg-blue/80">
          Dit artikel wordt binnenkort toegevoegd.
        </p>
        <Link href="/nieuws" className="mt-6 inline-block text-nbg-green font-semibold hover:underline">
          ← Naar nieuws
        </Link>
      </main>
      <Footer />
    </>
  );
}
