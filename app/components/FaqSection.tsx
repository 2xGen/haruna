const VERGELIJKINGSKAART_PDF =
  "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/Vergelijkingskaart%202026%20Hypotheek.pdf";

const FAQ_ITEMS = [
  {
    question: "Wat kost hypotheekadvies bij Haruna?",
    answer:
      "De gemiddelde prijzen staan op onze vergelijkingskaart en hangen af van uw situatie en het type dienst (advies, contract regelen of beide). In een vrijblijvend kennismakingsgesprek bespreken we uw situatie en de kosten die daarbij passen.",
    linkLabel: "Bekijk de vergelijkingskaart hypotheek",
    linkUrl: VERGELIJKINGSKAART_PDF,
  },
  {
    question: "Kan ik ook buiten kantoortijden een afspraak maken?",
    answer: "Ja. Wij zijn ook bereikbaar buiten kantoortijden voor het plannen van een afspraak of voor dringende vragen. Bel ons gerust.",
    linkLabel: undefined,
    linkUrl: undefined,
  },
  {
    question: "Waar vindt het adviesgesprek plaats?",
    answer: "Online via videobellen. Snel, makkelijk en persoonlijk – waar u ook bent. Plan een afspraak en wij bellen u op het afgesproken tijdstip.",
    linkLabel: undefined,
    linkUrl: undefined,
  },
  {
    question: "Met welke geldverstrekkers werkt Haruna?",
    answer: "Wij vergelijken hypotheken van vrijwel alle geldverstrekkers in Nederland. In een vrijblijvend gesprek bespreken we welke opties bij uw situatie passen.",
    linkLabel: undefined,
    linkUrl: undefined,
  },
  {
    question: "Is het eerste gesprek vrijblijvend?",
    answer: "Ja. Het kennismakingsgesprek is geheel vrijblijvend. Daarna kunt u beslissen of u verder wilt met ons als adviseur.",
    linkLabel: undefined,
    linkUrl: undefined,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.linkUrl
        ? `${item.answer} Zie ook: ${item.linkLabel} (${item.linkUrl}).`
        : item.answer,
    },
  })),
};

export default function FaqSection() {
  return (
    <section className="bg-white py-12 lg:py-16 border-t border-nbg-light-gray" aria-labelledby="faq-heading">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="faq-heading" className="text-nbg-blue text-2xl font-bold mb-8">
          Veelgestelde vragen
        </h2>
        <dl className="space-y-6">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border-b border-nbg-light-gray pb-6 last:border-0 last:pb-0">
              <dt className="text-nbg-blue font-semibold text-[17px] mb-2">
                {item.question}
              </dt>
              <dd className="text-nbg-blue/85 text-[17px] leading-relaxed m-0">
                {item.answer}
                {item.linkUrl && item.linkLabel && (
                  <span className="block mt-3">
                    <a
                      href={item.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-nbg-green font-medium hover:underline"
                    >
                      {item.linkLabel} →
                    </a>
                  </span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
