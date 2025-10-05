import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import LocationSearch from "@/components/LocationSearch";
import Dashboard from "@/components/Dashboard";
import NASADashboard from "@/components/NASADashboard";
import StakeholderDashboard from "@/components/StakeholderDashboard";
import HealthAlertSystem from "@/components/HealthAlertSystem";
import ForecastSection from "@/components/ForecastSection";
import HealthGuidance from "@/components/HealthGuidance";
import AboutSection from "@/components/AboutSection";
import ImpactSection from "@/components/ImpactSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { GlobeButton } from "@/components/InteractiveGlobe";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState("Kochi, Kerala");
  const [coordinates, setCoordinates] = useState({ lat: 9.9312, lng: 76.2673 });
  
  // Generate location-specific AQI
  const getCurrentAQI = (location: string): number => {
    if (location.toLowerCase().includes('kochi')) return 85;
    if (location.toLowerCase().includes('thiruvananthapuram')) return 75;
    if (location.toLowerCase().includes('palakkad')) return 65;
    if (location.toLowerCase().includes('kozhikode')) return 80;
    if (location.toLowerCase().includes('thrissur')) return 70;
    if (location.toLowerCase().includes('kollam')) return 78;
    if (location.toLowerCase().includes('kannur')) return 68;
    return 72; // Default for other Kerala locations
  };

  const currentAQI = getCurrentAQI(selectedLocation);

  // Kerala mock locations
  const keralaLocations = [
    { city: 'Thiruvananthapuram', lat: 8.5241, lng: 76.9366 },
    { city: 'Kollam', lat: 8.8932, lng: 76.6141 },
    { city: 'Pathanamthitta', lat: 9.2646, lng: 76.7874 },
    { city: 'Alappuzha', lat: 9.4981, lng: 76.3388 },
    { city: 'Kottayam', lat: 9.5916, lng: 76.5222 },
    { city: 'Idukki', lat: 9.849, lng: 77.0995 },
    { city: 'Ernakulam', lat: 9.9816, lng: 76.2999 },
    { city: 'Kochi, Kerala', lat: 9.9312, lng: 76.2673 },
    { city: 'Thrissur', lat: 10.5276, lng: 76.2144 },
    { city: 'Palakkad', lat: 10.7867, lng: 76.6548 },
    { city: 'Malappuram', lat: 11.0734, lng: 76.0884 },
    { city: 'Kozhikode', lat: 11.2588, lng: 75.7804 },
    { city: 'Wayanad', lat: 11.6854, lng: 76.1311 },
    { city: 'Kannur', lat: 11.8745, lng: 75.3704 },
    { city: 'Kasaragod', lat: 12.499, lng: 74.9901 },
  ];

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    // Try to match Kerala location
    const keralaMatch = keralaLocations.find(l => l.city.toLowerCase() === location.toLowerCase());
    if (keralaMatch) {
      setCoordinates({ lat: keralaMatch.lat, lng: keralaMatch.lng });
      return;
    }
    // Fallback to demo world cities
    const locationCoords: { [key: string]: { lat: number; lng: number } } = {
      "New York, NY": { lat: 40.7128, lng: -74.0060 },
      "Los Angeles, CA": { lat: 34.0522, lng: -118.2437 },
      "London, UK": { lat: 51.5074, lng: -0.1278 },
      "Tokyo, Japan": { lat: 35.6762, lng: 139.6503 },
      "Sydney, Australia": { lat: -33.8688, lng: 151.2093 }
    };
    if (locationCoords[location]) {
      setCoordinates(locationCoords[location]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      

      <div id="location-search-section" className="container mx-auto px-6">
        <LocationSearch 
          onLocationSelect={handleLocationSelect}
          currentLocation={selectedLocation}
        />
      </div>

      {/* NASA-Powered Dashboard */}
      <div id="dashboard-section">
        <NASADashboard location={selectedLocation} coordinates={coordinates} />
      </div>
      
      {/* Health Alert System */}
      <section className="py-20 bg-gradient-to-b from-background to-gray-900">
        <div className="container mx-auto px-6">
          <HealthAlertSystem currentAQI={currentAQI} location={selectedLocation} />
        </div>
      </section>
      
      {/* Stakeholder-Specific Dashboard */}
      <StakeholderDashboard location={selectedLocation} currentAQI={currentAQI} />
      
      {/* Original Dashboard for comparison */}
      <Dashboard location={selectedLocation} coordinates={coordinates} />
      
      <ForecastSection location={selectedLocation} />
      <HealthGuidance currentAQI={currentAQI} location={selectedLocation} />
      <AboutSection />
      <ImpactSection />
      <Footer />
      
      {/* Floating Chatbot */}
      <ChatBot />
      
      {/* Floating Globe Button */}
      <GlobeButton />
    </div>
  );
};

export default Index;
