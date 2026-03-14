import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Cookiebeleid | Haruna Hypotheek- en pensioenadvies",
  description:
    "Uitleg over het gebruik van cookies op haruna.nl. Noodzakelijke en optionele cookies, uw keuze en hoe u voorkeuren kunt wijzigen.",
};

export default function CookiebeleidPage() {
  return (
    <>
      <Header />
      <main className="pb-24 md:pb-20">
        <section className="bg-nbg-lighter-green pt-12 lg:pt-16 pb-10 lg:pb-12 border-b border-nbg-light-gray/40">
          <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">Informatie</p>
            <h1 className="text-nbg-blue text-3xl sm:text-4xl font-bold tracking-tight">
              Cookiebeleid
            </h1>
            <p className="mt-3 text-nbg-blue/70 text-[15px]">
              Laatst bijgewerkt: maart 2026
            </p>
          </div>
        </section>

        <article className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="prose prose-nbg max-w-none text-nbg-blue/90 text-[17px] leading-relaxed">
            <h2 className="text-nbg-blue text-xl font-bold mt-8 mb-3">Wat zijn cookies?</h2>
            <p>
              Cookies zijn kleine bestanden die door een website op uw apparaat (computer, tablet of telefoon) worden geplaatst. Ze worden onder meer gebruikt om de website goed te laten werken, om uw voorkeuren te onthouden of om bezoekgedrag te analyseren.
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-8 mb-3">Welke cookies gebruikt Haruna?</h2>
            <p>
              Op haruna.nl maken we onderscheid tussen <strong>noodzakelijke cookies</strong> en <strong>optionele (analytische) cookies</strong>. Alleen noodzakelijke cookies worden standaard geplaatst. Optionele cookies worden alleen geplaatst als u daarvoor toestemming geeft.
            </p>

            <h3 className="text-nbg-blue text-lg font-semibold mt-6 mb-2">Noodzakelijke cookies</h3>
            <p>
              Deze cookies zijn nodig voor de basisfunctionaliteit van de website, zoals het onthouden van uw cookievoorkeuren, sessiebeheer en beveiliging. Zonder deze cookies werkt de site niet goed. Voor noodzakelijke cookies is geen toestemming vereist onder de AVG; we plaatsen ze op basis van ons gerechtvaardigd belang (een werkende website).
            </p>
            <ul className="list-disc pl-6 space-y-1 my-4">
              <li><strong>Cookievoorkeuren</strong> – slaat uw keuze (alleen noodzakelijk of ook analyse) op, zodat we uw voorkeur bij een volgend bezoek respecteren. Bewaartermijn: maximaal 1 jaar.</li>
            </ul>

            <h3 className="text-nbg-blue text-lg font-semibold mt-6 mb-2">Optionele cookies (analyse)</h3>
            <p>
              Met uw toestemming gebruiken we cookies en vergelijkbare technieken voor het analyseren van bezoek aan onze website. Daarmee krijgen we inzicht in hoe de site wordt gebruikt (bijv. aantal bezoeken, welke pagina&apos;s worden bekeken), zodat we de site kunnen verbeteren. Deze gegevens worden niet gebruikt om u persoonlijk te identificeren. We werken met betrouwbare partijen die gegevens verwerken volgens de geldende privacyregels.
            </p>
            <p>
              U kunt deze cookies weigeren via de cookiebanner of later via <strong>Cookievoorkeuren</strong> in de footer. Als u alleen noodzakelijke cookies kiest, worden er geen analytische cookies geplaatst.
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-8 mb-3">Uw keuze wijzigen</h2>
            <p>
              U kunt uw cookievoorkeuren op elk moment wijzigen. Onderaan elke pagina staat een link <strong>Cookievoorkeuren</strong>. Daarmee opent u de cookiebanner opnieuw en kunt u kiezen voor &quot;Alleen noodzakelijk&quot; of &quot;Alles accepteren&quot;. Uw nieuwe keuze wordt opgeslagen en vanaf dat moment toegepast.
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-8 mb-3">Bewaartermijnen</h2>
            <p>
              De cookie waarmee we uw voorkeur opslaan, heeft een maximale bewaartermijn van 1 jaar. Daarna vragen we u opnieuw om uw keuze. Analytische gegevens worden door onze aanbieders bewaard volgens hun eigen bewaartermijnen, in lijn met de AVG.
            </p>

            <h2 className="text-nbg-blue text-xl font-bold mt-8 mb-3">Meer informatie</h2>
            <p>
              Voor algemene informatie over hoe wij omgaan met uw persoonsgegevens, verwijzen we naar ons <Link href="/privacy" className="text-nbg-green font-medium hover:underline">privacybeleid</Link>. Heeft u vragen over dit cookiebeleid? Neem dan <Link href="/contact" className="text-nbg-green font-medium hover:underline">contact</Link> met ons op.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-nbg-light-gray">
            <Link href="/" className="inline-flex items-center gap-2 text-nbg-green font-semibold text-[15px] hover:underline">
              <span className="rotate-180 inline-block">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 320 512"><path d="M305 239c9.4 9.4 9.4 24.6 0 33.9L113 465c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l175-175L79 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L305 239z" /></svg>
              </span>
              Terug naar home
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
