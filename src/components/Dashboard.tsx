import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Wind, Eye, MapPin } from "lucide-react";
import AQIGauge from "./AQIGauge";
import AQIChart from "./AQIChart";
import dashboardBg from "@/assets/dashboard-bg.jpg";

const Dashboard = () => {
  const currentAQI = 142;
  const location = "Kochi, Kerala";
  
  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { status: "Good", color: "bg-neon-green", textColor: "text-neon-green" };
    if (aqi <= 100) return { status: "Moderate", color: "bg-yellow-500", textColor: "text-yellow-500" };
    if (aqi <= 150) return { status: "Unhealthy for Sensitive Groups", color: "bg-orange-500", textColor: "text-orange-500" };
    if (aqi <= 200) return { status: "Unhealthy", color: "bg-red-500", textColor: "text-red-500" };
    return { status: "Very Unhealthy", color: "bg-purple-600", textColor: "text-purple-400" };
  };

  const aqiStatus = getAQIStatus(currentAQI);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${dashboardBg})` }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real-Time Air Quality{" "}
            <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Live monitoring and AI-powered predictions for your location
          </p>
        </motion.div>

        {/* Location Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <MapPin className="w-5 h-5 text-neon-cyan" />
          <span className="text-lg font-medium">{location}</span>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current AQI */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Card className="glass-card hover-glow h-full">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-4">Current AQI</CardTitle>
                <Badge className={`${aqiStatus.color} text-background mb-4`}>
                  {aqiStatus.status}
                </Badge>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <AQIGauge value={currentAQI} />
                <div className="mt-6 text-center">
                  <div className={`text-4xl font-bold ${aqiStatus.textColor} mb-2`}>
                    {currentAQI}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Air Quality Index
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Prediction Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2 grid md:grid-cols-2 gap-6"
          >
            {/* Tomorrow's Forecast */}
            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-neon-blue" />
                  Tomorrow's Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-500 mb-2">156</div>
                <Badge className="bg-orange-500 text-background mb-3">
                  Unhealthy
                </Badge>
                <p className="text-sm text-muted-foreground">
                  AQI expected to worsen. Consider limiting outdoor activities.
                </p>
              </CardContent>
            </Card>

            {/* Health Advisory */}
            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  Health Advisory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Sensitive groups should avoid outdoor exercise</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span>Use air purifiers indoors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                    <span>Wear N95 masks when outside</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Wind Conditions */}
            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-neon-green" />
                  Wind Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neon-green mb-2">12 km/h</div>
                <p className="text-sm text-muted-foreground mb-2">Southwest</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-neon-green h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </CardContent>
            </Card>

            {/* Visibility */}
            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-neon-violet" />
                  Visibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neon-violet mb-2">8.5 km</div>
                <p className="text-sm text-muted-foreground mb-2">Moderate haze</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-neon-violet h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* AQI Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="glass-card hover-glow">
            <CardHeader>
              <CardTitle className="text-2xl">7-Day AQI Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <AQIChart />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;