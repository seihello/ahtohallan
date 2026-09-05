import { IconSnowflake } from "@tabler/icons-react";

type Props = {
  isLoading: boolean;
};

export default function WordPlaceholder({ isLoading }: Props) {
  return (
    <div className="glass ice-edge flex h-48 items-center justify-center rounded-3xl">
      <span className="animate-shimmer flex items-center gap-x-2 text-[11px] tracking-[0.35em] text-ice-100/80 uppercase">
        <IconSnowflake size={14} stroke={1.5} />
        {isLoading ? "Listening to the river" : "No word found"}
      </span>
    </div>
  );
}
