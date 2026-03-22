import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  // Prevent accidental spamming in production.
  if (process.env.NODE_ENV === "production") {
    const allow = process.env.RESEND_TEST_ALLOW_IN_PROD === "true";
    if (!allow) {
      return NextResponse.json(
        { error: "Resend test is disabled in production." },
        { status: 403 }
      );
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const defaultTo = process.env.RESEND_TO_EMAIL;

  if (!apiKey || !from || !defaultTo) {
    return NextResponse.json(
      { error: "Missing RESEND_API_KEY / RESEND_FROM_EMAIL / RESEND_TO_EMAIL in env." },
      { status: 500 }
    );
  }

  const body = (await req.json().catch(() => ({}))) as { to?: string };
  const toEmail = (body?.to || defaultTo).trim();

  if (!toEmail) {
    return NextResponse.json({ error: "Missing to email." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const subject = `Resend test (Haruna) – ${new Date().toISOString()}`;
  const text = `Dit is een testmail vanuit haruna.nl.\n\nTijd: ${new Date().toISOString()}`;
  const html = `<p>Dit is een testmail vanuit haruna.nl.</p><p>Tijd: ${new Date().toISOString()}</p>`;

  console.log("[resend-test] sending", { to: toEmail, from });
  const { data, error } = await resend.emails.send({
    from,
    to: [toEmail],
    subject,
    text,
    html,
  });
  if (error) {
    console.error("[resend-test] failed", error);
  } else {
    console.log("[resend-test] sent", { id: data?.id });
  }

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

