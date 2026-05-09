import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Options {
  strength?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLElement>(
  options: Options = {},
) {
  const ref = useRef<T>(null);
  const { strength = 0.35 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Touch devices or reduced motion — skip
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top + r.height / 2)) * strength;
      gsap.to(el, { x: dx, y: dy, duration: 0.5, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.set(el, { clearProps: "x,y" });
    };
  }, [strength]);

  return ref;
}
