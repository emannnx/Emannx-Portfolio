import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9996] origin-left"
      style={{
        height: "2px",
        scaleX,
        background: "linear-gradient(90deg, hsl(var(--primary)), hsl(12 76% 75%))",
      }}
    />
  );
}
