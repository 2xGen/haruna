/** Parse Dutch-style amounts: "55.000", "55000", "55,000" → integer euros. */
export function parseEuro(raw: string): number {
  const t = raw.trim();
  if (!t) return 0;
  const noSymbol = t.replace(/€/g, "").replace(/\s/g, "");
  const lastComma = noSymbol.lastIndexOf(",");
  const lastDot = noSymbol.lastIndexOf(".");
  let normalized = noSymbol.replace(/[^\d.,-]/g, "");
  if (lastComma > lastDot) {
    normalized = normalized.replace(/\./g, "").replace(",", ".");
  } else {
    normalized = normalized.replace(/,/g, "");
  }
  const n = parseFloat(normalized);
  return Number.isFinite(n) ? Math.round(n) : 0;
}

export function formatEuro(n: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

/** Plain ASCII + basic punctuation — avoids WinAnsi/font errors in @react-pdf + Helvetica. */
export function pdfSafe(input: string): string {
  return input
    .replace(/[\u202f\u00a0]/g, " ")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/–/g, "-")
    .replace(/€/g, "EUR ")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/** EUR amounts for PDF (no Intl, no special spaces). */
export function formatEuroPdf(n: number): string {
  const v = Math.round(Math.abs(n));
  const dotted = v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return n < 0 ? `- EUR ${dotted}` : `EUR ${dotted}`;
}
