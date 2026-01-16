import { motion } from 'framer-motion';
import { useState } from 'react';
import ProjectCard from './ProjectCard';
import projectFintech from '@/assets/project-fintech.jpg';
import projectEcommerce from '@/assets/project-ecommerce.jpg';
import projectWellness from '@/assets/project-wellness.jpg';
import projectTravel from '@/assets/project-travel.jpg';
import projectResumeAI from '@/projectimages/resume.png';
import nexxproject from '@/projectimages/nexx.png';
import ramonikproject from '@/projectimages/ramoniktravel.png'
import healthCareSystem from '@/projectimages/Healthhub.png'
import sushiMan from '@/projectimages/sushiman.png'
import springImage from '@/projectimages/SpringBoot.jpg'
import fgClothing from '@/projectimages/fgclothings.png'
import xSpace from '@/projectimages/x-space.png'



const projects = [
  {
    id: 1,
    title: 'ResumeAI',
    description:
      'ResumeAI is a fully customizable online resume builder that lets users design, edit, preview, and export clean professional resumes with modern UI and flexible layout control.',
    tags: ["React", "TypeScript", "CSS", "Firebase"],
    image: projectResumeAI,
    color: 'bg-accent',
    liveUrl: 'https://emannx-resume-ai.vercel.app/',
    repoUrl: 'https://github.com/emannnx/emannx-ResumeAI',
  },
  {
    id: 2,
    title: 'NEXX Global',
    description:
      'NEXX Global delivers forward-thinking digital solutions that help businesses and individuals grow, connect, and thrive.',
    tags: ["React", "TypeScript", "Tailwind CSS", "Firebase", "Api"],
    image: nexxproject,
    color: 'bg-secondary',
    liveUrl: 'https://www.nexxglobal.net/',
    repoUrl: 'https://github.com/emannnx/N.EXX---Smart-Crypto-Trading-for-All',
  },
  {
    id: 3,
    title: 'Ramonik Travels & Tours',
    description:
      'Ramonik Travel creates seamless, personalized travel experiences that turn every journey into an unforgettable adventure.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    image: ramonikproject,
    color: 'bg-muted',
    liveUrl: 'https://ramoniktravel.com/',
    repoUrl: 'https://github.com/emannnx/Ramonik-World-Connect.git',
  },
  {
    id: 4,
    title: 'Sushiman',
    description:
      'Sushiman delivers fresh, handcrafted sushi and Japanese-inspired meals with a commitment to quality, flavor, and exceptional customer experience.',
    tags: ['JavaScript', 'Html', 'CSS'],
    image: sushiMan,
    color: 'bg-accent',
    liveUrl: 'https://sushiman-emannx.vercel.app/',
    repoUrl: 'https://github.com/emannnx/Sushiman-emannx',
  },
  {
    id: 5,
    title: 'HealthHub – Healthcare System',
    description:
      'A modern and interactive platform for managing healthcare services, appointments, and patient information.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Spring Boot', 'SSMS'],
    image: healthCareSystem,
    color: 'bg-accent',
    liveUrl: 'https://health-care-systems-nine.vercel.app/',
    repoUrl: 'https://github.com/emannnx/HealthCareSystems',
  },
  {
    id: 6,
    title: 'FG Clothings',
    description:
      'A curated look book site showcasing contemporary fashion collections with seasonal style inspiration.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    image: fgClothing,
    color: 'bg-accent',
    liveUrl: 'https://fg-clothings.netlify.app/',
    repoUrl: 'https://github.com/emannnx/FGClothing',
  },
  {
    id: 7,
    title: 'X-Space',
    description:
      'X-Space delivers innovative digital solutions designed to help individuals and businesses connect, create, and thrive in a fast-evolving tech landscape.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'CSS'],
    image: xSpace,
    color: 'bg-accent',
    liveUrl: 'https://x-space-emannx.vercel.app/',
    repoUrl: 'https://github.com/emannnx/x-space-emannx',
  },
  {
    id: 8,
    title: 'Nutrition Guide',
    description:
      'A Spring Boot application that provides personalized nutrition plans and dietary recommendations.',
    tags: ["Spring Boot", "MongoDB"],
    image: springImage,
    color: 'bg-accent',
    liveUrl: 'https://nutritional-guide.onrender.com',
    repoUrl: 'https://github.com/emannnx/NutritionGuide',
  },
  {
    id: 9,
    title: 'Mood Tracker',
    description:
      'A Spring Boot application for tracking daily mood and overall emotional wellness',
    tags: ["Spring Boot", "MongoDB"],
    image: springImage,
    color: 'bg-accent',
    liveUrl: 'https://mood-tracker-1zvf.onrender.com',
    repoUrl: 'https://github.com/emannnx/NutritionGuide',
  },
];

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_PROJECTS = 4;
  const displayedProjects = showAll ? projects : projects.slice(0, INITIAL_PROJECTS);

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent-foreground bg-accent rounded-full">
            Selected Work
          </span>
          <h2 className="heading-lg mb-4">Featured Projects</h2>
          <p className="body-lg max-w-2xl mx-auto">
            A collection of projects that showcase my passion for creating intuitive,
            beautiful, and user-centered digital experiences.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Load More Button */}
        {!showAll && projects.length > INITIAL_PROJECTS && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Load More Projects ({projects.length - INITIAL_PROJECTS})
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;