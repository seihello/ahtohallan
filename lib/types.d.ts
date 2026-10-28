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

export type QuizChoice = {
  word: string;
  meanings: string;
};

export type QuizQuestion = {
  id: string;
  sentence: string;
  blank: string;
  answer: string;
  choices: QuizChoice[];
  level: number;
  translation: string;
};

export type RecallStatusFilter = RecallStatus | "untouched";

export type TagFilterMode = "and" | "or";

export type TagFilter = {
  tag: string;
  mode: TagFilterMode;
};

export type SearchOptions = {
  excludeIds?: string[];
  tagFilters?: TagFilter[];
  levels?: string[];
  recallStatuses?: RecallStatusFilter[];
};
