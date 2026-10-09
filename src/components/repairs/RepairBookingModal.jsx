import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { REPAIR_SERVICES } from '../../data/mockData';
import {
  X,
  Wrench,
  Upload,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

export default function RepairBookingModal() {
  const { modalState, closeModal, createRepairBooking, navigateTo } = useApp();

  const initialCat = modalState.repairRequest?.initialCategory || 'Laptop Repair';
  const initialTech = modalState.repairRequest?.initialTech || null;

  const [deviceType, setDeviceType] = useState('Laptop');
  const [deviceBrand, setDeviceBrand] = useState('Apple');
  const [deviceModel, setDeviceModel] = useState('MacBook Pro 14" M1 (2021)');
  const [category, setCategory] = useState(initialCat);
  const [issueSummary, setIssueSummary] = useState('Liquid spill near trackpad, system does not boot and charger light stays amber.');
  const [preferredLocation, setPreferredLocation] = useState('At Home Service');
  const [preferredDate, setPreferredDate] = useState('2026-10-14');
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 01:00 PM');
  const [address, setAddress] = useState('Flat 4B, Shanthi Heights, T. Nagar, Chennai');
  const [submittedBooking, setSubmittedBooking] = useState(null);

  if (!modalState.repairRequest?.open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const booking = createRepairBooking({
      deviceType,
      deviceBrand,
      deviceModel,
      problemCategory: category,
      issueSummary,
      preferredLocation,
      address,
      preferredDate,
      timeSlot,
      assignedTechnician: initialTech ? {
        id: initialTech.id,
        name: initialTech.name,
        avatar: initialTech.avatar,
        phone: '+91 98401 22890'
      } : null,
      estimatedQuote: '₹499 Consultation / Diagnostic'
    });

    setSubmittedBooking(booking);
  };

  return (
    <div className="modal-overlay" onClick={() => closeModal('repairRequest')}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{ padding: '28px', maxWidth: '620px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-orange-dark)', textTransform: 'uppercase' }}>
              SERVICE REQUEST INTAKE
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>
              {submittedBooking ? 'Repair Request Confirmed' : 'Request Certified Technician'}
            </h3>
          </div>
          <button onClick={() => closeModal('repairRequest')} style={{ color: '#64748B' }}>
            <X size={20} />
          </button>
        </div>

        {submittedBooking ? (
          /* Success Screen */
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#FFF4EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              border: '2px solid #FF6B00'
            }}>
              <CheckCircle size={36} color="#EA580C" />
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Repair Ticket #{submittedBooking.id} Created
            </h3>

            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px' }}>
              Status: <span style={{ color: '#EA580C', fontWeight: 700 }}>
                {submittedBooking.status}
              </span>
            </p>

            <div style={{
              background: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              padding: '16px',
              textAlign: 'left',
              fontSize: '13px',
              marginBottom: '24px'
            }}>
              <div style={{ marginBottom: '6px' }}><strong>Device:</strong> {deviceBrand} {deviceModel}</div>
              <div style={{ marginBottom: '6px' }}><strong>Service Slot:</strong> {preferredDate} ({timeSlot})</div>
              <div style={{ marginBottom: '6px' }}><strong>Location:</strong> {preferredLocation}</div>
              {initialTech && (
                <div><strong>Assigned Tech:</strong> {initialTech.name} ({initialTech.title})</div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => closeModal('repairRequest')}
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  closeModal('repairRequest');
                  navigateTo('dashboard', { tab: 'repairs' });
                }}
                className="btn btn-orange"
                style={{ flex: 2 }}
              >
                <span>Track in Dashboard</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* Intake Form */
          <form onSubmit={handleSubmit}>
            {initialTech && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                background: '#FFF4EB',
                borderRadius: '10px',
                border: '1px solid #FED7AA',
                marginBottom: '16px'
              }}>
                <img src={initialTech.avatar} alt="tech" style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#9A3412' }}>Booking with: {initialTech.name}</div>
                  <div style={{ fontSize: '11.5px', color: '#C2410C' }}>{initialTech.title}</div>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Device Type</label>
                <select
                  value={deviceType}
                  onChange={e => setDeviceType(e.target.value)}
                  className="form-select"
                >
                  <option value="Laptop">Laptop / MacBook</option>
                  <option value="Smartphone">Smartphone / iPhone</option>
                  <option value="Tablet">Tablet / iPad</option>
                  <option value="PC">PC / Desktop</option>
                  <option value="Camera">Camera / Optical</option>
                  <option value="Electronics">Lab / Electronics</option>
                  <option value="CCTV">CCTV / Networking</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Brand</label>
                <input
                  type="text"
                  className="form-input"
                  value={deviceBrand}
                  onChange={e => setDeviceBrand(e.target.value)}
                  placeholder="e.g. Apple, Dell, Lenovo"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Model Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={deviceModel}
                  onChange={e => setDeviceModel(e.target.value)}
                  placeholder="e.g. MacBook Air M1"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Describe the Issue in Detail</label>
              <textarea
                className="form-textarea"
                value={issueSummary}
                onChange={e => setIssueSummary(e.target.value)}
                placeholder="What happened? Any liquid spill, drop, burnt smell, or software freeze?"
                required
              />
            </div>

            {/* Service Location Choice */}
            <div className="form-group">
              <label className="form-label">Preferred Service Location</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                {['At Home Service', 'Technician Workshop Drop', 'Courier / Pickup'].map(loc => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setPreferredLocation(loc)}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      background: preferredLocation === loc ? '#FFF4EB' : '#FFFFFF',
                      color: preferredLocation === loc ? '#EA580C' : '#334155',
                      border: preferredLocation === loc ? '1.5px solid #FF6B00' : '1px solid #CBD5E1',
                      textAlign: 'center'
                    }}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {preferredLocation === 'At Home Service' && (
              <div className="form-group">
                <label className="form-label">Home Address</label>
                <input
                  type="text"
                  className="form-input"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Enter house/flat number and locality..."
                />
              </div>
            )}

            {/* Preferred Date & Time Slot */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Preferred Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={preferredDate}
                  onChange={e => setPreferredDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Time Slot</label>
                <select
                  value={timeSlot}
                  onChange={e => setTimeSlot(e.target.value)}
                  className="form-select"
                >
                  <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                  <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                  <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                  <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-orange btn-lg"
              style={{ width: '100%', marginTop: '10px' }}
            >
              <span>Confirm & Request Technician</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
