"use client";

import FilterDialog from "@/components/filter-dialog";
import { IconSnowflake } from "@tabler/icons-react";

type Props = {
  tagOptions: string[];
  currentIndex: number;
  wordCount: number;
};

export default function AppHeader({ tagOptions, currentIndex, wordCount }: Props) {
  return (
    <header className="flex w-full items-center justify-between gap-x-3 px-4 sm:order-1 sm:px-2">
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
        <FilterDialog tagOptions={tagOptions} />
      </div>
    </header>
  );
}
