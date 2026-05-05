import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import { CHECKLIST_ITEMS, buildAdvisorQuestions } from "@/lib/situatieschets/advisor-questions";
import { HARUNA_COLORS, HARUNA_DOMAIN } from "@/lib/situatieschets/branding";
import { berekenIndicaties } from "@/lib/situatieschets/calculations";
import { formatEuroPdf, parseEuro, pdfSafe } from "@/lib/situatieschets/format";
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
} from "@/lib/situatieschets/labels";
import type { SituatieschetsFormState } from "@/lib/situatieschets/types";

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 48,
    paddingHorizontal: 44,
    fontSize: 10,
    color: HARUNA_COLORS.blue,
    fontFamily: "Helvetica",
  },
  /** Logo + merkregel zonder rand onder het logo (voorkomt “grijze lijn” door border vs. transparante PNG). */
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerRule: {
    height: 2,
    backgroundColor: HARUNA_COLORS.primary,
    marginBottom: 16,
  },
  logoWrap: {
    backgroundColor: "#FFFFFF",
    paddingRight: 8,
  },
  logo: { width: 132, height: 44 },
  brandBlock: { alignItems: "flex-end" },
  domain: { fontSize: 11, fontFamily: "Helvetica", fontWeight: "bold", color: HARUNA_COLORS.green },
  tagline: { fontSize: 8, color: HARUNA_COLORS.muted, marginTop: 2 },
  title: {
    fontSize: 16,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: HARUNA_COLORS.blue,
    marginBottom: 4,
  },
  subtitle: { fontSize: 9, color: HARUNA_COLORS.muted, marginBottom: 16 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: HARUNA_COLORS.primary,
    marginTop: 12,
    marginBottom: 6,
  },
  row: { flexDirection: "row", marginBottom: 4 },
  label: { width: "38%", color: HARUNA_COLORS.muted, fontSize: 9 },
  value: { width: "62%", fontSize: 9 },
  box: {
    marginTop: 10,
    padding: 10,
    backgroundColor: HARUNA_COLORS.lightGreen,
    borderLeftWidth: 3,
    borderLeftColor: HARUNA_COLORS.green,
  },
  bigNumber: { fontSize: 14, fontFamily: "Helvetica", fontWeight: "bold", color: HARUNA_COLORS.blue },
  disclaimer: { fontSize: 7, color: HARUNA_COLORS.muted, marginTop: 8, lineHeight: 1.35 },
  bullet: { flexDirection: "row", marginBottom: 3 },
  bulletChar: { width: 12, fontSize: 9, color: HARUNA_COLORS.green },
  bulletText: { flex: 1, fontSize: 8.5, lineHeight: 1.35 },
  footer: {
    position: "absolute",
    bottom: 22,
    left: 44,
    right: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: HARUNA_COLORS.gray,
    paddingTop: 6,
  },
  footerLeft: { fontSize: 7, color: HARUNA_COLORS.muted },
  footerDomain: { fontSize: 7, fontFamily: "Helvetica", fontWeight: "bold", color: HARUNA_COLORS.green },
  notesTitle: {
    fontSize: 14,
    fontFamily: "Helvetica",
    fontWeight: "bold",
    color: HARUNA_COLORS.blue,
    marginBottom: 4,
  },
  notesSub: { fontSize: 8, color: HARUNA_COLORS.muted, marginBottom: 14 },
  noteLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: HARUNA_COLORS.gray,
    height: 22,
    marginBottom: 0,
  },
});

export type SituatieschetsPdfProps = {
  data: SituatieschetsFormState;
  logoDataUrl?: string | null;
  generatedAt: string;
};

function Footer({ page }: { page: number }) {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerLeft}>
        {pdfSafe(`Haruna B.V. - AFM 12017699 - ${HARUNA_DOMAIN} - pagina ${page}`)}
      </Text>
      <Text style={styles.footerDomain}>{HARUNA_DOMAIN}</Text>
    </View>
  );
}

const NOTES_LINE_COUNT = 26;

