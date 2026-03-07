"use server";

import { getSupabaseServer } from "@/lib/supabase/server";

export async function submitAfspraakForm(
  _prev: { success: boolean },
  formData: FormData
): Promise<{ success: boolean }> {
  const naam = (formData.get("naam") as string)?.trim() || "";
  const email = (formData.get("email") as string)?.trim() || "";
  const telefoon = (formData.get("telefoon") as string)?.trim() || null;
  const onderwerp = (formData.get("onderwerp") as string)?.trim() || null;
  const bericht = (formData.get("bericht") as string)?.trim() || null;

  if (!naam || !email) {
    return { success: false };
  }

  try {
    const supabase = getSupabaseServer();
    const { error } = await supabase.from("afspraken").insert({
      naam,
      email,
      telefoon: telefoon || null,
      onderwerp: onderwerp || null,
      bericht: bericht || null,
    });

    if (error) {
      console.error("Supabase afspraak insert error:", error);
      return { success: false };
    }
    return { success: true };
  } catch (e) {
    console.error("submitAfspraakForm error:", e);
    return { success: false };
  }
}

export async function submitChecklistForm(
  _prev: { success: boolean },
  formData: FormData
): Promise<{ success: boolean }> {
  const email = formData.get("email") as string;

  // TODO: Integrate with email service / send checklist
  console.log("Checklist signup:", { email });

  return { success: true };
}

export async function submitNewsletterForm(
  _prev: { success: boolean; message?: string },
  formData: FormData
): Promise<{ success: boolean; message?: string }> {
  const email = (formData.get("email") as string)?.trim() || "";
  const source = (formData.get("source") as string) || "footer";

  if (!email) {
    return { success: false, message: "Vul een e-mailadres in." };
  }

  try {
    const supabase = getSupabaseServer();
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email,
      source: source === "nieuws" ? "nieuws" : "footer",
    });

    if (error) {
      if (error.code === "23505") {
        return { success: true, message: "Dit e-mailadres staat al ingeschreven." };
      }
      console.error("Supabase newsletter insert error:", error);
      return { success: false, message: "Inschrijven mislukt. Probeer het later opnieuw." };
    }
    return { success: true, message: "Bedankt! U bent ingeschreven voor de nieuwsbrief." };
  } catch (e) {
    console.error("submitNewsletterForm error:", e);
    return { success: false, message: "Inschrijven mislukt. Probeer het later opnieuw." };
  }
}
