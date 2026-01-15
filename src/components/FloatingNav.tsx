import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Briefcase,
  User,
  Mail,
  Code2,
  Layers,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { id: 'hero', icon: Home, label: 'Home' },
  { id: 'projects', icon: Briefcase, label: 'Work' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'coding-skills', icon: Code2, label: 'Code' },
  { id: 'professional-skills', icon: Layers, label: 'Skills' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

interface FloatingNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function FloatingNav({
  activeSection,
  onNavigate,
}: FloatingNavProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <motion.nav
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed bottom-5 md:bottom-7 inset-x-0 z-50 flex justify-center px-4"
    >
      {/* floating pill */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-background/90 backdrop-blur-md shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* tooltip */}
              <AnimatePresence>
                {hoveredId === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2
                               rounded-md px-3 py-1 text-xs font-medium
                               bg-accent text-accent-foreground
                               shadow-md whitespace-nowrap"
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* icon button */}
              <motion.button
                onClick={() => onNavigate(item.id)}
                whileTap={{ scale: 0.9 }}
                className={`w-11 h-11 rounded-full flex items-center justify-center
                  transition-colors duration-300
                  ${
                    isActive
                      ? 'bg-accent text-primary'
                      : 'bg-transparent text-muted-foreground hover:bg-muted'
                  }`}
              >
                <Icon className="w-5 h-5" />
              </motion.button>
            </div>
          );
        })}
      </div>
    </motion.nav>
  );
}
