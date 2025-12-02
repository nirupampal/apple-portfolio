// app/page.tsx
import Header from '@/components/Header'; // Assuming Header.tsx is in components/Header.tsx
import Footer from '@/components/Footer'; // Assuming Footer.tsx is in components/Footer.tsx

// Import the new section components
import HeroSection from '@/components/sections/HeroSection';
import WorksSection from '@/components/sections/WorksSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      {/* The Header is fixed, so it remains outside the main content flow */}
      <Header /> 
      
      <main className="pt-12"> {/* Add padding top equal to the header height */}
        <HeroSection />
        <WorksSection />
        {/* You can insert a SkillsSection or Testimonial Section here */}
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}