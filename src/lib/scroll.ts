export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToId(id: string) {
  const behavior = prefersReducedMotion() ? "auto" : "smooth";
  const key = !id || id === "top" ? "home" : id;
  const target = document.getElementById(key) ?? (key === "home" ? document.getElementById("top") : null);
  if (!target) {
    if (key === "home") window.scrollTo({ top: 0, behavior });
    return;
  }
  const top = target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: Math.max(0, top), behavior });
}
