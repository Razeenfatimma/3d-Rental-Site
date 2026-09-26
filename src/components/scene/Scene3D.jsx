// Scene3D.jsx
// Main 3D viewport in Luxury Soft (Cream + Blush Rose + Charcoal) design system.
//
// New Features Added:
// 1. Multi-Property Support: Dynamically renders 1 of 3 architectural models (Villa Lumina, Verdant Terraces, Glass Pavilion).
// 2. Navigation Arrows & Dots: Left/Right buttons and pagination indicator (1 of 3, 2 of 3, 3 of 3).
// 3. Touch Swipe Gesture Support: Detects left/right finger swipes on mobile devices to switch properties.
// 4. Property-Specific Hotspots & Controls: Updates 3D pins, floor pills, camera focus, and specs for the active property.

import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Box, RotateCcw, Plus, Minus, Maximize2, ExternalLink, X } from 'lucide-react';

// 3D Property Models
import PropertyModel from './PropertyModel';
import VerdantTerracesModel from './VerdantTerracesModel';
import GlassPavilionModel from './GlassPavilionModel';

// Scene Interactive Controls
import RoomHotspot from './RoomHotspot';
import CameraController from './CameraController';
import FloorCallout from './FloorCallout';
import PropertyNavigator from './PropertyNavigator';

// Data Registries
import { propertiesData } from '../../data/propertyData';
import { propertiesRooms, rooms as defaultRooms } from '../../data/roomsData';

