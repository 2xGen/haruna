-- Run once in Supabase SQL Editor (naast supabase-tables.sql).
-- Leads van /situatieschets wanneer iemand kiest voor “adviseur meekijken” en het formulier verstuurt.

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
