import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Anchor } from "@/components/ui/Anchor";
import { DiamondMark } from "@/components/ui/icons";
import { HeroMedia } from "@/components/HeroMedia";

export function Hero() {
  return (
    <section id="home" className="ds-hero">
      <span id="top" className="ds-home-alias" />
      <HeroMedia />
      <div className="ds-hero-content">
        <div className="ds-eyebrow">
          <DiamondMark />
          <span>Woodend / North Canterbury</span>
        </div>
        <h1>Built to a Higher Standard.</h1>
        <p className="ds-hero-copy">Quality building, renovations and outdoor projects across North Canterbury.</p>
        <div className="ds-hero-actions">
          <AnimatedButton href="#contact" variant="hero">
            Discuss Your Project
          </AnimatedButton>
          <AnimatedButton href="#services" variant="ghost">
            Explore Our Services
          </AnimatedButton>
        </div>
      </div>
      <div className="ds-hero-bar">
        <div className="ds-hero-bar-inner">
          <Anchor href="#services" className="ds-scroll" ariaLabel="Scroll to services">
            <span className="ds-scroll-track" aria-hidden="true">
              <span className="ds-scroll-bar" />
            </span>
            <span className="ds-scroll-label">Scroll</span>
          </Anchor>
          <span className="ds-hero-index">01 / 07</span>
        </div>
      </div>
    </section>
  );
}
