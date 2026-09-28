"use server";

import { sql } from "@/lib/neon/db";
import { RecallStatusCounts, SearchOptions } from "@/lib/types";

export async function getRecallStatusCounts(options: SearchOptions): Promise<RecallStatusCounts> {
  const tagFilters = options.tagFilters ?? [];
  const andTags = tagFilters.filter((filter) => filter.mode === "and").map((filter) => filter.tag);
  const orTags = tagFilters.filter((filter) => filter.mode === "or").map((filter) => filter.tag);
  const levels = (options.levels ?? []).map(Number).filter(Number.isInteger);

  const rows = (await sql`
    SELECT
      count(*) FILTER (WHERE recall_status = 'know')::int AS know,
      count(*) FILTER (WHERE recall_status = 'seen')::int AS seen,
      count(*) FILTER (WHERE recall_status = 'new')::int AS new,
      count(*) FILTER (WHERE recall_status IS NULL)::int AS untouched,
      count(*)::int AS total
    FROM words
    WHERE (cardinality(${andTags}::text[]) = 0 OR tags @> ${andTags}::text[])
      AND (cardinality(${orTags}::text[]) = 0 OR tags && ${orTags}::text[])
      AND (cardinality(${levels}::int[]) = 0 OR level = ANY(${levels}::int[]))
  `) as RecallStatusCounts[];

  return rows[0];
}
