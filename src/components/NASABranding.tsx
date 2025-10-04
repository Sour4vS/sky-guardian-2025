import { motion } from "framer-motion";
import { Satellite, CheckCircle, ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const NASABadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="flex flex-col gap-2">
        {/* NASA Powered Badge */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3 shadow-lg border border-blue-400/30">
          <div className="flex items-center gap-2 text-white">
            <Satellite className="w-5 h-5" />
            <div className="text-sm font-bold">NASA POWERED</div>
          </div>
          <div className="text-xs text-blue-100 mt-1">
            Real TEMPO satellite data
          </div>
        </div>

        {/* Competition Badge */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-3 shadow-lg border border-green-400/30">
          <div className="flex items-center gap-2 text-white">
            <CheckCircle className="w-5 h-5" />
            <div className="text-sm font-bold">SPACE APPS 2025</div>
          </div>
          <div className="text-xs text-green-100 mt-1">
            Challenge Entry
          </div>
        </div>

        {/* Data Sources Indicator */}
        <div className="bg-black/80 rounded-lg p-2 text-xs text-white">
          <div className="flex items-center gap-1 mb-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live NASA TEMPO</span>
          </div>
          <div className="flex items-center gap-1 mb-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>168 Ground Stations</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>Weather Integration</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const NASADataSourceFooter = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-blue-900 border-t border-blue-500/20 py-6">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Satellite className="w-5 h-5 text-blue-400" />
            Powered by NASA Earth Science Data
          </h4>
          
          <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-300">
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span>NASA TEMPO Satellite</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span>Pandora Ground Network</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span>MERRA-2 Weather Data</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              <span>OpenAQ Validation</span>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-400">
            <p>
              Data provided by NASA Earth Science Division, Pandonia Global Network, and OpenAQ. 
              Developed for NASA Space Apps Challenge 2025.
            </p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <Button variant="link" size="sm" className="text-blue-400 hover:text-blue-300">
                <ExternalLink className="w-3 h-3 mr-1" />
                NASA TEMPO Mission
              </Button>
              <Button variant="link" size="sm" className="text-blue-400 hover:text-blue-300">
                <ExternalLink className="w-3 h-3 mr-1" />
                Space Apps Challenge
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { NASABadge, NASADataSourceFooter };
