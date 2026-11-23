type Handlers = {
  onStart?: () => void;
  onEnd?: () => void;
};

const RESTART_DELAY_MS = 80;
const START_TIMEOUT_MS = 600;
const MAX_UTTERANCE_MS = 10000;

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
  let deadlineTimer: number | null = null;

  const release = () => {
    if (deadlineTimer !== null) window.clearTimeout(deadlineTimer);
    if (activeUtterance === utterance) activeUtterance = null;
    if (requestGeneration !== generation) return;
    clearTimers();
    handlers.onEnd?.();
  };

  utterance.onstart = () => {
    hasStarted = true;
    if (requestGeneration !== generation) return;
    clearTimers();
    handlers.onStart?.();
  };
  utterance.onend = release;
  utterance.onerror = release;

  activeUtterance = utterance;
  synth.speak(utterance);

  deadlineTimer = window.setTimeout(release, MAX_UTTERANCE_MS);

  if (!canRetry) return;

  startTimer = window.setTimeout(() => {
    if (hasStarted || requestGeneration !== generation) return;
    synth.cancel();
    synth.resume();
    enqueue(text, handlers, requestGeneration, false);
  }, START_TIMEOUT_MS);
}

function start(text: string, handlers: Handlers, shouldInterrupt: boolean) {
  const synth = window.speechSynthesis;
  generation += 1;
  const requestGeneration = generation;
  clearTimers();

  if (!shouldInterrupt || (!synth.speaking && !synth.pending && !synth.paused)) {
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

export function speak(text: string, handlers: Handlers = {}) {
  if (!("speechSynthesis" in window)) return;

  start(text, handlers, true);
}

export function speakWhenIdle(text: string, handlers: Handlers = {}) {
  if (!("speechSynthesis" in window)) return false;
  if (activeUtterance !== null) return false;

  start(text, handlers, false);
  return true;
}

export function cancelSpeech() {
  if (!("speechSynthesis" in window)) return;

  generation += 1;
  clearTimers();
  activeUtterance = null;
  window.speechSynthesis.cancel();
}
