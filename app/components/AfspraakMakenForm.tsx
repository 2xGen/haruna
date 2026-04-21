"use client";

import { FormEvent, useActionState, useMemo, useState } from "react";

import { submitAfspraakForm } from "../contact/actions";

const initialState = { success: false as boolean, error: undefined as string | undefined };
const TOPIC_OPTIONS = [
  { value: "hypotheek", label: "Hypotheken", hint: "Kopen, oversluiten, maandlasten", icon: "home" },
  { value: "pensioen", label: "Pensioen", hint: "Inzicht, opbouw, keuzes", icon: "chart" },
  { value: "verzekeringen", label: "Verzekeringen", hint: "Particulier en zakelijk", icon: "shield" },
  { value: "financiering", label: "Financiering", hint: "Zakelijk of particulier", icon: "briefcase" },
  { value: "overig", label: "Overig", hint: "Andere vraag of onderwerp", icon: "chat" },
] as const;
type TopicValue = (typeof TOPIC_OPTIONS)[number]["value"];

function TopicIcon({ icon }: { icon: (typeof TOPIC_OPTIONS)[number]["icon"] }) {
  if (icon === "home") {
    return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 11.5L12 4l9 7.5M6 10v10h12V10" />;
  }
  if (icon === "chart") {
    return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 19h16M7 15l3-3 2 2 5-6" />;
  }
  if (icon === "shield") {
    return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l7 3v6c0 4.5-2.6 7.7-7 9-4.4-1.3-7-4.5-7-9V6l7-3z" />;
  }
  if (icon === "briefcase") {
    return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8h18v11H3V8zm6 0V6h6v2M3 13h18" />;
  }
  return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h5M4 6h16v12H4V6z" />;
}

type Props = {
  presetOnderwerp?: TopicValue;
};

