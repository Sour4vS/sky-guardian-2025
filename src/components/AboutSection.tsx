import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Satellite, Brain, Cloud, Shield } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Satellite,
      title: "NASA TEMPO Data",
      description: "Leveraging NASA's Tropospheric Emissions Monitoring of Pollution instrument for real-time atmospheric data"
    },
    {
      icon: Brain,
      title: "AI Predictions",
      description: "Advanced machine learning models analyze patterns to forecast air quality 48 hours in advance"
    },
    {
      icon: Cloud,
      title: "Cloud Computing",
      description: "Scalable infrastructure processing terabytes of satellite data for instant global coverage"
    },
    {
      icon: Shield,
      title: "Public Health",
      description: "Protecting communities by providing timely alerts and health recommendations"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powered by{" "}
            <span className="gradient-text">NASA Earth Observation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform combines cutting-edge satellite technology with artificial intelligence 
            to create the most accurate air quality predictions available.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card hover-glow h-full group">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-neon mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-background" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Data Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-center mb-8">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-neon-blue/20 border-2 border-neon-blue flex items-center justify-center">
                <span className="text-2xl font-bold text-neon-blue">1</span>
              </div>
              <h4 className="font-semibold">Satellite Data</h4>
              <p className="text-sm text-muted-foreground">NASA TEMPO monitors pollution from space</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-neon-cyan/20 border-2 border-neon-cyan flex items-center justify-center">
                <span className="text-2xl font-bold text-neon-cyan">2</span>
              </div>
              <h4 className="font-semibold">AI Processing</h4>
              <p className="text-sm text-muted-foreground">Machine learning analyzes atmospheric patterns</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-neon-violet/20 border-2 border-neon-violet flex items-center justify-center">
                <span className="text-2xl font-bold text-neon-violet">3</span>
              </div>
              <h4 className="font-semibold">Predictions</h4>
              <p className="text-sm text-muted-foreground">Generate accurate 48-hour forecasts</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-neon-green/20 border-2 border-neon-green flex items-center justify-center">
                <span className="text-2xl font-bold text-neon-green">4</span>
              </div>
              <h4 className="font-semibold">Alerts</h4>
              <p className="text-sm text-muted-foreground">Real-time notifications to protect health</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;