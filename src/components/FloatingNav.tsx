import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { Home, Briefcase, User, Mail, Code2, Layers } from "lucide-react";
import { useState, useRef } from "react";

const navItems = [
  { id: "hero",                icon: Home,     label: "Home"   },
  { id: "projects",            icon: Briefcase,label: "Work"   },
  { id: "about",               icon: User,     label: "About"  },
  { id: "coding-skills",       icon: Code2,    label: "Code"   },
  { id: "professional-skills", icon: Layers,   label: "Skills" },
  { id: "contact",             icon: Mail,     label: "Contact"},
];

interface FloatingNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function FloatingNav({ activeSection, onNavigate }: FloatingNavProps) {
  const [hoveredId, setHoveredId]   = useState<string | null>(null);
  const [tappedId,  setTappedId]    = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  /* ── 3-D tilt tracking ── */
  const tiltX = useSpring(useMotionValue(0), { stiffness: 180, damping: 26 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 180, damping: 26 });

  const onMove = (e: React.MouseEvent) => {
    const r = navRef.current?.getBoundingClientRect();
    if (!r) return;
    tiltX.set(((e.clientY - (r.top  + r.height / 2)) / r.height) * -5);
    tiltY.set(((e.clientX - (r.left + r.width  / 2)) / r.width)  *  5);
  };
  const onLeave = () => { tiltX.set(0); tiltY.set(0); };

  const fireTap = (id: string) => {
    onNavigate(id);
    setTappedId(id);
    setTimeout(() => setTappedId(null), 420);
  };

