import { motion } from "framer-motion";
import { Mail, Linkedin, Twitter, ArrowUpRight, Phone } from "lucide-react";

const socialLinks = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:imanolabodebello8@gmail.com",
    username: "imanolabodebello8@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/iman-olabode-bello/",
    username: "linkedin.com/in/Developer",
  },
  {
    icon: Phone,
    label: "Whatsapp",
    href: "https://wa.me/2347061716813?text=Hi%2C%20I%20am%20contacting%20you%20from%20your%20portfolio%20site.",
    username: "+2347061716813",
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-accent-foreground bg-accent rounded-full">
            Get in Touch
          </span>
          <h2 className="heading-lg mb-6">
            Let's Create
            <br />
            Something Amazing
          </h2>
          <p className="body-lg mb-12">
            Have a project in mind? I'd love to hear about it. Let's discuss how
            we can work together to bring your vision to life.
          </p>

          {/* Contact Links */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="group flex items-center gap-4 px-6 py-4 bg-card rounded-2xl card-shadow transition-all duration-300 hover:card-shadow-hover"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <Icon className="w-5 h-5 text-accent-foreground group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <div className="text-left">
                    <span className="block text-sm text-muted-foreground">
                      {link.label}
                    </span>
                    <span className="block font-medium text-foreground">
                      {link.username}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              );
            })}
          </div>

          {/* CTA Button */}
          <motion.a
            href="mailto:imanolabodebello8@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium text-lg transition-shadow duration-300 hover:shadow-xl"
          >
            Start a Conversation
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-6 mt-24">
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Iman Olabode Bello. All rights
            reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Software Engineer specialized in creating beautiful and functional
            web applications.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
