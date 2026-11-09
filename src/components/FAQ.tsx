"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/faq";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-2xl divide-y divide-elevio-border rounded-2xl border border-elevio-border bg-white shadow-sm">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-sm font-semibold text-elevio-dark">
                {item.q}
              </span>
              <span
                className={`shrink-0 text-xl text-elevio-primary transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5 text-sm leading-relaxed text-elevio-dark/70">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