function PdfHeader({ logoDataUrl, variant }: { logoDataUrl?: string | null; variant: "full" | "compact" }) {
  return (
    <>
      <View style={styles.headerTop}>
        <View style={styles.logoWrap}>
          {logoDataUrl ? (
            <Image src={logoDataUrl} style={styles.logo} />
          ) : variant === "full" ? (
            <View>
              <Text style={{ fontSize: 18, fontFamily: "Helvetica", fontWeight: "bold", color: HARUNA_COLORS.primary }}>
                HARUNA
              </Text>
              <Text style={{ fontSize: 8, color: HARUNA_COLORS.muted }}>Hypotheek- en pensioenadvies</Text>
            </View>
          ) : (
            <Text style={{ fontSize: 14, fontFamily: "Helvetica", fontWeight: "bold", color: HARUNA_COLORS.primary }}>
              HARUNA
            </Text>
          )}
        </View>
        {variant === "full" ? (
          <View style={styles.brandBlock}>
            <Text style={styles.domain}>{HARUNA_DOMAIN}</Text>
            <Text style={styles.tagline}>{pdfSafe("Online hypotheekadvies - SEH Erkend")}</Text>
          </View>
        ) : (
          <View style={styles.brandBlock}>
            <Text style={styles.domain}>{HARUNA_DOMAIN}</Text>
          </View>
        )}
      </View>
      <View style={styles.headerRule} />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{pdfSafe(label)}</Text>
      <Text style={styles.value}>{pdfSafe(value)}</Text>
    </View>
  );
}

