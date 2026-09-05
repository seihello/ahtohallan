"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RecallStatus } from "@/lib/types";

type Variant = React.ComponentProps<typeof Button>["variant"];

const RECALL_OPTIONS: { status: RecallStatus; label: string; variant: Variant }[] = [
  { status: "know", label: "Know it", variant: "glacier" },
  { status: "seen", label: "Seen it", variant: "hearth" },
  { status: "new", label: "New to me", variant: "ice" },
];

type Props = {
  className?: string;
  onSelect: (status: RecallStatus) => void;
  disabled?: boolean;
};

export default function RecallButtons({ className, onSelect, disabled }: Props) {
  return (
    <div className={className}>
      {RECALL_OPTIONS.map(({ status, label, variant }) => (
        <Button
          key={status}
          variant={variant}
          className="w-auto flex-1 sm:w-36 select-none"
          disabled={disabled}
          onClick={() => onSelect(status)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
