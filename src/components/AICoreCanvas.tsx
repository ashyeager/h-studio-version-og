import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Ring, Trail, Float, Torus } from '@react-three/drei';
import * as THREE from 'three';

function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]}>
      <meshPhysicalMaterial
        color="#ffffff"
        emissive="#008080"
        emissiveIntensity={1.5}
        transmission={0.9}
        opacity={1}
        metalness={0.2}
        roughness={0.1}
        ior={1.5}
        thickness={2}
      />
    </Sphere>
  );
}

function InnerCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.8, 32, 32]}>
      <meshBasicMaterial color="#00ffcc" />
    </Sphere>
  );
}

function OrbitalRings() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Torus args={[2.5, 0.02, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color="#00ffcc" emissive="#00ffcc" emissiveIntensity={2} />
      </Torus>
      <Torus args={[3.2, 0.015, 16, 100]} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} opacity={0.5} transparent />
      </Torus>
      <Torus args={[4, 0.01, 16, 100]} rotation={[0, Math.PI / 2, Math.PI / 6]}>
        <meshStandardMaterial color="#00aaff" emissive="#00aaff" emissiveIntensity={1.5} />
      </Torus>
    </group>
  );
}

function Particles() {
  const count = 200;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current!.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[new THREE.OctahedronGeometry(0.05), new THREE.MeshBasicMaterial({ color: '#ffffff' }), count]}>
      <meshBasicMaterial color="#00ffcc" transparent opacity={0.6} />
    </instancedMesh>
  );
}

export default function AICoreCanvas() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffcc" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00aaff" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
          <CoreSphere />
          <InnerCore />
          <OrbitalRings />
        </Float>
        <Particles />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
