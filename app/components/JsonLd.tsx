/**
 * JSON-LD structured data for SEO (LocalBusiness + FinancialService)
 */
export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        "@id": "https://haruna.nl/#organization",
        name: "Haruna",
        description:
          "Hypotheek- en pensioenadvies. Persoonlijk advies voor financiering, verzekeringen en pensioen – online via videobellen, makkelijk en snel.",
        url: "https://haruna.nl",
        telephone: "+31786849331",
        email: "contact@haruna.nl",
        areaServed: {
          "@type": "Country",
          name: "Nederland",
        },
        priceRange: "€€",
      },
      {
        "@type": "WebSite",
        "@id": "https://haruna.nl/#website",
        url: "https://haruna.nl",
        name: "Haruna – Hypotheek- en pensioenadvies",
        publisher: { "@id": "https://haruna.nl/#organization" },
        inLanguage: "nl-NL",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
