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
  const v = process.env[name];
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
  await resend.emails.send({
    from,
    to: [to],
    subject,
    text,
    html,
  });
}

