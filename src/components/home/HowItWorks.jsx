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
  const [activeWorkflow, setActiveWorkflow] = useState('rental'); // 'rental' | 'repair'

  const rentalSteps = [
    {
      num: '01',
      title: 'Search',
      desc: 'Discover scientific calculators, laptops, cameras, testing scopes & lab gear in your city.',
      icon: Search,
      color: '#1677FF'
    },
    {
      num: '02',
      title: 'Compare',
      desc: 'Check owner verification badges, condition logs, rental rules, and customer reviews.',
      icon: SlidersHorizontal,
      color: '#1677FF'
    },
    {
      num: '03',
      title: 'Rent',
      desc: 'Select dates with transparent daily rates. Security deposit held safely in escrow.',
      icon: CreditCard,
      color: '#1677FF'
    },
    {
      num: '04',
      title: 'Return',
      desc: 'Handover the equipment on your scheduled date. Security deposit is instantly unlocked.',
      icon: RotateCcw,
      color: '#1677FF'
    }
  ];

  const repairSteps = [
    {
      num: '01',
      title: 'Describe the Problem',
      desc: 'Tell us your device brand, model, symptom (cracked screen, water damage, BSOD, etc.) and photos.',
      icon: FileQuestion,
      color: '#FF7A00'
    },
    {
      num: '02',
      title: 'Find a Technician',
      desc: 'Compare certified engineers by background verification, experience, rating and pricing.',
      icon: UserCheck,
      color: '#FF7A00'
    },
    {
      num: '03',
      title: 'Book Service',
      desc: 'Pick doorstep service at home or direct drop-off at technician’s specialized workshop.',
      icon: CalendarCheck,
      color: '#FF7A00'
    },
    {
      num: '04',
      title: 'Get it Repaired',
      desc: 'Review transparent diagnostics, approve component replacement, and receive 30-day warranty.',
      icon: CheckCircle,
      color: '#FF7A00'
    }
  ];

  const steps = activeWorkflow === 'rental' ? rentalSteps : repairSteps;

  return (
    <section style={{ padding: '64px 0', background: '#F8FAFC' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11.5px',
            fontWeight: 700,
            color: activeWorkflow === 'rental' ? '#1677FF' : '#E66A00',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '6px'
          }}>
            SIMPLE, TRANSPARENT WORKFLOW
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 32px)', fontWeight: 800, color: '#0B1533' }}>
            How RentiPair Works
          </h2>
          <p style={{ fontSize: '14.5px', color: '#64748B', marginTop: '6px' }}>
            Engineered for complete peace of mind with escrow security and certified technician verification.
          </p>

          {/* Workflow Toggle */}
          <div style={{
            display: 'inline-flex',
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: '12px',
            padding: '3px',
            marginTop: '20px',
            boxShadow: '0 2px 6px rgba(11, 21, 51, 0.03)'
          }}>
            <button
              onClick={() => setActiveWorkflow('rental')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                borderRadius: '9px',
                fontSize: '13px',
                fontWeight: 700,
                background: activeWorkflow === 'rental' ? '#1677FF' : 'transparent',
                color: activeWorkflow === 'rental' ? '#FFFFFF' : '#475569',
                boxShadow: activeWorkflow === 'rental' ? '0 2px 6px rgba(22, 119, 255, 0.28)' : 'none',
                transition: 'all 0.16s ease'
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
                padding: '8px 20px',
                borderRadius: '9px',
                fontSize: '13px',
                fontWeight: 700,
                background: activeWorkflow === 'repair' ? '#FF7A00' : 'transparent',
                color: activeWorkflow === 'repair' ? '#FFFFFF' : '#475569',
                boxShadow: activeWorkflow === 'repair' ? '0 2px 6px rgba(255, 122, 0, 0.28)' : 'none',
                transition: 'all 0.16s ease'
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px'
        }}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: '24px 20px',
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid #F1F5F9',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: activeWorkflow === 'rental' ? '#EEF4FF' : '#FFF5EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: step.color
                  }}>
                    <step.icon size={22} />
                  </div>
                  <span style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    fontFamily: 'var(--font-heading)',
                    color: '#CBD5E1'
                  }}>
                    {step.num}
                  </span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0B1533', marginBottom: '6px' }}>
                  {step.title}
                </h3>

                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>

              <div style={{
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px solid #F8FAFC',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '12px',
                fontWeight: 600,
                color: activeWorkflow === 'rental' ? '#1677FF' : '#FF7A00'
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
