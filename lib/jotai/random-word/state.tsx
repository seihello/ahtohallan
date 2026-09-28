import { TagFilter } from "@/lib/types";
import { atom } from "jotai";

export const tagFiltersState = atom<TagFilter[]>([]);

export const selectedLevelsState = atom<string[]>([]);
