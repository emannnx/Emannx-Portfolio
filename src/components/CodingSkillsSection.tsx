import { motion } from "framer-motion";

const codingSkills = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Java",
  "React",
  "React Native",
  "Expo",
  "NativeWind",
  "Tailwind CSS",
  "Node.js",
  "Firebase",
  "REST APIs",
  "Git & GitHub",
];

const CodingSkillsSection = () => {
  return (
    <section
      id="coding-skills"
      className="py-24 md:py-32 bg-background relative"
    >
      <div className="absolute inset-0 grid-background opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent-foreground bg-accent rounded-full">
            Technical Stack
          </span>
          <h2 className="heading-lg">Coding Skills</h2>
          <p className="body-md text-muted-foreground mt-4 max-w-2xl mx-auto">
            Technologies and languages I use to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {codingSkills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="group relative bg-card rounded-2xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Skill name */}
              <div className="relative z-10 text-center">
                <span className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                  {skill}
                </span>
              </div>

              {/* Decorative dot */}
              <motion.div
                className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary transition-colors duration-300"
                whileHover={{ scale: 1.5 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CodingSkillsSection;
