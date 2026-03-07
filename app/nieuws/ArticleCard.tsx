import Link from "next/link";
import type { Article } from "./articles-data";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-nbg-light-gray/50 hover:shadow-[0_6px_24px_rgba(0,0,0,0.08)] transition-shadow flex flex-col h-full">
      <div className="aspect-[2/1] shrink-0 overflow-hidden bg-nbg-lighter-green/80">
        {article.image ? (
          <img
            src={article.image}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-nbg-green/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        {article.date ? (
          <time className="text-nbg-blue/50 text-[15px]">{article.date}</time>
        ) : null}
        <h3 className="text-nbg-blue text-lg font-bold leading-snug mt-2">
          <Link
            href={article.href}
            className="text-nbg-blue hover:text-nbg-green"
          >
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 text-nbg-blue/80 text-[15px] line-clamp-2 flex-1">
          {article.description}
        </p>
        <Link
          href={article.href}
          className="inline-block mt-3 text-nbg-green font-medium text-[15px] hover:underline shrink-0"
        >
          Lees meer →
        </Link>
      </div>
    </article>
  );
}
