import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import projectResumeAI from "@/projectimages/resume.png";
import nexxproject from "@/projectimages/nexx.png";
import ramonikproject from "@/projectimages/ramoniktravel.png";
import healthCareSystem from "@/projectimages/Healthhub.png";
import sushiMan from "@/projectimages/sushiman.png";
import springImage from "@/projectimages/SpringBoot.jpg";
import fgClothing from "@/projectimages/fgclothings.png";
import xSpace from "@/projectimages/x-space.png";

const projects = [
  {
    id: 1,
    title: "ResumeAI",
    description:
      "A fully customizable online resume builder — design, edit, preview, and export clean professional resumes with modern UI and flexible layout control.",
    tags: ["React", "TypeScript", "CSS", "Firebase"],
    image: projectResumeAI,
    liveUrl: "https://emannx-resume-ai.vercel.app/",
  },
  {
    id: 2,
    title: "NEXX Global",
    description:
      "Forward-thinking digital solutions that help businesses and individuals grow, connect, and thrive in the digital landscape.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Firebase", "API"],
    image: nexxproject,
    liveUrl: "https://www.nexxglobal.net/",
  },
  {
    id: 3,
    title: "Ramonik Travels & Tours",
    description:
      "Seamless, personalized travel experiences that turn every journey into an unforgettable adventure.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    image: ramonikproject,
    liveUrl: "https://ramoniktravel.com/",
  },
  {
    id: 4,
    title: "Sushiman",
    description:
      "Fresh, handcrafted sushi and Japanese-inspired meals with a commitment to quality, flavor, and exceptional customer experience.",
    tags: ["JavaScript", "HTML", "CSS"],
    image: sushiMan,
    liveUrl: "https://sushiman-emannx.vercel.app/",
  },
  {
    id: 5,
    title: "HealthHub",
    description:
      "A modern interactive platform for managing healthcare services, appointments, and patient information.",
    tags: ["React", "TypeScript", "Tailwind CSS", "MongoDB", "Spring Boot"],
    image: healthCareSystem,
    liveUrl: "https://health-care-systems-nine.vercel.app/",
  },
  {
    id: 6,
    title: "FG Clothings",
    description:
      "A curated look book showcasing contemporary fashion collections with seasonal style inspiration.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    image: fgClothing,
    liveUrl: "https://fg-clothings.netlify.app/",
  },
  {
    id: 7,
    title: "X-Space",
    description:
      "Innovative digital solutions designed to help individuals and businesses connect, create, and thrive.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    image: xSpace,
    liveUrl: "https://x-space-emannx.vercel.app/",
  },
  {
    id: 8,
    title: "Nutrition Guide",
    description:
      "Personalized nutrition plans and dietary recommendations powered by a Spring Boot backend.",
    tags: ["Spring Boot", "MongoDB"],
    image: springImage,
    liveUrl: "https://nutritional-guide.onrender.com",
  },
  {
    id: 9,
    title: "Mood Tracker",
    description:
      "Track daily mood and emotional wellness with a clean, data-driven Spring Boot application.",
    tags: ["Spring Boot", "MongoDB"],
    image: springImage,
    liveUrl: "https://mood-tracker-1zvf.onrender.com",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative flex-shrink-0 w-[320px] md:w-[380px] bg-card rounded-3xl overflow-hidden card-shadow hover:card-shadow-hover transition-shadow duration-300 cursor-default"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Live link button — appears on hover */}
        <motion.a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          initial={false}
          className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-semibold rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          <ExternalLink size={14} />
          Live Site
        </motion.a>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Index number */}
        <span className="text-xs font-mono text-muted-foreground mb-2 block">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "right" ? 420 : -420,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
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
            A collection of projects that showcase my passion for creating
            intuitive, beautiful, and user-centered digital experiences.
          </p>
        </motion.div>

        {/* Scroll controls */}
        <motion.div
          className="flex justify-end gap-3 mb-6 pr-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-card card-shadow hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-foreground"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-card card-shadow hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-foreground"
            aria-label="Scroll right"
          >
            →
          </button>
        </motion.div>

        {/* Horizontal scroll track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Hide scrollbar for webkit */}
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>

          {projects.map((project, index) => (
            <div key={project.id} className="snap-start">
              <ProjectCard project={project} index={index} />
            </div>
          ))}

          {/* Right padding sentinel */}
          <div className="flex-shrink-0 w-6" />
        </div>

        {/* Scroll hint */}
        <motion.p
          className="text-center text-xs text-muted-foreground mt-4 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          Scroll or use arrows to explore all {projects.length} projects →
        </motion.p>
      </div>
    </section>
  );
};

export default ProjectsSection;