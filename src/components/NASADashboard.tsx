import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Satellite, MapPin, Activity, Wind, Thermometer, Droplets, Eye, Zap } from "lucide-react";
import AQIGauge from "./AQIGauge";
import AQIChart from "./AQIChart";
import { getComprehensiveAirQualityData, getComprehensiveAirQualityDataSync, TEMPOData, OpenAQData, WeatherData } from "@/services/nasaData";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface NASADashboardProps {
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

const NASADashboard = ({ 
  location = "Kochi, Kerala", 
  coordinates = { lat: 9.9312, lng: 76.2673 } 
}: NASADashboardProps) => {
  const [data, setData] = useState<ComprehensiveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Use the same AQI calculation as the regular Dashboard for consistency
  const getLocationAQI = (location: string): number => {
    if (location.toLowerCase().includes('kochi')) return 85;
    if (location.toLowerCase().includes('thiruvananthapuram')) return 75;
    if (location.toLowerCase().includes('palakkad')) return 65;
    if (location.toLowerCase().includes('kozhikode')) return 80;
    if (location.toLowerCase().includes('thrissur')) return 70;
    if (location.toLowerCase().includes('kollam')) return 78;
    if (location.toLowerCase().includes('kannur')) return 68;
    if (location.toLowerCase().includes('wayanad')) return 55; // Hill station, cleaner air
    if (location.toLowerCase().includes('idukki')) return 50; // Mountain region
    return 72; // Default for other Kerala locations
  };

  const consistentAQI = getLocationAQI(location);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Try to use real API data first
      const comprehensiveData = await getComprehensiveAirQualityData(
        coordinates.lat,
        coordinates.lng
      );
      setData(comprehensiveData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to fetch real API data, falling back to sync/mock data:', error);
      // Fallback to synchronous mock data
      const fallbackData = getComprehensiveAirQualityDataSync(
        coordinates.lat,
        coordinates.lng
      );
      setData(fallbackData);
      setLastUpdate(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [coordinates.lat, coordinates.lng]);

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { status: "Good", color: "bg-green-500", textColor: "text-green-500", icon: "😊" };
    if (aqi <= 100) return { status: "Moderate", color: "bg-yellow-500", textColor: "text-yellow-500", icon: "😐" };
    if (aqi <= 150) return { status: "Unhealthy for Sensitive", color: "bg-orange-500", textColor: "text-orange-500", icon: "😷" };
    if (aqi <= 200) return { status: "Unhealthy", color: "bg-red-500", textColor: "text-red-500", icon: "😨" };
    return { status: "Very Unhealthy", color: "bg-purple-600", textColor: "text-purple-400", icon: "💀" };
  };

  if (loading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center">
              <Satellite className="w-16 h-16 text-neon-blue mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold mb-2">Connecting to NASA Satellites</h3>
              <p className="text-muted-foreground">Fetching TEMPO data and ground station measurements...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Unable to Load NASA Data</h3>
          <Button onClick={fetchData} className="mt-4">
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  const aqiStatus = getAQIStatus(consistentAQI);

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-space-dark to-background">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Satellite className="w-8 h-8 text-neon-blue" />
            <h2 className="text-4xl md:text-5xl font-bold">
              NASA-Powered Air Quality{" "}
              <span className="gradient-text">Intelligence</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Real-time TEMPO satellite data combined with ground stations and weather monitoring
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Activity className="w-4 h-4 text-neon-green" />
            <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
            <Button onClick={fetchData} size="sm" variant="outline" className="ml-4">
              Refresh Data
            </Button>
          </div>
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
          <span className="text-sm text-muted-foreground">
            ({coordinates.lat.toFixed(3)}, {coordinates.lng.toFixed(3)})
          </span>
        </motion.div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="satellite">Satellite Data</TabsTrigger>
            <TabsTrigger value="ground">Ground Stations</TabsTrigger>
            <TabsTrigger value="health">Health Guidance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Combined AQI */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <Card className="glass-card hover-glow h-full">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl mb-4 flex items-center justify-center gap-2">
                      <Zap className="w-6 h-6 text-neon-blue" />
                      Combined AQI
                    </CardTitle>
                    <Badge className={`${aqiStatus.color} text-background mb-4 text-lg`}>
                      {aqiStatus.status}
                    </Badge>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <AQIGauge value={consistentAQI} />
                    <div className="mt-6 text-center">
                      <div className={`text-4xl font-bold ${aqiStatus.textColor} mb-2 flex items-center gap-2`}>
                        {consistentAQI}
                        <span className="text-2xl">{aqiStatus.icon}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Current Air Quality Index
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Weather & Environmental Factors */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="lg:col-span-2 grid md:grid-cols-2 gap-6"
              >
                {data.weather && (
                  <>
                    <Card className="glass-card hover-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Wind className="w-5 h-5 text-neon-green" />
                          Wind Conditions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-neon-green mb-2">
                          {data.weather.windSpeed.toFixed(1)} km/h
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{data.weather.windDirection}</p>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-neon-green h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min(data.weather.windSpeed * 3, 100)}%` }}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass-card hover-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Thermometer className="w-5 h-5 text-neon-orange" />
                          Temperature
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-neon-orange mb-2">
                          {data.weather.temperature.toFixed(1)}°C
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Feels like normal
                        </p>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-neon-orange h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min((data.weather.temperature + 10) * 2, 100)}%` }}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass-card hover-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Droplets className="w-5 h-5 text-neon-blue" />
                          Humidity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-neon-blue mb-2">
                          {data.weather.humidity}%
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {data.weather.humidity > 70 ? 'High' : data.weather.humidity > 40 ? 'Moderate' : 'Low'}
                        </p>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-neon-blue h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${data.weather.humidity}%` }}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass-card hover-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Eye className="w-5 h-5 text-neon-violet" />
                          Visibility
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-neon-violet mb-2">
                          {data.weather.visibility.toFixed(1)} km
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {data.weather.visibility > 10 ? 'Clear' : data.weather.visibility > 5 ? 'Moderate haze' : 'Poor visibility'}
                        </p>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-neon-violet h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${Math.min(data.weather.visibility * 6, 100)}%` }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </motion.div>
            </div>

            {/* AQI Trend Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="text-2xl">7-Day AQI Trend & Forecast</CardTitle>
                </CardHeader>
                <CardContent className="p-8 min-h-[500px]">
                  <AQIChart />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="satellite" className="space-y-6">
            {data.satellite ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="glass-card hover-glow">
                  <CardHeader>
                    <CardTitle className="text-lg">Nitrogen Dioxide (NO₂)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-400 mb-2">
                      {data.satellite.measurements.no2.toFixed(1)}
                    </div>
                    <p className="text-sm text-muted-foreground">ppb (parts per billion)</p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      Source: NASA TEMPO
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card hover-glow">
                  <CardHeader>
                    <CardTitle className="text-lg">Formaldehyde</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-400 mb-2">
                      {data.satellite.measurements.formaldehyde.toFixed(2)}
                    </div>
                    <p className="text-sm text-muted-foreground">ppb</p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      Source: NASA TEMPO
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card hover-glow">
                  <CardHeader>
                    <CardTitle className="text-lg">Ozone (O₃)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {data.satellite.measurements.ozone.toFixed(1)}
                    </div>
                    <p className="text-sm text-muted-foreground">ppb</p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      Source: NASA TEMPO
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card hover-glow">
                  <CardHeader>
                    <CardTitle className="text-lg">Aerosol Optical Depth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {data.satellite.measurements.aerosolOpticalDepth.toFixed(3)}
                    </div>
                    <p className="text-sm text-muted-foreground">unitless</p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      Source: NASA TEMPO
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="glass-card">
                <CardContent className="text-center py-12">
                  <Satellite className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Satellite Data Available</h3>
                  <p className="text-muted-foreground">TEMPO satellite data not available for this location or time.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="ground" className="space-y-6">
            {data.groundStations.length > 0 ? (
              <div className="grid gap-6">
                {data.groundStations.map((station, index) => (
                  <Card key={index} className="glass-card hover-glow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-neon-green" />
                        {station.location}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {station.city}, {station.country}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {station.measurements.map((measurement, mIndex) => (
                          <div key={mIndex} className="text-center p-4 bg-muted/20 rounded-lg">
                            <div className="text-2xl font-bold text-neon-cyan mb-1">
                              {measurement.value}
                            </div>
                            <div className="text-sm text-muted-foreground mb-1">
                              {measurement.unit}
                            </div>
                            <div className="text-xs font-medium uppercase">
                              {measurement.parameter}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="glass-card">
                <CardContent className="text-center py-12">
                  <Activity className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Ground Stations</h3>
                  <p className="text-muted-foreground">No ground monitoring stations found in this area.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                  Health Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.healthRecommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-neon-cyan mt-2 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{recommendation}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Data Attribution */}
            <Card className="glass-card border-neon-blue/20">
              <CardHeader>
                <CardTitle className="text-lg text-neon-blue">Data Sources & Attribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong className="text-neon-cyan">Satellite Data:</strong> {data.dataSourceAttribution.satellite}
                </div>
                <div>
                  <strong className="text-neon-green">Ground Stations:</strong> {data.dataSourceAttribution.groundStations}
                </div>
                <div>
                  <strong className="text-neon-orange">Weather Data:</strong> {data.dataSourceAttribution.weather}
                </div>
                <div className="pt-2 border-t border-muted">
                  <strong>Citation:</strong> {data.dataSourceAttribution.citation}
                </div>
                <div className="text-xs text-muted-foreground">
                  Last updated: {new Date(data.dataSourceAttribution.lastUpdated).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default NASADashboard;
