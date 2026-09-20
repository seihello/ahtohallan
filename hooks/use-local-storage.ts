"use client";

import { selectedLevelsState, selectedTagsState, tagMatchModeState } from "@/lib/jotai/random-word/state";
import { getSelectedLevels } from "@/lib/local-storage/get-selected-levels";
import { getSelectedTags } from "@/lib/local-storage/get-selected-tags";
import { getTagMatchMode } from "@/lib/local-storage/get-tag-match-mode";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { setSelectedTags as setSelectedTagsToLocalStorage } from "@/lib/local-storage/set-selected-tags";
import { setSelectedLevels as setSelectedLevelsToLocalStorage } from "@/lib/local-storage/set-selected-levels";
import { setTagMatchMode as setTagMatchModeToLocalStorage } from "@/lib/local-storage/set-tag-match-mode";

export function useLocalStorage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsState);
  const [selectedLevels, setSelectedLevels] = useAtom(selectedLevelsState);
  const [tagMatchMode, setTagMatchMode] = useAtom(tagMatchModeState);

  useEffect(() => {
    setSelectedTags(getSelectedTags());
    setSelectedLevels(getSelectedLevels());
    setTagMatchMode(getTagMatchMode());
    setIsLoading(false);
  }, [setSelectedTags, setSelectedLevels, setTagMatchMode]);

  useEffect(() => {
    if (isLoading) return;
    setSelectedTagsToLocalStorage(selectedTags);
  }, [isLoading, selectedTags]);

  useEffect(() => {
    if (isLoading) return;
    setSelectedLevelsToLocalStorage(selectedLevels);
  }, [isLoading, selectedLevels]);

  useEffect(() => {
    if (isLoading) return;
    setTagMatchModeToLocalStorage(tagMatchMode);
  }, [isLoading, tagMatchMode]);

  return {
    isLoading,
  };
}
