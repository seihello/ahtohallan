export type WordSummary = {
  id: string;
  level: number;
  tags: string[];
};

export type RecallStatus = "know" | "seen" | "new";

export type Word = {
  id: string;
  names: string;
  meanings: string;
  sentences: string;
  collocations: string;
  pronunciations: string;
  synonyms: string;
  level: number;
  tags: string[];
  recallStatus: RecallStatus | null;
};

export type RecallStatusCounts = {
  know: number;
  seen: number;
  new: number;
  untouched: number;
  total: number;
};

export type SearchOptions = { excludeIds?: string[]; tags?: string[]; levels?: string[] };
