"use client";

import { useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ParallaxRef } from "./use-mouse-parallax";

interface DashboardMockup3DProps {
  parallax: ParallaxRef;
}

export function DashboardMockup3D({ parallax }: DashboardMockup3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = parallax.current.x * 0.12;
    groupRef.current.rotation.x = parallax.current.y * 0.06;
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.05;
  });

  const barHeights = [0.35, 0.55, 0.42, 0.68, 0.5, 0.72];

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main glass panel */}
      <RoundedBox args={[4.2, 2.6, 0.06]} radius={0.1} smoothness={4}>
        <meshPhysicalMaterial
          color="#0f0a1e"
          transparent
          opacity={0.75}
          roughness={0.15}
          metalness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
      </RoundedBox>

      {/* Glass overlay */}
      <RoundedBox
        args={[4.0, 2.4, 0.02]}
        radius={0.08}
        smoothness={4}
        position={[0, 0, 0.04]}
      >
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.06}
          roughness={0}
          metalness={0}
          transmission={0.9}
          thickness={0.5}
        />
      </RoundedBox>

      {/* Sidebar */}
      <mesh position={[-1.65, 0, 0.06]}>
        <boxGeometry args={[0.6, 2.2, 0.02]} />
        <meshPhysicalMaterial
          color="#1e1b4b"
          transparent
          opacity={0.9}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Sidebar accent items */}
      {[0.7, 0.3, -0.1, -0.5, -0.9].map((y, i) => (
        <mesh key={i} position={[-1.65, y, 0.08]}>
          <boxGeometry args={[0.35, 0.06, 0.01]} />
          <meshPhysicalMaterial
            color={i === 0 ? "#8b5cf6" : "#312e81"}
            emissive={i === 0 ? "#7c3aed" : "#000000"}
            emissiveIntensity={i === 0 ? 0.4 : 0}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Header bar */}
      <mesh position={[0.2, 1.0, 0.07]}>
        <boxGeometry args={[2.8, 0.12, 0.01]} />
        <meshPhysicalMaterial color="#312e81" roughness={0.5} />
      </mesh>

      {/* Chart bars */}
      {barHeights.map((h, i) => (
        <mesh key={i} position={[-0.3 + i * 0.35, -0.15 + h / 2, 0.08]}>
          <boxGeometry args={[0.18, h, 0.02]} />
          <meshPhysicalMaterial
            color={i % 2 === 0 ? "#8b5cf6" : "#a78bfa"}
            emissive="#7c3aed"
            emissiveIntensity={0.15}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>
      ))}

      {/* Chart baseline */}
      <mesh position={[0.55, -0.5, 0.07]}>
        <boxGeometry args={[2.2, 0.02, 0.01]} />
        <meshPhysicalMaterial color="#4c1d95" transparent opacity={0.5} />
      </mesh>

      {/* KPI cards row */}
      {[-0.5, 0.6, 1.7].map((x, i) => (
        <group key={i} position={[x, 0.55, 0.08]}>
          <RoundedBox args={[0.7, 0.35, 0.02]} radius={0.03} smoothness={2}>
            <meshPhysicalMaterial
              color="#1e1b4b"
              transparent
              opacity={0.8}
              roughness={0.3}
              metalness={0.2}
            />
          </RoundedBox>
          <mesh position={[0, 0.05, 0.015]}>
            <boxGeometry args={[0.4, 0.04, 0.005]} />
            <meshPhysicalMaterial
              color="#8b5cf6"
              emissive="#7c3aed"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
