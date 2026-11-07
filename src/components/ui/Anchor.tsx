"use client";

import type { MouseEvent, ReactNode, Ref } from "react";
import { scrollToId } from "@/lib/scroll";

type AnchorProps = {
  href: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  onNavigate?: () => void;
  tabIndex?: number;
  ariaHidden?: boolean | "true" | "false";
  anchorRef?: Ref<HTMLAnchorElement>;
};

export function Anchor({ href, className, children, ariaLabel, onNavigate, tabIndex, ariaHidden, anchorRef }: AnchorProps) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (!href.startsWith("#")) return;
    event.preventDefault();
    scrollToId(href.slice(1));
  };

  return (
    <a
      ref={anchorRef}
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
      tabIndex={tabIndex}
      aria-hidden={ariaHidden}
    >
      {children}
    </a>
  );
}
