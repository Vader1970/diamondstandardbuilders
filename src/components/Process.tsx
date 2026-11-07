import { SectionKicker } from "@/components/ui/SectionKicker";
import { steps } from "@/lib/content";

export function Process() {
  return (
    <section id="process" className="ds-section-process">
      <div className="ds-wrap">
        <SectionKicker label="How it works" index="06 / 07" tone="dark" />
        <div className="ds-intro ds-intro-tight">
          <h2 data-reveal="up" className="ds-h2 ds-h2-xl ds-h2-11">
            Building Made Straightforward.
          </h2>
          <p data-reveal="up" data-delay="120" className="ds-lede ds-lede-42 ds-lede-muted">
            Every project begins with a conversation. Here&apos;s a simple outline of what the first steps could look
            like.
          </p>
        </div>
        <ol className="ds-steps">
          {steps.map((step) => (
            <li key={step.num} className="ds-step">
              <div className="ds-step-track">
                <div data-reveal="line" data-delay={step.delay} className="ds-step-line" />
                <span className="ds-step-dot" />
              </div>
              <span data-reveal="up" data-delay={step.delay} className="ds-step-num">
                {step.num}
              </span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
