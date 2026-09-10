import React, { useRef, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { soundFx } from '../utils/audio';
import { Zap } from 'lucide-react';

// Floating Hextech Stabilizer Shard
function StabilizerShard({ index, total, radius = 1.85, surgeRef }) {
  const meshRef = useRef();
  const initialAngle = (index / total) * Math.PI * 2;

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const surge = surgeRef.current;
    const speed = 0.5 + surge * 1.5;

    // Harmonic orbital path
    const angle = initialAngle + t * speed * 0.6;
    const currentRadius = radius + Math.sin(t * 2 + index) * 0.1 + surge * 0.3;
    
    meshRef.current.position.x = Math.cos(angle) * currentRadius;
    meshRef.current.position.z = Math.sin(angle) * currentRadius;
    meshRef.current.position.y = Math.sin(t * 1.6 + index * 1.5) * 0.35;

    // Tumble rotation
    meshRef.current.rotation.x += delta * (1.0 + surge * 2.5);
    meshRef.current.rotation.y += delta * (0.7 + surge * 1.8);
    meshRef.current.rotation.z = Math.sin(t + index) * 0.4;
  });

  return (
    <group ref={meshRef}>
      {/* Outer Brass Shard */}
      <mesh>
        <coneGeometry args={[0.16, 0.48, 4]} />
        <meshStandardMaterial
          color="#c89b3c"
          emissive="#785a28"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      {/* Embedded Cyan Power Core */}
      <mesh position={[0, -0.04, 0]}>
        <octahedronGeometry args={[0.09, 0]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
    </group>
  );
}

// 3D Hextech Crystal Core with Energy Pulse
function Crystal({ surgeRef, onSurge }) {
  const outerMeshRef = useRef();
  const innerMeshRef = useRef();
  const cageMeshRef = useRef();
  const shockwaveRef = useRef();
  const coreLightRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const surge = surgeRef.current;
    
    // Core rotations with acceleration on surge
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.y += delta * (0.35 + surge * 2.2);
      outerMeshRef.current.rotation.x += delta * (0.18 + surge * 1.2);
      const scale = 1.0 + Math.sin(t * 3.5) * 0.04 + surge * 0.2;
      outerMeshRef.current.scale.set(scale, scale, scale);
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y -= delta * (0.7 + surge * 3.5);
      innerMeshRef.current.rotation.z += delta * (0.4 + surge * 1.8);
      const innerScale = 1.0 + Math.sin(t * 5.5) * 0.06 + surge * 0.3;
      innerMeshRef.current.scale.set(innerScale, innerScale, innerScale);
    }

    if (cageMeshRef.current) {
      cageMeshRef.current.rotation.y += delta * (0.25 + surge * 1.2);
      cageMeshRef.current.rotation.z -= delta * (0.15 + surge * 0.8);
    }

    // Dynamic core light pulse
    if (coreLightRef.current) {
      coreLightRef.current.intensity = 2.5 + Math.sin(t * 4.5) * 1.2 + surge * 8.0;
    }

    // Shockwave pulse expansion on surge
    if (shockwaveRef.current) {
      if (surge > 0.05) {
        shockwaveRef.current.visible = true;
        const waveScale = (1 - surge) * 3.5 + 1.0;
        shockwaveRef.current.scale.set(waveScale, waveScale, waveScale);
        shockwaveRef.current.material.opacity = surge * 0.75;
      } else {
        shockwaveRef.current.visible = false;
      }
    }
  });

  return (
    <group onClick={onSurge}>
      {/* Dynamic Internal Core PointLight */}
      <pointLight ref={coreLightRef} position={[0, 0, 0]} color="#00f0ff" distance={7} decay={2} />

      {/* Inner Pure Arcane Plasma Core */}
      <mesh ref={innerMeshRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00f0ff"
          emissiveIntensity={3.2}
          roughness={0.05}
          metalness={0.9}
        />
      </mesh>

      {/* Outer Hextech Glass Facet (Piltover Refractive Crystal) */}
      <mesh ref={outerMeshRef}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshPhysicalMaterial
          color="#0ac8b9"
          emissive="#005a82"
          emissiveIntensity={0.9}
          roughness={0.1}
          metalness={0.15}
          transmission={0.88}
          thickness={1.4}
          transparent={true}
          opacity={0.75}
        />
      </mesh>

      {/* Hextech Rune Cage & Stabilizer Edges */}
      <mesh ref={cageMeshRef}>
        <icosahedronGeometry args={[1.18, 0]} />
        <meshBasicMaterial
          color="#ffd700"
          wireframe={true}
          transparent={true}
          opacity={0.65}
        />
      </mesh>

      {/* Overcharge Shockwave Sphere */}
      <mesh ref={shockwaveRef}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe={true}
          transparent={true}
          opacity={0}
        />
      </mesh>
    </group>
  );
}

