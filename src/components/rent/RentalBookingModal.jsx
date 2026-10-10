import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import EquipmentImage from '../common/EquipmentImage';
import {
  X,
  CheckCircle,
  CreditCard,
  ShieldCheck,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Lock,
  GraduationCap,
  Info,
  Sparkles
} from 'lucide-react';

export default function RentalBookingModal() {
  const { modalState, closeModal, createRentalOrder, navigateTo, currentUser, isStudentVerified } = useApp();
  const [step, setStep] = useState(1); // 1: Dates & Delivery, 2: Price Review & Add-ons, 3: Payment, 4: Confirmed
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [createdOrder, setCreatedOrder] = useState(null);
  const [damageProtection, setDamageProtection] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!modalState.rent?.open || !modalState.rent?.data) return null;

  const data = modalState.rent.data;
  const item = data.equipment;

  // Student discount verification
  const isUserStudent = isStudentVerified(currentUser?.id);
  const hasStudentDiscount = Boolean(item.student_discount_enabled || item.studentDiscountPercent);
  const studentDiscountPct = item.student_discount_percent || 10;
  const isStudentEligible = isUserStudent && hasStudentDiscount;
  const studentDiscountAmount = isStudentEligible
    ? Math.round(data.rentalFee * (studentDiscountPct / 100))
    : (data.studentDiscountApplied || 0);

  // Rent to Buy
  const isRentToBuyMode = Boolean(data.isRentToBuy || item.rent_to_buy_enabled);
  const purchasePrice = item.purchase_price || item.purchasePrice || 35000;

  // Damage protection fee
  const damageProtectionFee = damageProtection ? 79 : 0;

  // Recalculated total
  const adjustedRentalFee = Math.max(0, data.rentalFee - studentDiscountAmount);
  const netTotalPayable = adjustedRentalFee + data.securityDeposit + data.platformFee + data.deliveryFee + damageProtectionFee;

  // Calculate dates
  const today = new Date();
  const startDateStr = today.toISOString().split('T')[0];
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + data.durationDays);
  const endDateStr = endDate.toISOString().split('T')[0];

  const handleConfirmPayment = async () => {
    setIsSubmitting(true);
    const order = await createRentalOrder({
      equipmentId: item.id,
      equipmentTitle: item.title,
      equipmentImage: item.image,
      ownerId: item.owner?.id,
      ownerName: item.owner?.name,
      startDate: startDateStr,
      endDate: endDateStr,
      durationDays: data.durationDays,
      dailyRate: item.dailyRate,
      rentalFee: data.rentalFee,
      studentDiscountApplied: studentDiscountAmount,
      damageProtectionSelected: damageProtection,
      damageProtectionFee,
      isRentToBuy: isRentToBuyMode,
      purchasePrice: isRentToBuyMode ? purchasePrice : null,
      securityDeposit: data.securityDeposit,
      platformFee: data.platformFee,
      deliveryFee: data.deliveryFee,
      totalPaid: netTotalPayable,
      deliveryOption: data.deliveryMethod === 'delivery' ? `Doorstep Delivery (${deliveryAddress || 'Address on profile'})` : `Self Pickup (${item.location})`,
      paymentMethod: paymentMethod === 'upi' ? `UPI (${upiId || 'instant@upi'})` : 'Credit/Debit Card',
      trackingId: `RP-RNT-${Math.floor(100000 + Math.random() * 900000)}`
    });

    setIsSubmitting(false);
    if (order) {
      setCreatedOrder(order);
      setStep(4);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => closeModal('rent')}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          padding: '28px',
          maxWidth: '600px',
          background: '#0E1330',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 24px 64px -16px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              STEP {step} OF 3 • RENTAL CHECKOUT
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>
              {step === 4 ? 'Rental Order Confirmed!' : 'Complete Rental Booking'}
            </h3>
          </div>
          <button onClick={() => closeModal('rent')} style={{ color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Step Progress Bar */}
        {step < 4 && (
          <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
            {[1, 2, 3].map(s => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: '4px',
                  borderRadius: '2px',
                  background: step >= s ? '#3B82F6' : 'rgba(255, 255, 255, 0.08)',
                  transition: 'background 0.2s'
                }}
              />
            ))}
          </div>
        )}

        {/* STEP 1: Dates & Delivery Option */}
        {step === 1 && (
          <div>
            <div style={{
              display: 'flex',
              gap: '14px',
              padding: '14px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '20px'
            }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: '#0F172A' }}>
                <EquipmentImage item={item} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14.5px', color: '#FFFFFF' }}>{item.title}</div>
                <div style={{ fontSize: '12.5px', color: '#94A3B8' }}>{item.category} • ₹{item.dailyRate}/day</div>
                <div style={{ fontSize: '12px', color: '#34D399', fontWeight: 600 }}>Owner: {item.owner?.name || 'Verified Owner'}</div>
              </div>
            </div>

            {/* Rent-to-Buy Notice Banner */}
            {isRentToBuyMode && (
              <div style={{
                background: 'rgba(139, 92, 246, 0.12)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '10px',
                padding: '12px 14px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '12.5px',
                color: '#C4B5FD'
              }}>
                <Sparkles size={18} color="#A78BFA" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ color: '#FFFFFF' }}>Rent-to-Buy Eligible:</strong> 70% of this rental fee can be credited towards outright buyout (Purchase Price: ₹{purchasePrice.toLocaleString()}).
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Rental Duration Period</label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '10px',
                border: '1px solid rgba(59, 130, 246, 0.25)'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#93C5FD', fontWeight: 600 }}>START DATE</div>
                  <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{startDateStr} (Today)</div>
                </div>
                <ArrowRight size={16} color="#60A5FA" />
                <div>
                  <div style={{ fontSize: '11px', color: '#93C5FD', fontWeight: 600 }}>RETURN BY</div>
                  <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{endDateStr}</div>
                </div>
                <div style={{
                  background: '#3B82F6',
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 700
                }}>
                  {data.durationDays} Days
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Handover Address / Pickup Location</label>
              {data.deliveryMethod === 'delivery' ? (
                <textarea
                  className="form-textarea"
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  placeholder="Enter complete doorstep delivery address..."
                  style={{ minHeight: '70px' }}
                />
              ) : (
                <div style={{
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '13px',
                  color: '#CBD5E1'
                }}>
                  📍 <strong style={{ color: '#FFFFFF' }}>Self Pickup Location:</strong> {item.location} (Detailed address & owner contact shared upon payment confirmation)
                </div>
              )}
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '12px' }}
            >
              <span>Review Price & Add-ons</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: Price Review, Damage Protection & Student Discount Breakdown */}
        {step === 2 && (
          <div>
            {/* Optional Damage Protection Option Card */}
            <div style={{
              background: damageProtection ? 'rgba(6, 182, 212, 0.1)' : 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: damageProtection ? '1.5px solid rgba(6, 182, 212, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
              padding: '16px',
              marginBottom: '16px',
              transition: 'all 0.2s'
            }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={damageProtection}
                  onChange={e => setDamageProtection(e.target.checked)}
                  style={{ marginTop: '3px', accentColor: '#06B6D4', width: '17px', height: '17px' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800, fontSize: '14px', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShieldCheck size={16} color="#06B6D4" />
                      Add RentiPair Damage Protection
                    </div>
                    <span style={{ fontWeight: 800, color: '#06B6D4', fontSize: '14px' }}>+₹79</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#94A3B8', margin: '6px 0 0', lineHeight: 1.45 }}>
                    <strong>Covers:</strong> Accidental drops, liquid spills, minor casing scratches, component faults up to ₹25,000.
                  </p>
                  <p style={{ fontSize: '11px', color: '#64748B', margin: '4px 0 0', lineHeight: 1.4 }}>
                    <strong>Exclusions:</strong> Intentional destruction, theft without official police FIR, total loss, unauthorized disassembly.
                  </p>
                  <div style={{
                    marginTop: '8px',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    background: 'rgba(6, 182, 212, 0.1)',
                    fontSize: '10.5px',
                    color: '#67E8F9',
                    lineHeight: 1.3
                  }}>
                    ℹ️ <em>Important Disclosure: RentiPair Damage Protection is an in-house platform damage waiver program and is not a statutory commercial insurance policy.</em>
                  </div>
                </div>
              </label>
            </div>

            {/* Student Discount Line if applicable */}
            {isStudentEligible && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '10px',
                padding: '10px 14px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12.5px',
                color: '#6EE7B7'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                  <GraduationCap size={16} /> 🎓 Student Verified Discount Applied ({studentDiscountPct}%)
                </span>
                <span style={{ fontWeight: 800, color: '#34D399' }}>-₹{studentDiscountAmount}</span>
              </div>
            )}

            {/* Itemized Order Summary */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '16px',
              marginBottom: '18px'
            }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
                Itemized Checkout Summary
              </h4>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#94A3B8', marginBottom: '8px' }}>
                <span>Equipment Rental ({data.durationDays} days @ ₹{item.dailyRate})</span>
                <span style={{ fontWeight: 600, color: '#FFFFFF' }}>₹{data.rentalFee}</span>
              </div>

              {isStudentEligible && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#34D399', marginBottom: '8px' }}>
                  <span>Student Discount ({studentDiscountPct}%)</span>
                  <span style={{ fontWeight: 700 }}>-₹{studentDiscountAmount}</span>
                </div>
              )}

              {damageProtection && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#06B6D4', marginBottom: '8px' }}>
                  <span>RentiPair Damage Protection</span>
                  <span style={{ fontWeight: 700 }}>₹79</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#94A3B8', marginBottom: '8px' }}>
                <span style={{ color: '#34D399', fontWeight: 600 }}>Refundable Security Deposit (Held in Escrow)</span>
                <span style={{ fontWeight: 700, color: '#34D399' }}>₹{data.securityDeposit}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#94A3B8', marginBottom: '8px' }}>
                <span>Platform Trust & Guarantee Fee</span>
                <span style={{ fontWeight: 600, color: '#FFFFFF' }}>₹{data.platformFee}</span>
              </div>

              {data.deliveryFee > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#94A3B8', marginBottom: '8px' }}>
                  <span>Doorstep Courier Fee</span>
                  <span style={{ fontWeight: 600, color: '#FFFFFF' }}>₹{data.deliveryFee}</span>
                </div>
              )}

              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '10px',
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <span style={{ fontWeight: 800, fontSize: '15px', color: '#FFFFFF', display: 'block' }}>Total Payable Now</span>
                  <span style={{ fontSize: '11px', color: '#34D399' }}>Includes ₹{data.securityDeposit} refundable deposit</span>
                </div>
                <span style={{ fontWeight: 800, fontSize: '22px', color: '#3B82F6' }}>₹{netTotalPayable}</span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '10px',
              marginBottom: '20px',
              fontSize: '12.5px',
              color: '#6EE7B7'
            }}>
              <ShieldCheck size={20} color="#34D399" style={{ flexShrink: 0 }} />
              <div>
                <strong>Deposit Safety:</strong> ₹{data.securityDeposit} is placed in a secure bank escrow account. If returned undamaged as verified by the checklist, it is refunded automatically.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setStep(1)}
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn btn-primary"
                style={{ flex: 2 }}
              >
                <span>Proceed to Payment</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Demo Payment Method */}
        {step === 3 && (
          <div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Select Payment Gateway</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: paymentMethod === 'upi' ? '2px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: paymentMethod === 'upi' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    style={{ accentColor: '#3B82F6' }}
                  />
                  <Smartphone size={20} color="#3B82F6" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#FFFFFF' }}>UPI (Instant / Zero Fee)</div>
                    <div style={{ fontSize: '11.5px', color: '#94A3B8' }}>Google Pay, PhonePe, Paytm, BHIM</div>
                  </div>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: paymentMethod === 'card' ? '2px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: paymentMethod === 'card' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    style={{ accentColor: '#3B82F6' }}
                  />
                  <CreditCard size={20} color="#3B82F6" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#FFFFFF' }}>Credit / Debit Card</div>
                    <div style={{ fontSize: '11.5px', color: '#94A3B8' }}>Visa, MasterCard, RuPay</div>
                  </div>
                </label>
              </div>
            </div>

            {paymentMethod === 'upi' && (
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">Virtual Payment Address (VPA)</label>
                <input
                  type="text"
                  className="form-input"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                />
              </div>
            )}

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '12px',
              color: '#94A3B8',
              marginBottom: '20px'
            }}>
              <Lock size={13} color="#34D399" /> 256-Bit SSL Encrypted Escrow Transaction
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setStep(2)}
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Back
              </button>
              <button
                onClick={handleConfirmPayment}
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ flex: 2 }}
              >
                <span>{isSubmitting ? 'Securing Escrow Payment...' : `Authorize & Pay ₹${netTotalPayable}`}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Order Confirmed Screen */}
        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              border: '2px solid #10B981',
              boxShadow: '0 0 25px rgba(16, 185, 129, 0.35)'
            }}>
              <CheckCircle size={36} color="#10B981" />
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
              Rental Confirmed!
            </h3>

            <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '20px' }}>
              Order ID: <strong style={{ color: '#FFFFFF' }}>#{createdOrder?.id}</strong><br />
              Status: <span style={{ color: '#34D399', fontWeight: 700 }}>ACTIVE</span> • Escrow Deposit ₹{data.securityDeposit} Safely Secured
            </p>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '16px',
              textAlign: 'left',
              fontSize: '13px',
              marginBottom: '24px'
            }}>
              <div style={{ marginBottom: '6px' }}><strong style={{ color: '#FFFFFF' }}>Item:</strong> <span style={{ color: '#CBD5E1' }}>{item.title}</span></div>
              <div style={{ marginBottom: '6px' }}><strong style={{ color: '#FFFFFF' }}>Return Deadline:</strong> <span style={{ color: '#CBD5E1' }}>{endDateStr}</span></div>
              <div style={{ marginBottom: '6px' }}><strong style={{ color: '#FFFFFF' }}>Owner Handover Contact:</strong> <span style={{ color: '#CBD5E1' }}>{item.owner.name} (+91 98401 22890)</span></div>
              <div><strong style={{ color: '#FFFFFF' }}>Tracking ID:</strong> <code style={{ color: '#60A5FA' }}>{createdOrder?.trackingId}</code></div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => closeModal('rent')}
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  closeModal('rent');
                  navigateTo('dashboard', { tab: 'rentals' });
                }}
                className="btn btn-primary"
                style={{ flex: 2 }}
              >
                <span>View in Dashboard</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
