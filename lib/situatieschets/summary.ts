import { formatEuro, parseEuro } from "./format";
import {
  labelAanvrager,
  labelBurgerlijkeStaat,
  labelDienstverband,
  labelDrie,
  labelFinKennis,
  labelJaNee,
  labelTijdlijn,
  labelWoningDoel,
  formatGeboortedatum,
} from "./labels";
import type { SituatieschetsFormState } from "./types";
import { berekenIndicaties } from "./calculations";

export function formStateToSummaryText(s: SituatieschetsFormState): string {
  const ind = berekenIndicaties(s);
  const lines = [
    `Woningdoel: ${labelWoningDoel(s.woningDoel)}`,
    `Aanvrager(s): ${labelAanvrager(s.aanvrager)}`,
    `Geboortedatum: ${formatGeboortedatum(s)}`,
    `Burgerlijke staat: ${labelBurgerlijkeStaat(s.burgerlijkeStaat)}`,
    `Kinderen: ${labelJaNee(s.heeftKinderen)} · Roker: ${labelJaNee(s.rookt)}`,
    `Bruto jaar (aanvrager): ${s.brutoJaar ? formatEuro(parseEuro(s.brutoJaar)) : "—"} · ${labelDienstverband(s.dienstverband)}`,
  ];
  if (s.aanvrager === "partner") {
    lines.push(
      `Partner bruto jaar: ${s.brutoJaarPartner ? formatEuro(parseEuro(s.brutoJaarPartner)) : "—"} · ${labelDienstverband(s.dienstverbandPartner)}`
    );
  }
  if (s.heeftVariabel) {
    lines.push(
      `Variabel gemiddeld/jaar: ${s.variabelBrutoJaar ? formatEuro(parseEuro(s.variabelBrutoJaar)) : "—"} · zekerheid: ${s.variabelZekerheid || "—"}`
    );
  }
  lines.push(
    `Studieschuld (oorspr.): ${s.studieschuld ? formatEuro(parseEuro(s.studieschuld)) : "—"}`,
    `Autolease/mnd: ${s.autoleaseMaand ? formatEuro(parseEuro(s.autoleaseMaand)) : "—"}`,
    `Persoonlijke lening: ${s.persoonlijkeLening ? formatEuro(parseEuro(s.persoonlijkeLening)) : "—"}`,
    `Alimentatie: ${labelJaNee(s.betaaltAlimentatie)} · CC/RO: ${labelJaNee(s.creditcardKrediet)}`,
    `Koopsom/streef: ${s.koopsom ? formatEuro(parseEuro(s.koopsom)) : "—"} · eigen geld: ${s.eigenGeld ? formatEuro(parseEuro(s.eigenGeld)) : "—"}`,
    `Tijdlijn: ${labelTijdlijn(s.tijdlijn)}`,
    `Pensioen inkomen (weet): ${labelDrie(s.pensioenInkomenWeet)} · werkloosheid: ${labelDrie(s.werkloosheidWeet)} · arbeidsongeschikt: ${labelDrie(s.arbeidsongeschiktWeet)}`,
    `Eerder hypotheek: ${labelJaNee(s.eerderHypotheek)} · financiële kennis: ${labelFinKennis(s.financieleKennis)}`,
    "",
    `Indicatie max hypotheek: ${formatEuro(ind.indicatieveMaxHypotheek)}`,
    `Indicatie bruto maandlast (${ind.rentePercentageJaar}% / ${ind.looptijdJaar} jr. op ${formatEuro(ind.leenbedragVoorMaandlast)}): ${formatEuro(ind.indicatieveBrutoMaandlast)}`,
  );
  return lines.join("\n");
}
