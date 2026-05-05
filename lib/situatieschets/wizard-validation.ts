import { parseEuro } from "./format";
import type { SituatieschetsFormState } from "./types";

const BRUTO_MIN = 15_000;
const BRUTO_MAX = 500_000;

function validGeboorte(s: SituatieschetsFormState): boolean {
  const d = s.geboorteDag.trim();
  const m = s.geboorteMaand.trim();
  const y = s.geboorteJaar.trim();
  if (!d || !m || !y) return false;
  const day = Number(d);
  const month = Number(m);
  const year = Number(y);
  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) return false;
  const dt = new Date(year, month - 1, day);
  return dt.getFullYear() === year && dt.getMonth() === month - 1 && dt.getDate() === day;
}

function brutoOk(raw: string): boolean {
  const n = parseEuro(raw);
  return n >= BRUTO_MIN && n <= BRUTO_MAX;
}

/** Steps 1–6 (voor stap 7 = keuze adviseur/PDF). */
export function validateWizardStep(step: number, s: SituatieschetsFormState): string | null {
  switch (step) {
    case 1:
      if (!s.woningDoel) return "Kies waar u mee bezig bent.";
      if (!s.aanvrager) return "Kies of u alleen of met partner de hypotheek aanvraagt.";
      return null;
    case 2:
      if (!validGeboorte(s)) return "Vul een geldige geboortedatum in (dag, maand en jaar).";
      if (!s.burgerlijkeStaat) return "Kies uw burgerlijke staat.";
      return null;
    case 3:
      if (!brutoOk(s.brutoJaar)) {
        return `Vul een realistisch bruto jaarinkomen in (tussen ${BRUTO_MIN.toLocaleString("nl-NL")} en ${BRUTO_MAX.toLocaleString("nl-NL")} euro).`;
      }
      if (!s.dienstverband) return "Kies uw dienstverband.";
      if (s.aanvrager === "partner") {
        if (!brutoOk(s.brutoJaarPartner)) {
          return "Vul ook een realistisch bruto jaarinkomen in voor uw partner.";
        }
        if (!s.dienstverbandPartner) return "Kies het dienstverband van uw partner.";
      }
      if (s.heeftVariabel) {
        const v = parseEuro(s.variabelBrutoJaar);
        if (v < 1_000 || v > BRUTO_MAX) {
          return "Vul het gemiddelde variabele inkomen per jaar in (realistisch bedrag).";
        }
        if (!s.variabelZekerheid) return "Geef aan hoe zeker het variabele inkomen is.";
      }
      return null;
    case 4:
      return null;
    case 5:
      if (!s.tijdlijn) return "Kies een gewenste tijdlijn.";
      return null;
    case 6:
      return null;
    default:
      return null;
  }
}

export function validateAdviseurContact(s: SituatieschetsFormState): string | null {
  if (!s.voornaam.trim()) return "Vul uw voornaam in.";
  if (!s.achternaam.trim()) return "Vul uw achternaam in.";
  if (!s.email.trim() || !s.email.includes("@")) return "Vul een geldig e-mailadres in.";
  if (!s.telefoon.trim()) return "Vul uw telefoonnummer in.";
  return null;
}
