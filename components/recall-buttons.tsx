"use client";

import React from "react";
import { Button } from "@/components/ui/button";

/** 単語をどれくらい知っているかの自己申告。左から順に定着度が高い */
const RECALL_OPTIONS = ["Know it", "Seen it", "New to me"];

type Props = {
  /** 置き場所ごとに変わるレイアウトは呼び出し側から渡す */
  className?: string;
  disabled?: boolean;
};

export default function RecallButtons({ className, disabled }: Props) {
  return (
    <div className={className}>
      {RECALL_OPTIONS.map((option) => (
        <Button key={option} variant="outline" className="flex-1 w-auto sm:w-36" disabled={disabled}>
          {option}
        </Button>
      ))}
    </div>
  );
}
