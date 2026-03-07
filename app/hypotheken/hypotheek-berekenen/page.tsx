import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HypotheekBerekenenForm from "../../components/HypotheekBerekenenForm";

export const metadata = {
  title: "Hypotheek berekenen | Maximale hypotheek & maandlasten | Haruna",
  description:
    "Bereken uw maximale hypotheek en maandlasten. Vul uw gegevens in voor een indicatie. Plan daarna een vrijblijvend videogesprek voor persoonlijk advies.",
};

export default function HypotheekBerekenenPage() {
  return (
    <>
      <Header />
      <main className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="mb-8">
          <Link href="/hypotheken" className="text-nbg-green font-medium text-[15px] hover:underline">
            ← Hypotheken
          </Link>
        </div>
        <h1 className="text-nbg-blue text-3xl lg:text-4xl font-bold mb-2">
          Hypotheek berekenen
        </h1>
        <p className="text-nbg-blue/80 text-lg mb-8">
          Bereken uw maximale hypotheek en maandlasten. Dit is een indicatie – voor een exacte berekening op maat, plan een vrijblijvend gesprek.
        </p>
        <HypotheekBerekenenForm />
      </main>
      <Footer />
    </>
  );
}
