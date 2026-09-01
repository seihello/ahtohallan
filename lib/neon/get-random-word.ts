"use server";

import { sql } from "@/lib/neon/db";
import { SearchOptions, Word } from "@/lib/types";

/**
 * 条件に合う単語をランダムに1件返す。
 * count は除外前の該当件数（画面の「n / 全件」表示用）。
 */
export async function getRandomWord(options: SearchOptions): Promise<{ word: Word | null; count: number }> {
  const tags = options.tags ?? [];
  const levels = (options.levels ?? []).map(Number).filter(Number.isInteger);
  const excludeIds = options.excludeIds ?? [];

  const rows = (await sql`
    WITH filtered AS (
      SELECT * FROM words
      WHERE (cardinality(${tags}::text[]) = 0 OR tags && ${tags}::text[])
        AND (cardinality(${levels}::int[]) = 0 OR level = ANY(${levels}::int[]))
    )
    SELECT
      f.id,
      f.names,
      f.meanings,
      f.sentences,
      f.collocations,
      f.synonyms,
      f.pronunciations,
      COALESCE(f.level, 0) AS level,
      f.tags,
      f.recall_status AS "recallStatus",
      (SELECT count(*)::int FROM filtered) AS count
    FROM filtered f
    WHERE NOT (f.id = ANY(${excludeIds}::text[]))
    ORDER BY random()
    LIMIT 1
  `) as (Word & { count: number })[];

  if (rows.length === 0) {
    return { word: null, count: 0 };
  }

  const { count, ...word } = rows[0];

  return { word, count };
}
