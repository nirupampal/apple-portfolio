// app/page.tsx
import Header from '@/components/Header'; // Assuming Header.tsx is in components/Header.tsx
import Footer from '@/components/Footer'; // Assuming Footer.tsx is in components/Footer.tsx
import HeroSection from '@/components/sections/HeroSection';
import WorksSection from '@/components/sections/WorksSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import SkillsSection from '@/components/sections/SkillsSection';

export default function Home() {
  return (
    <>
      {/* The Header is fixed on the left, so it remains outside the main content flow */}
      <Header /> 
      
      <main className=""> {/* Sidebar is absolutely positioned, no margin needed */}
        <HeroSection />
        <WorksSection />
        <AboutSection />
        <SkillsSection/>
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}