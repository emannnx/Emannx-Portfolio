import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  color: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px' }}
      className="group"
    >
      <div className="relative bg-card rounded-2xl overflow-hidden card-shadow transition-all duration-500 hover:card-shadow-hover">
        {/* Image container */}
        <div className={`relative h-64 md:h-80 overflow-hidden ${project.color}`}>
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
          
          {/* Arrow icon */}
          <motion.div
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowUpRight className="w-5 h-5 text-foreground" />
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="heading-md mb-2 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="body-md mb-4 line-clamp-2">
            {project.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium text-muted-foreground bg-secondary rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
