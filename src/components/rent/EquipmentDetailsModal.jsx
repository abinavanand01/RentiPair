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
  ArrowRight,
  Heart,
  Scale,
  MessageSquare,
  Bell,
  GraduationCap,
  ShoppingBag,
  AlertCircle
} from 'lucide-react';

export default function EquipmentDetailsModal() {
  const {
    modalState,
    closeModal,
    openModal,
    currentUser,
    wishlist,
    toggleWishlist,
    isInWishlist,
    compareList,
    addToCompare,
    removeFromCompare,
    isInCompare,
    subscribeAvailabilityAlert,
    isAlertSubscribed,
    startOrGetConversation
  } = useApp();

  const [selectedDuration, setSelectedDuration] = useState(3); // 1, 3, 7, or custom
  const [customDays, setCustomDays] = useState(5);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup'); // 'pickup' | 'delivery'
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!modalState.details?.open || !modalState.details?.data) return null;

  const item = modalState.details.data;
  const isWishlisted = isInWishlist(item.id);
  const isCompared = isInCompare(item.id);
  const alertSubscribed = isAlertSubscribed(item.id);

  // Student pricing calculation
  const hasStudentDiscount = Boolean(item.student_discount_enabled || item.studentDiscountEnabled);
  const studentDiscountPct = item.student_discount_percent || item.studentDiscountPercent || 10;
  const studentDailyRate = hasStudentDiscount ? Math.round(item.dailyRate * (1 - studentDiscountPct / 100)) : item.dailyRate;
  const isUserStudent = Boolean(currentUser?.isStudentVerified);

  // Active rate based on student status
  const effectiveDailyRate = (hasStudentDiscount && isUserStudent) ? studentDailyRate : item.dailyRate;

  // Duration calculation
  const effectiveDays = selectedDuration === 'custom' ? customDays : selectedDuration;
  const rentalFee = effectiveDailyRate * effectiveDays;
  const platformFee = Math.max(20, Math.round(rentalFee * 0.05));
  const deliveryFee = deliveryMethod === 'delivery' ? 120 : 0;
  const totalPayableNow = rentalFee + item.securityDeposit + platformFee + deliveryFee;

  const handleProceedToRent = (isRentToBuy = false) => {
    closeModal('details');
    openModal('rent', {
      equipment: item,
      durationDays: effectiveDays,
      rentalFee,
      securityDeposit: item.securityDeposit,
      platformFee,
      deliveryFee,
      deliveryMethod,
      totalPayableNow,
      isRentToBuy,
      isStudentEligible: hasStudentDiscount && isUserStudent,
      studentDiscountApplied: (hasStudentDiscount && isUserStudent) ? (item.dailyRate - studentDailyRate) * effectiveDays : 0
    });
  };

  const handleMessageOwner = () => {
    closeModal('details');
    startOrGetConversation({
      recipientId: item.owner?.id,
      recipientName: item.owner?.name || 'Owner',
      recipientAvatar: item.owner?.avatar || '',
      equipmentId: item.id,
      equipmentTitle: item.title,
      title: `Inquiry regarding ${item.title}`
    });
  };

  const images = item.images && item.images.length > 0 ? item.images : [item.image];

  return (
    <div className="modal-overlay" onClick={() => closeModal('details')}>
      <div
        className="modal-content extra-wide"
        onClick={e => e.stopPropagation()}
        style={{
          padding: 0,
          overflow: 'hidden',
          background: '#0E1330',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 24px 64px -16px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Header Bar */}
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(10, 15, 36, 0.95)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge badge-blue">{item.category}</span>
            <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>
              {item.brand} {item.model ? `• ${item.model}` : ''}
            </span>
          </div>

          {/* Quick Actions in Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => toggleWishlist(item.id)}
              className="btn btn-outline btn-sm"
              style={{
                borderColor: isWishlisted ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.12)',
                color: isWishlisted ? '#EF4444' : '#E2E8F0',
                background: isWishlisted ? 'rgba(239, 68, 68, 0.12)' : 'rgba(255, 255, 255, 0.04)'
              }}
            >
              <Heart size={14} fill={isWishlisted ? '#EF4444' : 'none'} color={isWishlisted ? '#EF4444' : '#94A3B8'} />
              <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
            </button>

            {/* Compare Button */}
            <button
              type="button"
              onClick={() => {
                if (isCompared) {
                  removeFromCompare(item.id);
                } else {
                  addToCompare(item);
                }
              }}
              className="btn btn-outline btn-sm"
              style={{
                borderColor: isCompared ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255, 255, 255, 0.12)',
                color: isCompared ? '#60A5FA' : '#E2E8F0',
                background: isCompared ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.04)'
              }}
            >
              <Scale size={14} />
              <span>{isCompared ? '✓ Compared' : '+ Compare'}</span>
            </button>

            <button
              type="button"
              onClick={() => closeModal('details')}
              style={{ color: '#94A3B8', padding: '6px', borderRadius: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body: 2 Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          maxHeight: 'calc(90vh - 64px)',
          overflowY: 'auto'
        }} className="details-modal-grid">

          {/* Left Column: Gallery, Specs, Rules, Owner */}
          <div style={{ padding: '24px', borderRight: '1px solid rgba(255, 255, 255, 0.08)' }}>
            {/* Image Gallery */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                height: '300px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
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
                  <span className="badge badge-green" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
                    Condition: {item.condition}
                  </span>
                </div>

                {/* Availability status badge */}
                <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                  {item.isAvailable ? (
                    <span style={{
                      background: 'rgba(16, 185, 129, 0.9)',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '999px',
                      backdropFilter: 'blur(4px)'
                    }}>
                      ✓ Available Now
                    </span>
                  ) : (
                    <span style={{
                      background: 'rgba(239, 68, 68, 0.9)',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '999px',
                      backdropFilter: 'blur(4px)'
                    }}>
                      Currently Rented
                    </span>
                  )}
                </div>
              </div>

              {images.length > 1 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {images.map((img, idx) => {
                    const isSelected = activeImageIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '10px',
                          overflow: 'hidden',
                          border: isSelected ? '2px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.1)',
                          padding: 0,
                          cursor: 'pointer',
                          background: 'rgba(255, 255, 255, 0.04)'
                        }}
                      >
                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Title & Description */}
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px', lineHeight: 1.3 }}>
              {item.title}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span className="rating-pill">
                <Star size={12} fill="#F59E0B" color="#F59E0B" />
                <span>{item.rating || 0}</span>
                <span style={{ fontSize: '11px', color: '#FCD34D' }}>({item.reviewsCount || 0} reviews)</span>
              </span>

              <span style={{ fontSize: '13px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} color="#64748B" /> {item.location || item.city}
              </span>
            </div>

            {/* Student Discount Highlight Banner */}
            {hasStudentDiscount && (
              <div style={{
                background: 'rgba(139, 92, 246, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.35)',
                borderRadius: '12px',
                padding: '12px 14px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GraduationCap size={20} color="#C4B5FD" />
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#DDD6FE' }}>
                      🎓 Student Special: ₹{studentDailyRate}/day ({studentDiscountPct}% Off)
                    </div>
                    <div style={{ fontSize: '11px', color: '#A78BFA' }}>
                      {isUserStudent ? '✓ Active on your student-verified account' : 'Verify student ID to unlock this rate'}
                    </div>
                  </div>
                </div>

                {!isUserStudent && (
                  <button
                    type="button"
                    onClick={() => openModal('studentVerify')}
                    className="btn btn-violet btn-sm"
                    style={{ fontSize: '11px', height: '28px', padding: '0 10px' }}
                  >
                    Verify ID
                  </button>
                )}
              </div>
            )}

            {/* Rent-to-Buy Card */}
            {(item.rent_to_buy_enabled || item.rentToBuyEnabled) && (
              <div style={{
                background: 'rgba(249, 115, 22, 0.12)',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                borderRadius: '12px',
                padding: '12px 14px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: '#FB923C', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShoppingBag size={15} /> Rent-to-Buy Available
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#FDBA74' }}>
                    Purchase: ₹{item.purchase_price || item.purchasePrice}
                  </span>
                </div>
                <p style={{ fontSize: '11.5px', color: '#FED7AA', margin: 0, lineHeight: 1.4 }}>
                  {item.rent_to_buy_terms || 'Love using this gear? You can convert your rental into a direct purchase anytime during your lease.'}
                </p>
              </div>
            )}

            <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '20px' }}>
              {item.description}
            </p>

            {/* Verified Owner Card with Message Button */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {item.owner?.avatar ? (
                  <img src={item.owner.avatar} alt={item.owner.name} style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                    {item.owner?.name ? item.owner.name.charAt(0) : 'O'}
                  </div>
                )}
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {item.owner?.name || 'Verified Owner'}
                    <CheckCircle2 size={13} color="#3B82F6" />
                  </div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                    {item.city} • Verified Identity &amp; Escrow Owner
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleMessageOwner}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '12px' }}
              >
                <MessageSquare size={13} />
                <span>Message Owner</span>
              </button>
            </div>
          </div>

          {/* Right Column: Pricing & Rental Calculation */}
          <div style={{ padding: '24px', background: 'rgba(10, 15, 36, 0.95)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Daily Price Header */}
              <div style={{
                background: 'rgba(14, 19, 48, 0.8)',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '16px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Daily Rental Rate</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '28px', fontWeight: 800, color: '#3B82F6' }}>
                    ₹{effectiveDailyRate}
                  </span>
                  <span style={{ fontSize: '13px', color: '#94A3B8' }}>/ day</span>
                  {hasStudentDiscount && isUserStudent && (
                    <span style={{ fontSize: '12px', color: '#A78BFA', fontWeight: 700, marginLeft: '6px' }}>
                      (🎓 Student Rate)
                    </span>
                  )}
                </div>
              </div>

              {/* Duration Selector */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Rental Duration</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                  {[1, 3, 7, 'custom'].map(d => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDuration(d)}
                      style={{
                        padding: '9px 4px',
                        borderRadius: '8px',
                        border: selectedDuration === d ? '2px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: selectedDuration === d ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        color: selectedDuration === d ? '#60A5FA' : '#CBD5E1',
                        fontWeight: 700,
                        fontSize: '12.5px',
                        cursor: 'pointer'
                      }}
                    >
                      {d === 'custom' ? 'Custom' : `${d} Day${d > 1 ? 's' : ''}`}
                    </button>
                  ))}
                </div>

                {selectedDuration === 'custom' && (
                  <div style={{ marginTop: '10px' }}>
                    <input
                      type="number"
                      min="1"
                      max="90"
                      value={customDays}
                      onChange={e => setCustomDays(Math.max(1, Number(e.target.value)))}
                      className="form-input"
                      placeholder="Number of days"
                    />
                  </div>
                )}
              </div>

              {/* Handover Preference */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label">Handover Method</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    style={{
                      flex: 1,
                      padding: '9px',
                      borderRadius: '8px',
                      border: deliveryMethod === 'pickup' ? '1.5px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: deliveryMethod === 'pickup' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: deliveryMethod === 'pickup' ? '#60A5FA' : '#CBD5E1',
                      cursor: 'pointer'
                    }}
                  >
                    📍 Self Pickup (Free)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    style={{
                      flex: 1,
                      padding: '9px',
                      borderRadius: '8px',
                      border: deliveryMethod === 'delivery' ? '1.5px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.1)',
                      background: deliveryMethod === 'delivery' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: deliveryMethod === 'delivery' ? '#60A5FA' : '#CBD5E1',
                      cursor: 'pointer'
                    }}
                  >
                    🚚 Courier (+₹120)
                  </button>
                </div>
              </div>

              {/* Calculation Summary Card */}
              <div style={{
                background: 'rgba(14, 19, 48, 0.8)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '14px',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
                  Transparent Cost Breakdown
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#94A3B8', marginBottom: '6px' }}>
                  <span>Rental ({effectiveDays} days × ₹{effectiveDailyRate})</span>
                  <span style={{ fontWeight: 600, color: '#FFFFFF' }}>₹{rentalFee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#94A3B8', marginBottom: '6px' }}>
                  <span>Refundable Security Deposit</span>
                  <span style={{ fontWeight: 600, color: '#34D399' }}>₹{item.securityDeposit}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#94A3B8', marginBottom: '6px' }}>
                  <span>Platform Escrow Fee</span>
                  <span style={{ fontWeight: 600, color: '#FFFFFF' }}>₹{platformFee}</span>
                </div>
                {deliveryMethod === 'delivery' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: '#94A3B8', marginBottom: '6px' }}>
                    <span>Courier Delivery</span>
                    <span style={{ fontWeight: 600, color: '#FFFFFF' }}>₹120</span>
                  </div>
                )}
                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '8px',
                  marginTop: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#FFFFFF' }}>Total Payable Now</div>
                    <div style={{ fontSize: '10.5px', color: '#34D399' }}>(Includes ₹{item.securityDeposit} refundable deposit)</div>
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: 800, color: '#3B82F6' }}>₹{totalPayableNow}</span>
                </div>
              </div>

              {/* Escrow Guarantee */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '11.5px',
                color: '#CBD5E1',
                background: 'rgba(16, 185, 129, 0.12)',
                padding: '8px 10px',
                borderRadius: '8px',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                marginBottom: '16px'
              }}>
                <ShieldCheck size={16} color="#34D399" style={{ flexShrink: 0 }} />
                <span>
                  <strong style={{ color: '#FFFFFF' }}>Escrow Protected:</strong> Security deposit is automatically refunded upon return verification.
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div>
              {item.isAvailable ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => handleProceedToRent(false)}
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%', fontSize: '15px' }}
                  >
                    <span>Rent Now — Pay ₹{totalPayableNow}</span>
                    <ArrowRight size={16} />
                  </button>

                  {(item.rent_to_buy_enabled || item.rentToBuyEnabled) && (
                    <button
                      type="button"
                      onClick={() => handleProceedToRent(true)}
                      className="btn btn-orange"
                      style={{ width: '100%', fontSize: '13.5px' }}
                    >
                      <ShoppingBag size={15} />
                      <span>Start Rent-to-Buy Option</span>
                    </button>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    fontSize: '12.5px',
                    color: '#F87171',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Clock size={16} />
                    <span>
                      Currently Rented {item.currentlyRentedUntil ? `until ${new Date(item.currentlyRentedUntil).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}` : ''}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => subscribeAvailabilityAlert(item.id)}
                    className={alertSubscribed ? 'btn btn-outline' : 'btn btn-orange'}
                    style={{ width: '100%', height: '44px' }}
                  >
                    <Bell size={16} />
                    <span>{alertSubscribed ? 'Subscribed to Availability Alert 🔔' : 'Notify Me When Available'}</span>
                  </button>
                </div>
              )}
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
