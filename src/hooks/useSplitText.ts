import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface Options {
  type?: "words" | "chars" | "lines" | "words,chars";
  stagger?: number;
  duration?: number;
  delay?: number;
  y?: number;
  start?: string;
}

export function useSplitText<T extends HTMLElement = HTMLElement>(
  options: Options = {},
) {
  const ref = useRef<T>(null);
  const {
    type = "words",
    stagger = 0.06,
    duration = 0.85,
    delay = 0,
    y = 70,
    start = "top 88%",
  } = options;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    // Overflow-clip the element so words slide up from below without showing
    el.style.overflow = "hidden";

    const split = new SplitText(el, { type });
    const targets =
      type === "words" || type === "words,chars" ? split.words : split.lines;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        y,
        opacity: 0,
        rotateX: -15,
        transformOrigin: "0% 50% -30px",
        duration,
        stagger,
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => {
      ctx.revert();
      split.revert();
      el.style.overflow = "";
    };
  }, [type, stagger, duration, delay, y, start]);

  return ref;
}
