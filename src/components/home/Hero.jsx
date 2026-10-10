import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  MapPin,
  Wrench,
  Box,
  ShieldCheck,
  ArrowRight,
  PlusCircle,
  Laptop,
  Calculator,
  Camera,
  Cpu,
  Clock,
  Layers,
  Zap,
  Star,
  CircleDot
} from 'lucide-react';

export default function Hero() {
  const { navigateTo, openModal, equipment, technicians } = useApp();
  const [activeTab, setActiveTab] = useState('rent');

  // Rent Filter State
  const [rentQuery, setRentQuery] = useState('');
  const [rentCategory, setRentCategory] = useState('');
  const [rentLocation, setRentLocation] = useState('Chennai');
  const [rentAvailability, setRentAvailability] = useState('all');

  // Repair Filter State
  const [repairDevice, setRepairDevice] = useState('');
  const [repairCategory, setRepairCategory] = useState('');
  const [repairLocation, setRepairLocation] = useState('Chennai');
  const [repairServiceType, setRepairServiceType] = useState('all');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'rent') {
      navigateTo('rent', {
        q: rentQuery,
        category: rentCategory,
        city: rentLocation,
        availability: rentAvailability
      });
    } else {
      navigateTo('repairs', {
        q: repairDevice,
        category: repairCategory,
        city: repairLocation,
        serviceType: repairServiceType
      });
    }
  };

  const inputBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(255, 255, 255, 0.04)',
    borderRadius: '12px',
    padding: '0 14px',
    height: '48px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    transition: 'all 0.18s ease'
  };

  const inputStyle = {
    border: 'none',
    background: 'transparent',
    width: '100%',
    fontSize: '13.5px',
    color: '#E2E8F0',
    fontWeight: 500,
    outline: 'none'
  };

  const selectStyle = {
    border: 'none',
    background: 'transparent',
    width: '100%',
    fontSize: '13px',
    color: '#E2E8F0',
    fontWeight: 600,
    cursor: 'pointer',
    outline: 'none'
  };

  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(180deg, #050816 0%, #0A0F24 50%, #0C1128 100%)',
      paddingTop: '24px',
      paddingBottom: '64px',
      overflow: 'hidden',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Ambient Gradient Orbs */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '15%',
        width: '700px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.04) 40%, transparent 65%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '5%',
        width: '600px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(249, 115, 22, 0.04) 50%, transparent 65%)',
        filter: 'blur(100px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.06) 0%, transparent 60%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Grid lines overlay (subtle) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
        zIndex: 0,
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Main Hero Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
          alignItems: 'center',
          marginBottom: '48px'
        }}>
          {/* Hero Content (Centered) */}
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            {/* Trust Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '7px 18px',
              borderRadius: '999px',
              fontSize: '12.5px',
              fontWeight: 600,
              color: '#CBD5E1',
              backdropFilter: 'blur(12px)',
              marginBottom: '28px',
              animation: 'fadeInUp 0.6s ease forwards'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#06B6D4',
                boxShadow: '0 0 12px #06B6D4',
                animation: 'pulseGlow 2s ease-in-out infinite'
              }} />
              <span>India's First Unified Tech & Repair Marketplace</span>
              <span style={{ color: 'rgba(255,255,255,0.15)' }}>•</span>
              <span style={{
                color: '#60A5FA',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 700
              }}>
                <ShieldCheck size={13} /> 100% Escrow
              </span>
            </div>

            {/* Main Heading */}
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(40px, 5.5vw, 64px)',
              fontWeight: 900,
              lineHeight: 1.08,
              color: '#F8FAFC',
              marginBottom: '20px',
              letterSpacing: '-0.04em',
              animation: 'fadeInUp 0.7s ease 0.1s both'
            }}>
              Rent what you need.
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 40%, #8B5CF6 70%, #F97316 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradientShift 6s ease-in-out infinite'
              }}>
                Repair what you own.
              </span>
            </h1>

            {/* Supporting Text */}
            <p style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              color: '#94A3B8',
              lineHeight: 1.6,
              maxWidth: '620px',
              margin: '0 auto 36px',
              animation: 'fadeInUp 0.7s ease 0.2s both'
            }}>
              One trusted platform for equipment rentals and verified repair professionals across India.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              marginBottom: '0',
              animation: 'fadeInUp 0.7s ease 0.3s both'
            }}>
              <button
                type="button"
                onClick={() => { setActiveTab('rent'); navigateTo('rent'); }}
                className="btn btn-lg"
                style={{
                  minWidth: '180px',
                  background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 6px 24px rgba(59, 130, 246, 0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                  fontWeight: 700
                }}
              >
                <Box size={18} />
                <span>Explore Equipment</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('repair'); navigateTo('repairs'); }}
                className="btn btn-lg"
                style={{
                  minWidth: '180px',
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 6px 24px rgba(249, 115, 22, 0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                  fontWeight: 700
                }}
              >
                <Wrench size={18} />
                <span>Find a Technician</span>
              </button>

              <button
                type="button"
                onClick={() => openModal('listEquipment')}
                className="btn btn-outline-white btn-lg"
                style={{ minWidth: '180px' }}
              >
                <PlusCircle size={18} style={{ color: '#60A5FA' }} />
                <span>List Your Equipment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Showcase Cards (Absolute positioned for visual depth) */}
        <div style={{
          display: 'none',
          position: 'relative',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '48px'
        }} className="hero-floating-cards">
          {/* Card 1: Calculator */}
          <div className="floating-card-slow" style={{
            background: 'rgba(14, 19, 48, 0.7)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(59, 130, 246, 0.15)',
            borderRadius: '16px',
            padding: '18px',
            width: '200px',
            boxShadow: '0 16px 40px -8px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '10px',
                background: 'rgba(59, 130, 246, 0.12)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: '#60A5FA'
              }}>
                <Calculator size={18} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Rental</span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC', marginBottom: '3px' }}>Scientific Calculator</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '10px' }}>Casio fx-991CW</div>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#60A5FA' }}>₹40/day</span>
          </div>

          {/* Card 2: Laptop */}
          <div className="floating-card-reverse" style={{
            background: 'rgba(14, 19, 48, 0.7)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(6, 182, 212, 0.15)',
            borderRadius: '16px',
            padding: '18px',
            width: '200px',
            boxShadow: '0 16px 40px -8px rgba(0, 0, 0, 0.4)',
            marginTop: '30px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '10px',
                background: 'rgba(6, 182, 212, 0.12)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: '#22D3EE'
              }}>
                <Laptop size={18} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Rental</span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC', marginBottom: '3px' }}>MacBook Pro M2</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '10px' }}>16GB / 512GB</div>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#22D3EE' }}>₹450/day</span>
          </div>

          {/* Card 3: Camera */}
          <div className="floating-card-slow" style={{
            background: 'rgba(14, 19, 48, 0.7)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(139, 92, 246, 0.15)',
            borderRadius: '16px',
            padding: '18px',
            width: '200px',
            boxShadow: '0 16px 40px -8px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '10px',
                background: 'rgba(139, 92, 246, 0.12)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: '#A78BFA'
              }}>
                <Camera size={18} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Rental</span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC', marginBottom: '3px' }}>Sony Alpha A7 IV</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '10px' }}>Full Kit w/ Lens</div>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#A78BFA' }}>₹950/day</span>
          </div>

          {/* Card 4: Repair */}
          <div className="floating-card-reverse" style={{
            background: 'rgba(14, 19, 48, 0.7)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(249, 115, 22, 0.15)',
            borderRadius: '16px',
            padding: '18px',
            width: '200px',
            boxShadow: '0 16px 40px -8px rgba(0, 0, 0, 0.4)',
            marginTop: '30px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '10px',
                background: 'rgba(249, 115, 22, 0.12)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: '#FB923C'
              }}>
                <Wrench size={18} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Repair</span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#F8FAFC', marginBottom: '3px' }}>Chip-Level Expert</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '10px' }}>Board & Screen Repair</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#FB923C' }}>Verified</span>
              <span style={{ fontSize: '11px', color: '#FBBF24', fontWeight: 700 }}>★ 4.9</span>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .hero-floating-cards {
              display: flex !important;
            }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* ── Search Command Center ── */}
        <div style={{
          background: 'rgba(14, 19, 48, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '24px',
          padding: '20px 24px',
          boxShadow: '0 20px 60px -12px rgba(0, 0, 0, 0.5)',
          maxWidth: '1080px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          animation: 'fadeInUp 0.7s ease 0.4s both'
        }}>
          {/* Mode Switcher */}
          <div style={{
            display: 'inline-flex',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '4px',
            borderRadius: '999px',
            marginBottom: '16px',
            border: '1px solid rgba(255, 255, 255, 0.06)'
          }}>
            <button
              type="button"
              onClick={() => setActiveTab('rent')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '999px',
                fontSize: '13.5px',
                fontWeight: 700,
                transition: 'all 0.25s ease',
                background: activeTab === 'rent'
                  ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)'
                  : 'transparent',
                color: activeTab === 'rent' ? '#FFFFFF' : '#94A3B8',
                boxShadow: activeTab === 'rent'
                  ? '0 4px 16px rgba(59, 130, 246, 0.4)'
                  : 'none'
              }}
            >
              <Box size={16} />
              <span>RENT EQUIPMENT</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('repair')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '999px',
                fontSize: '13.5px',
                fontWeight: 700,
                transition: 'all 0.25s ease',
                background: activeTab === 'repair'
                  ? 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)'
                  : 'transparent',
                color: activeTab === 'repair' ? '#FFFFFF' : '#94A3B8',
                boxShadow: activeTab === 'repair'
                  ? '0 4px 16px rgba(249, 115, 22, 0.4)'
                  : 'none'
              }}
            >
              <Wrench size={16} />
              <span>REPAIR SERVICE</span>
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit}>
            {activeTab === 'rent' ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr)) 150px',
                gap: '10px',
                alignItems: 'center'
              }}>
                <div style={inputBoxStyle}>
                  <Search size={16} color="#60A5FA" />
                  <input
                    type="text"
                    placeholder="What are you looking for? (Laptop, Calculator...)"
                    value={rentQuery}
                    onChange={e => setRentQuery(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div style={inputBoxStyle}>
                  <Layers size={15} color="#64748B" />
                  <select value={rentCategory} onChange={e => setRentCategory(e.target.value)} style={selectStyle}>
                    <option value="">All Categories</option>
                    <option value="Scientific Calculators">Calculators</option>
                    <option value="Laptops & Computers">Laptops & PCs</option>
                    <option value="Cameras & Photography">Cameras</option>
                    <option value="Lab & Testing Equipment">Lab & Testing Gear</option>
                    <option value="Electronics & Audio">Electronics & Audio</option>
                  </select>
                </div>

                <div style={inputBoxStyle}>
                  <MapPin size={15} color="#64748B" />
                  <select value={rentLocation} onChange={e => setRentLocation(e.target.value)} style={selectStyle}>
                    <option value="Chennai">Chennai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>

                <div style={inputBoxStyle}>
                  <Clock size={15} color="#64748B" />
                  <select value={rentAvailability} onChange={e => setRentAvailability(e.target.value)} style={selectStyle}>
                    <option value="all">Any Availability</option>
                    <option value="now">Available Now</option>
                    <option value="weekend">Weekend Special</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn"
                  style={{
                    height: '48px',
                    width: '100%',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 16px rgba(59, 130, 246, 0.35)'
                  }}
                >
                  <span>Search</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr)) 150px',
                gap: '10px',
                alignItems: 'center'
              }}>
                <div style={inputBoxStyle}>
                  <Search size={16} color="#FB923C" />
                  <input
                    type="text"
                    placeholder="Device type (MacBook, iPhone, Camera...)"
                    value={repairDevice}
                    onChange={e => setRepairDevice(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div style={inputBoxStyle}>
                  <Cpu size={15} color="#64748B" />
                  <select value={repairCategory} onChange={e => setRepairCategory(e.target.value)} style={selectStyle}>
                    <option value="">All Repair Types</option>
                    <option value="Laptop & PC Repair">Laptop & PC Repair</option>
                    <option value="Smartphone Repair">Smartphone Repair</option>
                    <option value="Camera & Lens Servicing">Camera & Optics</option>
                    <option value="PCB & Soldering">Board-Level Diagnostics</option>
                    <option value="Audio & Gaming">Audio & Consoles</option>
                  </select>
                </div>

                <div style={inputBoxStyle}>
                  <MapPin size={15} color="#64748B" />
                  <select value={repairLocation} onChange={e => setRepairLocation(e.target.value)} style={selectStyle}>
                    <option value="Chennai">Chennai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>

                <div style={inputBoxStyle}>
                  <Wrench size={15} color="#64748B" />
                  <select value={repairServiceType} onChange={e => setRepairServiceType(e.target.value)} style={selectStyle}>
                    <option value="all">Any Service Type</option>
                    <option value="doorstep">Doorstep Service</option>
                    <option value="workshop">Workshop Drop-off</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn"
                  style={{
                    height: '48px',
                    width: '100%',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 16px rgba(249, 115, 22, 0.35)'
                  }}
                >
                  <span>Find Tech</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </form>

          {/* Quick Suggestions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '14px',
            paddingLeft: '4px',
            flexWrap: 'wrap',
            fontSize: '12px',
            color: '#64748B'
          }}>
            <span style={{ fontWeight: 600 }}>Trending:</span>
            {(activeTab === 'rent'
              ? ['Scientific Calculator', 'Laptop', 'Camera', 'Oscilloscope', 'Audio Gear']
              : ['Phone Repair', 'Laptop Screen Fix', 'MacBook Logic Board', 'DSLR Sensor Cleaning', 'Technician']
            ).map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (activeTab === 'rent') {
                    setRentQuery(tag);
                    navigateTo('rent', { q: tag });
                  } else {
                    setRepairDevice(tag);
                    navigateTo('repairs', { q: tag });
                  }
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '11.5px',
                  color: '#94A3B8',
                  fontWeight: 600,
                  transition: 'all 0.18s ease',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = activeTab === 'rent'
                    ? 'rgba(59, 130, 246, 0.12)'
                    : 'rgba(249, 115, 22, 0.12)';
                  e.currentTarget.style.color = activeTab === 'rent' ? '#60A5FA' : '#FB923C';
                  e.currentTarget.style.borderColor = activeTab === 'rent'
                    ? 'rgba(59, 130, 246, 0.2)'
                    : 'rgba(249, 115, 22, 0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.color = '#94A3B8';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Live Stats Ticker */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginTop: '48px',
          paddingTop: '32px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          {[
            {
              value: equipment.filter(e => e.status === 'Approved').length,
              label: 'Live Equipment Listed',
              color: '#F8FAFC',
              icon: <CircleDot size={16} />
            },
            {
              value: technicians.filter(t => t.status === 'Approved').length,
              label: 'Verified Technicians',
              color: '#60A5FA',
              icon: <Zap size={16} />
            },
            {
              value: '100% Escrow',
              label: 'Safe Deposit Protection',
              color: '#34D399',
              icon: <ShieldCheck size={16} />
            },
            {
              value: 'Zero Fake Listings',
              label: 'Real User & Gear Verified',
              color: '#FB923C',
              icon: <Star size={16} />
            }
          ].map((stat, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '16px 20px',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              transition: 'all 0.2s ease'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: `${stat.color}10`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: stat.color,
                flexShrink: 0
              }}>
                {stat.icon}
              </div>
              <div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: stat.color,
                  lineHeight: 1.2,
                  fontFamily: 'var(--font-heading)'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#64748B',
                  fontWeight: 500,
                  marginTop: '2px'
                }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* select option styling for dark */}
      <style>{`
        section select option {
          background: #0E1330;
          color: #E2E8F0;
        }
      `}</style>
    </section>
  );
}
