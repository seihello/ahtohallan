import { anthropic } from "@ai-sdk/anthropic";
import { LanguageModelV1Middleware, wrapLanguageModel } from "ai";

const MODEL_ID = "claude-haiku-5-5";

const withoutSamplingParams: LanguageModelV1Middleware = {
  transformParams: async ({ params }) => ({
    ...params,
    temperature: undefined,
    topP: undefined,
    topK: undefined,
  }),
};

export const claude = wrapLanguageModel({
  model: anthropic(MODEL_ID),
  middleware: withoutSamplingParams,
});
