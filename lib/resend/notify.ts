import { Resend } from "resend";

export type AdminMailPayload =
  | {
      kind: "afspraak";
      naam: string;
      email: string;
      telefoon?: string | null;
      onderwerp?: string | null;
      bericht?: string | null;
    }
  | {
      kind: "newsletter";
      email: string;
      source: "footer" | "nieuws";
    };

function getEnv(name: string): string {
  const v = process.env[name]?.trim();
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export async function sendAdminNotificationEmail(payload: AdminMailPayload) {
  const apiKey = getEnv("RESEND_API_KEY");
  const from = getEnv("RESEND_FROM_EMAIL");
  const to = getEnv("RESEND_TO_EMAIL");

  const subject =
    payload.kind === "afspraak"
      ? "Nieuwe aanvraag via Haruna (Afspraak maken)"
      : "Nieuwe nieuwsbrief-inschrijving Haruna";

  const text =
    payload.kind === "afspraak"
      ? [
          "Je hebt een nieuwe afspraak-aanvraag ontvangen.",
          "",
          `Naam: ${payload.naam}`,
          `E-mail: ${payload.email}`,
          `Telefoon: ${payload.telefoon ?? "-"}`,
          `Onderwerp: ${payload.onderwerp ?? "-"}`,
          `Bericht: ${payload.bericht ?? "-"}`,
        ].join("\n")
      : [
          "Je hebt een nieuwe nieuwsbrief-inschrijving ontvangen.",
          "",
          `E-mail: ${payload.email}`,
          `Bron: ${payload.source}`,
        ].join("\n");

  const html = `<p>${text.replace(/\n/g, "<br />")}</p>`;

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to: [to],
    subject,
    text,
    html,
  });

  if (result.error) {
    console.error("[resend] emails.send failed:", {
      name: result.error.name,
      message: result.error.message,
      statusCode: result.error.statusCode,
    });
    if (
      result.error.name === "validation_error" &&
      result.error.message?.includes("only send testing emails")
    ) {
      console.warn(
        "[resend] Met FROM=onboarding@resend.dev mag TO alleen het e-mailadres van je Resend-account zijn (niet zomaar contact@…). " +
          "Wil je naar contact@haruna.nl? Verifieer het domein haruna.nl in Resend en gebruik FROM zoals noreply@haruna.nl."
      );
    }
    throw new Error(result.error.message || "Resend API error");
  }
}

