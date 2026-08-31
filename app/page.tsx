export const dynamic = "force-dynamic";

import RandomWordContainer from "@/components/random-word-container";
import { RandomWordProvider } from "@/lib/jotai/random-word/provider";
import { getTagOptions } from "@/lib/neon/get-tag-options";

export default async function Page() {
  const tagOptions = await getTagOptions();

  return (
    <RandomWordProvider>
      <RandomWordContainer tagOptions={tagOptions} />
    </RandomWordProvider>
  );
}
