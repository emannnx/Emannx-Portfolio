import type { CSSProperties } from "react";
import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import hero from "@/assets/myImage2.jpeg";
import { useMagnetic } from "@/hooks/useMagnetic";

const HeroOrb = lazy(() => import("./HeroOrb"));

const NAMES = [
  { line1: "Iman", line2: "Olabode-Bello" },
  { line1: "إيمان", line2: "أولابوده بيلو" },
] as const;

const INITIAL_DELAY = 2200; // wait for preloader exit
const TYPE_SPEED = 75; // ms per character while typing
const DELETE_SPEED = 40; // ms per character while deleting (faster feels natural)
const PAUSE_FULL = 1800; // hold after fully typed
const PAUSE_EMPTY = 500; // hold after fully deleted before switching language

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

type Phase = "typing" | "deleting";

const HeroSection = () => {
  const [started, setStarted] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [lang, setLang] = useState(0); // 0 = EN, 1 = AR
  const [phase, setPhase] = useState<Phase>("typing");

  const btnPrimaryRef = useMagnetic<HTMLAnchorElement>({ strength: 0.3 });
  const btnSecondaryRef = useMagnetic<HTMLAnchorElement>({ strength: 0.3 });

  const avatarRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [12, -12]), { stiffness: 280, damping: 28 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-12, 12]), { stiffness: 280, damping: 28 });

  function handleAvatarMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = avatarRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleAvatarMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  // Wait for preloader before starting
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), INITIAL_DELAY);
    return () => clearTimeout(t);
  }, []);

  // Typewriter state machine
  useEffect(() => {
    if (!started) return;

    const name = NAMES[lang];
    const total = name.line1.length + name.line2.length;

    if (phase === "typing") {
      if (charCount >= total) {
        // Fully typed — pause then switch to deleting
        const t = setTimeout(() => setPhase("deleting"), PAUSE_FULL);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setCharCount((c) => c + 1), TYPE_SPEED);
      return () => clearTimeout(t);
    }

    // phase === "deleting"
    if (charCount <= 0) {
      // Fully deleted — pause, swap language, start typing
      const t = setTimeout(() => {
        setLang((l) => (l + 1) % 2);
        setPhase("typing");
      }, PAUSE_EMPTY);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCharCount((c) => c - 1), DELETE_SPEED);
    return () => clearTimeout(t);
  }, [started, charCount, lang, phase]);

  const name = NAMES[lang];
  const line1 = name.line1.slice(0, Math.min(charCount, name.line1.length));
  const line2 =
    charCount > name.line1.length
      ? name.line2.slice(0, charCount - name.line1.length)
      : "";

  // Caret tracks the active line
  const caretOnLine2 = charCount > name.line1.length;

  const base = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Grid */}
      <div className="absolute inset-0 grid-background opacity-90" />

      {/* Ambient light orbs */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(12 76% 61% / 0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -left-48 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(220 76% 61% / 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 right-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(280 60% 60% / 0.07) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* 3D hero orb — lazy-loaded, desktop only */}
      <Suspense fallback={null}>{/* <HeroOrb /> */}</Suspense>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 right-[15%] w-20 h-20 rounded-full bg-accent animate-float"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-32 left-[10%] w-32 h-32 rounded-2xl bg-primary/10 animate-float"
        style={{ animationDelay: "1s" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 2.6, duration: 0.8 }}
      />
      <motion.div
        className="absolute top-1/3 left-[20%] w-4 h-4 rounded-full bg-primary animate-pulse-soft"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[25%] w-3 h-3 rounded-full bg-foreground/20 animate-pulse-soft"
        style={{ animationDelay: "0.5s" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.9 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-5 md:py-0">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              {...base}
              transition={{ duration: 0.6, delay: 2.1 }}
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 2.15 }}
            >
              <h1 className="heading-xl mb-6">
                <span className="block min-h-[1em]">
                  {line1}
                  {started && !caretOnLine2 && <Caret />}
                </span>
                <span className="hero-name-dark block min-h-[1em]">
                  {line2}
                  {started && caretOnLine2 && <Caret />}
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="body-lg max-w-lg mx-auto lg:mx-0 mb-8"
              {...base}
              transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
            >
              I craft intuitive digital experiences that bridge the gap between
              user needs and business goals. Focused on clean, purposeful
              design.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              {...base}
              transition={{ duration: 0.8, delay: 2.3, ease: "easeOut" }}
            >
              <a
                ref={btnPrimaryRef}
                href="#projects"
                className="hero-btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300"
                style={{ willChange: "transform" }}
              >
                View Projects
              </a>
              <a
                ref={btnSecondaryRef}
                href="#contact"
                className="hero-btn-secondary inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300"
                style={{ willChange: "transform" }}
              >
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* Avatar */}
          <motion.div
            ref={avatarRef}
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 2.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ perspective: 800 }}
            onMouseMove={handleAvatarMouseMove}
            onMouseLeave={handleAvatarMouseLeave}
          >
            <motion.div className="relative" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
              {/* Glow behind avatar */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, hsl(12 76% 61% / 0.18) 0%, transparent 70%)",
                  filter: "blur(24px)",
                  transform: "scale(1.3)",
                }}
              />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden card-shadow">
                <img
                  src={hero}
                  alt="Iman Olabode-Bello"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative ring */}
              <div
                className="absolute -inset-4 rounded-full border border-dashed animate-spin pointer-events-none"
                style={{
                  borderColor: "hsl(var(--foreground) / 0.12)",
                  animationDuration: "22s",
                }}
              />
              {/* Counter-rotating ring */}
              <div
                className="absolute -inset-8 rounded-full border border-dashed animate-spin pointer-events-none"
                style={{
                  borderColor: "hsl(var(--foreground) / 0.06)",
                  animationDuration: "35s",
                  animationDirection: "reverse",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
