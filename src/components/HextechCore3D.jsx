import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// 3D Hextech Crystal Core
function Crystal() {
  const meshRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.6;
      innerRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group>
      {/* Inner Pure Power Energy Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2.5}
          roughness={0.1}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Outer Hextech Glass Facet */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 0]} />
        <meshPhysicalMaterial
          color="#0ac8b9"
          emissive="#005a82"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.2}
          transmission={0.85}
          thickness={1.5}
          transparent={true}
          opacity={0.7}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe Arcane Cage */}
      <mesh>
        <icosahedronGeometry args={[1.82, 0]} />
        <meshBasicMaterial
          color="#f0e6d2"
          wireframe={true}
          transparent={true}
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// Orbiting Piltover Gold Rings
function MechanicalRings() {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((state, delta) => {
    if (ring1.current) ring1.current.rotation.z += delta * 0.5;
    if (ring2.current) ring2.current.rotation.x += delta * 0.4;
    if (ring3.current) {
      ring3.current.rotation.y += delta * 0.3;
      ring3.current.rotation.z -= delta * 0.2;
    }
  });

  return (
    <group>
      {/* Primary Gold Ring with Engraved Rune Ornaments */}
      <mesh ref={ring1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#c89b3c"
          emissive="#785a28"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.95}
        />
      </mesh>

      {/* Secondary Cyan Mana Ring */}
      <mesh ref={ring2} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <torusGeometry args={[2.9, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#0ac8b9"
          emissiveIntensity={1.2}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Heavy Brass Gimbal Ring */}
      <mesh ref={ring3} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.3, 0.06, 16, 100]} />
        <meshStandardMaterial
          color="#e4b85c"
          emissive="#463714"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

// Arcane Particles Orbit System
function ArcaneParticles() {
  return (
    <>
      <Sparkles
        count={70}
        scale={8}
        size={3.5}
        speed={0.6}
        color="#00f0ff"
        opacity={0.8}
      />
      <Sparkles
        count={35}
        scale={9}
        size={2.5}
        speed={0.4}
        color="#ffd700"
        opacity={0.9}
      />
    </>
  );
}

export default function HextechCore3D() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 2]} // Performance best practice for Retina & High-DPI screens
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
      >
        {/* Cinematic Ambient & Directional Lights */}
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={2.5} color="#00f0ff" distance={15} />
        <pointLight position={[-5, -5, -5]} intensity={2} color="#c89b3c" distance={15} />
        <pointLight position={[0, 0, 0]} intensity={3} color="#00f0ff" distance={6} />

        <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
          <Crystal />
          <MechanicalRings />
          <ArcaneParticles />
        </Float>

        {/* User Interaction Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
