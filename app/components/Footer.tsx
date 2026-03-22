import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "./NewsletterForm";
import CookiePreferenceLink from "./CookiePreferenceLink";

const snelNaar = [
  { label: "Contact", href: "/contact" },
  { label: "Afspraak maken", href: "/contact" },
  { label: "Hypotheken", href: "/hypotheken" },
  { label: "Financiering", href: "/financiering" },
  { label: "Pensioen", href: "/pensioen" },
  { label: "Verzekeringen", href: "/verzekeringen" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Nieuws", href: "/nieuws" },
];

const footerDocumenten = [
  { label: "Dienstverleningsdocument", href: "/dienstverleningsdocument" },
  { label: "Vergelijkingskaart Hypotheek", href: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Vergelijkingskaart%202026%20Hypotheek.pdf" },
  {
    label: "Vergelijkingskaart Risico's Afdekken",
    href: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Vergelijkingskaart%202026%20Risicos%20afdekken.pdf",
  },
  {
    label: "Vergelijkingskaart Vermogen Opbouwen",
    href: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Vergelijkingskaart%202026%20Vermogen%20opbouwen.pdf",
  },
  {
    label: "Vergelijkingskaart Pensioenvraag Werkgever",
    href: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Vergelijkingskaart%20Pensioenvraag%202026%20werkgever.pdf",
  },
];

const footerLegal = [
  { label: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookiebeleid", href: "/cookiebeleid" },
  { label: "Contact", href: "/contact" },
];
// Cookievoorkeuren is a button that reopens the cookie banner (no href)

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nbg-blue text-white pb-20 max-lg:pb-[max(5rem,calc(5rem+env(safe-area-inset-bottom)))]">
      {/* Sectie 1: Nieuwsbrief, navigatie, contact */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-10 lg:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <h4 className="text-lg font-semibold mb-4">Op de hoogte blijven?</h4>
            <p className="text-white/90 text-[17px] mb-4">
              Schrijf u in voor onze nieuwsbrief.
            </p>
            <NewsletterForm source="footer" variant="footer" id="footer-newsletter-email" />
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Snel naar</h4>
            <ul className="space-y-2 list-none p-0 m-0">
              {snelNaar.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/90 text-[17px] hover:text-nbg-primary transition-colors max-lg:block max-lg:py-2.5">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact met Haruna</h4>
            <p className="text-white/90 text-[17px] m-0">
              Online bereikbaar via e-mail, telefoon of videobellen
            </p>
            <ul className="mt-3 space-y-1 list-none p-0 m-0 text-[17px]">
              <li>
                <a href="tel:0786849331" className="text-white/90 hover:text-white transition-colors">
                  078 684 93 31
                </a>
              </li>
              <li>
                <a href="mailto:contact@haruna.nl" className="text-white/90 hover:text-white transition-colors">
                  contact@haruna.nl
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Bereikbaar</h4>
            <p className="text-white/90 text-[17px] m-0 mb-4">
              Videogesprek op afspraak. Ook &apos;s avonds bereikbaar voor vragen.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-nbg-green text-white font-semibold text-[15px] px-5 py-2.5 hover:bg-nbg-green/90 transition-colors"
            >
              Afspraak maken
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Sectie 2: Documenten */}
      <div className="border-t border-white/20 bg-white/5">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-nbg-green/20 text-nbg-green shrink-0" aria-hidden>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </span>
            Documenten
          </h4>
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 list-none p-0 m-0">
            {footerDocumenten.map((link) => (
              <li key={link.label}>
                {link.href.endsWith(".pdf") ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/90 text-[17px] hover:text-nbg-primary transition-colors py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0" aria-hidden />
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-white/90 text-[17px] hover:text-nbg-primary transition-colors py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-nbg-green shrink-0" aria-hidden />
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 bg-nbg-blue/50">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/80" aria-label="Juridisch">
            {footerLegal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-nbg-primary transition-colors">
                {link.label}
              </Link>
            ))}
            <CookiePreferenceLink className="hover:text-nbg-primary transition-colors bg-transparent border-0 p-0 cursor-pointer font-inherit text-inherit">
              Cookievoorkeuren
            </CookiePreferenceLink>
          </nav>
          <div className="mt-6 pt-6 border-t border-white/10 text-center space-y-1">
            <p className="text-sm text-white/70 m-0">
              © {currentYear} | Haruna B.V. is ingeschreven bij de AFM onder vergunningsnummer 12017699.
            </p>
            <p className="text-xs text-white/50 m-0">
              Statutaire naam HARUNA B.V. · KvK 24425182 · Perengaarde 57, 3344 PR Hendrik-Ido-Ambacht
            </p>
          </div>
        </div>
      </div>

      {/* SEH Erkend – badges + reg.nr. + uitleg (bottom) */}
      <div className="border-t border-white/20 bg-white/5">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="flex flex-wrap items-center gap-6">
              <Image
                src="https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/erkend%20financieel%20adviseur.png"
                alt="Erkend Financieel Adviseur"
                width={120}
                height={80}
                className="object-contain h-16 w-auto"
              />
              <Image
                src="https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/seh%20erkend%20adviseur%20hypotheken.png"
                alt="SEH Erkend"
                width={120}
                height={80}
                className="object-contain h-16 w-auto"
              />
              <p className="text-white/90 text-[15px] font-medium">
                Reg.nr. 18934
              </p>
            </div>
            <div className="md:flex-1">
              <h4 className="text-lg font-semibold mb-3">Haruna is SEH Erkend – wat betekent dat voor u?</h4>
              <p className="text-white/90 text-[15px] mb-4">
                Haruna B.V. is SEH Erkend Financieel Adviseur (reg.nr. 18934). Dat wil zeggen: wij voldoen aan de eisen voor kwaliteit en deskundigheid van Stichting Erkend Financieel Adviseur en volgen jaarlijks Permanente Educatie. Voor u betekent dat betrouwbaar advies dat aansluit bij de actuele wet- en regelgeving.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none p-0 m-0 text-white/85 text-[14px]">
                <li className="flex items-start gap-2">
                  <span className="text-nbg-green shrink-0 mt-0.5" aria-hidden>✓</span>
                  <span><strong className="text-white/95">Actueel en deskundig</strong> – Wij blijven bij met PE, zodat uw advies past bij de laatste regels en ontwikkelingen.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nbg-green shrink-0 mt-0.5" aria-hidden>✓</span>
                  <span><strong className="text-white/95">Advies op maat voor u</strong> – Geen standaardoplossingen; wij sluiten aan bij uw situatie, wensen en toekomst.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nbg-green shrink-0 mt-0.5" aria-hidden>✓</span>
                  <span><strong className="text-white/95">Breed inzetbaar</strong> – Van hypotheek tot pensioen, van relatie tot nalatenschap: één aanspreekpunt voor uw financiële vragen.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nbg-green shrink-0 mt-0.5" aria-hidden>✓</span>
                  <span><strong className="text-white/95">Uw belang voorop</strong> – U kunt rekenen op aandacht, kwaliteit en advies waarin uw belang centraal staat.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
