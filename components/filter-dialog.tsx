"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IconFilter } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAtom } from "jotai";
import { selectedLevelsState, tagFiltersState } from "@/lib/jotai/random-word/state";
import { TagFilter, TagFilterMode } from "@/lib/types";

const MIN_LEVEL = 1;
const MAX_LEVEL = 5;
const LEVELS = Array.from({ length: MAX_LEVEL - MIN_LEVEL + 1 }, (_, index) => MIN_LEVEL + index);

const THUMB_SIZE = 24;

function tickLeft(index: number): string {
  const percent = (index / (LEVELS.length - 1)) * 100;
  const offset = (THUMB_SIZE / 2) * (1 - percent / 50);
  const sign = offset < 0 ? "-" : "+";
  return `calc(${percent}% ${sign} ${Math.abs(offset)}px)`;
}

function toRange(levels: string[]): [number, number] {
  const numbers = levels.map(Number).filter(Number.isInteger);
  if (numbers.length === 0) {
    return [MIN_LEVEL, MAX_LEVEL];
  }
  return [Math.max(MIN_LEVEL, Math.min(...numbers)), Math.min(MAX_LEVEL, Math.max(...numbers))];
}

function toLevels([min, max]: [number, number]): string[] {
  return Array.from({ length: max - min + 1 }, (_, index) => String(min + index));
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-ice-200/40" />
      <h3 className="font-display text-sm tracking-[0.35em] text-frost-100 uppercase">{children}</h3>
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-ice-200/40" />
    </div>
  );
}

const MODE_SYMBOL: Record<TagFilterMode, string> = {
  and: "&",
  or: "|",
};

const NEXT_MODE: Record<string, TagFilterMode | null> = {
  none: "and",
  and: "or",
  or: null,
};

function toNextFilters(filters: TagFilter[], tag: string): TagFilter[] {
  const current = filters.find((filter) => filter.tag === tag);
  const next = NEXT_MODE[current?.mode ?? "none"];

  if (next === null) return filters.filter((filter) => filter.tag !== tag);
  if (!current) return [...filters, { tag, mode: next }];

  return filters.map((filter) => (filter.tag === tag ? { ...filter, mode: next } : filter));
}

function TagModeBadge({ mode, isSmall }: { mode?: TagFilterMode; isSmall?: boolean }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full border font-mono font-semibold ${
        isSmall ? "size-5 text-[11px]" : "size-6 text-[13px]"
      } ${
        mode === "and"
          ? "border-gold-400 bg-gold-500/80 text-timber-950"
          : mode === "or"
            ? "border-ice-300 bg-ice-400/80 text-glacier-950"
            : "border-frost-200/25 bg-frost-100/5"
      }`}
    >
      {mode ? MODE_SYMBOL[mode] : ""}
    </span>
  );
}

function TagModeLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-frost-300">
      <span className="flex items-center gap-x-1.5">
        <TagModeBadge mode="and" isSmall />
        AND検索
      </span>
      <span className="flex items-center gap-x-1.5">
        <TagModeBadge mode="or" isSmall />
        OR検索
      </span>
    </div>
  );
}

function TagFilterSection({
  options,
  filters,
  onChange,
}: {
  options: string[];
  filters: TagFilter[];
  onChange: (next: TagFilter[]) => void;
}) {
  return (
    <div className="space-y-4">
      <SectionTitle>Tags</SectionTitle>
      <TagModeLegend />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const mode = filters.find((filter) => filter.tag === option)?.mode;
          return (
            <button
              key={option}
              type="button"
              aria-label={`${option}: ${mode ? mode.toUpperCase() : "off"}`}
              onClick={() => onChange(toNextFilters(filters, option))}
              className={`flex cursor-pointer items-center gap-x-2 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
                mode === "and"
                  ? "border-gold-400/50 bg-gold-500/12 text-gold-100"
                  : mode === "or"
                    ? "border-ice-300/45 bg-ice-500/12 text-ice-100"
                    : "border-frost-200/15 bg-frost-100/5 text-frost-300 hover:border-ice-200/35 hover:text-frost-100"
              }`}
            >
              <TagModeBadge mode={mode} />
              <span className="grow leading-tight">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LevelFilterSection({
  range,
  onChange,
}: {
  range: [number, number];
  onChange: (next: [number, number]) => void;
}) {
  return (
    <div className="space-y-4">
      <SectionTitle>Levels</SectionTitle>
      <div className="mx-auto max-w-[300px] space-y-3 px-1">
        <Slider
          value={range}
          min={MIN_LEVEL}
          max={MAX_LEVEL}
          step={1}
          onValueChange={([min, max]) => onChange([min, max])}
          aria-label="Level range"
        />
        <div className="relative h-4">
          {LEVELS.map((level, index) => (
            <span
              key={level}
              className={`absolute -translate-x-1/2 font-mono text-xs transition-colors ${
                level >= range[0] && level <= range[1] ? "text-gold-300" : "text-frost-500"
              }`}
              style={{ left: tickLeft(index) }}
            >
              {level}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

type Props = {
  tagOptions: string[];
};

export default function FilterDialog({ tagOptions }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [tagFilters, setTagFilters] = useAtom(tagFiltersState);
  const [selectedLevels, setSelectedLevels] = useAtom(selectedLevelsState);
  const [tagFiltersTemp, setTagFiltersTemp] = useState<TagFilter[]>(tagFilters);
  const [levelRangeTemp, setLevelRangeTemp] = useState<[number, number]>(toRange(selectedLevels));

  useEffect(() => {
    if (!isOpen) {
      setTagFiltersTemp(tagFilters);
      setLevelRangeTemp(toRange(selectedLevels));
    }
  }, [isOpen, tagFilters, selectedLevels]);

  const isFiltered = tagFilters.length > 0 || toRange(selectedLevels).join() !== `${MIN_LEVEL},${MAX_LEVEL}`;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="relative flex size-10 items-center justify-center rounded-full border border-frost-200/20 bg-frost-100/5 text-frost-200 backdrop-blur-sm transition-colors hover:border-ice-200/50 hover:text-ice-100">
        <IconFilter size={18} stroke={1.6} />
        {isFiltered && (
          <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-gold-400 shadow-[0_0_10px_rgba(247,194,44,0.9)]" />
        )}
        <span className="sr-only">Filters</span>
      </DialogTrigger>
      <DialogContent className="flex max-h-[85dvh] flex-col">
        <DialogTitle className="sr-only">Filters</DialogTitle>
        <div className="min-h-0 flex-1 space-y-8 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <LevelFilterSection range={levelRangeTemp} onChange={setLevelRangeTemp} />
          <TagFilterSection options={tagOptions} filters={tagFiltersTemp} onChange={setTagFiltersTemp} />
        </div>
        <Button
          className="w-full shrink-0"
          onClick={() => {
            setIsOpen(false);
            setSelectedLevels(toLevels(levelRangeTemp));
            setTagFilters(tagFiltersTemp);
          }}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
}
