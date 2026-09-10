import React, { useRef, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Sparkles, Ring } from '@react-three/drei';
import * as THREE from 'three';
import { soundFx } from '../utils/audio';
import { Zap, Sparkles as SparkleIcon, Flame } from 'lucide-react';

// Floating Hextech Stabilizer Shard
function StabilizerShard({ index, total, radius = 2.4, surgeRef }) {
  const meshRef = useRef();
  const initialAngle = (index / total) * Math.PI * 2;

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const surge = surgeRef.current;
    const speed = 0.6 + surge * 1.5;

    // Harmonic orbital path
    const angle = initialAngle + t * speed * 0.5;
    const currentRadius = radius + Math.sin(t * 2 + index) * 0.15 + surge * 0.4;
    
    meshRef.current.position.x = Math.cos(angle) * currentRadius;
    meshRef.current.position.z = Math.sin(angle) * currentRadius;
    meshRef.current.position.y = Math.sin(t * 1.8 + index * 1.5) * 0.45;

    // Tumble rotation
    meshRef.current.rotation.x += delta * (1.2 + surge * 3);
    meshRef.current.rotation.y += delta * (0.8 + surge * 2);
    meshRef.current.rotation.z = Math.sin(t + index) * 0.5;
  });

  return (
    <group ref={meshRef}>
      {/* Outer Brass Shard */}
      <mesh>
        <coneGeometry args={[0.22, 0.65, 4]} />
        <meshStandardMaterial
          color="#c89b3c"
          emissive="#785a28"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      {/* Embedded Cyan Power Core */}
      <mesh position={[0, -0.05, 0]}>
        <octahedronGeometry args={[0.12, 0]} />
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
      outerMeshRef.current.rotation.y += delta * (0.4 + surge * 2.5);
      outerMeshRef.current.rotation.x += delta * (0.2 + surge * 1.5);
      const scale = 1.8 + Math.sin(t * 3.5) * 0.05 + surge * 0.25;
      outerMeshRef.current.scale.set(scale, scale, scale);
    }

    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y -= delta * (0.8 + surge * 4.0);
      innerMeshRef.current.rotation.z += delta * (0.5 + surge * 2.0);
      const innerScale = 1.1 + Math.sin(t * 6) * 0.08 + surge * 0.4;
      innerMeshRef.current.scale.set(innerScale, innerScale, innerScale);
    }

    if (cageMeshRef.current) {
      cageMeshRef.current.rotation.y += delta * (0.3 + surge * 1.5);
      cageMeshRef.current.rotation.z -= delta * (0.2 + surge * 1.0);
    }

    // Dynamic core light pulse
    if (coreLightRef.current) {
      coreLightRef.current.intensity = 3.0 + Math.sin(t * 5) * 1.5 + surge * 9.0;
    }

    // Shockwave pulse expansion on surge
    if (shockwaveRef.current) {
      if (surge > 0.05) {
        shockwaveRef.current.visible = true;
        const waveScale = (1 - surge) * 4.5 + 1.2;
        shockwaveRef.current.scale.set(waveScale, waveScale, waveScale);
        shockwaveRef.current.material.opacity = surge * 0.8;
      } else {
        shockwaveRef.current.visible = false;
      }
    }
  });

  return (
    <group onClick={onSurge}>
      {/* Dynamic Internal Core PointLight */}
      <pointLight ref={coreLightRef} position={[0, 0, 0]} color="#00f0ff" distance={8} decay={2} />

      {/* Inner Pure Arcane Plasma Core */}
      <mesh ref={innerMeshRef}>
        <octahedronGeometry args={[1.0, 0]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00f0ff"
          emissiveIntensity={3.5}
          roughness={0.05}
          metalness={0.9}
        />
      </mesh>

      {/* Outer Hextech Glass Facet (Piltover Refractive Crystal) */}
      <mesh ref={outerMeshRef}>
        <icosahedronGeometry args={[1.0, 0]} />
        <meshPhysicalMaterial
          color="#0ac8b9"
          emissive="#005a82"
          emissiveIntensity={1.0}
          roughness={0.1}
          metalness={0.15}
          transmission={0.88}
          thickness={1.6}
          transparent={true}
          opacity={0.75}
        />
      </mesh>

      {/* Hextech Rune Cage & Stabilizer Edges */}
      <mesh ref={cageMeshRef} scale={[1.85, 1.85, 1.85]}>
        <icosahedronGeometry args={[1.0, 0]} />
        <meshBasicMaterial
          color="#ffd700"
          wireframe={true}
          transparent={true}
          opacity={0.65}
        />
      </mesh>

      {/* Overcharge Shockwave Sphere */}
      <mesh ref={shockwaveRef}>
        <sphereGeometry args={[1, 32, 32]} />
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
    if (ring1.current) ring1.current.rotation.z += delta * (0.5 + surge * 2.5);
    if (ring2.current) ring2.current.rotation.x += delta * (0.4 + surge * 2.0);
    if (ring3.current) {
      ring3.current.rotation.y += delta * (0.3 + surge * 1.5);
      ring3.current.rotation.z -= delta * (0.2 + surge * 1.0);
    }
  });

  // Power Nodes positions along ring
  const nodes = useMemo(() => [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2], []);

  return (
    <group>
      {/* Ring 1: Primary Gold Hextech Ring with Power Nodes */}
      <group ref={ring1} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.5, 0.05, 16, 120]} />
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
          <mesh key={i} position={[Math.cos(angle) * 2.5, Math.sin(angle) * 2.5, 0]}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2} />
          </mesh>
        ))}
      </group>

      {/* Ring 2: Arcane Cyan Gyro Ring */}
      <group ref={ring2} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <mesh>
          <torusGeometry args={[2.95, 0.045, 16, 120]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#0ac8b9"
            emissiveIntensity={1.4}
            roughness={0.25}
            metalness={0.8}
          />
        </mesh>
        {nodes.map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle + 0.4) * 2.95, Math.sin(angle + 0.4) * 2.95, 0]}>
            <octahedronGeometry args={[0.08, 0]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3} />
          </mesh>
        ))}
      </group>

      {/* Ring 3: Heavy Outer Piltover Brass Gimbal */}
      <mesh ref={ring3} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.4, 0.065, 16, 120]} />
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
function ArcaneParticleStream({ surgeRef }) {
  return (
    <>
      {/* Cyan Mana Sparkles */}
      <Sparkles
        count={85}
        scale={8.5}
        size={3.8}
        speed={0.8}
        color="#00f0ff"
        opacity={0.85}
      />
      {/* Piltover Gold Sparkles */}
      <Sparkles
        count={45}
        scale={9.5}
        size={2.8}
        speed={0.5}
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
    <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <Crystal surgeRef={surgeRef} onSurge={onSurge} />
      <MechanicalRings surgeRef={surgeRef} />
      
      {/* 4 Orbiting Hextech Stabilizer Shards */}
      {[0, 1, 2, 3].map((i) => (
        <StabilizerShard key={i} index={i} total={4} surgeRef={surgeRef} />
      ))}

      <ArcaneParticleStream surgeRef={surgeRef} />
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
      
      {/* 3D Canvas */}
      <div 
        onClick={handleSurge}
        className="w-full h-full cursor-pointer relative"
        title="Nhấp vào Lõi để kích hoạt Năng lượng Hextech"
      >
        <Canvas
          camera={{ position: [0, 0, 7.2], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        >
          {/* Arcane Ambient & Accent Lights */}
          <ambientLight intensity={0.7} />
          <pointLight position={[6, 6, 6]} intensity={2.8} color="#00f0ff" distance={16} />
          <pointLight position={[-6, -6, -6]} intensity={2.2} color="#c89b3c" distance={16} />
          <directionalLight position={[0, 8, 4]} intensity={1.5} color="#ffd700" />

          <HextechScene surgeRef={surgeRef} onSurge={handleSurge} />

          {/* User Camera Orbit Interaction */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={isOvercharged ? 2.5 : 0.7}
            maxPolarAngle={Math.PI / 1.4}
            minPolarAngle={Math.PI / 3.2}
          />
        </Canvas>
      </div>

      {/* Interactive Hextech Core HUD & Energy Trigger Button */}
      <div className="absolute bottom-2 flex flex-col items-center gap-1.5 z-20 pointer-events-auto">
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
          Kéo chuột để xoay 3D 360° • Click để phát sóng Hextech
        </div>
      </div>

    </div>
  );
}
