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
  const forecastData: ForecastData[] = [
    {
      day: "Tomorrow",
      date: "Oct 28",
      aqi: 156,
      status: "Unhealthy",
      color: "bg-red-500",
      textColor: "text-red-500",
      weather: "Sunny, 28°C",
      wind: "12 km/h SW",
      alert: "Limit outdoor activities, especially for sensitive groups"
    },
    {
      day: "Day 2",
      date: "Oct 29",
      aqi: 178,
      status: "Unhealthy",
      color: "bg-red-600",
      textColor: "text-red-400",
      weather: "Partly cloudy, 26°C",
      wind: "8 km/h W",
      alert: "Air quality is expected to worsen. Avoid outdoor exercise."
    },
    {
      day: "Day 3",
      date: "Oct 30",
      aqi: 134,
      status: "Unhealthy for Sensitive",
      color: "bg-orange-500",
      textColor: "text-orange-500",
      weather: "Overcast, 24°C",
      wind: "15 km/h NW",
      alert: "Improving conditions expected due to wind patterns"
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