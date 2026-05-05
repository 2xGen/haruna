-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor) for project qjnzagwpevrzxbpnuudr.
-- Creates tables used by Afspraak maken and Nieuwsbrief.

-- Afspraak aanvragen (contact form)
create table if not exists public.haruna_afspraken (
  id uuid primary key default gen_random_uuid(),
  naam text not null,
  email text not null,
  telefoon text,
  onderwerp text,
  bericht text,
  created_at timestamptz default now()
);

-- Nieuwsbrief inschrijvingen (footer + nieuws page)
create table if not exists public.haruna_newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text check (source in ('footer', 'nieuws')),
  created_at timestamptz default now()
);

-- Enable RLS so anon key cannot read/write. Your app uses the service_role key in Server Actions, which bypasses RLS.
alter table public.haruna_afspraken enable row level security;
alter table public.haruna_newsletter_subscribers enable row level security;

-- Situatieschets: volledige wizard-invulling + contact wanneer gebruiker “adviseur meekijken” kiest
create table if not exists public.haruna_leads_situatieschets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  voornaam text not null,
  achternaam text not null,
  email text not null,
  telefoon text not null,
  opmerkingen text,
  schets_json jsonb not null,
  samenvatting_tekst text
);

create index if not exists haruna_leads_situatieschets_created_at_idx
  on public.haruna_leads_situatieschets (created_at desc);

alter table public.haruna_leads_situatieschets enable row level security;
