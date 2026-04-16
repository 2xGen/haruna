"use client";

import Link from "next/link";
import { type FocusEvent, type FormEvent, useActionState, useState } from "react";
import { submitNewsletterForm } from "@/app/contact/actions";

const initialState = { success: false, message: undefined as string | undefined };

type Props = {
  source?: "footer" | "nieuws";
  /** "footer" = vertical, compact. "nieuws" = stacked fields, slightly larger tap targets. */
  variant?: "footer" | "nieuws";
  id?: string;
};

export default function NewsletterForm({ source = "footer", variant = "footer", id }: Props) {
  const [state, formAction, isPending] = useActionState(submitNewsletterForm, initialState);
  const [localSpamError, setLocalSpamError] = useState<string | null>(null);
  const [showSpamCheck, setShowSpamCheck] = useState(false);

  const isFooter = variant === "footer";
  const formClass = isFooter
    ? "flex flex-col gap-2 max-w-sm"
    : "flex flex-col gap-3 max-w-lg";
  const inputClass = isFooter
    ? "w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-white placeholder:text-white/60 text-[15px] max-lg:text-base focus:outline-none focus:ring-2 focus:ring-nbg-green focus:border-transparent"
    : "w-full rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 text-[15px] focus:outline-none focus:ring-2 focus:ring-nbg-green focus:border-transparent";
  const buttonClass =
    "rounded-lg bg-nbg-green text-white font-semibold text-[15px] hover:bg-nbg-green/90 transition-colors disabled:opacity-60 " +
    (isFooter ? "px-5 py-2.5 w-full sm:w-auto" : "px-6 py-3 w-full sm:w-auto sm:self-start");
  const formMessage = localSpamError ?? state.message;

  const emailFieldId = id ?? "newsletter-email";

  function onEmailInputOrChange(value: string) {
    const v = value.trim();
    if (!v) {
      setShowSpamCheck(false);
      setLocalSpamError(null);
    }
  }

  function onEmailBlur(e: FocusEvent<HTMLInputElement>) {
    if (e.currentTarget.value.trim()) {
      setShowSpamCheck(true);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const email = ((formData.get("email") as string) || "").trim();
    if (!email) {
      return;
    }

    const spamRaw = (formData.get("spam_check") as string) || "";
    const normalized = spamRaw.trim().replace(/\s+/g, "");

    if (!showSpamCheck) {
      event.preventDefault();
      setShowSpamCheck(true);
      setLocalSpamError("Vul het antwoord op de anti-bot vraag in (3 + 4).");
      return;
    }

    if (normalized === "") {
      event.preventDefault();
      setLocalSpamError("Vul het antwoord op de anti-bot vraag in.");
      return;
    }

    if (normalized !== "7") {
      event.preventDefault();
      setLocalSpamError("Fout antwoord op de anti-bot vraag. Probeer het opnieuw.");
      return;
    }

    setLocalSpamError(null);
  }

  return (
    <>
      <form action={formAction} className={formClass} onSubmit={handleSubmit}>
        <input type="hidden" name="source" value={source} />
        <input
          type="text"
          name="nb_hp"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
          data-lpignore="true"
          data-1p-ignore
        />
        <label htmlFor={emailFieldId} className="sr-only">
          E-mailadres
        </label>
        <input
          id={emailFieldId}
          type="email"
          name="email"
          placeholder="Uw e-mailadres"
          required
          disabled={isPending}
          className={inputClass}
          onInput={(e) => onEmailInputOrChange(e.currentTarget.value)}
          onChange={(e) => onEmailInputOrChange(e.currentTarget.value)}
          onBlur={onEmailBlur}
        />
        {showSpamCheck ? (
          <>
            <label
              htmlFor={`${emailFieldId}-spam-check`}
              className={isFooter ? "text-white/80 text-xs m-0" : "text-white/80 text-sm m-0"}
            >
              Anti-bot controle: wat is 3 + 4?
            </label>
            <input
              id={`${emailFieldId}-spam-check`}
              type="text"
              name="spam_check"
              inputMode="numeric"
              placeholder="Vul het antwoord in"
              required={showSpamCheck}
              disabled={isPending}
              className={inputClass}
              onChange={() => setLocalSpamError(null)}
              autoComplete="off"
            />
          </>
        ) : null}
        <button type="submit" disabled={isPending} className={buttonClass}>
          {isPending ? "Bezig…" : "Inschrijven"}
        </button>
      </form>
      <p className={`mt-2 text-white/70 text-xs m-0 ${isFooter ? "max-w-sm" : ""}`}>
        Door u in te schrijven gaat u akkoord met onze{" "}
        <Link href="/privacy" className="text-white/90 hover:text-white underline">
          privacyverklaring
        </Link>
        .
      </p>
      {formMessage && (
        <p
          className={`mt-2 text-[15px] m-0 ${localSpamError ? "text-red-300" : state.success ? "text-white/90" : "text-white/80"}`}
          role="status"
        >
          {formMessage}
        </p>
      )}
    </>
  );
}
