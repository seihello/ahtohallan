"use client";

import { getAiQuizQuestion, getQuizQuestion } from "@/lib/neon/get-quiz-question";
import { QuizQuestion, QuizSource } from "@/lib/types";
import { useCallback, useEffect, useRef, useState } from "react";

const LOAD_QUESTION: Record<QuizSource, (excludeIds: string[]) => Promise<QuizQuestion | null>> = {
  stored: getQuizQuestion,
  ai: getAiQuizQuestion,
};

export function useQuiz() {
  const [source, setSource] = useState<QuizSource>("stored");
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);
  const askedIdsRef = useRef<string[]>([]);
  const prefetchedRef = useRef<QuizQuestion | null>(null);
  const prefetchingRef = useRef<Promise<QuizQuestion | null> | null>(null);
  const generationRef = useRef(0);

  const fetchQuestion = useCallback(
    (nextSource: QuizSource) =>
      LOAD_QUESTION[nextSource](askedIdsRef.current).then((next) => {
        if (next) askedIdsRef.current = [...askedIdsRef.current, next.id];

        return next;
      }),
    []
  );

  const prefetch = useCallback((nextSource: QuizSource) => {
    if (prefetchedRef.current || prefetchingRef.current) return;

    const generation = generationRef.current;
    const pending = fetchQuestion(nextSource);
    prefetchingRef.current = pending;

    pending.then((next) => {
      if (generation !== generationRef.current) return;

      prefetchingRef.current = null;
      prefetchedRef.current = next;
    });
  }, [fetchQuestion]);

  const loadQuestion = useCallback(async (nextSource: QuizSource) => {
    if (isLoadingRef.current) return;

    const generation = generationRef.current;
    const prefetched = prefetchedRef.current;
    const pending = prefetched
      ? Promise.resolve(prefetched)
      : (prefetchingRef.current ?? fetchQuestion(nextSource));

    prefetchedRef.current = null;
    prefetchingRef.current = null;
    isLoadingRef.current = true;
    if (!prefetched) setIsLoading(true);

    const next = await pending;

    isLoadingRef.current = false;
    setIsLoading(false);

    if (generation !== generationRef.current || !next) return;

    setQuestion(next);
    setSelected(null);
    prefetch(nextSource);
  }, [fetchQuestion, prefetch]);

  useEffect(() => {
    if (question || isLoadingRef.current) return;

    loadQuestion(source);
  }, [loadQuestion, question, source]);

  const select = (choice: string) => {
    if (!question || selected) return;

    setSelected(choice);
    setAnsweredCount((prev) => prev + 1);
    if (choice === question.answer) setCorrectCount((prev) => prev + 1);
  };

  const selectSource = (nextSource: QuizSource) => {
    if (nextSource === source || isLoadingRef.current) return;

    generationRef.current += 1;
    prefetchedRef.current = null;
    prefetchingRef.current = null;
    setSource(nextSource);
    setSelected(null);
    setQuestion(null);
  };

  return {
    source,
    question,
    selected,
    isAnswered: selected !== null,
    isLoading,
    answeredCount,
    correctCount,
    select,
    selectSource,
    goNext: () => loadQuestion(source),
  };
}
