import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';

const RotatingEarth = () => {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#00ccff"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0}
        metalness={0.8}
      />
    </Sphere>
  );
};

const SpaceGlobe = () => {
  return (
    <motion.div
      className="w-full h-64 md:h-96"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ccff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8a2be2" />
        <Stars 
          radius={300} 
          depth={60} 
          count={1000} 
          factor={7} 
          saturation={0} 
          fade 
        />
        <RotatingEarth />
      </Canvas>
    </motion.div>
  );
};

export default SpaceGlobe;