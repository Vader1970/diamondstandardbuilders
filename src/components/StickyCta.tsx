"use client";

import { Anchor } from "@/components/ui/Anchor";
import { ArrowUpRight } from "@/components/ui/icons";

export function StickyCta({ visible }: { visible: boolean }) {
  return (
    <Anchor
      href="#contact"
      className={visible ? "ds-sticky is-on" : "ds-sticky"}
      ariaHidden={visible ? undefined : true}
      tabIndex={visible ? undefined : -1}
    >
      <span>Discuss Your Project</span>
      <ArrowUpRight size={18} />
    </Anchor>
  );
}
