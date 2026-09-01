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

/** components/ui/slider.tsx のつまみ (size-6) と揃える */
const THUMB_SIZE = 24;

/**
 * 目盛りの数字をつまみの中心に合わせる。
 * Radix はつまみを `left: calc(percent% + offset px)` + translateX(-50%) で配置し、
 * offset = (つまみ幅 / 2) * (1 - percent / 50) で端が枠内に収まるよう補正している。
 */
function tickLeft(index: number): string {
  const percent = (index / (LEVELS.length - 1)) * 100;
  const offset = (THUMB_SIZE / 2) * (1 - percent / 50);
  const sign = offset < 0 ? "-" : "+";
  return `calc(${percent}% ${sign} ${Math.abs(offset)}px)`;
}

/** 保存されているレベル一覧をスライダーの [下限, 上限] に変換する。空 = 全レベル */
function toRange(levels: string[]): [number, number] {
  const numbers = levels.map(Number).filter(Number.isInteger);
  if (numbers.length === 0) {
    return [MIN_LEVEL, MAX_LEVEL];
  }
  return [Math.max(MIN_LEVEL, Math.min(...numbers)), Math.min(MAX_LEVEL, Math.max(...numbers))];
}

/** スライダーの範囲をレベル一覧に戻す */
function toLevels([min, max]: [number, number]): string[] {
  return Array.from({ length: max - min + 1 }, (_, index) => String(min + index));
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
      <h3 className="font-bold text-xl text-center">Tags</h3>
      <div className="flex gap-y-4 flex-wrap">
        {options.map((option) => {
          const id = `tag-${option}`;
          return (
            <div key={option} className="grow flex items-center justify-center gap-x-2 w-1/3 min-w-40">
              <Checkbox
                id={id}
                name={option}
                checked={selected.includes(option)}
                onCheckedChange={(checked: CheckedState) => {
                  if (checked === true) {
                    onChange(selected.includes(option) ? selected : [...selected, option]);
                  } else if (checked === false) {
                    onChange(selected.filter((prevOption) => prevOption !== option));
                  }
                }}
              />
              <Label htmlFor={id} className="grow">
                {option}
              </Label>
            </div>
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
      <h3 className="font-bold text-xl text-center">Levels</h3>
      <div className="px-1 space-y-3 max-w-[300px] mx-auto">
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
              className="absolute -translate-x-1/2 text-xs text-muted-foreground"
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="rounded-full border size-10 flex justify-center items-center">
        <IconFilter size={20} color="#666666" />
      </DialogTrigger>
      <DialogContent className="max-h-[85dvh] flex flex-col">
        <DialogTitle className="sr-only">Filters</DialogTitle>
        <div className="space-y-6 overflow-y-auto flex-1 min-h-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <LevelFilterSection range={levelRangeTemp} onChange={setLevelRangeTemp} />
          <TagFilterSection options={tagOptions} selected={selectedTagsTemp} onChange={setSelectedTagsTemp} />
        </div>
        <Button
          className="shrink-0"
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
