"use client";

import { getRecallStatusCounts } from "@/lib/neon/get-recall-status-counts";
import { RecallStatusCounts } from "@/lib/types";
import { useEffect, useState } from "react";

type Options = {
  tags: string[];
  levels: string[];
  isEnabled: boolean;
};

export function useRecallStatusCounts({ tags, levels, isEnabled }: Options) {
  const [counts, setCounts] = useState<RecallStatusCounts | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!isEnabled) return;

    let isStale = false;

    getRecallStatusCounts({ tags, levels }).then((nextCounts) => {
      if (!isStale) setCounts(nextCounts);
    });

    return () => {
      isStale = true;
    };
  }, [tags, levels, isEnabled, version]);

  const refresh = () => setVersion((prev) => prev + 1);

  return { counts, refresh };
}
