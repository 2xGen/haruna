import Image from "next/image";

type Props = {
  className?: string;
};

export default function ArticleAuthorDisclaimer({ className = "" }: Props) {
  return (
    <section
      className={`rounded-2xl border border-nbg-light-gray/60 bg-nbg-lighter-green/30 p-4 sm:p-5 ${className}`.trim()}
      aria-label="Auteur en disclaimer"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="shrink-0 flex flex-col items-start gap-2">
          <Image
            src="https://soaacpusdhyxwucjhhpy.supabase.co/storage/v1/object/public/haruna/linkedin%20profiel.png"
            alt="Profielfoto van Matthijs van Reek"
            width={72}
            height={72}
            className="h-[72px] w-[72px] rounded-full object-cover border border-nbg-light-gray/70"
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="m-0 text-nbg-blue text-[16px] font-bold">Matthijs van Reek</p>
            <a
              href="https://www.linkedin.com/in/matthijs-van-reek-423940167/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn-profiel van Matthijs van Reek"
              title="LinkedIn-profiel"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-nbg-light-gray/70 bg-white text-[#0A66C2] hover:border-nbg-green transition-colors"
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.86 3.38-1.86 3.62 0 4.29 2.38 4.29 5.48v6.27zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </a>
          </div>
          <p className="mt-1 mb-0 text-nbg-blue/80 text-[14px] leading-relaxed">
            Dit artikel is bedoeld als algemene informatie en vervangt geen persoonlijk advies. Voor uw
            situatie kunnen andere voorwaarden gelden. Bij Haruna kijken we graag met u mee naar uw situatie.
          </p>
        </div>
      </div>
    </section>
  );
}
