"use client";

import { selectedLevelsState, selectedTagsState } from "@/lib/jotai/random-word/state";
import { getSelectedLevels } from "@/lib/local-storage/get-selected-levels";
import { getSelectedTags } from "@/lib/local-storage/get-selected-tags";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { setSelectedTags as setSelectedTagsToLocalStorage } from "@/lib/local-storage/set-selected-tags";
import { setSelectedLevels as setSelectedLevelsToLocalStorage } from "@/lib/local-storage/set-selected-levels";

export function useLocalStorage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsState);
  const [selectedLevels, setSelectedLevels] = useAtom(selectedLevelsState);

  useEffect(() => {
    setSelectedTags(getSelectedTags());
    setSelectedLevels(getSelectedLevels());
    setIsLoading(false);
  }, [setSelectedTags, setSelectedLevels]);

  // 読み込みが終わるまで保存しない。
  // マウント直後の atom は空配列なので、そのまま書くと未設定時のデフォルトを
  // 空の保存値で上書きしてしまう（React Strict Mode の二重実行でも起きる）。
  useEffect(() => {
    if (isLoading) return;
    setSelectedTagsToLocalStorage(selectedTags);
  }, [isLoading, selectedTags]);

  useEffect(() => {
    if (isLoading) return;
    setSelectedLevelsToLocalStorage(selectedLevels);
  }, [isLoading, selectedLevels]);

  return {
    isLoading,
  };
}
