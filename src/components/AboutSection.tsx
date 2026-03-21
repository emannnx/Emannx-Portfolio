import { motion } from "framer-motion";
import { Code, Cpu, GitBranch, Database, Cloud, Terminal } from "lucide-react";

const skills = [
  { icon: Code, name: "TypeScript", description: "React, Node, Next.js" },
  { icon: Cpu, name: "System Design", description: "Microservices, APIs" },
  {
    icon: GitBranch,
    name: "Git & CI/CD",
    description: "GitHub Actions, Docker",
  },
  { icon: Database, name: "Databases", description: "PostgreSQL, Redis" },
  { icon: Cloud, name: "Cloud", description: "AWS, Vercel, Serverless" },
  { icon: Terminal, name: "DevOps", description: "Monitoring, IaC, k8s" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-secondary/30 relative">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-background opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent-foreground bg-accent rounded-full">
              About Me
            </span>
            <h2 className="heading-lg mb-6">
              Building Scalable
              <br />
              Software Solutions
            </h2>
            <div className="space-y-4 body-md">
  <p>
    I'm a Software Engineer with a background in MMS Software Engineering from NIIT,
    specializing in building modern web and mobile applications. My stack spans
    React, Next.js, TypeScript, Express.js, React Native, and Spring Boot with
    Firebase powering auth and real-time data, and Tailwind CSS keeping interfaces
    clean and responsive.
  </p>
  <p>
    I care about turning complex ideas into reliable, production-ready products that
    feel as good as they perform. Whether it's frontend, backend, or deployment, I
    focus on writing code that scales and design that resonates always with an eye
    toward what's next.
  </p>
</div>

           
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-card p-5 rounded-2xl card-shadow text-center transition-all duration-300 hover:card-shadow-hover"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1">
                    {skill.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {skill.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
