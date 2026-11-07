import Image from "next/image";
import { ServiceLink } from "@/components/ServiceLink";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { ArrowUpRight } from "@/components/ui/icons";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="ds-section-services">
      <div className="ds-wrap">
        <SectionKicker label="What we do" index="02 / 07" />
        <div className="ds-intro">
          <h2 data-reveal="up" className="ds-h2 ds-h2-xl ds-h2-12">
            What Can We Help You Build?
          </h2>
          <p data-reveal="up" data-delay="120" className="ds-lede">
            From new homes and renovations to outdoor living spaces, explore the building services Diamond Standard
            Builders can offer for your next project.
          </p>
        </div>
        <div className="ds-services">
          {services.map((service) => (
            <ServiceLink key={service.value} service={service}>
              <div data-reveal="img" className="ds-service-media">
                <Image
                  src={service.img}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 819px) calc(100vw - 40px), (max-width: 1440px) 42vw, 620px"
                  quality={85}
                  className="ds-service-photo"
                />
              </div>
              <div className="ds-service-body">
                <span className="ds-service-num">{service.num}</span>
                <div className="ds-service-copy">
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </div>
                <span className="ds-service-arrow" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </ServiceLink>
          ))}
        </div>
      </div>
    </section>
  );
}
