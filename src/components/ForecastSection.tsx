import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, TrendingUp, AlertTriangle, Wind, Sun } from "lucide-react";

interface ForecastData {
  day: string;
  date: string;
  aqi: number;
  status: string;
  color: string;
  textColor: string;
  weather: string;
  wind: string;
  alert?: string;
}

interface ForecastSectionProps {
  location: string;
}

const ForecastSection = ({ location }: ForecastSectionProps) => {
  // Generate location-specific forecast data
  const generateForecastData = (location: string): ForecastData[] => {
    const today = new Date();
    const baseAQI = location.toLowerCase().includes('kochi') ? 85 : 
                   location.toLowerCase().includes('thiruvananthapuram') ? 75 :
                   location.toLowerCase().includes('palakkad') ? 65 :
                   location.toLowerCase().includes('kozhikode') ? 80 : 70;
    
    return [
      {
        day: "Tomorrow",
        date: new Date(today.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        aqi: baseAQI + Math.floor(Math.random() * 20 - 10),
        status: baseAQI < 50 ? "Good" : baseAQI < 100 ? "Moderate" : "Unhealthy for Sensitive",
        color: baseAQI < 50 ? "bg-green-500" : baseAQI < 100 ? "bg-yellow-500" : "bg-orange-500",
        textColor: baseAQI < 50 ? "text-green-500" : baseAQI < 100 ? "text-yellow-500" : "text-orange-500",
        weather: "Partly cloudy, 29°C",
        wind: "8 km/h SW",
        alert: baseAQI > 80 ? "Sensitive individuals should limit outdoor activities" : "Good conditions for outdoor activities"
      },
      {
        day: "Day 2", 
        date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        aqi: baseAQI + Math.floor(Math.random() * 30 - 15),
        status: (baseAQI + 10) < 50 ? "Good" : (baseAQI + 10) < 100 ? "Moderate" : "Unhealthy for Sensitive",
        color: (baseAQI + 10) < 50 ? "bg-green-500" : (baseAQI + 10) < 100 ? "bg-yellow-500" : "bg-orange-500",
        textColor: (baseAQI + 10) < 50 ? "text-green-500" : (baseAQI + 10) < 100 ? "text-yellow-500" : "text-orange-500",
        weather: "Sunny, 31°C",
        wind: "12 km/h W",
        alert: "Conditions may vary due to local weather patterns"
      },
      {
        day: "Day 3",
        date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        aqi: Math.max(40, baseAQI - Math.floor(Math.random() * 20)),
        status: (baseAQI - 10) < 50 ? "Good" : (baseAQI - 10) < 100 ? "Moderate" : "Unhealthy for Sensitive",
        color: (baseAQI - 10) < 50 ? "bg-green-500" : (baseAQI - 10) < 100 ? "bg-yellow-500" : "bg-orange-500",
        textColor: (baseAQI - 10) < 50 ? "text-green-500" : (baseAQI - 10) < 100 ? "text-yellow-500" : "text-orange-500",
        weather: "Cloudy, 27°C",
        wind: "15 km/h NW",
        alert: "Improving air quality expected due to wind patterns"
      }
    ];
  };

  const forecastData = generateForecastData(location);

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
          3-Day <span className="gradient-text">Forecast</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          AI-powered predictions for {location}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {forecastData.map((forecast, index) => (
          <motion.div
            key={forecast.day}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card hover-glow h-full">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-neon-cyan" />
                  <span className="text-sm text-muted-foreground">{forecast.date}</span>
                </div>
                <CardTitle className="text-xl">{forecast.day}</CardTitle>
                <Badge className={`${forecast.color} text-background`}>
                  {forecast.status}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* AQI Value */}
                <div className="text-center">
                  <div className={`text-4xl font-bold ${forecast.textColor}`}>
                    {forecast.aqi}
                  </div>
                  <p className="text-sm text-muted-foreground">AQI</p>
                </div>

                {/* Weather Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">{forecast.weather}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-neon-green" />
                    <span className="text-sm">{forecast.wind}</span>
                  </div>
                </div>

                {/* Alert */}
                {forecast.alert && (
                  <Alert className="border-orange-500/20 bg-orange-500/5">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <AlertDescription className="text-xs">
                      {forecast.alert}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Trend Indicator */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  <TrendingUp className={`w-4 h-4 ${index === 2 ? 'text-neon-green rotate-180' : 'text-red-500'}`} />
                  <span className="text-xs text-muted-foreground">
                    {index === 2 ? 'Improving' : 'Worsening'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ForecastSection;