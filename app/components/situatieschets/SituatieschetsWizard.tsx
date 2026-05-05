"use client";

import Link from "next/link";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";

import type { AfspraakTopicValue } from "@/lib/afspraak-topics";
import { SITUATIESCHETS_GATE_TOPICS } from "@/lib/afspraak-topics";
import { submitSituatieschetsAdviseur } from "@/app/situatieschets/actions";
import { HARUNA_LOGO_URL } from "@/lib/situatieschets/branding";
import { createEmptySituatieschetsState, type SituatieschetsFormState } from "@/lib/situatieschets/types";
import { validateAdviseurContact, validateWizardStep } from "@/lib/situatieschets/wizard-validation";

const inputClass =
  "w-full rounded-lg border border-nbg-light-gray px-4 py-3 text-nbg-blue placeholder:text-nbg-blue/50 focus:border-nbg-green focus:ring-2 focus:ring-nbg-green/20 outline-none transition-colors";
const labelClass = "block text-nbg-blue font-medium text-sm mb-1.5";
const selectClass = inputClass;

const WONING_OPTS: { value: NonNullable<SituatieschetsFormState["woningDoel"]>; label: string; hint: string }[] = [
  { value: "eerste_huis", label: "Eerste huis kopen", hint: "Nog geen eigen woning" },
  { value: "doorstromen", label: "Doorstromen", hint: "Huidige woning verkopen of verkocht" },
  { value: "oversluiten", label: "Oversluiten", hint: "Bestaande hypotheek aanpassen" },
  { value: "tweede_hypotheek", label: "Tweede hypotheek", hint: "Overwaarde of extra lening" },
];

const DIENST_OPTS: { value: NonNullable<SituatieschetsFormState["dienstverband"]>; label: string }[] = [
  { value: "vast", label: "Vast contract" },
  { value: "tijdelijk", label: "Tijdelijk contract" },
  { value: "zzp", label: "ZZP / ondernemer" },
  { value: "pensioen", label: "VUT / pensioen" },
  { value: "uitkering", label: "Uitkering" },
  { value: "anders", label: "Anders" },
];

const TIJDLIJN_OPTS: { value: NonNullable<SituatieschetsFormState["tijdlijn"]>; label: string }[] = [
  { value: "zo_snel", label: "Zo snel mogelijk" },
  { value: "binnen_3", label: "Binnen 3 maanden" },
  { value: "3_tot_6", label: "3–6 maanden" },
  { value: "onzeker", label: "Nog niet zeker" },
];

function cardBtn(selected: boolean) {
  return `text-left rounded-xl border px-4 py-3.5 transition-colors w-full ${
    selected
      ? "border-nbg-green bg-nbg-lighter-green/70 text-nbg-blue shadow-[0_2px_10px_rgba(118,163,72,0.12)]"
      : "border-nbg-light-gray text-nbg-blue hover:border-nbg-green/60 hover:bg-nbg-lighter-green/40"
  }`;
}

