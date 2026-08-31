export const dynamic = "force-dynamic";

import RandomWordContainer from "@/components/random-word-container";
import { RandomWordProvider } from "@/lib/jotai/random-word/provider";
import { now } from "@/lib/neon/now";
import { use } from "react";
export default function Page() {
  use(now());

  return (
    <RandomWordProvider>
      <RandomWordContainer wordSummaries={[]} />
    </RandomWordProvider>
  );
}
