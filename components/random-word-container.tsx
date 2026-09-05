"use client";

import AiMessagePanel from "@/components/ai-message-panel";
import AppHeader from "@/components/app-header";
import ProgressBar from "@/components/progress-bar";
import RandomWord from "@/components/random-word";
import RecallButtons from "@/components/recall-buttons";
import RecallStatusBar from "@/components/recall-status-bar";
import RecallStatusLabel from "@/components/recall-status-label";
import WordControls from "@/components/word-controls";
import WordPlaceholder from "@/components/word-placeholder";
import { useAiExplanation } from "@/hooks/use-ai-explanation";
import { useAiSentences } from "@/hooks/use-ai-sentences";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useRecallStatusCounts } from "@/hooks/use-recall-status-counts";
import { useSwipe } from "@/hooks/use-swipe";
import { useWordQueue } from "@/hooks/use-word-queue";
import { selectedLevelsState, selectedTagsState } from "@/lib/jotai/random-word/state";
import { useAtom } from "jotai";

type Props = {
  tagOptions: string[];
};

export default function RandomWordContainer({ tagOptions }: Props) {
  const [selectedTags] = useAtom(selectedTagsState);
  const [selectedLevels] = useAtom(selectedLevelsState);
  const { isLoading: isLoadingLocalStorage } = useLocalStorage();

  const {
    messages: explanations,
    status: explanationStatus,
    setMessages: setExplanations,
    run: generateExplanation,
  } = useAiExplanation();

  const {
    messages: sentences,
    status: sentenceStatus,
    setMessages: setSentences,
    run: generateSentences,
  } = useAiSentences();

  const clearAiMessages = () => {
    setExplanations([]);
    setSentences([]);
  };

  const { counts: statusCounts, refresh: refreshStatusCounts } = useRecallStatusCounts({
    tags: selectedTags,
    levels: selectedLevels,
    isEnabled: !isLoadingLocalStorage,
  });

  const queue = useWordQueue({
    tags: selectedTags,
    levels: selectedLevels,
    isEnabled: !isLoadingLocalStorage,
    onWordChange: clearAiMessages,
    onRecallRecorded: refreshStatusCounts,
  });

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => {
      if (queue.canGoNext) queue.goNext();
    },
    onSwipeRight: () => {
      if (queue.canGoPrev) queue.goPrev();
    },
  });

  return (
    <div className="mx-auto flex h-screen w-full max-w-256 flex-col items-end justify-center py-2 sm:px-8">
      <AppHeader tagOptions={tagOptions} currentIndex={queue.currentIndex} wordCount={queue.wordCount} />

      <div className="mt-3 w-full space-y-2.5 px-4 sm:order-1 sm:px-2">
        <ProgressBar value={queue.progress} />
        <RecallStatusBar counts={statusCounts} />
      </div>

      <div className="w-full grow space-y-4 overflow-y-scroll px-4 pt-4 pb-6 sm:order-3 sm:px-2" {...swipeHandlers}>
        {queue.currentWord ? (
          <>
            <RandomWord word={queue.currentWord} isDetailHidden={queue.isDetailHidden} onReveal={queue.showAnswer} />
            <RecallStatusLabel status={queue.currentWord.recallStatus} />
          </>
        ) : (
          <WordPlaceholder isLoading={queue.isFetching || isLoadingLocalStorage} />
        )}

        <RecallButtons
          className="mx-auto mt-12 hidden w-fit gap-2 sm:flex"
          onSelect={queue.selectRecall}
          disabled={queue.isRecallDisabled}
        />

        <AiMessagePanel messages={explanations} className="text-glacier-100" />
        <AiMessagePanel messages={sentences} className="text-gold-100" />
      </div>

      <WordControls
        onSelectRecall={queue.selectRecall}
        isRecallDisabled={queue.isRecallDisabled}
        canGoPrev={queue.canGoPrev}
        canGoNext={queue.canGoNext}
        onClickPrev={queue.goPrev}
        onClickNext={queue.goNext}
      >
        {/* <Button
          variant="outline"
          onClick={() => generateExplanation(queue.currentWord.names)}
          disabled={!queue.isReady || explanationStatus === "submitted" || explanationStatus === "streaming"}
        >
          Explain Word
        </Button> */}
        {/* <Button
          variant="outline"
          onClick={() => generateSentences(queue.currentWord.names)}
          disabled={!queue.isReady || sentenceStatus === "submitted" || sentenceStatus === "streaming"}
        >
          Make Sentence
        </Button> */}
      </WordControls>
    </div>
  );
}
