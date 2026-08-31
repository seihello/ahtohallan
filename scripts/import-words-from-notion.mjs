// Notion の Words データベースを Neon の words テーブルへ同期する。
// id は Notion のページ ID をそのまま使う。
//
//   node scripts/import-words-from-notion.mjs             # upsert（既存行は更新）
//   node scripts/import-words-from-notion.mjs --truncate  # 全削除してから取り込み
import { neon } from "@neondatabase/serverless";
import { Client } from "@notionhq/client";
import fs from "fs";
import path from "path";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
  }
}

for (const key of ["DATABASE_URL", "NOTION_API_KEY", "NOTION_DATABASE_ID_WORDS"]) {
  if (!process.env[key]) throw new Error(`${key} is not set`);
}

const sql = neon(process.env.DATABASE_URL);
const notion = new Client({ auth: process.env.NOTION_API_KEY });

/** rich_text を改行区切りの1つの文字列にまとめる */
function richText(property) {
  if (property?.type !== "rich_text") return "";
  return property.rich_text
    .map((item) => item.plain_text)
    .filter(Boolean)
    .join("\n")
    .trim();
}

function title(property) {
  if (property?.type !== "title") return "";
  return property.title
    .map((item) => item.plain_text)
    .join("")
    .trim();
}

async function fetchWords() {
  const words = [];
  let cursor = undefined;

  do {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID_WORDS,
      start_cursor: cursor,
      page_size: 100,
    });

    for (const page of response.results) {
      if (!("properties" in page)) continue;
      const p = page.properties;
      const names = richText(p.Names);
      if (!names) continue; // 空行は取り込まない

      words.push({
        id: page.id,
        name: title(p.Name) || names.split("\n")[0].trim(),
        names,
        meanings: richText(p.Meanings),
        sentences: richText(p.Sentences),
        collocations: richText(p.Collocations),
        synonyms: richText(p.Synonyms),
        pronunciations: richText(p.Pronunciations),
        level: p.Level?.type === "number" ? p.Level.number : null,
        tags: p.Tags?.type === "multi_select" ? p.Tags.multi_select.map((t) => t.name) : [],
        last_edited_at: page.last_edited_time ?? null,
      });
    }

    cursor = response.next_cursor ?? undefined;
    process.stdout.write(`\rfetched ${words.length} from Notion`);
  } while (cursor);

  process.stdout.write("\n");
  return words;
}

const words = await fetchWords();
if (words.length === 0) throw new Error("Notion から1件も取得できませんでした");

if (process.argv.includes("--truncate")) {
  await sql`TRUNCATE words`;
  console.log("truncated words");
}

const BATCH = 200;
let upserted = 0;
for (let i = 0; i < words.length; i += BATCH) {
  const batch = words.slice(i, i + BATCH);
  await sql`
    INSERT INTO words (id, name, names, meanings, sentences, collocations, synonyms, pronunciations, level, tags, last_edited_at, synced_at)
    SELECT id, name, names, meanings, sentences, collocations, synonyms, pronunciations, level,
           COALESCE(tags, '{}'), last_edited_at, now()
    FROM jsonb_to_recordset(${JSON.stringify(batch)}::jsonb) AS t(
      id text, name text, names text, meanings text, sentences text,
      collocations text, synonyms text, pronunciations text,
      level int, tags text[], last_edited_at timestamptz
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      names = EXCLUDED.names,
      meanings = EXCLUDED.meanings,
      sentences = EXCLUDED.sentences,
      collocations = EXCLUDED.collocations,
      synonyms = EXCLUDED.synonyms,
      pronunciations = EXCLUDED.pronunciations,
      level = EXCLUDED.level,
      tags = EXCLUDED.tags,
      last_edited_at = EXCLUDED.last_edited_at,
      synced_at = now()`;
  upserted += batch.length;
  process.stdout.write(`\rupserted ${upserted}/${words.length}`);
}

const [{ count }] = await sql`SELECT count(*)::int AS count FROM words`;
console.log(`\ndone: ${upserted} rows upserted, ${count} rows in words`);
