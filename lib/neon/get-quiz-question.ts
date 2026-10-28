"use server";

import { sql } from "@/lib/neon/db";
import { QuizChoice, QuizQuestion } from "@/lib/types";

const JAPANESE = /[ぁ-んァ-ヶ一-龥]/;

const BLANK = "(          )";

type Row = {
  id: string;
  word: string;
  meanings: string;
  sentences: string;
  level: number;
  distractors: QuizChoice[] | null;
};

function toEnglishSentence(sentences: string) {
  const firstLine = sentences.split("\n")[0];
  const japaneseIndex = firstLine.search(JAPANESE);

  return japaneseIndex === -1 ? firstLine.trim() : firstLine.slice(0, japaneseIndex).trim();
}

function toTranslation(sentences: string) {
  const firstLine = sentences.split("\n")[0];
  const japaneseIndex = firstLine.search(JAPANESE);

  return japaneseIndex === -1 ? "" : firstLine.slice(japaneseIndex).trim();
}

function shuffle<T>(items: T[]) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index--) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }

  return shuffled;
}

export async function getQuizQuestion(excludeIds: string[] = []): Promise<QuizQuestion | null> {
  const rows = (await sql`
    WITH pool AS (
      SELECT
        id,
        split_part(names, chr(10), 1) AS word,
        meanings,
        sentences,
        COALESCE(level, 0) AS level
      FROM words
      WHERE tags @> ARRAY['英検']::text[]
        AND sentences <> ''
        AND split_part(names, chr(10), 1) ~ '^[A-Za-z''-]+$'
        AND sentences ~* ('\\m' || split_part(names, chr(10), 1) || '\\M')
    ),
    answer AS (
      SELECT * FROM pool
      WHERE NOT (id = ANY(${excludeIds}::text[]))
      ORDER BY random()
      LIMIT 1
    )
    SELECT
      answer.id,
      answer.word,
      answer.meanings,
      answer.sentences,
      answer.level,
      (
        SELECT jsonb_agg(distractor)
        FROM (
          SELECT pool.word, pool.meanings FROM pool
          WHERE pool.id <> answer.id AND pool.word <> answer.word
          ORDER BY (pool.level = answer.level) DESC, random()
          LIMIT 3
        ) AS distractor
      ) AS distractors
    FROM answer
  `) as Row[];

  if (rows.length === 0) return null;

  const { id, word, meanings, sentences, level, distractors } = rows[0];
  const sentence = toEnglishSentence(sentences);
  const blanked = sentence.replace(new RegExp(`\\b${word}\\b`, "i"), BLANK);

  if (blanked === sentence) return null;

  return {
    id,
    sentence: blanked,
    blank: BLANK,
    answer: word,
    choices: shuffle([{ word, meanings }, ...(distractors ?? [])]),
    level,
    translation: toTranslation(sentences),
  };
}
