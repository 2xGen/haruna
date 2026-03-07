"use client";

import { useActionState } from "react";
import { submitNewsletterForm } from "@/app/contact/actions";

const initialState = { success: false, message: undefined as string | undefined };

type Props = {
  source?: "footer" | "nieuws";
  /** "footer" = vertical, compact. "nieuws" = horizontal row, larger. */
  variant?: "footer" | "nieuws";
  id?: string;
};

export default function NewsletterForm({ source = "footer", variant = "footer", id }: Props) {
  const [state, formAction, isPending] = useActionState(submitNewsletterForm, initialState);

  const isFooter = variant === "footer";
  const formClass = isFooter
    ? "flex flex-col gap-2 max-w-sm"
    : "flex flex-col sm:flex-row gap-3 max-w-md";
  const inputClass = isFooter
    ? "w-full rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-white placeholder:text-white/60 text-[15px] max-lg:text-base focus:outline-none focus:ring-2 focus:ring-nbg-green focus:border-transparent"
    : "flex-1 min-w-0 rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 text-[15px] focus:outline-none focus:ring-2 focus:ring-nbg-green focus:border-transparent";
  const buttonClass =
    "rounded-lg bg-nbg-green text-white font-semibold text-[15px] hover:bg-nbg-green/90 transition-colors disabled:opacity-60 " +
    (isFooter ? "px-5 py-2.5 w-full sm:w-auto" : "px-6 py-3 shrink-0");

  return (
    <>
      <form action={formAction} className={formClass}>
        <input type="hidden" name="source" value={source} />
        <label htmlFor={id ?? "newsletter-email"} className="sr-only">
          E-mailadres
        </label>
        <input
          id={id ?? "newsletter-email"}
          type="email"
          name="email"
          placeholder="Uw e-mailadres"
          required
          disabled={isPending}
          className={inputClass}
        />
        <button type="submit" disabled={isPending} className={buttonClass}>
          {isPending ? "Bezig…" : "Inschrijven"}
        </button>
      </form>
      {state.message && (
        <p
          className={`mt-2 text-[15px] m-0 ${state.success ? "text-white/90" : "text-white/80"}`}
          role="status"
        >
          {state.message}
        </p>
      )}
    </>
  );
}
