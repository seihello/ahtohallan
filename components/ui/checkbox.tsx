"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-6 shrink-0 rounded-md border border-frost-200/25 bg-frost-100/5 shadow-[inset_0_1px_0_rgba(236,242,249,0.15)] transition-colors outline-none",
        "data-[state=checked]:border-gold-400 data-[state=checked]:bg-gradient-to-b data-[state=checked]:from-gold-300 data-[state=checked]:to-gold-500 data-[state=checked]:text-timber-950 data-[state=checked]:shadow-[0_0_18px_-4px_rgba(247,194,44,0.9)]",
        "focus-visible:border-ice-200 focus-visible:ring-ring focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
