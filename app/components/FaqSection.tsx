const FAQ_ITEMS = [
  {
    question: "Wat kost hypotheekadvies bij Haruna?",
    answer: "Ons advies is vaak (deels) vergoed door de geldverstrekker. Tijdens een vrijblijvend kennismakingsgesprek bespreken we de mogelijkheden en eventuele kosten.",
  },
  {
    question: "Kan ik ook buiten kantoortijden een afspraak maken?",
    answer: "Ja. Wij zijn ook bereikbaar buiten kantoortijden voor het plannen van een afspraak of voor dringende vragen. Bel ons gerust.",
  },
  {
    question: "Waar vindt het adviesgesprek plaats?",
    answer: "Online via videobellen. Snel, makkelijk en persoonlijk – waar u ook bent. Plan een afspraak en wij bellen u op het afgesproken tijdstip.",
  },
  {
    question: "Met welke banken werkt Haruna samen?",
    answer: "Wij werken onafhankelijk en kunnen hypotheken bij alle Nederlandse banken en geldverstrekkers voor u vergelijken en afsluiten.",
  },
  {
    question: "Is het eerste gesprek vrijblijvend?",
    answer: "Ja. Het kennismakingsgesprek is geheel vrijblijvend. Daarna kunt u beslissen of u verder wilt met ons als adviseur.",
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
      text: item.answer,
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
