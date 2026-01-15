import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import projectFintech from '@/assets/project-fintech.jpg';
import projectEcommerce from '@/assets/project-ecommerce.jpg';
import projectWellness from '@/assets/project-wellness.jpg';
import projectTravel from '@/assets/project-travel.jpg';

const projects = [
  {
    id: 1,
    title: 'FinTrack Dashboard',
    description:
      'A modern fintech dashboard redesign focused on simplifying complex financial data into digestible insights.',
    tags: ['UX Design', 'Mobile App', 'Fintech'],
    image: projectFintech,
    color: 'bg-accent',
    liveUrl: 'https://fintrack-dashboard.vercel.app',
    repoUrl: 'https://github.com/username/fintrack-dashboard',
  },
  {
    id: 2,
    title: 'Paralese Fashion',
    description:
      'E-commerce platform redesign for a contemporary fashion brand, emphasizing minimalist aesthetics and seamless checkout.',
    tags: ['Web Design', 'E-commerce', 'Branding'],
    image: projectEcommerce,
    color: 'bg-secondary',
    liveUrl: 'https://paralese-fashion.vercel.app',
    repoUrl: 'https://github.com/username/paralese-fashion',
  },
  {
    id: 3,
    title: 'Mindful Wellness',
    description:
      'Meditation and wellness app designed to promote mental health through calming interfaces and guided experiences.',
    tags: ['Mobile App', 'Health Tech', 'UX Research'],
    image: projectWellness,
    color: 'bg-muted',
    liveUrl: 'https://mindful-wellness.vercel.app',
    repoUrl: 'https://github.com/username/mindful-wellness',
  },
  {
    id: 4,
    title: 'Wanderlust Travel',
    description:
      'Travel booking platform that combines beautiful destination imagery with intuitive search and booking flows.',
    tags: ['Web Design', 'Travel', 'UX Design'],
    image: projectTravel,
    color: 'bg-accent',
    liveUrl: 'https://wanderlust-travel.vercel.app',
    repoUrl: 'https://github.com/username/wanderlust-travel',
  },
];

const ProjectsSection = () => {
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
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
