"use client";

import { useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ParallaxRef } from "./use-mouse-parallax";

interface FloatingCardProps {
  position: [number, number, number];
  accent: string;
  delay: number;
  parallax: ParallaxRef;
}

function FloatingCard({ position, accent, delay, parallax }: FloatingCardProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + delay;
    ref.current.position.y = position[1] + Math.sin(t * 0.7) * 0.06;
    ref.current.rotation.y = parallax.current.x * 0.08;
    ref.current.rotation.x = parallax.current.y * 0.04;
  });

  return (
    <group ref={ref} position={position}>
      <RoundedBox args={[1.1, 0.55, 0.04]} radius={0.04} smoothness={4}>
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.12}
          roughness={0.05}
          metalness={0.1}
          transmission={0.6}
          thickness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      <RoundedBox
        args={[1.0, 0.45, 0.02]}
        radius={0.03}
        smoothness={4}
        position={[0, 0, 0.025]}
      >
        <meshPhysicalMaterial
          color="#1e1b4b"
          transparent
          opacity={0.7}
          roughness={0.3}
          metalness={0.4}
        />
      </RoundedBox>

      {/* Label line */}
      <mesh position={[-0.2, 0.1, 0.05]}>
        <boxGeometry args={[0.35, 0.03, 0.005]} />
        <meshPhysicalMaterial color={accent} emissive={accent} emissiveIntensity={0.3} />
      </mesh>
      {/* Value line */}
      <mesh position={[-0.15, -0.08, 0.05]}>
        <boxGeometry args={[0.5, 0.06, 0.005]} />
        <meshPhysicalMaterial color="#f8fafc" roughness={0.2} />
      </mesh>
    </group>
  );
}

interface FloatingCards3DProps {
  parallax: ParallaxRef;
}

export function FloatingCards3D({ parallax }: FloatingCards3DProps) {
  return (
    <group>
      <FloatingCard
        position={[-2.4, 1.1, 0.8]}
        accent="#a78bfa"
        delay={0}
        parallax={parallax}
      />
      <FloatingCard
        position={[-2.6, -0.5, 1.2]}
        accent="#818cf8"
        delay={1.2}
        parallax={parallax}
      />
      <FloatingCard
        position={[2.5, -0.8, 0.6]}
        accent="#c4b5fd"
        delay={2.4}
        parallax={parallax}
      />
    </group>
  );
}
