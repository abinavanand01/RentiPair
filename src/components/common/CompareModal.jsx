import React from 'react';
import { useApp } from '../../context/AppContext';
import EquipmentImage from './EquipmentImage';
import {
  X,
  Trash2,
  Star,
  CheckCircle2,
  XCircle,
  MapPin,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Plus
} from 'lucide-react';

export default function CompareModal() {
  const {
    modalState,
    closeModal,
    compareList,
    removeFromCompare,
    clearCompare,
    openModal,
    navigateTo
  } = useApp();

  if (!modalState.compare?.open) return null;

  return (
    <div className="modal-overlay" onClick={() => closeModal('compare')}>
      <div
        className="modal-content extra-wide"
        onClick={e => e.stopPropagation()}
        style={{
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #0B1028 0%, #060919 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(59, 130, 246, 0.15)',
          borderRadius: '20px'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '18px 26px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(180deg, rgba(20, 30, 70, 0.6) 0%, rgba(11, 16, 40, 0.4) 100%)',
          backdropFilter: 'blur(16px)'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              SIDE-BY-SIDE EVALUATION ({compareList.length}/4)
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginTop: '2px' }}>
              Compare Equipment
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {compareList.length > 0 && (
              <button
                type="button"
                onClick={clearCompare}
                className="btn btn-ghost btn-sm"
                style={{ color: '#F87171', borderColor: 'rgba(239, 68, 68, 0.25)' }}
              >
                <Trash2 size={14} /> Clear All
              </button>
            )}
            <button
              type="button"
              onClick={() => closeModal('compare')}
              style={{
                color: '#94A3B8',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '6px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
              onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {compareList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚖️</div>
              <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
                No equipment added to compare yet
              </h4>
              <p style={{ fontSize: '14px', maxWidth: '420px', margin: '0 auto 20px', color: '#94A3B8', lineHeight: 1.5 }}>
                Click the <strong style={{ color: '#38BDF8' }}>[ + Compare ]</strong> button on any equipment card in the marketplace to compare specs, rental rates, ratings, and terms side by side.
              </p>
              <button
                type="button"
                onClick={() => { closeModal('compare'); navigateTo('rent'); }}
                className="btn btn-primary"
              >
                Browse Marketplace
              </button>
            </div>
          ) : (
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table style={{
                width: '100%',
                minWidth: `${Math.max(650, compareList.length * 240 + 160)}px`,
                borderCollapse: 'separate',
                borderSpacing: '12px 0'
              }}>
                <thead>
                  <tr>
                    <th style={{ width: '160px', textAlign: 'left', padding: '12px 8px', color: '#64748B', fontSize: '12.5px', fontWeight: 700 }}>
                      Feature
                    </th>
                    {compareList.map(item => (
                      <th key={item.id} style={{ verticalAlign: 'top', padding: '8px', minWidth: '220px' }}>
                        <div style={{
                          background: 'rgba(17, 24, 54, 0.75)',
                          borderRadius: '16px',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          padding: '14px',
                          position: 'relative',
                          textAlign: 'left'
                        }}>
                          <button
                            type="button"
                            onClick={() => removeFromCompare(item.id)}
                            style={{
                              position: 'absolute',
                              top: '8px',
                              right: '8px',
                              background: 'rgba(255, 255, 255, 0.08)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              borderRadius: '50%',
                              width: '24px',
                              height: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#94A3B8',
                              cursor: 'pointer'
                            }}
                            title="Remove"
                          >
                            <X size={13} />
                          </button>

                          <div style={{ width: '100%', height: '110px', borderRadius: '10px', overflow: 'hidden', marginBottom: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                            <EquipmentImage item={item} alt={item.title} />
                          </div>

                          <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.25, marginBottom: '4px' }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '10px' }}>
                            {item.category}
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              closeModal('compare');
                              openModal('details', item);
                            }}
                            className="btn btn-primary btn-sm"
                            style={{ width: '100%' }}
                          >
                            View & Rent
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {/* Row: Daily Rental Price */}
                  <tr>
                    <td style={{ fontWeight: 700, fontSize: '13px', color: '#94A3B8', padding: '14px 8px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      Price Per Day
                    </td>
                    {compareList.map(item => (
                      <td key={item.id} style={{ padding: '14px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <span style={{ fontSize: '19px', fontWeight: 800, color: '#38BDF8' }}>
                          ₹{item.dailyRate}
                        </span>
                        <span style={{ fontSize: '11.5px', color: '#64748B' }}> / day</span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Brand & Model */}
                  <tr>
                    <td style={{ fontWeight: 700, fontSize: '13px', color: '#94A3B8', padding: '14px 8px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      Brand & Model
                    </td>
                    {compareList.map(item => (
                      <td key={item.id} style={{ padding: '14px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '13px', fontWeight: 600, color: '#E2E8F0' }}>
                        {item.brand || '—'} {item.model ? `• ${item.model}` : ''}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Condition */}
                  <tr>
                    <td style={{ fontWeight: 700, fontSize: '13px', color: '#94A3B8', padding: '14px 8px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      Condition
                    </td>
                    {compareList.map(item => (
                      <td key={item.id} style={{ padding: '14px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <span className="badge badge-blue">
                          {item.condition || 'Good'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Availability */}
                  <tr>
                    <td style={{ fontWeight: 700, fontSize: '13px', color: '#94A3B8', padding: '14px 8px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      Availability
                    </td>
                    {compareList.map(item => (
                      <td key={item.id} style={{ padding: '14px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        {item.isAvailable ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#34D399', fontWeight: 700, fontSize: '12.5px' }}>
                            <CheckCircle2 size={15} /> Available Now
                          </span>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#F87171', fontWeight: 700, fontSize: '12.5px' }}>
                            <XCircle size={15} /> Currently Rented
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Rating */}
                  <tr>
                    <td style={{ fontWeight: 700, fontSize: '13px', color: '#94A3B8', padding: '14px 8px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      Owner Rating
                    </td>
                    {compareList.map(item => (
                      <td key={item.id} style={{ padding: '14px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        <span className="rating-pill">
                          <Star size={11} fill="#F59E0B" color="#F59E0B" />
                          <span>{item.rating || 0}</span>
                          <span style={{ fontSize: '11px', color: '#FCD34D' }}>({item.reviewsCount || 0})</span>
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Security Deposit */}
                  <tr>
                    <td style={{ fontWeight: 700, fontSize: '13px', color: '#94A3B8', padding: '14px 8px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      Refundable Deposit
                    </td>
                    {compareList.map(item => (
                      <td key={item.id} style={{ padding: '14px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '13px', fontWeight: 700, color: '#E2E8F0' }}>
                        ₹{item.securityDeposit || 0}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Location */}
                  <tr>
                    <td style={{ fontWeight: 700, fontSize: '13px', color: '#94A3B8', padding: '14px 8px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      City / Location
                    </td>
                    {compareList.map(item => (
                      <td key={item.id} style={{ padding: '14px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '13px', color: '#CBD5E1' }}>
                        <MapPin size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px', color: '#38BDF8' }} />
                        {item.location || item.city || 'Chennai'}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Student Discount */}
                  <tr>
                    <td style={{ fontWeight: 700, fontSize: '13px', color: '#94A3B8', padding: '14px 8px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      Student Discount
                    </td>
                    {compareList.map(item => (
                      <td key={item.id} style={{ padding: '14px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                        {item.student_discount_enabled || item.studentDiscountEnabled ? (
                          <span style={{ fontSize: '12px', color: '#A78BFA', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <GraduationCap size={14} /> {item.student_discount_percent || 10}% Off
                          </span>
                        ) : (
                          <span style={{ fontSize: '12px', color: '#64748B' }}>Not eligible</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Rent-to-Buy */}
                  <tr>
                    <td style={{ fontWeight: 700, fontSize: '13px', color: '#94A3B8', padding: '14px 8px' }}>
                      Rent-to-Buy
                    </td>
                    {compareList.map(item => (
                      <td key={item.id} style={{ padding: '14px 12px' }}>
                        {item.rent_to_buy_enabled || item.rentToBuyEnabled ? (
                          <div>
                            <span className="badge badge-orange" style={{ marginBottom: '2px' }}>
                              Available
                            </span>
                            <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                              Buyout: ₹{item.purchase_price || item.purchasePrice}
                            </div>
                          </div>
                        ) : (
                          <span style={{ fontSize: '12px', color: '#64748B' }}>Rental Only</span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
