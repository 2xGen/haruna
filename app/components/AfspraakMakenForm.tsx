"use client";

import { useActionState } from "react";

import { submitAfspraakForm } from "../contact/actions";

const initialState = { success: false as boolean, error: undefined as string | undefined };

export default function AfspraakMakenForm() {
  const [state, formAction, isPending] = useActionState(
    submitAfspraakForm,
    initialState
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

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[15px] text-red-800 m-0"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}
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
        />
      </div>
      <div>
        <label htmlFor="telefoon" className={labelClass}>
          Telefoon (optioneel)
        </label>
        <input
          id="telefoon"
          name="telefoon"
          type="tel"
          className={inputClass}
          placeholder="06 12345678"
        />
      </div>
      <div>
        <label htmlFor="onderwerp" className={labelClass}>
          Onderwerp
        </label>
        <select id="onderwerp" name="onderwerp" className={inputClass}>
          <option value="">Selecteer onderwerp</option>
          <option value="hypotheek">Hypotheek</option>
          <option value="verzekeringen">Verzekeringen</option>
          <option value="pensioen">Pensioen</option>
          <option value="financiering">Financiering</option>
          <option value="overig">Overig</option>
        </select>
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
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-nbg-green text-white font-semibold text-[17px] px-8 py-4 shadow-[0_4px_14px_rgba(118,163,72,0.35)] hover:bg-nbg-green/90 hover:shadow-[0_6px_20px_rgba(118,163,72,0.4)] hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-[0_4px_14px_rgba(118,163,72,0.35)] transition-all duration-200"
      >
        {isPending ? "Bezig met versturen…" : "Afspraak aanvragen"}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
