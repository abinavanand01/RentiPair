import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  CreditCard,
  RotateCcw,
  FileQuestion,
  UserCheck,
  CalendarCheck,
  CheckCircle,
  Box,
  Wrench,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function HowItWorks() {
  const { navigateTo, openModal } = useApp();
  const [activeWorkflow, setActiveWorkflow] = useState('rental');

  const rentalSteps = [
    {
      num: '01',
      title: 'Search',
      desc: 'Discover scientific calculators, laptops, cameras, testing scopes & lab gear in your city.',
      icon: Search,
      color: '#60A5FA',
      glowColor: 'rgba(59, 130, 246, 0.15)'
    },
    {
      num: '02',
      title: 'Compare',
      desc: 'Check owner verification badges, condition logs, rental rules, and customer reviews.',
      icon: SlidersHorizontal,
      color: '#22D3EE',
      glowColor: 'rgba(6, 182, 212, 0.15)'
    },
    {
      num: '03',
      title: 'Rent',
      desc: 'Select dates with transparent daily rates. Security deposit held safely in escrow.',
      icon: CreditCard,
      color: '#A78BFA',
      glowColor: 'rgba(139, 92, 246, 0.15)'
    },
    {
      num: '04',
      title: 'Return',
      desc: 'Handover the equipment on your scheduled date. Security deposit is instantly unlocked.',
      icon: RotateCcw,
      color: '#34D399',
      glowColor: 'rgba(16, 185, 129, 0.15)'
    }
  ];

  const repairSteps = [
    {
      num: '01',
      title: 'Describe the Problem',
      desc: 'Tell us your device brand, model, symptom (cracked screen, water damage, BSOD, etc.) and photos.',
      icon: FileQuestion,
      color: '#FB923C',
      glowColor: 'rgba(249, 115, 22, 0.15)'
    },
    {
      num: '02',
      title: 'Find a Technician',
      desc: 'Compare certified engineers by background verification, experience, rating and pricing.',
      icon: UserCheck,
      color: '#FBBF24',
      glowColor: 'rgba(245, 158, 11, 0.15)'
    },
    {
      num: '03',
      title: 'Book Service',
      desc: 'Pick doorstep service at home or direct drop-off at technician\'s specialized workshop.',
      icon: CalendarCheck,
      color: '#F87171',
      glowColor: 'rgba(239, 68, 68, 0.15)'
    },
    {
      num: '04',
      title: 'Get it Repaired',
      desc: 'Review transparent diagnostics, approve component replacement, and receive 30-day warranty.',
      icon: CheckCircle,
      color: '#34D399',
      glowColor: 'rgba(16, 185, 129, 0.15)'
    }
  ];

  const steps = activeWorkflow === 'rental' ? rentalSteps : repairSteps;

  return (
    <section style={{
      padding: '80px 0',
      background: 'linear-gradient(180deg, #050816 0%, #0A0F24 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient orb */}
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '-10%',
        width: '500px',
        height: '500px',
        background: activeWorkflow === 'rental'
          ? 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 60%)'
          : 'radial-gradient(circle, rgba(249, 115, 22, 0.06) 0%, transparent 60%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        transition: 'background 0.5s ease'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11.5px',
            fontWeight: 700,
            color: activeWorkflow === 'rental' ? '#60A5FA' : '#FB923C',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '8px'
          }}>
            SIMPLE, TRANSPARENT WORKFLOW
          </div>
          <h2 style={{
            fontSize: 'clamp(26px, 3.5vw, 36px)',
            fontWeight: 800,
            color: '#F8FAFC'
          }}>
            How RentiPair Works
          </h2>
          <p style={{ fontSize: '15px', color: '#94A3B8', marginTop: '8px' }}>
            Engineered for complete peace of mind with escrow security and certified technician verification.
          </p>

          {/* Workflow Toggle */}
          <div style={{
            display: 'inline-flex',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '14px',
            padding: '4px',
            marginTop: '24px'
          }}>
            <button
              onClick={() => setActiveWorkflow('rental')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 22px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                background: activeWorkflow === 'rental'
                  ? 'linear-gradient(135deg, #3B82F6, #2563EB)'
                  : 'transparent',
                color: activeWorkflow === 'rental' ? '#FFFFFF' : '#94A3B8',
                boxShadow: activeWorkflow === 'rental' ? '0 4px 16px rgba(59, 130, 246, 0.35)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Box size={15} />
              <span>For Equipment Renting</span>
            </button>

            <button
              onClick={() => setActiveWorkflow('repair')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 22px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                background: activeWorkflow === 'repair'
                  ? 'linear-gradient(135deg, #F97316, #EA580C)'
                  : 'transparent',
                color: activeWorkflow === 'repair' ? '#FFFFFF' : '#94A3B8',
                boxShadow: activeWorkflow === 'repair' ? '0 4px 16px rgba(249, 115, 22, 0.35)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Wrench size={15} />
              <span>For Device Repair</span>
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                padding: '28px 24px',
                background: 'rgba(14, 19, 48, 0.5)',
                backdropFilter: 'blur(12px)',
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${step.color}30`;
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 16px 40px -8px ${step.glowColor}`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Ambient glow inside card */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                background: `radial-gradient(circle, ${step.glowColor} 0%, transparent 70%)`,
                filter: 'blur(30px)',
                pointerEvents: 'none'
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '18px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: `${step.color}15`,
                    border: `1px solid ${step.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: step.color
                  }}>
                    <step.icon size={22} />
                  </div>
                  <span style={{
                    fontSize: '28px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-heading)',
                    color: 'rgba(255, 255, 255, 0.06)',
                    lineHeight: 1
                  }}>
                    {step.num}
                  </span>
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#F8FAFC', marginBottom: '8px' }}>
                  {step.title}
                </h3>

                <p style={{ fontSize: '13.5px', color: '#94A3B8', lineHeight: 1.55 }}>
                  {step.desc}
                </p>
              </div>

              <div style={{
                marginTop: '18px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '12px',
                fontWeight: 600,
                color: step.color,
                position: 'relative',
                zIndex: 1
              }}>
                <span>Step {idx + 1} of 4</span>
                <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
