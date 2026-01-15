import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { Github, ExternalLink } from 'lucide-react';

interface GitHubCalendarSectionProps {
  username?: string;
}

const GitHubCalendarSection = ({ username = 'your-github-username' }: GitHubCalendarSectionProps) => {
  const isPlaceholder = username === 'your-github-username';

  return (
    <section id="github" className="py-24 md:py-32 bg-background relative">
      <div className="absolute inset-0 grid-background opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent-foreground bg-accent rounded-full">
            Open Source
          </span>
          <h2 className="heading-lg">GitHub Contributions</h2>
          <p className="body-md text-muted-foreground mt-4 max-w-2xl mx-auto">
            My coding activity and open source contributions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-card rounded-3xl p-8 md:p-10 card-shadow">
            {/* Header with GitHub link */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <Github className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">@{username}</h3>
                  <p className="text-sm text-muted-foreground">GitHub Profile</p>
                </div>
              </div>
              
              <motion.a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-medium">View Profile</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>

            {/* Calendar */}
            <div className="overflow-x-auto pb-4">
              {isPlaceholder ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Github className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Update the username prop to display your GitHub contributions
                  </p>
                  <code className="text-sm bg-muted px-3 py-1 rounded-lg text-foreground">
                    username="your-actual-github-username"
                  </code>
                </div>
              ) : (
                <div className="flex justify-center">
                  <GitHubCalendar 
                    username={username}
                    colorScheme="light"
                    fontSize={12}
                    blockSize={12}
                    blockMargin={4}
                    blockRadius={3}
                    style={{
                      color: 'hsl(var(--foreground))',
                    }}
                  />
                </div>
              )}
            </div>

            {/* Stats placeholder */}
            {!isPlaceholder && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-8 pt-8 border-t border-border flex flex-wrap justify-center gap-8"
              >
                <div className="text-center">
                  <span className="block text-2xl font-bold text-foreground font-heading">—</span>
                  <span className="text-sm text-muted-foreground">Contributions</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-foreground font-heading">—</span>
                  <span className="text-sm text-muted-foreground">Repositories</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-bold text-foreground font-heading">—</span>
                  <span className="text-sm text-muted-foreground">Stars Earned</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubCalendarSection;
