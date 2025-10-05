
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Globe, BarChart3 } from "lucide-react";
import heroImage from "@/assets/hero-space-earth.jpg";

// Smooth scroll helper
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center space-bg overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-neon-cyan glow-cyan"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 1, 0.3] 
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-neon-violet glow-violet"
        animate={{ 
          y: [0, 15, 0],
          x: [0, 10, 0],
          opacity: [0.5, 1, 0.5] 
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2 
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 glass-card px-6 py-3 mb-8 hover-glow"
          >
            <Sparkles className="w-5 h-5 text-neon-cyan" />
            <span className="text-sm font-medium">NASA SpaceApps Challenge 2025</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
          >
            Predicting{" "}
            <span className="gradient-text">Cleaner, Safer</span>{" "}
            Skies with NASA Data
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          >
            Real-time air quality forecasts powered by NASA TEMPO data, 
            advanced AI models, and cloud computing for safer communities.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-gradient-neon hover:bg-gradient-neon/90 text-background font-semibold px-8 py-4 text-lg hover-glow pulse-neon group"
              onClick={() => scrollToId("location-search-section")}
            >
              <Globe className="w-5 h-5 mr-2 group-hover:animate-spin" />
              Check My Air Quality
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:text-white hover:bg-white/10 hover:border-white px-8 py-4 text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all duration-300 pulse-neon-slow"
              onClick={() => scrollToId("dashboard-section")}
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              View Dashboard
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-cyan mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Real-time Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-violet mb-2">AI</div>
              <div className="text-sm text-muted-foreground">Powered Predictions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon-green mb-2">NASA</div>
              <div className="text-sm text-muted-foreground">TEMPO Data</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator removed as requested */}
    </section>
  );
};

export default HeroSection;