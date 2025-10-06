import { useRef, useState, useCallback } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, OrbitControls, Stars, Html } from '@react-three/drei';
import { TextureLoader } from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Globe } from 'lucide-react';
import { Button } from './ui/button';

// Sample data for different countries
const countryData = [
  { name: "United States", position: [-95.7129, 37.0902], aqi: 85, co2: 16.1, temp: 12.8 },
  { name: "China", position: [104.1954, 35.8617], aqi: 152, co2: 7.4, temp: 9.8 },
  { name: "India", position: [78.9629, 20.5937], aqi: 168, co2: 1.9, temp: 24.2 },
  { name: "Brazil", position: [-51.9253, -14.2350], aqi: 45, co2: 2.3, temp: 25.1 },
  { name: "Germany", position: [10.4515, 51.1657], aqi: 42, co2: 8.8, temp: 9.3 },
  { name: "Japan", position: [138.2529, 36.2048], aqi: 35, co2: 9.2, temp: 15.7 },
  { name: "Australia", position: [133.7751, -25.2744], aqi: 28, co2: 15.3, temp: 21.8 },
  { name: "Russia", position: [105.3188, 61.5240], aqi: 58, co2: 11.4, temp: -5.2 },
];

const DataMarker = ({ position, data, onHover }: any) => {
  const meshRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered ? 0.15 : 0.1);
    }
  });

  // Convert lat/lng to 3D position on sphere
  const lat = (position[1] * Math.PI) / 180;
  const lng = (position[0] * Math.PI) / 180;
  const radius = 2.02;
  
  const x = radius * Math.cos(lat) * Math.cos(lng);
  const y = radius * Math.sin(lat);
  const z = radius * Math.cos(lat) * Math.sin(lng);

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return '#00ff00';
    if (aqi <= 100) return '#ffff00';
    if (aqi <= 150) return '#ff8000';
    return '#ff0000';
  };

  return (
    <mesh
      ref={meshRef}
      position={[x, y, z]}
      onPointerEnter={() => {
        setHovered(true);
        onHover(data);
      }}
      onPointerLeave={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial 
        color={getAQIColor(data.aqi)} 
        transparent 
        opacity={0.9}
      />
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-black/90 text-white p-3 rounded-lg border border-neon-cyan/50 min-w-48 pointer-events-none">
            <h3 className="font-semibold text-neon-cyan mb-2">{data.name}</h3>
            <div className="space-y-1 text-sm">
              <div>AQI: <span className="text-neon-blue font-medium">{data.aqi}</span></div>
              <div>CO₂: <span className="text-neon-green font-medium">{data.co2} ppm</span></div>
              <div>Temp: <span className="text-neon-violet font-medium">{data.temp}°C</span></div>
            </div>
          </div>
        </Html>
      )}
    </mesh>
  );
};

