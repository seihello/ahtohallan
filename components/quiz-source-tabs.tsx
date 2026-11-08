"use client";

import { QuizSource } from "@/lib/types";
import { IconDatabase, IconSparkles } from "@tabler/icons-react";

type Props = {
  source: QuizSource;
  isLoading: boolean;
  onSelect: (source: QuizSource) => void;
};

const TABS: { value: QuizSource; label: string; icon: typeof IconDatabase }[] = [
  { value: "stored", label: "Stored", icon: IconDatabase },
  { value: "ai", label: "AI", icon: IconSparkles },
];

export default function QuizSourceTabs({ source, isLoading, onSelect }: Props) {
  return (
    <div className="glass ice-edge flex w-full gap-1 rounded-full p-1 sm:w-80">
      {TABS.map(({ value, label, icon: Icon }) => {
        const isActive = value === source;

        return (
          <button
            key={value}
            type="button"
            aria-pressed={isActive}
            disabled={isLoading}
            onClick={() => onSelect(value)}
            className={`flex grow cursor-pointer items-center justify-center gap-x-2 rounded-full border px-4 py-2 text-[11px] tracking-[0.3em] uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              isActive
                ? "border-gold-400/45 bg-gold-500/15 text-gold-100"
                : "border-transparent text-frost-400 hover:text-frost-100"
            }`}
          >
            <Icon size={14} stroke={1.5} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
