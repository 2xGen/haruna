/** Querywaarden voor het afspraakformulier (`/contact?onderwerp=…`). */

export const AFSPRAAK_TOPIC_VALUES = ["hypotheek", "pensioen", "verzekeringen", "financiering", "overig"] as const;
export type AfspraakTopicValue = (typeof AFSPRAAK_TOPIC_VALUES)[number];

export function parseAfspraakTopicParam(raw: string | string[] | undefined): AfspraakTopicValue | undefined {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (!v || typeof v !== "string") return undefined;
  return (AFSPRAAK_TOPIC_VALUES as readonly string[]).includes(v) ? (v as AfspraakTopicValue) : undefined;
}

/** Eerste stap op /situatieschets: hypotheek → PDF-wizard; overige → afspraak met vooringevuld onderwerp. */
export const SITUATIESCHETS_GATE_TOPICS: {
  value: Exclude<AfspraakTopicValue, "overig">;
  label: string;
  hint: string;
}[] = [
  {
    value: "hypotheek",
    label: "Hypotheek",
    hint: "Gratis PDF-situatieschets met ruwe indicaties (±20 min.)",
  },
  {
    value: "pensioen",
    label: "Pensioen",
    hint: "Plan een gratis kennismaking — onderwerp vooringevuld",
  },
  {
    value: "verzekeringen",
    label: "Verzekeringen",
    hint: "Plan een gratis kennismaking — onderwerp vooringevuld",
  },
  {
    value: "financiering",
    label: "Financiering",
    hint: "Plan een gratis kennismaking — onderwerp vooringevuld",
  },
];
