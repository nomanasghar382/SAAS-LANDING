"use client";

import { useRef } from "react";
import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ParallaxRef } from "./use-mouse-parallax";

interface HolographicAIProps {
  parallax: ParallaxRef;
}

export function HolographicAI({ parallax }: HolographicAIProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y =
        t * 0.25 + parallax.current.x * 0.2;
      groupRef.current.position.x = 2.2 + parallax.current.x * 0.15;
      groupRef.current.position.y =
        0.6 + Math.sin(t * 0.6) * 0.1 + parallax.current.y * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.4;
      ringRef.current.rotation.z = t * 0.25;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef} position={[2.2, 0.6, 0.5]}>
        <mesh>
          <icosahedronGeometry args={[0.35, 1]} />
          <meshBasicMaterial
            color="#c4b5fd"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshPhysicalMaterial
            color="#8b5cf6"
            emissive="#7c3aed"
            emissiveIntensity={0.8}
            transparent
            opacity={0.85}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>

        <mesh ref={ringRef}>
          <torusGeometry args={[0.55, 0.012, 16, 64]} />
          <meshPhysicalMaterial
            color="#a78bfa"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
            roughness={0}
            metalness={0.8}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.62, 0.64, 64]} />
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}
