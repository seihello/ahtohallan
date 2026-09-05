"use client";

import { useAiExplanation } from "@/hooks/use-ai-explanation";

type AiMessage = ReturnType<typeof useAiExplanation>["messages"][number];

type Props = {
  messages: AiMessage[];
  className?: string;
};

export default function AiMessagePanel({ messages, className }: Props) {
  const assistantMessages = messages.filter((message) => message.role === "assistant");

  if (assistantMessages.length === 0) return null;

  return (
    <div className={`glass rounded-2xl p-3 text-sm sm:p-4 sm:text-base ${className ?? ""}`}>
      {assistantMessages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.parts
            ?.filter((part) => part.type === "text")
            .map((part, index) => (
              <span
                key={index}
                dangerouslySetInnerHTML={{
                  __html: part.text.replaceAll("\n", "<br />").replaceAll("**", ""),
                }}
              />
            ))}
        </div>
      ))}
    </div>
  );
}
