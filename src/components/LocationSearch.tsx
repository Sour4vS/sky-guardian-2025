import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LocationSearchProps {
  onLocationSelect: (location: string) => void;
  currentLocation: string;
}

const LocationSearch = ({ onLocationSelect, currentLocation }: LocationSearchProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchValue.trim()) return;
    
    setIsSearching(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    onLocationSelect(searchValue.trim());
    setSearchValue("");
    setIsSearching(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <Card className="glass-card hover-glow">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-neon-cyan" />
            <span className="text-sm text-muted-foreground">Current location: {currentLocation}</span>
          </div>
          
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter city name (e.g., Delhi, Mumbai, Bangalore)"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 bg-background/50 border-border/50 focus:border-neon-cyan/50 focus:ring-neon-cyan/20"
                disabled={isSearching}
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isSearching || !searchValue.trim()}
              className="bg-gradient-to-r from-neon-cyan to-neon-blue hover:from-neon-cyan/80 hover:to-neon-blue/80 transition-all duration-300"
            >
              {isSearching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Search"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LocationSearch;