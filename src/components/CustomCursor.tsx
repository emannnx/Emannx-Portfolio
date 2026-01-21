import { useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type Props = {
  src?: string;
  size?: number;
  hoverScale?: number;
  clickScale?: number;
};

export default function CustomCursor({
  src = "/cursor.png",
  size = 24,
  hoverScale = 1.15,
  clickScale = 0.92,
}: Props) {
  const prefersReducedMotion = useReducedMotion();

  const [enabled, setEnabled] = useState(false);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = useMemo(
    () => ({ stiffness: 500, damping: 40, mass: 0.6 }),
    [],
  );

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const scale = useSpring(1, { stiffness: 500, damping: 30, mass: 0.5 });
  const opacity = useSpring(0.9, { stiffness: 400, damping: 35, mass: 0.5 });

  useEffect(() => {
    const checkEnv = () => {
      const smallScreen = window.innerWidth < 768;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const noHover = window.matchMedia("(hover: none)").matches;
      const shouldEnable =
        !smallScreen && !coarse && !noHover && !prefersReducedMotion;
      setEnabled(shouldEnable);
      document.body.classList.toggle("custom-cursor-active", shouldEnable);
    };
    checkEnv();
    window.addEventListener("resize", checkEnv);
    return () => {
      window.removeEventListener("resize", checkEnv);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onDown = () => {
      scale.set(clickScale);
    };
    const onUp = () => {
      scale.set(hoveringInteractive ? hoverScale : 1);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t) {
        setHoveringInteractive(false);
        scale.set(1);
        opacity.set(0.9);
        return;
      }
      const interactive = t.closest(
        [
          "a",
          "button",
          "[role='button']",
          "input",
          "select",
          "textarea",
          "summary",
          "nav a",
          "nav button",
          "nav [role='button']",
          ".interactive",
          "[data-interactive='true']",
        ].join(","),
      );
      const isInteractive = Boolean(interactive);
      setHoveringInteractive(isInteractive);
      scale.set(isInteractive ? hoverScale : 1);
      opacity.set(isInteractive ? 1 : 0.9);
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
    };
  }, [
    enabled,
    clickScale,
    hoverScale,
    hoveringInteractive,
    opacity,
    scale,
    x,
    y,
  ]);

  if (!enabled) return null;

  const sizePx = `${size}px`;
  const glow = hoveringInteractive
    ? "drop-shadow-[0_0_0.65rem_hsl(var(--ring)/0.45)]"
    : "drop-shadow-[0_0_0.35rem_hsl(var(--ring)/0.25)]";

  return (
    <motion.div
      style={{
        translateX: springX,
        translateY: springY,
        scale,
        opacity,
      }}
      className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999]"
      aria-hidden="true"
    >
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        className={`select-none ${glow}`}
        style={{ width: sizePx, height: sizePx }}
        draggable={false}
      />
    </motion.div>
  );
}
