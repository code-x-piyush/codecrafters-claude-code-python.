'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import type { Mesh } from 'three';

function Orb() {
  const meshRef = useRef<Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
  });

  return (
    <Float speed={2.5} rotationIntensity={0.9} floatIntensity={1.2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.2} roughness={0.1} wireframe />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <section id="home" className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-8">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}>
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-cyan-300">AI Portfolio + SaaS Tools</p>
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">Build faster with AI, PDF and image tools</h1>
          <p className="mt-4 max-w-xl text-zinc-300">
            Modern 3D portfolio with integrated productivity tools, payment upgrades, and admin insights.
          </p>
          <a href="#tools" className="mt-6 inline-flex rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400">
            Explore Tools
          </a>
        </motion.div>
        <div className="h-[320px] rounded-2xl border border-white/10 bg-black/40">
          <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[2, 2, 3]} intensity={1.2} />
            <Orb />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
