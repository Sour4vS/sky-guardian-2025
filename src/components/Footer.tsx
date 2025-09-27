import { motion } from "framer-motion";
import { Satellite, Github, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-neon flex items-center justify-center">
                <Satellite className="w-6 h-6 text-background" />
              </div>
              <div>
                <h3 className="text-xl font-bold">NASA AirCast</h3>
                <p className="text-sm text-muted-foreground">SpaceApps Challenge 2025</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-md">
              Predicting cleaner, safer skies with NASA TEMPO data and AI-powered forecasting. 
              Protecting communities through real-time air quality intelligence.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#dashboard" className="text-muted-foreground hover:text-neon-cyan transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-neon-cyan transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#impact" className="text-muted-foreground hover:text-neon-cyan transition-colors">
                  Impact
                </a>
              </li>
              <li>
                <a href="#api" className="text-muted-foreground hover:text-neon-cyan transition-colors">
                  API Access
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Data Sources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Data Sources</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://tempo.si.edu/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-neon-cyan transition-colors flex items-center gap-1"
                >
                  NASA TEMPO
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://earthdata.nasa.gov/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-neon-cyan transition-colors flex items-center gap-1"
                >
                  NASA Earth Data
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.spaceappschallenge.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-neon-cyan transition-colors flex items-center gap-1"
                >
                  SpaceApps Challenge
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-sm text-muted-foreground">
            © 2025 NASA AirCast. Built for NASA SpaceApps Challenge 2025.
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="mailto:team@nasaaircast.dev" 
              className="text-muted-foreground hover:text-neon-cyan transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/nasa-aircast" 
              className="text-muted-foreground hover:text-neon-cyan transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-cyan/5 to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;