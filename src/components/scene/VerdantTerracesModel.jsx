// VerdantTerracesModel.jsx
// 3D Architectural Model for "Verdant Terraces Estate" (Property 2).
// Built entirely with Three.js primitive shapes (boxes, cylinders, spheres).
//
// Key Architectural Features:
// 1. Biophilic Stepped Terraces: Three cascading levels adorned with lush perimeter planters.
// 2. Reflecting Pool & Stepping Stones: Calming water basin with submerged travertine walking pavers.
// 3. Natural Cedar Louvers: Vertical wooden shading fins providing warm organic texture.
// 4. Japanese Tea Pavilion: Slender timber pergola on the rooftop green lawn.
// 5. Active Floor Highlights: Glows subtly when a specific level is clicked or selected.

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Sub-component: Columnar Cypress / Pine Tree
function ArchitecturalTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Wood Trunk */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.04, 0.07, 0.7, 8]} />
        <meshStandardMaterial color="#3e2723" roughness={0.9} />
      </mesh>
      {/* Lower Foliage Tier */}
      <mesh position={[0, 1.1, 0]}>
        <coneGeometry args={[0.26, 1.5, 8]} />
        <meshStandardMaterial color="#1b4332" roughness={0.8} />
      </mesh>
      {/* Upper Foliage Tip */}
      <mesh position={[0, 1.6, 0]}>
        <coneGeometry args={[0.18, 1.1, 8]} />
        <meshStandardMaterial color="#2d6a4f" roughness={0.75} />
      </mesh>
    </group>
  );
}

// Sub-component: Planter Box with Lush Cascading Greenery
function TerracePlanter({ position, size = [1.2, 0.15, 0.25], plantColor = '#2d6a4f' }) {
  return (
    <group position={position}>
      {/* Concrete Planter Trough */}
      <mesh position={[0, size[1] / 2, 0]} castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#374151" roughness={0.8} />
      </mesh>
      {/* Cascading Green Hedge / Foliage */}
      <mesh position={[0, size[1] + 0.06, 0]}>
        <boxGeometry args={[size[0] * 0.94, 0.14, size[2] * 0.88]} />
        <meshStandardMaterial color={plantColor} roughness={0.9} />
      </mesh>
    </group>
  );
}

