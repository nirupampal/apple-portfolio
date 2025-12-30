// app/page.tsx
import Header from '@/components/Header'; // Assuming Header.tsx is in components/Header.tsx
import Footer from '@/components/Footer'; // Assuming Footer.tsx is in components/Footer.tsx
import HeroSection from '@/components/sections/HeroSection';
import WorksSection from '@/components/sections/WorksSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ParallaxSection from '@/components/sections/ParallaxSection';

export default function Home() {
  return (
    <>
      {/* The Header is fixed on the left, so it remains outside the main content flow */}
      <Header /> 
      
      <main className=""> {/* Sidebar is absolutely positioned, no margin needed */}
        <HeroSection />
        <WorksSection />
        
        {/* Parallax Break - Innovation */}
        <ParallaxSection
          title="Building the Future"
          subtitle="Philosophy"
          quote="Great software is not just about code—it's about solving real problems with elegant solutions."
        />
        
        <AboutSection />
        <SkillsSection/>
        
        {/* Parallax Break - Vision */}
        <ParallaxSection
          title="Crafting Digital Experiences"
          subtitle="Vision"
          quote="Every line of code is an opportunity to create something that matters."
        />
        
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}