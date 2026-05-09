import type { CSSProperties } from "react";
import { useState, useEffect, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import hero from "@/assets/myImage2.jpeg";
import { useMagnetic } from "@/hooks/useMagnetic";

const HeroOrb = lazy(() => import("./HeroOrb"));

const LINE1 = "Iman";
const LINE2 = "Olabode Bello";
const TOTAL = LINE1.length + LINE2.length;

const glass = {
  backdropFilter: "blur(28px) saturate(190%) brightness(1.05)",
  WebkitBackdropFilter: "blur(28px) saturate(190%) brightness(1.05)",
  background: "rgba(255,255,255,0.52)",
  border: "1px solid rgba(255,255,255,0.60)",
  boxShadow:
    "0 4px 6px rgba(0,0,0,0.04), 0 12px 28px rgba(0,0,0,0.08), inset 0 1.5px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(0,0,0,0.03)",
} as CSSProperties;

const Caret = () => (
  <motion.span
    aria-hidden="true"
    animate={{ opacity: [1, 1, 0, 0] }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear",
      times: [0, 0.5, 0.5, 1],
    }}
    style={{
      display: "inline-block",
      width: "7px",
      height: "0.8em",
      background: "#4A4A52",
      marginLeft: "4px",
      verticalAlign: "baseline",
      borderRadius: "1px",
      position: "relative",
      bottom: "-0.05em",
    }}
  />
);

const HeroSection = () => {
  const [count, setCount] = useState(0);
  const btnPrimaryRef = useMagnetic<HTMLAnchorElement>({ strength: 0.3 });
  const btnSecondaryRef = useMagnetic<HTMLAnchorElement>({ strength: 0.3 });

  useEffect(() => {
    if (count >= TOTAL) return;
    const delay = count === 0 ? 600 : 90;
    const t = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [count]);

  const line1 = LINE1.slice(0, Math.min(count, LINE1.length));
  const line2 =
    count > LINE1.length ? LINE2.slice(0, count - LINE1.length) : "";
  const isDone = count >= TOTAL;

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-90" />

      {/* 3D hero orb — lazy-loaded, desktop only */}
      <Suspense fallback={null}>
        <HeroOrb />
      </Suspense>

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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-full"
                style={{ ...glass, color: "hsl(var(--foreground))" }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-current"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                Software Engineer
              </span>
            </motion.div>

            <h1 className="heading-xl mb-6">
              <span className="block min-h-[1em]">
                {line1}
                {!isDone && count <= LINE1.length && <Caret />}
              </span>
              <span className="text-gradient block min-h-[1em]">
                {line2}
                {count > LINE1.length && <Caret />}
              </span>
            </h1>

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
                ref={btnPrimaryRef}
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ willChange: "transform" }}
              >
                View Projects
              </a>
              <a
                ref={btnSecondaryRef}
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-full font-medium transition-all duration-300 hover:bg-secondary"
                style={{ willChange: "transform" }}
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
    </section>
  );
};

export default HeroSection;
