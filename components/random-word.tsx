import { Word } from "@/lib/types";
import { IconSnowflake } from "@tabler/icons-react";
import React from "react";

type Props = {
  word: Word;
  isDetailHidden: boolean;
  onReveal: () => void;
};

export default function RandomWord({ word, isDetailHidden, onReveal }: Props) {
  return (
    <article className="glass ice-edge relative w-full overflow-hidden rounded-3xl p-5 whitespace-pre-line sm:p-8">
      <header className="relative space-y-2">
        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-ice-200/60" />
          <span className="text-[10px] tracking-[0.4em] text-ice-200/60 uppercase">Ahtohallan remembers</span>
        </div>
        <h2 className="text-frozen font-display text-2xl leading-tight font-bold sm:text-3xl">{word.names}</h2>
      </header>

      <div className="relative mt-3">
        <div
          className={`space-y-4 ${
            isDetailHidden ? "cursor-pointer blur-[6px] select-none" : "transition-[filter] duration-300"
          }`}
          {...(isDetailHidden
            ? {
                role: "button",
                tabIndex: 0,
                "aria-label": "Show answer",
                onClick: onReveal,
                onKeyDown: (event: React.KeyboardEvent) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onReveal();
                  }
                },
              }
            : {})}
        >
          <p className="text-base leading-relaxed text-frost-100 sm:text-lg">{word.meanings}</p>

          {word.sentences && (
            <p className="border-l-2 border-ice-300/40 pl-4 text-sm leading-relaxed text-frost-300 italic sm:text-base">
              {word.sentences}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
            {word.level > 0 && (
              <span className="rounded-full border border-gold-400/45 bg-gold-500/12 px-3 py-1 font-mono text-[11px] tracking-widest text-gold-200">
                LV {word.level}
              </span>
            )}
            {word.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full border border-glacier-300/30 bg-glacier-600/25 px-3 py-1 text-xs font-medium text-glacier-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {isDetailHidden && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="opacity-80 flex items-center gap-2 rounded-full border border-ice-200/30 bg-glacier-950/60 px-3 py-2 text-[10px] tracking-[0.2em] text-ice-100 uppercase backdrop-blur-sm">
              <IconSnowflake size={14} stroke={1.5} />
              Tap to reveal
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
