"use client";

import { recallStatusesState, selectedLevelsState, tagFiltersState } from "@/lib/jotai/random-word/state";
import { getSelectedLevels } from "@/lib/local-storage/get-selected-levels";
import { getRecallStatuses } from "@/lib/local-storage/get-recall-statuses";
import { getTagFilters } from "@/lib/local-storage/get-tag-filters";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { setSelectedLevels as setSelectedLevelsToLocalStorage } from "@/lib/local-storage/set-selected-levels";
import { setRecallStatuses as setRecallStatusesToLocalStorage } from "@/lib/local-storage/set-recall-statuses";
import { setTagFilters as setTagFiltersToLocalStorage } from "@/lib/local-storage/set-tag-filters";

export function useLocalStorage() {
  const [isLoading, setIsLoading] = useState(true);
  const [tagFilters, setTagFilters] = useAtom(tagFiltersState);
  const [selectedLevels, setSelectedLevels] = useAtom(selectedLevelsState);
  const [recallStatuses, setRecallStatuses] = useAtom(recallStatusesState);

  useEffect(() => {
    setTagFilters(getTagFilters());
    setSelectedLevels(getSelectedLevels());
    setRecallStatuses(getRecallStatuses());
    setIsLoading(false);
  }, [setTagFilters, setSelectedLevels, setRecallStatuses]);

  useEffect(() => {
    if (isLoading) return;
    setTagFiltersToLocalStorage(tagFilters);
  }, [isLoading, tagFilters]);

  useEffect(() => {
    if (isLoading) return;
    setSelectedLevelsToLocalStorage(selectedLevels);
  }, [isLoading, selectedLevels]);

  useEffect(() => {
    if (isLoading) return;
    setRecallStatusesToLocalStorage(recallStatuses);
  }, [isLoading, recallStatuses]);

  return {
    isLoading,
  };
}
