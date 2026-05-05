import type {
  SituatieschetsFormState,
  WoningDoel,
  Dienstverband,
  Tijdlijn,
  DrieNiveau,
  FinancieleKennis,
  BurgerlijkeStaat,
} from "./types";

const WONING_DOEL: Record<WoningDoel, string> = {
  eerste_huis: "Eerste huis kopen (nog geen eigen woning)",
  doorstromen: "Doorstromen (huidige woning verkopen of verkocht)",
  oversluiten: "Oversluiten (bestaande hypotheek aanpassen)",
  tweede_hypotheek: "Tweede hypotheek / overwaarde of extra lening",
};

const DIENSTVERBAND: Record<Dienstverband, string> = {
  vast: "Vast contract",
  tijdelijk: "Tijdelijk contract",
  zzp: "ZZP / ondernemer (gemiddelde afgelopen 3 jaar)",
  pensioen: "VUT / pensioen",
  uitkering: "Uitkering",
  anders: "Anders",
};

const TIJDLIJN: Record<Tijdlijn, string> = {
  zo_snel: "Zo snel mogelijk",
  binnen_3: "Binnen 3 maanden",
  "3_tot_6": "3–6 maanden",
  onzeker: "Nog niet zeker",
};

const DRIE: Record<"niet" | "redelijk" | "goed", string> = {
  niet: "Niet / weinig",
  redelijk: "Redelijk",
  goed: "Goed",
};

const KENNIS: Record<FinancieleKennis, string> = {
  laag: "Laag",
  redelijk: "Redelijk",
  goed: "Goed",
  zeer_goed: "Zeer goed",
};

const STAAT: Record<BurgerlijkeStaat, string> = {
  ongehuwd: "Ongehuwd / alleenstaand",
  gehuwd: "Gehuwd",
  samenwonend: "Samenwonend",
  gescheiden: "Gescheiden",
  weduwe: "Weduwe / weduwnaar",
};

export function labelWoningDoel(v: SituatieschetsFormState["woningDoel"]): string {
  return v ? WONING_DOEL[v] : "—";
}

export function labelAanvrager(v: SituatieschetsFormState["aanvrager"]): string {
  if (v === "alleen") return "Alleen";
  if (v === "partner") return "Met partner";
  return "—";
}

export function labelDienstverband(v: Dienstverband | ""): string {
  return v ? DIENSTVERBAND[v] : "—";
}

export function labelTijdlijn(v: SituatieschetsFormState["tijdlijn"]): string {
  return v ? TIJDLIJN[v] : "—";
}

export function labelJaNee(v: "" | "nee" | "ja"): string {
  if (v === "ja") return "Ja";
  if (v === "nee") return "Nee";
  return "—";
}

export function labelDrie(v: DrieNiveau | ""): string {
  return v ? DRIE[v] : "—";
}

export function labelFinKennis(v: SituatieschetsFormState["financieleKennis"]): string {
  return v ? KENNIS[v] : "—";
}

export function labelBurgerlijkeStaat(v: SituatieschetsFormState["burgerlijkeStaat"]): string {
  return v ? STAAT[v] : "—";
}

export function formatGeboortedatum(s: SituatieschetsFormState): string {
  const { geboorteDag: d, geboorteMaand: m, geboorteJaar: y } = s;
  if (!d || !m || !y) return "—";
  return `${d.padStart(2, "0")}-${m.padStart(2, "0")}-${y}`;
}
