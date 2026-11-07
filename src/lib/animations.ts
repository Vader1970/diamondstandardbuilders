import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** cubic-bezier(.2, .7, .2, 1) from the Claude export. */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const sampleDX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  return (progress: number) => {
    if (progress <= 0) return 0;
    if (progress >= 1) return 1;
    let t = progress;
    for (let i = 0; i < 8; i += 1) {
      const delta = sampleX(t) - progress;
      const slope = sampleDX(t);
      if (Math.abs(delta) < 1e-6 || Math.abs(slope) < 1e-6) break;
      t -= delta / slope;
    }
    return sampleY(Math.min(1, Math.max(0, t)));
  };
}

export const dsEase = cubicBezier(0.2, 0.7, 0.2, 1);

/**
 * Reproduces the export's IntersectionObserver reveals:
 * images wipe open with clip-path, rules draw with scaleX, copy rises 28px.
 * Elements already in view stay visible, with no entrance animation.
 * If this setup throws, inline styles are cleared so content remains usable.
 */
export function setupReveals(root: Element) {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const viewport = window.innerHeight;
    const nodes = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);

    nodes.forEach((el) => {
      if (el.getBoundingClientRect().top < viewport * 0.92) return;

      const delay = Number(el.dataset.delay || 0) / 1000;
      const kind = el.dataset.reveal;
      const trigger = {
        trigger: el,
        start: "top 92%",
        toggleActions: "play none none none",
      };

      if (kind === "img") {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.25,
            delay,
            ease: dsEase,
            immediateRender: true,
            scrollTrigger: trigger,
          },
        );
        return;
      }

      if (kind === "line") {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 1.1,
            delay,
            ease: dsEase,
            immediateRender: true,
            scrollTrigger: trigger,
          },
        );
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: dsEase,
          immediateRender: true,
          scrollTrigger: trigger,
        },
      );
    });

    let active = true;
    const refresh = () => {
      if (active) ScrollTrigger.refresh();
    };
    document.fonts?.ready.then(refresh).catch(() => undefined);
    window.addEventListener("load", refresh);

    return () => {
      active = false;
      window.removeEventListener("load", refresh);
    };
  });

  return () => mm.revert();
}
