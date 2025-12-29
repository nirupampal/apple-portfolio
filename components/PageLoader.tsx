"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { Mesh, Group } from "three";

// --- Custom Hook to detect system theme ---
function useSystemTheme() {
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

// --- Minimal Floating Grid Lines ---
function GridLines({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.03;
    }
  });

  const lineColor = isDark ? "#1a1a2e" : "#e5e5e5";
  
  const horizontalLines = useMemo(() => {
    return [-2, -1, 0, 1, 2].map((y) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute([-8, y, -5, 8, y, -5], 3));
      return { y, geometry };
    });
  }, []);

  const verticalLines = useMemo(() => {
    return [-3, -1.5, 0, 1.5, 3].map((x) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute([x, -3, -5, x, 3, -5], 3));
      return { x, geometry };
    });
  }, []);
  
  return (
    <group ref={groupRef}>
      {/* Horizontal lines */}
      {horizontalLines.map(({ y, geometry }) => (
        <primitive
          key={`h-${y}`}
          object={new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({ color: lineColor, transparent: true, opacity: 0.15 })
          )}
        />
      ))}
      {/* Vertical lines */}
      {verticalLines.map(({ x, geometry }) => (
        <primitive
          key={`v-${x}`}
          object={new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({ color: lineColor, transparent: true, opacity: 0.1 })
          )}
        />
      ))}
    </group>
  );
}

// --- Central Morphing Sphere ---
function MorphingSphere({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color={isDark ? "#0a0a0a" : "#fafafa"}
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={0.5}
        />
      </Sphere>
      {/* Subtle glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.25, 64]} />
        <meshBasicMaterial
          color={isDark ? "#ffffff" : "#000000"}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

// --- Orbiting Dots ---
function OrbitingDots({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = clock.getElapsedTime() * 0.5;
    }
  });

  const dotColor = isDark ? "#ffffff" : "#000000";
  
  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 3) * 1.8,
            Math.sin((i * Math.PI * 2) / 3) * 1.8,
            0,
          ]}
        >
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color={dotColor} />
        </mesh>
      ))}
    </group>
  );
}

// --- Main Component ---
export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const isDark = useSystemTheme();

  useEffect(() => {
    // Smooth progress animation
    const duration = 2800;
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      }
    };
    
    requestAnimationFrame(updateProgress);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.02,
            filter: "blur(10px)",
            transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } 
          }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden bg-neutral-50 dark:bg-neutral-950"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-neutral-100/50 dark:to-neutral-900/50" />
          
          {/* 3D Canvas */}
          <div className="absolute inset-0">
            <Canvas
              camera={{ position: [0, 0, 4], fov: 45 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={0.5} />
              
              <GridLines isDark={isDark} />
              <MorphingSphere isDark={isDark} />
              <OrbitingDots isDark={isDark} />

              <EffectComposer>
                <Bloom
                  luminanceThreshold={0.9}
                  luminanceSmoothing={0.9}
                  intensity={0.2}
                />
                <ChromaticAberration
                  blendFunction={BlendFunction.NORMAL}
                  offset={new THREE.Vector2(0.0005, 0.0005)}
                />
              </EffectComposer>
            </Canvas>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo/Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-extralight tracking-[0.3em] text-neutral-900 dark:text-neutral-100 uppercase">
                Nirupam
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="h-px bg-neutral-300 dark:bg-neutral-700 mt-4 origin-left"
              />
            </motion.div>

            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Minimal Progress Bar */}
              <div className="w-48 h-px bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-neutral-900 dark:bg-neutral-100"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              
              {/* Progress Text */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 tracking-wider">
                  {Math.round(progress).toString().padStart(3, '0')}
                </span>
                <div className="w-px h-3 bg-neutral-300 dark:bg-neutral-700" />
                <span className="text-xs font-light text-neutral-500 dark:text-neutral-400 tracking-widest uppercase">
                  Loading
                </span>
              </div>
            </motion.div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-neutral-300 dark:border-neutral-700" />
          <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-neutral-300 dark:border-neutral-700" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-neutral-300 dark:border-neutral-700" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-neutral-300 dark:border-neutral-700" />

          {/* Bottom Tag */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-8 text-[10px] font-light tracking-[0.4em] text-neutral-400 dark:text-neutral-600 uppercase"
          >
            Software Developer
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}