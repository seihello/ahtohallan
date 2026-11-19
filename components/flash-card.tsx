"use client";

import { cancelSpeech, speak } from "@/lib/speech/speak";
import { Word } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

type Props = {
  word: Word | null;
  intervalMs: number;
  isPlaying: boolean;
  isAutoPlayEnabled: boolean;
  flashKey: number;
};

function toHeadword(names: string) {
  return names.split("\n")[0];
}

export default function FlashCard({ word, intervalMs, isPlaying, isAutoPlayEnabled, flashKey }: Props) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const spokenIdRef = useRef<string | null>(null);

  useEffect(() => {
    return () => cancelSpeech();
  }, []);

  useEffect(() => {
    if (!isAutoPlayEnabled) {
      spokenIdRef.current = null;
      return;
    }

    if (!word || spokenIdRef.current === word.id) return;

    const isFirstWordAfterEnabled = spokenIdRef.current === null;
    spokenIdRef.current = word.id;

    if (isFirstWordAfterEnabled) return;

    speak(toHeadword(word.names), {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    });
  }, [isAutoPlayEnabled, word]);

  return (
    <article className="glass ice-edge flex min-h-72 w-full flex-col justify-center rounded-3xl px-5 py-10 sm:px-10">
      {word ? (
        <>
          <p
            className={`text-center font-display text-4xl leading-tight font-bold break-words transition-colors sm:text-6xl ${
              isSpeaking ? "text-hearth" : "text-frozen"
            }`}
          >
            {toHeadword(word.names)}
          </p>
          <div className="mx-auto mt-8 h-px w-full max-w-md overflow-hidden rounded-full bg-frost-200/12">
            {isPlaying && (
              <div
                key={flashKey}
                className="h-full animate-[flash-progress_linear_forwards] bg-gradient-to-r from-gold-500 to-ice-200"
                style={{ animationDuration: `${intervalMs}ms` }}
              />
            )}
          </div>
        </>
      ) : (
        <p className="animate-shimmer text-center text-[11px] tracking-[0.35em] text-ice-100/80 uppercase">
          Listening to the river
        </p>
      )}
    </article>
  );
}
