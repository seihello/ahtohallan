type Handlers = {
  onStart?: () => void;
  onEnd?: () => void;
};

export function speak(text: string, handlers: Handlers = {}) {
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.95;
  utterance.onstart = () => handlers.onStart?.();
  utterance.onend = () => handlers.onEnd?.();
  utterance.onerror = () => handlers.onEnd?.();

  synth.speak(utterance);
}

export function cancelSpeech() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}
