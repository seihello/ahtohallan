"use client";

import FilterDialog from "@/components/filter-dialog";
import { IconPencilQuestion, IconSnowflake } from "@tabler/icons-react";
import Link from "next/link";

type Props = {
  tagOptions: string[];
  currentIndex: number;
  wordCount: number;
};

export default function AppHeader({ tagOptions, currentIndex, wordCount }: Props) {
  return (
    <header className="flex w-full items-center justify-between gap-x-3 px-4 sm:px-2">
      <div className="flex items-center gap-x-2.5">
        <IconSnowflake size={22} stroke={1.2} className="animate-crystal text-ice-200" />
        <div className="leading-tight">
          <div className="font-display text-base font-bold tracking-[0.28em] text-frost-100 sm:text-lg">AHTOHALLAN</div>
          <div className="text-[9px] tracking-[0.3em] text-ice-200/45 uppercase">Memory of every word</div>
        </div>
      </div>

      <div className="flex items-center gap-x-3">
        {wordCount >= 0 && (
          <div className="flex items-baseline gap-x-1 font-mono text-sm">
            <span className="text-lg text-gold-300">{currentIndex + 1}</span>
            <span className="text-frost-500">/</span>
            <span className="text-frost-400">{wordCount}</span>
          </div>
        )}
        <Link
          href="/quiz"
          aria-label="Vocabulary quiz"
          className="flex size-10 items-center justify-center rounded-full border border-frost-200/20 bg-frost-100/5 text-frost-200 backdrop-blur-sm transition-colors hover:border-ice-200/50 hover:text-ice-100"
        >
          <IconPencilQuestion size={18} stroke={1.6} />
        </Link>
        <FilterDialog tagOptions={tagOptions} />
      </div>
    </header>
  );
}
