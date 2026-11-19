type Handlers = {
  onStart?: () => void;
  onEnd?: () => void;
};

const RESTART_DELAY_MS = 80;
const START_TIMEOUT_MS = 600;

let generation = 0;
let activeUtterance: SpeechSynthesisUtterance | null = null;
let startTimer: number | null = null;
let restartTimer: number | null = null;

function clearTimers() {
  if (startTimer !== null) window.clearTimeout(startTimer);
  if (restartTimer !== null) window.clearTimeout(restartTimer);
  startTimer = null;
  restartTimer = null;
}

function enqueue(text: string, handlers: Handlers, requestGeneration: number, canRetry: boolean) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.95;

  let hasStarted = false;

  utterance.onstart = () => {
    hasStarted = true;
    if (requestGeneration !== generation) return;
    clearTimers();
    handlers.onStart?.();
  };
  utterance.onend = () => {
    if (activeUtterance === utterance) activeUtterance = null;
    if (requestGeneration !== generation) return;
    clearTimers();
    handlers.onEnd?.();
  };
  utterance.onerror = () => {
    if (activeUtterance === utterance) activeUtterance = null;
    if (requestGeneration !== generation) return;
    clearTimers();
    handlers.onEnd?.();
  };

  activeUtterance = utterance;
  synth.speak(utterance);

  if (!canRetry) return;

  startTimer = window.setTimeout(() => {
    if (hasStarted || requestGeneration !== generation) return;
    synth.cancel();
    synth.resume();
    enqueue(text, handlers, requestGeneration, false);
  }, START_TIMEOUT_MS);
}

export function speak(text: string, handlers: Handlers = {}) {
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  generation += 1;
  const requestGeneration = generation;
  clearTimers();

  if (!synth.speaking && !synth.pending && !synth.paused) {
    enqueue(text, handlers, requestGeneration, true);
    return;
  }

  synth.cancel();
  synth.resume();

  restartTimer = window.setTimeout(() => {
    if (requestGeneration !== generation) return;
    restartTimer = null;
    enqueue(text, handlers, requestGeneration, true);
  }, RESTART_DELAY_MS);
}

export function cancelSpeech() {
  if (!("speechSynthesis" in window)) return;

  generation += 1;
  clearTimers();
  activeUtterance = null;
  window.speechSynthesis.cancel();
}
