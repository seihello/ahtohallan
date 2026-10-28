"use client";

import { getQuizQuestion } from "@/lib/neon/get-quiz-question";
import { QuizQuestion } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

export function useQuiz() {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [askedIds, setAskedIds] = useState<string[]>([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  const loadQuestion = async (excludeIds: string[]) => {
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    const next = await getQuizQuestion(excludeIds);

    isLoadingRef.current = false;
    setIsLoading(false);

    if (!next) return;

    setQuestion(next);
    setSelected(null);
    setAskedIds([...excludeIds, next.id]);
  };

  useEffect(() => {
    if (question || isLoadingRef.current) return;

    loadQuestion([]);
  }, [question]);

  const select = (choice: string) => {
    if (!question || selected) return;

    setSelected(choice);
    setAnsweredCount((prev) => prev + 1);
    if (choice === question.answer) setCorrectCount((prev) => prev + 1);
  };

  const goNext = () => loadQuestion(askedIds);

  return {
    question,
    selected,
    isAnswered: selected !== null,
    isLoading,
    answeredCount,
    correctCount,
    select,
    goNext,
  };
}
