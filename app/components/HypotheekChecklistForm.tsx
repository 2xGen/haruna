"use client";

import { useActionState } from "react";
import { submitChecklistForm } from "../contact/actions";

const initialState = { success: false };

export default function HypotheekChecklistForm() {
  const [state, formAction, isPending] = useActionState(
    submitChecklistForm,
    initialState
  );

  if (state.success) {
    return (
      <div className="rounded-lg bg-nbg-lighter-green/80 border border-nbg-green/20 p-4 text-center">
        <p className="text-nbg-blue font-semibold text-sm m-0">Checklist onderweg!</p>
        <p className="text-nbg-blue/80 text-xs mt-1 m-0">We sturen de checklist naar uw e-mail.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input
        name="email"
        type="email"
        required
        placeholder="uw@email.nl"
        className="w-full rounded-lg border border-nbg-light-gray px-4 py-3 text-nbg-blue text-sm placeholder:text-nbg-blue/50 focus:border-nbg-green focus:ring-2 focus:ring-nbg-green/20 outline-none"
      />
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-nbg-green text-white font-semibold text-sm py-3 hover:bg-nbg-green/90 disabled:opacity-60 transition-colors"
      >
        {isPending ? "..." : "Ontvang checklist"}
      </button>
    </form>
  );
}
