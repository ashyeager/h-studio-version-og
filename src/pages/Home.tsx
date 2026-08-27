import LandingPages from "../components/LandingPages";
import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyHarikos from "../components/WhyHarikos";
import Process from "../components/Process";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import DnaSection from "../components/DnaSection";
import Vision from "../components/Vision";
import Contact from "../components/Contact";

export default function Home() {
  const handleBookCall = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleServiceSelect = (serviceName: string) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="flex-grow">
      {/* Hero Segment */}
      <Hero onBookCallClick={handleBookCall} />
      
      {/* Services Portfolio */}
      <Services onServiceClick={handleServiceSelect} />
      
      {/* Premium Landing Pages Showcase */}
      <LandingPages />
      
      {/* Differentiators (Why HARIKOS) */}
      <WhyHarikos />
      
      {/* Process Timeline */}
      <Process />
      
      {/* Engineering Properties / Features */}
      <Features />
      
      {/* Partner Testimonials */}
      <Testimonials />

      {/* 3D DNA Section */}
      <DnaSection />
      
      {/* Manifesto & Future Vision */}
      <Vision />
      
      {/* Interactive Request Form & Social Channels */}
      <Contact />
    </main>
  );
}
