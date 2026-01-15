import { useState, useEffect } from 'react';
import FloatingNav from '@/components/FloatingNav';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import CodingSkillsSection from '@/components/CodingSkillsSection';
import ProfessionalSkillsSection from '@/components/ProfessionalSkillsSection';
import GitHubCalendarSection from '@/components/GitHubCalendarSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'about', 'coding-skills', 'professional-skills', 'github', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <CodingSkillsSection />
      <ProfessionalSkillsSection />
      <GitHubCalendarSection username="emannnx" />
      <ContactSection />
      <FloatingNav activeSection={activeSection} onNavigate={handleNavigate} />
    </main>
  );
};

export default Index;
