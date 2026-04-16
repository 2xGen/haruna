export type Pillar = "hypotheken" | "verzekeringen" | "pensioen" | "financiering";

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string | null;
  pillar: Pillar;
  href: string;
};

export const ARTICLES: Article[] = [
  {
    slug: "aflossingsvrije-hypotheek-nieuwe-regels-2026",
    title:
      "Aflossingsvrije hypotheek — nieuwe regels vanaf mei 2026: wat betekent dit voor u?",
    description:
      "Rabobank, ABN AMRO en ASN Bank scherpen regels voor aflossingsvrije hypotheken aan per mei/juni 2026. Maximaal 30% van de woningwaarde. Wat verandert er en geldt dit voor u?",
    date: "16-04-26",
    image:
      "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Aflossingsvrije%20hypotheek.jpg",
    pillar: "hypotheken",
    href: "/nieuws/aflossingsvrije-hypotheek-nieuwe-regels-2026",
  },
  {
    slug: "samenwonen-wat-moet-u-regelen",
    title: "Samenwonen: wat moet u regelen? Checklist 2026 — hypotheek, contract en erfenis",
    description:
      "Gaat u samenwonen? Lees wat u moet regelen rond hypotheek, samenlevingscontract, erfenis en pensioen. Praktische checklist voor samenwonenden in 2026.",
    date: "26-02-26",
    image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/samen%20wonen.jpg",
    pillar: "hypotheken",
    href: "/nieuws/samenwonen-wat-moet-u-regelen",
  },
  {
    slug: "huis-kopen-56-plusser",
    title: "Hypotheek als 56-plusser 2026 — Mogelijkheden, de 57-regel en NHG-seniorenregeling",
    description:
      "Wat zijn uw hypotheekmogelijkheden als 56-plusser? De 57-regel uitgelegd, NHG-seniorenregeling, overwaarde en wat u het beste kunt doen vóór uw 57e verjaardag.",
    date: "06-03-26",
    image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/huis%20kopen.jpg",
    pillar: "hypotheken",
    href: "/nieuws/huis-kopen-56-plusser",
  },
  {
    slug: "annuitair-vs-lineair-aflossen",
    title:
      "Annuïtair of lineair aflossen 2026 — Verschil, rekenvoorbeeld en welke past bij u",
    description:
      "Wat is het verschil tussen annuïtair en lineair aflossen? Rekenvoorbeeld met concrete maandlasten, voor- en nadelen en welke hypotheekvorm past bij uw situatie.",
    date: "08-03-26",
    image:
      "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Het%20verschil%20tussen%20annuitair%20en%20lineair%20aflossen..png",
    pillar: "hypotheken",
    href: "/nieuws/annuitair-vs-lineair-aflossen",
  },
  {
    slug: "welke-verzekeringen-heeft-uw-onderneming-nodig",
    title: "Welke verzekeringen heeft uw onderneming nodig? 2026 — Gids voor ondernemers",
    description:
      "Welke zakelijke verzekeringen heeft u als ondernemer nodig? AVB, beroepsaansprakelijkheid, AOV, bedrijfsschade en cyberverzekering uitgelegd — met checklist voor ZZP en MKB.",
    date: "10-03-26",
    image:
      "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Welke%20verzekeringen%20heeft%20uw%20onderneming%20nodig.png",
    pillar: "verzekeringen",
    href: "/nieuws/welke-verzekeringen-heeft-uw-onderneming-nodig",
  },
  {
    slug: "verzekeringen-bij-uw-hypotheek",
    title: "Verzekeringen bij uw hypotheek 2026 — overlijdensverzekeringen, spaarverzekering en wat past bij u",
    description:
      "Welke verzekeringen horen bij een hypotheek? Overlijdensrisicoverzekering, spaarverzekering en beleggingsverzekering uitgelegd — wanneer verplicht en wat past bij uw situatie.",
    date: "26-02-26",
    image:
      "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Verzekeringen%20bij%20uw%20hypotheek.png",
    pillar: "verzekeringen",
    href: "/nieuws/verzekeringen-bij-uw-hypotheek",
  },
  {
    slug: "wat-kunt-u-als-particulier-verzekeren",
    title:
      "Wat kunt u als particulier verzekeren? 2026 — Opstal, inboedel, AVP en auto uitgelegd",
    description:
      "Welke particuliere verzekeringen heeft u nodig? Opstal, inboedel, aansprakelijkheid, auto en reisverzekering uitgelegd — met checklist en waar u op moet letten.",
    date: "24-02-26",
    image:
      "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Wat%20kunt%20u%20als%20particulier%20verzekeren.png",
    pillar: "verzekeringen",
    href: "/nieuws/wat-kunt-u-als-particulier-verzekeren",
  },
  {
    slug: "pensioen-uitstellen",
    title: "Pensioen uitstellen: wat zijn de gevolgen in 2026?",
    description:
      "Overweegt u later met pensioen te gaan? Lees wat uitstel betekent voor uw uitkering, uw AOW, uw fiscale situatie en uw partner. Actuele informatie voor 2026.",
    date: "04-03-26",
    image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/pensioen.jpg",
    pillar: "pensioen",
    href: "/nieuws/pensioen-uitstellen",
  },
  {
    slug: "pensioen-voor-werkgevers-en-werknemers",
    title: "Pensioen voor werkgevers en werknemers 2026 — Wet toekomst pensioenen uitgelegd",
    description:
      "Wat betekent de Wet toekomst pensioenen voor werkgevers en werknemers? Deadline 1 januari 2028, collectieve regelingen en wat u nu moet regelen. Actuele informatie 2026.",
    date: "10-02-26",
    image:
      "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Pensioen%20voor%20werkgevers%20en%20werknemers.png",
    pillar: "pensioen",
    href: "/nieuws/pensioen-voor-werkgevers-en-werknemers",
  },
  {
    slug: "pensioen-als-ondernemer-dga",
    title: "Pensioen als DGA 2026 — Mogelijkheden, ODV en lijfrente uitgelegd",
    description:
      "Als DGA regelt u uw pensioen anders dan werknemers. Pensioen in eigen beheer is afgeschaft. Wat zijn uw opties in 2026? Lijfrente, ODV en beleggen in de BV uitgelegd.",
    date: "14-02-26",
    image:
      "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Pensioen%20als%20ondernemer%20DGA.png",
    pillar: "pensioen",
    href: "/nieuws/pensioen-als-ondernemer-dga",
  },
  {
    slug: "zakelijke-financiering",
    title: "Zakelijke financiering 2026 — Mogelijkheden, voorwaarden en waar financiers naar kijken",
    description:
      "Welke zakelijke financiering past bij uw onderneming? Banklening, rekening-courant, leasing en factoring uitgelegd — met concrete voorwaarden en wat financiers beoordelen in 2026.",
    date: "12-03-26",
    image:
      "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/zakelijke%20financiering.png",
    pillar: "financiering",
    href: "/nieuws/zakelijke-financiering",
  },
  {
    slug: "particuliere-lening",
    title: "Particuliere lening 2026 — Rente, looptijd, APR en waar u op moet letten",
    description:
      "Overweegt u een persoonlijke lening of doorlopend krediet? Lees waar u op moet letten — rente, APR, looptijd, betaalbaarheid en de risico's van te veel lenen.",
    date: "14-03-26",
    image:
      "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Particuliere%20lening.png",
    pillar: "financiering",
    href: "/nieuws/particuliere-lening",
  },
  {
    slug: "bedrijfsauto-financieren-leasen",
    title: "Bedrijfsauto financieren of leasen 2026 — Bijtelling, lease en fiscale gevolgen",
    description:
      "Bedrijfsauto kopen, financieren of leasen? Actuele bijtellingspercentages 2026, verschil financial en operational lease en fiscale gevolgen voor ondernemers uitgelegd.",
    date: "16-03-26",
    image:
      "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Bedrijfsauto%20financieren%20of%20leasen.png",
    pillar: "financiering",
    href: "/nieuws/bedrijfsauto-financieren-leasen",
  },
];

