import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";

type CockatielProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
};

/**
 * A cute kawaii-style cockatiel (calopsita) made with Three.js primitives
 */
export function Cockatiel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: CockatielProps) {
  const groupRef = useRef<Group>(null);
  const headRef = useRef<Group>(null);
  const wingLeftRef = useRef<Mesh>(null);
  const wingRightRef = useRef<Mesh>(null);
  const tailRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    // Gentle body bobbing
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 2) * 0.02;
    }

    // Head tilting (curious bird behavior)
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 1.5) * 0.1;
      headRef.current.rotation.x = Math.sin(t * 0.8) * 0.05;
    }

    // Wing fluttering
    if (wingLeftRef.current && wingRightRef.current) {
      const wingFlutter = Math.sin(t * 8) * 0.05;
      wingLeftRef.current.rotation.z = 0.3 + wingFlutter;
      wingRightRef.current.rotation.z = -0.3 - wingFlutter;
    }

    // Tail wagging
    if (tailRef.current) {
      tailRef.current.rotation.x = -0.3 + Math.sin(t * 3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Body - main gray/white body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.6} />
      </mesh>

      {/* Belly - lighter/white */}
      <mesh position={[0, -0.02, 0.08]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 0.18, 0.05]}>
        {/* Main head */}
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.5} />
        </mesh>

        {/* Orange cheek patches - signature cockatiel feature! */}
        <mesh position={[0.06, -0.02, 0.05]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color="#ff7f50" roughness={0.4} />
        </mesh>
        <mesh position={[-0.06, -0.02, 0.05]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color="#ff7f50" roughness={0.4} />
        </mesh>

        {/* Yellow face/crest area */}
        <mesh position={[0, 0.02, 0.06]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#ffd700" roughness={0.5} />
        </mesh>

        {/* Crest feathers - the iconic cockatiel mohawk! */}
        <mesh position={[0, 0.12, 0]} rotation={[0.3, 0, 0]}>
          <coneGeometry args={[0.03, 0.12, 8]} />
          <meshStandardMaterial color="#ffd700" roughness={0.5} />
        </mesh>
        <mesh position={[0.02, 0.1, 0]} rotation={[0.2, 0, 0.2]}>
          <coneGeometry args={[0.02, 0.08, 8]} />
          <meshStandardMaterial color="#ffd700" roughness={0.5} />
        </mesh>
        <mesh position={[-0.02, 0.1, 0]} rotation={[0.2, 0, -0.2]}>
          <coneGeometry args={[0.02, 0.08, 8]} />
          <meshStandardMaterial color="#ffd700" roughness={0.5} />
        </mesh>

        {/* Beak */}
        <mesh position={[0, -0.02, 0.1]} rotation={[0.3, 0, 0]}>
          <coneGeometry args={[0.025, 0.05, 8]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.3} />
        </mesh>

        {/* Eyes */}
        <mesh position={[0.04, 0.01, 0.08]}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} />
        </mesh>
        <mesh position={[-0.04, 0.01, 0.08]}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.2} />
        </mesh>

        {/* Eye highlights (kawaii style!) */}
        <mesh position={[0.045, 0.015, 0.095]}>
          <sphereGeometry args={[0.006, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[-0.035, 0.015, 0.095]}>
          <sphereGeometry args={[0.006, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Wings */}
      <mesh ref={wingLeftRef} position={[0.12, 0.02, -0.02]} rotation={[0, 0, 0.3]}>
        <sphereGeometry args={[0.08, 12, 8]} />
        <meshStandardMaterial color="#d3d3d3" roughness={0.6} />
      </mesh>
      <mesh ref={wingRightRef} position={[-0.12, 0.02, -0.02]} rotation={[0, 0, -0.3]}>
        <sphereGeometry args={[0.08, 12, 8]} />
        <meshStandardMaterial color="#d3d3d3" roughness={0.6} />
      </mesh>

      {/* Wing stripes (yellow) */}
      <mesh position={[0.13, 0, -0.02]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.12, 0.02, 0.06]} />
        <meshStandardMaterial color="#ffd700" roughness={0.5} />
      </mesh>
      <mesh position={[-0.13, 0, -0.02]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.12, 0.02, 0.06]} />
        <meshStandardMaterial color="#ffd700" roughness={0.5} />
      </mesh>

      {/* Tail */}
      <mesh ref={tailRef} position={[0, -0.08, -0.12]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.06, 0.02, 0.2]} />
        <meshStandardMaterial color="#c0c0c0" roughness={0.6} />
      </mesh>

      {/* Feet */}
      <mesh position={[0.04, -0.16, 0.02]}>
        <cylinderGeometry args={[0.015, 0.01, 0.05, 8]} />
        <meshStandardMaterial color="#ffa07a" roughness={0.4} />
      </mesh>
      <mesh position={[-0.04, -0.16, 0.02]}>
        <cylinderGeometry args={[0.015, 0.01, 0.05, 8]} />
        <meshStandardMaterial color="#ffa07a" roughness={0.4} />
      </mesh>

      {/* Toes */}
      <mesh position={[0.04, -0.18, 0.04]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.02, 0.01, 0.03]} />
        <meshStandardMaterial color="#ffa07a" roughness={0.4} />
      </mesh>
      <mesh position={[-0.04, -0.18, 0.04]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.02, 0.01, 0.03]} />
        <meshStandardMaterial color="#ffa07a" roughness={0.4} />
      </mesh>
    </group>
  );
}
