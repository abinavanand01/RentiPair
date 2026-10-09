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
  const { navigateTo, openModal } = useApp();
  const [sectionMode, setSectionMode] = useState('rental'); // 'rental' | 'repair'

  const getRentalIcon = (iconName) => {
    switch (iconName) {
      case 'Calculator': return <Calculator size={22} color="#1677FF" />;
      case 'Laptop': return <Laptop size={22} color="#1677FF" />;
      case 'Tablet': return <Tablet size={22} color="#1677FF" />;
      case 'Camera': return <Camera size={22} color="#1677FF" />;
      case 'Projector': return <Projector size={22} color="#1677FF" />;
      case 'Cpu': return <Cpu size={22} color="#1677FF" />;
      case 'FlaskConical': return <FlaskConical size={22} color="#1677FF" />;
      case 'CircuitBoard': return <CircuitBoard size={22} color="#1677FF" />;
      case 'Wrench': return <Wrench size={22} color="#1677FF" />;
      case 'Gamepad2': return <Gamepad2 size={22} color="#1677FF" />;
      default: return <Boxes size={22} color="#1677FF" />;
    }
  };

  const getRepairIcon = (iconName) => {
    switch (iconName) {
      case 'Laptop': return <Laptop size={22} color="#FF7A00" />;
      case 'Smartphone': return <Smartphone size={22} color="#FF7A00" />;
      case 'Tablet': return <Tablet size={22} color="#FF7A00" />;
      case 'Monitor': return <Monitor size={22} color="#FF7A00" />;
      case 'Cpu': return <Cpu size={22} color="#FF7A00" />;
      case 'Printer': return <Printer size={22} color="#FF7A00" />;
      case 'Camera': return <Camera size={22} color="#FF7A00" />;
      case 'ShieldAlert': return <ShieldAlert size={22} color="#FF7A00" />;
      default: return <Wrench size={22} color="#FF7A00" />;
    }
  };

  return (
    <section style={{ padding: '64px 0', background: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header with Segment Switcher */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11.5px',
              fontWeight: 700,
              color: sectionMode === 'rental' ? '#1677FF' : '#E66A00',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '6px'
            }}>
              <Sparkles size={13} /> EXPLORE OUR DIRECTORIES
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 32px)', fontWeight: 800, color: '#0B1533' }}>
              {sectionMode === 'rental' ? 'Popular Rental Categories' : 'Popular Repair Services'}
            </h2>
            <p style={{ fontSize: '14.5px', color: '#64748B', marginTop: '4px' }}>
              {sectionMode === 'rental'
                ? 'Rent exam calculators, cameras, dev boards, and lab gear with safe escrow.'
                : 'Connect with verified master technicians for doorstep diagnostics and component repairs.'}
            </p>
          </div>

          {/* Quick Switch Buttons */}
          <div style={{
            display: 'inline-flex',
            background: '#F1F5F9',
            padding: '3px',
            borderRadius: '10px',
            border: '1px solid #E2E8F0'
          }}>
            <button
              onClick={() => setSectionMode('rental')}
              style={{
                padding: '7px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                background: sectionMode === 'rental' ? '#1677FF' : 'transparent',
                color: sectionMode === 'rental' ? '#FFFFFF' : '#475569',
                boxShadow: sectionMode === 'rental' ? '0 2px 6px rgba(22, 119, 255, 0.25)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Rental Gear (10)
            </button>
            <button
              onClick={() => setSectionMode('repair')}
              style={{
                padding: '7px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                background: sectionMode === 'repair' ? '#FF7A00' : 'transparent',
                color: sectionMode === 'repair' ? '#FFFFFF' : '#475569',
                boxShadow: sectionMode === 'repair' ? '0 2px 6px rgba(255, 122, 0, 0.25)' : 'none',
                transition: 'all 0.15s ease'
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '14px'
          }}>
            {RENTAL_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
              <div
                key={cat.id}
                onClick={() => navigateTo('rent', { category: cat.id })}
                className="card"
                style={{
                  padding: '18px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1.5px solid #F1F5F9',
                  background: '#FFFFFF',
                  position: 'relative'
                }}
              >
                {cat.tag && (
                  <span style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontSize: '10px',
                    fontWeight: 700,
                    background: '#EEF4FF',
                    color: '#1677FF',
                    padding: '2px 7px',
                    borderRadius: '999px'
                  }}>
                    {cat.tag}
                  </span>
                )}

                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: '#EEF4FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  {getRentalIcon(cat.icon)}
                </div>

                <div>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0B1533', marginBottom: '3px' }}>
                    {cat.name}
                  </h3>
                  <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{cat.count}+ Available</span>
                    <span style={{ color: '#1677FF', fontWeight: 600 }}>Rent →</span>
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            {REPAIR_SERVICES.map(srv => (
              <div
                key={srv.id}
                onClick={() => openModal('repairRequest', { initialCategory: srv.id })}
                className="card"
                style={{
                  padding: '20px 18px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1.5px solid #F1F5F9',
                  background: '#FFFFFF'
                }}
              >
                <div>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: '#FFF5EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px'
                  }}>
                    {getRepairIcon(srv.icon)}
                  </div>

                  <h3 style={{ fontSize: '15.5px', fontWeight: 700, color: '#0B1533', marginBottom: '4px' }}>
                    {srv.name}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: 1.45, marginBottom: '12px' }}>
                    {srv.desc}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: '10px'
                }}>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>
                    Starts from <strong style={{ color: '#0B1533' }}>{srv.startingPrice}</strong>
                  </span>
                  <button
                    style={{
                      color: '#FF7A00',
                      fontWeight: 700,
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}
                  >
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
