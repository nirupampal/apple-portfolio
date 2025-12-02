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
      {/* The Header is fixed, so it remains outside the main content flow */}
      <Header /> 
      
      <main className="pt-16"> {/* Add padding top equal to the header height */}
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