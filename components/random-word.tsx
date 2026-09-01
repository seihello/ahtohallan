import { Word } from "@/lib/types";
import React from "react";

type Props = {
  word: Word;
  isDetailHidden: boolean;
  onReveal: () => void;
};

export default function RandomWord({ word, isDetailHidden, onReveal }: Props) {
  return (
    <div className="space-y-2 whitespace-pre-line w-full">
      <div className="font-bold text-2xl text-primary-700">{word.names}</div>

      <div
        // ぼかしを「かける」ときはトランジションを付けない。
        // 付けると次の単語に切り替えた瞬間、ぼけきるまでの間だけ中身が読めてしまう。
        className={`space-y-2 ${
          isDetailHidden ? "blur-sm cursor-pointer select-none" : "transition-[filter] duration-200"
        }`}
        {...(isDetailHidden
          ? {
              role: "button",
              tabIndex: 0,
              "aria-label": "Show answer",
              onClick: onReveal,
              onKeyDown: (event: React.KeyboardEvent) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onReveal();
                }
              },
            }
          : {})}
      >
        <div className="text-gray-500">{word.meanings}</div>
        <div>{word.sentences}</div>
        <div className="flex flex-wrap gap-2 justify-end">
          {word.level && (
            <div className="border border-gray-300 rounded-md px-2 py-1 text-xs flex items-center justify-center">
              Level {word.level}
            </div>
          )}
          {word.tags.map((tag, index) => (
            <span key={index} className="rounded-full bg-primary-100 px-2.5 py-1 text-xs font-medium text-primary-700">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
