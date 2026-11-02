"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IconCards, IconMenu2, IconPencilQuestion, IconSnowflake } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Words", caption: "単語をめくる", Icon: IconCards },
  { href: "/quiz", label: "Quiz", caption: "4択で確かめる", Icon: IconPencilQuestion },
];

function Wordmark() {
  return (
    <div className="flex items-center gap-x-2.5">
      <IconSnowflake size={22} stroke={1.2} className="animate-crystal text-ice-200" />
      <div className="leading-tight">
        <div className="font-display text-base font-bold tracking-[0.28em] text-frost-100">AHTOHALLAN</div>
        <div className="text-[8px] tracking-[0.22em] text-ice-200/45 uppercase">Memory of every word</div>
      </div>
    </div>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-y-1.5">
      {NAV_ITEMS.map(({ href, label, caption, Icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-x-3 rounded-xl border px-3 py-2.5 transition-colors ${
              isActive
                ? "border-gold-400/50 bg-gold-500/12 text-gold-100"
                : "border-transparent text-frost-300 hover:border-ice-200/30 hover:bg-frost-100/5 hover:text-frost-100"
            }`}
          >
            <Icon size={18} stroke={1.6} />
            <span className="leading-tight">
              <span className="block font-display text-sm tracking-[0.18em]">{label}</span>
              <span className="block text-[10px] text-frost-400">{caption}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteNavSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col gap-y-8 border-r border-frost-200/12 bg-glacier-950/60 px-5 py-6 backdrop-blur-xl sm:flex">
      <Wordmark />
      <NavLinks />
    </aside>
  );
}

export function SiteNavTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger
        aria-label="Menu"
        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-frost-200/20 bg-frost-100/5 text-frost-200 backdrop-blur-sm transition-colors hover:border-ice-200/50 hover:text-ice-100 sm:hidden"
      >
        <IconMenu2 size={18} stroke={1.6} />
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-glacier-950/75 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col gap-y-8 border-r border-frost-200/15 bg-glacier-950/95 px-5 py-6 backdrop-blur-xl data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:animate-in data-[state=open]:slide-in-from-left">
          <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>
          <Wordmark />
          <NavLinks onNavigate={() => setIsOpen(false)} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
