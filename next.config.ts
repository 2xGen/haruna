import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "soaacpusdhyxwucjhhpy.supabase.co", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      // Financiering
      { source: "/financiering/", destination: "/financiering", permanent: true },
      { source: "/financiering/particuliere-financiering.html", destination: "/financiering", permanent: true },
      { source: "/financiering/zakelijke-financiering.html", destination: "/financiering", permanent: true },
      // Verzekeringen (pillar + subpages → pillar)
      { source: "/verzekeringen/", destination: "/verzekeringen", permanent: true },
      { source: "/verzekeringen/zakelijk.html", destination: "/verzekeringen", permanent: true },
      { source: "/verzekeringen/voor-uw-hypotheek.html", destination: "/verzekeringen", permanent: true },
      { source: "/verzekeringen/particulier.html", destination: "/verzekeringen", permanent: true },
      { source: "/verzekeringen/schade-melden.html", destination: "/verzekeringen", permanent: true },
      // Pensioen
      { source: "/pensioen.html", destination: "/pensioen", permanent: true },
      // Nieuws
      { source: "/nieuws/nieuws/", destination: "/nieuws", permanent: true },
      { source: "/nieuws/nieuws", destination: "/nieuws", permanent: true },
      // Contact
      { source: "/neem-contact-met-ons-op.html", destination: "/contact", permanent: true },
      { source: "/online-advies-voor-relaties.html", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
