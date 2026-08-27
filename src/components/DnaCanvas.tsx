import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

function DnaHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const numBasePairs = 40;
  const radius = 2.5;
  const height = 15;
  const yStep = height / numBasePairs;
  const angleStep = 0.3;

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  const basePairs = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < numBasePairs; i++) {
      const y = -height / 2 + i * yStep;
      const angle = i * angleStep;
      
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;

      pairs.push({ x1, y, z1, x2, z2, angle });
    }
    return pairs;
  }, [numBasePairs, radius, height, yStep, angleStep]);

  return (
    <group ref={groupRef}>
      {basePairs.map((pair, index) => (
        <group key={index}>
          {/* Backbone 1 */}
          <Sphere args={[0.3, 16, 16]} position={[pair.x1, pair.y, pair.z1]}>
            <meshStandardMaterial color="#ffffff" emissive="#444444" emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
          </Sphere>
          {/* Backbone 2 */}
          <Sphere args={[0.3, 16, 16]} position={[pair.x2, pair.y, pair.z2]}>
            <meshStandardMaterial color="#a3a3a3" emissive="#222222" emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
          </Sphere>
          {/* Connection */}
          <Cylinder args={[0.05, 0.05, radius * 2, 8]} position={[0, pair.y, 0]} rotation={[0, -pair.angle, Math.PI / 2]}>
            <meshStandardMaterial color="#525252" opacity={0.6} transparent roughness={0.5} />
          </Cylinder>
        </group>
      ))}
    </group>
  );
}

export default function DnaCanvas() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#444444" />
        <DnaHelix />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
