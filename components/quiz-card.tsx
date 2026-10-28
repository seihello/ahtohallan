"use client";

import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/lib/types";

type Props = {
  question: QuizQuestion;
  selected: string | null;
  onSelect: (choice: string) => void;
};

const CHOICE_LABELS = ["1", "2", "3", "4"];

function toMeaningText(meanings: string) {
  return meanings
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" / ");
}

export default function QuizCard({ question, selected, onSelect }: Props) {
  const isAnswered = selected !== null;
  const [before, after] = question.sentence.split(question.blank);

  return (
    <article className="glass ice-edge w-full rounded-3xl p-5 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="h-px w-6 bg-gradient-to-r from-transparent to-ice-200/60" />
        <span className="text-[10px] tracking-[0.4em] text-ice-200/60 uppercase">Choose the best word</span>
        <span className="ml-auto rounded-full border border-gold-400/45 bg-gold-500/12 px-3 py-1 font-mono text-[11px] tracking-widest text-gold-200">
          LV {question.level}
        </span>
      </div>

      <p className="mt-5 text-lg leading-relaxed text-frost-100 sm:text-xl">
        {before}
        <span
          className={`mx-1 inline-flex min-w-28 justify-center rounded-md border-b-2 px-2 font-display transition-colors ${
            isAnswered ? "border-gold-400 text-hearth" : "border-ice-300/60 text-transparent"
          }`}
        >
          {isAnswered ? question.answer : "...."}
        </span>
        {after}
      </p>

      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {question.choices.map(({ word, meanings }, index) => {
          const isCorrect = word === question.answer;
          const isSelected = word === selected;

          return (
            <Button
              key={word}
              variant="outline"
              onClick={() => onSelect(word)}
              className={`h-auto w-full items-start justify-start gap-x-3 py-3 text-base whitespace-normal ${
                isAnswered ? "pointer-events-none" : ""
              } ${
                isAnswered && isCorrect
                  ? "border-glacier-300/70 bg-glacier-600/40 text-glacier-50"
                  : isAnswered && isSelected
                    ? "border-destructive/70 bg-destructive/20 text-red-200"
                    : ""
              }`}
            >
              <span className="mt-0.5 font-mono text-[11px] text-frost-400">{CHOICE_LABELS[index]}</span>
              <span className="flex grow flex-col items-start gap-y-0.5 text-left">
                {word}
                {isAnswered && (
                  <span className="text-xs leading-snug text-frost-400">{toMeaningText(meanings)}</span>
                )}
              </span>
            </Button>
          );
        })}
      </div>

      {isAnswered && question.translation && (
        <p className="mt-6 border-t border-frost-200/12 pt-5 text-sm text-frost-400">{question.translation}</p>
      )}
    </article>
  );
}
