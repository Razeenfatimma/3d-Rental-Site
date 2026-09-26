// GlassPavilionModel.jsx
// 3D Architectural Model for "The Horizon Glass Pavilion" (Property 3).
// Built entirely with Three.js primitive shapes (boxes, cylinders, planes).
//
// Key Architectural Features:
// 1. Matte Black Structural Steel Frame: Crisp, weightless cantilevered modernist pavilion.
// 2. Sunken Conversation Fire Lounge: Recessed outdoor seating pit with animated glowing fire basin.
// 3. Linear Reflection Water Moat: Perimeter water channel with animated ripples reflecting the facade.
// 4. Frameless Curtain Glass: Large-format glass facades revealing interior architectural spaces.
// 5. Active Floor Highlights: Wireframe glow indicating which level is currently selected.

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Sub-component: Sunken Conversation Fire Pit with Animated Flame
function SunkenFireLounge({ position }) {
  const flameRef = useRef();

  useFrame(({ clock }) => {
    if (flameRef.current) {
      const t = clock.getElapsedTime() * 5;
      const s = 1 + Math.sin(t) * 0.16 + Math.cos(t * 2.2) * 0.08;
      flameRef.current.scale.set(s, s * 1.2, s);
    }
  });

  return (
    <group position={position}>
      {/* Sunken Outer Pit Basin (Dark Basalt Stone) */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[1.6, 0.1, 1.4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} />
      </mesh>

      {/* Sunken Floor */}
      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[1.4, 0.04, 1.2]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>

      {/* U-Shaped Luxury White Cushion Seating */}
      {/* Back Couch */}
      <mesh position={[-0.45, 0.08, 0]}>
        <boxGeometry args={[0.3, 0.12, 1.0]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.9} />
      </mesh>
      {/* Left Wing */}
      <mesh position={[0, 0.08, -0.42]}>
        <boxGeometry args={[0.7, 0.12, 0.28]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.9} />
      </mesh>
      {/* Right Wing */}
      <mesh position={[0, 0.08, 0.42]}>
        <boxGeometry args={[0.7, 0.12, 0.28]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.9} />
      </mesh>

      {/* Linear Black Granite Fire Basin */}
      <mesh position={[0.1, 0.06, 0]}>
        <boxGeometry args={[0.4, 0.08, 0.5]} />
        <meshStandardMaterial color="#020617" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Flickering Warm Fire Flame */}
      <mesh ref={flameRef} position={[0.1, 0.14, 0]}>
        <coneGeometry args={[0.1, 0.22, 12]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#ea580c"
          emissiveIntensity={3.0}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

// Sub-component: Sculpted Modernist Olive Tree
function ModernistTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Slender Angled Trunk */}
      <mesh position={[0, 0.35, 0]} rotation={[0.08, 0.1, -0.05]}>
        <cylinderGeometry args={[0.04, 0.06, 0.7, 8]} />
        <meshStandardMaterial color="#475569" roughness={0.9} />
      </mesh>
      {/* Cloud-Pruned Foliage Spheres */}
      <mesh position={[-0.1, 0.85, 0]}>
        <sphereGeometry args={[0.26, 12, 12]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>
      <mesh position={[0.12, 1.05, 0.08]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshStandardMaterial color="#475569" roughness={0.75} />
      </mesh>
      <mesh position={[0, 1.25, -0.06]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color="#64748b" roughness={0.7} />
      </mesh>
    </group>
  );
}

// Sub-component: Structural Black Steel Column
function SteelColumn({ position, height = 0.75 }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.06, height, 0.06]} />
      <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.9} />
    </mesh>
  );
}

