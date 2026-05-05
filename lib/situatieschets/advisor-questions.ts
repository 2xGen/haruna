import type { SituatieschetsFormState } from "./types";
import { parseEuro } from "./format";

/** Gespreksvoorbereiding — geen conclusies, wel concrete invalshoeken voor een adviseur. */
export function buildAdvisorQuestions(s: SituatieschetsFormState): string[] {
  const out: string[] = [];

  if (s.woningDoel === "eerste_huis") {
    out.push("Welke kosten koper en borg verwacht u, en hoe sluit dat aan op uw beschikbare eigen geld?");
    out.push("Wilt u Nationale Hypotheek Garantie (NHG) meenemen in de vergelijking?");
  }
  if (s.woningDoel === "doorstromen") {
    out.push("Wat is de verkoopstatus van uw huidige woning en hoe beïnvloedt dat uw koopbudget?");
    out.push("Heeft u overwaarde of restschuld mee te nemen naar de nieuwe financiering?");
  }
  if (s.woningDoel === "oversluiten") {
    out.push("Wat zijn rente, resterende looptijd en eventuele boeterente bij vervroegd aflossen?");
    out.push("Welk doel heeft oversluiten: lagere maandlast, andere looptijd of schulden bundelen?");
  }
  if (s.woningDoel === "tweede_hypotheek") {
    out.push("Waarvoor is de tweede lening bedoeld (verbouwen, aflossen andere schuld, beleggen)?");
    out.push("Hoe verhoudt extra schuld zich tot uw buffers na een rentestijging?");
  }

  if (s.aanvrager === "partner") {
    out.push("Hoe verdelen jullie draagkracht en eigendomsverhoudingen juridisch en fiscaal?");
  }

  if (s.dienstverband === "zzp" || s.dienstverbandPartner === "zzp") {
    out.push("Hoe stabiel zijn uw (gemiddelde) jaarcijfers en verwachte inkomensontwikkeling?");
  }
  if (s.dienstverband === "tijdelijk" || s.dienstverbandPartner === "tijdelijk") {
    out.push("Wat is de verwachte duur van uw tijdelijke contract en het verlengingsperspectief?");
  }

  if (s.heeftVariabel) {
    out.push("Hoe rekenen geldverstrekkers met uw variabele component — welke documentatie heeft u?");
  }

  if (parseEuro(s.studieschuld) > 0) {
    out.push("Wat is het actuele DUO-restantbedrag en welk aflossingsbedrag hanteert u nu?");
  }

  if (s.pensioenInkomenWeet === "niet" || s.pensioenInkomenWeet === "redelijk") {
    out.push("Welk pensioeninkomen kunt u verwachten en hoe past dat bij uw woning na pensionering?");
  }
  if (s.werkloosheidWeet === "niet" || s.arbeidsongeschiktWeet === "niet") {
    out.push("Welke risico’s (werkloosheid, arbeidsongeschiktheid) wilt u afdekken met inkomen/woning?");
  }

  if (s.eerderHypotheek === "nee") {
    out.push("Welke stappen in het koopproces zijn voor u nog onduidelijk (voorbehouden, taxatie, notaris)?");
  }

  out.push("Welke looptijd en aflossingsvorm passen bij uw voorkeur voor zekerheid versus flexibiliteit?");
  out.push("Hoe groot wilt u uw buffer houden naast de maandlasten van de hypotheek?");

  return [...new Set(out)].slice(0, 14);
}

export const CHECKLIST_ITEMS = [
  "Geldig identiteitsbewijs (alle aanvragers).",
  "Salarisstroken of uitkeringspecificaties (laatste 3 maanden) of jaarcijfers (ZZP).",
  "Arbeidscontract of werkgeversverklaring (indien van toepassing).",
  "Jaaropgaven inkomen (laatste 1–3 jaar, afhankelijk van situatie).",
  "Overzicht lopende leningen, lease en creditcard/RO krediet.",
  "DUO-studieschuld overzicht (indien van toepassing).",
  "Koop-/koopcontract of streefbedrag en kosten koper globaal in beeld.",
  "Overzicht eigen middelen en eventuele schenking of erfenis.",
  "Lijst van vaste lasten en gezinsuitgaven (globaal).",
];
