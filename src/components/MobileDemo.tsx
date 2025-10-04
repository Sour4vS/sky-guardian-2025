import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Satellite, 
  Activity, 
  Bell, 
  MapPin,
  Zap,
  TrendingUp,
  Users
} from "lucide-react";

const MobileDemo = () => {
  const [currentView, setCurrentView] = useState("dashboard");

  const mobileViews = {
    dashboard: {
      title: "NASA Air Quality Intelligence",
      icon: Satellite,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-red-400 mb-2">142</div>
            <Badge className="bg-orange-500 text-white mb-2">Unhealthy for Sensitive Groups</Badge>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>New York, NY</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/20 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-red-400">25.3</div>
              <div className="text-xs text-muted-foreground">NO₂ (ppb)</div>
            </div>
            <div className="bg-muted/20 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-blue-400">65.8</div>
              <div className="text-xs text-muted-foreground">O₃ (DU)</div>
            </div>
            <div className="bg-muted/20 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-orange-400">2.1</div>
              <div className="text-xs text-muted-foreground">HCHO (ppb)</div>
            </div>
            <div className="bg-muted/20 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-purple-400">0.3</div>
              <div className="text-xs text-muted-foreground">Aerosol Index</div>
            </div>
          </div>
          
          <div className="text-xs text-center text-muted-foreground">
            📡 Live from NASA TEMPO satellite
          </div>
        </div>
      )
    },
    alerts: {
      title: "Health Alerts",
      icon: Bell,
      content: (
        <div className="space-y-3">
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium">Active Alert</span>
            </div>
            <p className="text-sm">Air quality unhealthy for sensitive groups. Limit outdoor activities.</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Avoid outdoor exercise</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Use air purifiers indoors</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Wear N95 masks outside</span>
            </div>
          </div>
        </div>
      )
    },
    forecast: {
      title: "24hr Forecast",
      icon: TrendingUp,
      content: (
        <div className="space-y-3">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-red-400 mb-1">156</div>
            <div className="text-sm text-muted-foreground">Tomorrow's AQI</div>
            <Badge className="bg-red-500 text-white text-xs">Unhealthy</Badge>
          </div>
          
          <div className="space-y-2">
            {[
              { time: "6 AM", aqi: 135, status: "Moderate" },
              { time: "12 PM", aqi: 156, status: "Unhealthy" },
              { time: "6 PM", aqi: 142, status: "Unhealthy" },
              { time: "12 AM", aqi: 128, status: "Moderate" }
            ].map((forecast, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span>{forecast.time}</span>
                <span className="font-medium">{forecast.aqi}</span>
                <Badge variant="outline" className="text-xs">{forecast.status}</Badge>
              </div>
            ))}
          </div>
          
          <div className="text-xs text-center text-muted-foreground mt-3">
            🤖 AI-powered predictions using NASA weather data
          </div>
        </div>
      )
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <Card className="glass-card border-neon-blue/30 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              <CardTitle className="text-lg">Sky Guardian Mobile</CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs">Live</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Navigation Tabs */}
          <div className="flex border-b border-muted">
            {Object.entries(mobileViews).map(([key, view]) => {
              const Icon = view.icon;
              return (
                <button
                  key={key}
                  onClick={() => setCurrentView(key)}
                  className={`flex-1 p-3 text-sm font-medium transition-colors ${
                    currentView === key 
                      ? 'bg-blue-500/10 text-blue-400 border-b-2 border-blue-400'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4 mx-auto mb-1" />
                  <div className="text-xs">{view.title.split(' ')[0]}</div>
                </button>
              );
            })}
          </div>
          
          {/* Content */}
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4"
          >
            {mobileViews[currentView].content}
          </motion.div>
          
          {/* Footer */}
          <div className="bg-muted/20 p-3 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Satellite className="w-3 h-3" />
              <span>Powered by NASA TEMPO</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileDemo;
