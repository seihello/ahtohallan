import { TagMatchMode } from "@/lib/types";
import { atom } from "jotai";

export const selectedTagsState = atom<string[]>([]);

export const selectedLevelsState = atom<string[]>([]);

export const tagMatchModeState = atom<TagMatchMode>("any");
