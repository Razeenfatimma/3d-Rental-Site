// PropertyDetails.jsx
// High-hierarchy property specifications panel in Luxury Soft (Cream + Blush Rose + Charcoal).
// Dynamically displays specifications, pricing, address, and interactive floor plans
// for the currently active property (Villa Lumina, Verdant Terraces, or Glass Pavilion).

import {
  Bed,
  Bath,
  Home,
  Car,
  Calendar,
  MapPin,
  CalendarDays,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { propertyData as defaultPropertyData } from '../../data/propertyData';
import { rooms as defaultRooms } from '../../data/roomsData';

export default function PropertyDetails({
  property = defaultPropertyData,
  rooms = defaultRooms,
  activeFloorId,
  onSelectFloor,
  onScrollToInquiry,
  onOpenRoomModal,
}) {
  const currentProperty = property || defaultPropertyData;
  const currentRooms = rooms || defaultRooms;
  const activeRoom = currentRooms.find((r) => r.id === activeFloorId);

  // Extract highlight badges or fall back gracefully
  const specValues = Object.fromEntries((currentProperty.specs || []).map(({ label, value }) => [label, value]));
  const highlights = {
    priceBadge: currentProperty.highlights?.priceBadge || currentProperty.price,
    bedroomsBadge: specValues.Bedrooms || '—',
    areaBadge: specValues['Living Area'] || '—',
    locationBadge: currentProperty.address?.city || 'Lumen Bay',
  };

  return (
    <div
      className="card-luxury p-6 sm:p-7 h-full text-left flex flex-col justify-between transition-all duration-300"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #ebdcd3',
        boxShadow: '0 12px 32px -8px rgba(138, 112, 101, 0.1)',
      }}
    >
      <div>
        {/* Top Badges & Legal Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className="px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5"
              style={{
                backgroundColor: 'rgba(210, 133, 116, 0.12)',
                color: '#be7463',
                border: '1px solid rgba(210, 133, 116, 0.3)',
              }}
            >
              <span>✦</span>
              <span>{currentProperty.status}</span>
            </span>
            <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline">
              Ref. {currentProperty.mlsNumber}
            </span>
          </div>
          <span className="text-xs text-neutral-500 flex items-center gap-1 font-medium">
            <ShieldCheck size={14} />
            Private residence
          </span>
        </div>

        {/* Hero Price & Visual Anchor */}
        <div className="mb-4 pb-4 border-b border-[#f0e6e0]">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div>
              <div
                className="text-xs uppercase tracking-wider font-semibold mb-0.5"
                style={{ color: '#be7463' }}
              >
                Asking Price
              </div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#1a1c20] tracking-tight">
                {currentProperty.price}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold" style={{ color: '#be7463' }}>
                {currentProperty.monthlyEst}
              </div>
              <div className="text-xs text-neutral-500">
                {currentProperty.pricePerSqFt}
              </div>
            </div>
          </div>
        </div>

        {/* Title & Location Anchor */}
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1a1c20] mb-1.5 leading-snug">
            {currentProperty.title}
          </h2>
          <p className="text-sm text-neutral-600 flex items-center gap-1.5">
            <MapPin size={15} style={{ color: '#d28574' }} className="shrink-0" />
            <span>
              {currentProperty.address.street}, {currentProperty.address.neighborhood},{' '}
              {currentProperty.address.city}, {currentProperty.address.state}
            </span>
          </p>
        </div>

        {/* 4 Core Highlight Badges (Price, Bedrooms, Area, Location) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
          <div
            className="p-3 rounded-xl text-center"
            style={{
              backgroundColor: '#faf6f3',
              border: '1px solid #ebdcd3',
            }}
          >
            <div className="text-[10px] uppercase font-bold tracking-wider mb-0.5" style={{ color: '#be7463' }}>
              Price
            </div>
            <div className="text-sm font-bold text-[#1a1c20]">{highlights.priceBadge}</div>
          </div>
          <div
            className="p-3 rounded-xl text-center"
            style={{
              backgroundColor: '#faf6f3',
              border: '1px solid #ebdcd3',
            }}
          >
            <div className="text-[10px] uppercase font-bold tracking-wider mb-0.5" style={{ color: '#be7463' }}>
              Bedrooms
            </div>
            <div className="text-sm font-bold text-[#1a1c20]">{highlights.bedroomsBadge}</div>
          </div>
          <div
            className="p-3 rounded-xl text-center"
            style={{
              backgroundColor: '#faf6f3',
              border: '1px solid #ebdcd3',
            }}
          >
            <div className="text-[10px] uppercase font-bold tracking-wider mb-0.5" style={{ color: '#be7463' }}>
              Living Area
            </div>
            <div className="text-sm font-bold text-[#1a1c20]">{highlights.areaBadge}</div>
          </div>
          <div
            className="p-3 rounded-xl text-center"
            style={{
              backgroundColor: '#faf6f3',
              border: '1px solid #ebdcd3',
            }}
          >
            <div className="text-[10px] uppercase font-bold tracking-wider mb-0.5" style={{ color: '#be7463' }}>
              Location
            </div>
            <div className="text-sm font-bold text-[#1a1c20]">{highlights.locationBadge}</div>
          </div>
        </div>

        {/* Active Floor Interactive Spotlight Banner */}
        {activeRoom ? (
          <div
            className="p-4 mb-5 rounded-xl border flex items-center justify-between gap-3 shadow-sm transition-all"
            style={{
              backgroundColor: 'rgba(210, 133, 116, 0.1)',
              borderColor: 'rgba(210, 133, 116, 0.35)',
            }}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: '#d28574' }}
                >
                  Active: {activeRoom.badge || activeRoom.level}
                </span>
                <span className="text-xs font-semibold text-[#1a1c20] truncate">
                  {activeRoom.name}
                </span>
              </div>
              <div className="text-xs text-neutral-600 truncate">
                {activeRoom.area} • {activeRoom.dimensions}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {onOpenRoomModal && (
                <button
                  type="button"
                  onClick={() => onOpenRoomModal(activeRoom)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold text-white btn-rose-pill flex items-center gap-1"
                >
                  <span>Inspect</span>
                  <ExternalLink size={12} />
                </button>
              )}
              <button
                type="button"
                onClick={() => onSelectFloor(null)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-600 hover:text-dark border border-neutral-300 bg-white transition"
              >
                Reset
              </button>
            </div>
          </div>
        ) : (
          <div
            className="p-3 mb-5 rounded-xl flex items-center justify-between gap-3 flex-wrap"
            style={{
              backgroundColor: '#faf6f3',
              border: '1px solid #ebdcd3',
            }}
          >
            <div className="flex items-center gap-2 text-xs text-neutral-600">
              <Layers size={14} style={{ color: '#d28574' }} />
              <span>Select any floor in the 3D model:</span>
            </div>
            <div className="flex items-center gap-1">
              {currentRooms.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onSelectFloor(r.id)}
                  className="px-2 py-1 rounded text-[11px] font-semibold text-neutral-600 hover:text-[#d28574] hover:bg-white transition"
                >
                  {r.shortName}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Property Metrics Grid */}
        <div
          className="text-xs font-bold uppercase tracking-wider mb-2.5"
          style={{ color: '#be7463' }}
        >
          Residence Specifications
        </div>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {currentProperty.specs ? (
            currentProperty.specs.slice(1, 5).map((spec, i) => (
              <div
                key={i}
                className="p-3 rounded-xl flex items-center gap-3"
                style={{ backgroundColor: '#faf6f3', border: '1px solid #ebdcd3' }}
              >
                {spec.icon === 'bath' && <Bath size={18} style={{ color: '#d28574' }} className="shrink-0" />}
                {spec.icon === 'car' && <Car size={18} style={{ color: '#d28574' }} className="shrink-0" />}
                {spec.icon === 'calendar' && <Calendar size={18} style={{ color: '#d28574' }} className="shrink-0" />}
                {spec.icon === 'square' && <Home size={18} style={{ color: '#d28574' }} className="shrink-0" />}
                {spec.icon !== 'bath' && spec.icon !== 'car' && spec.icon !== 'calendar' && spec.icon !== 'square' && (
                  <Home size={18} style={{ color: '#d28574' }} className="shrink-0" />
                )}
                <div className="min-w-0">
                  <div className="text-[10px] text-neutral-500 uppercase">{spec.label}</div>
                  <div className="text-xs font-semibold text-[#1a1c20] truncate">{spec.value}</div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div
                className="p-3 rounded-xl flex items-center gap-3"
                style={{ backgroundColor: '#faf6f3', border: '1px solid #ebdcd3' }}
              >
                <Bath size={18} style={{ color: '#d28574' }} className="shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] text-neutral-500 uppercase">Bathrooms</div>
                  <div className="text-xs font-semibold text-[#1a1c20]">4+ Designer Baths</div>
                </div>
              </div>
              <div
                className="p-3 rounded-xl flex items-center gap-3"
                style={{ backgroundColor: '#faf6f3', border: '1px solid #ebdcd3' }}
              >
                <Car size={18} style={{ color: '#d28574' }} className="shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] text-neutral-500 uppercase">Garage</div>
                  <div className="text-xs font-semibold text-[#1a1c20]">Multi-Car EV Ready</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-3">
        <button
          type="button"
          className="btn-rose-pill w-full py-3.5 px-5 flex items-center justify-center gap-2 text-sm font-semibold shadow-md"
          onClick={onScrollToInquiry}
        >
          <CalendarDays size={16} />
          <span>Schedule Private Showing / Inquire</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
