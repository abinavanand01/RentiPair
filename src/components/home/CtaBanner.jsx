import React from 'react';
import { useApp } from '../../context/AppContext';
import { PlusCircle, Wrench, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';

export default function CtaBanner() {
  const { openModal } = useApp();

  return (
    <section style={{
      padding: '64px 0',
      background: 'linear-gradient(135deg, #0B1533 0%, #111D42 60%, #0F1A3A 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        right: '10%',
        width: '360px',
        height: '360px',
        background: 'radial-gradient(circle, rgba(22, 119, 255, 0.12) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: 'clamp(28px, 4vw, 48px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          alignItems: 'center'
        }}>
          {/* Left Text */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#FF7A00',
              fontSize: '11.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '10px'
            }}>
              <DollarSign size={14} /> MONETIZE YOUR IDLE TECH & EXPERTISE
            </div>

            <h2 style={{
              fontSize: 'clamp(24px, 3.2vw, 36px)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '12px'
            }}>
              Have equipment? Rent it out.<br />
              <span style={{
                background: 'linear-gradient(90deg, #60A5FA 0%, #FF8A3D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Have a skill? Become a technician.
              </span>
            </h2>

            <p style={{ fontSize: '14.5px', color: '#94A3B8', lineHeight: 1.55, maxWidth: '500px' }}>
              Turn your scientific calculators, cameras, and dev boards into monthly passive income, or offer certified electronics repair services with zero upfront listing fees.
            </p>
          </div>

          {/* Right Dual Action Cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            {/* Card 1: Equipment Owner */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '14px',
              padding: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', marginBottom: '3px' }}>
                  List Equipment
                </div>
                <div style={{ fontSize: '12.5px', color: '#94A3B8' }}>
                  Earn ₹5,000 – ₹45,000/mo renting out idle tech
                </div>
              </div>

              <button
                onClick={() => openModal('listEquipment')}
                className="btn btn-primary btn-sm"
              >
                <PlusCircle size={15} />
                <span>List an Item</span>
              </button>
            </div>

            {/* Card 2: Technician */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '14px',
              padding: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', marginBottom: '3px' }}>
                  Join as Technician
                </div>
                <div style={{ fontSize: '12.5px', color: '#94A3B8' }}>
                  Direct client bookings with secure payouts
                </div>
              </div>

              <button
                onClick={() => openModal('becomeTechnician')}
                className="btn btn-orange btn-sm"
              >
                <Wrench size={15} />
                <span>Onboard Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
