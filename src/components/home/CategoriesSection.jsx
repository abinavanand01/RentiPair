import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RENTAL_CATEGORIES, REPAIR_SERVICES } from '../../data/mockData';
import {
  Calculator,
  Laptop,
  Tablet,
  Camera,
  Projector,
  Cpu,
  FlaskConical,
  CircuitBoard,
  Wrench,
  Gamepad2,
  Boxes,
  Smartphone,
  Monitor,
  Printer,
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function CategoriesSection() {
  const { navigateTo, openModal, equipment } = useApp();
  const [sectionMode, setSectionMode] = useState('rental');

  const rentalColor = '#60A5FA';
  const repairColor = '#FB923C';

  const getRentalIcon = (iconName) => {
    switch (iconName) {
      case 'Calculator': return <Calculator size={22} color={rentalColor} />;
      case 'Laptop': return <Laptop size={22} color={rentalColor} />;
      case 'Tablet': return <Tablet size={22} color={rentalColor} />;
      case 'Camera': return <Camera size={22} color={rentalColor} />;
      case 'Projector': return <Projector size={22} color={rentalColor} />;
      case 'Cpu': return <Cpu size={22} color={rentalColor} />;
      case 'FlaskConical': return <FlaskConical size={22} color={rentalColor} />;
      case 'CircuitBoard': return <CircuitBoard size={22} color={rentalColor} />;
      case 'Wrench': return <Wrench size={22} color={rentalColor} />;
      case 'Gamepad2': return <Gamepad2 size={22} color={rentalColor} />;
      default: return <Boxes size={22} color={rentalColor} />;
    }
  };

  const getRepairIcon = (iconName) => {
    switch (iconName) {
      case 'Laptop': return <Laptop size={22} color={repairColor} />;
      case 'Smartphone': return <Smartphone size={22} color={repairColor} />;
      case 'Tablet': return <Tablet size={22} color={repairColor} />;
      case 'Monitor': return <Monitor size={22} color={repairColor} />;
      case 'Cpu': return <Cpu size={22} color={repairColor} />;
      case 'Printer': return <Printer size={22} color={repairColor} />;
      case 'Camera': return <Camera size={22} color={repairColor} />;
      case 'ShieldAlert': return <ShieldAlert size={22} color={repairColor} />;
      default: return <Wrench size={22} color={repairColor} />;
    }
  };

  return (
    <section style={{
      padding: '80px 0',
      background: 'linear-gradient(180deg, #0C1128 0%, #0A0F24 100%)',
      position: 'relative'
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '400px',
        background: sectionMode === 'rental'
          ? 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 60%)'
          : 'radial-gradient(circle, rgba(249, 115, 22, 0.06) 0%, transparent 60%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        transition: 'background 0.5s ease'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '36px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11.5px',
              fontWeight: 700,
              color: sectionMode === 'rental' ? '#60A5FA' : '#FB923C',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '8px'
            }}>
              <Sparkles size={13} /> EXPLORE OUR DIRECTORIES
            </div>
            <h2 style={{
              fontSize: 'clamp(24px, 3.2vw, 34px)',
              fontWeight: 800,
              color: '#F8FAFC'
            }}>
              {sectionMode === 'rental' ? 'Popular Rental Categories' : 'Popular Repair Services'}
            </h2>
            <p style={{ fontSize: '14.5px', color: '#94A3B8', marginTop: '6px', maxWidth: '540px' }}>
              {sectionMode === 'rental'
                ? 'Rent exam calculators, cameras, dev boards, and lab gear with safe escrow.'
                : 'Connect with verified master technicians for doorstep diagnostics and repairs.'}
            </p>
          </div>

          {/* Switch */}
          <div style={{
            display: 'inline-flex',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '4px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <button
              onClick={() => setSectionMode('rental')}
              style={{
                padding: '8px 18px',
                borderRadius: '9px',
                fontSize: '13px',
                fontWeight: 700,
                background: sectionMode === 'rental'
                  ? 'linear-gradient(135deg, #3B82F6, #2563EB)'
                  : 'transparent',
                color: sectionMode === 'rental' ? '#FFFFFF' : '#94A3B8',
                boxShadow: sectionMode === 'rental' ? '0 4px 14px rgba(59, 130, 246, 0.35)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Rental Gear (10)
            </button>
            <button
              onClick={() => setSectionMode('repair')}
              style={{
                padding: '8px 18px',
                borderRadius: '9px',
                fontSize: '13px',
                fontWeight: 700,
                background: sectionMode === 'repair'
                  ? 'linear-gradient(135deg, #F97316, #EA580C)'
                  : 'transparent',
                color: sectionMode === 'repair' ? '#FFFFFF' : '#94A3B8',
                boxShadow: sectionMode === 'repair' ? '0 4px 14px rgba(249, 115, 22, 0.35)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Repair Services (8)
            </button>
          </div>
        </div>

        {/* Rental Categories Grid */}
        {sectionMode === 'rental' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: '14px'
          }}>
            {RENTAL_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
              <div
                key={cat.id}
                onClick={() => navigateTo('rent', { category: cat.id })}
                style={{
                  padding: '20px 18px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  background: 'rgba(14, 19, 48, 0.5)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  position: 'relative',
                  transition: 'all 0.25s ease',
                  overflow: 'hidden'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px -8px rgba(59, 130, 246, 0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {cat.tag && (
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    fontSize: '10px',
                    fontWeight: 700,
                    background: 'rgba(59, 130, 246, 0.12)',
                    color: '#60A5FA',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    border: '1px solid rgba(59, 130, 246, 0.15)'
                  }}>
                    {cat.tag}
                  </span>
                )}

                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px'
                }}>
                  {getRentalIcon(cat.icon)}
                </div>

                <div>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#F8FAFC', marginBottom: '4px' }}>
                    {cat.name}
                  </h3>
                  <div style={{
                    fontSize: '12px',
                    color: '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span>
                      {equipment.filter(e => (e.category === cat.name || e.category === cat.id) && e.status === 'Approved').length} Available
                    </span>
                    <span style={{ color: '#60A5FA', fontWeight: 600 }}>Rent →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Repair Services Grid */}
        {sectionMode === 'repair' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px'
          }}>
            {REPAIR_SERVICES.map(srv => (
              <div
                key={srv.id}
                onClick={() => openModal('repairRequest', { initialCategory: srv.id })}
                style={{
                  padding: '22px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  background: 'rgba(14, 19, 48, 0.5)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px -8px rgba(249, 115, 22, 0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(249, 115, 22, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px'
                  }}>
                    {getRepairIcon(srv.icon)}
                  </div>

                  <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: '#F8FAFC', marginBottom: '4px' }}>
                    {srv.name}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.5, marginBottom: '14px' }}>
                    {srv.desc}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '12px'
                }}>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>
                    Starts from <strong style={{ color: '#F8FAFC' }}>{srv.startingPrice}</strong>
                  </span>
                  <button style={{
                    color: '#FB923C',
                    fontWeight: 700,
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}>
                    Book Fix <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
