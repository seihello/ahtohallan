"use client";

import { RecallStatusCounts } from "@/lib/types";
import React from "react";

const SEGMENTS = [
  { key: "know", label: "Know it", bar: "bg-glacier-500", dot: "bg-glacier-400", text: "text-glacier-200" },
  { key: "seen", label: "Seen it", bar: "bg-gold-500", dot: "bg-gold-400", text: "text-gold-200" },
  { key: "new", label: "New to me", bar: "bg-ice-500", dot: "bg-ice-300", text: "text-ice-200" },
  { key: "untouched", label: "Untouched", bar: "bg-frost-200/15", dot: "bg-frost-400/50", text: "text-frost-400" },
] as const;

type Props = {
  counts: RecallStatusCounts | null;
};

export default function RecallStatusBar({ counts }: Props) {
  const total = counts?.total ?? 0;

  return (
    <div className="w-full space-y-1.5">
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-frost-200/10">
        {total > 0 &&
          SEGMENTS.map(({ key, bar }) => {
            const ratio = (counts![key] / total) * 100;
            if (ratio === 0) return null;
            return (
              <div
                key={key}
                className={`h-full transition-[width] duration-500 ${bar}`}
                style={{ width: `${ratio}%` }}
              />
            );
          })}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
        {SEGMENTS.map(({ key, label, dot, text }) => (
          <div key={key} className="flex items-center gap-x-1.5">
            <span className={`size-1.5 rounded-full ${dot}`} />
            <span className="text-[10px] tracking-[0.15em] text-frost-400 uppercase">{label}</span>
            <span className={`font-mono text-[11px] ${text}`}>
              {total > 0 ? Math.round((counts![key] / total) * 100) : 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
