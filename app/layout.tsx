import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import StickyCtaBar from "./components/StickyCtaBar";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-futura",
});

export const metadata: Metadata = {
  title: "Haruna | Hypotheek- en pensioenadvies – Online",
  description:
    "Persoonlijk hypotheek- en pensioenadvies online. Via videobellen – makkelijk, snel en waar u ook bent. Financiering, verzekeringen en pensioen op maat.",
  keywords: [
    "hypotheekadvies",
    "pensioenadvies",
    "online hypotheekadvies",
    "videobellen",
    "financiering",
    "verzekeringen",
    "Haruna",
  ],
  openGraph: {
    title: "Haruna | Hypotheek- en pensioenadvies",
    description:
      "Persoonlijk hypotheek- en pensioenadvies online. Via videobellen – makkelijk en snel. Financiering, verzekeringen en pensioen op maat.",
    type: "website",
    locale: "nl_NL",
    images: [
      {
        url: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/haruna%20hypotheek%20advies%20nederland.png",
        width: 192,
        height: 64,
        alt: "Haruna",
      },
    ],
  },
  twitter: {
    card: "summary",
    images: [
      "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/haruna%20hypotheek%20advies%20nederland.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: "https://haruna.nl" },
  icons: {
    icon: "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${dmSans.variable} overflow-x-hidden`}>
      <body className="min-h-screen flex flex-col font-sans overflow-x-hidden w-full max-w-full">
        <JsonLd />
        {children}
        <StickyCtaBar />
        <Analytics />
      </body>
    </html>
  );
}
