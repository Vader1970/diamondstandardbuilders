"use client";

import type { MouseEvent, ReactNode } from "react";
import { SELECT_SERVICE_EVENT, type Service } from "@/lib/content";
import { scrollToId } from "@/lib/scroll";

type ServiceLinkProps = {
  service: Service;
  children: ReactNode;
};

export function ServiceLink({ service, children }: ServiceLinkProps) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: service.value }));
    scrollToId("contact");
  };

  return (
    <a
      href="#contact"
      className="ds-service"
      aria-label={`${service.title} — enquire about this service`}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
