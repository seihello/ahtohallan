"use client";

import RecallButtons from "@/components/recall-buttons";
import { Button } from "@/components/ui/button";
import { useDisplayMode } from "@/hooks/use-display-mode";
import { RecallStatus } from "@/lib/types";
import React from "react";

type Props = {
  onSelectRecall: (status: RecallStatus) => void;
  isRecallDisabled: boolean;
  canGoPrev: boolean;
  canGoNext: boolean;
  onClickPrev: () => void;
  onClickNext: () => void;
  children?: React.ReactNode;
};

export default function WordControls({
  onSelectRecall,
  isRecallDisabled,
  canGoPrev,
  canGoNext,
  onClickPrev,
  onClickNext,
  children,
}: Props) {
  const { isPwa } = useDisplayMode();

  return (
    <div
      className={`flex w-full flex-col items-end gap-2 border-t border-frost-200/12 bg-glacier-950/75 px-4 pt-6 backdrop-blur-xl sm:order-2 sm:w-auto sm:flex-row sm:items-center sm:border-none sm:bg-transparent sm:px-2 sm:pt-2 sm:backdrop-blur-none ${
        isPwa ? "pb-16" : "pb-6 sm:pb-2"
      }`}
    >
      <RecallButtons className="flex w-full flex-1 gap-2 sm:hidden" onSelect={onSelectRecall} disabled={isRecallDisabled} />
      {children}
      <div className="hidden w-full gap-x-2 sm:flex sm:w-auto">
        <Button variant="outline" onClick={onClickPrev} disabled={!canGoPrev} className="flex-1">
          Prev
        </Button>
        <Button onClick={onClickNext} disabled={!canGoNext} className="flex-1">
          Next
        </Button>
      </div>
    </div>
  );
}
