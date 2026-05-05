# Haruna – Hypotheek- en pensioenadvies

Website for Haruna B.V. (SEH Erkend Financieel Adviseur). Built with Next.js 15, React 19, and Tailwind CSS.

## Setup

```bash
npm install
cp .env.example .env.local   # then add your Supabase keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase

- **Afspraak maken**, **Nieuwsbrief**, en **situatieschets (adviseur meekijken)** schrijven naar Supabase. Run `supabase-tables.sql` (en bij een bestaand project alleen `supabase-tables-situatieschets-leads.sql` indien nodig) in de SQL Editor om tabellen aan te maken.
- Use `.env.local` for `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.

## Scripts

- `npm run dev` – development (Turbopack)
- `npm run build` – production build
- `npm run start` – run production server
- `npm run lint` – ESLint

## License

Proprietary – Haruna B.V.
