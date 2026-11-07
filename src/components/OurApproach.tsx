import Image from "next/image";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { approachPoints } from "@/lib/content";

export function OurApproach() {
  return (
    <section id="approach" className="ds-split ds-bg-white">
      <div data-reveal="img" className="ds-split-media">
        <Image
          src="/images/woodworking.webp"
          alt="A builder's hands marking a length of timber with a pencil and steel square"
          fill
          sizes="(max-width: 980px) 100vw, 50vw"
          quality={85}
          className="ds-cover ds-pos-wood"
        />
      </div>
      <div className="ds-split-copy">
        <SectionKicker label="Our approach" index="03 / 07" />
        <h2 data-reveal="up" className="ds-h2 ds-h2-approach">
          Good Building Starts with Good People.
        </h2>
        <p data-reveal="up" data-delay="100" className="ds-lede ds-lede-46">
          A successful building project is about more than the finished result. It&apos;s about clear communication,
          care in the details and a straightforward experience from the first conversation.
        </p>
        <ol className="ds-points">
          {approachPoints.map((point, index) => (
            <li key={point} data-reveal="up" data-delay={index * 120}>
              <span className="ds-points-num">{String(index + 1).padStart(2, "0")}</span>
              <span className="ds-points-label">{point}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
