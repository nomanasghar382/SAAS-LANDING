"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 180;

function createParticleData() {
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  const spd = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 14;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    spd[i] = 0.2 + Math.random() * 0.5;
  }

  return { positions: pos, speeds: spd };
}

const particleData = createParticleData();

export function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const positionAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const y = positionAttr.getY(i);
      positionAttr.setY(
        i,
        y + Math.sin(t * particleData.speeds[i] + i) * 0.0008
      );
    }
    positionAttr.needsUpdate = true;
    pointsRef.current.rotation.y = t * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleData.positions, 3]}
          count={PARTICLE_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#a78bfa"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
