import HeroSection from "@/components/HeroSection";
import Dashboard from "@/components/Dashboard";
import AboutSection from "@/components/AboutSection";
import ImpactSection from "@/components/ImpactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <Dashboard />
      <AboutSection />
      <ImpactSection />
      <Footer />
    </div>
  );
};

export default Index;
