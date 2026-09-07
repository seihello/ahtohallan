"use client";

import RecallButtons from "@/components/recall-buttons";
import { useDisplayMode } from "@/hooks/use-display-mode";
import { RecallStatus } from "@/lib/types";
import React from "react";

type Props = {
  onSelectRecall: (status: RecallStatus) => void;
  isRecallDisabled: boolean;
  children?: React.ReactNode;
};

export default function WordControls({ onSelectRecall, isRecallDisabled, children }: Props) {
  const { isPwa } = useDisplayMode();

  return (
    <div
      className={`flex w-full flex-col gap-2 border-t border-frost-200/12 bg-glacier-950/75 px-4 pt-6 backdrop-blur-xl sm:hidden ${
        isPwa ? "pb-16" : "pb-6"
      }`}
    >
      <RecallButtons className="flex w-full flex-1 gap-2" onSelect={onSelectRecall} disabled={isRecallDisabled} />
      {children}
    </div>
  );
}