export const PILLAR_CONFIG: Record<
  Pillar,
  { label: string; href: string; description: string }
> = {
  hypotheken: {
    label: "Hypotheken",
    href: "/hypotheken",
    description: "Gidsen en artikelen over hypotheek, maximale lening en rente.",
  },
  verzekeringen: {
    label: "Verzekeringen",
    href: "/verzekeringen",
    description: "Zakelijk, particulier en verzekeringen bij uw hypotheek.",
  },
  pensioen: {
    label: "Pensioen",
    href: "/pensioen",
    description: "Pensioenadvies, werkgevers, ondernemers en pensionering.",
  },
  financiering: {
    label: "Financiering",
    href: "/nieuws/financiering",
    description: "Zakelijke financiering, krediet en financieringsmogelijkheden voor ondernemers.",
  },
};

/** Number of featured articles on the main nieuws index */
export const FEATURED_COUNT = 3;

/** Articles per page in the filtered list */
export const LIST_PER_PAGE = 12;

/** Articles per page on pillar archive */
export const ARCHIVE_PER_PAGE = 12;

/** All pillar slugs in display order; tabs show only pillars that have at least one article */
const PILLAR_ORDER: Pillar[] = ["hypotheken", "verzekeringen", "pensioen", "financiering"];

/** Parse DD-MM-YY to sortable value; empty string sorts last */
function parseDate(dateStr: string): number {
  if (!dateStr || !dateStr.trim()) return 0;
  const [d, m, y] = dateStr.split("-").map(Number);
  if (!d || !m || !y) return 0;
  const fullYear = y < 100 ? 2000 + y : y;
  return new Date(fullYear, m - 1, d).getTime();
}

