"use client";

import { SiteNavTrigger } from "@/components/site-nav";
import { IconSnowflake } from "@tabler/icons-react";

type Props = {
  correctCount: number;
  answeredCount: number;
};

export default function QuizHeader({ correctCount, answeredCount }: Props) {
  return (
    <header className="flex w-full items-center justify-between gap-x-3 px-4 sm:px-2">
      <div className="flex items-center gap-x-2.5">
        <SiteNavTrigger />
        <div className="leading-tight sm:hidden">
          <div className="font-display text-base font-bold tracking-[0.28em] text-frost-100">QUIZ</div>
          <div className="text-[9px] tracking-[0.3em] text-ice-200/45 uppercase">Eiken vocabulary</div>
        </div>
        <div className="hidden items-center gap-x-2.5 sm:flex">
          <IconSnowflake size={20} stroke={1.2} className="animate-crystal text-ice-200" />
          <span className="font-display text-sm tracking-[0.28em] text-frost-200">QUIZ</span>
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
      </div>
    </header>
  );
}