// Always use Blue Marble as fallback if GIBS layer fails
const fallbackUrl = 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/BlueMarble_ShadedRelief_Bathymetry/default/2023-10-04/250m/2/1/1.png';
const Earth = ({ hoveredData }: { hoveredData: any }) => {
  const meshRef = useRef<any>(null);
  let gibsUrl = import.meta.env.VITE_GIBS_API_URL;
  if (!gibsUrl || gibsUrl.includes('[') || gibsUrl.includes(']')) {
    gibsUrl = fallbackUrl;
  } else {
    gibsUrl = gibsUrl.replace('{Time}', '2023-10-04').replace('{TileMatrix}', '2').replace('{TileRow}', '1').replace('{TileCol}', '1');
  }
  const [useFallback, setUseFallback] = useState(false);
  const [gibsError, setGibsError] = useState(false);
  // Try to load the main GIBS layer, fallback to Blue Marble if it fails
  const mainTexture = useLoader(TextureLoader, gibsUrl, undefined, (err) => {
    setUseFallback(true);
    setGibsError(true);
    // eslint-disable-next-line no-console
    console.error('Failed to load NASA GIBS imagery:', err);
  });
  const fallbackTexture = useLoader(TextureLoader, fallbackUrl);

  useFrame(() => {
    if (meshRef.current && !hoveredData) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        {/* Satellite imagery as texture if available, fallback to Blue Marble */}
        {(!useFallback && mainTexture) ? (
          <meshPhongMaterial
            map={Array.isArray(mainTexture) ? mainTexture[0] : mainTexture}
            emissive="#1e40af"
            emissiveIntensity={0.1}
            shininess={100}
            transparent
            opacity={0.95}
          />
        ) : (
          <meshPhongMaterial
            map={Array.isArray(fallbackTexture) ? fallbackTexture[0] : fallbackTexture}
            emissive="#1e40af"
            emissiveIntensity={0.1}
            shininess={100}
            transparent
            opacity={0.95}
          />
        )}
      </Sphere>
      {/* Atmosphere glow */}
      <Sphere args={[2.05, 64, 64]}>
        <meshBasicMaterial
          color="#00ccff"
          transparent
          opacity={0.1}
          side={2}
        />
      </Sphere>
      {gibsError && (
        <Html center>
          <div className="bg-black/80 text-red-400 p-4 rounded-lg border border-red-500/50">
            Failed to load NASA satellite imagery. Showing fallback.
          </div>
        </Html>
      )}
    </group>
  );
};

const GlobeScene = ({ onReset }: { onReset: () => void }) => {
  const [hoveredData, setHoveredData] = useState<any>(null);
  const controlsRef = useRef<any>(null);

  const handleReset = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    onReset();
  }, [onReset]);

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-950 to-black">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ccff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8a2be2" />
        
        <Stars 
          radius={300} 
          depth={60} 
          count={2000} 
          factor={4} 
          saturation={0} 
          fade 
        />
        
        <Earth hoveredData={hoveredData} />
        
        {countryData.map((country, index) => (
          <DataMarker
            key={index}
            position={country.position}
            data={country}
            onHover={setHoveredData}
          />
        ))}
        
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
          autoRotate={!hoveredData}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Reset button */}
      <Button
        onClick={handleReset}
        className="absolute bottom-6 right-6 bg-black/50 border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/20 hover:scale-110 transition-all duration-300"
        size="lg"
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        Reset View
      </Button>
      
      {/* Instructions */}
      <div className="absolute top-6 left-6 bg-black/70 border border-neon-blue/50 rounded-lg p-4 text-white max-w-sm">
        <h3 className="text-neon-blue font-semibold mb-2">Interactive Controls</h3>
        <div className="space-y-1 text-sm">
          <div>🖱️ <span className="text-neon-cyan">Drag to rotate</span></div>
          <div>🔍 <span className="text-neon-green">Scroll to zoom</span></div>
          <div>📍 <span className="text-neon-violet">Hover markers for data</span></div>
        </div>
      </div>
    </div>
  );
};

interface InteractiveGlobeProps {
  isOpen: boolean;
  onClose: () => void;
}

const InteractiveGlobe = ({ isOpen, onClose }: InteractiveGlobeProps) => {
  const handleReset = useCallback(() => {
    // Reset functionality handled in GlobeScene
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black"
        >
          <Button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 bg-black/50 border border-red-500/50 text-red-400 hover:bg-red-500/20 hover:scale-110 transition-all duration-300"
            size="lg"
          >
            <X className="w-5 h-5" />
          </Button>
          
          <GlobeScene onReset={handleReset} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Floating Globe Button Component
export const GlobeButton = () => {
  const [isGlobeOpen, setIsGlobeOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsGlobeOpen(true)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-gradient-to-r from-neon-blue to-neon-cyan rounded-full shadow-glow-cyan hover:shadow-glow-strong transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Globe className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue to-neon-cyan opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
      </motion.button>

      <InteractiveGlobe isOpen={isGlobeOpen} onClose={() => setIsGlobeOpen(false)} />
    </>
  );
};

export default InteractiveGlobe;