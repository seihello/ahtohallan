"use client";

import { getRecallStatusCounts } from "@/lib/neon/get-recall-status-counts";
import { RecallStatusCounts, TagFilter } from "@/lib/types";
import { useEffect, useState } from "react";

type Options = {
  tagFilters: TagFilter[];
  levels: string[];
  isEnabled: boolean;
};

export function useRecallStatusCounts({ tagFilters, levels, isEnabled }: Options) {
  const [counts, setCounts] = useState<RecallStatusCounts | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!isEnabled) return;

    let isStale = false;

    getRecallStatusCounts({ tagFilters, levels }).then((nextCounts) => {
      if (!isStale) setCounts(nextCounts);
    });

    return () => {
      isStale = true;
    };
  }, [tagFilters, levels, isEnabled, version]);

  const refresh = () => setVersion((prev) => prev + 1);

  return { counts, refresh };
}