/** All articles sorted by date (newest first); no date at end */
export function getAllSortedByDate(pillar?: Pillar): Article[] {
  const list = pillar ? ARTICLES.filter((a) => a.pillar === pillar) : [...ARTICLES];
  return list.sort((a, b) => {
    const ta = parseDate(a.date);
    const tb = parseDate(b.date);
    if (ta === 0 && tb === 0) return 0;
    if (ta === 0) return 1;
    if (tb === 0) return -1;
    return tb - ta;
  });
}

/** Pillars that have at least one article, in display order (for tabs on /nieuws) */
export function getPillars(): Pillar[] {
  return PILLAR_ORDER.filter((p) => ARTICLES.some((a) => a.pillar === p));
}

/** Pillars used for featured articles (hypotheek, pensioen, financiering only) */
const FEATURED_PILLARS: Pillar[] = ["hypotheken", "pensioen", "financiering"];

/** Featured articles for the hero block: one most-recent per featured pillar (3 total), sorted by date (newest first) */
export function getFeaturedArticles(_count?: number): Article[] {
  const onePerPillar: Article[] = FEATURED_PILLARS.map((pillar) => getAllSortedByDate(pillar)[0]).filter(Boolean);
  return onePerPillar.sort((a, b) => parseDate(b.date) - parseDate(a.date));
}

export function getArticlesByPillar(pillar: Pillar): Article[] {
  return ARTICLES.filter((a) => a.pillar === pillar);
}

/** Filter by pillar (optional), sorted by date, paginated */
export function getFilteredListPaginated(
  pillar: Pillar | undefined,
  page: number,
  perPage: number = LIST_PER_PAGE
): { articles: Article[]; total: number; totalPages: number } {
  const all = getAllSortedByDate(pillar);
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * perPage;
  const articles = all.slice(start, start + perPage);
  return { articles, total, totalPages };
}

export function getArticlesForPillarPaginated(
  pillar: Pillar,
  page: number,
  perPage: number = ARCHIVE_PER_PAGE
): { articles: Article[]; total: number; totalPages: number } {
  const all = getArticlesByPillar(pillar);
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * perPage;
  const articles = all.slice(start, start + perPage);
  return { articles, total, totalPages };
}

export function isValidPillar(slug: string): slug is Pillar {
  return PILLAR_ORDER.includes(slug as Pillar);
}
