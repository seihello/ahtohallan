"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IconFilter } from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useAtom } from "jotai";
import { selectedLevelsState, selectedTagsState } from "@/lib/jotai/random-word/state";

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

function TagFilterSection({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="space-y-4">
      <SectionTitle>Tags</SectionTitle>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const id = `tag-${option}`;
          const isSelected = selected.includes(option);
          return (
            <Label
              key={option}
              htmlFor={id}
              className={`flex cursor-pointer items-center gap-x-2 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                isSelected
                  ? "border-gold-400/50 bg-gold-500/12 text-gold-100"
                  : "border-frost-200/15 bg-frost-100/5 text-frost-300 hover:border-ice-200/35 hover:text-frost-100"
              }`}
            >
              <Checkbox
                id={id}
                name={option}
                className="size-5"
                checked={isSelected}
                onCheckedChange={(checked: CheckedState) => {
                  if (checked === true) {
                    onChange(selected.includes(option) ? selected : [...selected, option]);
                  } else if (checked === false) {
                    onChange(selected.filter((prevOption) => prevOption !== option));
                  }
                }}
              />
              <span className="grow leading-tight">{option}</span>
            </Label>
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
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsState);
  const [selectedLevels, setSelectedLevels] = useAtom(selectedLevelsState);
  const [selectedTagsTemp, setSelectedTagsTemp] = useState<string[]>(selectedTags);
  const [levelRangeTemp, setLevelRangeTemp] = useState<[number, number]>(toRange(selectedLevels));

  useEffect(() => {
    if (!isOpen) {
      setSelectedTagsTemp(selectedTags);
      setLevelRangeTemp(toRange(selectedLevels));
    }
  }, [isOpen, selectedTags, selectedLevels]);

  const isFiltered = selectedTags.length > 0 || toRange(selectedLevels).join() !== `${MIN_LEVEL},${MAX_LEVEL}`;

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
          <TagFilterSection options={tagOptions} selected={selectedTagsTemp} onChange={setSelectedTagsTemp} />
        </div>
        <Button
          className="w-full shrink-0"
          onClick={() => {
            setIsOpen(false);
            setSelectedLevels(toLevels(levelRangeTemp));
            setSelectedTags(selectedTagsTemp);
          }}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
}
