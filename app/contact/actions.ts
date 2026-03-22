"use server";

import { getSupabaseServer } from "@/lib/supabase/server";
import { sendAdminNotificationEmail } from "@/lib/resend/notify";

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
    const { error } = await supabase.from("haruna_afspraken").insert({
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

    // Notify admin by email (non-blocking for the end-user).
    try {
      console.log("[resend] sending afspraak mail", { naam, email });
      await sendAdminNotificationEmail({
        kind: "afspraak",
        naam,
        email,
        telefoon,
        onderwerp,
        bericht,
      });
      console.log("[resend] afspraak mail sent");
    } catch (mailErr) {
      console.error("Resend afspraak email failed:", mailErr);
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
    const { error } = await supabase.from("haruna_newsletter_subscribers").insert({
      email,
      source: source === "nieuws" ? "nieuws" : "footer",
    });

    if (error) {
      if (error.code === "23505") {
        // Already subscribed; avoid spamming admin inbox.
        return { success: true, message: "Dit e-mailadres staat al ingeschreven." };
      }
      console.error("Supabase newsletter insert error:", error);
      return { success: false, message: "Inschrijven mislukt. Probeer het later opnieuw." };
    }

    // Notify admin by email (non-blocking for the end-user).
    try {
      console.log("[resend] sending newsletter mail", { email, source });
      await sendAdminNotificationEmail({
        kind: "newsletter",
        email,
        source: source === "nieuws" ? "nieuws" : "footer",
      });
      console.log("[resend] newsletter mail sent");
    } catch (mailErr) {
      console.error("Resend newsletter email failed:", mailErr);
    }

    return { success: true, message: "Bedankt! U bent ingeschreven voor de nieuwsbrief." };
  } catch (e) {
    console.error("submitNewsletterForm error:", e);
    return { success: false, message: "Inschrijven mislukt. Probeer het later opnieuw." };
  }
}
