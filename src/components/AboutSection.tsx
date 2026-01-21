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
                I’m a Software Engineer with a professional background in MMS
                Software Engineering from NIIT, and hands-on experience building
                modern web and mobile applications using HTML, CSS, JavaScript,
                TypeScript, React, Next.js, Express.Js, React Native,
                Spring-Boot, and Java. I focus on developing reliable, scalable,
                and user-centered solutions that balance performance,
                functionality, and clean design.
              </p>
              <p>
                My technical toolkit includes Tailwind CSS for crafting
                responsive and visually appealing interfaces, strong UI/UX
                design principles for intuitive user flows, and Java for
                structured backend development. I work extensively with Firebase
                for authentication, real-time databases, and secure user
                management, enabling seamless end-to-end application
                functionality.
              </p>
              <p>
                n addition to frontend and backend development, I have
                experience deploying and maintaining applications using GitHub,
                custom domains, and modern hosting platforms. I excel at
                translating complex ideas and designs into fully functional,
                production-ready digital products. Driven by continuous
                learning, I enjoy collaborating on forward-thinking projects
                that push the boundaries of web and mobile development while
                delivering real-world impact.
              </p>
            </div>

            {/* Quick stats */}
            {/* <div className="flex gap-8 mt-8">
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
            </div> */}
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
