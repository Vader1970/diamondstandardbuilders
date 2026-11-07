import Image from "next/image";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SectionKicker } from "@/components/ui/SectionKicker";

export function About() {
  return (
    <section id="about" className="ds-split ds-split-reverse ds-bg-off">
      <div className="ds-split-copy">
        <SectionKicker label="The person behind the work" index="05 / 07" />
        <h2 data-reveal="up" className="ds-h2 ds-h2-about">
          Local Builder. Personal Approach.
        </h2>
        <p data-reveal="up" data-delay="100" className="ds-about-lead">
          Meet Scott, the builder behind Diamond Standard Builders.
        </p>
        <p data-reveal="up" data-delay="180" className="ds-about-body">
          Based in Woodend, the business brings a personal approach to residential building, with a focus on
          understanding what matters to each homeowner.
        </p>
        <div data-reveal="up" data-delay="260" className="ds-scott-cta">
          <AnimatedButton href="#contact" variant="scott">
            Let&apos;s Talk About Your Project
          </AnimatedButton>
        </div>
      </div>
      <figure data-reveal="img" className="ds-split-media ds-split-scott">
        <Image
          src="/images/scott.webp"
          alt="Scott, builder at Diamond Standard Builders, smiling beside timber wall framing on site"
          fill
          sizes="(max-width: 980px) 100vw, 50vw"
          quality={85}
          className="ds-cover ds-pos-scott"
        />
        <figcaption className="ds-scott-cap">
          <span className="ds-scott-name">Scott</span>
          <span className="ds-scott-role">Diamond Standard Builders</span>
        </figcaption>
      </figure>
    </section>
  );
}