export default function GlassPavilionModel({ activeFloorId, ...props }) {
  const moatWaterRef = useRef();

  // Water gentle reflective wave animation
  useFrame(({ clock }) => {
    if (moatWaterRef.current) {
      moatWaterRef.current.position.y = 0.07 + Math.sin(clock.getElapsedTime() * 1.7) * 0.003;
    }
  });

  return (
    <group {...props}>
      {/* ========================================================================= */}
      {/* 1. GROUND PLATFORM, MOAT & SUNKEN FIRE LOUNGE                              */}
      {/* ========================================================================= */}
      {/* Main Base Foundation (Dark Graphite Slab) */}
      <mesh position={[0.4, -0.05, 0.2]} receiveShadow>
        <boxGeometry args={[5.2, 0.1, 4.4]} />
        <meshStandardMaterial color="#0b0f17" roughness={0.9} />
      </mesh>

      {/* Travertine & Concrete Motor Court */}
      <mesh position={[-0.9, 0.02, 0.2]} receiveShadow>
        <boxGeometry args={[1.8, 0.04, 3.8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* Long Linear Reflection Water Moat */}
      <mesh position={[1.8, 0.03, 0.8]} receiveShadow>
        <boxGeometry args={[2.0, 0.06, 2.4]} />
        <meshStandardMaterial color="#0369a1" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Animated Moat Water Surface */}
      <mesh
        ref={moatWaterRef}
        position={[1.8, 0.06, 0.8]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[1.94, 2.34]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.08}
          metalness={0.9}
          transparent
          opacity={0.78}
        />
      </mesh>

      {/* Sunken Outdoor Conversation Lounge */}
      <SunkenFireLounge position={[1.8, 0.08, -0.7]} />

      {/* Sculpted Olive Trees */}
      <ModernistTree position={[-1.7, 0, -1.2]} scale={1.1} />
      <ModernistTree position={[-1.6, 0, 1.4]} scale={0.95} />

      {/* ========================================================================= */}
      {/* 2. LEVEL 1: COLLECTOR GARAGE (gp-floor1)                                 */}
      {/* ========================================================================= */}
      <group>
        {/* Main Level 1 Mass (Dark Polished Basalt & Steel) */}
        <mesh position={[0.1, 0.4, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[2.7, 0.75, 2.7]} />
          <meshStandardMaterial color="#1e2430" roughness={0.5} metalness={0.3} />
        </mesh>

        {/* 4-Car Smoked Glass Garage Portal */}
        <mesh position={[0.1, 0.35, 1.56]}>
          <boxGeometry args={[2.2, 0.58, 0.04]} />
          <meshStandardMaterial
            color="#334155"
            roughness={0.2}
            metalness={0.85}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Structural Steel Exoskeleton Columns */}
        <SteelColumn position={[1.48, 0.4, 1.5]} height={0.75} />
        <SteelColumn position={[1.48, 0.4, -1.1]} height={0.75} />
        <SteelColumn position={[-1.22, 0.4, 1.5]} height={0.75} />

        {/* Level 1 Highlight Wireframe */}
        {activeFloorId === 'gp-floor1' && (
          <mesh position={[0.1, 0.4, 0.2]}>
            <boxGeometry args={[2.75, 0.8, 2.75]} />
            <meshBasicMaterial color="#d28574" wireframe />
          </mesh>
        )}
      </group>

      {/* ========================================================================= */}
      {/* 3. LEVEL 2: GLASS GREAT HALL & CANTILEVER (gp-floor2)                     */}
      {/* ========================================================================= */}
      <group position={[0, 0.78, 0]}>
        {/* Cantilevered Glass Floor Volume extending forward */}
        <mesh position={[0.3, 0.38, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[2.9, 0.75, 2.7]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Full-Height Panoramic Glass Curtain Walls */}
        <mesh position={[1.76, 0.38, 0.1]}>
          <boxGeometry args={[0.04, 0.62, 2.3]} />
          <meshStandardMaterial
            color="#bae6fd"
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.35}
          />
        </mesh>
        <mesh position={[0.3, 0.38, 1.46]}>
          <boxGeometry args={[2.7, 0.62, 0.04]} />
          <meshStandardMaterial
            color="#bae6fd"
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Interior: Minimalist Matte Black Dining & Kitchen Island */}
        <mesh position={[0.6, 0.2, 0.2]}>
          <boxGeometry args={[0.4, 0.18, 1.1]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* Cantilever Hover Support Beam */}
        <mesh position={[1.65, 0.02, 0.1]}>
          <boxGeometry args={[0.2, 0.06, 2.5]} />
          <meshStandardMaterial color="#020617" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Level 2 Highlight Wireframe */}
        {activeFloorId === 'gp-floor2' && (
          <mesh position={[0.3, 0.38, 0.1]}>
            <boxGeometry args={[2.95, 0.8, 2.75]} />
            <meshBasicMaterial color="#d28574" wireframe />
          </mesh>
        )}
      </group>

      {/* ========================================================================= */}
      {/* 4. LEVEL 3: CANTILEVERED HORIZON MASTER WING (gp-floor3)                  */}
      {/* ========================================================================= */}
      <group position={[0, 1.56, 0]}>
        {/* Dramatic 20-ft Steel Cantilever Wing extending toward sunset */}
        <mesh position={[0.4, 0.36, -0.05]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.72, 2.2]} />
          <meshStandardMaterial color="#181e29" roughness={0.4} metalness={0.5} />
        </mesh>

        {/* Frameless Corner Master Glass */}
        <mesh position={[1.66, 0.36, -0.05]}>
          <boxGeometry args={[0.04, 0.58, 1.8]} />
          <meshStandardMaterial
            color="#e0f2fe"
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.38}
          />
        </mesh>

        {/* Master Bed Platform */}
        <mesh position={[0.5, 0.18, -0.05]}>
          <boxGeometry args={[0.7, 0.14, 0.75]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.9} />
        </mesh>

        {/* Structural Steel Header Band */}
        <mesh position={[0.4, 0.73, -0.05]}>
          <boxGeometry args={[2.55, 0.06, 2.25]} />
          <meshStandardMaterial color="#020617" roughness={0.2} metalness={0.95} />
        </mesh>

        {/* Level 3 Highlight Wireframe */}
        {activeFloorId === 'gp-floor3' && (
          <mesh position={[0.4, 0.36, -0.05]}>
            <boxGeometry args={[2.55, 0.76, 2.25]} />
            <meshBasicMaterial color="#d28574" wireframe />
          </mesh>
        )}
      </group>

      {/* ========================================================================= */}
      {/* 5. ROOFTOP: HORIZON STARLIGHT DECK & SKY BAR (gp-roof)                     */}
      {/* ========================================================================= */}
      <group position={[0, 2.32, 0]}>
        {/* Floating Granite Rooftop Deck */}
        <mesh position={[0.2, 0.02, -0.1]}>
          <boxGeometry args={[1.8, 0.05, 1.6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>

        {/* Minimalist Matte-Black Steel Sun Pergola */}
        {[-0.6, 0.6].map((x, i) =>
          [-0.5, 0.5].map((z, j) => (
            <mesh key={`${i}-${j}`} position={[0.2 + x, 0.3, -0.1 + z]}>
              <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
              <meshStandardMaterial color="#020617" roughness={0.3} metalness={0.9} />
            </mesh>
          ))
        )}
        <mesh position={[0.2, 0.61, -0.1]}>
          <boxGeometry args={[1.4, 0.03, 1.2]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Linear Black Granite Starlight Fireplace */}
        <mesh position={[0.2, 0.1, -0.6]}>
          <boxGeometry args={[0.8, 0.16, 0.18]} />
          <meshStandardMaterial color="#020617" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Rooftop Highlight Wireframe */}
        {activeFloorId === 'gp-roof' && (
          <mesh position={[0.2, 0.28, -0.1]}>
            <boxGeometry args={[2.0, 0.65, 1.8]} />
            <meshBasicMaterial color="#d28574" wireframe />
          </mesh>
        )}
      </group>
    </group>
  );
}
