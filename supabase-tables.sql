-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor) for project qjnzagwpevrzxbpnuudr.
-- Creates tables used by Afspraak maken and Nieuwsbrief.

-- Afspraak aanvragen (contact form)
create table if not exists public.afspraken (
  id uuid primary key default gen_random_uuid(),
  naam text not null,
  email text not null,
  telefoon text,
  onderwerp text,
  bericht text,
  created_at timestamptz default now()
);

-- Nieuwsbrief inschrijvingen (footer + nieuws page)
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text check (source in ('footer', 'nieuws')),
  created_at timestamptz default now()
);

-- Enable RLS so anon key cannot read/write. Your app uses the service_role key in Server Actions, which bypasses RLS.
alter table public.afspraken enable row level security;
alter table public.newsletter_subscribers enable row level security;
