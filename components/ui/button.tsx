import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "w-full sm:w-auto inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium tracking-wide transition-all duration-200 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring focus-visible:ring-[3px] aria-invalid:border-destructive backdrop-blur-sm active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "border border-gold-400/70 bg-gradient-to-b from-gold-300 to-gold-500 text-timber-950 shadow-[0_8px_24px_-10px_rgba(238,165,1,0.9)] hover:from-gold-200 hover:to-gold-400 hover:shadow-[0_10px_30px_-8px_rgba(247,194,44,0.85)]",
        destructive: "border border-destructive/60 bg-destructive/20 text-red-200 hover:bg-destructive/30",
        outline:
          "border border-frost-200/20 bg-frost-100/5 text-frost-100 shadow-[inset_0_1px_0_rgba(236,242,249,0.18)] hover:border-ice-200/45 hover:bg-frost-100/12 hover:text-ice-100",
        secondary:
          "border border-glacier-300/35 bg-glacier-600/35 text-glacier-100 hover:bg-glacier-600/50 hover:border-glacier-300/55",
        ghost: "text-frost-300 hover:bg-frost-100/10 hover:text-frost-100",
        link: "text-gold-400 underline-offset-4 hover:underline hover:text-gold-300",
        glacier:
          "border border-glacier-300/55 bg-glacier-600/55 text-glacier-50 hover:bg-glacier-500/70 hover:border-glacier-200/70 hover:shadow-[0_8px_24px_-12px_rgba(163,193,166,0.9)]",
        hearth:
          "border border-gold-400/55 bg-gold-500/25 text-gold-100 hover:bg-gold-500/40 hover:border-gold-300/75 hover:shadow-[0_8px_24px_-12px_rgba(247,194,44,0.9)]",
        ice: "border border-ice-300/50 bg-ice-500/28 text-ice-50 hover:bg-ice-500/45 hover:border-ice-200/75 hover:shadow-[0_8px_24px_-12px_rgba(123,217,241,0.9)]",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-11 rounded-xl px-6 has-[>svg]:px-4",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
