-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor) for your paid project `iemgpccgdlwpsrsjuumo`.
-- Creates the tables used by:
-- 1) Haruna aanvragen (contact form) → public.haruna_afspraken
-- 2) Haruna email subs (newsletter signups) → public.haruna_newsletter_subscribers

-- Haruna aanvragen (contact form)
create table if not exists public.haruna_afspraken (
  id uuid primary key default gen_random_uuid(),
  naam text not null,
  email text not null,
  telefoon text,
  onderwerp text,
  bericht text,
  created_at timestamptz default now()
);

-- Haruna email subs (footer + nieuws page)
create table if not exists public.haruna_newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text check (source in ('footer', 'nieuws')),
  created_at timestamptz default now()
);

-- Enable RLS so anon key cannot read/write.
-- Your app uses SUPABASE_SERVICE_ROLE_KEY in Server Actions, which bypasses RLS.
alter table public.haruna_afspraken enable row level security;
alter table public.haruna_newsletter_subscribers enable row level security;

