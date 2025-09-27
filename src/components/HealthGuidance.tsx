import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Baby, 
  Heart, 
  Dumbbell, 
  Users, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  XCircle 
} from "lucide-react";

interface HealthGuidanceProps {
  currentAQI: number;
  location: string;
}

const HealthGuidance = ({ currentAQI, location }: HealthGuidanceProps) => {
  const getHealthAdvice = (aqi: number) => {
    if (aqi <= 50) {
      return {
        level: "Good",
        color: "bg-neon-green",
        textColor: "text-neon-green",
        icon: CheckCircle,
        general: "Air quality is satisfactory for all outdoor activities.",
        children: "Perfect for outdoor play and sports activities.",
        elderly: "No restrictions on outdoor activities.",
        athletes: "Excellent conditions for training and competition.",
        recommendations: [
          "Enjoy outdoor activities",
          "Windows can be opened for fresh air",
          "Perfect time for jogging or cycling"
        ]
      };
    } else if (aqi <= 100) {
      return {
        level: "Moderate",
        color: "bg-yellow-500",
        textColor: "text-yellow-500",
        icon: AlertTriangle,
        general: "Air quality is acceptable for most people.",
        children: "Generally safe, but very sensitive children should limit prolonged outdoor exertion.",
        elderly: "Consider reducing prolonged outdoor activities if experiencing symptoms.",
        athletes: "Monitor your breathing during intense training sessions.",
        recommendations: [
          "Consider air purifiers indoors",
          "Limit outdoor activities during peak hours",
          "Stay hydrated during outdoor activities"
        ]
      };
    } else if (aqi <= 150) {
      return {
        level: "Unhealthy for Sensitive Groups",
        color: "bg-orange-500",
        textColor: "text-orange-500",
        icon: AlertTriangle,
        general: "Sensitive groups should reduce outdoor activities.",
        children: "Limit outdoor activities, especially sports and running.",
        elderly: "Reduce outdoor activities and stay indoors when possible.",
        athletes: "Consider moving training sessions indoors or to early morning.",
        recommendations: [
          "Use N95 masks when going outside",
          "Keep windows closed",
          "Use air purifiers indoors"
        ]
      };
    } else {
      return {
        level: "Unhealthy",
        color: "bg-red-500",
        textColor: "text-red-500",
        icon: XCircle,
        general: "Everyone should avoid outdoor activities.",
        children: "Keep indoors. Cancel outdoor school activities.",
        elderly: "Stay indoors and avoid all outdoor activities.",
        athletes: "Move all training sessions indoors or postpone.",
        recommendations: [
          "Wear N95 masks if you must go outside",
          "Keep all windows and doors closed",
          "Use air purifiers and avoid outdoor exercise"
        ]
      };
    }
  };

  const advice = getHealthAdvice(currentAQI);
  const Icon = advice.icon;

  const healthGroups = [
    {
      title: "Children & Teens",
      icon: Baby,
      advice: advice.children,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Elderly (65+)",
      icon: Heart,
      advice: advice.elderly,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      title: "Athletes & Active",
      icon: Dumbbell,
      advice: advice.athletes,
      color: "text-neon-green",
      bgColor: "bg-neon-green/10",
      borderColor: "border-neon-green/20"
    },
    {
      title: "General Public",
      icon: Users,
      advice: advice.general,
      color: "text-neon-cyan",
      bgColor: "bg-neon-cyan/10",
      borderColor: "border-neon-cyan/20"
    }
  ];

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Health <span className="gradient-text">Guidance</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Personalized advice based on current AQI in {location}
        </p>
      </motion.div>

      {/* Current Health Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <Alert className={`${advice.color}/20 border-2`}>
          <Icon className={`w-5 h-5 ${advice.textColor}`} />
          <AlertDescription className="text-base font-medium">
            Current Air Quality: <Badge className={`${advice.color} text-background ml-2`}>
              {advice.level}
            </Badge>
          </AlertDescription>
        </Alert>
      </motion.div>

      {/* Health Groups */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {healthGroups.map((group, index) => {
          const GroupIcon = group.icon;
          return (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`glass-card hover-glow h-full ${group.borderColor} border`}>
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 rounded-full ${group.bgColor} flex items-center justify-center mx-auto mb-2`}>
                    <GroupIcon className={`w-6 h-6 ${group.color}`} />
                  </div>
                  <CardTitle className="text-lg">{group.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    {group.advice}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Card className="glass-card hover-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-neon-violet" />
              Recommended Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {advice.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-violet"></div>
                  <span className="text-sm">{recommendation}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default HealthGuidance;