// Multi-Axis Mechanical Gimbal Rings with Energy Nodes
function MechanicalRings({ surgeRef }) {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((state, delta) => {
    const surge = surgeRef.current;
    if (ring1.current) ring1.current.rotation.z += delta * (0.45 + surge * 2.2);
    if (ring2.current) ring2.current.rotation.x += delta * (0.35 + surge * 1.8);
    if (ring3.current) {
      ring3.current.rotation.y += delta * (0.25 + surge * 1.2);
      ring3.current.rotation.z -= delta * (0.18 + surge * 0.9);
    }
  });

  // Power Nodes positions along ring
  const nodes = useMemo(() => [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2], []);

  return (
    <group>
      {/* Ring 1: Primary Gold Hextech Ring with Power Nodes */}
      <group ref={ring1} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.72, 0.038, 16, 100]} />
          <meshStandardMaterial
            color="#c89b3c"
            emissive="#785a28"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.95}
          />
        </mesh>
        {/* Glowing Glyphs on Ring 1 */}
        {nodes.map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle) * 1.72, Math.sin(angle) * 1.72, 0]}>
            <sphereGeometry args={[0.07, 10, 10]} />
            <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2} />
          </mesh>
        ))}
      </group>

      {/* Ring 2: Arcane Cyan Gyro Ring */}
      <group ref={ring2} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <mesh>
          <torusGeometry args={[2.08, 0.032, 16, 100]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#0ac8b9"
            emissiveIntensity={1.3}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>
        {nodes.map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle + 0.4) * 2.08, Math.sin(angle + 0.4) * 2.08, 0]}>
            <octahedronGeometry args={[0.06, 0]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3} />
          </mesh>
        ))}
      </group>

      {/* Ring 3: Outer Piltover Brass Gimbal Ring */}
      <mesh ref={ring3} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.42, 0.048, 16, 100]} />
        <meshStandardMaterial
          color="#e4b85c"
          emissive="#463714"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.92}
        />
      </mesh>
    </group>
  );
}

// Swirling Arcane Particles
function ArcaneParticleStream() {
  return (
    <>
      {/* Cyan Mana Sparkles */}
      <Sparkles
        count={70}
        scale={5.8}
        size={3.2}
        speed={0.7}
        color="#00f0ff"
        opacity={0.85}
      />
      {/* Piltover Gold Sparkles */}
      <Sparkles
        count={35}
        scale={6.5}
        size={2.4}
        speed={0.4}
        color="#ffd700"
        opacity={0.9}
      />
    </>
  );
}

// Animated Root Scene Container
function HextechScene({ surgeRef, onSurge }) {
  useFrame((state, delta) => {
    // Smooth decay of surge energy back to idle state
    if (surgeRef.current > 0.001) {
      surgeRef.current = THREE.MathUtils.lerp(surgeRef.current, 0, delta * 2.2);
    } else {
      surgeRef.current = 0;
    }
  });

  return (
    <Float speed={2.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <Crystal surgeRef={surgeRef} onSurge={onSurge} />
      <MechanicalRings surgeRef={surgeRef} />
      
      {/* 4 Orbiting Hextech Stabilizer Shards */}
      {[0, 1, 2, 3].map((i) => (
        <StabilizerShard key={i} index={i} total={4} surgeRef={surgeRef} />
      ))}

      <ArcaneParticleStream />
    </Float>
  );
}

export default function HextechCore3D() {
  const surgeRef = useRef(0);
  const [isOvercharged, setIsOvercharged] = useState(false);
  const [surgeCount, setSurgeCount] = useState(0);

  const handleSurge = useCallback(() => {
    surgeRef.current = 1.0;
    setIsOvercharged(true);
    setSurgeCount((prev) => prev + 1);
    soundFx.playHextechSurge();

    setTimeout(() => {
      setIsOvercharged(false);
    }, 1800);
  }, []);

  return (
    <div className="w-full h-full relative select-none flex flex-col items-center justify-center">
      
      {/* 3D Canvas with calibrated camera to prevent any clipping */}
      <div 
        onClick={handleSurge}
        className="w-full h-full cursor-pointer relative"
        title="Nhấp vào Lõi để kích hoạt Năng lượng Hextech"
      >
        <Canvas
          camera={{ position: [0, 0, 7.8], fov: 42 }}
          dpr={[1, 2]}
          gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        >
          {/* Arcane Ambient & Accent Lights */}
          <ambientLight intensity={0.7} />
          <pointLight position={[5, 5, 5]} intensity={2.5} color="#00f0ff" distance={15} />
          <pointLight position={[-5, -5, -5]} intensity={2.0} color="#c89b3c" distance={15} />
          <directionalLight position={[0, 6, 3]} intensity={1.3} color="#ffd700" />

          <HextechScene surgeRef={surgeRef} onSurge={handleSurge} />

          {/* User Camera Orbit Interaction */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={isOvercharged ? 2.2 : 0.6}
            maxPolarAngle={Math.PI / 1.4}
            minPolarAngle={Math.PI / 3.2}
          />
        </Canvas>
      </div>

      {/* Interactive Hextech Core HUD Button */}
      <div className="absolute -bottom-1 sm:bottom-1 flex flex-col items-center gap-1.5 z-20 pointer-events-auto">
        <button
          onClick={handleSurge}
          className={`px-4 py-1.5 rounded-full text-xs font-chakra font-bold flex items-center gap-2 border transition-all duration-300 backdrop-blur-md shadow-lg ${
            isOvercharged
              ? 'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff] shadow-hextech-cyan animate-pulse scale-105'
              : 'bg-[#010a13]/85 text-[#f0e6d2] border-[#c89b3c]/50 hover:border-[#00f0ff] hover:text-[#00f0ff] hover:scale-105'
          }`}
        >
          <Zap className={`w-3.5 h-3.5 ${isOvercharged ? 'text-[#00f0ff] animate-bounce' : 'text-[#ffd700]'}`} />
          <span>
            {isOvercharged ? '⚡ QUÁ TẢI HEXTECH (OVERCHARGE)' : '⚡ NHẤP ĐỂ NẠP XUNG NĂNG LƯỢNG'}
          </span>
          {surgeCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#00f0ff]/20 text-[#00f0ff] font-mono border border-[#00f0ff]/30">
              x{surgeCount}
            </span>
          )}
        </button>

        <div className="text-[10px] font-chakra tracking-widest text-gray-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0ac8b9] animate-ping" />
          Kéo chuột để xoay 3D 360° • Click để nạp năng lượng
        </div>
      </div>

    </div>
  );
}
