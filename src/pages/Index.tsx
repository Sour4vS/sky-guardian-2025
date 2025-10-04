import { useState, useEffect } from "react";
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
  const [selectedLocation, setSelectedLocation] = useState("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [geoPrompted, setGeoPrompted] = useState(false);
  const currentAQI = 0; // Will be set from API
  // On first load, prompt for geolocation
  useEffect(() => {
    if (!geoPrompted && !selectedLocation && !coordinates) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            setCoordinates({ lat: latitude, lng: longitude });
            setSelectedLocation("Your Location");
            setGeoPrompted(true);
          },
          (err) => {
            setGeoPrompted(true); // User denied or error
          }
        );
      } else {
        setGeoPrompted(true);
      }
    }
  }, [geoPrompted, selectedLocation, coordinates]);

  const handleLocationSelect = (location: string, coords?: { lat: number; lng: number }) => {
    setSelectedLocation(location);
    if (coords) {
      setCoordinates(coords);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <div className="container mx-auto px-6">
        {/* Always show location search */}
        <LocationSearch 
          onLocationSelect={handleLocationSelect}
          currentLocation={selectedLocation}
        />
      </div>
      
      {/* NASA-Powered Dashboard */}
      {selectedLocation || coordinates ? (
        <NASADashboard location={selectedLocation} coordinates={coordinates} />
      ) : (
        <div className="text-center text-muted-foreground py-8">Please allow location access or enter your city to see NASA-powered data.</div>
      )}

      {/* Health Alert System */}
      <section className="py-20 bg-gradient-to-b from-background to-gray-900">
        <div className="container mx-auto px-6">
          {selectedLocation || coordinates ? (
            <HealthAlertSystem currentAQI={currentAQI} location={selectedLocation} />
          ) : (
            <div className="text-center text-muted-foreground py-4">Enter your location to see health alerts.</div>
          )}
        </div>
      </section>

      {/* Stakeholder-Specific Dashboard */}
      {selectedLocation || coordinates ? (
        <StakeholderDashboard location={selectedLocation} currentAQI={currentAQI} />
      ) : null}

      {/* Original Dashboard for comparison */}
      {selectedLocation || coordinates ? (
        <Dashboard location={selectedLocation} />
      ) : null}

      {selectedLocation || coordinates ? (
        <ForecastSection location={selectedLocation} />
      ) : null}
      {selectedLocation || coordinates ? (
        <HealthGuidance currentAQI={currentAQI} location={selectedLocation} />
      ) : null}
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
