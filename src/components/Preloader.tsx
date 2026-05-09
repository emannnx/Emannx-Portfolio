import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onDone: () => void;
}

export default function Preloader({ onDone }: Props) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    // Count from 0 → 100 over ~1 400 ms
    const total = 100;
    const duration = 1400;
    const step = duration / total;
    let current = 0;

    const tick = () => {
      current += 1;
      setCount(current);
      if (current < total) {
        setTimeout(tick, step + (Math.random() - 0.5) * step * 0.6);
      } else {
        // Hold briefly then exit
        setTimeout(() => {
          if (doneRef.current) return;
          doneRef.current = true;
          setExiting(true);
          setTimeout(onDone, 700); // fire after exit anim
        }, 240);
      }
    };

    const start = setTimeout(tick, 120);
    return () => clearTimeout(start);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] flex flex-col select-none overflow-hidden"
          style={{ background: "hsl(240 10% 5%)" }}
          exit={{
            clipPath: "inset(100% 0 0 0)",
          }}
          transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Top-left monogram */}
          <motion.div
            className="absolute top-8 left-8 md:top-10 md:left-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span
              className="text-xs tracking-[0.35em] uppercase font-medium"
              style={{ color: "hsl(0 0% 100% / 0.25)" }}
            >
              Portfolio
            </span>
          </motion.div>

          {/* Center content */}
          <div className="flex-1 flex flex-col items-start justify-center px-8 md:px-16 lg:px-24">
            {/* Line 1 — "IMAN" */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-heading font-bold leading-none tracking-tight"
                style={{
                  fontSize: "clamp(4.5rem, 12vw, 9rem)",
                  color: "hsl(0 0% 98%)",
                }}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              >
                Iman
              </motion.h1>
            </div>

            {/* Line 2 — "OLABODE BELLO" */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-heading font-bold leading-none tracking-tight"
                style={{
                  fontSize: "clamp(4.5rem, 12vw, 9rem)",
                  color: "hsl(0 0% 98% / 0.35)",
                }}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
              >
                Olabode Bello
              </motion.h1>
            </div>
          </div>

          {/* Bottom bar — counter + progress */}
          <motion.div
            className="px-8 md:px-16 lg:px-24 pb-10 md:pb-14 flex items-end justify-between gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Role tag */}
            <span
              className="text-xs tracking-[0.25em] uppercase font-medium"
              style={{ color: "hsl(0 0% 100% / 0.22)" }}
            >
              Software Engineer
            </span>

            {/* Counter */}
            <div className="flex flex-col items-end gap-3 min-w-[120px]">
              <span
                className="font-mono text-sm tabular-nums"
                style={{ color: "hsl(0 0% 100% / 0.35)" }}
              >
                {String(count).padStart(3, "0")}
              </span>
              {/* Progress track */}
              <div
                className="w-full h-[1px] rounded-full"
                style={{ background: "hsl(0 0% 100% / 0.1)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "hsl(0 0% 100% / 0.5)",
                    width: `${count}%`,
                  }}
                  transition={{ duration: 0.05 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
