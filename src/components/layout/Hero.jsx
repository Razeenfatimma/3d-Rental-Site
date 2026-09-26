// Hero.jsx
// Full-width architectural hero section in Luxury Soft (Cream + Blush Rose + Charcoal) design system.
// Directly aligns architectural cues with the 3D interactive explorer.

import { Bed, Bath, Maximize, Building, MapPin, Box, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { propertyImages } from '../../data/assets';

export default function Hero({ property, rooms, onStartTour, onOpenInquiry }) {
  const specs = Object.fromEntries((property.specs || []).map(({ label, value }) => [label, value]));
  const livingLevels = rooms.filter((room) => room.level !== 'Rooftop').length;
  const hasRooftop = rooms.some((room) => room.level === 'Rooftop');

  return (
    <section
      id="hero"
      className="relative overflow-hidden text-white"
      style={{
        minHeight: '600px',
        backgroundColor: '#16171a',
      }}
    >
      {/* Background Architectural Dusk Villa Photography */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${property.image || propertyImages.heroBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          opacity: 0.88,
        }}
      />

      {/* Dark Vignette Gradient Overlay so typography is razor sharp */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            'linear-gradient(90deg, rgba(22, 23, 26, 0.97) 0%, rgba(22, 23, 26, 0.88) 50%, rgba(22, 23, 26, 0.45) 80%, rgba(22, 23, 26, 0.25) 100%)',
        }}
      />

      <div className="container-fluid px-4 px-lg-5 py-5 relative z-10">
        <div className="row align-items-center py-4 py-lg-5">
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="col-12 col-lg-7 text-start"
          >
            {/* Property status and reference */}
            <div
              className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-full text-white border"
              style={{
                backgroundColor: 'rgba(210, 133, 116, 0.18)',
                backdropFilter: 'blur(8px)',
                borderColor: 'rgba(210, 133, 116, 0.4)',
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '1.2px',
              }}
            >
              <span style={{ color: '#d28574' }}>★</span>
              <span style={{ color: '#f3c4ba' }}>ARCHITECTURAL SHOWCASE</span>
              <span className="text-white-50">•</span>
              <span className="text-white-50">Ref. {property.mlsNumber}</span>
            </div>

            {/* Main Headline */}
            <h1
              className="display-3 fw-bold mb-2 text-white"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                letterSpacing: '-0.5px',
                lineHeight: 1.08,
              }}
            >
              {property.title}
            </h1>

            {/* Price Highlight in Hero */}
            <div className="d-flex items-baseline gap-3 mb-3">
              <span className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {property.price}
              </span>
              <span className="text-sm font-semibold" style={{ color: '#f0b5a8' }}>
                {property.monthlyEst}
              </span>
            </div>

            {/* Subtitle echoing 3D features */}
            <p
              className="text-white-50 mb-4"
              style={{ fontSize: '1.05rem', maxWidth: '600px', lineHeight: 1.6 }}
            >
              {property.subtitle}
            </p>

            {/* Spec Metrics Row with Rose Icons */}
            <div className="d-flex flex-wrap align-items-center gap-3 gap-md-4 mb-3 text-white-50 small">
              <div className="d-flex align-items-center gap-2 text-white">
                <Bed size={17} style={{ color: '#d28574' }} />
                <span className="fw-semibold">{specs.Bedrooms}</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-white">
                <Bath size={17} style={{ color: '#d28574' }} />
                <span className="fw-semibold">{specs.Bathrooms}</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-white">
                <Maximize size={17} style={{ color: '#d28574' }} />
                <span className="fw-semibold">{specs['Living Area']}</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-white">
                <Building size={17} style={{ color: '#d28574' }} />
                <span className="fw-semibold">{livingLevels} Levels{hasRooftop ? ' + Rooftop' : ''}</span>
              </div>
            </div>

            {/* Address Pin */}
            <p className="d-flex align-items-center gap-2 text-white-50 small mb-4">
              <MapPin size={15} style={{ color: '#d28574' }} />
              <span>{property.address.street}, {property.address.neighborhood}, {property.address.city}, {property.address.state}</span>
            </p>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap gap-3">
              <button
                type="button"
                className="btn-rose-pill px-4 py-3 d-flex align-items-center gap-2 shadow-lg"
                style={{ fontSize: '14px' }}
                onClick={onStartTour}
              >
                <Box size={18} />
                <span>Explore Interactive 3D Model</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="btn-glass px-4 py-3 d-flex align-items-center gap-2"
                style={{ fontSize: '14px' }}
                onClick={onOpenInquiry}
              >
                <Calendar size={17} style={{ color: '#d28574' }} />
                <span>Request Private Showing</span>
              </button>
            </div>
          </motion.div>

          {/* Right Signature Note Accent */}
          <div className="col-12 col-lg-5 text-end d-none d-lg-block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="p-4 rounded-2xl border text-left inline-block"
              style={{
                backgroundColor: 'rgba(22, 24, 28, 0.85)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(210, 133, 116, 0.35)',
                maxWidth: '340px',
                marginTop: '120px',
              }}
            >
              <div
                className="text-xs font-semibold uppercase tracking-wider mb-1"
                style={{ color: '#e08f7e' }}
              >
                Architectural Distinction
              </div>
              <div className="text-base font-serif text-white font-medium mb-2">
                "{property.tagline}"
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