export function SituatieschetsPdfDocument({ data, logoDataUrl, generatedAt }: SituatieschetsPdfProps) {
  const ind = berekenIndicaties(data);
  const vragen = buildAdvisorQuestions(data);

  return (
    <Document
      title="Hypotheek situatieschets — Haruna"
      author="Haruna B.V."
      subject="Situatieschets (indicaties, geen advies)"
      creator="haruna.nl"
    >
      <Page size="A4" style={styles.page}>
        <PdfHeader logoDataUrl={logoDataUrl} variant="full" />

        <Text style={styles.title}>{pdfSafe("Hypotheek - situatieschets")}</Text>
        <Text style={styles.subtitle}>
          {pdfSafe(
            `Samenvatting van uw ingevulde gegevens - ${generatedAt}. Meenemen naar een gesprek met een erkend adviseur.`
          )}
        </Text>

        <Text style={styles.sectionTitle}>Uw situatie</Text>
        <Row label="Wat wilt u doen?" value={labelWoningDoel(data.woningDoel)} />
        <Row label="Hypotheek aanvrager" value={labelAanvrager(data.aanvrager)} />
        <Row label="Geboortedatum" value={formatGeboortedatum(data)} />
        <Row label="Burgerlijke staat" value={labelBurgerlijkeStaat(data.burgerlijkeStaat)} />
        <Row label="Kinderen" value={labelJaNee(data.heeftKinderen)} />
        <Row label="Roker" value={labelJaNee(data.rookt)} />

        <Text style={styles.sectionTitle}>Inkomen (bruto per jaar)</Text>
        <Row label="Uw bruto jaarinkomen" value={data.brutoJaar ? formatEuroPdf(parseEuro(data.brutoJaar)) : "-"} />
        <Row label="Uw dienstverband" value={labelDienstverband(data.dienstverband)} />
        {data.aanvrager === "partner" ? (
          <>
            <Row
              label="Partner bruto jaarinkomen"
              value={data.brutoJaarPartner ? formatEuroPdf(parseEuro(data.brutoJaarPartner)) : "-"}
            />
            <Row label="Partner dienstverband" value={labelDienstverband(data.dienstverbandPartner)} />
          </>
        ) : null}
        {data.heeftVariabel ? (
          <>
            <Row
              label="Variabel / bonus (gem. bruto/jaar)"
              value={data.variabelBrutoJaar ? formatEuroPdf(parseEuro(data.variabelBrutoJaar)) : "-"}
            />
            <Row label="Zekerheid variabel inkomen" value={data.variabelZekerheid || "-"} />
          </>
        ) : null}

        <Text style={styles.sectionTitle}>Lopende leningen en lasten</Text>
        <Row
          label="Studieschuld (oorspronkelijk)"
          value={data.studieschuld ? formatEuroPdf(parseEuro(data.studieschuld)) : "-"}
        />
        <Row
          label="Autolease (maand)"
          value={data.autoleaseMaand ? `${formatEuroPdf(parseEuro(data.autoleaseMaand))} / mnd` : "-"}
        />
        <Row
          label="Persoonlijke lening (openstaand)"
          value={data.persoonlijkeLening ? formatEuroPdf(parseEuro(data.persoonlijkeLening)) : "-"}
        />
        <Row label="Alimentatie" value={labelJaNee(data.betaaltAlimentatie)} />
        <Row label="Creditcard / doorlopend krediet" value={labelJaNee(data.creditcardKrediet)} />

        <Text style={styles.sectionTitle}>Woning</Text>
        <Row label="Koopsom / streefbedrag" value={data.koopsom ? formatEuroPdf(parseEuro(data.koopsom)) : "-"} />
        <Row label="Eigen geld beschikbaar" value={data.eigenGeld ? formatEuroPdf(parseEuro(data.eigenGeld)) : "-"} />
        <Row label="Gewenste tijdlijn" value={labelTijdlijn(data.tijdlijn)} />

        <Footer page={1} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader logoDataUrl={logoDataUrl} variant="compact" />

        <Text style={styles.sectionTitle}>Korte reflectie (eigen inschatting)</Text>
        <Row label="Pensioeninkomen straks" value={labelDrie(data.pensioenInkomenWeet)} />
        <Row label="Inkomen bij werkloosheid" value={labelDrie(data.werkloosheidWeet)} />
        <Row label="Inkomen bij arbeidsongeschiktheid" value={labelDrie(data.arbeidsongeschiktWeet)} />
        <Row label="Eerder hypotheek afgesloten" value={labelJaNee(data.eerderHypotheek)} />
        <Row label="Financiële kennis (eigen oordeel)" value={labelFinKennis(data.financieleKennis)} />

        <Text style={styles.sectionTitle}>Indicaties (geen advies)</Text>
        <View style={styles.box}>
          <Text style={{ fontSize: 9, marginBottom: 6, color: HARUNA_COLORS.blue }}>
            {pdfSafe(
              `Gebaseerd op ruwe aannames (factor ${String(4.5)} x bruto jaar, minus vereenvoudigde correcties). Een adviseur rekent uw maximale hypotheek en maandlast exact uit.`
            )}
          </Text>
          <Text style={styles.bigNumber}>
            {pdfSafe(`Max. hypotheek (indicatie): ${formatEuroPdf(ind.indicatieveMaxHypotheek)}`)}
          </Text>
          <Text style={{ marginTop: 6, fontSize: 10 }}>
            {pdfSafe(
              `Bruto maandlast annuiteit (indicatie, ${ind.rentePercentageJaar}% rente, ${ind.looptijdJaar} jr., op ${formatEuroPdf(ind.leenbedragVoorMaandlast)}): ${formatEuroPdf(ind.indicatieveBrutoMaandlast)}`
            )}
          </Text>
          <Text style={{ marginTop: 4, fontSize: 8, color: HARUNA_COLORS.muted }}>
            {pdfSafe(
              `Bruto jaar voor berekening (incl. 50% variabel): ${formatEuroPdf(ind.brutoJaarTotaal)} - ruwe schatting zonder alle bankcorrecties: ${formatEuroPdf(ind.basisCapaciteit)}`
            )}
          </Text>
        </View>

        <Text style={styles.disclaimer}>
          {pdfSafe(
            `Dit document is geen hypotheekofferte, geen bindend aanbod en geen persoonlijk financieel advies. Markt, rente, toetsing en regels wijzigen. Haruna B.V. is ingeschreven bij de AFM onder vergunningsnummer 12017699. Meer weten of laten toetsen? Bezoek ${HARUNA_DOMAIN} of plan een vrijblijvend gesprek.`
          )}
        </Text>

        <Text style={styles.sectionTitle}>Checklist documenten</Text>
        {CHECKLIST_ITEMS.map((item) => (
          <View key={item} style={styles.bullet}>
            <Text style={styles.bulletChar}>•</Text>
            <Text style={styles.bulletText}>{pdfSafe(item)}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Vragen om te stellen aan uw adviseur</Text>
        {vragen.map((q, i) => (
          <View key={i} style={styles.bullet}>
            <Text style={styles.bulletChar}>?</Text>
            <Text style={styles.bulletText}>{pdfSafe(q)}</Text>
          </View>
        ))}

        <Footer page={2} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PdfHeader logoDataUrl={logoDataUrl} variant="compact" />

        <Text style={styles.notesTitle}>{pdfSafe("Notities")}</Text>
        <Text style={styles.notesSub}>
          {pdfSafe(
            "Ruimte voor uw eigen aantekeningen tijdens of na een gesprek met een adviseur. Bij printen: gebruik de lijnen hieronder."
          )}
        </Text>
        {Array.from({ length: NOTES_LINE_COUNT }, (_, i) => (
          <View key={i} style={styles.noteLine} />
        ))}

        <Footer page={3} />
      </Page>
    </Document>
  );
}
