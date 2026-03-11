export type Pillar = "hypotheken" | "verzekeringen" | "pensioen";

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
    slug: "samenwonen-wat-moet-u-regelen",
    title: "Samenwonen: wat moet u regelen?",
    description:
      "Woont u al samen of gaat dit binnenkort gebeuren? Dan is het verstandig om een aantal zaken te regelen rond hypotheek en vermogen.",
    date: "26-02-26",
    image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/samen%20wonen.jpg",
    pillar: "hypotheken",
    href: "/nieuws/samenwonen-wat-moet-u-regelen",
  },
  {
    slug: "huis-kopen-56-plusser",
    title: "Een huis kopen als 56-plusser",
    description:
      "Hypotheekmogelijkheden voor 56-plussers. Lees over pensioeninkomen, overwaarde en verhuizen op latere leeftijd.",
    date: "06-03-26",
    image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/huis%20kopen.jpg",
    pillar: "hypotheken",
    href: "/nieuws/huis-kopen-56-plusser",
  },
  {
    slug: "annuitair-vs-lineair-aflossen",
    title: "Annuïtair vs. lineair aflossen",
    description:
      "Het verschil tussen annuïtair en lineair aflossen. Welke hypotheekvorm past bij uw situatie? Voor- en nadelen op een rij.",
    date: "08-03-26",
    image:
      "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Het%20verschil%20tussen%20annuitair%20en%20lineair%20aflossen..png",
    pillar: "hypotheken",
    href: "/nieuws/annuitair-vs-lineair-aflossen",
  },
  {
    slug: "welke-verzekeringen-heeft-uw-onderneming-nodig",
    title: "Welke verzekeringen heeft uw onderneming nodig?",
    description:
      "Als ondernemer wilt u uw bedrijf goed beschermen. Lees welke risico's er spelen en welke verzekeringen daarbij passen.",
    date: "10-03-26",
    image:
      "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Welke%20verzekeringen%20heeft%20uw%20onderneming%20nodig.png",
    pillar: "verzekeringen",
    href: "/nieuws/welke-verzekeringen-heeft-uw-onderneming-nodig",
  },
  {
    slug: "verzekeringen-bij-uw-hypotheek",
    title: "Verzekeringen bij uw hypotheek",
    description:
      "Spaar-, risico- en overlijdensverzekering. Welke verzekeringen horen bij een hypotheek en wat past bij u?",
    date: "26-02-26",
    image:
      "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Verzekeringen%20bij%20uw%20hypotheek.png",
    pillar: "verzekeringen",
    href: "/nieuws/verzekeringen-bij-uw-hypotheek",
  },
  {
    slug: "wat-kunt-u-als-particulier-verzekeren",
    title: "Wat kunt u als particulier verzekeren?",
    description:
      "Van opstal en inboedel tot aansprakelijkheid, auto en reizen.",
    date: "24-02-26",
    image:
      "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Wat%20kunt%20u%20als%20particulier%20verzekeren.png",
    pillar: "verzekeringen",
    href: "/nieuws/wat-kunt-u-als-particulier-verzekeren",
  },
  {
    slug: "pensioen-uitstellen",
    title: "Pensioen uitstellen: wat zijn de gevolgen?",
    description:
      "Overweegt u om later met pensioen te gaan? Dit kan financieel en persoonlijk voordelen bieden, maar er zijn ook aandachtspunten.",
    date: "04-03-26",
    image: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/pensioen.jpg",
    pillar: "pensioen",
    href: "/nieuws/pensioen-uitstellen",
  },
  {
    slug: "pensioen-voor-werkgevers-en-werknemers",
    title: "Pensioen voor werkgevers en werknemers",
    description:
      "Collectieve regelingen, communicatie en beheer. Wij helpen u de pensioenvoorziening goed in te richten.",
    date: "10-02-26",
    image:
      "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Pensioen%20voor%20werkgevers%20en%20werknemers.png",
    pillar: "pensioen",
    href: "/nieuws/pensioen-voor-werkgevers-en-werknemers",
  },
  {
    slug: "pensioen-als-ondernemer-dga",
    title: "Pensioen als ondernemer (DGA)",
    description:
      "Eigen beheer, verzekerde regelingen of fiscaal-juridische vraagstukken. Advies op maat voor directeuren-grootaandeelhouders.",
    date: "14-02-26",
    image:
      "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Pensioen%20als%20ondernemer%20DGA.png",
    pillar: "pensioen",
    href: "/nieuws/pensioen-als-ondernemer-dga",
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
};

/** Number of featured articles on the main nieuws index */
export const FEATURED_COUNT = 3;

/** Articles per page in the filtered list */
export const LIST_PER_PAGE = 12;

/** Articles per page on pillar archive */
export const ARCHIVE_PER_PAGE = 12;

const PILLARS: Pillar[] = ["hypotheken", "verzekeringen", "pensioen"];

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

export function getPillars(): Pillar[] {
  return PILLARS;
}

/** Featured (most recent) articles for the hero block */
export function getFeaturedArticles(count: number = FEATURED_COUNT): Article[] {
  return getAllSortedByDate().slice(0, count);
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
  return PILLARS.includes(slug as Pillar);
}
