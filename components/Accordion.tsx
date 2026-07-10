'use client';

import { useState } from 'react';

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-ink-100 overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-display text-lg text-ink-900">{item.q}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  isOpen ? 'border-clay-500 bg-clay-500 text-white' : 'border-ink-200 text-ink-600'
                }`}
              >
                <svg
                  className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 leading-relaxed text-ink-600">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
