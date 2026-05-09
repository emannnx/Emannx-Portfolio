import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

export default function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  // Dot — raw (instant)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ring — spring (lags behind)
  const ringX = useSpring(dotX, { damping: 26, stiffness: 180, mass: 0.6 });
  const ringY = useSpring(dotY, { damping: 26, stiffness: 180, mass: 0.6 });

  useEffect(() => {
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches;
    const isSmall = window.innerWidth < 768;

    if (isTouchDevice || isSmall || prefersReduced) return;

    setEnabled(true);
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const interactive = t?.closest(
        'a, button, [role="button"], input, select, textarea, label, [data-cursor="pointer"]',
      );
      setHovering(!!interactive);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
    };
  }, [dotX, dotY, prefersReduced]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot — instant follow */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          translateX: dotX,
          translateY: dotY,
          x: "-50%",
          y: "-50%",
          width: 7,
          height: 7,
          background: "hsl(var(--foreground))",
        }}
        animate={{
          scale: clicking ? 0.5 : hovering ? 0 : 1,
          opacity: hovering ? 0 : 1,
        }}
        transition={{ duration: 0.12 }}
      />

      {/* Ring — spring follow, morphs on hover */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          translateX: ringX,
          translateY: ringY,
          x: "-50%",
          y: "-50%",
          borderStyle: "solid",
          borderRadius: "50%",
        }}
        animate={{
          width: clicking ? 30 : hovering ? 52 : 36,
          height: clicking ? 30 : hovering ? 52 : 36,
          borderWidth: 1.5,
          borderColor: hovering
            ? "hsl(var(--foreground) / 0.7)"
            : "hsl(var(--foreground) / 0.3)",
          backgroundColor: hovering
            ? "hsl(var(--foreground) / 0.07)"
            : "transparent",
          scale: clicking ? 0.88 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
}
