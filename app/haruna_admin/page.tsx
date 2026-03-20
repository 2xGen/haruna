import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSupabaseServer } from "@/lib/supabase/server";
import { loginAction, updateStatusAction } from "./actions";
import { isValidAdminSessionCookie } from "./session";

export const metadata: Metadata = {
  title: "Haruna Admin",
  robots: { index: false, follow: false },
};

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString("nl-NL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

export default async function HarunaAdminPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const isAuthed = await isValidAdminSessionCookie();
  const supabase = isAuthed ? getSupabaseServer() : null;

  let afspraken: any[] | null = null;
  let afsprakenError: any = null;
  let newsletterSubs: any[] | null = null;
  let newsletterError: any = null;
  let auditLogs: any[] | null = null;
  let auditLogsError: any = null;

  if (supabase) {
    const resultAfspraken = await supabase
      .from("haruna_afspraken")
      .select("id, naam, email, telefoon, onderwerp, bericht, status, created_at")
      .order("created_at", { ascending: false });
    afspraken = resultAfspraken.data as any[];
    afsprakenError = resultAfspraken.error;

    const resultNews = await supabase
      .from("haruna_newsletter_subscribers")
      .select("id, email, source, status, created_at")
      .order("created_at", { ascending: false });
    newsletterSubs = resultNews.data as any[];
    newsletterError = resultNews.error;

    const resultAudit = await supabase
      .from("haruna_admin_audit_log")
      .select("id, admin_session, admin_user, kind, record_id, previous_status, new_status, created_at")
      .order("created_at", { ascending: false })
      .limit(50);
    auditLogs = resultAudit.data as any[];
    auditLogsError = resultAudit.error;
  }

  return (
    <>
      <Header />
      <main className="pb-24 md:pb-20">
        <section className="bg-nbg-lighter-green pt-12 lg:pt-16 pb-10 lg:pb-12 border-b border-nbg-light-gray/40">
          <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">
              Admin
            </p>
            <h1 className="text-nbg-blue text-3xl sm:text-4xl font-bold tracking-tight">
              Haruna Admin
            </h1>
            <p className="mt-3 text-nbg-blue/70 text-[15px]">
              Alleen voor intern gebruik.
            </p>
          </div>
        </section>

        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          {!isAuthed ? (
            <div className="max-w-[520px] mx-auto rounded-2xl bg-white border border-nbg-light-gray/60 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <h2 className="text-nbg-blue text-xl font-bold m-0 mb-2">
                Inloggen
              </h2>
              {searchParams?.error ? (
                <p className="text-[15px] text-red-600 m-0 mb-4">
                  Onjuiste wachtwoord.
                </p>
              ) : (
                <p className="text-[15px] text-nbg-blue/70 m-0 mb-4">
                  Voer het admin wachtwoord in.
                </p>
              )}

              <form action={loginAction} className="space-y-4">
                <label className="block">
                  <span className="text-nbg-blue font-semibold text-[15px]">
                    Wachtwoord
                  </span>
                  <input
                    name="password"
                    type="password"
                    required
                    className="mt-1 w-full rounded-lg border border-nbg-light-gray bg-white px-4 py-2.5 text-nbg-blue shadow-sm focus:outline-none focus:ring-2 focus:ring-nbg-green/40"
                    autoComplete="current-password"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3.5 hover:bg-nbg-green/90 transition-colors"
                >
                  Inloggen
                </button>
              </form>

              <div className="mt-6 text-[13px] text-nbg-blue/60">
                Tip: controleer de adminwachtwoord-waarde in de Supabase table{" "}
                <span className="font-semibold text-nbg-blue">haruna_admin</span>.
              </div>
              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline"
                >
                  ← Naar home
                </Link>
              </div>
            </div>
          ) : (
            <>
              <section className="mt-6">
                <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">
                  Aanvragen
                </h2>
                {!afsprakenError && (!afspraken || afspraken.length === 0) ? (
                  <p className="text-nbg-blue/70 m-0">Geen aanvragen gevonden.</p>
                ) : null}

                {afsprakenError ? (
                  <p className="text-red-600 m-0">
                    Kan afspraken niet laden. Waarschijnlijk ontbreken statuskolommen of de tabel bestaat niet.
                  </p>
                ) : null}

                <div className="overflow-x-auto rounded-2xl border border-nbg-light-gray/60 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <table className="w-full text-left">
                    <thead className="bg-nbg-lighter-green/60 text-nbg-blue text-sm">
                      <tr>
                        <th className="p-4">Datum</th>
                        <th className="p-4">Naam</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Onderwerp</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-nbg-light-gray">
                      {(afspraken ?? []).map((a: any) => (
                        <tr key={a.id} className="align-top">
                          <td className="p-4 text-[15px] text-nbg-blue/80">
                            {a.created_at ? formatDate(a.created_at) : "-"}
                          </td>
                          <td className="p-4 text-[15px] text-nbg-blue/80">
                            {a.naam ?? "-"}
                          </td>
                          <td className="p-4 text-[15px] text-nbg-blue/80">
                            <div className="font-medium">{a.email ?? "-"}</div>
                            {a.telefoon ? <div className="text-nbg-blue/70">{a.telefoon}</div> : null}
                          </td>
                          <td className="p-4 text-[15px] text-nbg-blue/80">
                            <div className="font-medium">{a.onderwerp ?? "-"}</div>
                            {a.bericht ? (
                              <div className="text-nbg-blue/70 mt-1">{String(a.bericht).slice(0, 160)}{String(a.bericht).length > 160 ? "…" : ""}</div>
                            ) : null}
                          </td>
                          <td className="p-4">
                            <form action={updateStatusAction} className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <input type="hidden" name="kind" value="afspraken" />
                              <input type="hidden" name="id" value={a.id} />
                              <select
                                name="status"
                                defaultValue={a.status ?? "nieuw"}
                                className="rounded-lg border border-nbg-light-gray bg-white px-3 py-2.5 text-nbg-blue shadow-sm focus:outline-none focus:ring-2 focus:ring-nbg-green/40"
                              >
                                <option value="nieuw">Nieuw</option>
                                <option value="beantwoord">Beantwoord</option>
                              </select>
                              <button
                                type="submit"
                                className="rounded-lg bg-nbg-blue text-white font-semibold text-[14px] px-4 py-2.5 hover:bg-nbg-dark-blue transition-colors"
                              >
                                Opslaan
                              </button>
                            </form>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mt-12">
                <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">
                  Nieuwsbrief inschrijvingen
                </h2>
                {newsletterError ? (
                  <p className="text-red-600 m-0">
                    Kan nieuwsbrief-inschrijvingen niet laden. Waarschijnlijk ontbreken statuskolommen of de tabel bestaat niet.
                  </p>
                ) : null}

                <div className="overflow-x-auto rounded-2xl border border-nbg-light-gray/60 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] mt-4">
                  <table className="w-full text-left">
                    <thead className="bg-nbg-lighter-green/60 text-nbg-blue text-sm">
                      <tr>
                        <th className="p-4">Datum</th>
                        <th className="p-4">E-mail</th>
                        <th className="p-4">Bron</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-nbg-light-gray">
                      {(newsletterSubs ?? []).map((n: any) => (
                        <tr key={n.id} className="align-top">
                          <td className="p-4 text-[15px] text-nbg-blue/80">
                            {n.created_at ? formatDate(n.created_at) : "-"}
                          </td>
                          <td className="p-4 text-[15px] text-nbg-blue/80">
                            {n.email ?? "-"}
                          </td>
                          <td className="p-4 text-[15px] text-nbg-blue/80">
                            {n.source ?? "-"}
                          </td>
                          <td className="p-4">
                            <form action={updateStatusAction} className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <input type="hidden" name="kind" value="newsletter" />
                              <input type="hidden" name="id" value={n.id} />
                              <select
                                name="status"
                                defaultValue={n.status ?? "nieuw"}
                                className="rounded-lg border border-nbg-light-gray bg-white px-3 py-2.5 text-nbg-blue shadow-sm focus:outline-none focus:ring-2 focus:ring-nbg-green/40"
                              >
                                <option value="nieuw">Nieuw</option>
                                <option value="beantwoord">Beantwoord</option>
                              </select>
                              <button
                                type="submit"
                                className="rounded-lg bg-nbg-blue text-white font-semibold text-[14px] px-4 py-2.5 hover:bg-nbg-dark-blue transition-colors"
                              >
                                Opslaan
                              </button>
                            </form>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mt-12 text-[13px] text-nbg-blue/60">
                <p className="m-0">
                  Vergeet niet: deze admin is niet bedoeld voor indexering. Als u wilt uitloggen, verwijder dan handmatig de admin cookie of herstart uw browser.
                </p>
              </section>

              <section className="mt-10">
                <h2 className="text-nbg-blue text-xl lg:text-2xl font-bold mb-4">
                  Audit log
                </h2>

                {auditLogsError ? (
                  <p className="text-red-600 m-0">
                    Kan audit-log niet laden. Waarschijnlijk ontbreekt de tabel `haruna_admin_audit_log`.
                  </p>
                ) : null}

                <div className="overflow-x-auto rounded-2xl border border-nbg-light-gray/60 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] mt-4">
                  <table className="w-full text-left">
                    <thead className="bg-nbg-lighter-green/60 text-nbg-blue text-sm">
                      <tr>
                        <th className="p-4">Tijd</th>
                        <th className="p-4">Wie</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Record</th>
                        <th className="p-4">Van → Naar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-nbg-light-gray">
                      {(auditLogs ?? []).map((l: any) => (
                        <tr key={l.id} className="align-top">
                          <td className="p-4 text-[15px] text-nbg-blue/80">
                            {l.created_at ? formatDate(l.created_at) : "-"}
                          </td>
                          <td className="p-4 text-[15px] text-nbg-blue/80">
                            {l.admin_user ? String(l.admin_user) : l.admin_session ? String(l.admin_session) : "-"}
                          </td>
                          <td className="p-4 text-[15px] text-nbg-blue/80">
                            {l.kind === "afspraken" ? "Aanvragen" : l.kind === "newsletter" ? "Nieuwsbrief" : l.kind ?? "-"}
                          </td>
                          <td className="p-4 text-[15px] text-nbg-blue/80">
                            {l.record_id ? String(l.record_id).slice(0, 8) + "…" : "-"}
                          </td>
                          <td className="p-4 text-[15px] text-nbg-blue/80">
                            <span className="font-medium">{l.previous_status ?? "—"}</span>
                            {" → "}
                            <span className="font-medium">{l.new_status ?? "—"}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

