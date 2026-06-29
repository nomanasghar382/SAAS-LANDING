"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export interface ParallaxRef {
  current: { x: number; y: number };
}

export function useMouseParallax(): ParallaxRef {
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(() => {
    smooth.current.x += (mouse.current.x - smooth.current.x) * 0.04;
    smooth.current.y += (mouse.current.y - smooth.current.y) * 0.04;
  });

  return smooth;
}
