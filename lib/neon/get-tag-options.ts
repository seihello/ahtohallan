import { sql } from "@/lib/neon/db";

/** words に登録されているタグの一覧（Server Component から呼ぶ） */
export async function getTagOptions(): Promise<string[]> {
  const rows = (await sql`
    SELECT DISTINCT unnest(tags) AS tag FROM words ORDER BY tag
  `) as { tag: string }[];

  return rows.map((row) => row.tag);
}
