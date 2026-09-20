"use client";

import { getRecallStatusCounts } from "@/lib/neon/get-recall-status-counts";
import { RecallStatusCounts, TagMatchMode } from "@/lib/types";
import { useEffect, useState } from "react";

type Options = {
  tags: string[];
  tagMatchMode: TagMatchMode;
  levels: string[];
  isEnabled: boolean;
};

export function useRecallStatusCounts({ tags, tagMatchMode, levels, isEnabled }: Options) {
  const [counts, setCounts] = useState<RecallStatusCounts | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!isEnabled) return;

    let isStale = false;

    getRecallStatusCounts({ tags, tagMatchMode, levels }).then((nextCounts) => {
      if (!isStale) setCounts(nextCounts);
    });

    return () => {
      isStale = true;
    };
  }, [tags, tagMatchMode, levels, isEnabled, version]);

  const refresh = () => setVersion((prev) => prev + 1);

  return { counts, refresh };
}
