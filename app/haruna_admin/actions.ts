"use server";

import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import {
  createAdminSessionCookieValue,
  getAdminSessionCookiePayload,
  isValidAdminSessionCookie,
  setAdminSessionCookie,
} from "./session";

const ALLOWED_STATUS = ["nieuw", "beantwoord"] as const;
type AllowedStatus = (typeof ALLOWED_STATUS)[number];

function normalizeStatus(value: string | null | undefined): AllowedStatus | null {
  if (!value) return null;
  const v = String(value).toLowerCase().trim();
  if (ALLOWED_STATUS.includes(v as AllowedStatus)) return v as AllowedStatus;
  return null;
}

function getTableForKind(kind: string): "haruna_afspraken" | "haruna_newsletter_subscribers" | null {
  if (kind === "afspraken") return "haruna_afspraken";
  if (kind === "newsletter") return "haruna_newsletter_subscribers";
  return null;
}

export async function loginAction(formData: FormData) {
  const password = (formData.get("password") as string | null)?.trim() ?? "";
  if (!password) redirect("/haruna_admin?error=1");

  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("haruna_admin")
    .select("id, username, password")
    .eq("password", password)
    .limit(1)
    .maybeSingle();

  if (error) redirect("/haruna_admin?error=1");

  if (!data?.id || !data?.username) redirect("/haruna_admin?error=1");

  const cookieValue = createAdminSessionCookieValue({
    user_id: data.id,
    user_name: data.username,
  });
  await setAdminSessionCookie(cookieValue);

  redirect("/haruna_admin");
}

export async function updateStatusAction(formData: FormData) {
  if (!(await isValidAdminSessionCookie())) redirect("/haruna_admin?error=1");

  const kind = (formData.get("kind") as string | null)?.trim() ?? "";
  const id = (formData.get("id") as string | null)?.trim() ?? "";
  const statusRaw = formData.get("status") as string | null;

  const table = getTableForKind(kind);
  const status = normalizeStatus(statusRaw);

  if (!table || !id || !status) redirect("/haruna_admin");

  const supabase = getSupabaseServer();

  const sessionPayload = await getAdminSessionCookiePayload();
  const adminUser = sessionPayload?.user_name ?? "unknown";
  const adminSession = adminUser; // keep column populated (UI will show admin_user anyway)

  // Read previous status for audit log.
  const { data: existing, error: existingError } = await supabase
    .from(table)
    .select("status")
    .eq("id", id)
    .maybeSingle();

  if (existingError) redirect("/haruna_admin?error=1");

  const previousStatus = existing?.status ?? null;

  const { error: updateError } = await supabase.from(table).update({ status }).eq("id", id);
  if (updateError) {
    // Don't leak details in UI; just redirect back.
    redirect("/haruna_admin?error=1");
  }

  // Audit: who / what / when.
  const { error: auditError } = await supabase.from("haruna_admin_audit_log").insert({
    admin_session: adminSession,
    kind: kind,
    record_id: id,
    previous_status: previousStatus,
    new_status: status,
    admin_user: adminUser,
  });

  // Audit logging should not break the main flow; ignore failures.
  if (auditError) {
    console.error("Audit insert failed:", auditError);
  }

  redirect("/haruna_admin");
}

