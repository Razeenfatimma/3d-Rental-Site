// RoomDetailModal.jsx
// Immersive luxury architectural room inspection modal in Luxury Soft (Cream + Blush Rose + Charcoal).
// Exact dimensions, floor materials, smart home integration, and suite specs.

import { X, CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { rooms } from '../../data/roomsData';

export default function RoomDetailModal({
  room,
  roomsList = rooms,
  onClose,
  onSelectRoom,
  onInquireRoom,
}) {
  if (!room) return null;

  const currentRooms = roomsList && roomsList.length > 0 ? roomsList : rooms;
  const currentIndex = currentRooms.findIndex((r) => r.id === room.id);
  const prevRoom = currentRooms[(currentIndex - 1 + currentRooms.length) % currentRooms.length];
  const nextRoom = currentRooms[(currentIndex + 1) % currentRooms.length];

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        style={{
          backgroundColor: 'rgba(15, 17, 22, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border my-auto text-white"
          style={{
            backgroundColor: '#181b22',
            borderColor: 'rgba(210, 133, 116, 0.35)',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(210, 133, 116, 0.15)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar with Badge and Close */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/30">
            <div className="flex items-center gap-3">
              <span
                className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full flex items-center gap-1.5"
                style={{
                  backgroundColor: 'rgba(210, 133, 116, 0.2)',
                  color: '#f0b5a8',
                  border: '1px solid rgba(210, 133, 116, 0.45)',
                }}
              >
                <Sparkles size={12} />
                {room.badge || room.level}
              </span>
              <span className="text-sm text-neutral-300">Architectural Suite Explorer</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelectRoom(prevRoom.id)}
                className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
                title={`Previous: ${prevRoom.name}`}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => onSelectRoom(nextRoom.id)}
                className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
                title={`Next: ${nextRoom.name}`}
              >
                <ChevronRight size={18} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition ml-2"
                title="Close Suite View"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="max-h-[80vh] overflow-y-auto">
            {/* High-Resolution Room Photo Hero */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-black">
              <img
                src={room.image}
                alt={room.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181b22] via-[#181b22]/30 to-transparent" />

              <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-wide font-normal mb-1">
                    {room.name}
                  </h3>
                  <p className="text-sm text-neutral-200 max-w-xl line-clamp-2">
                    {room.description}
                  </p>
                </div>
                <div
                  className="px-4 py-2 rounded-xl backdrop-blur-md text-right border"
                  style={{
                    backgroundColor: 'rgba(24, 27, 34, 0.85)',
                    borderColor: 'rgba(210, 133, 116, 0.4)',
                  }}
                >
                  <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#f0b5a8' }}>
                    Floor Area
                  </div>
                  <div className="text-lg font-serif text-white font-bold">{room.area}</div>
                </div>
              </div>
            </div>

            {/* Room Specifications Grid */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: '#f0b5a8' }}>
                    Dimensions
                  </div>
                  <div className="text-sm font-semibold text-white">{room.dimensions || "24' × 28'"}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: '#f0b5a8' }}>
                    Ceiling Height
                  </div>
                  <div className="text-sm font-semibold text-white">{room.ceilingHeight || "11' 2\" Flush"}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: '#f0b5a8' }}>
                    Orientation
                  </div>
                  <div className="text-sm font-semibold text-white flex items-center gap-1">
                    <Compass size={14} style={{ color: '#d28574' }} />
                    West / Hillside
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: '#f0b5a8' }}>
                    Residence
                  </div>
                  <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck size={14} />
                    Architectural residence
                  </div>
                </div>
              </div>

              {/* Material & Smart Home Deep Dives */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                    Flooring & Architectural Material
                  </div>
                  <p className="text-sm text-neutral-200 leading-relaxed">
                    {room.floorMaterial || 'French White Oak 10-inch Planks with radiant hydronic underfloor heating.'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                    Smart Home & Environmental Systems
                  </div>
                  <p className="text-sm text-neutral-200 leading-relaxed">
                    {room.smartHome || 'Savant whole-home integration with motorized Lutron shades and architectural sound.'}
                  </p>
                </div>
              </div>

              {/* Architectural Highlights Checklist */}
              <div>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                  Architectural Specifications & Inclusions
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {room.features?.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/[0.03] text-sm text-neutral-200 border border-white/5"
                    >
                      <CheckCircle2 size={16} style={{ color: '#d28574' }} className="shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-400 text-center sm:text-left">
                  Showing requests can be saved using the inquiry form.
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-white/20 text-neutral-300 hover:text-white hover:border-white text-sm font-medium transition"
                  >
                    Back to 3D View
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onInquireRoom) onInquireRoom(room);
                    }}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-full btn-rose-pill text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <span>Request Private Tour of Suite</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
