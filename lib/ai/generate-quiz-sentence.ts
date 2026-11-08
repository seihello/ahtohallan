"use server";

import { claude } from "@/lib/ai/claude";
import { generateText } from "ai";

const MARKER = "___";
const MAX_ATTEMPTS = 2;

type QuizSentence = {
  sentence: string;
  translation: string;
};

function toPrompt(word: string, meanings: string, distractors: string[]) {
  return `英検1級の語彙問題を1問作ってください。

正解の単語: "${word}"
正解の単語の意味: ${meanings.split("\n").filter(Boolean).join(" / ")}
誤答の選択肢: ${distractors.map((distractor) => `"${distractor}"`).join(", ")}

ルール:
- 空所を1箇所だけ持つ英文を1文作ってください。空所は ${MARKER} で表してください。
- 空所に "${word}" をそのままの語形で入れたときに、文法的にも意味的にも自然な英文になるようにしてください。活用形や複数形に変えないと成立しない文にしてはいけません。
- 誤答の選択肢を空所に入れた場合は、意味が成立しないようにしてください。
- "${word}" およびその派生形・活用形を、空所以外の場所に出してはいけません。
- 英検1級の水準で、新聞記事や評論に出るような硬めの文体にしてください。長さは15〜30語程度。
- 1行目に英文、2行目にその和訳だけを出力してください。空所の部分は和訳に訳し込んでください。
- 見出し、番号、記号、解説など、英文と和訳以外のテキストは一切出力してはいけません。`;
}

function parse(text: string, word: string): QuizSentence | null {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const sentenceIndex = lines.findIndex((line) => line.includes(MARKER));
  if (sentenceIndex === -1) return null;

  const sentence = lines[sentenceIndex];
  if (sentence.split(MARKER).length !== 2) return null;
  if (new RegExp(`\\b${word}`, "i").test(sentence)) return null;

  return {
    sentence,
    translation: lines[sentenceIndex + 1] ?? "",
  };
}

export async function generateQuizSentence(
  word: string,
  meanings: string,
  distractors: string[],
  blank: string
): Promise<QuizSentence | null> {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const { text } = await generateText({
      model: claude,
      maxTokens: 8192,
      prompt: toPrompt(word, meanings, distractors),
    });

    const parsed = parse(text, word);

    if (parsed) {
      return {
        sentence: parsed.sentence.replace(MARKER, blank),
        translation: parsed.translation,
      };
    }
  }

  return null;
}
