import { motion } from 'framer-motion';
import { Figma, Palette, Layout, Smartphone, Lightbulb, Users } from 'lucide-react';

const skills = [
  { icon: Figma, name: 'Figma', description: 'Design & Prototyping' },
  { icon: Palette, name: 'Visual Design', description: 'Color, Typography, Layout' },
  { icon: Layout, name: 'Web Design', description: 'Responsive & Accessible' },
  { icon: Smartphone, name: 'Mobile Design', description: 'iOS & Android' },
  { icon: Lightbulb, name: 'UX Strategy', description: 'Research & Testing' },
  { icon: Users, name: 'Collaboration', description: 'Cross-functional Teams' },
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
              Crafting Digital<br />Experiences
            </h2>
            <div className="space-y-4 body-md">
              <p>
                I'm a UX/UI designer with 5+ years of experience creating digital 
                products that people love to use. My approach combines user research, 
                visual design, and strategic thinking.
              </p>
              <p>
                Currently based in San Francisco, I work with startups and enterprises 
                to transform complex problems into elegant, intuitive solutions. When 
                I'm not designing, you'll find me exploring photography or hiking trails.
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
                <span className="block text-4xl font-bold text-foreground font-heading">50+</span>
                <span className="text-sm text-muted-foreground">Projects Completed</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="block text-4xl font-bold text-foreground font-heading">5+</span>
                <span className="text-sm text-muted-foreground">Years Experience</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <span className="block text-4xl font-bold text-foreground font-heading">20+</span>
                <span className="text-sm text-muted-foreground">Happy Clients</span>
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
