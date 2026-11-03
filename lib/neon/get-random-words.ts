"use server";

import { sql } from "@/lib/neon/db";
import { SearchOptions, Word } from "@/lib/types";

const DEFAULT_LIMIT = 40;

export async function getRandomWords(options: SearchOptions & { limit?: number }): Promise<Word[]> {
  const tagFilters = options.tagFilters ?? [];
  const andTags = tagFilters.filter((filter) => filter.mode === "and").map((filter) => filter.tag);
  const orTags = tagFilters.filter((filter) => filter.mode === "or").map((filter) => filter.tag);
  const levels = (options.levels ?? []).map(Number).filter(Number.isInteger);
  const excludeIds = options.excludeIds ?? [];
  const recallStatuses = options.recallStatuses ?? [];
  const limit = options.limit ?? DEFAULT_LIMIT;

  return (await sql`
    SELECT
      id,
      names,
      meanings,
      sentences,
      collocations,
      synonyms,
      pronunciations,
      COALESCE(level, 0) AS level,
      tags,
      recall_status AS "recallStatus"
    FROM words
    WHERE (cardinality(${andTags}::text[]) = 0 OR tags @> ${andTags}::text[])
      AND (cardinality(${orTags}::text[]) = 0 OR tags && ${orTags}::text[])
      AND (cardinality(${levels}::int[]) = 0 OR level = ANY(${levels}::int[]))
      AND (
        cardinality(${recallStatuses}::text[]) = 0
        OR COALESCE(recall_status, 'untouched') = ANY(${recallStatuses}::text[])
      )
      AND NOT (id = ANY(${excludeIds}::text[]))
    ORDER BY random()
    LIMIT ${limit}
  `) as Word[];
}
