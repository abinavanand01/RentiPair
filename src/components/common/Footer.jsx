import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, CheckCircle2, Lock, HelpCircle, PhoneCall, Mail, MapPin, Database } from 'lucide-react';

export default function Footer() {
  const { navigateTo, openModal } = useApp();

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #0B1533 0%, #070E22 100%)',
      color: '#E2E8F0',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      paddingTop: '56px',
      paddingBottom: '28px'
    }}>
      <div className="container">
        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '36px',
          marginBottom: '40px'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#111D42',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
                  <path d="M14 24 C14 18, 20 14, 24 18 C28 22, 34 26, 34 20 C34 16, 30 14, 28 14" stroke="#1677FF" strokeWidth="4.2" strokeLinecap="round" />
                  <path d="M34 24 C34 30, 28 34, 24 30 C20 26, 14 22, 14 28 C14 32, 18 34, 20 34" stroke="#FF7A00" strokeWidth="4.2" strokeLinecap="round" />
                  <circle cx="24" cy="24" r="3" fill="#FFFFFF" />
                </svg>
              </div>
              <div>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#FFFFFF'
                }}>
                  Renti<span style={{ color: '#1677FF' }}>Pair</span>
                </span>
                <div style={{ fontSize: '10.5px', color: '#94A3B8', fontWeight: 500 }}>
                  Rent it. Repair it. RentiPair it.
                </div>
              </div>
            </div>

            <p style={{
              fontSize: '13px',
              color: '#94A3B8',
              lineHeight: 1.55,
              marginBottom: '16px'
            }}>
              India's premier dual marketplace connecting verified equipment owners and certified technicians.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '12px', color: '#94A3B8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={13} color="#10B981" />
                <span>100% Escrow-backed Security Deposits</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} color="#1677FF" />
                <span>Multi-stage Technician Skill Verification</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={13} color="#F59E0B" />
                <span>Zero Public Exposure of Private KYC Docs</span>
              </div>
            </div>
          </div>

          {/* Equipment Rental Links */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
              Rent Equipment
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li>
                <button
                  onClick={() => navigateTo('rent')}
                  style={{ color: '#94A3B8', textAlign: 'left' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                >
                  Browse All Equipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('rent')}
                  style={{ color: '#94A3B8', textAlign: 'left' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                >
                  Scientific Calculators (fx-991EX, TI-84)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('rent')}
                  style={{ color: '#94A3B8', textAlign: 'left' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                >
                  Laptops & Workstations
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('rent')}
                  style={{ color: '#94A3B8', textAlign: 'left' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                >
                  Cameras & Production Gear
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('listEquipment')}
                  style={{ color: '#1677FF', fontWeight: 600, textAlign: 'left' }}
                >
                  + List Your Equipment (Earn ₹)
                </button>
              </li>
            </ul>
          </div>

          {/* Repair Services Links */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
              Repair Marketplace
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li>
                <button
                  onClick={() => navigateTo('repairs')}
                  style={{ color: '#94A3B8', textAlign: 'left' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                >
                  Laptop & MacBook Repair
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('repairs')}
                  style={{ color: '#94A3B8', textAlign: 'left' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                >
                  Smartphone & Screen Replacement
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('repairs')}
                  style={{ color: '#94A3B8', textAlign: 'left' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                >
                  Desktop & Gaming PC Diagnostics
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('repairs')}
                  style={{ color: '#94A3B8', textAlign: 'left' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                  onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                >
                  DSLR Camera & Lens Alignment
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('becomeTechnician')}
                  style={{ color: '#FF7A00', fontWeight: 600, textAlign: 'left' }}
                >
                  Become a Verified Technician
                </button>
              </li>
            </ul>
          </div>

          {/* Platform & Trust */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
              Platform & Trust
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li>
                <button
                  onClick={() => openModal('schemaDoc')}
                  style={{ color: '#93C5FD', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '5px' }}
                >
                  <Database size={12} /> Relational DB Architecture
                </button>
              </li>
              <li>
                <span style={{ color: '#94A3B8' }}>How RentiPair Works</span>
              </li>
              <li>
                <span style={{ color: '#94A3B8' }}>Condition Assessment Logs</span>
              </li>
              <li>
                <span style={{ color: '#94A3B8' }}>Dispute Resolution Protocol</span>
              </li>
              <li>
                <span style={{ color: '#94A3B8' }}>Privacy Policy & Terms</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '12px',
          color: '#64748B'
        }}>
          <div>
            © {new Date().getFullYear()} RentiPair Technologies Private Limited. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>Operating in Chennai • Bengaluru • Hyderabad • Mumbai • Delhi • Pune</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
