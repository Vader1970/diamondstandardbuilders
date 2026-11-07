import { About } from "@/components/About";
import { ArchitecturalDetails } from "@/components/ArchitecturalDetails";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { OurApproach } from "@/components/OurApproach";
import { Process } from "@/components/Process";
import { Reveal } from "@/components/Reveal";
import { Services } from "@/components/Services";

export default function HomePage() {
  return (
    <div className="ds-page">
      <Header />
      <Reveal>
        <main>
          <Hero />
          <Services />
          <OurApproach />
          <ArchitecturalDetails />
          <About />
          <Process />
          <Contact />
        </main>
        <Footer />
      </Reveal>
    </div>
  );
}
