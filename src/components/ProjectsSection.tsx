import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
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
    title: "HealthHub",
    subtitle: "Healthcare Management System",
    description:
      "A full-stack healthcare platform handling appointments, patient records, and service management — built across React, Spring Boot, MongoDB and SQL Server.",
    tags: ["React", "TypeScript", "Spring Boot", "MongoDB", "Tailwind CSS"],
    image: healthCareSystem,
    liveUrl: "https://health-care-systems-nine.vercel.app/",
    accent: "#3b82f6",
    size: "large",
  },
  {
    id: 2,
    title: "NEXX Global",
    subtitle: "Crypto Trading Platform",
    description:
      "A forward-thinking fintech product delivering smart crypto trading solutions for individuals and businesses — live in production with real users.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Firebase", "API"],
    image: nexxproject,
    liveUrl: "https://www.nexxglobal.net/",
    accent: "#10b981",
    size: "large",
  },
  {
    id: 3,
    title: "Ramonik Travels",
    subtitle: "Travel & Tourism Platform",
    description:
      "A production travel booking platform creating seamless, personalized journeys — deployed for a real business with active customers.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    image: ramonikproject,
    liveUrl: "https://ramoniktravel.com/",
    accent: "#052861",
    size: "medium",
  },
  {
    id: 4,
    title: "ResumeAI",
    subtitle: "AI Resume Builder",
    description:
      "A fully customizable resume builder with real-time preview, layout control, and export — clean professional output with modern UX.",
    tags: ["React", "TypeScript", "CSS", "Firebase"],
    image: projectResumeAI,
    liveUrl: "https://emannx-resume-ai.vercel.app/",
    accent: "#22A959",
    size: "medium",
  },
  {
    id: 5,
    title: "X-Space",
    subtitle: "Digital Agency Landing",
    description:
      "A polished digital agency site showcasing innovative solutions for businesses to connect, create, and grow.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
    image: xSpace,
    liveUrl: "https://x-space-emannx.vercel.app/",
    accent: "#ec4899",
    size: "medium",
  },
  {
    id: 6,
    title: "FG Clothings",
    subtitle: "Fashion Look Book",
    description:
      "A curated fashion look book with seasonal collections and contemporary style inspiration.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    image: fgClothing,
    liveUrl: "https://fg-clothings.netlify.app/",
    accent: "#f97316",
    size: "medium",
  },
  {
    id: 7,
    title: "Sushiman",
    subtitle: "Restaurant Experience",
    description:
      "A handcrafted Japanese restaurant site with immersive UI built in pure vanilla JS — no frameworks.",
    tags: ["JavaScript", "HTML", "CSS"],
    image: sushiMan,
    liveUrl: "https://sushiman-emannx.vercel.app/",
    accent: "#ef4444",
    size: "medium",
  },
  {
    id: 8,
    title: "Nutrition Guide",
    subtitle: "Spring Boot REST API",
    description:
      "Personalized nutrition plans and dietary recommendations via a structured Spring Boot + MongoDB backend.",
    tags: ["Spring Boot", "MongoDB"],
    image: springImage,
    liveUrl: "https://nutritional-guide.onrender.com",
    accent: "#010202",
    size: "small",
  },
  {
    id: 9,
    title: "Mood Tracker",
    subtitle: "Wellness API",
    description:
      "Daily emotional wellness tracking via a clean REST API — designed for integration into any frontend.",
    tags: ["Spring Boot", "MongoDB"],
    image: springImage,
    liveUrl: "https://mood-tracker-1zvf.onrender.com",
    accent: "#010202",
    size: "small",
  },
];

// ─── Hook: peek animation ─────────────────────────────────────────────────────
function usePeekAnimation(
  scrollRef: React.RefObject<HTMLDivElement>,
  hasScrolled: boolean
) {
  useEffect(() => {
    if (hasScrolled) return;
    const el = scrollRef.current;
    if (!el) return;

    const timer = setTimeout(() => {
      el.scrollTo({ left: 88, behavior: "smooth" });
      const snapBack = setTimeout(() => {
        el.scrollTo({ left: 0, behavior: "smooth" });
      }, 720);
      return () => clearTimeout(snapBack);
    }, 1100);

    return () => clearTimeout(timer);
  }, [hasScrolled]);
}

// ─── Scroll-invitation chevron ───────────────────────────────────────────────
const ScrollHint = ({ accent }: { accent: string }) => (
  <div
    className="absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10 flex items-center justify-end pr-3"
    style={{
      background: "linear-gradient(to right, transparent, var(--background) 80%)",
    }}
  >
    <motion.div
      animate={{ x: [0, 7, 0] }}
      transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M7 4l6 6-6 6"
          stroke={accent}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  </div>
);

