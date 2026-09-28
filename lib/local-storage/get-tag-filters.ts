import { TagFilter, TagFilterMode } from "@/lib/types";

const DEFAULT_TAG_FILTERS: TagFilter[] = [{ tag: "英検", mode: "and" }];

function isTagFilter(value: unknown): value is TagFilter {
  if (typeof value !== "object" || value === null) return false;

  const { tag, mode } = value as { tag?: unknown; mode?: unknown };

  return typeof tag === "string" && (mode === "and" || mode === "or");
}

function readLegacyTagFilters(): TagFilter[] | null {
  const legacyTags = localStorage.getItem("selectedTags");
  if (legacyTags === null) return null;

  const mode: TagFilterMode = localStorage.getItem("tagMatchMode") === "all" ? "and" : "or";

  return legacyTags ? legacyTags.split(",").map((tag) => ({ tag, mode })) : [];
}

export function getTagFilters(): TagFilter[] {
  const stored = localStorage.getItem("tagFilters");

  if (stored !== null) {
    try {
      const parsed: unknown = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed.filter(isTagFilter);
    } catch {
      return DEFAULT_TAG_FILTERS;
    }
  }

  return readLegacyTagFilters() ?? DEFAULT_TAG_FILTERS;
}
