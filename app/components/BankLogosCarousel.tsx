"use client";

const SUPABASE_BASE = "https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna";

const BANKS = [
  { name: "ING", src: `${SUPABASE_BASE}/ing%20logo.png` },
  { name: "ABN AMRO", src: `${SUPABASE_BASE}/abn%20amro.png` },
  { name: "Rabobank", src: `${SUPABASE_BASE}/rabobank.png` },
  { name: "ASN Bank", src: `${SUPABASE_BASE}/asn%20bank.png` },
  { name: "Triodos Bank", src: `${SUPABASE_BASE}/triodos%20bank.png` },
  { name: "Knab", src: `${SUPABASE_BASE}/knab.png` },
  { name: "Volksbank", src: `${SUPABASE_BASE}/de%20volksbank.png` },
  { name: "NN", src: `${SUPABASE_BASE}/nationale%20nederlanden.png` },
];

export default function BankLogosCarousel() {
  const items = [...BANKS, ...BANKS]; // duplicate for seamless loop

  return (
    <section className="bg-white py-14 lg:py-16 border-t border-nbg-light-gray" aria-label="Banken waarmee wij samenwerken">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h2 className="text-center text-base font-semibold tracking-wide text-nbg-blue/90 m-0">
          Wij werken met alle Nederlandse banken
        </h2>
      </div>
      <div className="w-full max-w-full overflow-x-hidden">
        <div className="flex gap-12 lg:gap-16 items-center w-max animate-bank-carousel">
          {items.map((bank, i) => (
            <div
              key={`${bank.name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center w-[100px] h-[40px] lg:w-[120px] lg:h-[48px] grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all"
            >
              <img
                src={bank.src}
                alt={bank.name}
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
