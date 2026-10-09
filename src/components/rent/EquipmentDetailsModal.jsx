import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import EquipmentImage from '../common/EquipmentImage';
import {
  X,
  Star,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Truck,
  RotateCcw,
  Clock,
  Sparkles,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function EquipmentDetailsModal() {
  const { modalState, closeModal, openModal } = useApp();
  const [selectedDuration, setSelectedDuration] = useState(3); // 1, 3, 7, or custom
  const [customDays, setCustomDays] = useState(5);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup'); // 'pickup' | 'delivery'
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!modalState.details?.open || !modalState.details?.data) return null;

  const item = modalState.details.data;

  // Duration calculation
  const effectiveDays = selectedDuration === 'custom' ? customDays : selectedDuration;
  const rentalFee = item.dailyRate * effectiveDays;
  const platformFee = Math.max(20, Math.round(rentalFee * 0.05));
  const deliveryFee = deliveryMethod === 'delivery' ? 120 : 0;
  const totalPayableNow = rentalFee + item.securityDeposit + platformFee + deliveryFee;

  const handleProceedToRent = () => {
    closeModal('details');
    openModal('rent', {
      equipment: item,
      durationDays: effectiveDays,
      rentalFee,
      securityDeposit: item.securityDeposit,
      platformFee,
      deliveryFee,
      deliveryMethod,
      totalPayableNow
    });
  };

  const images = item.images && item.images.length > 0 ? item.images : [item.image];

  return (
    <div className="modal-overlay" onClick={() => closeModal('details')}>
      <div
        className="modal-content extra-wide"
        onClick={e => e.stopPropagation()}
        style={{ padding: 0, overflow: 'hidden' }}
      >
        {/* Header Bar */}
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-blue">{item.category}</span>
            <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
              {item.brand} • {item.model}
            </span>
          </div>

          <button
            onClick={() => closeModal('details')}
            style={{ color: '#64748B', padding: '4px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body: 2 Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          maxHeight: 'calc(90vh - 64px)',
          overflowY: 'auto'
        }} className="details-modal-grid">
          {/* Left Column: Gallery, Specs, Rules, Owner */}
          <div style={{ padding: '24px', borderRight: '1px solid #E2E8F0' }}>
            {/* Image Gallery */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                height: '300px',
                borderRadius: '14px',
                background: '#F1F5F9',
                overflow: 'hidden',
                position: 'relative',
                marginBottom: '10px'
              }}>
                <EquipmentImage
                  src={images[activeImageIndex] || item.image}
                  item={item}
                  alt={`${item.title} - angle ${activeImageIndex + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Condition Badge */}
                <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                  <span className="badge badge-green" style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.12)' }}>
                    Condition: {item.condition}
                  </span>
                </div>

                {/* View Angle Pill */}
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                  <span style={{
                    background: 'rgba(11, 21, 51, 0.75)',
                    color: '#FFFFFF',
                    backdropFilter: 'blur(4px)',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: '999px'
                  }}>
                    {activeImageIndex === 0 ? 'Front / Main View' : activeImageIndex === 1 ? 'Angled View' : activeImageIndex === 2 ? 'Kit & Accessories' : 'Condition Detail'}
                  </span>
                </div>
              </div>

              {images.length > 1 && (
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                    Multi-Angle Gallery ({images.length} Photos)
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {images.map((img, idx) => {
                      const angleName = idx === 0 ? 'Front' : idx === 1 ? 'Angle' : idx === 2 ? 'Accessories' : 'Detail';
                      const isSelected = activeImageIndex === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: isSelected ? '2px solid #1677FF' : '1px solid #E2E8F0',
                            boxShadow: isSelected ? '0 0 0 2px rgba(22, 119, 255, 0.25)' : 'none',
                            opacity: isSelected ? 1 : 0.65,
                            position: 'relative',
                            padding: 0,
                            cursor: 'pointer',
                            background: '#F8FAFC',
                            transition: 'all 0.15s ease'
                          }}
                          title={`Switch to ${angleName} view`}
                        >
                          <EquipmentImage
                            src={img}
                            item={item}
                            alt={`${item.title} ${angleName}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <span style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'rgba(11, 21, 51, 0.75)',
                            color: '#FFFFFF',
                            fontSize: '9px',
                            fontWeight: 600,
                            padding: '1px 2px',
                            textAlign: 'center',
                            backdropFilter: 'blur(2px)'
                          }}>
                            {angleName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Title & Description */}
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0B1533', marginBottom: '6px' }}>
              {item.title}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12.5px', color: '#64748B', marginBottom: '14px' }}>
              <span className="rating-pill">
                <Star size={11} fill="#F59E0B" color="#F59E0B" /> {item.rating} ({item.reviewsCount} reviews)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <MapPin size={13} color="#94A3B8" /> {item.location}
              </span>
            </div>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, marginBottom: '18px' }}>
              {item.description}
            </p>

            {/* Specifications Table */}
            {item.specs && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B1533', marginBottom: '8px' }}>
                  Specifications
                </h4>
                <div style={{
                  background: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  overflow: 'hidden'
                }}>
                  {Object.entries(item.specs).map(([key, val], idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        fontSize: '12.5px',
                        borderBottom: idx === Object.keys(item.specs).length - 1 ? 'none' : '1px solid #F1F5F9'
                      }}
                    >
                      <span style={{ color: '#64748B', fontWeight: 500 }}>{key}</span>
                      <span style={{ color: '#0B1533', fontWeight: 600 }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rental Rules */}
            {item.rentalRules && (
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#0B1533', marginBottom: '8px' }}>
                  Rental & Handover Rules
                </h4>
                <ul style={{ paddingLeft: '18px', fontSize: '12.5px', color: '#475569', lineHeight: 1.55 }}>
                  {item.rentalRules.map((rule, idx) => (
                    <li key={idx} style={{ marginBottom: '3px' }}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Owner Profile Card */}
            <div style={{
              background: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={item.owner.avatar}
                  alt={item.owner.name}
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#0B1533', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {item.owner.name}
                    <span style={{ color: '#1677FF', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '10.5px' }}>
                      <CheckCircle2 size={11} /> Verified
                    </span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                    Member since {item.owner.memberSince} • {item.owner.completedRentals} completed rentals
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right', fontSize: '11.5px', color: '#059669', fontWeight: 600 }}>
                Replies {item.owner.responseTime}
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Dynamic Rental Calculator */}
          <div style={{ padding: '24px', background: '#FAFCFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Daily Rate Display */}
              <div style={{ marginBottom: '18px' }}>
                <span style={{ fontSize: '12px', color: '#64748B' }}>Daily Rental Rate</span>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#1677FF' }}>
                  ₹{item.dailyRate}
                  <span style={{ fontSize: '14px', color: '#64748B', fontWeight: 500 }}> / day</span>
                </div>
              </div>

              {/* Duration Selector */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} color="#1677FF" /> Select Rental Duration
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                  {[1, 3, 7, 'custom'].map(dur => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setSelectedDuration(dur)}
                      style={{
                        padding: '8px 2px',
                        borderRadius: '8px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        textAlign: 'center',
                        background: selectedDuration === dur ? '#1677FF' : '#FFFFFF',
                        color: selectedDuration === dur ? '#FFFFFF' : '#334155',
                        border: selectedDuration === dur ? '1.5px solid #1677FF' : '1.5px solid #CBD5E1',
                        boxShadow: selectedDuration === dur ? '0 2px 8px rgba(22, 119, 255, 0.25)' : 'none'
                      }}
                    >
                      {dur === 'custom' ? 'Custom' : `${dur} ${dur === 1 ? 'Day' : 'Days'}`}
                    </button>
                  ))}
                </div>

                {selectedDuration === 'custom' && (
                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12.5px', color: '#64748B' }}>Number of days:</span>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={customDays}
                      onChange={e => setCustomDays(Math.max(1, Number(e.target.value)))}
                      style={{
                        width: '74px',
                        padding: '5px 8px',
                        borderRadius: '6px',
                        border: '1.5px solid #CBD5E1',
                        fontSize: '13.5px',
                        fontWeight: 700,
                        color: '#0B1533'
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Delivery / Pickup Choice */}
              <div className="form-group" style={{ marginBottom: '18px' }}>
                <label className="form-label">Handover Preference</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '8px',
                      border: deliveryMethod === 'pickup' ? '1.5px solid #1677FF' : '1px solid #CBD5E1',
                      background: deliveryMethod === 'pickup' ? '#EEF4FF' : '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: deliveryMethod === 'pickup' ? '#1677FF' : '#334155',
                      textAlign: 'center'
                    }}
                  >
                    📍 Self Pickup (Free)
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '8px',
                      border: deliveryMethod === 'delivery' ? '1.5px solid #1677FF' : '1px solid #CBD5E1',
                      background: deliveryMethod === 'delivery' ? '#EEF4FF' : '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: deliveryMethod === 'delivery' ? '#1677FF' : '#334155',
                      textAlign: 'center'
                    }}
                  >
                    🚚 Doorstep (+₹120)
                  </button>
                </div>
              </div>

              {/* Cost Breakdown Calculation Card */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                padding: '14px',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0B1533', marginBottom: '10px' }}>
                  Transparent Cost Breakdown
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#64748B', marginBottom: '6px' }}>
                  <span>Rental Fee ({effectiveDays} days × ₹{item.dailyRate})</span>
                  <span style={{ fontWeight: 600, color: '#0B1533' }}>₹{rentalFee}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#64748B', marginBottom: '6px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    Refundable Security Deposit
                    <Info size={12} color="#94A3B8" />
                  </span>
                  <span style={{ fontWeight: 600, color: '#059669' }}>₹{item.securityDeposit}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#64748B', marginBottom: '6px' }}>
                  <span>Platform Protection Fee</span>
                  <span style={{ fontWeight: 600, color: '#0B1533' }}>₹{platformFee}</span>
                </div>

                {deliveryMethod === 'delivery' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#64748B', marginBottom: '6px' }}>
                    <span>Doorstep Courier</span>
                    <span style={{ fontWeight: 600, color: '#0B1533' }}>₹120</span>
                  </div>
                )}

                <div style={{
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: '8px',
                  marginTop: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0B1533' }}>Total Payable Now</div>
                    <div style={{ fontSize: '10.5px', color: '#059669' }}>
                      (Includes ₹{item.securityDeposit} refundable deposit)
                    </div>
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#1677FF' }}>
                    ₹{totalPayableNow}
                  </span>
                </div>
              </div>

              {/* Escrow Trust Guarantee Note */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11.5px',
                color: '#475569',
                background: '#ECFDF5',
                padding: '8px 10px',
                borderRadius: '8px',
                border: '1px solid #A7F3D0',
                marginBottom: '16px'
              }}>
                <ShieldCheck size={16} color="#059669" style={{ flexShrink: 0 }} />
                <span>
                  <strong>Escrow Guarantee:</strong> Security deposit is held safely and refunded automatically on return.
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div>
              <button
                onClick={handleProceedToRent}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', fontSize: '15px' }}
              >
                <span>Rent Now — Pay ₹{totalPayableNow}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .details-modal-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
