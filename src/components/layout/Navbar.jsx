// Navbar.jsx
// Luxury top navigation bar in Luxury Soft (Cream + Blush Rose + Charcoal) design system.

import { ArrowRight, Sparkles } from 'lucide-react';
import { propertyData as defaultProperty } from '../../data/propertyData';

export default function Navbar({ property = defaultProperty, onScrollToSection }) {
  return (
    <nav
      className="navbar navbar-expand-lg sticky-top py-3"
      style={{
        backgroundColor: '#16171a',
        borderBottom: '1px solid rgba(210, 133, 116, 0.2)',
        zIndex: 1000,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="container-fluid px-3 px-lg-5">
        {/* Brand Logo & Geometric Architectural Icon */}
        <a
          className="navbar-brand d-flex align-items-center gap-3 text-decoration-none m-0"
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onScrollToSection('hero');
          }}
        >
          {/* Architectural line icon with rose gold accent */}
          <div
            className="d-flex align-items-center justify-content-center shadow-sm"
            style={{
              width: '40px',
              height: '40px',
              border: '1.5px solid rgba(210, 133, 116, 0.7)',
              borderRadius: '10px',
              color: '#d28574',
              backgroundColor: 'rgba(210, 133, 116, 0.12)',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>

          <div className="text-start">
            <div
              className="fw-bold text-white lh-1 d-flex align-items-center gap-2 nav-property-title"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                letterSpacing: '2px',
                fontSize: '17px',
              }}
            >
              <span>{property.title.split(' ').slice(0, 2).join(' ').toUpperCase()}</span>
              <span
                className="px-2 py-1 rounded font-monospace fw-normal nav-property-price"
                style={{
                  backgroundColor: 'rgba(210, 133, 116, 0.15)',
                  color: '#e29584',
                  border: '1px solid rgba(210, 133, 116, 0.35)',
                }}
              >
                {property.highlights?.priceBadge || property.price}
              </span>
            </div>
            <div
              className="text-uppercase"
              style={{
                color: '#d28574',
                fontSize: '9px',
                letterSpacing: '2.5px',
                marginTop: '4px',
                fontWeight: 600,
              }}
            >
              ARCHITECTURE • DESIGN • LIVING
            </div>
          </div>
        </a>

        {/* Right CTA Button & Quick Info */}
        <div className="d-flex align-items-center gap-3">
          <div className="d-none d-md-flex align-items-center gap-2 small text-white-50">
            <Sparkles size={13} style={{ color: '#d28574' }} />
            <span>{property.address.city} · Private Residences</span>
          </div>
          <button
            type="button"
            className="btn-rose-pill px-4 py-2 d-flex align-items-center gap-2 fw-semibold shadow"
            onClick={() => onScrollToSection('inquiry-section')}
          >
            <span>Inquire / Tour</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </nav>
  );
}
