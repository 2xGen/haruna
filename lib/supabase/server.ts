import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client (service role). Use in Server Actions to insert
 * afspraken and newsletter signups. Never use this in client components.
 */
export function getSupabaseServer() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}

export type AfspraakInsert = {
  naam: string;
  email: string;
  telefoon?: string | null;
  onderwerp?: string | null;
  bericht?: string | null;
};

export type NewsletterSubscriberInsert = {
  email: string;
  source?: "footer" | "nieuws" | null;
};
