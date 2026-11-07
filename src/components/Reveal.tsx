"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupReveals } from "@/lib/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function Reveal({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      try {
        return setupReveals(root);
      } catch {
        gsap.set("[data-reveal]", { clearProps: "all" });
        return undefined;
      }
    },
    { scope: rootRef },
  );

  return <div ref={rootRef}>{children}</div>;
}
