import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "haruna_admin_session";

function base64UrlEncode(input: Buffer) {
  return input.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(input: string) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = "=".repeat((4 - (base64.length % 4)) % 4);
  return Buffer.from(base64 + pad, "base64");
}

function getCookieSecret() {
  // Use a dedicated secret if available; otherwise fall back to Supabase service key (server-only).
  return (
    process.env.HARUNA_ADMIN_COOKIE_SECRET ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    "dev-secret-not-for-production"
  );
}

export type AdminSessionPayload = {
  admin: true;
  exp: number; // epoch ms
  user_id: string;
  user_name: string;
};

export function createAdminSessionCookieValue(payload?: Partial<AdminSessionPayload>) {
  const secret = getCookieSecret();
  const expMs = Date.now() + 1000 * 60 * 60 * 24 * 14; // 14 days

  const finalPayload: AdminSessionPayload = {
    admin: true,
    exp: payload?.exp ?? expMs,
    user_id: payload?.user_id ?? "unknown",
    user_name: payload?.user_name ?? "unknown",
  };

  const data = base64UrlEncode(Buffer.from(JSON.stringify(finalPayload), "utf8"));
  const sig = crypto.createHmac("sha256", secret).update(data).digest("hex");
  return `${data}.${sig}`;
}

export async function getAdminSessionCookiePayload(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!cookie) return null;

  const parts = cookie.split(".");
  if (parts.length !== 2) return null;

  const [data, sig] = parts;
  const secret = getCookieSecret();
  const expected = crypto.createHmac("sha256", secret).update(data).digest("hex");

  // Constant-time compare to reduce timing leaks.
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const json = base64UrlDecode(data).toString("utf8");
    const parsed = JSON.parse(json) as AdminSessionPayload;
    if (!parsed?.admin) return null;
    if (typeof parsed.exp !== "number") return null;
    if (Date.now() > parsed.exp) return null;
    if (typeof parsed.user_id !== "string" || typeof parsed.user_name !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function isValidAdminSessionCookie(): Promise<boolean> {
  const parsed = await getAdminSessionCookiePayload();
  return !!parsed;
}

export async function setAdminSessionCookie(cookieValue: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // seconds
  });
}

