// Footer.jsx
// Luxury Soft footer in cohesive Charcoal + Cream + Blush Rose palette.

import { propertyData as defaultProperty } from '../../data/propertyData';
import { rooms as defaultRooms } from '../../data/roomsData';
import { ShieldCheck } from 'lucide-react';

export default function Footer({
  property = defaultProperty,
  rooms = defaultRooms,
}) {
  return (
    <footer
      className="text-white py-5 border-top"
      style={{
        backgroundColor: '#16171a',
        borderColor: 'rgba(210, 133, 116, 0.2)',
      }}
    >
      <div className="container-fluid px-4 px-lg-5 text-left">
        <div className="row g-4 mb-8">
          <div className="col-12 col-md-5">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span style={{ color: '#d28574' }}>✦</span>
              <h5
                className="footer-title fw-bold mb-0 text-white fs-5"
              >
                {property.title.toUpperCase()}
              </h5>
            </div>
            <p className="text-white-50 small mb-4 footer-description">
              {property.subtitle}
            </p>
            <div className="d-flex align-items-center gap-2 small text-white-50">
              <ShieldCheck size={14} style={{ color: '#d28574' }} />
              <span>Ref. {property.mlsNumber} • {property.escrowStatus}</span>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <h6
              className="uppercase text-xs font-bold mb-3 tracking-wider"
              style={{ color: '#d28574' }}
            >
              Architectural Levels
            </h6>
            <ul className="list-unstyled small text-white-50 footer-levels">
              {rooms.map((room) => <li key={room.id}>{room.shortName}: {room.name}</li>)}
            </ul>
          </div>

          <div className="col-6 col-md-4">
            <h6
              className="uppercase text-xs font-bold mb-3 tracking-wider"
              style={{ color: '#d28574' }}
            >
              Private Client Advisor
            </h6>
            <p className="text-white small fw-semibold mb-1">
              {property.agent.name}
            </p>
            <p className="text-white-50 small mb-1">
              {property.agent.brokerage}
            </p>
            <p className="text-white-50 small">
              Showing requests can be saved using the inquiry form.
            </p>
          </div>
        </div>

        <div className="border-top pt-4 d-flex flex-column flex-sm-row justify-content-between align-items-center small text-secondary footer-legal">
          <div>© {new Date().getFullYear()} {property.title} • All rights reserved.</div>
          <div className="mt-2 mt-sm-0" style={{ color: '#d28574' }}>
            Modern Living, Timeless Design
          </div>
        </div>
      </div>
    </footer>
  );
}
