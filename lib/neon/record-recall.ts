"use server";

import { sql } from "@/lib/neon/db";
import { RecallStatus } from "@/lib/types";

const RECALL_STATUSES: RecallStatus[] = ["know", "seen", "new"];

export async function recordRecall(wordId: string, status: RecallStatus): Promise<void> {
  if (!RECALL_STATUSES.includes(status)) {
    throw new Error(`不正な recall status: ${status}`);
  }

  await sql`
    UPDATE words
    SET know_count = know_count + CASE WHEN ${status} = 'know' THEN 1 ELSE 0 END,
        seen_count = seen_count + CASE WHEN ${status} = 'seen' THEN 1 ELSE 0 END,
        new_count  = new_count  + CASE WHEN ${status} = 'new'  THEN 1 ELSE 0 END,
        recall_status = ${status}
    WHERE id = ${wordId}
  `;
}
