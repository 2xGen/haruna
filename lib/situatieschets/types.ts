export type WoningDoel = "eerste_huis" | "doorstromen" | "oversluiten" | "tweede_hypotheek";

export type Aanvrager = "alleen" | "partner";

export type Dienstverband =
  | "vast"
  | "tijdelijk"
  | "zzp"
  | "pensioen"
  | "uitkering"
  | "anders";

export type DrieNiveau = "niet" | "redelijk" | "goed";

export type FinancieleKennis = "laag" | "redelijk" | "goed" | "zeer_goed";

export type Tijdlijn = "zo_snel" | "binnen_3" | "3_tot_6" | "onzeker";

export type BurgerlijkeStaat = "ongehuwd" | "gehuwd" | "samenwonend" | "gescheiden" | "weduwe";

export interface SituatieschetsFormState {
  woningDoel: WoningDoel | "";
  aanvrager: Aanvrager | "";
  geboorteDag: string;
  geboorteMaand: string;
  geboorteJaar: string;
  burgerlijkeStaat: BurgerlijkeStaat | "";
  heeftKinderen: "" | "nee" | "ja";
  rookt: "" | "nee" | "ja";
  brutoJaar: string;
  brutoJaarPartner: string;
  dienstverband: Dienstverband | "";
  dienstverbandPartner: Dienstverband | "";
  heeftVariabel: boolean;
  variabelBrutoJaar: string;
  variabelZekerheid: "onszeker" | "redelijk" | "zeker" | "";
  studieschuld: string;
  autoleaseMaand: string;
  persoonlijkeLening: string;
  betaaltAlimentatie: "" | "nee" | "ja";
  creditcardKrediet: "" | "nee" | "ja";
  koopsom: string;
  eigenGeld: string;
  tijdlijn: Tijdlijn | "";
  pensioenInkomenWeet: DrieNiveau | "";
  werkloosheidWeet: DrieNiveau | "";
  arbeidsongeschiktWeet: DrieNiveau | "";
  eerderHypotheek: "" | "nee" | "ja";
  financieleKennis: FinancieleKennis | "";
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon: string;
  opmerkingen: string;
}

export function createEmptySituatieschetsState(): SituatieschetsFormState {
  return {
    woningDoel: "",
    aanvrager: "",
    geboorteDag: "",
    geboorteMaand: "",
    geboorteJaar: "",
    burgerlijkeStaat: "",
    heeftKinderen: "",
    rookt: "",
    brutoJaar: "",
    brutoJaarPartner: "",
    dienstverband: "",
    dienstverbandPartner: "",
    heeftVariabel: false,
    variabelBrutoJaar: "",
    variabelZekerheid: "",
    studieschuld: "",
    autoleaseMaand: "",
    persoonlijkeLening: "",
    betaaltAlimentatie: "",
    creditcardKrediet: "",
    koopsom: "",
    eigenGeld: "",
    tijdlijn: "",
    pensioenInkomenWeet: "",
    werkloosheidWeet: "",
    arbeidsongeschiktWeet: "",
    eerderHypotheek: "",
    financieleKennis: "",
    voornaam: "",
    achternaam: "",
    email: "",
    telefoon: "",
    opmerkingen: "",
  };
}
