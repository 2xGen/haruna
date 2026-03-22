import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

/** Project root (this folder). Stops Turbopack from picking a parent lockfile e.g. C:\\Users\\…\\package-lock.json */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // See https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack#root-directory
  turbopack: {
    root: projectRoot,
  },
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
