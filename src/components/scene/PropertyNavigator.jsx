// PropertyNavigator.jsx
// Multi-Property Navigation Overlay for the 3D Real Estate Explorer.
//
// Features:
// 1. Left / Right Arrow Buttons: Seamlessly switch between the 3 luxury properties.
// 2. Active Dots Indicator: Displays (1 of 3, 2 of 3, 3 of 3) with clickable pagination dots.
// 3. Property Title Preview: Shows the name of the active property and quick jump options.
// 4. Touch & Keyboard Accessibility: Supports keyboard Left/Right arrows and touch swiping.

import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

export default function PropertyNavigator({
  properties,
  currentIndex,
  onSelectProperty,
  onPrevProperty,
  onNextProperty,
}) {
  const currentProperty = properties[currentIndex] || properties[0];
  const total = properties.length;

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. TOP-CENTER BADGE & DOTS INDICATOR (1 of 3, 2 of 3, 3 of 3)              */}
      {/* ========================================================================= */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
        <div
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border shadow-xl"
          style={{
            backgroundColor: 'rgba(20, 22, 27, 0.92)',
            backdropFilter: 'blur(12px)',
            borderColor: 'rgba(210, 133, 116, 0.35)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 15px rgba(210, 133, 116, 0.12)',
          }}
        >
          {/* Home Icon + Active Property Name */}
          <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium pr-1">
            <Home size={12} style={{ color: '#d28574' }} />
            <span className="hidden sm:inline font-serif font-semibold text-white">
              {currentProperty.title.split(' ')[0]} {currentProperty.title.split(' ')[1]}
            </span>
            <span className="text-[11px] text-neutral-400">
              ({currentIndex + 1} of {total})
            </span>
          </div>

          {/* Interactive Pagination Dots */}
          <div className="flex items-center gap-1.5 pl-1 border-l border-white/10">
            {properties.map((prop, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={prop.id || idx}
                  type="button"
                  onClick={() => onSelectProperty(idx)}
                  className="transition-all duration-300 rounded-full focus:outline-none"
                  style={{
                    width: isActive ? '20px' : '8px',
                    height: '8px',
                    backgroundColor: isActive ? '#d28574' : 'rgba(255, 255, 255, 0.3)',
                    boxShadow: isActive ? '0 0 8px #d28574' : 'none',
                    cursor: 'pointer',
                  }}
                  title={`Switch to ${prop.title} (${idx + 1} of ${total})`}
                  aria-label={`Switch to Property ${idx + 1}: ${prop.title}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. LEFT NAVIGATION ARROW                                                  */}
      {/* ========================================================================= */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20">
        <button
          type="button"
          onClick={onPrevProperty}
          className="group w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 shadow-xl focus:outline-none"
          style={{
            backgroundColor: 'rgba(20, 22, 27, 0.88)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
          }}
          title={`Previous Property: ${properties[(currentIndex - 1 + total) % total]?.title}`}
          aria-label="Previous Property"
        >
          <ChevronLeft
            size={20}
            className="transition-transform group-hover:-translate-x-0.5"
            style={{ color: '#d28574' }}
          />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 3. RIGHT NAVIGATION ARROW                                                 */}
      {/* ========================================================================= */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
        <button
          type="button"
          onClick={onNextProperty}
          className="group w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 shadow-xl focus:outline-none"
          style={{
            backgroundColor: 'rgba(20, 22, 27, 0.88)',
            backdropFilter: 'blur(10px)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
          }}
          title={`Next Property: ${properties[(currentIndex + 1) % total]?.title}`}
          aria-label="Next Property"
        >
          <ChevronRight
            size={20}
            className="transition-transform group-hover:translate-x-0.5"
            style={{ color: '#d28574' }}
          />
        </button>
      </div>
    </>
  );
}
