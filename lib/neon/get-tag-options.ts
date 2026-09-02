import { sql } from "@/lib/neon/db";

export async function getTagOptions(): Promise<string[]> {
  const rows = (await sql`
    SELECT DISTINCT unnest(tags) AS tag FROM words ORDER BY tag
  `) as { tag: string }[];

  return rows.map((row) => row.tag);
}
