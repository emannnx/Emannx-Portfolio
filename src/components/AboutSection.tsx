import { motion } from 'framer-motion';
import { Code, Cpu, GitBranch, Database, Cloud, Terminal } from 'lucide-react';

const skills = [
  { icon: Code, name: 'TypeScript', description: 'React, Node, Next.js' },
  { icon: Cpu, name: 'System Design', description: 'Microservices, APIs' },
  { icon: GitBranch, name: 'Git & CI/CD', description: 'GitHub Actions, Docker' },
  { icon: Database, name: 'Databases', description: 'PostgreSQL, Redis' },
  { icon: Cloud, name: 'Cloud', description: 'AWS, Vercel, Serverless' },
  { icon: Terminal, name: 'DevOps', description: 'Monitoring, IaC, k8s' },
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
              Building Scalable<br />Software Solutions
            </h2>
            <div className="space-y-4 body-md">
              <p>
                I'm a full-stack engineer with 5+ years shipping production systems
                that serve millions. I specialize in TypeScript, React, and cloud-native
                architectures that scale.
              </p>
              <p>
                Currently in San Francisco, I lead technical initiatives from zero-to-one
                products to platform modernization. When I'm not coding, you'll catch me
                contributing to open-source or optimizing my neovim config.
              </p>
            </div>
            
            {/* Quick stats */}
            <div className="flex gap-8 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="block text-4xl font-bold text-foreground font-heading">10M+</span>
                <span className="text-sm text-muted-foreground">Requests Handled</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="block text-4xl font-bold text-foreground font-heading">99.9%</span>
                <span className="text-sm text-muted-foreground">Uptime Achieved</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <span className="block text-4xl font-bold text-foreground font-heading">50+</span>
                <span className="text-sm text-muted-foreground">Code Reviews</span>
              </motion.div>
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
                  <h4 className="font-medium text-foreground mb-1">{skill.name}</h4>
                  <p className="text-xs text-muted-foreground">{skill.description}</p>
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
