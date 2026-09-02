"use client";

import FilterDialog from "@/components/filter-dialog";
import { Button } from "@/components/ui/button";
import RandomWord from "@/components/random-word";
import RecallButtons from "@/components/recall-buttons";
import { useDisplayMode } from "@/hooks/use-display-mode";
import { RecallStatus, Word } from "@/lib/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { selectedLevelsState, selectedTagsState } from "@/lib/jotai/random-word/state";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useAiExplanation } from "@/hooks/use-ai-explanation";
import { useAiSentences } from "@/hooks/use-ai-sentences";
import { getRandomWord } from "@/lib/neon/get-random-word";
import { recordRecall } from "@/lib/neon/record-recall";
import { IconSnowflake } from "@tabler/icons-react";

type Props = {
  tagOptions: string[];
};

export default function RandomWordContainer({ tagOptions }: Props) {
  const { isPwa } = useDisplayMode();

  const [words, setWords] = useState<Word[]>([]);
  const [selectedTags] = useAtom(selectedTagsState);
  const [selectedLevels] = useAtom(selectedLevelsState);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [wordCount, setWordCount] = useState(-1);
  const [isFetchingWord, setIsFetchingWord] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const isRecordingRef = useRef(false);
  const [isDetailHidden, setIsDetailHidden] = useState(true);

  const { isLoading: isLoadingLocalStorage } = useLocalStorage();

  const {
    messages: explanations,
    status: explanationStatus,
    setMessages: setExplanations,
    run: generateExplanation,
  } = useAiExplanation();

  const {
    messages: sentences,
    status: sentenceStatus,
    setMessages: setSentences,
    run: generateSentences,
  } = useAiSentences();

  const onClickShowAnswer = () => {
    setIsDetailHidden(false);
  };

  const onSelectRecall = async (status: RecallStatus) => {
    const word = words[currentIndex];
    if (!word || isRecordingRef.current) return;

    isRecordingRef.current = true;
    setIsRecording(true);

    recordRecall(word.id, status);
    isRecordingRef.current = false;
    setIsRecording(false);

    await onClickNext();
  };

  const onClickPrev = () => {
    setIsDetailHidden(true);
    setExplanations([]);
    setSentences([]);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const onClickNext = useCallback(async () => {
    if (isFetchingWord) return;
    if (currentIndex + 1 < words.length) {
      setIsDetailHidden(true);
      setExplanations([]);
      setSentences([]);
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    setIsFetchingWord(true);

    const { word, count } = await getRandomWord({
      tags: selectedTags,
      excludeIds: words.map((word) => word.id),
      levels: selectedLevels,
    });

    if (word) {
      setWords((prev) => [...prev, word]);
      setWordCount(count);
      setIsDetailHidden(true);
      setExplanations([]);
      setSentences([]);
      setCurrentIndex((prev) => prev + 1);
    }

    setIsFetchingWord(false);
  }, [currentIndex, isFetchingWord, selectedTags, selectedLevels, words, setExplanations, setSentences]);

  useEffect(() => {
    if (words.length === 0 && !isLoadingLocalStorage) {
      onClickNext();
    }
  }, [words, isLoadingLocalStorage, onClickNext]);

  useEffect(() => {
    setCurrentIndex(-1);
    setIsDetailHidden(false);
    setExplanations([]);
    setSentences([]);
    setWords([]);
    setWordCount(-1);
  }, [selectedTags, selectedLevels, setExplanations, setSentences]);

  const isReady = words.length > 0 && currentIndex >= 0;
  const progress = wordCount > 0 ? ((currentIndex + 1) / wordCount) * 100 : 0;

  const filteredExplanations = explanations.filter((explanation) => explanation.role === "assistant");
  const filteredSentences = sentences.filter((sentence) => sentence.role === "assistant");

  return (
    <div className="mx-auto flex h-screen w-full max-w-256 flex-col items-end justify-center py-2 sm:px-8">
      <header className="flex w-full items-center justify-between gap-x-3 px-4 sm:order-1 sm:px-2">
        <div className="flex items-center gap-x-2.5">
          <IconSnowflake size={22} stroke={1.2} className="animate-crystal text-ice-200" />
          <div className="leading-tight">
            <div className="font-display text-base font-bold tracking-[0.28em] text-frost-100 sm:text-lg">
              AHTOHALLAN
            </div>
            <div className="text-[9px] tracking-[0.3em] text-ice-200/45 uppercase">Memory of every word</div>
          </div>
        </div>

        <div className="flex items-center gap-x-3">
          {wordCount >= 0 && (
            <div className="flex items-baseline gap-x-1 font-mono text-sm">
              <span className="text-lg text-gold-300">{currentIndex + 1}</span>
              <span className="text-frost-500">/</span>
              <span className="text-frost-400">{wordCount}</span>
            </div>
          )}
          <FilterDialog tagOptions={tagOptions} />
        </div>
      </header>

      <div className="mt-3 w-full px-4 sm:order-1 sm:px-2">
        <div className="h-px w-full overflow-hidden rounded-full bg-frost-200/12">
          <div
            className="h-full bg-gradient-to-r from-gold-500 via-gold-300 to-ice-200 shadow-[0_0_12px_rgba(247,194,44,0.8)] transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="w-full grow space-y-4 overflow-y-scroll px-4 pt-4 pb-6 sm:order-3 sm:px-2">
        {isReady ? (
          <RandomWord word={words[currentIndex]} isDetailHidden={isDetailHidden} onReveal={onClickShowAnswer} />
        ) : (
          <div className="glass ice-edge flex h-48 items-center justify-center rounded-3xl">
            <span className="animate-shimmer flex items-center gap-x-2 text-[11px] tracking-[0.35em] text-ice-100/80 uppercase">
              <IconSnowflake size={14} stroke={1.5} />
              {isFetchingWord || isLoadingLocalStorage ? "Listening to the river" : "No word found"}
            </span>
          </div>
        )}

        <RecallButtons
          className="mx-auto mt-12 hidden w-fit gap-2 sm:flex"
          onSelect={onSelectRecall}
          disabled={!isReady || isRecording}
        />
        {filteredExplanations.length > 0 && (
          <div className="glass rounded-2xl p-3 text-sm text-glacier-100 sm:p-4 sm:text-base">
            {filteredExplanations.map((explanation) => (
              <div key={explanation.id} className="whitespace-pre-wrap">
                {explanation.parts
                  .filter((part) => part.type === "text")
                  .map((part, index) => (
                    <span
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: part.text.replaceAll("\n", "<br />").replaceAll("**", ""),
                      }}
                    />
                  ))}
              </div>
            ))}
          </div>
        )}
        {filteredSentences.length > 0 && (
          <div className="glass rounded-2xl p-3 text-sm text-gold-100 sm:p-4 sm:text-base">
            {filteredSentences.map((sentence) => (
              <div key={sentence.id} className="whitespace-pre-wrap">
                {sentence.parts
                  .filter((part) => part.type === "text")
                  .map((part, index) => (
                    <span
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: part.text.replaceAll("\n", "<br />").replaceAll("**", ""),
                      }}
                    />
                  ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className={`flex w-full flex-col items-end gap-2 border-t border-frost-200/12 bg-aurora-950/70 px-4 pt-4 backdrop-blur-xl sm:order-2 sm:w-auto sm:flex-row sm:items-center sm:border-none sm:bg-transparent sm:px-2 sm:pt-2 sm:backdrop-blur-none ${
          isPwa ? "pb-16" : "pb-4 sm:pb-2"
        }`}
      >
        <RecallButtons
          className="flex w-full flex-1 gap-2 sm:hidden"
          onSelect={onSelectRecall}
          disabled={!isReady || isRecording}
        />
        {/* <Button
          variant="outline"
          onClick={() => generateExplanation(words[currentIndex].names)}
          disabled={!isReady || explanationStatus === "submitted" || explanationStatus === "streaming"}
        >
          Explain Word
        </Button> */}
        {/* <Button
          variant="outline"
          onClick={() => generateSentences(words[currentIndex].names)}
          disabled={!isReady || sentenceStatus === "submitted" || sentenceStatus === "streaming"}
        >
          Make Sentence
        </Button> */}
        <div className="flex w-full gap-x-2 sm:w-auto">
          <Button
            variant="outline"
            onClick={onClickPrev}
            disabled={!isReady || currentIndex === 0 || status === "submitted" || status === "streaming"}
            className="flex-1"
          >
            Prev
          </Button>
          <Button
            onClick={onClickNext}
            disabled={
              !isReady ||
              isFetchingWord ||
              currentIndex === wordCount - 1 ||
              status === "submitted" ||
              status === "streaming"
            }
            className="flex-1"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
