import { motion } from 'framer-motion';
import { Home, Briefcase, User, Mail, Code2, Layers, Github } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'hero', icon: Home, label: 'Home' },
  { id: 'projects', icon: Briefcase, label: 'Projects' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'coding-skills', icon: Code2, label: 'Code' },
  { id: 'professional-skills', icon: Layers, label: 'Skills' },
  { id: 'github', icon: Github, label: 'GitHub' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

interface FloatingNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

const FloatingNav = ({ activeSection, onNavigate }: FloatingNavProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
      className="fixed bottom-3 md:left-[37.5%] -translate-x-1/2 z-50"
    >
      <div className="nav-float flex flex-wrap justify-center items-center gap-1 px-2 py-2 rounded-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isHovered = hoveredId === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors duration-300 ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-accent rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
              {(isActive || isHovered) && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-sm font-medium relative z-10"
                >
                  {item.label}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default FloatingNav;