async function downloadSituatieschetsPdf(state: SituatieschetsFormState, logoDataUrl: string | null) {
  const [{ pdf }, { SituatieschetsPdfDocument }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("./SituatieschetsPdf"),
  ]);
  const generatedAt = new Date().toLocaleString("nl-NL", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const renderToBlob = (logo: string | null | undefined) =>
    pdf(
      <SituatieschetsPdfDocument
        data={state}
        logoDataUrl={logo ?? undefined}
        generatedAt={generatedAt}
      />
    ).toBlob();

  let blob: Blob;
  try {
    blob = await renderToBlob(logoDataUrl);
  } catch (err) {
    console.error("[situatieschets] PDF render failed (with logo if any)", err);
    if (logoDataUrl) {
      try {
        blob = await renderToBlob(null);
      } catch (err2) {
        console.error("[situatieschets] PDF render failed without logo", err2);
        throw err2;
      }
    } else {
      throw err;
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Haruna-hypotheek-situatieschets.pdf";
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const adviseurInitial = { success: false as boolean, error: undefined as string | undefined };

export default function SituatieschetsWizard() {
  const [data, setData] = useState<SituatieschetsFormState>(() => createEmptySituatieschetsState());
  const [topicGate, setTopicGate] = useState(true);
  const [gateChoice, setGateChoice] = useState<AfspraakTopicValue | null>(null);
  const [step, setStep] = useState(1);
  const [stepError, setStepError] = useState<string | null>(null);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [busyPdf, setBusyPdf] = useState(false);
  const [pdfOnlyDone, setPdfOnlyDone] = useState(false);
  const [adviseurState, adviseurAction, adviseurPending] = useActionState(
    submitSituatieschetsAdviseur,
    adviseurInitial
  );
  const downloadedAfterMail = useRef(false);

  const schetsJson = useMemo(() => JSON.stringify(data), [data]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(HARUNA_LOGO_URL);
        const blob = await res.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          if (!cancelled && typeof reader.result === "string") setLogoDataUrl(reader.result);
        };
        reader.readAsDataURL(blob);
      } catch {
        if (!cancelled) setLogoDataUrl(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (adviseurState.success && !downloadedAfterMail.current) {
      downloadedAfterMail.current = true;
      void (async () => {
        try {
          await downloadSituatieschetsPdf(data, logoDataUrl);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [adviseurState.success, data, logoDataUrl]);

  function patch(p: Partial<SituatieschetsFormState>) {
    setData((d) => ({ ...d, ...p }));
    setStepError(null);
  }

  function next() {
    if (topicGate) {
      if (!gateChoice) {
        setStepError("Kies eerst waar u hulp bij wilt.");
        return;
      }
      if (gateChoice !== "hypotheek") {
        setStepError(null);
        window.location.assign(`/contact?onderwerp=${encodeURIComponent(gateChoice)}#formulier`);
        return;
      }
      setStepError(null);
      setTopicGate(false);
      return;
    }
    const err = validateWizardStep(step, data);
    if (err) {
      setStepError(err);
      return;
    }
    setStep((s) => Math.min(8, s + 1));
  }

  function prev() {
    setStepError(null);
    if (!topicGate && step <= 1) {
      setTopicGate(true);
      return;
    }
    setStep((s) => Math.max(1, s - 1));
  }

  const maxYear = new Date().getFullYear() - 18;
  const years = useMemo(() => {
    const y: number[] = [];
    for (let i = maxYear; i >= 1940; i--) y.push(i);
    return y;
  }, [maxYear]);

  if (adviseurState.success) {
    return (
      <div className="rounded-xl bg-nbg-lighter-green/60 border border-nbg-green/20 p-8 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-nbg-green/15 text-nbg-green mb-5">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-nbg-blue text-xl font-bold m-0">Bedankt — uw verzoek is binnen</h3>
        <p className="mt-2 text-nbg-blue/80 text-[17px] max-w-md mx-auto m-0">
          Uw situatieschets-PDF is op uw apparaat gezet. We nemen binnen een werkdag contact met u op voor een korte
          meekijk.
        </p>
        <p className="mt-4 m-0">
          <Link href="/contact" className="text-nbg-primary font-semibold hover:underline">
            Liever direct contact?
          </Link>
        </p>
      </div>
    );
  }

  if (pdfOnlyDone) {
    return (
      <div className="rounded-xl bg-nbg-lighter-green/60 border border-nbg-green/20 p-8 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-nbg-green/15 text-nbg-green mb-5">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-nbg-blue text-xl font-bold m-0">Uw PDF staat klaar</h3>
        <p className="mt-2 text-nbg-blue/80 text-[17px] max-w-lg mx-auto m-0">
          De download zou automatisch moeten starten. Bewaar het bestand of deel het met een adviseur wanneer u wilt.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            disabled={busyPdf}
            onClick={async () => {
              setBusyPdf(true);
              try {
                await downloadSituatieschetsPdf(data, logoDataUrl);
              } finally {
                setBusyPdf(false);
              }
            }}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-nbg-primary text-nbg-primary font-semibold text-[15px] px-6 py-3 hover:bg-nbg-primary hover:text-white transition-colors disabled:opacity-50"
          >
            {busyPdf ? "Bezig…" : "Opnieuw downloaden"}
          </button>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-6 py-3 hover:bg-nbg-green/90 transition-colors"
          >
            Plan een kort gesprek
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-nbg-light-gray bg-white shadow-[0_8px_30px_rgba(27,49,86,0.08)] p-6 sm:p-8 lg:p-10">
      {topicGate ? (
        <div className="mb-2">
          <p className="text-sm text-nbg-blue/70 m-0 mb-4">Stap 1 · waar kunnen we u mee helpen?</p>
        </div>
      ) : (
        <div className="mb-6">
          <div className="h-2 rounded-full bg-nbg-light-gray overflow-hidden">
            <div
              className="h-full bg-nbg-green transition-[width] duration-300"
              style={{ width: `${(step / 8) * 100}%` }}
              role="progressbar"
              aria-valuenow={step}
              aria-valuemin={1}
              aria-valuemax={8}
            />
          </div>
          <p className="mt-2 text-sm text-nbg-blue/70 m-0">
            Hypotheek-PDF: stap {step} van 8
            {step <= 6 ? " · geen account nodig" : ""}
          </p>
        </div>
      )}

      {stepError ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[15px] text-red-800 mb-6 m-0" role="alert">
          {stepError}
        </p>
      ) : null}

      {topicGate ? (
        <div className="space-y-6">
          <div>
            <h2 className="text-nbg-blue text-xl font-bold m-0 mb-2">Waar wilt u mee verder?</h2>
            <p className="text-nbg-blue/75 text-[15px] m-0">
              De PDF-situatieschets is bedoeld voor <strong className="text-nbg-blue">hypotheek</strong>. Voor pensioen,
              verzekeringen of financiering plannen we het liefst een kort gesprek — het formulier opent met het juiste
              onderwerp al voor u gekozen.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SITUATIESCHETS_GATE_TOPICS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => {
                    setGateChoice(o.value);
                    setStepError(null);
                  }}
                  className={cardBtn(gateChoice === o.value)}
                  aria-pressed={gateChoice === o.value}
                >
                  <span className="font-semibold block">{o.label}</span>
                  <span className="text-sm text-nbg-blue/70">{o.hint}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-4 border-t border-nbg-light-gray">
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-2 rounded-xl bg-nbg-green text-white font-semibold text-[17px] px-8 py-4 shadow-[0_4px_14px_rgba(118,163,72,0.35)] hover:bg-nbg-green/90"
            >
              Verder
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      ) : null}

      {!topicGate && step === 1 ? (
        <div className="space-y-8">
          <div>
            <h2 className="text-nbg-blue text-xl font-bold m-0 mb-2">Wat is uw situatie?</h2>
            <p className="text-nbg-blue/75 text-[15px] m-0">Waar bent u mee bezig?</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {WONING_OPTS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => patch({ woningDoel: o.value })}
                  className={cardBtn(data.woningDoel === o.value)}
                  aria-pressed={data.woningDoel === o.value}
                >
                  <span className="font-semibold block">{o.label}</span>
                  <span className="text-sm text-nbg-blue/70">{o.hint}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-nbg-blue text-lg font-bold m-0 mb-2">Wie vraagt de hypotheek aan?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(
                [
                  { value: "alleen" as const, label: "Alleen" },
                  { value: "partner" as const, label: "Met partner" },
                ] as const
              ).map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => patch({ aanvrager: o.value })}
                  className={cardBtn(data.aanvrager === o.value)}
                  aria-pressed={data.aanvrager === o.value}
                >
                  <span className="font-semibold">{o.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {!topicGate && step === 2 ? (
        <div className="space-y-6">
          <h2 className="text-nbg-blue text-xl font-bold m-0">Even uzelf voorstellen</h2>
          <p className="text-nbg-blue/75 text-[15px] m-0">Alleen wat relevant is voor uw situatieschets.</p>
          <div>
            <span className={labelClass}>Geboortedatum</span>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="gb-dag" className="text-xs text-nbg-blue/60 block mb-1">
                  Dag
                </label>
                <select
                  id="gb-dag"
                  className={selectClass}
                  value={data.geboorteDag}
                  onChange={(e) => patch({ geboorteDag: e.target.value })}
                >
                  <option value="">—</option>
                  {Array.from({ length: 31 }, (_, i) => String(i + 1)).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="gb-maand" className="text-xs text-nbg-blue/60 block mb-1">
                  Maand
                </label>
                <select
                  id="gb-maand"
                  className={selectClass}
                  value={data.geboorteMaand}
                  onChange={(e) => patch({ geboorteMaand: e.target.value })}
                >
                  <option value="">—</option>
                  {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="gb-jaar" className="text-xs text-nbg-blue/60 block mb-1">
                  Jaar
                </label>
                <select
                  id="gb-jaar"
                  className={selectClass}
                  value={data.geboorteJaar}
                  onChange={(e) => patch({ geboorteJaar: e.target.value })}
                >
                  <option value="">—</option>
                  {years.map((y) => (
                    <option key={y} value={String(y)}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-xs text-nbg-blue/60 mt-2 m-0">Dag, maand en jaar apart — voorkomt verwarring.</p>
          </div>
          <div>
            <label htmlFor="burger" className={labelClass}>
              Burgerlijke staat
            </label>
            <select
              id="burger"
              className={selectClass}
              value={data.burgerlijkeStaat}
              onChange={(e) =>
                patch({ burgerlijkeStaat: e.target.value as SituatieschetsFormState["burgerlijkeStaat"] })
              }
            >
              <option value="">Kies…</option>
              <option value="ongehuwd">Ongehuwd / alleenstaand</option>
              <option value="gehuwd">Gehuwd</option>
              <option value="samenwonend">Samenwonend</option>
              <option value="gescheiden">Gescheiden</option>
              <option value="weduwe">Weduwe / weduwnaar</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <span className={labelClass}>Kinderen (optioneel)</span>
              <p className="text-[13px] text-nbg-blue/70 leading-relaxed m-0 mb-2 mt-1 max-w-xl">
                Voor het duiden van uw <strong className="text-nbg-blue">huishouden</strong>: zijn er kinderen die
                financieel van u afhangen? Dat helpt later bij het bespreken van zekerheden (bijv. risico’s bij
                overlijden) — niet om u te beoordelen. Mag u overslaan.
              </p>
              <div className="flex gap-2 max-w-md">
                {(["nee", "ja"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => patch({ heeftKinderen: v })}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${
                      data.heeftKinderen === v ? "border-nbg-green bg-nbg-lighter-green" : "border-nbg-light-gray"
                    }`}
                  >
                    {v === "ja" ? "Ja" : "Nee"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className={labelClass}>Rookt u? (optioneel)</span>
              <p className="text-[13px] text-nbg-blue/70 leading-relaxed m-0 mb-2 mt-1 max-w-xl">
                Bij sommige <strong className="text-nbg-blue">verzekeringen</strong> (bijv. levens- of
                overlijdensrisico) kan roken invloed hebben op premie of aanvaarding. Uw adviseur weet dan waar hij op
                moet letten — geen verplicht veld.
              </p>
              <div className="flex gap-2 max-w-md">
                {(["nee", "ja"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => patch({ rookt: v })}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${
                      data.rookt === v ? "border-nbg-green bg-nbg-lighter-green" : "border-nbg-light-gray"
                    }`}
                  >
                    {v === "ja" ? "Ja" : "Nee"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {!topicGate && step === 3 ? (
        <div className="space-y-6">
          <h2 className="text-nbg-blue text-xl font-bold m-0">Uw inkomen</h2>
          <p className="text-nbg-blue/75 text-[15px] m-0">
            Bruto per jaar, vóór belasting. Dat is waar geldverstrekkers globaal naar kijken — uw adviseur toetst het
            exact.
          </p>
          <div>
            <label htmlFor="bruto" className={labelClass}>
              Bruto jaarinkomen <span className="text-nbg-green">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-nbg-blue/50">€</span>
              <input
                id="bruto"
                className={`${inputClass} pl-8`}
                inputMode="decimal"
                placeholder="bijv. 55.000 of 55000"
                value={data.brutoJaar}
                onChange={(e) => patch({ brutoJaar: e.target.value })}
              />
            </div>
          </div>
          <div>
            <span className={labelClass}>Dienstverband</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DIENST_OPTS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => patch({ dienstverband: o.value })}
                  className={cardBtn(data.dienstverband === o.value)}
                  aria-pressed={data.dienstverband === o.value}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          {data.aanvrager === "partner" ? (
            <>
              <div>
                <label htmlFor="bruto-p" className={labelClass}>
                  Partner: bruto jaarinkomen <span className="text-nbg-green">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-nbg-blue/50">€</span>
                  <input
                    id="bruto-p"
                    className={`${inputClass} pl-8`}
                    inputMode="decimal"
                    placeholder="bijv. 48.000"
                    value={data.brutoJaarPartner}
                    onChange={(e) => patch({ brutoJaarPartner: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <span className={labelClass}>Partner: dienstverband</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DIENST_OPTS.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => patch({ dienstverbandPartner: o.value })}
                      className={cardBtn(data.dienstverbandPartner === o.value)}
                      aria-pressed={data.dienstverbandPartner === o.value}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : null}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-nbg-light-gray text-nbg-green focus:ring-nbg-green/30"
              checked={data.heeftVariabel}
              onChange={(e) => patch({ heeftVariabel: e.target.checked })}
            />
            <span className="text-nbg-blue text-[15px]">Ontvang ik ook variabel inkomen of bonus?</span>
          </label>
          {data.heeftVariabel ? (
            <div className="rounded-xl border border-nbg-light-gray bg-nbg-lighter-green/30 p-4 space-y-4">
              <div>
                <label htmlFor="var-bruto" className={labelClass}>
                  Gemiddeld per jaar (bruto)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-nbg-blue/50">€</span>
                  <input
                    id="var-bruto"
                    className={`${inputClass} pl-8`}
                    inputMode="decimal"
                    value={data.variabelBrutoJaar}
                    onChange={(e) => patch({ variabelBrutoJaar: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <span className={labelClass}>Hoe zeker is dit inkomen?</span>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { value: "onszeker" as const, label: "Onzeker" },
                      { value: "redelijk" as const, label: "Redelijk zeker" },
                      { value: "zeker" as const, label: "Zeker" },
                    ] as const
                  ).map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => patch({ variabelZekerheid: o.value })}
                      className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                        data.variabelZekerheid === o.value ? "border-nbg-green bg-white" : "border-nbg-light-gray"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {!topicGate && step === 4 ? (
        <div className="space-y-6">
          <h2 className="text-nbg-blue text-xl font-bold m-0">Lopende leningen en lasten</h2>
          <p className="text-nbg-blue/75 text-[15px] m-0">Geen schulden? Laat velden leeg — dat kan uw draagkracht ten goede komen.</p>
          <div>
            <label htmlFor="duo" className={labelClass}>
              Studieschuld — oorspronkelijk geleend bedrag
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-nbg-blue/50">€</span>
              <input
                id="duo"
                className={`${inputClass} pl-8`}
                inputMode="decimal"
                placeholder="0"
                value={data.studieschuld}
                onChange={(e) => patch({ studieschuld: e.target.value })}
              />
            </div>
            <p className="text-xs text-nbg-blue/60 mt-1 m-0">DUO-schulden vóór 2015 wegen zwaarder — een adviseur rekent dit exact.</p>
          </div>
          <div>
            <label htmlFor="lease" className={labelClass}>
              Autolease — huidige maandbedrag
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-nbg-blue/50">€</span>
              <input
                id="lease"
                className={`${inputClass} pl-8`}
                inputMode="decimal"
                placeholder="0"
                value={data.autoleaseMaand}
                onChange={(e) => patch({ autoleaseMaand: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="pl" className={labelClass}>
              Persoonlijke lening — totaal openstaand
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-nbg-blue/50">€</span>
              <input
                id="pl"
                className={`${inputClass} pl-8`}
                inputMode="decimal"
                placeholder="0"
                value={data.persoonlijkeLening}
                onChange={(e) => patch({ persoonlijkeLening: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className={labelClass}>Betaalt u alimentatie?</span>
              <div className="flex gap-2">
                {(["nee", "ja"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => patch({ betaaltAlimentatie: v })}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${
                      data.betaaltAlimentatie === v ? "border-nbg-green bg-nbg-lighter-green" : "border-nbg-light-gray"
                    }`}
                  >
                    {v === "ja" ? "Ja" : "Nee"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className={labelClass}>Creditcard of doorlopend krediet?</span>
              <div className="flex gap-2">
                {(["nee", "ja"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => patch({ creditcardKrediet: v })}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${
                      data.creditcardKrediet === v ? "border-nbg-green bg-nbg-lighter-green" : "border-nbg-light-gray"
                    }`}
                  >
                    {v === "ja" ? "Ja" : "Nee"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {!topicGate && step === 5 ? (
        <div className="space-y-6">
          <h2 className="text-nbg-blue text-xl font-bold m-0">De woning</h2>
          <p className="text-nbg-blue/75 text-[15px] m-0">Nog geen woning op het oog? Vul dan uw streefbedrag in.</p>
          <div>
            <label htmlFor="koop" className={labelClass}>
              Koopsom / streefbedrag
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-nbg-blue/50">€</span>
              <input
                id="koop"
                className={`${inputClass} pl-8`}
                inputMode="decimal"
                placeholder="bijv. 350.000"
                value={data.koopsom}
                onChange={(e) => patch({ koopsom: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="eigen" className={labelClass}>
              Eigen geld beschikbaar
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-nbg-blue/50">€</span>
              <input
                id="eigen"
                className={`${inputClass} pl-8`}
                inputMode="decimal"
                placeholder="bijv. 35.000"
                value={data.eigenGeld}
                onChange={(e) => patch({ eigenGeld: e.target.value })}
              />
            </div>
            <p className="text-xs text-nbg-blue/60 mt-1 m-0">Kosten koper zijn globaal circa 5–6% van de koopsom.</p>
          </div>
          <div>
            <span className={labelClass}>Gewenste tijdlijn</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TIJDLIJN_OPTS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => patch({ tijdlijn: o.value })}
                  className={cardBtn(data.tijdlijn === o.value)}
                  aria-pressed={data.tijdlijn === o.value}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {!topicGate && step === 6 ? (
        <div className="space-y-6">
          <h2 className="text-nbg-blue text-xl font-bold m-0">Een paar korte vragen</h2>
          <p className="text-nbg-blue/75 text-[15px] m-0">Helpt een adviseur om het gesprek af te stemmen. Mag u overslaan.</p>
          {(
            [
              {
                key: "pensioenInkomenWeet" as const,
                label: "Weet u wat uw inkomen wordt als u met pensioen gaat?",
              },
              { key: "werkloosheidWeet" as const, label: "Weet u wat er gebeurt met uw inkomen bij werkloosheid?" },
              {
                key: "arbeidsongeschiktWeet" as const,
                label: "Weet u wat er gebeurt bij arbeidsongeschiktheid?",
              },
            ] as const
          ).map((row) => (
            <div key={row.key}>
              <span className={labelClass}>{row.label}</span>
              <div className="flex flex-wrap gap-2">
                {(["niet", "redelijk", "goed"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => patch({ [row.key]: v })}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                      data[row.key] === v ? "border-nbg-green bg-nbg-lighter-green" : "border-nbg-light-gray"
                    }`}
                  >
                    {v === "niet" ? "Niet" : v === "redelijk" ? "Redelijk" : "Goed"}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div>
            <span className={labelClass}>Heeft u eerder een hypotheek afgesloten?</span>
            <div className="flex gap-2 max-w-xs">
              {(["nee", "ja"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => patch({ eerderHypotheek: v })}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${
                    data.eerderHypotheek === v ? "border-nbg-green bg-nbg-lighter-green" : "border-nbg-light-gray"
                  }`}
                >
                  {v === "ja" ? "Ja" : "Nee"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className={labelClass}>Hoe beoordeelt u uw eigen financiële kennis?</span>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { value: "laag" as const, label: "Laag" },
                  { value: "redelijk" as const, label: "Redelijk" },
                  { value: "goed" as const, label: "Goed" },
                  { value: "zeer_goed" as const, label: "Zeer goed" },
                ] as const
              ).map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => patch({ financieleKennis: o.value })}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                    data.financieleKennis === o.value ? "border-nbg-green bg-nbg-lighter-green" : "border-nbg-light-gray"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {!topicGate && step === 7 ? (
        <div className="space-y-6">
          <h2 className="text-nbg-blue text-xl font-bold m-0">Laatste stap</h2>
          <p className="text-nbg-blue/80 text-[15px] m-0">
            Download uw PDF direct op dit apparaat. Kies alleen het bestand, of laat een AFM-erkend adviseur van Haruna
            uw situatieschets kort meekijken (gratis, vrijblijvend).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              disabled={busyPdf}
              onClick={async () => {
                setStepError(null);
                setBusyPdf(true);
                try {
                  await downloadSituatieschetsPdf(data, logoDataUrl);
                  setPdfOnlyDone(true);
                } catch (err) {
                  console.error("[situatieschets] PDF download", err);
                  setStepError(
                    "PDF genereren mislukt. Vernieuw de pagina en probeer opnieuw, of schakel tijdelijk advertentie- of privacyblokkering uit voor deze site."
                  );
                } finally {
                  setBusyPdf(false);
                }
              }}
              className="text-left rounded-xl border-2 border-nbg-light-gray bg-white p-5 hover:border-nbg-primary/50 transition-colors disabled:opacity-50"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-nbg-blue/60">Zelf verder</span>
              <span className="block text-lg font-bold text-nbg-blue mt-1">Alleen mijn PDF downloaden</span>
              <span className="block text-sm text-nbg-blue/75 mt-2">Geen contactgegevens nodig.</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setStepError(null);
                setStep(8);
              }}
              className="text-left rounded-xl border-2 border-nbg-green bg-nbg-lighter-green/50 p-5 hover:bg-nbg-lighter-green transition-colors shadow-[0_4px_14px_rgba(118,163,72,0.15)]"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-nbg-green">Aanrader</span>
              <span className="block text-lg font-bold text-nbg-blue mt-1">Ja, laat een adviseur meekijken (gratis)</span>
              <span className="block text-sm text-nbg-blue/75 mt-2">Korte check op gemiste ruimte en uw volgende stap.</span>
            </button>
          </div>
          <p className="text-xs text-nbg-blue/60 m-0">
            Tip: sla de PDF op of print hem mee naar een gesprek met een erkend adviseur.
          </p>
        </div>
      ) : null}

      {!topicGate && step === 8 ? (
        <form
          action={adviseurAction}
          className="space-y-5"
          onSubmit={(e) => {
            const err = validateAdviseurContact(data);
            if (err) {
              e.preventDefault();
              setStepError(err);
            }
          }}
        >
          <h2 className="text-nbg-blue text-xl font-bold m-0">Contact voor adviseur</h2>
          <p className="text-nbg-blue/80 text-[15px] m-0">
            Vul in hoe we u kunnen bereiken. Uw PDF wordt na het versturen direct gedownload.
          </p>
          <div className="rounded-lg border border-nbg-light-gray bg-nbg-lighter-green/40 px-4 py-3 text-[13px] text-nbg-blue/80 leading-relaxed">
            <p className="m-0">
              Uw antwoorden en contactgegevens worden <strong className="text-nbg-blue">veilig opgeslagen</strong> in
              ons klantsysteem (Supabase) zodat Haruna uw verzoek kan verwerken en een adviseur u kan terugbellen. Alleen
              voor dit verzoek, conform ons{" "}
              <Link href="/privacy" className="text-nbg-primary font-semibold hover:underline">
                privacybeleid
              </Link>
              .
            </p>
          </div>
          <input type="hidden" name="schets_json" value={schetsJson} readOnly />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            <input name="nb_hp" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          {adviseurState.error ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[15px] text-red-800 m-0" role="alert">
              {adviseurState.error}
            </p>
          ) : null}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="vn" className={labelClass}>
                Voornaam <span className="text-nbg-green">*</span>
              </label>
              <input
                id="vn"
                name="voornaam"
                required
                className={inputClass}
                value={data.voornaam}
                onChange={(e) => patch({ voornaam: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="an" className={labelClass}>
                Achternaam <span className="text-nbg-green">*</span>
              </label>
              <input
                id="an"
                name="achternaam"
                required
                className={inputClass}
                value={data.achternaam}
                onChange={(e) => patch({ achternaam: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label htmlFor="em" className={labelClass}>
              E-mailadres <span className="text-nbg-green">*</span>
            </label>
            <input
              id="em"
              name="email"
              type="email"
              required
              className={inputClass}
              value={data.email}
              onChange={(e) => patch({ email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="tel" className={labelClass}>
              Telefoonnummer <span className="text-nbg-green">*</span>
            </label>
            <input
              id="tel"
              name="telefoon"
              type="tel"
              required
              className={inputClass}
              placeholder="06 –"
              value={data.telefoon}
              onChange={(e) => patch({ telefoon: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="opm" className={labelClass}>
              Opmerkingen (optioneel)
            </label>
            <textarea
              id="opm"
              name="opmerkingen"
              rows={3}
              maxLength={300}
              className={`${inputClass} resize-none`}
              placeholder="Beste adviseur, dit is mijn situatieschets…"
              value={data.opmerkingen}
              onChange={(e) => patch({ opmerkingen: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="spam_check" className={labelClass}>
              Anti-bot: wat is 3 + 4? <span className="text-nbg-green">*</span>
            </label>
            <input
              id="spam_check"
              name="spam_check"
              type="text"
              inputMode="numeric"
              required
              className={inputClass}
              placeholder="Antwoord"
            />
          </div>
          <label className="flex items-start gap-2.5 text-sm text-nbg-blue/80">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-0.5 h-4 w-4 rounded border-nbg-light-gray text-nbg-green focus:ring-nbg-green/30"
            />
            <span>
              Door dit formulier te versturen ga ik akkoord dat Haruna (AFM-erkend hypotheekadviseur) mij mag bellen of
              mailen over deze situatieschets — alleen voor dit verzoek, vrijblijvend. Zie ook het{" "}
              <Link href="/privacy" className="text-nbg-primary hover:underline">
                privacybeleid
              </Link>
              .
            </span>
          </label>
          <div className="flex flex-wrap gap-3 pt-2">
            <button type="button" onClick={() => setStep(7)} className="text-nbg-primary font-semibold px-4 py-2 hover:underline">
              Vorige
            </button>
            <button
              type="submit"
              disabled={adviseurPending}
              className="inline-flex items-center gap-2 rounded-xl bg-nbg-green text-white font-semibold text-[17px] px-8 py-4 shadow-[0_4px_14px_rgba(118,163,72,0.35)] hover:bg-nbg-green/90 disabled:opacity-60"
            >
              {adviseurPending ? "Bezig…" : "Verstuur en download PDF"}
            </button>
          </div>
        </form>
      ) : null}

      {!topicGate && step < 7 ? (
        <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-nbg-light-gray">
          <button
            type="button"
            onClick={prev}
            disabled={false}
            className="text-nbg-primary font-semibold px-4 py-2 hover:underline disabled:opacity-40 disabled:no-underline"
          >
            Vorige
          </button>
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center gap-2 rounded-xl bg-nbg-green text-white font-semibold text-[17px] px-8 py-4 shadow-[0_4px_14px_rgba(118,163,72,0.35)] hover:bg-nbg-green/90"
          >
            Volgende
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      ) : !topicGate && step === 7 ? (
        <div className="mt-8 pt-6 border-t border-nbg-light-gray">
          <button type="button" onClick={prev} className="text-nbg-primary font-semibold px-4 py-2 hover:underline">
            Vorige
          </button>
        </div>
      ) : null}
    </div>
  );
}
