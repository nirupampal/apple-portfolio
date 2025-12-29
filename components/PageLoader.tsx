"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Icosahedron, Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

// --- Custom Hook to detect system theme ---
function useSystemTheme() {
  // Default to dark if server-side or unavailble
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handler = () => setIsDark(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isDark;
}

// --- 3D Particle Field ---
function Particles({ isDark }) {
  const ref = useRef();
  // Generate random points on a sphere
  const sphere = useMemo(() => {
    const text = new Float32Array(1500 * 3); // 1500 points
    for (let i = 0; i < 1500; i++) {
        const i3 = i * 3;
        // Random position within a sphere radius of 4
        const r = 4 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        text[i3] = r * Math.sin(phi) * Math.cos(theta);
        text[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        text[i3 + 2] = r * Math.cos(phi);
    }
    return text;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
            transparent
            color={isDark ? "#8b5cf6" : "#3b82f6"} // Purple dark, Blue light
            size={0.02}
            sizeAttenuation={true}
            depthWrite={false}
        />
    </Points>
  );
}

// --- The Main 3D "Mind Fuck" Object ---
function QuantumEngine({ isDark }) {
  const groupRef = useRef();
  const outerRef = useRef();
  const middleRef = useRef();
  const innerRef = useRef();
  const coreRef = useRef();

  // Define colors based on theme
  const colors = useMemo(() => ({
    outer: isDark ? "#4f46e5" : "#0ea5e9",    // Indigo / Sky Blue
    middle: isDark ? "#a855f7" : "#6366f1",   // Purple / Indigo
    inner: isDark ? "#ec4899" : "#8b5cf6",    // Pink / Purple
    core: isDark ? "#ffffff" : "#000000",     // White / Black
    emissiveIntensity: isDark ? 2 : 1.2
  }), [isDark]);


  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Complex, counter-rotating movements
    groupRef.current.rotation.y = t * 0.2;
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.2;

    // Outer shell tumbles slowly
    outerRef.current.rotation.x = t * 0.4;
    outerRef.current.rotation.y = t * 0.3;
    
    // Middle shell rotates faster opposite direction
    middleRef.current.rotation.x = -t * 0.8;
    middleRef.current.rotation.z = -t * 0.5;

    // Inner shell spins fast on different axis
    innerRef.current.rotation.y = t * 1.2;
    innerRef.current.rotation.x = Math.sin(t) * 0.5;

    // Core pulses and wobbles
    const pulse = 1 + Math.sin(t * 3) * 0.1;
    coreRef.current.scale.set(pulse, pulse, pulse);
    coreRef.current.position.y = Math.sin(t * 2) * 0.1;
  });

  // Shared material props for the wireframe look
  const wireframeMaterial = {
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      toneMapped: false, // Crucial for bloom effect to work properly
  };

  return (
    <group ref={groupRef}>
      {/* Outer Hull */}
      <Icosahedron ref={outerRef} args={[2, 1]}>
        <meshStandardMaterial 
            {...wireframeMaterial} 
            color={colors.outer} 
            emissive={colors.outer}
            emissiveIntensity={colors.emissiveIntensity}
        />
      </Icosahedron>

      {/* Middle Mechanism */}
      <Icosahedron ref={middleRef} args={[1.5, 2]}>
        <meshStandardMaterial 
            {...wireframeMaterial} 
            color={colors.middle} 
            emissive={colors.middle}
            emissiveIntensity={colors.emissiveIntensity}
            opacity={0.6}
        />
      </Icosahedron>

       {/* Inner Structure */}
       <Icosahedron ref={innerRef} args={[1, 0]}>
        <meshStandardMaterial 
            {...wireframeMaterial} 
            color={colors.inner} 
            emissive={colors.inner}
            emissiveIntensity={colors.emissiveIntensity * 1.5}
            wireframeLinewidth={2}
        />
      </Icosahedron>

      {/* The Core Energy Sphere */}
      <Sphere ref={coreRef} args={[0.4, 32, 32]}>
         <meshStandardMaterial 
            color={colors.core}
            emissive={colors.core}
            emissiveIntensity={isDark ? 5 : 3}
            toneMapped={false}
         />
      </Sphere>
    </group>
  );
}

// --- Main Component ---
export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const isDark = useSystemTheme();

  useEffect(() => {
    // Simulate page load duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // Increased slightly to enjoy the view

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          // Using CSS variables for background to ensure it matches system theme exactly
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-500"
        >
          {/* The Canvas is the window into the 3D world.
            We set dpr (device pixel ratio) for sharp edges on high-res screens.
          */}
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
                {/* Basic Lighting (needed for standard materials, though emissive does most work) */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                
                {/* The 3D Objects */}
                <QuantumEngine isDark={isDark} />
                <Particles isDark={isDark} />

                {/* Mouse controls to look around (optional, remove if unwanted) */}
                <OrbitControls 
                    enableZoom={false} 
                    enablePan={false} 
                    autoRotate={true} 
                    autoRotateSpeed={0.5} 
                />

                {/* Post Processing Effects for the "Tech Glow" */}
                <EffectComposer>
                    {/* Bloom creates the neon glow effect from bright/emissive materials */}
                    <Bloom 
                        luminanceThreshold={isDark ? 0.2 : 0.5} // Lower threshold in dark mode makes things glow easier
                        luminanceSmoothing={0.9} 
                        height={300} 
                        intensity={isDark ? 1.5 : 1.2} 
                    />
                    <Noise opacity={0.02} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>
            </Canvas>
          </div>

          {/* Overlay Content (Text) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative z-10 mt-[40vh] flex flex-col items-center gap-4"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-[0.2em] text-gray-900 dark:text-white uppercase">
              Nirupam
            </h2>
            <div className="flex items-center gap-2">
               <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" 
               />
              <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
                Initializing Quantum Core...
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}