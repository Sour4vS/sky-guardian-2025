import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  AlertTriangle, 
  Bell, 
  Shield, 
  Heart, 
  Users, 
  School, 
  Building2, 
  Truck,
  X,
  Check,
  Settings,
  Volume2,
  VolumeX
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AlertPreferences {
  enabled: boolean;
  userGroup: 'general' | 'sensitive' | 'elderly' | 'children' | 'athletes';
  thresholds: {
    moderate: boolean;
    unhealthy: boolean;
    veryUnhealthy: boolean;
  };
  notifications: {
    browser: boolean;
    sound: boolean;
    email: boolean;
  };
  organizationType?: 'school' | 'healthcare' | 'emergency' | 'transportation' | 'recreation';
}

interface HealthAlert {
  id: string;
  severity: 'info' | 'warning' | 'danger' | 'critical';
  title: string;
  message: string;
  recommendations: string[];
  targetGroups: string[];
  timestamp: Date;
  dismissed: boolean;
  aqi: number;
}

const defaultPreferences: AlertPreferences = {
  enabled: true,
  userGroup: 'general',
  thresholds: {
    moderate: false,
    unhealthy: true,
    veryUnhealthy: true,
  },
  notifications: {
    browser: true,
    sound: false,
    email: false,
  }
};

const userGroups = [
  { id: 'general', label: 'General Public', icon: Users, description: 'Standard health alerts' },
  { id: 'sensitive', label: 'Sensitive Groups', icon: Heart, description: 'Lower thresholds for respiratory/heart conditions' },
  { id: 'elderly', label: 'Elderly (65+)', icon: Shield, description: 'Enhanced protection for seniors' },
  { id: 'children', label: 'Children', icon: School, description: 'Alerts for schools and parents' },
  { id: 'athletes', label: 'Athletes/Active', icon: Users, description: 'Outdoor activity focused alerts' },
];

const organizationTypes = [
  { id: 'school', label: 'School District', icon: School, description: 'Student safety and outdoor activities' },
  { id: 'healthcare', label: 'Healthcare Facility', icon: Building2, description: 'Patient care and facility management' },
  { id: 'emergency', label: 'Emergency Services', icon: AlertTriangle, description: 'First responders and crisis management' },
  { id: 'transportation', label: 'Transportation', icon: Truck, description: 'Transit systems and logistics' },
  { id: 'recreation', label: 'Parks & Recreation', icon: Users, description: 'Outdoor events and facilities' },
];

