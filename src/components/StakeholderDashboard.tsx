import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  School, 
  Building2, 
  AlertTriangle, 
  Truck, 
  Users, 
  Activity,
  Wind,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  ExternalLink
} from "lucide-react";
import AQIGauge from "./AQIGauge";

interface StakeholderDashboardProps {
  location?: string;
  currentAQI?: number;
}

const StakeholderDashboard = ({ 
  location = "Current Location", 
  currentAQI = 75 
}: StakeholderDashboardProps) => {
  const [activeTab, setActiveTab] = useState("schools");

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return { status: "Good", color: "bg-green-500", recommendation: "Normal activities" };
    if (aqi <= 100) return { status: "Moderate", color: "bg-yellow-500", recommendation: "Sensitive groups take caution" };
    if (aqi <= 150) return { status: "Unhealthy for Sensitive", color: "bg-orange-500", recommendation: "Limit outdoor activities" };
    if (aqi <= 200) return { status: "Unhealthy", color: "bg-red-500", recommendation: "Avoid outdoor activities" };
    return { status: "Very Unhealthy", color: "bg-purple-600", recommendation: "Emergency protocols" };
  };

  const aqiStatus = getAQIStatus(currentAQI);

  const schoolRecommendations = [
    { activity: "Outdoor PE Classes", status: currentAQI > 100 ? "cancelled" : "modified", reason: "High AQI levels" },
    { activity: "Recess Activities", status: currentAQI > 150 ? "indoor-only" : "normal", reason: "Air quality concerns" },
    { activity: "Athletic Practices", status: currentAQI > 100 ? "postponed" : "normal", reason: "Protect student athletes" },
    { activity: "Field Trips", status: currentAQI > 150 ? "cancelled" : "proceed", reason: "Outdoor exposure risk" },
  ];

  const healthcareMetrics = [
    { metric: "Expected Respiratory Admissions", value: currentAQI > 100 ? "+35%" : "+8%", trend: "up", color: currentAQI > 100 ? "text-red-400" : "text-yellow-400" },
    { metric: "Asthma-related Visits", value: currentAQI > 100 ? "+28%" : "+5%", trend: "up", color: currentAQI > 100 ? "text-orange-400" : "text-yellow-400" },
    { metric: "COPD Exacerbations", value: currentAQI > 100 ? "+42%" : "+10%", trend: "up", color: currentAQI > 100 ? "text-red-400" : "text-orange-400" },
    { metric: "Cardiac Events", value: currentAQI > 100 ? "+15%" : "+3%", trend: currentAQI > 80 ? "up" : "stable", color: currentAQI > 100 ? "text-yellow-400" : "text-green-400" },
  ];

  const emergencyProtocols = [
    { protocol: "Air Quality Emergency Plan", status: currentAQI > 150 ? "activated" : "standby" },
    { protocol: "Vulnerable Population Alerts", status: currentAQI > 100 ? "active" : "normal" },
    { protocol: "Public Advisory System", status: currentAQI > 100 ? "broadcasting" : "normal" },
    { protocol: "Emergency Shelter Preparation", status: currentAQI > 200 ? "initiated" : "standby" },
  ];

  const transportationImpacts = [
    { system: "Public Transit", impact: currentAQI > 100 ? "Reduced ridership expected" : "Normal operations", recommendation: currentAQI > 100 ? "Increase ventilation" : "Regular maintenance" },
    { system: "School Buses", impact: currentAQI > 100 ? "Health concerns for students" : "Standard precautions", recommendation: currentAQI > 100 ? "Air filtration systems" : "Monitor air quality" },
    { system: "Cargo Operations", impact: currentAQI > 100 ? "Worker safety protocols" : "Normal operations", recommendation: currentAQI > 100 ? "Limit outdoor exposure" : "Standard safety measures" },
    { system: "Airport Operations", impact: currentAQI > 100 ? "Visibility concerns" : "Normal visibility", recommendation: currentAQI > 100 ? "Monitor conditions" : "Routine operations" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stakeholder-Specific{" "}
            <span className="gradient-text">Air Quality Intelligence</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Tailored insights for schools, healthcare facilities, emergency services, and transportation networks
          </p>
        </motion.div>

        {/* Current Conditions Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="glass-card border-neon-blue/30">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-neon-cyan" />
                    <span className="text-lg font-medium">{location}</span>
                  </div>
                  <AQIGauge value={currentAQI} size={80} />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center gap-4">
                    <Badge className={`${aqiStatus.color} text-background text-lg px-4 py-2`}>
                      {aqiStatus.status}
                    </Badge>
                    <div className="text-2xl font-bold">{currentAQI} AQI</div>
                  </div>
                  <p className="text-lg text-muted-foreground">{aqiStatus.recommendation}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Updated 15 min ago</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>Trend: Increasing</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-3xl mx-auto mb-8 bg-background/50">
            <TabsTrigger value="schools" className="flex items-center gap-2">
              <School className="w-4 h-4" />
              Schools
            </TabsTrigger>
            <TabsTrigger value="healthcare" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Healthcare
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Emergency
            </TabsTrigger>
            <TabsTrigger value="transportation" className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Transport
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schools" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <School className="w-5 h-5 text-neon-blue" />
                    School Activity Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {schoolRecommendations.map((rec, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div>
                          <div className="font-medium">{rec.activity}</div>
                          <div className="text-sm text-muted-foreground">{rec.reason}</div>
                        </div>
                        <Badge 
                          className={
                            rec.status === 'cancelled' || rec.status === 'postponed' 
                              ? 'bg-red-500 text-white' 
                              : rec.status === 'modified' || rec.status === 'indoor-only'
                              ? 'bg-yellow-500 text-black'
                              : 'bg-green-500 text-white'
                          }
                        >
                          {rec.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-neon-green" />
                    Student Health Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <h4 className="font-medium text-orange-300 mb-2">High Priority Actions</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Close windows and use air filtration</li>
                      <li>• Monitor students with asthma closely</li>
                      <li>• Have rescue inhalers readily available</li>
                      <li>• Consider early dismissal if conditions worsen</li>
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-neon-cyan">24</div>
                      <div className="text-sm text-muted-foreground">Students at risk</div>
                    </div>
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-neon-orange">8</div>
                      <div className="text-sm text-muted-foreground">Nurse visits today</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle>Communication Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-medium">Parent Alert</div>
                      <div className="text-sm text-muted-foreground">Air quality notification</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-medium">Staff Memo</div>
                      <div className="text-sm text-muted-foreground">Activity modifications</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto p-4">
                    <div className="text-left">
                      <div className="font-medium">District Report</div>
                      <div className="text-sm text-muted-foreground">Daily summary</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="healthcare" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-neon-red" />
                    Expected Health Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {healthcareMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div className="font-medium">{metric.metric}</div>
                        <div className={`text-lg font-bold ${metric.color}`}>
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-neon-blue" />
                    Facility Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h4 className="font-medium text-blue-300 mb-2">Recommended Actions</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Activate enhanced air filtration systems</li>
                      <li>• Increase respiratory medication inventory</li>
                      <li>• Alert staff to expect increased admissions</li>
                      <li>• Prepare additional oxygen supplies</li>
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-neon-green">94%</div>
                      <div className="text-sm text-muted-foreground">Filter efficiency</div>
                    </div>
                    <div className="p-3 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-neon-orange">+15</div>
                      <div className="text-sm text-muted-foreground">Extra beds ready</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-neon-yellow" />
                    Emergency Protocols Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emergencyProtocols.map((protocol, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div className="font-medium">{protocol.protocol}</div>
                        <Badge 
                          className={
                            protocol.status === 'activated' || protocol.status === 'active' || protocol.status === 'broadcasting' 
                              ? 'bg-red-500 text-white' 
                              : protocol.status === 'initiated'
                              ? 'bg-orange-500 text-white'
                              : 'bg-green-500 text-white'
                          }
                        >
                          {protocol.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-neon-violet" />
                    Vulnerable Population Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="text-3xl font-bold text-red-300 mb-2">1,247</div>
                      <div className="text-sm text-muted-foreground">High-risk individuals</div>
                    </div>
                    <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                      <div className="text-3xl font-bold text-orange-300 mb-2">89%</div>
                      <div className="text-sm text-muted-foreground">Successfully contacted</div>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Launch Emergency Communication System
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transportation" className="space-y-6">
            <Card className="glass-card hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-neon-cyan" />
                  Transportation System Impact Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transportationImpacts.map((impact, index) => (
                    <div key={index} className="p-4 bg-muted/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{impact.system}</div>
                        <Wind className="w-4 h-4 text-neon-cyan" />
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">{impact.impact}</div>
                      <div className="text-sm text-neon-blue font-medium">
                        Recommendation: {impact.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default StakeholderDashboard;
