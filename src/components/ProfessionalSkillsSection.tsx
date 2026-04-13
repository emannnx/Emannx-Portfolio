import { motion } from "framer-motion";
import {
  Palette,
  Monitor,
  Smartphone,
  Code2,
  Server,
  Database,
  Key,
  Rocket,
  Zap,
  Layout,
  Globe,
  Layers,
  Link,
} from "lucide-react";

const professionalSkills = [
  { name: "Web Design", icon: Globe, category: "Design" },
  { name: "UI/UX Design", icon: Palette, category: "Design" },
  { name: "Web Development", icon: Monitor, category: "Development" },
  { name: "Mobile App Development", icon: Smartphone, category: "Development" },
  { name: "Frontend Engineering", icon: Code2, category: "Development" },
  { name: "Backend Integration", icon: Server, category: "Backend" },
  { name: "MongoDB", icon: Database, category: "Backend" },
  { name: "SQL", icon: Database, category: "Backend" },
  { name: "Spring Boot", icon: Layers, category: "Backend" },
  { name: "API Integration", icon: Link, category: "Backend" },
  { name: "Authentication & Authorization", icon: Key, category: "Security" },
  { name: "Deployment (Vercel, GitHub Pages)", icon: Rocket, category: "DevOps" },
  { name: "Performance Optimization", icon: Zap, category: "Optimization" },
  { name: "Responsive Design", icon: Layout, category: "Design" },
];

const categoryColors: Record<string, string> = {
  Design: "from-pink-500/10 to-purple-500/10",
  Development: "from-blue-500/10 to-cyan-500/10",
  Backend: "from-green-500/10 to-emerald-500/10",
  Security: "from-orange-500/10 to-amber-500/10",
  DevOps: "from-violet-500/10 to-indigo-500/10",
  Optimization: "from-yellow-500/10 to-lime-500/10",
};

const categoryDot: Record<string, string> = {
  Design: "bg-pink-500",
  Development: "bg-blue-500",
  Backend: "bg-green-500",
  Security: "bg-orange-500",
  DevOps: "bg-violet-500",
  Optimization: "bg-yellow-500",
};

const SkillCard = ({ skill }: { skill: typeof professionalSkills[0] }) => {
  const Icon = skill.icon;
  const gradientClass = categoryColors[skill.category] || "from-primary/10 to-primary/5";
  const dotClass = categoryDot[skill.category] || "bg-primary";

  return (
    <div className="group relative bg-card rounded-xl px-4 py-2.5 card-shadow hover:card-shadow-hover transition-all duration-300 cursor-default flex items-center gap-2.5 flex-shrink-0">
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="relative z-10 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300 flex-shrink-0">
          <Icon className="w-3.5 h-3.5 text-accent-foreground group-hover:text-primary transition-colors duration-300" />
        </div>
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 whitespace-nowrap">
          {skill.name}
        </span>
        <span className={`w-1.5 h-1.5 rounded-full ${dotClass} opacity-50 flex-shrink-0`} />
      </div>
    </div>
  );
};

const ProfessionalSkillsSection = () => {
  const duplicated = [...professionalSkills, ...professionalSkills];

  return (
    <section
      id="professional-skills"
      className="py-14 md:py-20 bg-secondary/30 relative"
    >
      <div className="absolute inset-0 grid-background opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-accent-foreground bg-accent rounded-full">
            Expertise
          </span>
          <h2 className="heading-lg">Professional Skills</h2>
        </motion.div>
      </div>

      {/* Full-width slider — outside container so it bleeds edge to edge */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-background/80 to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-background/80 to-transparent" />

        {/* Row 1 — left to right */}
        <div className="flex gap-3 mb-3 w-max animate-marquee">
          {duplicated.map((skill, i) => (
            <SkillCard key={`r1-${i}`} skill={skill} />
          ))}
        </div>

        {/* Row 2 — right to left */}
        <div className="flex gap-3 w-max animate-marquee-reverse">
          {[...duplicated].reverse().map((skill, i) => (
            <SkillCard key={`r2-${i}`} skill={skill} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 28s linear infinite;
        }
        .animate-marquee:hover,
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ProfessionalSkillsSection;