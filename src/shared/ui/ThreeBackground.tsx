import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
  color?: string;
}

// Generate particles outside component to avoid React compiler warnings
const generateParticles = (count: number, color: string) => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    // Random position in a sphere
    const radius = Math.random() * 25 + 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    // Slight color variation
    const colorObj = new THREE.Color(color);
    colors[i * 3] = colorObj.r + (Math.random() - 0.5) * 0.1;
    colors[i * 3 + 1] = colorObj.g + (Math.random() - 0.5) * 0.1;
    colors[i * 3 + 2] = colorObj.b + (Math.random() - 0.5) * 0.1;
  }

  return { positions, colors };
};

function Particles({ count = 2000, color = '#9B59B6' }: ParticlesProps) {
  const ref = useRef<THREE.Points>(null);

  // Use useMemo with the external generator function
  const particles = useMemo(() => generateParticles(count, color), [count, color]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.075;
    }
  });

  return (
    <Points ref={ref} positions={particles.positions} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
      <bufferAttribute
        attach="attributes-color"
        args={[particles.colors, 3]}
      />
    </Points>
  );
}

interface FloatingShapesProps {
  color?: string;
}

function FloatingShapes({ color = '#9B59B6' }: FloatingShapesProps) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Floating cubes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 15;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 5,
              Math.sin(angle) * radius,
            ]}
          >
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.3}
              wireframe
            />
          </mesh>
        );
      })}
    </group>
  );
}

// New: Spiral animation for login
function SpiralParticles({ color = '#2C3E50' }: { color?: string }) {
  const ref = useRef<THREE.Points>(null);
  const count = 1500;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorObj = new THREE.Color(color);

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 8;
      const radius = t * 20;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (t - 0.5) * 30;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
    }

    return { positions, colors };
  }, [count, color]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Points ref={ref} positions={particles.positions} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.2}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
      <bufferAttribute
        attach="attributes-color"
        args={[particles.colors, 3]}
      />
    </Points>
  );
}

// Generate wave particles outside component
const generateWaveParticles = (count: number, color: string) => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const colorObj = new THREE.Color(color);

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 40;
    const z = (Math.random() - 0.5) * 40;
    const y = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 5;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    colors[i * 3] = colorObj.r + (Math.random() - 0.5) * 0.2;
    colors[i * 3 + 1] = colorObj.g + (Math.random() - 0.5) * 0.2;
    colors[i * 3 + 2] = colorObj.b + (Math.random() - 0.5) * 0.2;
  }

  return { positions, colors };
};

// New: Wave animation for signup
function WaveParticles({ color = '#E74C3C' }: { color?: string }) {
  const ref = useRef<THREE.Points>(null);
  const count = 2000;

  const particles = useMemo(() => generateWaveParticles(count, color), [count, color]);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const x = positions[i * 3];
        const z = positions[i * 3 + 2];
        positions[i * 3 + 1] = Math.sin(x * 0.3 + time) * Math.cos(z * 0.3 + time) * 5;
      }
      
      ref.current.geometry.attributes.position.needsUpdate = true;
      ref.current.rotation.y = time * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={particles.positions} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.18}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
      <bufferAttribute
        attach="attributes-color"
        args={[particles.colors, 3]}
      />
    </Points>
  );
}

// New: Rings for signup
function FloatingRings({ color = '#E74C3C' }: { color?: string }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      group.current.rotation.z = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, (i * Math.PI) / 5]}
        >
          <torusGeometry args={[8 + i * 2, 0.1, 16, 100]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.3 - i * 0.05}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

// New: Spheres for login
function FloatingSpheres({ color = '#2C3E50' }: { color?: string }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.08;
      
      // Animate each sphere's Y position
      group.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.getElapsedTime() * 0.5 + i) * 3;
      });
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 12;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.4}
              wireframe
            />
          </mesh>
        );
      })}
    </group>
  );
}

interface ThreeBackgroundProps {
  variant?: 'particles' | 'shapes' | 'both' | 'spiral' | 'wave' | 'login' | 'signup';
  color?: string;
  particleCount?: number;
}

export const ThreeBackground = ({
  variant = 'both',
  color = '#9B59B6',
  particleCount = 2000,
}: ThreeBackgroundProps) => {
  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        {/* Original variants */}
        {variant === 'particles' && <Particles count={particleCount} color={color} />}
        {variant === 'shapes' && <FloatingShapes color={color} />}
        {variant === 'both' && (
          <>
            <Particles count={particleCount} color={color} />
            <FloatingShapes color={color} />
          </>
        )}
        
        {/* Login variant - Spiral + Spheres */}
        {variant === 'login' && (
          <>
            <SpiralParticles color={color} />
            <FloatingSpheres color={color} />
          </>
        )}
        
        {/* Signup variant - Wave + Rings */}
        {variant === 'signup' && (
          <>
            <WaveParticles color={color} />
            <FloatingRings color={color} />
          </>
        )}
        
        {/* Individual new variants */}
        {variant === 'spiral' && <SpiralParticles color={color} />}
        {variant === 'wave' && <WaveParticles color={color} />}
      </Canvas>
    </div>
  );
};
