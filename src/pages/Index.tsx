import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
// HeroSection is above the fold — keep it eager
import HeroSection from '@/components/HeroSection';

// Below-fold sections are code-split so the initial bundle is smaller
const FloatingNav = lazy(() => import('@/components/FloatingNav'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ProfessionalSkillsSection = lazy(() => import('@/components/ProfessionalSkillsSection'));
const GitHubCalendarSection = lazy(() => import('@/components/GitHubCalendarSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'about', 'professional-skills', 'github', 'contact'];
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.main
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
    >
      <HeroSection />
      <Suspense fallback={null}>
        <ProjectsSection />
        <AboutSection />
        <ProfessionalSkillsSection />
        <GitHubCalendarSection username="emannnx" />
        <ContactSection />
        <FloatingNav activeSection={activeSection} onNavigate={handleNavigate} />
      </Suspense>
    </motion.main>
  );
};

export default Index;
