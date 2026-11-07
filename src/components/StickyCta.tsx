"use client";

import { useLayoutEffect, useRef } from "react";
import { Anchor } from "@/components/ui/Anchor";
import { ArrowUpRight } from "@/components/ui/icons";

export function StickyCta({ visible }: { visible: boolean }) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const link = linkRef.current;
    if (!link) return;
    if (visible) {
      link.removeAttribute("aria-hidden");
      return;
    }
    if (document.activeElement === link) link.blur();
    link.setAttribute("aria-hidden", "true");
  }, [visible]);

  return (
    <Anchor
      anchorRef={linkRef}
      href="#contact"
      className={visible ? "ds-sticky is-on" : "ds-sticky"}
      tabIndex={visible ? undefined : -1}
      onNavigate={() => {
        if (linkRef.current && document.activeElement === linkRef.current) linkRef.current.blur();
      }}
    >
      <span>Discuss Your Project</span>
      <ArrowUpRight size={18} />
    </Anchor>
  );
}
