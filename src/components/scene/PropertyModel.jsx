// PropertyModel.jsx
// Detailed 3D Architectural Villa Model featuring realistic pool, landscaping,
// interior furniture, glass facades, and evening ambient lighting.

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Sub-component: Columnar Cypress Tree
function CypressTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.6, 8]} />
        <meshStandardMaterial color="#422006" roughness={0.9} />
      </mesh>
      {/* Slender Foliage Cone */}
      <mesh position={[0, 1.1, 0]}>
        <coneGeometry args={[0.22, 1.6, 8]} />
        <meshStandardMaterial color="#14532d" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.16, 1.2, 8]} />
        <meshStandardMaterial color="#166534" roughness={0.75} />
      </mesh>
    </group>
  );
}

// Sub-component: Sculpted Boxwood Bush
function BoxwoodBush({ position, radius = 0.25 }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[radius, 12, 12]} />
      <meshStandardMaterial color="#15803d" roughness={0.85} />
    </mesh>
  );
}

// Sub-component: Poolside Teak Chaise Lounger
function ChaiseLounger({ position, rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Teak Base */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.4, 0.06, 0.9]} />
        <meshStandardMaterial color="#b45309" roughness={0.6} />
      </mesh>
      {/* White Luxury Cushion */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.36, 0.05, 0.86]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.9} />
      </mesh>
      {/* Angled Pillow / Backrest */}
      <mesh position={[0, 0.18, -0.28]} rotation={[-0.45, 0, 0]}>
        <boxGeometry args={[0.36, 0.05, 0.3]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.9} />
      </mesh>
    </group>
  );
}

