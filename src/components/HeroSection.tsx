import { motion } from "framer-motion";
import avatar from "@/assets/avatar.jpg";
import hero from "@/assets/myImage2.jpeg";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-90" />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 right-[15%] w-20 h-20 rounded-full bg-accent animate-float"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-32 left-[10%] w-32 h-32 rounded-2xl bg-primary/10 animate-float"
        style={{ animationDelay: "1s" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      />
      <motion.div
        className="absolute top-1/3 left-[20%] w-4 h-4 rounded-full bg-primary animate-pulse-soft"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[25%] w-3 h-3 rounded-full bg-foreground/20 animate-pulse-soft"
        style={{ animationDelay: "0.5s" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-5 md:py-0">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-accent-foreground bg-accent rounded-full">
                Software Engineer
              </span>
            </motion.div>

            <motion.h1
              className="heading-xl mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              Iman
              <br />
              <span className="text-gradient">Olabode Bello</span>
            </motion.h1>

            <motion.p
              className="body-lg max-w-lg mx-auto lg:mx-0 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              I craft intuitive digital experiences that bridge the gap between
              user needs and business goals. Focused on clean, purposeful
              design.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-full font-medium transition-all duration-300 hover:bg-secondary"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden card-shadow">
                <img
                  src={hero}
                  alt="Designer avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative ring */}
              <div
                className="absolute -inset-4 rounded-full border-2 border-dashed border-border/50 animate-spin"
                style={{ borderColor: "#121216", animationDuration: "20s" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
    </section>
  );
};

export default HeroSection;
