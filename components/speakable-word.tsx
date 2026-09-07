"use client";

import { IconVolume } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

function toSpeech(names: string) {
  return names
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(", ");
}

function speak(names: string, onStart: () => void, onEnd: () => void) {
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(toSpeech(names));
  utterance.lang = "en-US";
  utterance.rate = 0.95;
  utterance.onstart = onStart;
  utterance.onend = onEnd;
  utterance.onerror = onEnd;

  synth.speak(utterance);
}

type Props = {
  names: string;
  isAutoPlayEnabled: boolean;
};

export default function SpeakableWord({ names, isAutoPlayEnabled }: Props) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [shouldAutoPlay] = useState(isAutoPlayEnabled);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    if (!shouldAutoPlay) return;

    speak(
      names,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  }, [shouldAutoPlay, names]);

  const onClick = () => {
    speak(
      names,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  return (
    <>
      <button
        type="button"
        aria-label="Speak word"
        onClick={onClick}
        className={`absolute top-0 right-0 flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors ${
          isSpeaking
            ? "border-gold-400/60 bg-gold-500/20 text-gold-200"
            : "border-frost-200/20 bg-frost-100/5 text-frost-300 hover:border-ice-200/50 hover:text-ice-100"
        }`}
      >
        <IconVolume size={18} stroke={1.6} className={isSpeaking ? "animate-pulse" : undefined} />
      </button>

      <h2
        className={`pr-12 font-display text-2xl leading-tight font-bold sm:text-3xl ${
          isSpeaking ? "text-hearth" : "text-frozen"
        }`}
      >
        {names}
      </h2>
    </>
  );
}
