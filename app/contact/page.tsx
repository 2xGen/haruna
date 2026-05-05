import Header from "../components/Header";
import Footer from "../components/Footer";
import AfspraakMakenForm from "../components/AfspraakMakenForm";
import { parseAfspraakTopicParam } from "@/lib/afspraak-topics";

export const metadata = {
  title: "Plan een kort gesprek | Haruna Hypotheek- en pensioenadvies",
  description:
    "Plan een gratis en vrijblijvend kennismakingsgesprek over hypotheek, pensioen of verzekeringen. Kort gesprek via videobellen, ook 's avonds mogelijk.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ onderwerp?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const presetOnderwerp = parseAfspraakTopicParam(sp.onderwerp);

  return (
    <>
      <Header />
      <main>
        {/* Hero intro */}
        <section className="bg-nbg-lighter-green pt-12 lg:pt-16 pb-10 lg:pb-14">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div id="afspraak" className="scroll-mt-24">
              <p className="text-nbg-primary font-semibold text-sm uppercase tracking-wider mb-2">
                Gratis en vrijblijvend
              </p>
              <h1 className="text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-nbg-blue tracking-tight">
                Plan een kort gesprek
              </h1>
              <p className="mt-4 text-nbg-blue/80 text-[17px] lg:text-lg max-w-2xl leading-relaxed">
                Heeft u een vraag over hypotheek, pensioen of verzekeringen? Plan een gratis en vrijblijvend kennismakingsgesprek van 20 minuten. Wij nemen zo snel mogelijk contact met u op.
              </p>
              <p className="mt-2 text-nbg-blue/70 text-[15px] max-w-2xl">
                In dit gesprek kijken we naar uw situatie en mogelijke vervolgstappen.
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
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 text-nbg-blue px-4 py-2 text-sm font-medium shadow-sm">
                  <svg className="w-4 h-4 text-nbg-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Reactie binnen 1 werkdag
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Form section */}
        <section id="formulier" className="py-12 lg:py-16 scroll-mt-24">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-nbg-light-gray/50">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="border-l-4 border-nbg-green pl-5">
                  <h2 className="text-nbg-blue text-xl font-bold m-0">Plan uw gratis kennismaking</h2>
                </div>
                <p className="m-0 rounded-full bg-nbg-lighter-green/80 px-4 py-2 text-sm font-medium text-nbg-blue">
                  Veilig & vertrouwd. Uw gegevens worden vertrouwelijk behandeld en niet gedeeld met derden.
                </p>
              </div>
              <AfspraakMakenForm presetOnderwerp={presetOnderwerp} />
            </div>
            <div className="mt-6">
              <div className="bg-nbg-blue text-white rounded-2xl p-6 lg:p-8">
                <h3 className="text-lg font-bold m-0">Liever direct contact opnemen?</h3>
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
            </div>
            <div className="mt-8 bg-white rounded-2xl p-6 lg:p-8 border border-nbg-light-gray/50 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-nbg-light-gray ring-2 ring-nbg-lighter-green/70 shrink-0">
                  <img
                    src="https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/harmjan%20schouwstra.png"
                    alt="Harm Jan Schouwstra"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-nbg-blue text-lg font-bold m-0">Harm Jan Schouwstra</h3>
                  <p className="text-nbg-blue/75 text-[15px] m-0">Hypotheek- en pensioenadviseur</p>
                </div>
              </div>
              <p className="text-nbg-blue/85 text-[15px] leading-relaxed m-0 mb-3">
                Harm Jan is de drijvende kracht achter Haruna. Met meer dan 30 jaar ervaring in hypotheek- en pensioenadvies helpt hij particulieren en ondernemers bij het maken van de juiste keuzes.
              </p>
              <p className="text-nbg-blue/85 text-[15px] leading-relaxed m-0 mb-4">
                Zijn aanpak is direct en helder: geen wollig taalgebruik, maar concrete antwoorden op uw vragen. U krijgt advies op maat, in een gesprek dat bij u past.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-nbg-lighter-green/80 text-nbg-blue text-[13px] font-medium px-3 py-1.5">SEH Erkend Financieel Adviseur</span>
                <span className="inline-flex items-center rounded-full bg-nbg-lighter-green/80 text-nbg-blue text-[13px] font-medium px-3 py-1.5">Vergunninghouder AFM</span>
                <span className="inline-flex items-center rounded-full bg-nbg-lighter-green/80 text-nbg-blue text-[13px] font-medium px-3 py-1.5">Lid van de NVB</span>
                <span className="inline-flex items-center rounded-full bg-nbg-lighter-green/80 text-nbg-blue text-[13px] font-medium px-3 py-1.5">Gecertificeerd hypotheekadviseur</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
