"use client";

import { selectedLevelsState, tagFiltersState } from "@/lib/jotai/random-word/state";
import { getSelectedLevels } from "@/lib/local-storage/get-selected-levels";
import { getTagFilters } from "@/lib/local-storage/get-tag-filters";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { setSelectedLevels as setSelectedLevelsToLocalStorage } from "@/lib/local-storage/set-selected-levels";
import { setTagFilters as setTagFiltersToLocalStorage } from "@/lib/local-storage/set-tag-filters";

export function useLocalStorage() {
  const [isLoading, setIsLoading] = useState(true);
  const [tagFilters, setTagFilters] = useAtom(tagFiltersState);
  const [selectedLevels, setSelectedLevels] = useAtom(selectedLevelsState);

  useEffect(() => {
    setTagFilters(getTagFilters());
    setSelectedLevels(getSelectedLevels());
    setIsLoading(false);
  }, [setTagFilters, setSelectedLevels]);

  useEffect(() => {
    if (isLoading) return;
    setTagFiltersToLocalStorage(tagFilters);
  }, [isLoading, tagFilters]);

  useEffect(() => {
    if (isLoading) return;
    setSelectedLevelsToLocalStorage(selectedLevels);
  }, [isLoading, selectedLevels]);

  return {
    isLoading,
  };
}
