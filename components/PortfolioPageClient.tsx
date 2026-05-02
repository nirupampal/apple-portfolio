"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSection from "@/components/sections/AboutSection";
import CertificatesParallax from "@/components/sections/CertificatesParallax";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import ParallaxSection from "@/components/sections/ParallaxSection";
import SkillsSection from "@/components/sections/SkillsSection";
import TerminalSection from "@/components/sections/TerminalSection";
import WorksSection from "@/components/sections/WorksSection";
import { usePortfolioContent } from "@/lib/use-portfolio-content";

export default function PortfolioPageClient() {
  const { content } = usePortfolioContent();

  return (
    <>
      <Header resumeUrl={content.about.resumeUrl} />

      <main>
        <HeroSection content={content.hero} />
        <TerminalSection content={content.terminal} />
        <WorksSection content={content.works} />
        <ParallaxSection
          heading="Building the Future"
          subheading="Philosophy"
          quote="Great software is not just about code - it's about solving real problems with elegant solutions."
        />
        <AboutSection content={content.about} />
        <SkillsSection content={content.skills} />
        <ParallaxSection
          heading="Crafting Digital Experiences"
          subheading="Vision"
          quote="Every line of code is an opportunity to create something that matters."
        />
        <CertificatesParallax />
        <ContactSection content={content.contact} />
      </main>

      <Footer />
    </>
  );
}
