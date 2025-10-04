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
  const currentAQI = 142; // This would come from API

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    
    // Update coordinates based on location (simplified mapping)
    const locationCoords: { [key: string]: { lat: number; lng: number } } = {
      "Kochi, Kerala": { lat: 9.9312, lng: 76.2673 },
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
      
      <div className="container mx-auto px-6">
        <LocationSearch 
          onLocationSelect={handleLocationSelect}
          currentLocation={selectedLocation}
        />
      </div>
      
      {/* NASA-Powered Dashboard */}
      <NASADashboard location={selectedLocation} coordinates={coordinates} />
      
      {/* Health Alert System */}
      <section className="py-20 bg-gradient-to-b from-background to-gray-900">
        <div className="container mx-auto px-6">
          <HealthAlertSystem currentAQI={currentAQI} location={selectedLocation} />
        </div>
      </section>
      
      {/* Stakeholder-Specific Dashboard */}
      <StakeholderDashboard location={selectedLocation} currentAQI={currentAQI} />
      
      {/* Original Dashboard for comparison */}
      <Dashboard location={selectedLocation} />
      
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