const HealthAlertSystem = ({ currentAQI = 142, location = "Current Location" }) => {
  const [preferences, setPreferences] = useState<AlertPreferences>(defaultPreferences);
  const [alerts, setAlerts] = useState<HealthAlert[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  // Generate alerts based on current conditions and preferences
  useEffect(() => {
    generateAlerts();
  }, [currentAQI, preferences]);

  const generateAlerts = () => {
    const newAlerts: HealthAlert[] = [];
    
    // Determine alert level based on AQI and user preferences
    if (currentAQI > 150 && preferences.thresholds.veryUnhealthy) {
      newAlerts.push({
        id: `unhealthy-${Date.now()}`,
        severity: 'danger',
        title: 'Unhealthy Air Quality Alert',
        message: `Air quality has reached unhealthy levels (AQI: ${currentAQI}) in ${location}`,
        recommendations: getRecommendationsForGroup(preferences.userGroup, 'unhealthy'),
        targetGroups: [preferences.userGroup],
        timestamp: new Date(),
        dismissed: false,
        aqi: currentAQI
      });
    } else if (currentAQI > 100 && preferences.thresholds.unhealthy) {
      newAlerts.push({
        id: `moderate-unhealthy-${Date.now()}`,
        severity: 'warning',
        title: 'Unhealthy for Sensitive Groups',
        message: `Air quality may affect sensitive individuals (AQI: ${currentAQI}) in ${location}`,
        recommendations: getRecommendationsForGroup(preferences.userGroup, 'moderate-unhealthy'),
        targetGroups: [preferences.userGroup],
        timestamp: new Date(),
        dismissed: false,
        aqi: currentAQI
      });
    } else if (currentAQI > 50 && preferences.thresholds.moderate && preferences.userGroup === 'sensitive') {
      newAlerts.push({
        id: `moderate-${Date.now()}`,
        severity: 'info',
        title: 'Moderate Air Quality',
        message: `Air quality is moderate (AQI: ${currentAQI}) - sensitive individuals should take precautions`,
        recommendations: getRecommendationsForGroup(preferences.userGroup, 'moderate'),
        targetGroups: [preferences.userGroup],
        timestamp: new Date(),
        dismissed: false,
        aqi: currentAQI
      });
    }

    // Organization-specific alerts
    if (preferences.organizationType) {
      newAlerts.push(...generateOrganizationAlerts());
    }

    setAlerts(prev => [...newAlerts, ...prev.filter(alert => !alert.dismissed)]);

    // Trigger notifications
    if (newAlerts.length > 0 && preferences.notifications.browser) {
      requestNotificationPermission();
      newAlerts.forEach(alert => {
        if (preferences.notifications.browser) {
          showBrowserNotification(alert);
        }
        if (preferences.notifications.sound) {
          playNotificationSound();
        }
      });
    }
  };

  const getRecommendationsForGroup = (group: string, level: string): string[] => {
    const baseRecommendations = {
      'moderate': [
        'Consider reducing prolonged outdoor activities if you experience symptoms',
        'People with respiratory or heart disease should limit outdoor exertion',
      ],
      'moderate-unhealthy': [
        'Limit prolonged outdoor activities',
        'People with respiratory or heart disease should avoid outdoor exertion',
        'Everyone should reduce prolonged outdoor activities',
      ],
      'unhealthy': [
        'Avoid all outdoor activities',
        'Keep windows and doors closed',
        'Use air purifiers if available',
        'Wear N95 masks when going outside',
      ]
    };

    const groupSpecific = {
      'sensitive': [
        'Monitor symptoms closely',
        'Have rescue medications readily available',
        'Consider staying indoors completely',
      ],
      'elderly': [
        'Avoid all outdoor activities',
        'Monitor for breathing difficulties',
        'Contact healthcare provider if symptoms worsen',
      ],
      'children': [
        'Cancel outdoor school activities',
        'Keep children indoors during recess',
        'Watch for breathing difficulties or coughing',
      ],
      'athletes': [
        'Cancel outdoor training sessions',
        'Move activities indoors if possible',
        'Postpone competitions and events',
      ]
    };

    return [...(baseRecommendations[level] || []), ...(groupSpecific[group] || [])];
  };

  const generateOrganizationAlerts = (): HealthAlert[] => {
    const orgAlerts: HealthAlert[] = [];
    
    if (preferences.organizationType === 'school' && currentAQI > 100) {
      orgAlerts.push({
        id: `school-${Date.now()}`,
        severity: 'warning',
        title: 'School Activity Alert',
        message: 'Outdoor school activities should be modified or cancelled',
        recommendations: [
          'Cancel outdoor PE classes and sports practices',
          'Move recess activities indoors',
          'Notify parents of air quality conditions',
          'Monitor students for respiratory symptoms',
        ],
        targetGroups: ['school'],
        timestamp: new Date(),
        dismissed: false,
        aqi: currentAQI
      });
    }

    if (preferences.organizationType === 'healthcare' && currentAQI > 150) {
      orgAlerts.push({
        id: `healthcare-${Date.now()}`,
        severity: 'danger',
        title: 'Healthcare Facility Alert',
        message: 'Prepare for increased respiratory-related admissions',
        recommendations: [
          'Increase staffing for respiratory care units',
          'Ensure adequate supply of inhalers and oxygen',
          'Advise patients to avoid unnecessary outdoor exposure',
          'Activate air filtration systems',
        ],
        targetGroups: ['healthcare'],
        timestamp: new Date(),
        dismissed: false,
        aqi: currentAQI
      });
    }

    return orgAlerts;
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  };

  const showBrowserNotification = (alert: HealthAlert) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(alert.title, {
        body: alert.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      });
    }
  };

  const playNotificationSound = () => {
    // Create a simple notification sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, dismissed: true } : alert
    ));
  };

  const updatePreferences = (updates: Partial<AlertPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
    toast({
      title: "Preferences Updated",
      description: "Your alert preferences have been saved.",
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'border-blue-500 bg-blue-500/10 text-blue-300';
      case 'warning': return 'border-yellow-500 bg-yellow-500/10 text-yellow-300';
      case 'danger': return 'border-red-500 bg-red-500/10 text-red-300';
      case 'critical': return 'border-purple-500 bg-purple-500/10 text-purple-300';
      default: return 'border-gray-500 bg-gray-500/10 text-gray-300';
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.dismissed);

  return (
    <div className="space-y-6">
      {/* Alert Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-neon-cyan" />
          <h3 className="text-2xl font-bold">Health Alert System</h3>
          {activeAlerts.length > 0 && (
            <Badge className="bg-red-500 text-white">
              {activeAlerts.length} Active
            </Badge>
          )}
        </div>
        <Button
          onClick={() => setShowSettings(!showSettings)}
          variant="outline"
          size="sm"
          className="border-neon-blue/50 text-neon-blue hover:bg-neon-blue/20"
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="glass-card border-neon-blue/30">
              <CardHeader>
                <CardTitle className="text-lg">Alert Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="organization">Organization</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-4 block">Health Profile</Label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {userGroups.map((group) => {
                          const Icon = group.icon;
                          return (
                            <div
                              key={group.id}
                              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                preferences.userGroup === group.id
                                  ? 'border-neon-cyan bg-neon-cyan/10'
                                  : 'border-muted hover:border-neon-cyan/50'
                              }`}
                              onClick={() => updatePreferences({ userGroup: group.id as any })}
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <Icon className="w-5 h-5 text-neon-cyan" />
                                <span className="font-medium">{group.label}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{group.description}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-medium mb-4 block">Alert Thresholds</Label>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="moderate">Moderate (AQI 51-100)</Label>
                            <p className="text-sm text-muted-foreground">For sensitive groups only</p>
                          </div>
                          <Switch
                            id="moderate"
                            checked={preferences.thresholds.moderate}
                            onCheckedChange={(checked) => 
                              updatePreferences({ 
                                thresholds: { ...preferences.thresholds, moderate: checked }
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="unhealthy">Unhealthy (AQI 101-150)</Label>
                            <p className="text-sm text-muted-foreground">Recommended for everyone</p>
                          </div>
                          <Switch
                            id="unhealthy"
                            checked={preferences.thresholds.unhealthy}
                            onCheckedChange={(checked) => 
                              updatePreferences({ 
                                thresholds: { ...preferences.thresholds, unhealthy: checked }
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="veryUnhealthy">Very Unhealthy (AQI 151+)</Label>
                            <p className="text-sm text-muted-foreground">Critical health warnings</p>
                          </div>
                          <Switch
                            id="veryUnhealthy"
                            checked={preferences.thresholds.veryUnhealthy}
                            onCheckedChange={(checked) => 
                              updatePreferences({ 
                                thresholds: { ...preferences.thresholds, veryUnhealthy: checked }
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="organization" className="space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-4 block">Organization Type</Label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {organizationTypes.map((org) => {
                          const Icon = org.icon;
                          return (
                            <div
                              key={org.id}
                              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                preferences.organizationType === org.id
                                  ? 'border-neon-cyan bg-neon-cyan/10'
                                  : 'border-muted hover:border-neon-cyan/50'
                              }`}
                              onClick={() => updatePreferences({ organizationType: org.id as any })}
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <Icon className="w-5 h-5 text-neon-cyan" />
                                <span className="font-medium">{org.label}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{org.description}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="notifications" className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-neon-blue" />
                          <div>
                            <Label htmlFor="browser">Browser Notifications</Label>
                            <p className="text-sm text-muted-foreground">Push notifications in your browser</p>
                          </div>
                        </div>
                        <Switch
                          id="browser"
                          checked={preferences.notifications.browser}
                          onCheckedChange={(checked) => 
                            updatePreferences({ 
                              notifications: { ...preferences.notifications, browser: checked }
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {preferences.notifications.sound ? 
                            <Volume2 className="w-5 h-5 text-neon-green" /> : 
                            <VolumeX className="w-5 h-5 text-muted-foreground" />
                          }
                          <div>
                            <Label htmlFor="sound">Sound Alerts</Label>
                            <p className="text-sm text-muted-foreground">Audio notification sounds</p>
                          </div>
                        </div>
                        <Switch
                          id="sound"
                          checked={preferences.notifications.sound}
                          onCheckedChange={(checked) => 
                            updatePreferences({ 
                              notifications: { ...preferences.notifications, sound: checked }
                            })
                          }
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Alerts */}
      <div className="space-y-4">
        <AnimatePresence>
          {activeAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className={`relative p-6 rounded-lg border-2 ${getSeverityColor(alert.severity)}`}
            >
              <Button
                onClick={() => dismissAlert(alert.id)}
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>

              <div className="flex items-start gap-4 mb-4">
                <AlertTriangle className="w-6 h-6 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-2">{alert.title}</h4>
                  <p className="text-sm opacity-90 mb-4">{alert.message}</p>
                  
                  <div className="space-y-2">
                    <h5 className="font-medium text-sm">Recommended Actions:</h5>
                    <ul className="space-y-1">
                      {alert.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="w-3 h-3 mt-0.5 text-neon-green flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4 text-xs opacity-75">
                    {alert.timestamp.toLocaleString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {activeAlerts.length === 0 && (
          <Card className="glass-card">
            <CardContent className="text-center py-12">
              <Shield className="w-16 h-16 text-neon-green mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-neon-green">All Clear!</h3>
              <p className="text-muted-foreground">
                No active health alerts for your area. Air quality is within acceptable ranges.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HealthAlertSystem;
