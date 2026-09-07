"use client";

import { Button } from "@/components/ui/button";
import { IconVolume, IconVolumeOff } from "@tabler/icons-react";

type Props = {
  canGoPrev: boolean;
  canGoNext: boolean;
  isAutoPlayEnabled: boolean;
  onClickPrev: () => void;
  onClickNext: () => void;
  onToggleAutoPlay: () => void;
};

export default function WordNavigation({
  canGoPrev,
  canGoNext,
  isAutoPlayEnabled,
  onClickPrev,
  onClickNext,
  onToggleAutoPlay,
}: Props) {
  return (
    <div className="flex w-full items-center justify-end gap-x-2 px-4 sm:px-2">
      <Button
        variant="outline"
        size="icon"
        aria-label="Auto play"
        aria-pressed={isAutoPlayEnabled}
        onClick={onToggleAutoPlay}
        className={`w-10 shrink-0 sm:w-10 ${
          isAutoPlayEnabled
            ? "border-gold-400/60 bg-gold-500/20 text-gold-200 hover:border-gold-300/70 hover:text-gold-100"
            : ""
        }`}
      >
        {isAutoPlayEnabled ? <IconVolume size={18} stroke={1.6} /> : <IconVolumeOff size={18} stroke={1.6} />}
      </Button>
      <Button variant="outline" onClick={onClickPrev} disabled={!canGoPrev} className="w-24 shrink-0">
        Prev
      </Button>
      <Button onClick={onClickNext} disabled={!canGoNext} className="w-24 shrink-0">
        Next
      </Button>
    </div>
  );
}