export default function Scene3D({
  activePropertyIndex = 0,
  onChangeProperty,
  activeFloorId,
  onSelectFloor,
  onOpenRoomModal,
  currentProperty: externalProperty,
  currentRooms: externalRooms,
}) {
  // Fallbacks if not passed directly from parent
  const propertyIndex = activePropertyIndex;
  const currentProperty =
    externalProperty || propertiesData[propertyIndex] || propertiesData[0];
  const roomsList =
    externalRooms || propertiesRooms[currentProperty.id] || defaultRooms;

  // Local state for active floor if parent doesn't manage it
  const [internalFloor, setInternalFloor] = useState(null);
  const containerRef = useRef(null);
  const controlsRef = useRef(null);

  // Touch swipe tracking refs
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchDeltaX = useRef(0);

  const currentFloorId = activeFloorId !== undefined ? activeFloorId : internalFloor;

  // Floor selection handler
  const handleSelect = (id) => {
    if (onSelectFloor) {
      onSelectFloor(id);
    } else {
      setInternalFloor(id);
    }
  };

  // Find currently active room object
  const selectedRoom = roomsList.find((r) => r.id === currentFloorId) || null;

  // Property navigation handlers
  const handlePrevProperty = () => {
    if (onChangeProperty) {
      const prevIdx = (propertyIndex - 1 + propertiesData.length) % propertiesData.length;
      onChangeProperty(prevIdx);
    }
  };

  const handleNextProperty = () => {
    if (onChangeProperty) {
      const nextIdx = (propertyIndex + 1) % propertiesData.length;
      onChangeProperty(nextIdx);
    }
  };

  const handleSelectProperty = (idx) => {
    if (onChangeProperty) {
      onChangeProperty(idx);
    }
  };

  // =========================================================================
  // TOUCH SWIPE DETECTION
  // =========================================================================
  // Allows users on mobile or touchscreens to swipe left/right between properties
  const handleTouchStart = (e) => {
    // Only detect single-finger swipe to avoid interfering with two-finger zoom
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      touchDeltaX.current = 0;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    }
  };

  const handleTouchEnd = (e) => {
    const deltaX = touchDeltaX.current;
    const swipeThreshold = 65; // Minimum pixels moved to trigger property change

    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX < 0) {
        // Swiped Left -> Go to Next Property
        handleNextProperty();
      } else {
        // Swiped Right -> Go to Previous Property
        handlePrevProperty();
      }
    }

    // Reset touch tracker
    touchDeltaX.current = 0;
  };

  // =========================================================================
  // KEYBOARD ARROW NAVIGATION
  // =========================================================================
  // Optional keyboard navigation when hovering or focusing on the 3D scene
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only navigate if container is focused or hovered
      if (containerRef.current && containerRef.current.contains(document.activeElement)) {
        if (e.key === 'ArrowLeft') {
          handlePrevProperty();
        } else if (e.key === 'ArrowRight') {
          handleNextProperty();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [propertyIndex]);

  // Zoom controls
  const handleZoomIn = () => {
    if (controlsRef.current) {
      const controls = controlsRef.current;
      const camera = controls.object;
      const target = controls.target;
      camera.position.lerp(target, 0.22);
      controls.update();
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      const controls = controlsRef.current;
      const camera = controls.object;
      const target = controls.target;
      const dir = camera.position.clone().sub(target).multiplyScalar(1.22);
      camera.position.copy(target).add(dir);
      controls.update();
    }
  };

  const handleFullscreenToggle = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  // Helper to render the appropriate 3D model component based on modelType
  const renderPropertyModel = () => {
    switch (currentProperty.modelType) {
      case 'verdant-terraces':
        return <VerdantTerracesModel activeFloorId={currentFloorId} scale={1} />;
      case 'glass-pavilion':
        return <GlassPavilionModel activeFloorId={currentFloorId} scale={1} />;
      case 'villa-lumina':
      default:
        return <PropertyModel activeFloorId={currentFloorId} scale={1} />;
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full rounded-2xl overflow-hidden shadow-2xl border focus:outline-none"
      style={{
        height: '560px',
        backgroundColor: '#16181d',
        borderColor: 'rgba(210, 133, 116, 0.25)',
        boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.4), 0 0 25px rgba(210, 133, 116, 0.08)',
      }}
    >
      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{
          position: [5, 4.2, 5],
          fov: 44,
        }}
        shadows
      >
        {/* Soft cool and warm atmospheric balance */}
        <ambientLight intensity={0.95} color="#ffffff" />

        {/* Warm golden architectural dusk sun light */}
        <directionalLight
          position={[10, 12, 8]}
          intensity={2.0}
          color="#fff5ea"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Soft cool ambient fill representing dusk sky */}
        <directionalLight
          position={[-6, 6, -5]}
          intensity={0.65}
          color="#93c5fd"
        />

        {/* Architectural 3D House Model (dynamically switched based on active property) */}
        {renderPropertyModel()}

        {/* Clickable 3D hotspots specific to the active property */}
        {roomsList.map((room) => (
          <RoomHotspot
            key={room.id}
            position={room.position}
            label={room.hotspotLabel || room.name}
            isSelected={currentFloorId === room.id}
            onClick={() => handleSelect(currentFloorId === room.id ? null : room.id)}
          />
        ))}

        {/* Smooth camera glide controller */}
        <CameraController
          activeRoom={selectedRoom}
          resetKey={propertyIndex}
          controlsRef={controlsRef}
        />

        {/* Connecting indicator leader line */}
        {selectedRoom && (
          <FloorCallout room={selectedRoom} />
        )}

        {/* Orbit, pan, and zoom controls */}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.06}
          minDistance={2.2}
          maxDistance={12}
          maxPolarAngle={Math.PI / 2 - 0.04}
        />
      </Canvas>

      {/* ========================================================================= */}
      {/* 2D HUD OVERLAYS (LUXURY SOFT SYSTEM)                                     */}
      {/* ========================================================================= */}

      {/* Top Left: ⬡ 3D Interactive Explorer Badge */}
      <div className="absolute top-0 left-0 p-4 pointer-events-none z-10">
        <div
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-white pointer-events-auto border"
          style={{
            backgroundColor: 'rgba(22, 24, 29, 0.88)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(210, 133, 116, 0.35)',
            fontSize: '12px',
            fontWeight: '600',
          }}
        >
          <Box size={14} style={{ color: '#d28574' }} />
          <span className="tracking-wide">Interactive 3D Explorer</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Top Center: Multi-Property Navigator (Left/Right Arrows, Dots 1 of 3) */}
      <PropertyNavigator
        properties={propertiesData}
        currentIndex={propertyIndex}
        onSelectProperty={handleSelectProperty}
        onPrevProperty={handlePrevProperty}
        onNextProperty={handleNextProperty}
      />

      {/* Top Right: ⟲ Reset Overview button */}
      <div className="absolute top-0 right-0 p-4 z-10">
        <button
          type="button"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-white/90 hover:text-white transition border"
          style={{
            backgroundColor: 'rgba(22, 24, 29, 0.88)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            fontSize: '12px',
            fontWeight: '500',
          }}
          onClick={() => handleSelect(null)}
          title="Reset to Full Property Overview"
        >
          <RotateCcw size={13} style={{ color: '#d28574' }} />
          <span className="hidden sm:inline">Reset View</span>
        </button>
      </div>

      {/* Floating Room Info Card HUD (When a room/floor is active) */}
      {selectedRoom && (
        <div className="absolute top-16 left-4 right-4 sm:right-auto sm:w-80 pointer-events-none z-20">
          <div
            className="p-3.5 rounded-xl border pointer-events-auto transition-all duration-300 shadow-2xl"
            style={{
              backgroundColor: 'rgba(24, 26, 32, 0.94)',
              backdropFilter: 'blur(16px)',
              borderColor: 'rgba(210, 133, 116, 0.45)',
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.7), 0 0 20px rgba(210, 133, 116, 0.2)',
            }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <span
                  className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border"
                  style={{
                    backgroundColor: 'rgba(210, 133, 116, 0.2)',
                    color: '#e29584',
                    borderColor: 'rgba(210, 133, 116, 0.4)',
                  }}
                >
                  {selectedRoom.badge || selectedRoom.level}
                </span>
                <span className="text-xs text-neutral-300 font-semibold">{selectedRoom.area}</span>
              </div>
              <button
                type="button"
                onClick={() => handleSelect(null)}
                className="text-neutral-400 hover:text-white p-1 rounded transition"
                title="Deselect"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex gap-3 mb-2.5">
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-black">
                <img
                  src={selectedRoom.image}
                  alt={selectedRoom.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-serif font-bold text-white leading-tight truncate mb-1">
                  {selectedRoom.name}
                </h4>
                <p className="text-[11px] text-neutral-300 line-clamp-2 leading-relaxed">
                  {selectedRoom.description}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-neutral-400">
                {selectedRoom.dimensions || 'Spacious Layout'}
              </span>
              {onOpenRoomModal && (
                <button
                  type="button"
                  onClick={() => onOpenRoomModal(selectedRoom)}
                  className="px-3 py-1 rounded-full text-[11px] font-semibold text-white btn-rose-pill flex items-center gap-1"
                >
                  <span>Explore Suite</span>
                  <ExternalLink size={11} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Left: [+], [-], [⛶] Viewport Controls */}
      <div className="absolute bottom-0 left-0 p-4 flex items-center gap-2 z-10">
        <div
          className="flex items-center p-1 rounded-full border shadow-lg"
          style={{
            backgroundColor: 'rgba(22, 24, 29, 0.9)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
          }}
        >
          <button
            type="button"
            className="w-7 h-7 rounded-full text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition"
            onClick={handleZoomIn}
            title="Zoom In"
          >
            <Plus size={15} />
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-full text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition"
            onClick={handleZoomOut}
            title="Zoom Out"
          >
            <Minus size={15} />
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-full text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition"
            onClick={handleFullscreenToggle}
            title="Toggle Fullscreen"
          >
            <Maximize2 size={13} />
          </button>
        </div>
      </div>

      {/* Bottom Right: Floor Switcher Pills (updates per active property) */}
      <div className="absolute bottom-0 right-0 p-4 z-10">
        <div
          className="flex items-center gap-1.5 p-1 rounded-full border shadow-lg"
          style={{
            backgroundColor: 'rgba(22, 24, 29, 0.9)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
          }}
        >
          {roomsList.map((room) => {
            const isActive = currentFloorId === room.id;
            return (
              <button
                key={room.id}
                type="button"
                className={`floor-pill ${isActive ? 'active' : ''}`}
                onClick={() => handleSelect(isActive ? null : room.id)}
              >
                {room.shortName}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
