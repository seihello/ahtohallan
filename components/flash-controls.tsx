"use client";

import { Button } from "@/components/ui/button";
import { useDisplayMode } from "@/hooks/use-display-mode";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";

const INTERVAL_OPTIONS = [500, 1000, 1500, 2000, 3000, 5000];

type Props = {
  intervalMs: number;
  isPlaying: boolean;
  onChangeInterval: (next: number) => void;
  onTogglePlaying: () => void;
  onClickNext: () => void;
};

export default function FlashControls({
  intervalMs,
  isPlaying,
  onChangeInterval,
  onTogglePlaying,
  onClickNext,
}: Props) {
  const { isPwa } = useDisplayMode();

  return (
    <div
      className={`flex w-full flex-col gap-3 border-t border-frost-200/12 bg-glacier-950/75 px-4 pt-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between ${
        isPwa ? "pb-16" : "pb-4"
      }`}
    >
      <div
        role="radiogroup"
        aria-label="Interval"
        className="flex flex-wrap items-center gap-1 rounded-full border border-frost-200/15 bg-frost-100/5 p-1"
      >
        {INTERVAL_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={intervalMs === option}
            onClick={() => onChangeInterval(option)}
            className={`grow cursor-pointer rounded-full px-3 py-1.5 font-mono text-xs transition-colors ${
              intervalMs === option
                ? "bg-gold-500/20 text-gold-200 shadow-[inset_0_0_0_1px_rgba(247,194,44,0.45)]"
                : "text-frost-400 hover:text-frost-100"
            }`}
          >
            {option / 1000}s
          </button>
        ))}
      </div>

      <div className="flex w-full gap-x-2 sm:w-auto">
        <Button variant="outline" onClick={onClickNext} className="flex-1 sm:w-24 sm:flex-none">
          Skip
        </Button>
        <Button onClick={onTogglePlaying} className="flex-1 gap-x-2 sm:w-32 sm:flex-none">
          {isPlaying ? <IconPlayerPause size={16} stroke={1.8} /> : <IconPlayerPlay size={16} stroke={1.8} />}
          {isPlaying ? "Pause" : "Start"}
        </Button>
      </div>
    </div>
  );
}
