"use client";

import { getRandomWord } from "@/lib/neon/get-random-word";
import { recordRecall } from "@/lib/neon/record-recall";
import { RecallStatus, Word } from "@/lib/types";
import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  tags: string[];
  levels: string[];
  isEnabled: boolean;
  onWordChange: () => void;
  onRecallRecorded: () => void;
};

export function useWordQueue({ tags, levels, isEnabled, onWordChange, onRecallRecorded }: Options) {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [wordCount, setWordCount] = useState(-1);
  const [isFetching, setIsFetching] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isDetailHidden, setIsDetailHidden] = useState(true);
  const isRecordingRef = useRef(false);
  const callbacksRef = useRef({ onWordChange, onRecallRecorded });

  useEffect(() => {
    callbacksRef.current = { onWordChange, onRecallRecorded };
  });

  const showAnswer = () => {
    setIsDetailHidden(false);
  };

  const goNext = useCallback(async () => {
    if (isFetching) return;
    if (currentIndex + 1 < words.length) {
      setIsDetailHidden(true);
      callbacksRef.current.onWordChange();
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    setIsFetching(true);

    const { word, count } = await getRandomWord({
      tags,
      excludeIds: words.map((word) => word.id),
      levels,
    });

    if (word) {
      setWords((prev) => [...prev, word]);
      setWordCount(count);
      setIsDetailHidden(true);
      callbacksRef.current.onWordChange();
      setCurrentIndex((prev) => prev + 1);
    }

    setIsFetching(false);
  }, [currentIndex, isFetching, tags, levels, words]);

  const goPrev = () => {
    setIsDetailHidden(true);
    callbacksRef.current.onWordChange();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const selectRecall = async (status: RecallStatus) => {
    const word = words[currentIndex];
    if (!word || isRecordingRef.current) return;

    isRecordingRef.current = true;
    setIsRecording(true);

    recordRecall(word.id, status);
    setWords((prev) => prev.map((item) => (item.id === word.id ? { ...item, recallStatus: status } : item)));
    isRecordingRef.current = false;
    setIsRecording(false);
    callbacksRef.current.onRecallRecorded();

    await goNext();
  };

  useEffect(() => {
    if (words.length === 0 && isEnabled) {
      goNext();
    }
  }, [words, isEnabled, goNext]);

  useEffect(() => {
    setCurrentIndex(-1);
    setIsDetailHidden(false);
    callbacksRef.current.onWordChange();
    setWords([]);
    setWordCount(-1);
  }, [tags, levels]);

  const isReady = words.length > 0 && currentIndex >= 0;

  return {
    currentWord: isReady ? words[currentIndex] : null,
    currentIndex,
    wordCount,
    isFetching,
    isReady,
    isDetailHidden,
    isRecallDisabled: !isReady || isRecording || isFetching,
    canGoPrev: isReady && currentIndex > 0,
    canGoNext: isReady && !isFetching && currentIndex !== wordCount - 1,
    progress: wordCount > 0 ? ((currentIndex + 1) / wordCount) * 100 : 0,
    showAnswer,
    goNext,
    goPrev,
    selectRecall,
  };
}