// Sub-component: Animated Fire Pit Embers
function FirePit({ position }) {
  const flameRef = useRef();

  useFrame(({ clock }) => {
    if (flameRef.current) {
      const t = clock.getElapsedTime() * 4;
      const s = 1 + Math.sin(t) * 0.12 + Math.cos(t * 1.7) * 0.08;
      flameRef.current.scale.set(s, s * 1.1, s);
    }
  });

  return (
    <group position={position}>
      {/* Circular Basalt Basin */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.3, 0.34, 0.2, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      {/* Black Lava Glass Filling */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.04, 16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Glowing Warm Flame Core */}
      <mesh ref={flameRef} position={[0, 0.26, 0]}>
        <coneGeometry args={[0.12, 0.24, 12]} />
        <meshStandardMaterial
          color="#fb923c"
          emissive="#ea580c"
          emissiveIntensity={2.5}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

export default function PropertyModel({ activeFloorId, ...props }) {
  const waterRef = useRef();

  useFrame(({ clock }) => {
    if (waterRef.current) {
      // Gentle surface water ripple
      waterRef.current.position.y = 0.08 + Math.sin(clock.getElapsedTime() * 1.8) * 0.004;
    }
  });

  return (
    <group {...props}>
      {/* ========================================================================= */}
      {/* 0. SITE PLATFORM, INFINITY POOL & SURROUNDING LANDSCAPING                 */}
      {/* ========================================================================= */}
      {/* Main Ground Slab (Dark Slate / Charcoal Landscape) */}
      <mesh position={[0.5, -0.05, 0.2]} receiveShadow>
        <boxGeometry args={[5.2, 0.1, 4.4]} />
        <meshStandardMaterial color="#1a1d24" roughness={0.85} metalness={0.1} />
      </mesh>

      {/* Lawn / Olive Grove Grass Section */}
      <mesh position={[-1.2, 0.01, 0.2]} receiveShadow>
        <boxGeometry args={[1.7, 0.02, 4.0]} />
        <meshStandardMaterial color="#1b3022" roughness={0.9} />
      </mesh>

      {/* Travertine Stone Pool Deck Platform */}
      <mesh position={[1.8, 0.05, 0.8]} receiveShadow>
        <boxGeometry args={[2.2, 0.12, 2.4]} />
        <meshStandardMaterial color="#d6cfc4" roughness={0.5} />
      </mesh>

      {/* Sunken Infinity Pool Basin */}
      <mesh position={[2.0, 0.05, 1.2]} receiveShadow>
        <boxGeometry args={[1.6, 0.08, 1.2]} />
        <meshStandardMaterial color="#0e7490" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Pool Glowing Aquamarine Water Surface */}
      <mesh ref={waterRef} position={[2.0, 0.08, 1.2]}>
        <boxGeometry args={[1.5, 0.02, 1.1]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.65}
          roughness={0.05}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Pool Step Light glow strips */}
      <mesh position={[2.0, 0.09, 1.76]}>
        <boxGeometry args={[1.4, 0.015, 0.02]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.5} />
      </mesh>

      {/* Poolside Chaise Loungers */}
      <ChaiseLounger position={[1.0, 0.11, 0.6]} rotation={[0, 0.4, 0]} />
      <ChaiseLounger position={[1.0, 0.11, 1.2]} rotation={[0, 0.4, 0]} />

      {/* Poolside Cocktail Table */}
      <mesh position={[0.75, 0.18, 0.9]}>
        <cylinderGeometry args={[0.12, 0.12, 0.16, 12]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>

      {/* Sunken Fire Lounge with Fire Pit */}
      <mesh position={[-1.2, 0.04, 1.4]} receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.04, 24]} />
        <meshStandardMaterial color="#2d3340" roughness={0.7} />
      </mesh>
      <FirePit position={[-1.2, 0.04, 1.4]} />

      {/* Modern Paved Driveway leading to garage */}
      <mesh position={[0.9, 0.03, 1.6]} receiveShadow>
        <boxGeometry args={[1.5, 0.02, 1.0]} />
        <meshStandardMaterial color="#333846" roughness={0.7} />
      </mesh>

      {/* Floating In-Ground Pathway Step Lights */}
      {[-0.1, 0.2, 0.5, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.04, 1.8]}>
          <boxGeometry args={[0.2, 0.01, 0.06]} />
          <meshStandardMaterial color="#dfba6c" emissive="#c5a059" emissiveIntensity={1.2} />
        </mesh>
      ))}

      {/* Sculpted Cypress Trees along boundary */}
      <CypressTree position={[-1.8, 0.0, -1.2]} scale={1.2} />
      <CypressTree position={[-1.8, 0.0, -0.4]} scale={1.05} />
      <CypressTree position={[-1.8, 0.0, 0.4]} scale={1.15} />
      <CypressTree position={[-1.8, 0.0, 1.2]} scale={0.95} />
      <CypressTree position={[2.7, 0.0, -1.2]} scale={1.1} />
      <CypressTree position={[2.7, 0.0, -0.4]} scale={0.9} />

      {/* Manicured Boxwood Bushes */}
      <BoxwoodBush position={[-0.4, 0.15, 1.7]} radius={0.16} />
      <BoxwoodBush position={[-0.1, 0.14, 1.75]} radius={0.14} />
      <BoxwoodBush position={[1.8, 0.18, -0.7]} radius={0.2} />
      <BoxwoodBush position={[2.2, 0.18, -0.7]} radius={0.18} />

      {/* ========================================================================= */}
      {/* 1. GROUND LEVEL (Garage, Foyer & Studio)                                   */}
      {/* ========================================================================= */}
      <group name="GroundFloorLevel">
        {/* Main Garage Wall Block (Crisp Off-White Stucco) */}
        <mesh position={[0.9, 0.5, 0.8]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 0.8, 1.6]} />
          <meshStandardMaterial
            color={activeFloorId === 'floor1' ? '#ffffff' : '#f1f5f9'}
            roughness={0.6}
            metalness={0.05}
          />
        </mesh>

        {/* Garage Door with Frosted Glass Horizontal Slits */}
        <mesh position={[0.9, 0.46, 1.61]}>
          <boxGeometry args={[1.4, 0.65, 0.03]} />
          <meshStandardMaterial color="#1e2330" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Garage Frosted Glass Band */}
        <mesh position={[0.9, 0.62, 1.62]}>
          <boxGeometry args={[1.25, 0.08, 0.02]} />
          <meshStandardMaterial
            color="#dfba6c"
            emissive="#c5a059"
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </mesh>

        {/* Dual Tesla Wall Connector EV Chargers inside/beside garage */}
        <mesh position={[1.72, 0.48, 0.9]}>
          <boxGeometry args={[0.04, 0.18, 0.08]} />
          <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.5} />
        </mesh>

        {/* Ground Floor Foyer & Studio (Dark Basalt Stone Facade) */}
        <mesh position={[-0.45, 0.5, 0.4]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.8, 1.6]} />
          <meshStandardMaterial color="#222631" roughness={0.7} metalness={0.2} />
        </mesh>

        {/* Floor-to-Ceiling Studio Panoramic Window with Warm Interior Glow */}
        <mesh position={[-0.5, 0.52, 1.21]}>
          <boxGeometry args={[1.1, 0.56, 0.02]} />
          <meshStandardMaterial
            color="#e2e8f0"
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.6}
          />
        </mesh>
        {/* Interior warm ambient backplane behind glass */}
        <mesh position={[-0.5, 0.52, 1.15]}>
          <boxGeometry args={[1.0, 0.5, 0.02]} />
          <meshStandardMaterial
            color="#fef08a"
            emissive="#eab308"
            emissiveIntensity={0.7}
            roughness={0.8}
          />
        </mesh>

        {/* Luxury Grand Pivot Entrance Door in Natural Teak Wood */}
        <mesh position={[0.15, 0.48, 1.22]} castShadow>
          <boxGeometry args={[0.42, 0.72, 0.04]} />
          <meshStandardMaterial color="#b45309" roughness={0.5} />
        </mesh>
        {/* Vertical Brushed Brass Pull Handle */}
        <mesh position={[0.03, 0.48, 1.25]}>
          <cylinderGeometry args={[0.01, 0.01, 0.36, 8]} />
          <meshStandardMaterial color="#dfba6c" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Sleek Architectural Entry Canopy */}
        <mesh position={[0.15, 0.88, 1.4]} castShadow>
          <boxGeometry args={[0.8, 0.04, 0.5]} />
          <meshStandardMaterial color="#0b0d12" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Recessed Warm Downlight under canopy */}
        <mesh position={[0.15, 0.86, 1.35]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#fde047" emissive="#facc15" emissiveIntensity={2.0} />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 2. SECOND LEVEL (Great Room, Chef Kitchen & Viewing Balcony)              */}
      {/* ========================================================================= */}
      <group name="SecondFloorLevel">
        {/* Floor 2 Cantilevered Structural Concrete Slab with LED Undermount */}
        <mesh position={[0.4, 0.95, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[3.8, 0.1, 2.8]} />
          <meshStandardMaterial
            color={activeFloorId === 'floor2' ? '#1e2330' : '#0f131a'}
            roughness={0.4}
            metalness={0.5}
          />
        </mesh>
        {/* Cantilever Glow Edge */}
        <mesh position={[0.4, 0.9, 1.58]}>
          <boxGeometry args={[3.6, 0.02, 0.02]} />
          <meshStandardMaterial color="#dfba6c" emissive="#c5a059" emissiveIntensity={0.8} />
        </mesh>

        {/* Main Living Volume (Porcelain White Minimalist Volume) */}
        <mesh position={[0.2, 1.4, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.8, 2.0]} />
          <meshStandardMaterial
            color={activeFloorId === 'floor2' ? '#ffffff' : '#f8fafc'}
            roughness={0.5}
            metalness={0.05}
          />
        </mesh>

        {/* Cedar Wood Architectural Slat Accent Wall */}
        <mesh position={[-0.75, 1.4, 1.11]}>
          <boxGeometry args={[0.7, 0.78, 0.03]} />
          <meshStandardMaterial color="#d97706" roughness={0.5} />
        </mesh>

        {/* Expansive Floor-to-Ceiling Living Room Glass Wall */}
        <mesh position={[0.5, 1.4, 1.11]}>
          <boxGeometry args={[1.5, 0.68, 0.02]} />
          <meshStandardMaterial
            color="#e0f2fe"
            roughness={0.05}
            metalness={0.95}
            transparent
            opacity={0.65}
          />
        </mesh>

        {/* Warm Interior Great Room Details (Visible through Glass) */}
        {/* Living Room Sectional Sofa */}
        <mesh position={[0.3, 1.12, 0.6]}>
          <boxGeometry args={[0.7, 0.16, 0.4]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
        {/* Calacatta Quartz Kitchen Waterfall Island */}
        <mesh position={[0.9, 1.2, 0.4]}>
          <boxGeometry args={[0.6, 0.28, 0.3]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Glowing Kitchen Pendant / Cove Light */}
        <mesh position={[0.9, 1.6, 0.4]}>
          <boxGeometry args={[0.5, 0.02, 0.05]} />
          <meshStandardMaterial color="#fef08a" emissive="#eab308" emissiveIntensity={1.8} />
        </mesh>

        {/* Cantilevered Glass Balcony */}
        <mesh position={[1.65, 0.97, 0.1]} receiveShadow>
          <boxGeometry args={[1.2, 0.06, 1.8]} />
          <meshStandardMaterial color="#1a1e27" roughness={0.6} />
        </mesh>
        {/* Balcony Frameless Glass Balustrade */}
        <mesh position={[1.65, 1.18, 1.0]}>
          <boxGeometry args={[1.2, 0.36, 0.02]} />
          <meshStandardMaterial
            color="#bae6fd"
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.45}
          />
        </mesh>
        <mesh position={[2.24, 1.18, 0.1]}>
          <boxGeometry args={[0.02, 0.36, 1.8]} />
          <meshStandardMaterial
            color="#bae6fd"
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.45}
          />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 3. THIRD LEVEL (Master Penthouse Suite & Private Solarium)                */}
      {/* ========================================================================= */}
      <group name="ThirdFloorLevel">
        {/* Floor 3 Structural Slab */}
        <mesh position={[0.5, 1.85, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[3.4, 0.1, 2.6]} />
          <meshStandardMaterial
            color={activeFloorId === 'floor3' ? '#1e2330' : '#0f131a'}
            roughness={0.4}
            metalness={0.5}
          />
        </mesh>

        {/* Master Bedroom Penthouse Box (Dark Titanium Basalt) */}
        <mesh position={[0.0, 2.3, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.8, 1.8]} />
          <meshStandardMaterial
            color={activeFloorId === 'floor3' ? '#2d3340' : '#1e2330'}
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>

        {/* Master Suite Frameless Corner Glass Window */}
        <mesh position={[0.0, 2.3, 1.01]}>
          <boxGeometry args={[1.6, 0.65, 0.02]} />
          <meshStandardMaterial
            color="#e0f2fe"
            roughness={0.05}
            metalness={0.95}
            transparent
            opacity={0.65}
          />
        </mesh>

        {/* Interior King Bed Silhouette with Backlit Headboard */}
        <mesh position={[-0.2, 2.05, 0.4]}>
          <boxGeometry args={[0.6, 0.14, 0.6]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.8} />
        </mesh>
        {/* Glowing Headboard Ambient Light */}
        <mesh position={[-0.2, 2.2, 0.1]}>
          <boxGeometry args={[0.7, 0.22, 0.04]} />
          <meshStandardMaterial color="#fde047" emissive="#facc15" emissiveIntensity={1.2} />
        </mesh>

        {/* Flat Roof Overhang Cap */}
        <mesh position={[0.0, 2.74, 0.1]} castShadow>
          <boxGeometry args={[2.2, 0.08, 2.0]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>

        {/* Private Penthouse Teak Solarium Deck */}
        <mesh position={[1.4, 1.88, 0.2]} receiveShadow>
          <boxGeometry args={[1.5, 0.05, 1.8]} />
          <meshStandardMaterial color="#d97706" roughness={0.6} />
        </mesh>

        {/* Solarium Glass Safety Railings */}
        <mesh position={[1.4, 2.1, 1.09]}>
          <boxGeometry args={[1.5, 0.38, 0.02]} />
          <meshStandardMaterial
            color="#bae6fd"
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.45}
          />
        </mesh>
        <mesh position={[2.14, 2.1, 0.2]}>
          <boxGeometry args={[0.02, 0.38, 1.8]} />
          <meshStandardMaterial
            color="#bae6fd"
            roughness={0.05}
            metalness={0.9}
            transparent
            opacity={0.45}
          />
        </mesh>
      </group>

      {/* ========================================================================= */}
      {/* 4. ROOFTOP SKY PERGOLA & FIRE LOUNGE                                     */}
      {/* ========================================================================= */}
      <group name="RooftopTerrace">
        {/* Architectural Cedar Slatted Pergola Trellis */}
        {[-0.6, -0.3, 0.0, 0.3, 0.6].map((z, idx) => (
          <mesh key={idx} position={[1.4, 2.75, 0.2 + z]} castShadow>
            <boxGeometry args={[1.5, 0.04, 0.08]} />
            <meshStandardMaterial color="#78350f" roughness={0.6} />
          </mesh>
        ))}

        {/* Pergola Dark Steel Support Columns */}
        <mesh position={[2.1, 2.3, -0.6]}>
          <cylinderGeometry args={[0.03, 0.03, 0.9, 12]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[2.1, 2.3, 1.0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.9, 12]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Rooftop Outdoor Sectional Lounge & Cocktail Table */}
        <mesh position={[1.3, 1.98, 0.5]}>
          <boxGeometry args={[0.8, 0.12, 0.4]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        <mesh position={[1.3, 2.02, 0.0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.1, 16]} />
          <meshStandardMaterial color="#c5a059" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}