  return (
    <>
      {/* ── Scoped styles ── */}
      <style>{`
        /* ── pill shell ── */
        .lg-pill {
          /* matches the site's light card/background tone */
          background : rgba(248, 248, 250, 0.72);
          border      : 1px solid rgba(0, 0, 0, 0.07);
          box-shadow  :
            /* outer elevation */
            0 4px 6px  -1px rgba(0,0,0,0.07),
            0 12px 28px -4px rgba(0,0,0,0.10),
            /* inner top specular — the iOS 26 "glass lip" */
            inset 0  1px 0   rgba(255,255,255,0.90),
            /* inner bottom shadow */
            inset 0 -1px 0   rgba(0,0,0,0.04);
          backdrop-filter         : blur(40px) saturate(200%) brightness(1.04);
          -webkit-backdrop-filter : blur(40px) saturate(200%) brightness(1.04);
        }
        /* dark-mode variant */
        :is(.dark, [data-theme="dark"]) .lg-pill {
          background  : rgba(28, 28, 36, 0.68);
          border      : 1px solid rgba(255,255,255,0.09);
          box-shadow  :
            0  4px  6px -1px rgba(0,0,0,0.30),
            0 12px 28px -4px rgba(0,0,0,0.50),
            inset 0  1px 0   rgba(255,255,255,0.14),
            inset 0 -1px 0   rgba(0,0,0,0.30);
        }

        /* ── active button cell ── */
        .lg-active-cell {
          background : rgba(255,255,255,0.82);
          border     : 1px solid rgba(0,0,0,0.06);
          box-shadow :
            0 2px 8px rgba(0,0,0,0.08),
            inset 0  1px 0 rgba(255,255,255,1),
            inset 0 -1px 0 rgba(0,0,0,0.03);
        }
        :is(.dark, [data-theme="dark"]) .lg-active-cell {
          background : rgba(255,255,255,0.15);
          border     : 1px solid rgba(255,255,255,0.16);
          box-shadow :
            0 2px 8px rgba(0,0,0,0.28),
            inset 0  1px 0 rgba(255,255,255,0.22),
            inset 0 -1px 0 rgba(0,0,0,0.18);
        }

        /* ── hover cell ── */
        .lg-btn:hover:not(.lg-active-cell) {
          background : rgba(0,0,0,0.04);
        }
        :is(.dark, [data-theme="dark"]) .lg-btn:hover:not(.lg-active-cell) {
          background : rgba(255,255,255,0.07);
        }

        /* ── tooltip glass ── */
        .lg-tooltip {
          background  : rgba(248,248,250,0.88);
          border      : 1px solid rgba(0,0,0,0.07);
          box-shadow  :
            0 4px 16px rgba(0,0,0,0.10),
            inset 0 1px 0 rgba(255,255,255,0.90);
          backdrop-filter         : blur(24px) saturate(180%);
          -webkit-backdrop-filter : blur(24px) saturate(180%);
        }
        :is(.dark, [data-theme="dark"]) .lg-tooltip {
          background  : rgba(38,38,48,0.88);
          border      : 1px solid rgba(255,255,255,0.10);
          box-shadow  :
            0 4px 16px rgba(0,0,0,0.36),
            inset 0 1px 0 rgba(255,255,255,0.12);
        }
      `}</style>

      <motion.nav
        initial={{ y: 64, opacity: 0, scale: 0.90 }}
        animate={{ y: 0,  opacity: 1, scale: 1    }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-5 md:bottom-8 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        {/* perspective wrapper */}
        <div style={{ perspective: 900 }} className="pointer-events-auto">
          <motion.div
            ref={navRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
            className="lg-pill relative flex items-center gap-0.5 px-2 py-1.5 rounded-[26px]"
          >
            {/* ── top specular lip (the iOS 26 detail) ── */}
            <div
              className="absolute top-px left-5 right-5 h-px rounded-full pointer-events-none z-20"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.95) 60%, transparent)" }}
            />

            {navItems.map((item) => {
              const Icon     = item.icon;
              const isActive = activeSection === item.id;
              const isHover  = hoveredId     === item.id;
              const isTapped = tappedId      === item.id;

              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* ── Tooltip ── */}
                  <AnimatePresence>
                    {isHover && !isTapped && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.86 }}
                        animate={{ opacity: 1, y:  0, scale: 1    }}
                        exit  ={{ opacity: 0, y:  6, scale: 0.90  }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        className="absolute -top-[42px] left-1/2 -translate-x-1/2 pointer-events-none z-30"
                      >
                        <div className="lg-tooltip px-3 py-1 rounded-[10px] text-[11px] font-semibold text-foreground/80 whitespace-nowrap">
                          {item.label}
                        </div>
                        {/* arrow */}
                        <div
                          className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45"
                          style={{
                            background: "rgba(248,248,250,0.88)",
                            borderRight: "1px solid rgba(0,0,0,0.07)",
                            borderBottom: "1px solid rgba(0,0,0,0.07)",
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── Icon button ── */}
                  <motion.button
                    onClick={() => fireTap(item.id)}
                    whileTap={{ scale: 0.80 }}
                    animate={isTapped ? { scale: [0.80, 1.10, 1.0] } : {}}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    aria-label={item.label}
                    className={`
                      lg-btn relative w-11 h-11 rounded-[18px] flex items-center justify-center
                      overflow-hidden outline-none transition-colors duration-200
                      ${isActive ? "lg-active-cell" : ""}
                    `}
                  >
                    {/* Sliding active bg (layoutId animates between buttons) */}
                    {isActive && (
                      <motion.div
                        layoutId="lg-active-bg"
                        className="absolute inset-0 rounded-[18px] lg-active-cell"
                        transition={{ type: "spring", stiffness: 340, damping: 30 }}
                      />
                    )}

                    {/* Tap ripple burst */}
                    <AnimatePresence>
                      {isTapped && (
                        <motion.div
                          key="ripple"
                          className="absolute inset-0 rounded-[18px] pointer-events-none"
                          style={{ background: "rgba(0,0,0,0.06)" }}
                          initial={{ opacity: 1, scale: 0.4 }}
                          animate={{ opacity: 0, scale: 2.2 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.42 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Icon */}
                    <Icon
                      className="relative z-10 transition-all duration-200"
                      style={{
                        width:       18,
                        height:      18,
                        strokeWidth: isActive ? 2.3 : 1.75,
                        color: isActive
                          ? "hsl(var(--foreground))"
                          : "hsl(var(--muted-foreground))",
                        filter: isActive
                          ? "drop-shadow(0 1px 1px rgba(0,0,0,0.12))"
                          : "none",
                      }}
                    />

                    {/* Active dot */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          layoutId="lg-active-dot"
                          className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full"
                          style={{ background: "hsl(var(--foreground) / 0.35)" }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit  ={{ opacity: 0, scale: 0 }}
                          transition={{ duration: 0.25 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              );
            })}

            {/* ── bottom shadow lip ── */}
            <div
              className="absolute bottom-px left-5 right-5 h-px rounded-full pointer-events-none z-20"
              style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.05) 50%, transparent)" }}
            />
          </motion.div>
        </div>
      </motion.nav>
    </>
  );
}