"use client";

import { IconCards, IconSnowflake } from "@tabler/icons-react";
import Link from "next/link";

type Props = {
  correctCount: number;
  answeredCount: number;
};

export default function QuizHeader({ correctCount, answeredCount }: Props) {
  return (
    <header className="flex w-full items-center justify-between gap-x-3 px-4 sm:px-2">
      <div className="flex items-center gap-x-2.5">
        <IconSnowflake size={22} stroke={1.2} className="animate-crystal text-ice-200" />
        <div className="leading-tight">
          <div className="font-display text-base font-bold tracking-[0.28em] text-frost-100 sm:text-lg">QUIZ</div>
          <div className="text-[9px] tracking-[0.3em] text-ice-200/45 uppercase">Eiken vocabulary</div>
        </div>
      </div>

      <div className="flex items-center gap-x-3">
        {answeredCount > 0 && (
          <div className="flex items-baseline gap-x-1 font-mono text-sm">
            <span className="text-lg text-gold-300">{correctCount}</span>
            <span className="text-frost-500">/</span>
            <span className="text-frost-400">{answeredCount}</span>
          </div>
        )}
        <Link
          href="/"
          aria-label="Back to words"
          className="flex size-10 items-center justify-center rounded-full border border-frost-200/20 bg-frost-100/5 text-frost-200 backdrop-blur-sm transition-colors hover:border-ice-200/50 hover:text-ice-100"
        >
          <IconCards size={18} stroke={1.6} />
        </Link>
      </div>
    </header>
  );
}