export default function AfspraakMakenForm({ presetOnderwerp }: Props) {
  const hasPresetOnderwerp = Boolean(presetOnderwerp);
  const [state, formAction, isPending] = useActionState(
    submitAfspraakForm,
    initialState
  );
  const [step, setStep] = useState<1 | 2>(hasPresetOnderwerp ? 2 : 1);
  const [onderwerp, setOnderwerp] = useState<string>(presetOnderwerp ?? "");
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [bericht, setBericht] = useState("");
  const [localSpamError, setLocalSpamError] = useState<string | null>(null);
  const [localFormError, setLocalFormError] = useState<string | null>(null);

  const showSpamCheck = useMemo(
    () => Boolean(naam.trim() && email.trim() && telefoon.trim()),
    [naam, email, telefoon]
  );

  if (state.success) {
    return (
      <div className="rounded-xl bg-nbg-lighter-green/60 border border-nbg-green/20 p-8 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-nbg-green/15 text-nbg-green mb-5">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-nbg-blue text-xl font-bold">Aanvraag ontvangen</h3>
        <p className="mt-2 text-nbg-blue/80 text-[17px] max-w-md mx-auto">
          Wij nemen zo snel mogelijk contact met u op om een afspraak in te plannen.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-nbg-light-gray px-4 py-3 text-nbg-blue placeholder:text-nbg-blue/50 focus:border-nbg-green focus:ring-2 focus:ring-nbg-green/20 outline-none transition-colors";
  const labelClass = "block text-nbg-blue font-medium text-sm mb-1.5";
  const formError = localSpamError ?? localFormError ?? state.error;

  function handleContinue() {
    if (!onderwerp) {
      setLocalFormError("Kies eerst waar wij u mee kunnen helpen.");
      return;
    }
    setLocalFormError(null);
    setStep(2);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!onderwerp) {
      event.preventDefault();
      setLocalFormError("Kies eerst waar wij u mee kunnen helpen.");
      setStep(1);
      return;
    }

    const ready = Boolean(naam.trim() && email.trim() && telefoon.trim());
    if (!ready) {
      event.preventDefault();
      setLocalFormError("Vul uw naam, e-mailadres en telefoonnummer in.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    if (showSpamCheck && ((formData.get("spam_check") as string) || "").trim() !== "7") {
      event.preventDefault();
      setLocalFormError(null);
      setLocalSpamError("Fout antwoord op de anti-bot vraag. Probeer het opnieuw.");
      return;
    }
    setLocalFormError(null);
    setLocalSpamError(null);
  }

  return (
    <form action={formAction} className="space-y-5" onSubmit={handleSubmit}>
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
      </div>
      {formError ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[15px] text-red-800 m-0"
          role="alert"
        >
          {formError}
        </p>
      ) : null}
      <p className="m-0 text-sm font-medium text-nbg-blue/70">Stap {step} van 2</p>

      <input type="hidden" name="onderwerp" value={onderwerp} />

      {step === 1 ? (
        <div className="space-y-4">
          <h3 className="text-nbg-blue text-lg font-bold m-0">
            {hasPresetOnderwerp ? "Onderwerp wijzigen" : "Waar kunnen we u mee helpen?"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOPIC_OPTIONS.map((option) => {
              const selected = onderwerp === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setOnderwerp(option.value);
                    setLocalFormError(null);
                  }}
                  className={`text-left rounded-xl border px-4 py-3.5 transition-colors ${
                    selected
                      ? "border-nbg-green bg-nbg-lighter-green/70 text-nbg-blue shadow-[0_2px_10px_rgba(118,163,72,0.12)]"
                      : "border-nbg-light-gray text-nbg-blue hover:border-nbg-green/60 hover:bg-nbg-lighter-green/40"
                  }`}
                  aria-pressed={selected}
                >
                  <span className="flex items-start justify-between gap-2.5">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-nbg-green shrink-0">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <TopicIcon icon={option.icon} />
                      </svg>
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold">{option.label}</span>
                      <span className="block text-sm text-nbg-blue/70 mt-0.5">{option.hint}</span>
                    </span>
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center rounded-full border shrink-0 mt-0.5 ${
                        selected ? "border-nbg-green bg-nbg-green text-white" : "border-nbg-light-gray text-transparent"
                      }`}
                      aria-hidden
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-nbg-green text-white font-semibold text-[17px] px-8 py-4 shadow-[0_4px_14px_rgba(118,163,72,0.35)] hover:bg-nbg-green/90 hover:shadow-[0_6px_20px_rgba(118,163,72,0.4)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Ga verder
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <p className="m-0 text-sm text-nbg-blue/70">
              {!hasPresetOnderwerp ? "Gekozen onderwerp: " : "Onderwerp: "}<span className="font-semibold text-nbg-blue">{TOPIC_OPTIONS.find((o) => o.value === onderwerp)?.label ?? onderwerp}</span>
            </p>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm font-medium text-nbg-primary hover:underline"
            >
              Wijzigen
            </button>
          </div>
          <div>
            <label htmlFor="naam" className={labelClass}>
              Naam <span className="text-nbg-green">*</span>
            </label>
            <input
              id="naam"
              name="naam"
              type="text"
              required
              className={inputClass}
              placeholder="Uw naam"
              value={naam}
              onChange={(e) => {
                setNaam(e.target.value);
                setLocalFormError(null);
              }}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              E-mail <span className="text-nbg-green">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className={inputClass}
              placeholder="uw@email.nl"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setLocalFormError(null);
              }}
            />
          </div>
          <div>
            <label htmlFor="telefoon" className={labelClass}>
              Telefoon <span className="text-nbg-green">*</span>
            </label>
            <input
              id="telefoon"
              name="telefoon"
              type="tel"
              required
              className={inputClass}
              placeholder="06 12345678"
              value={telefoon}
              onChange={(e) => {
                setTelefoon(e.target.value);
                setLocalFormError(null);
              }}
            />
          </div>
          <div>
            <label htmlFor="bericht" className={labelClass}>
              Bericht (optioneel)
            </label>
            <textarea
              id="bericht"
              name="bericht"
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="Vertel kort waar uw vraag over gaat…"
              value={bericht}
              onChange={(e) => setBericht(e.target.value)}
            />
          </div>
          {showSpamCheck ? (
            <div>
              <label htmlFor="spam_check" className={labelClass}>
                Anti-bot controlevraag: wat is 3 + 4? <span className="text-nbg-green">*</span>
              </label>
              <p className="m-0 mb-1.5 text-xs text-nbg-blue/70">Alleen om spam te voorkomen.</p>
              <input
                id="spam_check"
                name="spam_check"
                type="text"
                inputMode="numeric"
                required
                className={inputClass}
                placeholder="Vul het antwoord in"
                onChange={() => setLocalSpamError(null)}
              />
            </div>
          ) : null}
          <label className="flex items-start gap-2.5 text-sm text-nbg-blue/80">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-0.5 h-4 w-4 rounded border-nbg-light-gray text-nbg-green focus:ring-nbg-green/30"
            />
            <span>
              Ik ga akkoord met het{" "}
              <a href="/privacy" className="text-nbg-primary hover:underline">
                privacybeleid
              </a>{" "}
              en de{" "}
              <a href="/algemene-voorwaarden" className="text-nbg-primary hover:underline">
                algemene voorwaarden
              </a>
              .
            </span>
          </label>
          <p className="m-0 text-sm text-nbg-blue/70">Gratis en vrijblijvend. Duurt 20 minuten.</p>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-nbg-green text-white font-semibold text-[17px] px-8 py-4 shadow-[0_4px_14px_rgba(118,163,72,0.35)] hover:bg-nbg-green/90 hover:shadow-[0_6px_20px_rgba(118,163,72,0.4)] hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-[0_4px_14px_rgba(118,163,72,0.35)] transition-all duration-200"
          >
            {isPending ? "Bezig met versturen…" : "Plan mijn gratis kennismaking"}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </form>
  );
}
