import Image from "next/image";
import { SectionKicker } from "@/components/ui/SectionKicker";

export function ArchitecturalDetails() {
  return (
    <section id="details" className="ds-section-details">
      <div className="ds-gridlines" aria-hidden="true">
        <div className="ds-gridlines-inner">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="ds-wrap ds-details-content">
        <SectionKicker label="The details" index="04 / 07" tone="dark" />
        <h2 data-reveal="up" className="ds-h2-details">
          <span>Every Detail</span>
          <span className="ds-h2-details-sub">Matters.</span>
        </h2>
        <div className="ds-details-lede-wrap">
          <p data-reveal="up" data-delay="120" className="ds-details-lede">
            Thoughtful design, carefully chosen materials and the finishing touches that make a space feel special.
          </p>
        </div>
        <div className="ds-details-grid">
          <figure className="ds-fig-big">
            <div data-reveal="img" className="ds-frame ds-frame-3-2">
              <Image
                src="/images/architectural-finish.webp"
                alt="Gabled contemporary home with cedar cladding, schist pillars and full-height glazing"
                fill
                sizes="(max-width: 899px) calc(100vw - 40px), 58vw"
                quality={85}
                className="ds-cover"
              />
            </div>
            <figcaption className="ds-fig-cap">
              <span className="ds-fig-label">Fig. 01</span>
              <span>Roofline, cedar &amp; glazing</span>
            </figcaption>
          </figure>
          <figure data-reveal="up" data-delay="200" className="ds-fig-small">
            <div className="ds-frame ds-frame-4-5">
              <Image
                src="/images/interior-details.webp"
                alt="Floating oak staircase with black steel stringer and balustrade"
                fill
                sizes="(max-width: 899px) 72vw, 28vw"
                quality={85}
                className="ds-cover ds-pos-stair"
              />
            </div>
            <figcaption className="ds-fig-cap">
              <span className="ds-fig-label">Fig. 02</span>
              <span>Oak &amp; black steel</span>
            </figcaption>
          </figure>
        </div>
        <p className="ds-details-note">
          Illustrative imagery, shown for design inspiration only — not completed Diamond Standard Builders projects.
        </p>
      </div>
    </section>
  );
}
