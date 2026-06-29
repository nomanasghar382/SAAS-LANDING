"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  Preload,
} from "@react-three/drei";
import { DashboardMockup3D } from "./dashboard-mockup-3d";
import { FloatingCards3D } from "./floating-cards-3d";
import { HolographicAI } from "./holographic-ai";
import { ParticleField } from "./particle-field";
import { useMouseParallax } from "./use-mouse-parallax";

function SceneContent() {
  const parallax = useMouseParallax();

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.3, 5.5]} fov={42} />

      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        color="#f8fafc"
      />
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.4}
        color="#a78bfa"
      />
      <spotLight
        position={[0, 4, 2]}
        angle={0.35}
        penumbra={1}
        intensity={1.2}
        color="#8b5cf6"
        castShadow={false}
      />
      <pointLight position={[2, 1, 3]} intensity={0.6} color="#c4b5fd" />
      <pointLight position={[-2, -1, 2]} intensity={0.3} color="#6366f1" />

      <ParticleField />
      <DashboardMockup3D parallax={parallax} />
      <FloatingCards3D parallax={parallax} />
      <HolographicAI parallax={parallax} />

      <Environment preset="city" environmentIntensity={0.25} />
      <Preload all />
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
