"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RecallStatus } from "@/lib/types";

const RECALL_OPTIONS: { status: RecallStatus; label: string }[] = [
  { status: "know", label: "Know it" },
  { status: "seen", label: "Seen it" },
  { status: "new", label: "New to me" },
];

type Props = {
  className?: string;
  onSelect: (status: RecallStatus) => void;
  disabled?: boolean;
};

export default function RecallButtons({ className, onSelect, disabled }: Props) {
  return (
    <div className={className}>
      {RECALL_OPTIONS.map(({ status, label }) => (
        <Button
          key={status}
          variant="outline"
          className="flex-1 w-auto sm:w-36"
          disabled={disabled}
          onClick={() => onSelect(status)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
