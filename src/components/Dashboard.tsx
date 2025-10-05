import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp, Wind, Eye, MapPin, Satellite } from "lucide-react";
import AQIGauge from "./AQIGauge";
import AQIChart from "./AQIChart";
import dashboardBg from "@/assets/dashboard-bg.jpg";
import { getComprehensiveAirQualityData, getComprehensiveAirQualityDataSync, TEMPOData, OpenAQData, WeatherData } from "@/services/nasaData";

interface DashboardProps {
  location?: string;
  coordinates?: { lat: number; lng: number };
}

interface ComprehensiveData {
  satellite: TEMPOData | null;
  groundStations: OpenAQData[];
  weather: WeatherData | null;
  combinedAQI: number;
  healthRecommendations: string[];
  dataSourceAttribution: any;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  location = "Kochi, Kerala",
  coordinates = { lat: 9.9312, lng: 76.2673 }
}) => {
  const [data, setData] = useState<ComprehensiveData | null>(null);
  const [loading, setLoading] = useState(true);

  // Location-based AQI calculation for Kerala cities (same logic as NASADashboard)
  const getLocationAQI = (locationName: string): number => {
    const locationAQI: { [key: string]: number } = {
      "Kochi": 85,
      "Thiruvananthapuram": 75,
      "Kozhikode": 70,
      "Thrissur": 80,
      "Palakkad": 65,
      "Alappuzha": 78,
      "Kannur": 72,
      "Kollam": 73,
      "Kottayam": 68,
      "Malappuram": 76,
      "Kerala": 75 // Default for Kerala
    };

    // Check if location contains any Kerala city name
    for (const city in locationAQI) {
      if (locationName.toLowerCase().includes(city.toLowerCase())) {
        return locationAQI[city];
      }
    }
    
    // Default for Kerala region
    return locationAQI["Kerala"];
  };

  const consistentAQI = getLocationAQI(location);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Use NASA data service (same as NASADashboard)
      const comprehensiveData = await getComprehensiveAirQualityData(
        coordinates.lat,
        coordinates.lng
      );
      setData(comprehensiveData);
    } catch (error) {
      console.error('Failed to fetch NASA data, falling back to mock data:', error);
      // Fallback to synchronous mock data
      const fallbackData = getComprehensiveAirQualityDataSync(
        coordinates.lat,
        coordinates.lng
      );
      setData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [coordinates.lat, coordinates.lng]);

  if (loading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${dashboardBg})` }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Satellite className="w-12 h-12 text-neon-cyan mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-bold mb-2">Loading NASA Data</h3>
              <p className="text-muted-foreground">Fetching real-time air quality data...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
            Live monitoring and AI-powered predictions powered by NASA TEMPO satellite data
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
            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="text-2xl">Current AQI</CardTitle>
                <Badge variant="secondary" className="w-fit">
                  {(data?.combinedAQI || consistentAQI) <= 100 ? 'Moderate' : 'Unhealthy'}
                </Badge>
              </CardHeader>
              <CardContent className="p-8">
                <AQIGauge value={data?.combinedAQI || consistentAQI} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2 grid md:grid-cols-2 gap-6"
          >
            {/* PM2.5 */}
            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-neon-cyan" />
                  PM2.5
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neon-cyan mb-2">
                  {data?.groundStations?.[0]?.measurements?.find(m => m.parameter === 'pm25')?.value?.toFixed(1) || '32'} μg/m³
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {(data?.groundStations?.[0]?.measurements?.find(m => m.parameter === 'pm25')?.value || 32) < 35 ? 'Good levels' : 'Moderate levels'}
                </p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-neon-cyan h-2 rounded-full" 
                    style={{ width: `${Math.min((data?.groundStations?.[0]?.measurements?.find(m => m.parameter === 'pm25')?.value || 32) / 50 * 100, 100)}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            {/* PM10 */}
            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-neon-blue" />
                  PM10
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neon-blue mb-2">
                  {data?.groundStations?.[0]?.measurements?.find(m => m.parameter === 'pm10')?.value?.toFixed(1) || '58'} μg/m³
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {(data?.groundStations?.[0]?.measurements?.find(m => m.parameter === 'pm10')?.value || 58) < 50 ? 'Within limits' : 'Elevated levels'}
                </p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-neon-blue h-2 rounded-full" 
                    style={{ width: `${Math.min((data?.groundStations?.[0]?.measurements?.find(m => m.parameter === 'pm10')?.value || 58) / 100 * 100, 100)}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            {/* Wind Speed */}
            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-neon-green" />
                  Wind Speed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neon-green mb-2">
                  {data?.weather?.windSpeed?.toFixed(1) || '12'} km/h
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {data?.weather?.windDirection || 'Southwest'}
                </p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-neon-green h-2 rounded-full" 
                    style={{ width: `${Math.min((data?.weather?.windSpeed || 12) / 40 * 100, 100)}%` }}
                  ></div>
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
                <div className="text-2xl font-bold text-neon-violet mb-2">
                  {data?.weather?.visibility?.toFixed(1) || '8.5'} km
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {(data?.weather?.visibility || 8.5) > 10 ? 'Clear' : 'Moderate haze'}
                </p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-neon-violet h-2 rounded-full" 
                    style={{ width: `${Math.min((data?.weather?.visibility || 8.5) / 15 * 100, 100)}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Health Guidance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="glass-card hover-glow">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
                NASA Health Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {data?.healthRecommendations?.map((recommendation, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>{recommendation}</span>
                  </div>
                )) || (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Good air quality for outdoor activities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span>Sensitive individuals may want to limit prolonged outdoor exertion</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

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
              <CardTitle className="text-2xl">7-Day AQI Trend (NASA TEMPO Data)</CardTitle>
            </CardHeader>
            <CardContent className="p-8 min-h-[500px]">
              <AQIChart />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;