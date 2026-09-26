// RoomHotspot.jsx
// Interactive 3D clickable hotspot with pulsing beacon and luxury rose badge:
// "● Roof Terrace", "● Bedroom", "● Living Area", "● Garage"

import { useState, useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function RoomHotspot({ position, label, onClick, isSelected }) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef();

  // Subtle pulsing animation on the beacon ring
  useFrame(({ clock }) => {
    if (ringRef.current) {
      const t = clock.getElapsedTime() * 3;
      const s = 1 + Math.sin(t) * 0.18;
      ringRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={position}>
      {/* Clickable 3D beacon center sphere */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[hovered || isSelected ? 0.085 : 0.065, 24, 24]} />
        <meshStandardMaterial
          color={isSelected ? '#ffffff' : hovered ? '#e08f7e' : '#d28574'}
          emissive={isSelected ? '#d28574' : hovered ? '#be7463' : '#d28574'}
          emissiveIntensity={isSelected || hovered ? 2.2 : 1.2}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* Pulsing Outer Glow Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.09, 0.14, 32]} />
        <meshBasicMaterial
          color={isSelected ? '#d28574' : hovered ? '#e08f7e' : '#d28574'}
          transparent
          opacity={isSelected ? 0.95 : hovered ? 0.85 : 0.55}
          side={2}
        />
      </mesh>

      {/* Floating 3D Label Pill */}
      <Html
        position={[0.16, 0.06, 0]}
        center={false}
        style={{
          userSelect: 'none',
          pointerEvents: 'auto',
          cursor: 'pointer',
        }}
      >
        <div
          className={`scene-hotspot-badge ${isSelected ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: isSelected ? '#ffffff' : '#d28574',
              boxShadow: isSelected ? '0 0 8px #ffffff' : '0 0 6px rgba(210, 133, 116, 0.9)',
              display: 'inline-block',
            }}
          />
          <span className="fw-semibold tracking-wide">{label}</span>
        </div>
      </Html>
    </group>
  );
}
