import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Dienstverleningsdocument | Haruna",
  description: "Dienstverleningsdocument van Haruna hypotheek- en pensioenadvies.",
};

export default function DienstverleningsdocumentPage() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-nbg-blue">
          Dienstverleningsdocument
        </h1>
        <p className="mt-4 text-nbg-blue/80">
          Hier kunt u binnenkort ons dienstverleningsdocument downloaden of
          inzien.
        </p>
        <Link href="/" className="mt-6 inline-block text-nbg-green font-semibold hover:underline">
          ← Terug naar home
        </Link>
      </main>
      <Footer />
    </>
  );
}
