// App.jsx
// 3D Real Estate Explorer - Architectural Showcase
// Luxury Soft Design System: Warm Cream + Blush Terracotta-Rose + Charcoal.
//
// Features:
// - Multi-Property 3D Explorer with seamless left/right navigation and touch swiping
// - Dynamic property synchronization across 3D Model, Hotspots, and Specifications Panel
// - Interactive Floor Switcher, Smooth Glide Camera, and Room Inspection Modal
// - Private Concierge Inquiry with local storage persistence

import { useState } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/layout/Navbar';
import Hero from './components/layout/Hero';
import Scene3D from './components/scene/Scene3D';
import PropertyDetails from './components/panels/PropertyDetails';
import InquiryForm from './components/form/InquiryForm';
import Footer from './components/layout/Footer';
import RoomDetailModal from './components/modals/RoomDetailModal';

// Multi-Property and Room Registries
import { propertiesData } from './data/propertyData';
import { propertiesRooms, rooms as defaultRooms } from './data/roomsData';

export default function App() {
  // Active property state (0: Villa Lumina, 1: Verdant Terraces, 2: Glass Pavilion)
  const [activePropertyIndex, setActivePropertyIndex] = useState(0);

  // Central active floor state shared between 3D scene, floor switcher, and specs panel
  const [activeFloorId, setActiveFloorId] = useState(null);

  // Room modal state for deep architectural suite inspection
  const [inspectRoom, setInspectRoom] = useState(null);

  // Active property and rooms derivation
  const currentProperty = propertiesData[activePropertyIndex] || propertiesData[0];
  const currentRooms = propertiesRooms[currentProperty.id] || defaultRooms;

  // Property navigation handler (resets floor selection so camera gives a full building view)
  const handleChangeProperty = (newIndex) => {
    setActivePropertyIndex(newIndex);
    setActiveFloorId(null);
    setInspectRoom(null);
  };

  // Smooth scroll handler for nav and hero buttons
  const scrollToSection = (elementId) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenRoomModal = (room) => {
    setInspectRoom(room);
    setActiveFloorId(room.id);
  };

  const handleSelectRoomById = (id) => {
    const allRooms = Object.values(propertiesRooms).flat();
    const target = allRooms.find((r) => r.id === id);
    if (target) {
      setInspectRoom(target);
      setActiveFloorId(id);
    }
  };

  const handleInquireRoom = (room) => {
    setActiveFloorId(room.id);
    scrollToSection('inquiry-section');
  };

  return (
    <div
      className="min-vh-100 flex flex-col antialiased text-left"
      style={{
        backgroundColor: '#f7f3ee',
        color: '#1a1c20',
      }}
    >
      {/* Top Luxury Navigation */}
      <Navbar property={currentProperty} onScrollToSection={scrollToSection} />

      {/* Hero Banner with Dusk Villa Photography & Architectural Alignment */}
      <Hero
        property={currentProperty}
        rooms={currentRooms}
        onStartTour={() => scrollToSection('scene-section')}
        onOpenInquiry={() => scrollToSection('inquiry-section')}
      />

      {/* Main Interactive 3D Explorer & Details Section */}
      <main id="scene-section" className="flex-grow container-fluid px-3 px-lg-5 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="row g-4 items-stretch mb-6"
        >
          {/* 3D Interactive Model Viewport with Multi-Property Navigation */}
          <div className="col-12 col-lg-7">
            <Scene3D
              activePropertyIndex={activePropertyIndex}
              onChangeProperty={handleChangeProperty}
              activeFloorId={activeFloorId}
              onSelectFloor={setActiveFloorId}
              onOpenRoomModal={handleOpenRoomModal}
              currentProperty={currentProperty}
              currentRooms={currentRooms}
            />
          </div>

          {/* Property Specifications Panel (dynamically synchronized with active property) */}
          <div id="details-section" className="col-12 col-lg-5">
            <PropertyDetails
              property={currentProperty}
              rooms={currentRooms}
              activeFloorId={activeFloorId}
              onSelectFloor={setActiveFloorId}
              onScrollToInquiry={() => scrollToSection('inquiry-section')}
              onOpenRoomModal={handleOpenRoomModal}
            />
          </div>
        </motion.div>

        {/* Bottom: Concierge Inquiry & Private Tour Booking */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <InquiryForm
            activeFloorId={activeFloorId}
            property={currentProperty}
            rooms={currentRooms}
          />
        </motion.div>
      </main>

      {/* Modal for In-depth Room Experience */}
      {inspectRoom && (
        <RoomDetailModal
          room={inspectRoom}
          roomsList={currentRooms}
          onClose={() => setInspectRoom(null)}
          onSelectRoom={handleSelectRoomById}
          onInquireRoom={handleInquireRoom}
        />
      )}

      {/* Footer */}
      <Footer property={currentProperty} rooms={currentRooms} onScrollToSection={scrollToSection} />
    </div>
  );
}
