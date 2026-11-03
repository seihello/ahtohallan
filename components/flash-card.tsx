import { Word } from "@/lib/types";

type Props = {
  word: Word | null;
  intervalMs: number;
  isPlaying: boolean;
  flashKey: number;
};

export default function FlashCard({ word, intervalMs, isPlaying, flashKey }: Props) {
  return (
    <article className="glass ice-edge flex min-h-72 w-full flex-col justify-center rounded-3xl px-5 py-10 sm:px-10">
      {word ? (
        <>
          <p className="text-frozen text-center font-display text-4xl leading-tight font-bold break-words sm:text-6xl">
            {word.names.split("\n")[0]}
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
