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
  Settings,
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
  {
    name: "Deployment (Vercel, GitHub Pages)",
    icon: Rocket,
    category: "DevOps",
  },
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

const ProfessionalSkillsSection = () => {
  return (
    <section
      id="professional-skills"
      className="py-24 md:py-32 bg-secondary/30 relative"
    >
      <div className="absolute inset-0 grid-background opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent-foreground bg-accent rounded-full">
            Expertise
          </span>
          <h2 className="heading-lg">Professional Skills</h2>
          <p className="body-md text-muted-foreground mt-4 max-w-2xl mx-auto">
            Areas of expertise and professional capabilities
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {professionalSkills.map((skill, index) => {
            const Icon = skill.icon;
            const gradientClass =
              categoryColors[skill.category] || "from-primary/10 to-primary/5";

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  y: -3,
                  transition: { duration: 0.2 },
                }}
                className="group relative bg-card rounded-2xl p-5 card-shadow hover:card-shadow-hover transition-all duration-300 cursor-default"
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative z-10 flex items-start gap-4">
                  {/* Icon container */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-accent-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                      {skill.name}
                    </h4>
                    <span className="text-xs text-muted-foreground mt-1 inline-block">
                      {skill.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalSkillsSection;
