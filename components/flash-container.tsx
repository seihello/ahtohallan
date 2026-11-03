"use client";

import FlashCard from "@/components/flash-card";
import FlashControls from "@/components/flash-controls";
import FlashHeader from "@/components/flash-header";
import { useFlashWords } from "@/hooks/use-flash-words";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { recallStatusesState, selectedLevelsState, tagFiltersState } from "@/lib/jotai/random-word/state";
import { useAtom } from "jotai";

type Props = {
  tagOptions: string[];
};

export default function FlashContainer({ tagOptions }: Props) {
  const [tagFilters] = useAtom(tagFiltersState);
  const [selectedLevels] = useAtom(selectedLevelsState);
  const [recallStatuses] = useAtom(recallStatusesState);
  const { isLoading } = useLocalStorage();

  const { word, currentIndex, intervalMs, isPlaying, setIntervalMs, togglePlaying, goNext } = useFlashWords({
    tagFilters,
    levels: selectedLevels,
    recallStatuses,
    isEnabled: !isLoading,
  });

  return (
    <div className="mx-auto flex h-screen w-full max-w-256 flex-col pt-2 sm:px-8">
      <FlashHeader tagOptions={tagOptions} shownCount={currentIndex} />

      <div className="flex w-full grow items-center justify-center px-4 py-6 sm:px-2">
        <FlashCard word={word} intervalMs={intervalMs} isPlaying={isPlaying} flashKey={currentIndex} />
      </div>

      <FlashControls
        intervalMs={intervalMs}
        isPlaying={isPlaying}
        onChangeInterval={setIntervalMs}
        onTogglePlaying={togglePlaying}
        onClickNext={goNext}
      />
    </div>
  );
}
