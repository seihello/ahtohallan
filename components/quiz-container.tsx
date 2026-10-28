"use client";

import QuizCard from "@/components/quiz-card";
import QuizHeader from "@/components/quiz-header";
import { Button } from "@/components/ui/button";
import { useDisplayMode } from "@/hooks/use-display-mode";
import { useQuiz } from "@/hooks/use-quiz";
import { IconSnowflake } from "@tabler/icons-react";

export default function QuizContainer() {
  const { isPwa } = useDisplayMode();
  const { question, selected, isAnswered, isLoading, answeredCount, correctCount, select, goNext } = useQuiz();

  return (
    <div className="mx-auto flex h-screen w-full max-w-256 flex-col pt-2 sm:px-8">
      <QuizHeader correctCount={correctCount} answeredCount={answeredCount} />

      <div className="w-full grow space-y-4 overflow-y-scroll px-4 pt-6 pb-6 sm:px-2">
        {question ? (
          <QuizCard question={question} selected={selected} onSelect={select} />
        ) : (
          <div className="glass ice-edge flex h-48 items-center justify-center rounded-3xl">
            <span className="animate-shimmer flex items-center gap-x-2 text-[11px] tracking-[0.35em] text-ice-100/80 uppercase">
              <IconSnowflake size={14} stroke={1.5} />
              {isLoading ? "Listening to the river" : "No question found"}
            </span>
          </div>
        )}
      </div>

      <div
        className={`flex w-full flex-col gap-2 border-t border-frost-200/12 bg-glacier-950/75 px-4 pt-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-end ${
          isPwa ? "pb-16" : "pb-4"
        }`}
      >
        <Button onClick={goNext} disabled={!isAnswered || isLoading} className="w-full sm:w-32">
          Next
        </Button>
      </div>
    </div>
  );
}
