-- Supabase SQL for admin login + status fields (paid project)
-- Run in Supabase Dashboard → SQL Editor for paid project `iemgpccgdlwpsrsjuumo`.
--
-- IMPORTANT: Set your admin password in the INSERT below.
-- This implementation stores the password value as plain text in the DB.
-- For better security, we can switch this to hashed passwords later.

-- Admin config: multiple admins (e.g. Harm Jan + Matthijs)
create table if not exists public.haruna_admin (
  id uuid primary key default gen_random_uuid(),
  username text not null,
  password text not null,
  created_at timestamptz default now()
);

-- If you already have a previous admin table without username, add it.
alter table public.haruna_admin add column if not exists username text;
update public.haruna_admin set username = 'Harm Jan' where username is null;

-- Insert admins (replace passwords below)
insert into public.haruna_admin (username, password)
select 'Harm Jan', 'CHANGE_ME_HARMJAN'
where not exists (select 1 from public.haruna_admin where username = 'Harm Jan');

insert into public.haruna_admin (username, password)
select 'Matthijs', 'CHANGE_ME_MATTHIJS'
where not exists (select 1 from public.haruna_admin where username = 'Matthijs');

-- Add status columns (default: nieuw)
alter table public.haruna_afspraken
  add column if not exists status text not null default 'nieuw';

alter table public.haruna_newsletter_subscribers
  add column if not exists status text not null default 'nieuw';

-- Admin audit log (who/what/when)
create table if not exists public.haruna_admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  admin_session text not null,
  admin_user text,
  kind text not null check (kind in ('afspraken', 'newsletter')),
  record_id uuid not null,
  previous_status text,
  new_status text not null,
  created_at timestamptz default now()
);

-- If the table already existed, make sure admin_user exists.
alter table public.haruna_admin_audit_log add column if not exists admin_user text;

alter table public.haruna_admin_audit_log enable row level security;

