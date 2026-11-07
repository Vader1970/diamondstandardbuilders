"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MobileMenu } from "@/components/MobileMenu";
import { StickyCta } from "@/components/StickyCta";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Anchor } from "@/components/ui/Anchor";
import { Logo } from "@/components/ui/Logo";
import { navItems } from "@/lib/content";
import { scrollToId } from "@/lib/scroll";

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuIn, setMenuIn] = useState(false);
  const [locked, setLocked] = useState(false);
  const [sticky, setSticky] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastY = useRef(0);
  const hiddenRef = useRef(false);
  const scrolledRef = useRef(false);
  const stickyRef = useRef(false);
  const menuOpenRef = useRef(false);
  const menuInRef = useRef(false);
  const timer = useRef<number | null>(null);
  const tick = useRef(0);

  const closeMenu = useCallback(() => {
    if (!menuOpenRef.current) return;
    tick.current += 1;
    menuInRef.current = false;
    setMenuIn(false);
    setLocked(false);
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    if (timer.current) window.clearTimeout(timer.current);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = window.setTimeout(() => {
      menuOpenRef.current = false;
      setMenuOpen(false);
      menuBtnRef.current?.focus({ preventScroll: true });
    }, reduce ? 0 : 460);
  }, []);

  const openMenu = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    tick.current += 1;
    const current = tick.current;
    hiddenRef.current = false;
    setHidden(false);
    menuOpenRef.current = true;
    menuInRef.current = false;
    setMenuOpen(true);
    setMenuIn(false);
    setLocked(true);
    timer.current = window.setTimeout(() => {
      if (tick.current !== current) return;
      menuInRef.current = true;
      setMenuIn(true);
      closeBtnRef.current?.focus({ preventScroll: true });
    }, 30);
  }, []);

  const goHome = useCallback(() => {
    if (menuOpenRef.current) closeMenu();
    scrollToId("home");
  }, [closeMenu]);

  const toggleMenu = () => {
    if (menuOpenRef.current && menuInRef.current) closeMenu();
    else openMenu();
  };

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    root.style.overflow = locked ? "hidden" : "";
    body.style.overflow = locked ? "hidden" : "";
    return () => {
      root.style.overflow = "";
      body.style.overflow = "";
    };
  }, [locked]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      let nextHidden = hiddenRef.current;
      if (y < 96) nextHidden = false;
      else if (dy > 4) nextHidden = true;
      else if (dy < -4) nextHidden = false;
      if (menuOpenRef.current) nextHidden = false;
      lastY.current = y;

      const nextScrolled = y > 24;
      const viewport = window.innerHeight;
      const contact = document.getElementById("contact");
      const contactTop = contact ? contact.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
      const nextSticky = y > viewport * 0.7 && contactTop > viewport * 0.55;

      if (nextHidden !== hiddenRef.current) {
        hiddenRef.current = nextHidden;
        setHidden(nextHidden);
      }
      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }
      if (nextSticky !== stickyRef.current) {
        stickyRef.current = nextSticky;
        setSticky(nextSticky);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (desktop.matches) closeMenu();
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, [closeMenu]);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const headerClass = ["ds-header", scrolled ? "is-scrolled" : "", hidden && !menuOpen ? "is-hidden" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={headerClass}>
        <div className="ds-header-inner">
          <Anchor
            href="#home"
            className="ds-logo-link"
            ariaLabel="Diamond Standard Builders — home"
            onNavigate={() => {
              if (menuOpenRef.current) closeMenu();
            }}
          >
            <Logo tone="light" height="var(--ds-logo-header)" priority />
          </Anchor>
          <nav className="ds-nav" aria-label="Primary">
            <ul className="ds-nav-list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Anchor href={`#${item.id}`}>{item.label}</Anchor>
                </li>
              ))}
            </ul>
            <AnimatedButton href="#contact" variant="nav">
              Discuss Your Project
            </AnimatedButton>
          </nav>
          <button
            ref={menuBtnRef}
            type="button"
            className="ds-burger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} entered={menuIn} closeRef={closeBtnRef} onClose={closeMenu} onHome={goHome} />
      <StickyCta visible={sticky && !menuOpen} />
    </>
  );
}
