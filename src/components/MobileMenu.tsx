"use client";

import type { RefObject } from "react";
import { useEffect } from "react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { CloseIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import { navItems } from "@/lib/content";
import { scrollToId } from "@/lib/scroll";

type MobileMenuProps = {
  open: boolean;
  entered: boolean;
  closeRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onHome: () => void;
};

export function MobileMenu({ open, entered, closeRef, onClose, onHome }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const root = document.getElementById("mobile-menu");
      if (!root) return;
      const focusable = Array.from(root.querySelectorAll<HTMLElement>("a[href], button"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (!root.contains(active)) {
        event.preventDefault();
        first.focus();
        return;
      }
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const go = (id: string) => {
    onClose();
    scrollToId(id);
  };

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className={entered ? "ds-menu is-in" : "ds-menu"}
    >
      <div className="ds-menu-bar">
        <a
          href="#home"
          className="ds-logo-link"
          aria-label="Diamond Standard Builders — home"
          onClick={(event) => {
            event.preventDefault();
            onHome();
          }}
        >
          <Logo tone="light" height={34} />
        </a>
        <button ref={closeRef} type="button" className="ds-menu-close" aria-label="Close menu" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <nav className="ds-menu-nav" aria-label="Mobile">
        <ul className="ds-menu-list">
          {navItems.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  go(item.id);
                }}
              >
                <span className="ds-menu-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="ds-menu-label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="ds-menu-foot">
        <AnimatedButton href="#contact" variant="menu" onNavigate={onClose}>
          Discuss Your Project
        </AnimatedButton>
        <span className="ds-menu-loc">Woodend / North Canterbury</span>
      </div>
    </div>
  );
}