// ─── Project Card ─────────────────────────────────────────────────────────────
const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const active = hovered || tapped;
  const cardClass = "w-[80vw] sm:w-[360px] md:w-[400px]";
  const imgHeight = "h-[44vw] sm:h-48 md:h-52";

  const handleTap = () => {
    setTapped((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "0px -40px" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onTap={handleTap}
      className={`group relative flex-shrink-0 ${cardClass} rounded-2xl md:rounded-[26px] overflow-hidden bg-card border border-border/40 cursor-pointer flex flex-col`}
      style={{
        boxShadow: active
          ? `0 20px 44px -8px ${project.accent}2e, 0 0 0 1px ${project.accent}20`
          : "0 2px 14px -2px rgba(0,0,0,0.10)",
        transition: "box-shadow 0.35s ease, transform 0.25s ease",
        transform: active ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
      }}
    >
      {/* Accent top border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-20 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          opacity: active ? 1 : 0,
        }}
      />

      {/* Image */}
      <div className={`relative ${imgHeight} overflow-hidden`}>
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: active ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Scrim */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.06) 55%, transparent 100%)",
            opacity: active ? 1 : 0.45,
          }}
        />

        {/* Accent wash */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${project.accent}1c, transparent)`,
            opacity: active ? 1 : 0,
          }}
        />

        {/* Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] px-2 py-0.5 rounded-full"
            style={{
              background: `${project.accent}22`,
              color: project.accent,
              border: `1px solid ${project.accent}44`,
              backdropFilter: "blur(8px)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Live button — partially visible on mobile, full on hover */}
        <motion.a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          animate={{ opacity: active ? 1 : 0.72, y: active ? 0 : 3 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold text-white"
          style={{
            background: project.accent,
            boxShadow: `0 3px 12px ${project.accent}55`,
          }}
        >
          <ExternalLink size={10} />
          View Live
        </motion.a>
      </div>

      {/* Content */}
      <div className="p-3.5 md:p-6 flex flex-col flex-1">
        <p
          className="text-[9px] md:text-[10px] font-bold tracking-[0.18em] uppercase mb-1"
          style={{ color: project.accent }}
        >
          {project.subtitle}
        </p>

        <h3 className="text-sm md:text-xl font-bold text-foreground mb-1.5 leading-tight">
          {project.title}
        </h3>

        <p className="text-[11px] md:text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Tags — truncated on small cards */}
        <div className="flex flex-wrap gap-1 mt-auto pt-2">
          {project.tags.slice(0, project.tags.length).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[9px] md:text-[11px] font-medium rounded-full border"
              style={{
                background: `${project.accent}0e`,
                borderColor: `${project.accent}2e`,
                color: project.accent,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────
const ProjectsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const left = el.scrollLeft;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(left > 10);
    setCanScrollRight(left < max - 10);
    setScrollProgress(left / max);
    if (left > 25 && !hasScrolled) {
      setHasScrolled(true);
      // small delay before hiding hint so fade-out is visible
      setTimeout(() => setShowHint(false), 200);
    }
  }, [hasScrolled]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  usePeekAnimation(scrollRef, hasScrolled);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "right" ? 360 : -360,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      {/* Ambient blobs */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, #3b82f6, #8b5cf6)" }}
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.05] pointer-events-none"
        style={{ background: "radial-gradient(circle, #10b981, #06b6d4)" }}
      />

      <div className="container mx-auto px-4 md:px-6">

        {/* ── Centered header ── */}
        <motion.div
          className="flex flex-col items-center text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-[11px] font-semibold tracking-widest uppercase rounded-full bg-accent text-accent-foreground border border-border/60"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-current"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            Selected Work
          </motion.span>

          <motion.h2
            className="heading-lg mb-3 leading-tight"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>

          <motion.p
            className="body-md text-muted-foreground max-w-[300px] sm:max-w-sm md:max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Real products shipped for real users — from fintech platforms to healthcare systems.
          </motion.p>

          {/* Divider */}
          <motion.div
            className="mt-7 flex items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.32 }}
            viewport={{ once: true }}
          >
            <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent to-border" />
            <span className="text-xs text-muted-foreground tabular-nums font-medium">
              {projects.length} projects
            </span>
            <div className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent to-border" />
          </motion.div>
        </motion.div>

        {/* ── Desktop arrow controls ── */}
        <motion.div
          className="hidden md:flex items-center justify-end gap-3 mb-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 text-foreground"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 text-foreground"
            aria-label="Scroll right"
          >
            →
          </button>
        </motion.div>

        {/* ── Scroll track ── */}
        <div className="relative">
          {/* Scroll hint — fades away once user starts scrolling */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                key="scroll-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute inset-y-0 right-0 z-10"
              >
                <ScrollHint accent={projects[1].accent} />
              </motion.div>
            )}
          </AnimatePresence>

          <div
            ref={scrollRef}
            className="flex gap-3.5 md:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((project, index) => (
              <div key={project.id} className="snap-start">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
            <div className="flex-shrink-0 w-4 md:w-8" />
          </div>
        </div>

        {/* ── Progress bar ── */}
        <motion.div
          className="mt-5 mx-auto max-w-[140px] md:max-w-xs h-[3px] rounded-full bg-border overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="h-full rounded-full bg-primary"
            style={{ width: `${Math.max(scrollProgress * 100, 8)}%` }}
            transition={{ duration: 0.12 }}
          />
        </motion.div>

        <motion.p
          className="text-center text-[11px] text-muted-foreground mt-2.5 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="md:hidden">Swipe to explore · </span>
          <span className="hidden md:inline">Drag or use arrows · </span>
          {projects.length} projects total
        </motion.p>
      </div>
    </section>
  );
};

export default ProjectsSection;