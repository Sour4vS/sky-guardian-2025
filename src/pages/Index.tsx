import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import LocationSearch from "@/components/LocationSearch";
import Dashboard from "@/components/Dashboard";
import ForecastSection from "@/components/ForecastSection";
import HealthGuidance from "@/components/HealthGuidance";
import AboutSection from "@/components/AboutSection";
import ImpactSection from "@/components/ImpactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState("Kochi, Kerala");
  const currentAQI = 142; // This would come from API

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    // Here you would typically fetch new AQI data for the selected location
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
      
      <Dashboard location={selectedLocation} />
      <ForecastSection location={selectedLocation} />
      <HealthGuidance currentAQI={currentAQI} location={selectedLocation} />
      <AboutSection />
      <ImpactSection />
      <Footer />
    </div>
  );
};

export default Index;
