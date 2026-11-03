export const dynamic = "force-dynamic";

import FlashContainer from "@/components/flash-container";
import { RandomWordProvider } from "@/lib/jotai/random-word/provider";
import { getTagOptions } from "@/lib/neon/get-tag-options";

export default async function Page() {
  const tagOptions = await getTagOptions();

  return (
    <RandomWordProvider>
      <FlashContainer tagOptions={tagOptions} />
    </RandomWordProvider>
  );
}
