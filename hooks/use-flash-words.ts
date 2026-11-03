"use client";

import { getRandomWords } from "@/lib/neon/get-random-words";
import { RecallStatusFilter, TagFilter, Word } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

const BATCH_SIZE = 40;
const REFILL_THRESHOLD = 10;

type Options = {
  tagFilters: TagFilter[];
  levels: string[];
  recallStatuses: RecallStatusFilter[];
  isEnabled: boolean;
};

export function useFlashWords({ tagFilters, levels, recallStatuses, isEnabled }: Options) {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalMs, setIntervalMs] = useState(1500);
  const [isPlaying, setIsPlaying] = useState(false);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    setWords([]);
    setCurrentIndex(0);
    setIsPlaying(false);
  }, [tagFilters, levels, recallStatuses]);

  useEffect(() => {
    if (!isEnabled || isFetchingRef.current) return;
    if (words.length - currentIndex > REFILL_THRESHOLD) return;

    isFetchingRef.current = true;

    getRandomWords({
      tagFilters,
      levels,
      recallStatuses,
      excludeIds: words.slice(currentIndex).map((word) => word.id),
      limit: BATCH_SIZE,
    }).then((nextWords) => {
      isFetchingRef.current = false;
      if (nextWords.length === 0) return;

      setWords((prev) => [...prev.slice(currentIndex), ...nextWords]);
      setCurrentIndex(0);
    });
  }, [isEnabled, words, currentIndex, tagFilters, levels, recallStatuses]);

  useEffect(() => {
    if (!isPlaying || words.length === 0) return;

    const timer = window.setInterval(() => setCurrentIndex((prev) => prev + 1), intervalMs);

    return () => window.clearInterval(timer);
  }, [isPlaying, intervalMs, words.length]);

  return {
    word: words[currentIndex] ?? null,
    currentIndex,
    intervalMs,
    isPlaying,
    setIntervalMs,
    togglePlaying: () => setIsPlaying((prev) => !prev),
    goNext: () => setCurrentIndex((prev) => prev + 1),
  };
}
