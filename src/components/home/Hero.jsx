import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  MapPin,
  Wrench,
  Box,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Star
} from 'lucide-react';

export default function Hero() {
  const { navigateTo, openModal } = useApp();
  const [activeTab, setActiveTab] = useState('rent'); // 'rent' | 'repair'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Chennai');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'rent') {
      navigateTo('rent', { q: searchQuery, city: selectedCity });
    } else {
      navigateTo('repairs', { q: searchQuery, city: selectedCity });
    }
  };

  return (
    <section style={{
      position: 'relative',
      background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 65%, #F1F5F9 100%)',
      paddingTop: '48px',
      paddingBottom: '64px',
      overflow: 'hidden'
    }}>
      {/* Decorative Subtle Background Glow Elements */}
      <div style={{
        position: 'absolute',
        top: '-140px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '760px',
        height: '380px',
        background: 'radial-gradient(circle, rgba(22, 119, 255, 0.07) 0%, rgba(255, 122, 0, 0.03) 50%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          {/* Trust Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            padding: '5px 14px',
            borderRadius: '999px',
            fontSize: '12.5px',
            fontWeight: 600,
            color: '#334155',
            boxShadow: '0 1px 4px rgba(11, 21, 51, 0.04)',
            marginBottom: '20px'
          }}>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#10B981',
              display: 'inline-block'
            }} />
            <span>Equipment Rental & Verified Technician Marketplace</span>
            <span style={{ color: '#CBD5E1' }}>•</span>
            <span style={{ color: '#1677FF', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ShieldCheck size={13} /> 100% Escrow Protected
            </span>
          </div>

          {/* Hero Main Heading */}
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(34px, 5.2vw, 56px)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#0B1533',
            marginBottom: '16px',
            letterSpacing: '-0.03em'
          }}>
            Rent what you need.<br />
            <span style={{
              background: 'linear-gradient(135deg, #1677FF 0%, #0958D9 50%, #FF7A00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Repair what you own.
            </span>
          </h1>

          {/* Supporting Text */}
          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#475569',
            lineHeight: 1.55,
            maxWidth: '640px',
            margin: '0 auto 28px',
            fontWeight: 400
          }}>
            RentiPair connects people with useful equipment and trusted technicians in one simple platform.
          </p>

          {/* Two Major CTA Buttons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '36px'
          }}>
            <button
              onClick={() => { setActiveTab('rent'); navigateTo('rent'); }}
              className="btn btn-primary btn-lg"
              style={{ minWidth: '180px' }}
            >
              <Box size={17} />
              <span>Find Equipment</span>
            </button>

            <button
              onClick={() => { setActiveTab('repair'); navigateTo('repairs'); }}
              className="btn btn-orange btn-lg"
              style={{ minWidth: '180px' }}
            >
              <Wrench size={17} />
              <span>Find a Technician</span>
            </button>
          </div>

          {/* Large Search Interface with Toggle: RENT | REPAIR */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid #CBD5E1',
            borderRadius: '20px',
            padding: '12px 14px',
            boxShadow: '0 12px 36px -8px rgba(11, 21, 51, 0.08)',
            maxWidth: '740px',
            margin: '0 auto',
            textAlign: 'left'
          }}>
            {/* Toggle Bar */}
            <div style={{
              display: 'inline-flex',
              background: '#F1F5F9',
              padding: '3px',
              borderRadius: '999px',
              marginBottom: '12px',
              border: '1px solid #E2E8F0'
            }}>
              <button
                type="button"
                onClick={() => setActiveTab('rent')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '7px 20px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 700,
                  transition: 'all 0.16s ease',
                  background: activeTab === 'rent' ? '#1677FF' : 'transparent',
                  color: activeTab === 'rent' ? '#FFFFFF' : '#475569',
                  boxShadow: activeTab === 'rent' ? '0 2px 8px rgba(22, 119, 255, 0.28)' : 'none'
                }}
              >
                <Box size={15} />
                <span>RENT EQUIPMENT</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('repair')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '7px 20px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 700,
                  transition: 'all 0.16s ease',
                  background: activeTab === 'repair' ? '#FF7A00' : 'transparent',
                  color: activeTab === 'repair' ? '#FFFFFF' : '#475569',
                  boxShadow: activeTab === 'repair' ? '0 2px 8px rgba(255, 122, 0, 0.28)' : 'none'
                }}
              >
                <Wrench size={15} />
                <span>REPAIR SERVICE</span>
              </button>
            </div>

            {/* Form Input Grid with Uniform 44px Heights */}
            <form onSubmit={handleSearchSubmit}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) 150px',
                gap: '8px',
                alignItems: 'center'
              }}>
                {/* Search Text Input */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#F8FAFC',
                  borderRadius: '10px',
                  padding: '0 14px',
                  height: '44px',
                  border: '1.5px solid #E2E8F0'
                }}>
                  <Search size={16} color={activeTab === 'rent' ? '#1677FF' : '#FF7A00'} />
                  <input
                    type="text"
                    placeholder={activeTab === 'rent' ? 'Search calculators, cameras, laptops, lab gear...' : 'Describe device issue (e.g. MacBook screen, phone battery)...'}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      width: '100%',
                      fontSize: '13.5px',
                      color: '#0B1533',
                      fontWeight: 500
                    }}
                  />
                </div>

                {/* City Selector */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#F8FAFC',
                  borderRadius: '10px',
                  padding: '0 12px',
                  height: '44px',
                  border: '1.5px solid #E2E8F0'
                }}>
                  <MapPin size={16} color="#64748B" />
                  <select
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      width: '100%',
                      fontSize: '13px',
                      color: '#0B1533',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Chennai">Chennai</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Pune">Pune</option>
                  </select>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  className={activeTab === 'rent' ? 'btn btn-primary' : 'btn btn-orange'}
                  style={{
                    height: '44px',
                    width: '100%',
                    borderRadius: '10px',
                    fontSize: '14px',
                    padding: '0 14px'
                  }}
                >
                  <span>{activeTab === 'rent' ? 'Search Gear' : 'Find Tech'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </form>

            {/* Quick Suggestions Under Search */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '10px',
              paddingLeft: '2px',
              flexWrap: 'wrap',
              fontSize: '11.5px',
              color: '#64748B'
            }}>
              <span style={{ fontWeight: 600 }}>Popular:</span>
              {(activeTab === 'rent'
                ? ['Scientific Calculator ₹40/d', 'Sony A7 IV Kit', 'MacBook Pro M2', 'Rigol Scope', 'PS5 Console']
                : ['Laptop Screen Fix', 'MacBook Logic Board', 'iPhone Battery Health', 'DSLR Sensor Cleaning', 'CCTV IP Camera']
              ).map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const cleanTag = tag.split(' ₹')[0];
                    setSearchQuery(cleanTag);
                    if (activeTab === 'rent') {
                      navigateTo('rent', { q: cleanTag });
                    } else {
                      navigateTo('repairs', { q: cleanTag });
                    }
                  }}
                  style={{
                    background: '#F1F5F9',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    color: '#334155',
                    fontWeight: 500
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Ticker Under Hero */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '12px',
            marginTop: '36px',
            paddingTop: '24px',
            borderTop: '1px solid #E2E8F0'
          }}>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#0B1533' }}>1,400+</div>
              <div style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>Verified Gear Listed</div>
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#1677FF' }}>450+</div>
              <div style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>Certified Technicians</div>
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#10B981' }}>100% Escrow</div>
              <div style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>Safe Deposit Protection</div>
            </div>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#FF7A00' }}>4.92 / 5.0</div>
              <div style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>Verified Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
