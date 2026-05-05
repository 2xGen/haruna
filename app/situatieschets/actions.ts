"use server";

import { formStateToSummaryText } from "@/lib/situatieschets/summary";
import type { SituatieschetsFormState } from "@/lib/situatieschets/types";
import { sendAdminNotificationEmail } from "@/lib/resend/notify";
import { getSupabaseServer } from "@/lib/supabase/server";

function isSpamSubmission(formData: FormData): boolean {
  const website = (formData.get("website") as string)?.trim() || "";
  const hp = (formData.get("nb_hp") as string)?.trim() || "";
  return website.length > 0 || hp.length > 0;
}

function isValidMathCheck(formData: FormData): boolean {
  const raw = (formData.get("spam_check") as string) || "";
  const answer = raw.trim().replace(/\s+/g, "");
  return answer === "7";
}

function parseSchetsJson(raw: string): SituatieschetsFormState | null {
  try {
    const v = JSON.parse(raw) as unknown;
    if (!v || typeof v !== "object") return null;
    return v as SituatieschetsFormState;
  } catch {
    return null;
  }
}

export async function submitSituatieschetsAdviseur(
  _prev: { success: boolean; error?: string },
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  if (isSpamSubmission(formData)) {
    return { success: true };
  }
  if (!isValidMathCheck(formData)) {
    return { success: false, error: "Controle mislukt. Beantwoord de som 3 + 4." };
  }

  const voornaam = (formData.get("voornaam") as string)?.trim() || "";
  const achternaam = (formData.get("achternaam") as string)?.trim() || "";
  const email = (formData.get("email") as string)?.trim() || "";
  const telefoon = (formData.get("telefoon") as string)?.trim() || "";
  const opmerkingen = (formData.get("opmerkingen") as string)?.trim() || null;
  const consent = ((formData.get("consent") as string) || "").trim();
  const schetsJson = (formData.get("schets_json") as string) || "";

  if (!voornaam || !achternaam || !email || !telefoon) {
    return { success: false, error: "Vul voornaam, achternaam, e-mail en telefoon in." };
  }
  if (consent !== "on") {
    return {
      success: false,
      error: "Ga akkoord met het privacybeleid en de verwerking van uw gegevens voor dit contactverzoek.",
    };
  }

  const state = parseSchetsJson(schetsJson);
  if (!state) {
    return { success: false, error: "Situatieschets kon niet worden gelezen. Probeer het opnieuw." };
  }

  const samenvattingTekst = formStateToSummaryText(state);

  try {
    const supabase = getSupabaseServer();
    const { error: dbError } = await supabase.from("haruna_leads_situatieschets").insert({
      voornaam,
      achternaam,
      email,
      telefoon,
      opmerkingen: opmerkingen || null,
      schets_json: state,
      samenvatting_tekst: samenvattingTekst,
    });

    if (dbError) {
      console.error("submitSituatieschetsAdviseur / Supabase:", {
        code: dbError.code,
        message: dbError.message,
        details: dbError.details,
        hint: dbError.hint,
      });
      return {
        success: false,
        error:
          "Opslaan is mislukt. Controleer of de tabel haruna_leads_situatieschets bestaat, of probeer het later opnieuw. U kunt uw PDF nog downloaden na een geslaagde poging.",
      };
    }
  } catch (e) {
    console.error("submitSituatieschetsAdviseur / Supabase client:", e);
    return {
      success: false,
      error:
        "Opslaan is mislukt (database niet bereikbaar). Download uw PDF en neem rechtstreeks contact op, of probeer later opnieuw.",
    };
  }

  try {
    await sendAdminNotificationEmail({
      kind: "situatieschets_adviseur",
      voornaam,
      achternaam,
      email,
      telefoon,
      opmerkingen,
      samenvattingTekst,
    });
    return { success: true };
  } catch (e) {
    console.error("submitSituatieschetsAdviseur / Resend:", e);
    return { success: true };
  }
}