// Sub-component: Vertical Wooden Cedar Louver / Slat Grid
function CedarLouvers({ position, count = 6, height = 0.8, spacing = 0.08 }) {
  return (
    <group position={position}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[(i - (count - 1) / 2) * spacing, height / 2, 0]}>
          <boxGeometry args={[0.02, height, 0.06]} />
          <meshStandardMaterial color="#b45309" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// Sub-component: Flickering Ambient Fire Bowl
function FireBowl({ position }) {
  const flameRef = useRef();

  useFrame(({ clock }) => {
    if (flameRef.current) {
      const t = clock.getElapsedTime() * 4.5;
      const scale = 1 + Math.sin(t) * 0.15 + Math.cos(t * 1.8) * 0.1;
      flameRef.current.scale.set(scale, scale * 1.15, scale);
    }
  });

  return (
    <group position={position}>
      {/* Basalt Stone Pedestal Bowl */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.16, 16]} />
        <meshStandardMaterial color="#1f2937" roughness={0.8} />
      </mesh>
      {/* Burning Ember Flame */}
      <mesh ref={flameRef} position={[0, 0.2, 0]}>
        <coneGeometry args={[0.09, 0.2, 10]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f97316"
          emissiveIntensity={2.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

export default function VerdantTerracesModel({ activeFloorId, ...props }) {
  const waterRef = useRef();

  // Subtle ripple motion on reflecting water
  useFrame(({ clock }) => {
    if (waterRef.current) {
      waterRef.current.position.y = 0.07 + Math.sin(clock.getElapsedTime() * 1.6) * 0.003;
    }
  });

  return (
    <group {...props}>
      {/* ========================================================================= */}
      {/* 1. GROUND PLATFORM & REFLECTING WATER                                      */}
      {/* ========================================================================= */}
      {/* Base Slate Terrain */}
      <mesh position={[0.4, -0.05, 0.2]} receiveShadow>
        <boxGeometry args={[5.2, 0.1, 4.4]} />
        <meshStandardMaterial color="#1a1d24" roughness={0.9} />
      </mesh>

      {/* Travertine Stone Terrace Walkway */}
      <mesh position={[-0.8, 0.02, 0.2]} receiveShadow>
        <boxGeometry args={[2.0, 0.04, 3.8]} />
        <meshStandardMaterial color="#374151" roughness={0.85} />
      </mesh>

      {/* Calm Water Reflection Basin */}
      <mesh position={[1.8, 0.04, 0.7]} receiveShadow>
        <boxGeometry args={[2.0, 0.08, 2.2]} />
        <meshStandardMaterial color="#0f766e" roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Animated Reflection Water Surface */}
      <mesh
        ref={waterRef}
        position={[1.8, 0.07, 0.7]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[1.92, 2.12]} />
        <meshStandardMaterial
          color="#14b8a6"
          roughness={0.1}
          metalness={0.85}
          transparent
          opacity={0.82}
        />
      </mesh>

      {/* Floating Travertine Stepping Stones across Water */}
      {[-0.5, 0, 0.5].map((z, idx) => (
        <mesh key={idx} position={[1.8, 0.09, 0.7 + z]}>
          <boxGeometry args={[0.45, 0.04, 0.35]} />
          <meshStandardMaterial color="#e5e7eb" roughness={0.6} />
        </mesh>
      ))}

      {/* Lush Surrounding Trees */}
      <ArchitecturalTree position={[-1.7, 0, -1.2]} scale={1.05} />
      <ArchitecturalTree position={[-1.6, 0, 1.4]} scale={0.95} />
      <ArchitecturalTree position={[2.6, 0, -1.3]} scale={1.1} />

      {/* ========================================================================= */}
      {/* 2. LEVEL 1: GARDEN SPA & 3-CAR SHOWCASE GARAGE (vt-floor1)                 */}
      {/* ========================================================================= */}
      <group>
        {/* Main Level 1 Mass (Warm Limestone Tone) */}
        <mesh position={[0.2, 0.4, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[2.6, 0.75, 2.8]} />
          <meshStandardMaterial color="#d1d5db" roughness={0.5} />
        </mesh>

        {/* 3-Car Garage Frosted Glass Door Accent */}
        <mesh position={[0.2, 0.35, 1.61]}>
          <boxGeometry args={[2.0, 0.6, 0.04]} />
          <meshStandardMaterial color="#1f2937" roughness={0.4} metalness={0.7} />
        </mesh>

        {/* Level 1 Garden Spa Glass Window */}
        <mesh position={[1.51, 0.4, 0.4]}>
          <boxGeometry args={[0.04, 0.55, 1.2]} />
          <meshStandardMaterial
            color="#93c5fd"
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.45}
          />
        </mesh>

        {/* Vertical Cedar Louvers alongside Glass */}
        <CedarLouvers position={[1.54, 0.12, 0.4]} count={5} height={0.55} spacing={0.16} />

        {/* Level 1 Highlight Wireframe when selected */}
        {activeFloorId === 'vt-floor1' && (
          <mesh position={[0.2, 0.4, 0.2]}>
            <boxGeometry args={[2.65, 0.8, 2.85]} />
            <meshBasicMaterial color="#d28574" wireframe />
          </mesh>
        )}
      </group>

      {/* ========================================================================= */}
      {/* 3. LEVEL 2: BIOPHILIC LIVING PAVILION & TERRACE (vt-floor2)               */}
      {/* ========================================================================= */}
      <group position={[0, 0.78, 0]}>
        {/* Cantilevered Level 2 Floor Slab */}
        <mesh position={[0.3, 0.38, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.75, 2.6]} />
          <meshStandardMaterial color="#f3f4f6" roughness={0.4} />
        </mesh>

        {/* Floor-to-Ceiling Glass Walls */}
        <mesh position={[1.71, 0.4, 0.1]}>
          <boxGeometry args={[0.04, 0.6, 2.0]} />
          <meshStandardMaterial
            color="#bfdbfe"
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Living Room Interior: Sectional Sofa */}
        <mesh position={[0.8, 0.2, 0.2]}>
          <boxGeometry args={[0.5, 0.15, 0.9]} />
          <meshStandardMaterial color="#4b5563" roughness={0.9} />
        </mesh>
        <mesh position={[0.8, 0.3, -0.2]}>
          <boxGeometry args={[0.5, 0.25, 0.2]} />
          <meshStandardMaterial color="#374151" roughness={0.9} />
        </mesh>

        {/* Stepped Perimeter Planter with Cascading Greenery */}
        <TerracePlanter position={[0.3, 0.78, 1.42]} size={[2.6, 0.15, 0.2]} />
        <TerracePlanter position={[1.72, 0.78, 0.1]} size={[0.2, 0.15, 2.2]} />

        {/* Level 2 Highlight Wireframe */}
        {activeFloorId === 'vt-floor2' && (
          <mesh position={[0.3, 0.38, 0.1]}>
            <boxGeometry args={[2.85, 0.8, 2.65]} />
            <meshBasicMaterial color="#d28574" wireframe />
          </mesh>
        )}
      </group>

      {/* ========================================================================= */}
      {/* 4. LEVEL 3: MASTER SKY SUITE & HANGING GARDENS (vt-floor3)                */}
      {/* ========================================================================= */}
      <group position={[0, 1.56, 0]}>
        {/* Recessed Master Penthouse Mass */}
        <mesh position={[0.1, 0.36, -0.1]} castShadow receiveShadow>
          <boxGeometry args={[2.3, 0.72, 2.1]} />
          <meshStandardMaterial color="#e5e7eb" roughness={0.45} />
        </mesh>

        {/* Master Bedroom Glass Wall */}
        <mesh position={[1.26, 0.36, -0.1]}>
          <boxGeometry args={[0.04, 0.58, 1.6]} />
          <meshStandardMaterial
            color="#bfdbfe"
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.45}
          />
        </mesh>

        {/* Master Suite Bed Interior */}
        <mesh position={[0.4, 0.18, -0.1]}>
          <boxGeometry args={[0.65, 0.15, 0.7]} />
          <meshStandardMaterial color="#f9fafb" roughness={0.9} />
        </mesh>

        {/* Natural Cedar Shading Fins on Side */}
        <CedarLouvers position={[0.1, 0.1, 0.96]} count={7} height={0.58} spacing={0.14} />

        {/* Hanging Terrace Planter */}
        <TerracePlanter position={[0.1, 0.74, 0.96]} size={[2.1, 0.14, 0.18]} />

        {/* Level 3 Highlight Wireframe */}
        {activeFloorId === 'vt-floor3' && (
          <mesh position={[0.1, 0.36, -0.1]}>
            <boxGeometry args={[2.35, 0.76, 2.15]} />
            <meshBasicMaterial color="#d28574" wireframe />
          </mesh>
        )}
      </group>

      {/* ========================================================================= */}
      {/* 5. ROOFTOP: TEA PAVILION & SKY OBSERVATORY (vt-roof)                       */}
      {/* ========================================================================= */}
      <group position={[0, 2.32, 0]}>
        {/* Green Sedum Living Lawn Patch */}
        <mesh position={[-0.2, 0.02, -0.2]}>
          <boxGeometry args={[1.5, 0.04, 1.4]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>

        {/* Teak Wood Tea Deck Platform */}
        <mesh position={[0.5, 0.02, -0.1]}>
          <boxGeometry args={[1.1, 0.05, 1.2]} />
          <meshStandardMaterial color="#b45309" roughness={0.7} />
        </mesh>

        {/* Tea Pavilion Slender Wood Posts */}
        {[-0.45, 0.45].map((x, i) =>
          [-0.45, 0.45].map((z, j) => (
            <mesh key={`${i}-${j}`} position={[0.5 + x, 0.32, -0.1 + z]}>
              <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
              <meshStandardMaterial color="#78350f" roughness={0.7} />
            </mesh>
          ))
        )}

        {/* Slatted Cedar Pergola Roof Canopy */}
        <mesh position={[0.5, 0.64, -0.1]}>
          <boxGeometry args={[1.2, 0.04, 1.3]} />
          <meshStandardMaterial color="#92400e" roughness={0.6} />
        </mesh>

        {/* Ambient Fire Bowl for Evening Warmth */}
        <FireBowl position={[-0.3, 0.04, 0.3]} />

        {/* Rooftop Highlight Wireframe */}
        {activeFloorId === 'vt-roof' && (
          <mesh position={[0.1, 0.28, -0.1]}>
            <boxGeometry args={[2.1, 0.65, 1.8]} />
            <meshBasicMaterial color="#d28574" wireframe />
          </mesh>
        )}
      </group>
    </group>
  );
}
