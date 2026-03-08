import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Education-themed Particles Background
function EducationParticles() {
  const particlesRef = useRef<THREE.Group>(null);
  const particleCount = 50;

  // Education-themed symbols
  const symbols = ['📚', '📖', '✏️', '📝', '🎓', '🏆', '⭐', '💡', '🧮', '📊', '✓', '🎯', '💯', '🔢', '➕', '➖', '✖️', '➗'];

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      velocity: [
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.01,
      ] as [number, number, number],
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      scale: 0.3 + Math.random() * 0.4,
    }));
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const particle = particles[i];
        
        // Update position
        child.position.x += particle.velocity[0];
        child.position.y += particle.velocity[1];
        child.position.z += particle.velocity[2];

        // Boundary check - wrap around
        if (Math.abs(child.position.x) > 10) particle.velocity[0] *= -1;
        if (Math.abs(child.position.y) > 10) particle.velocity[1] *= -1;
        if (Math.abs(child.position.z) > 5) particle.velocity[2] *= -1;

        // Rotation
        child.rotation.z += particle.rotationSpeed;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <Sprite
          key={i}
          position={particle.position}
          scale={particle.scale}
          symbol={particle.symbol}
        />
      ))}
    </group>
  );
}

// Sprite component for rendering emoji/symbols
function Sprite({ position, scale, symbol }: { position: [number, number, number]; scale: number; symbol: string }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Clear canvas
      ctx.clearRect(0, 0, 128, 128);
      
      // Draw emoji/symbol
      ctx.font = 'bold 80px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(symbol, 64, 64);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [symbol]);

  return (
    <sprite position={position} scale={[scale, scale, 1]}>
      <spriteMaterial map={texture} transparent opacity={0.6} />
    </sprite>
  );
}

// Main scene component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <EducationParticles />
    </>
  );
}

// Main component with notebook theme
export function AuthBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Notebook paper background */}
      <div 
        className="absolute inset-0 bg-[#FFFEF7]"
        style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #E8DCC4 31px, #E8DCC4 32px)',
          backgroundSize: '100% 32px',
        }}
      />
      
      {/* Red margin line */}
      <div className="absolute left-0 top-0 bottom-0 w-20 border-r-2 border-[#FFB6C1]" />
      
      {/* Hole punches */}
      <div className="absolute left-10 top-20 w-4 h-4 rounded-full bg-white border-2 border-gray-300 shadow-inner" />
      <div className="absolute left-10 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-gray-300 shadow-inner" />
      <div className="absolute left-10 bottom-20 w-4 h-4 rounded-full bg-white border-2 border-gray-300 shadow-inner" />
      
      {/* Three.js particles overlay */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        className="absolute inset-0"
        style={{ opacity: 0.7 }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
