import { RecallStatus } from "@/lib/types";
import React from "react";

const LABELS: Record<RecallStatus, { text: string; dot: string; color: string }> = {
  know: { text: "Know it", dot: "bg-glacier-400", color: "text-glacier-200" },
  seen: { text: "Seen it", dot: "bg-gold-400", color: "text-gold-200" },
  new: { text: "New to me", dot: "bg-ice-300", color: "text-ice-200" },
};

const UNTOUCHED = { text: "Untouched", dot: "bg-frost-400/50", color: "text-frost-400" };

type Props = {
  status: RecallStatus | null;
};

export default function RecallStatusLabel({ status }: Props) {
  const { text, dot, color } = status ? LABELS[status] : UNTOUCHED;

  return (
    <div className="flex items-center justify-end gap-x-1.5 pr-1">
      <span className={`size-1.5 rounded-full ${dot}`} />
      <span className={`text-[10px] tracking-[0.25em] uppercase ${color}`}>{text}</span>
    </div>
  );
}
