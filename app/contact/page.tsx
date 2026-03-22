import Header from "../components/Header";
import Footer from "../components/Footer";
import AfspraakMakenForm from "../components/AfspraakMakenForm";

export const metadata = {
  title: "Afspraak maken | Haruna Hypotheek- en pensioenadvies",
  description:
    "Plan een vrijblijvend gesprek met Haruna. Hypotheek, pensioen of verzekeringen – online via videobellen.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero intro */}
        <section className="bg-nbg-lighter-green pt-12 lg:pt-16 pb-10 lg:pb-14">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div id="afspraak" className="scroll-mt-24">
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Vrijblijvend gesprek
              </p>
              <h1 className="text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-nbg-blue tracking-tight">
                Afspraak maken
              </h1>
              <p className="mt-4 text-nbg-blue/80 text-[17px] lg:text-lg max-w-2xl leading-relaxed">
                Heeft u een vraag over hypotheek, pensioen of verzekeringen? Plan een vrijblijvend videogesprek. Wij nemen zo snel mogelijk contact met u op.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 text-nbg-blue px-4 py-2 text-sm font-medium shadow-sm">
                  <svg className="w-4 h-4 text-nbg-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Online via videobellen
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 text-nbg-blue px-4 py-2 text-sm font-medium shadow-sm">
                  <svg className="w-4 h-4 text-nbg-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Ook &apos;s avonds mogelijk
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Form section */}
        <section className="py-12 lg:py-16">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-nbg-light-gray/50">
                  <div className="border-l-4 border-nbg-green pl-5 mb-6">
                    <h2 className="text-nbg-blue text-xl font-bold m-0">Vul het formulier in</h2>
                  </div>
                  <AfspraakMakenForm />
                </div>
              </div>
              <aside className="lg:col-span-5 space-y-6">
                <div className="bg-nbg-blue text-white rounded-2xl p-6 lg:p-8">
                  <h3 className="text-lg font-bold m-0">Overige contactgegevens</h3>
                  <p className="mt-3 text-white/85 text-[15px] leading-relaxed m-0">
                    U kunt ons ook bereiken via telefoon of e-mail voor algemene vragen.
                  </p>
                  <ul className="mt-6 space-y-4 list-none p-0 m-0">
                    <li>
                      <a href="tel:0786849331" className="flex items-center gap-3 text-white/95 hover:text-white transition-colors group">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-nbg-green">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                          </svg>
                        </span>
                        <span className="font-medium">078 684 93 31</span>
                      </a>
                    </li>
                    <li>
                      <a href="mailto:contact@haruna.nl" className="flex items-center gap-3 text-white/95 hover:text-white transition-colors group">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-nbg-green">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </span>
                        <span className="font-medium">contact@haruna.nl</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-nbg-lighter-green/80 border border-nbg-light-gray/50 p-6">
                  <p className="text-nbg-blue/90 text-[15px] leading-relaxed m-0">
                    <strong className="text-nbg-blue">Veilig & vertrouwd.</strong> Uw gegevens worden vertrouwelijk behandeld en niet gedeeld met derden.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
