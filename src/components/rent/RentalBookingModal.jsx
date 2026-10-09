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
  Lock
} from 'lucide-react';

export default function RentalBookingModal() {
  const { modalState, closeModal, createRentalOrder, navigateTo } = useApp();
  const [step, setStep] = useState(1); // 1: Dates & Delivery, 2: Price Review, 3: Payment, 4: Confirmed
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('aditya@oksbi');
  const [deliveryAddress, setDeliveryAddress] = useState('Flat 4B, Shanthi Heights, T. Nagar, Chennai');
  const [createdOrder, setCreatedOrder] = useState(null);

  if (!modalState.rent?.open || !modalState.rent?.data) return null;

  const data = modalState.rent.data;
  const item = data.equipment;

  // Calculate dates
  const today = new Date();
  const startDateStr = today.toISOString().split('T')[0];
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + data.durationDays);
  const endDateStr = endDate.toISOString().split('T')[0];

  const handleConfirmPayment = () => {
    const order = createRentalOrder({
      equipmentId: item.id,
      equipmentTitle: item.title,
      equipmentImage: item.image,
      ownerId: item.owner.id,
      ownerName: item.owner.name,
      startDate: startDateStr,
      endDate: endDateStr,
      durationDays: data.durationDays,
      dailyRate: item.dailyRate,
      rentalFee: data.rentalFee,
      securityDeposit: data.securityDeposit,
      platformFee: data.platformFee,
      totalPaid: data.totalPayableNow,
      deliveryOption: data.deliveryMethod === 'delivery' ? `Doorstep Delivery (${deliveryAddress})` : `Self Pickup (${item.location})`,
      paymentMethod: paymentMethod === 'upi' ? `UPI (${upiId})` : 'Credit/Debit Card',
      trackingId: `RP-RNT-${Math.floor(100000 + Math.random() * 900000)}`
    });

    setCreatedOrder(order);
    setStep(4);
  };

  return (
    <div className="modal-overlay" onClick={() => closeModal('rent')}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{ padding: '28px', maxWidth: '580px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              STEP {step} OF 3 • RENTAL CHECKOUT
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>
              {step === 4 ? 'Rental Order Confirmed!' : 'Complete Rental Booking'}
            </h3>
          </div>
          <button onClick={() => closeModal('rent')} style={{ color: '#64748B' }}>
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
                  background: step >= s ? '#0066FF' : '#E2E8F0',
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
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              marginBottom: '20px'
            }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                <EquipmentImage item={item} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14.5px', color: '#0F172A' }}>{item.title}</div>
                <div style={{ fontSize: '12.5px', color: '#64748B' }}>{item.category} • ₹{item.dailyRate}/day</div>
                <div style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>Owner: {item.owner.name}</div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Rental Duration Period</label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: '#EFF6FF',
                borderRadius: '10px',
                border: '1px solid #BFDBFE'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#1E40AF', fontWeight: 600 }}>START DATE</div>
                  <div style={{ fontWeight: 700, color: '#1E3A8A' }}>{startDateStr} (Today)</div>
                </div>
                <ArrowRight size={16} color="#3B82F6" />
                <div>
                  <div style={{ fontSize: '11px', color: '#1E40AF', fontWeight: 600 }}>RETURN BY</div>
                  <div style={{ fontWeight: 700, color: '#1E3A8A' }}>{endDateStr}</div>
                </div>
                <div style={{
                  background: '#0066FF',
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
                  background: '#F8FAFC',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  fontSize: '13px',
                  color: '#334155'
                }}>
                  📍 <strong>Self Pickup Location:</strong> {item.location} (Detailed address & owner contact shared upon payment confirmation)
                </div>
              )}
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '12px' }}
            >
              <span>Review Price & Escrow Terms</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: Price Review & Security Deposit Breakdown */}
        {step === 2 && (
          <div>
            <div style={{
              background: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>
                Order Summary & Escrow Protection
              </h4>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748B', marginBottom: '8px' }}>
                <span>Rental Charge ({data.durationDays} days @ ₹{item.dailyRate})</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>₹{data.rentalFee}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748B', marginBottom: '8px' }}>
                <span style={{ color: '#059669', fontWeight: 600 }}>Refundable Security Deposit (Held in Escrow)</span>
                <span style={{ fontWeight: 700, color: '#059669' }}>₹{data.securityDeposit}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748B', marginBottom: '8px' }}>
                <span>Platform Trust & Guarantee Fee</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>₹{data.platformFee}</span>
              </div>

              {data.deliveryFee > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748B', marginBottom: '8px' }}>
                  <span>Doorstep Courier Fee</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>₹{data.deliveryFee}</span>
                </div>
              )}

              <div style={{
                borderTop: '1px solid #E2E8F0',
                paddingTop: '10px',
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: 800, fontSize: '15px', color: '#0F172A' }}>Total Payment Due</span>
                <span style={{ fontWeight: 800, fontSize: '22px', color: '#0066FF' }}>₹{data.totalPayableNow}</span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px',
              background: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: '10px',
              marginBottom: '20px',
              fontSize: '12.5px',
              color: '#065F46'
            }}>
              <ShieldCheck size={20} color="#059669" style={{ flexShrink: 0 }} />
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
                  border: paymentMethod === 'upi' ? '2px solid #0066FF' : '1px solid #CBD5E1',
                  background: paymentMethod === 'upi' ? '#EFF6FF' : '#FFFFFF',
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    style={{ accentColor: '#0066FF' }}
                  />
                  <Smartphone size={20} color="#0066FF" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>UPI (Instant / Zero Fee)</div>
                    <div style={{ fontSize: '11.5px', color: '#64748B' }}>Google Pay, PhonePe, Paytm, BHIM</div>
                  </div>
                </label>

                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: paymentMethod === 'card' ? '2px solid #0066FF' : '1px solid #CBD5E1',
                  background: paymentMethod === 'card' ? '#EFF6FF' : '#FFFFFF',
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    style={{ accentColor: '#0066FF' }}
                  />
                  <CreditCard size={20} color="#0066FF" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>Credit / Debit Card</div>
                    <div style={{ fontSize: '11.5px', color: '#64748B' }}>Visa, MasterCard, RuPay</div>
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
              color: '#64748B',
              marginBottom: '20px'
            }}>
              <Lock size={13} color="#059669" /> 256-Bit SSL Encrypted Escrow Transaction
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
                className="btn btn-primary"
                style={{ flex: 2 }}
              >
                <span>Authorize & Pay ₹{data.totalPayableNow}</span>
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
              background: '#ECFDF5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              border: '2px solid #10B981'
            }}>
              <CheckCircle size={36} color="#059669" />
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Rental Confirmed!
            </h3>

            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px' }}>
              Order ID: <strong>#{createdOrder?.id}</strong><br />
              Status: <span style={{ color: '#059669', fontWeight: 700 }}>ACTIVE</span> • Escrow Deposit ₹{data.securityDeposit} Safely Secured
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
              <div style={{ marginBottom: '6px' }}><strong>Item:</strong> {item.title}</div>
              <div style={{ marginBottom: '6px' }}><strong>Return Deadline:</strong> {endDateStr}</div>
              <div style={{ marginBottom: '6px' }}><strong>Owner Handover Contact:</strong> {item.owner.name} (+91 98401 22890)</div>
              <div><strong>Tracking ID:</strong> <code>{createdOrder?.trackingId}</code></div>
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
