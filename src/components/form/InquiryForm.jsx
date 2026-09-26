// InquiryForm.jsx
// Comprehensive Luxury Concierge & Showing Reservation Center in Luxury Soft (Cream + Blush Rose + Charcoal).
// Features:
// - Property-specific advisor and neighborhood details
// - Neighborhood Proximity Map details
// - Interactive private showing reservation form with Local Storage persistence

import { useState, useEffect } from 'react';
import {
  Shield,
  Zap,
  CheckCircle2,
  MapPin,
  Sparkles,
  Award,
  ChevronRight,
  Trash2,
  Send,
} from 'lucide-react';
import FormInput from './FormInput';
import { propertyData as defaultPropertyData } from '../../data/propertyData';
import { rooms as defaultRooms } from '../../data/roomsData';

const STORAGE_KEY = 'real_estate_inquiries';

export default function InquiryForm({
  activeFloorId,
  property = defaultPropertyData,
  rooms = defaultRooms,
}) {
  const currentProperty = property || defaultPropertyData;
  const currentRooms = rooms || defaultRooms;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tourInterest: activeFloorId || 'full_property',
    preferredDate: '',
    preferredTime: 'afternoon',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [savedInquiries, setSavedInquiries] = useState([]);
  const [showSavedList, setShowSavedList] = useState(false);
  const [storageError, setStorageError] = useState('');

  // Keep the tour focus valid when either the selected floor or property changes.
  useEffect(() => {
    const tourInterest = currentRooms.some((room) => room.id === activeFloorId)
      ? activeFloorId
      : 'full_property';
    setFormData((prev) => ({ ...prev, tourInterest }));
  }, [activeFloorId, currentProperty.id, currentRooms]);

  // Load inquiries from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) {
          throw new Error('Stored inquiries must be an array.');
        }
        setSavedInquiries(parsed);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
      setStorageError('Saved requests could not be loaded from this browser.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (digitsOnly.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const newInquiry = {
      id: Date.now(),
      ...formData,
      propertyId: currentProperty.id,
      propertyTitle: currentProperty.title,
      tourInterestLabel:
        currentRooms.find((room) => room.id === formData.tourInterest)?.name ||
        'Complete Property & Grounds',
      submittedAt: new Date().toLocaleString(),
    };

    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      const parsed = existing ? JSON.parse(existing) : [];
      if (!Array.isArray(parsed)) {
        throw new Error('Stored inquiries must be an array.');
      }
      const updated = [newInquiry, ...parsed];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSavedInquiries(updated);
      setStorageError('');
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
      setStorageError('Your request could not be saved in this browser. Please check browser storage settings and try again.');
      return;
    }

    setSubmittedSuccess(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      tourInterest: activeFloorId || 'full_property',
      preferredDate: '',
      preferredTime: 'afternoon',
      message: '',
    });
    setErrors({});

    setTimeout(() => {
      setSubmittedSuccess(false);
    }, 7000);
  };

  const handleClear = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSavedInquiries([]);
      setStorageError('');
    } catch (err) {
      console.error('Failed to clear inquiries:', err);
      setStorageError('Saved requests could not be cleared from this browser.');
    }
  };

  return (
    <section
      id="inquiry-section"
      className="rounded-3xl overflow-hidden shadow-sm my-8 text-left border"
      style={{
        backgroundColor: '#f5ede8',
        borderColor: '#ebdcd3',
      }}
    >
      <div className="p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Certified Luxury Advisor + Trust Elements + Proximity Highlights */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tag Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider"
              style={{
                backgroundColor: 'rgba(210, 133, 116, 0.15)',
                color: '#be7463',
                border: '1px solid rgba(210, 133, 116, 0.3)',
              }}
            >
              <Sparkles size={12} />
              <span>PRIVATE CLIENT CONCIERGE</span>
            </div>

            {/* Headline */}
            <div>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#1a1c20] tracking-tight leading-tight mb-2">
                Arrange a Private Showing & Advisory
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Explore {currentProperty.title} and request a private showing. Requests are saved in this browser and are not sent to an agent.
              </p>
            </div>

            {/* Agent Profile Card */}
            <div
              className="p-5 rounded-2xl border transition-all duration-300 shadow-sm"
              style={{
                backgroundColor: '#ffffff',
                borderColor: '#ebdcd3',
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-full overflow-hidden shrink-0 shadow-sm bg-neutral-100"
                  style={{ border: '2px solid #d28574' }}
                >
                  <img
                    src={currentProperty.agent.image}
                    alt={currentProperty.agent.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-base font-serif font-bold text-[#1a1c20] truncate">
                      {currentProperty.agent.name}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-neutral-400 shrink-0" title="Advisor profile" />
                  </div>
                  <div className="text-xs font-semibold truncate mb-0.5" style={{ color: '#be7463' }}>
                    {currentProperty.agent.title}
                  </div>
                  <div className="text-[11px] text-neutral-500 truncate">
                    {currentProperty.agent.brokerage}
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed mb-4 border-t border-neutral-100 pt-3">
                "{currentProperty.agent.bio}"
              </p>

              <div className="border-t border-neutral-100 pt-3 text-xs text-neutral-600">
                Showing requests can be saved using the form on this page.
              </div>
            </div>

            {/* Neighborhood & Proximity Highlights Card */}
            <div
              className="p-4 rounded-2xl border space-y-3"
              style={{
                backgroundColor: '#ffffff',
                borderColor: '#ebdcd3',
              }}
            >
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
                <span className="flex items-center gap-1.5" style={{ color: '#be7463' }}>
                  <MapPin size={14} style={{ color: '#d28574' }} />
                  Neighborhood Proximity
                </span>
                <span className="text-[11px] text-neutral-500 font-normal">{currentProperty.address.neighborhood}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {currentProperty.proximity.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#faf6f3] border border-[#ebdcd3]">
                    <div className="font-bold" style={{ color: '#be7463' }}>{item.distance}</div>
                    <div className="text-[11px] text-neutral-600 leading-snug">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Trust Signals */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div
                className="p-3 rounded-xl border text-center"
                style={{ backgroundColor: '#ffffff', borderColor: '#ebdcd3' }}
              >
                <Shield size={16} style={{ color: '#d28574' }} className="mx-auto mb-1.5" />
                <div className="text-[11px] font-semibold text-[#1a1c20]">Distinctive Homes</div>
                <div className="text-[10px] text-neutral-500">Thoughtful Architecture</div>
              </div>
              <div
                className="p-3 rounded-xl border text-center"
                style={{ backgroundColor: '#ffffff', borderColor: '#ebdcd3' }}
              >
                <Zap size={16} style={{ color: '#d28574' }} className="mx-auto mb-1.5" />
                <div className="text-[11px] font-semibold text-[#1a1c20]">Local Storage</div>
                <div className="text-[10px] text-neutral-500">No request is sent</div>
              </div>
              <div
                className="p-3 rounded-xl border text-center"
                style={{ backgroundColor: '#ffffff', borderColor: '#ebdcd3' }}
              >
                <Award size={16} style={{ color: '#d28574' }} className="mx-auto mb-1.5" />
                <div className="text-[11px] font-semibold text-[#1a1c20]">Design Focus</div>
                <div className="text-[10px] text-neutral-500">Made for Modern Living</div>
              </div>
            </div>
          </div>

          {/* Right Column: Private Showing Reservation Form */}
          <div className="lg:col-span-7">
            <div
              className="p-6 sm:p-8 rounded-2xl border shadow-sm"
              style={{
                backgroundColor: '#ffffff',
                borderColor: '#ebdcd3',
              }}
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#f0e6e0]">
                <div>
                  <h4 className="text-xl font-serif font-bold text-[#1a1c20]">
                    Schedule Your Showing
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Complimentary private viewing with bespoke architectural presentation.
                  </p>
                </div>
                {savedInquiries.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowSavedList(!showSavedList)}
                    className="text-xs hover:underline font-semibold"
                    style={{ color: '#be7463' }}
                  >
                    {showSavedList ? 'Hide Saved ( ' + savedInquiries.length + ' )' : 'My Requests (' + savedInquiries.length + ')'}
                  </button>
                )}
              </div>

              {submittedSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                  <CheckCircle2 size={22} className="text-emerald-600 shrink-0" />
                  <div>
                    <strong className="text-emerald-800 text-sm block">
                      Request saved on this device
                    </strong>
                    <span className="text-xs text-emerald-700">
                      Your inquiry is stored in this browser only. No representative or external service has been contacted.
                    </span>
                  </div>
                </div>
              )}

              {storageError && (
                <div role="alert" className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                  {storageError}
                </div>
              )}

              {/* Saved Inquiries Drawer */}
              {showSavedList && savedInquiries.length > 0 && (
                <div className="mb-6 p-4 rounded-xl bg-[#faf6f3] border border-[#ebdcd3] space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-600 font-semibold mb-2">
                    <span>Recent Showing Bookings</span>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="text-red-500 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <Trash2 size={12} />
                      Clear History
                    </button>
                  </div>
                  {savedInquiries.slice(0, 3).map((item) => (
                    <div key={item.id} className="p-2.5 rounded-lg bg-white border border-[#ebdcd3] text-xs text-neutral-700 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-[#1a1c20]">{item.name}</span> •{' '}
                        <span style={{ color: '#be7463' }}>
                          {item.propertyTitle || 'Property'} · {item.tourInterestLabel || item.tourInterest}
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-500">{item.submittedAt}</span>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <FormInput
                    id="name"
                    name="name"
                    label="Full Legal Name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Example"
                    required
                    error={errors.name}
                  />

                  {/* Email */}
                  <FormInput
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.invalid"
                    required
                    error={errors.email}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <FormInput
                    id="phone"
                    name="phone"
                    label="Mobile Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="000-000-0000"
                    required
                    error={errors.phone}
                  />

                  {/* Preferred Date */}
                  <FormInput
                    id="preferredDate"
                    name="preferredDate"
                    label="Preferred Date"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleChange}
                  />
                </div>

                {/* Tour Focus / Specific Floor */}
                <div className="text-left">
                  <label htmlFor="tourInterest" className="block text-xs font-semibold text-[#1a1c20] uppercase tracking-wider mb-1.5">
                    Tour Focus & Architectural Interest
                  </label>
                  <select
                    id="tourInterest"
                    name="tourInterest"
                    value={formData.tourInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl text-sm text-[#1a1c20] bg-white border border-[#ebdcd3] hover:border-[#d28574]/60 focus:border-[#d28574] focus:ring-1 focus:ring-[#d28574]/40 outline-none transition"
                  >
                    <option value="full_property">Complete Property & Grounds (All Levels)</option>
                    {currentRooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.badge || r.level}: {r.name} ({r.area})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message / Confidential Requests */}
                <FormInput
                  id="message"
                  name="message"
                  label="Confidential Inquiries & Scheduling Preferences"
                  type="textarea"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Inquire about financing options, architect consultations, private helicopter transfers, or specific viewing times..."
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full btn-rose-pill text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-md mt-2"
                >
                  <Send size={16} />
                  <span>Request Private Showing Reservation</span>
                  <ChevronRight size={16} />
                </button>

                <p className="text-[11px] text-neutral-500 text-center mt-3">
                  All consultations strictly protected under client confidentiality agreements. Non-disclosure agreements available upon request.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
