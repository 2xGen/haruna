"use client";

import { useState } from "react";

export type FaqItem = { question: string; answer: string };

const ChevronDown = (
  <svg className="w-5 h-5 shrink-0 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function ArticleFaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <dl className="space-y-2">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="rounded-xl border border-nbg-light-gray/60 bg-white overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            <dt>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 text-left py-4 px-5 sm:px-6 text-nbg-blue font-semibold text-[17px] hover:bg-nbg-lighter-green/30 transition-colors"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <span>{item.question}</span>
                <span className={isOpen ? "rotate-180" : ""}>{ChevronDown}</span>
              </button>
            </dt>
            <dd
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              className={isOpen ? "block" : "hidden"}
            >
              <div className="px-5 sm:px-6 pb-4 pt-0 text-nbg-blue/85 text-[17px] leading-relaxed border-t border-nbg-light-gray/50">
                {item.answer}
              </div>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
