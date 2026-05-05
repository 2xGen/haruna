import type { SituatieschetsFormState } from "./types";
import { parseEuro } from "./format";

export type SituatieschetsIndicatie = {
  brutoJaarTotaal: number;
  /** Ruwe schatting vóór correcties (transparant in PDF). */
  basisCapaciteit: number;
  /** Indicatieve maximale hypotheek (leningbedrag), afgerond op € 5.000. */
  indicatieveMaxHypotheek: number;
  /** Te financieren bedrag op basis van koopsom minus eigen geld, begrensd door indicatie. */
  leenbedragVoorMaandlast: number;
  /** Bruto maandlast annuïteit, indicatieve rente 4,2%, looptijd 30 jaar. */
  indicatieveBrutoMaandlast: number;
  rentePercentageJaar: number;
  looptijdJaar: number;
};

const INDICATIEVE_RENTE = 0.042;
const LOOPTIJD_JAAR = 30;
const BRUTO_FACTOR = 4.5;

/**
 * Vereenvoudigde rekenregels uitsluitend als indicatie voor een gesprek.
 * Geen persoonlijk hypotheekadvies — een adviseur rekent dit exact uit.
 */
export function berekenIndicaties(s: SituatieschetsFormState): SituatieschetsIndicatie {
  const bruto1 = parseEuro(s.brutoJaar);
  const bruto2 = s.aanvrager === "partner" ? parseEuro(s.brutoJaarPartner) : 0;
  const variabel = s.heeftVariabel ? parseEuro(s.variabelBrutoJaar) * 0.5 : 0;
  const brutoJaarTotaal = Math.max(0, bruto1 + bruto2 + variabel);

  let basis = brutoJaarTotaal * BRUTO_FACTOR;

  const studieschuld = parseEuro(s.studieschuld);
  basis -= studieschuld * 4;

  const persLening = parseEuro(s.persoonlijkeLening);
  basis -= persLening * 0.25;

  const autolease = parseEuro(s.autoleaseMaand);
  basis -= autolease * 12 * 6;

  if (s.betaaltAlimentatie === "ja") basis -= 12_000;
  if (s.creditcardKrediet === "ja") basis -= 5_000;

  basis = Math.max(0, basis);
  const indicatieveMaxHypotheek = Math.round(basis / 5000) * 5000;

  const koopsom = parseEuro(s.koopsom);
  const eigenGeld = parseEuro(s.eigenGeld);
  const gewenstLeen = Math.max(0, koopsom - eigenGeld);
  const leenbedragVoorMaandlast =
    koopsom > 0 ? Math.min(indicatieveMaxHypotheek, gewenstLeen) : indicatieveMaxHypotheek;

  const maandlast = annuiteitMaandlast(leenbedragVoorMaandlast, INDICATIEVE_RENTE, LOOPTIJD_JAAR);

  return {
    brutoJaarTotaal,
    basisCapaciteit: brutoJaarTotaal * BRUTO_FACTOR,
    indicatieveMaxHypotheek,
    leenbedragVoorMaandlast,
    indicatieveBrutoMaandlast: maandlast,
    rentePercentageJaar: INDICATIEVE_RENTE * 100,
    looptijdJaar: LOOPTIJD_JAAR,
  };
}

function annuiteitMaandlast(hoofdsom: number, jaarRente: number, jaren: number): number {
  if (hoofdsom <= 0) return 0;
  const r = jaarRente / 12;
  const n = jaren * 12;
  const factor = (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(hoofdsom * factor);
}
