const TESTIMONIALS = [
  {
    quote: "Heel tevreden over het advies van Harm Jan. Duidelijk uitgelegd en we voelden ons goed begeleid bij onze hypotheek.",
    name: "Familie De Vries",
    location: "Hendrik-Ido-Ambacht",
  },
  {
    quote: "Vriendelijk, deskundig en geen verborgen kosten. Echt een aanrader voor wie op zoek is naar eerlijk hypotheekadvies.",
    name: "Peter en Linda",
    location: "Zuid-Holland",
  },
  {
    quote: "Alles online geregeld met Harm Jan. Erg fijn, alles in één keer in orde, zonder gedoe.",
    name: "Jan K.",
    location: "Ridderkerk",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-nbg-lighter-green py-12 lg:py-16" aria-labelledby="testimonials-heading">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="testimonials-heading" className="text-nbg-blue text-2xl font-bold mb-8 text-center">
          Wat klanten zeggen
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              key={i}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50"
            >
              <div className="flex gap-1 mb-3" aria-hidden>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-nbg-green text-lg">★</span>
                ))}
              </div>
              <p className="text-nbg-blue/90 text-[17px] leading-relaxed mb-4 m-0">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="text-nbg-blue/70 text-[15px]">
                — {t.name}, {t.location}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
