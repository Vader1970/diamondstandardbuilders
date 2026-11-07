"use client";

import type { MouseEvent, ReactNode } from "react";
import { ArrowDown, ArrowUpRight } from "@/components/ui/icons";
import { scrollToId } from "@/lib/scroll";

type Variant = "hero" | "nav" | "footer" | "submit" | "scott" | "ghost" | "menu";

const classes: Record<Variant, string> = {
  hero: "ds-btn ds-btn-hero",
  nav: "ds-btn ds-btn-outline ds-btn-nav",
  footer: "ds-btn ds-btn-outline ds-btn-footer",
  submit: "ds-btn ds-btn-submit",
  scott: "ds-btn ds-btn-scott",
  ghost: "ds-btn ds-btn-ghost",
  menu: "ds-btn ds-btn-menu",
};

const iconSize: Record<Variant, number> = {
  hero: 18,
  nav: 16,
  footer: 16,
  submit: 18,
  scott: 18,
  ghost: 16,
  menu: 18,
};

type AnimatedButtonProps = {
  variant: Variant;
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  onNavigate?: () => void;
};

export function AnimatedButton({ variant, children, href, type = "button", className, onNavigate }: AnimatedButtonProps) {
  const classNames = className ? `${classes[variant]} ${className}` : classes[variant];
  const icon =
    variant === "ghost" ? <ArrowDown size={iconSize[variant]} /> : <ArrowUpRight size={iconSize[variant]} />;
  const inner = (
    <>
      {variant === "hero" || variant === "submit" ? <span className="ds-wipe" aria-hidden="true" /> : null}
      <span className="ds-btn-label">{children}</span>
      <span className="ds-btn-icon">{icon}</span>
    </>
  );

  if (href) {
    const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onNavigate?.();
      if (!href.startsWith("#")) return;
      event.preventDefault();
      scrollToId(href.slice(1));
    };
    return (
      <a href={href} className={classNames} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} className={classNames}>
      {inner}
    </button>
  );
}
