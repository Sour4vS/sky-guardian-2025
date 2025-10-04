import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Leaf, Building, Users } from "lucide-react";

const ImpactSection = () => {
  const impacts = [
    {
      icon: Heart,
      title: "Health Benefits",
      stat: "85%",
      description: "Reduction in pollution-related health risks with early warnings",
      color: "text-red-400"
    },
    {
      icon: Leaf,
      title: "Climate Impact",
      stat: "2.3M",
      description: "Tons of CO2 equivalent prevented through informed decisions",
      color: "text-neon-green"
    },
    {
      icon: Building,
      title: "Smarter Cities",
      stat: "150+",
      description: "Cities using our data for environmental policy planning",
      color: "text-neon-blue"
    },
    {
      icon: Users,
      title: "Public Awareness",
      stat: "1M+",
      description: "People receive daily air quality alerts and recommendations",
      color: "text-neon-violet"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Why Clean Air Matters</h3>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 glass-card p-6 rounded-xl"
            >
              <div className="w-12 h-12 rounded-full bg-neon-cyan/20 border-2 border-neon-cyan flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-neon-cyan" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Immediate Health Protection</h4>
                <p className="text-muted-foreground">Air quality forecasts help people plan activities, especially those with respiratory conditions, protecting millions from harmful exposure.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 glass-card p-6 rounded-xl"
            >
              <div className="w-12 h-12 rounded-full bg-neon-green/20 border-2 border-neon-green flex items-center justify-center flex-shrink-0">
                <Leaf className="w-6 h-6 text-neon-green" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Environmental Awareness</h4>
                <p className="text-muted-foreground">Real-time data creates awareness about pollution sources, driving behavioral changes and supporting environmental policies.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 glass-card p-6 rounded-xl"
            >
              <div className="w-12 h-12 rounded-full bg-neon-violet/20 border-2 border-neon-violet flex items-center justify-center flex-shrink-0">
                <Building className="w-6 h-6 text-neon-violet" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Smart City Planning</h4>
                <p className="text-muted-foreground">Cities use our predictions for traffic management, industrial planning, and emergency response protocols.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;