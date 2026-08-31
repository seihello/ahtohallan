// assets/eiken-words.csv を Neon の words テーブルへ投入する。
// 使い方: node scripts/import-words.mjs [--truncate]
import { neon } from "@neondatabase/serverless";
import csvParser from "csv-parser";
import fs from "fs";
import path from "path";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, "");
  }
}

const sql = neon(process.env.DATABASE_URL ?? "");

function readCsv() {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(path.join(process.cwd(), "assets/eiken-words.csv"))
      .pipe(
        csvParser({
          mapHeaders: ({ header }) =>
            header.trim().replace(/﻿/g, "").replace(/^['"]|['"]$/g, ""),
        })
      )
      .on("data", (d) => rows.push(d))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}

const rows = (await readCsv())
  .map((d) => {
    const names = (d.Names ?? "").trim();
    const name = (d.Name ?? "").trim() || names.split("\n")[0].trim();
    const level = d.Level?.trim() ? Number(d.Level) : null;
    return {
      name,
      names,
      meanings: (d.Meanings ?? "").trim(),
      sentences: (d.Sentences ?? "").trim(),
      collocations: (d.Collocations ?? "").trim(),
      synonyms: (d.Synonyms ?? "").trim(),
      pronunciations: (d.Pronunciations ?? "").trim(),
      level: Number.isFinite(level) ? level : null,
      tags: (d.Tags ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
  })
  .filter((w) => w.name); // 空行を除外

if (process.argv.includes("--truncate")) {
  await sql`TRUNCATE words RESTART IDENTITY`;
  console.log("truncated words");
}

const BATCH = 200;
let inserted = 0;
for (let i = 0; i < rows.length; i += BATCH) {
  const batch = rows.slice(i, i + BATCH);
  await sql`
    INSERT INTO words (name, names, meanings, sentences, collocations, synonyms, pronunciations, level, tags)
    SELECT name, names, meanings, sentences, collocations, synonyms, pronunciations, level,
           COALESCE(tags, '{}')
    FROM jsonb_to_recordset(${JSON.stringify(batch)}::jsonb) AS t(
      name text, names text, meanings text, sentences text,
      collocations text, synonyms text, pronunciations text,
      level int, tags text[]
    )`;
  inserted += batch.length;
  process.stdout.write(`\rinserted ${inserted}/${rows.length}`);
}
console.log(`\ndone: ${inserted} rows`);
