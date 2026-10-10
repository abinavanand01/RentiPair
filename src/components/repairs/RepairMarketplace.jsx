import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { REPAIR_SERVICES } from '../../data/mockData';
import {
  Wrench,
  Search,
  MapPin,
  Star,
  CheckCircle2,
  ShieldCheck,
  Briefcase,
  Sparkles,
  ArrowRight,
  Filter,
  PlusCircle,
  Clock
} from 'lucide-react';

export default function RepairMarketplace() {
  const { technicians, openModal, pageParams } = useApp();

  const [selectedCategory, setSelectedCategory] = useState(pageParams?.category || 'all');
  const [selectedCity, setSelectedCity] = useState(pageParams?.city || 'all');
  const [searchQuery, setSearchQuery] = useState(pageParams?.q || '');

  const cities = ['all', 'Chennai', 'Bengaluru', 'Hyderabad', 'Mumbai', 'Pune'];

  const filteredTechnicians = technicians
    .filter(t => t.status === 'Approved')
    .filter(t => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        t.categories.some(c => c.toLowerCase().includes(q)) ||
        t.serviceArea.toLowerCase().includes(q)
      );
    })
    .filter(t => selectedCategory === 'all' || t.categories.includes(selectedCategory))
    .filter(t => selectedCity === 'all' || t.city.toLowerCase() === selectedCity.toLowerCase());

  return (
    <div style={{ background: '#050816', minHeight: 'calc(100vh - 76px)', paddingBottom: '80px', position: 'relative' }}>
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: '15%',
        width: '500px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      {/* Compact Dark Navy Hero */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(10, 15, 36, 0.95) 0%, rgba(14, 19, 48, 0.8) 100%)',
        color: '#FFFFFF',
        padding: '38px 0 34px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            <div style={{ maxWidth: '640px' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#F97316',
                background: 'rgba(249, 115, 22, 0.14)',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                padding: '4px 12px',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '10px'
              }}>
                <Wrench size={13} /> CERTIFIED REPAIR MARKETPLACE
              </span>
              <h1 style={{
                fontSize: 'clamp(26px, 3.5vw, 36px)',
                fontWeight: 800,
                color: '#FFFFFF',
                marginBottom: '8px',
                letterSpacing: '-0.02em'
              }}>
                Find Verified Electronics & Gadget Technicians
              </h1>
              <p style={{ fontSize: '14.5px', color: '#94A3B8', margin: 0 }}>
                From MacBook logic board micro-soldering to DSLR lens alignment. Book certified experts with guaranteed upfront pricing.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => openModal('repairRequest')}
                className="btn btn-orange"
                style={{
                  height: '42px',
                  padding: '0 18px',
                  boxShadow: '0 0 25px rgba(249, 115, 22, 0.35)'
                }}
              >
                <PlusCircle size={16} />
                <span>Book a Repair Now</span>
              </button>

              <button
                onClick={() => openModal('becomeTechnician')}
                className="btn btn-outline"
                style={{ height: '42px', padding: '0 18px' }}
              >
                <span>Join as Technician</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar & Filter Bar directly below hero */}
      <div className="container" style={{ marginTop: '24px', position: 'relative', zIndex: 2 }}>
        <div style={{
          background: 'rgba(14, 19, 48, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '14px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '12px'
          }}>
            {/* Search Input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(10, 15, 36, 0.85)',
              padding: '0 14px',
              height: '42px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              flex: '1 1 300px'
            }}>
              <Search size={16} color="#F97316" />
              <input
                type="text"
                placeholder="Search technician by name, specialty, or repair type..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  width: '100%',
                  fontSize: '13.5px',
                  color: '#FFFFFF',
                  fontWeight: 500,
                  outline: 'none'
                }}
              />
            </div>

            {/* City Selector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '42px',
              padding: '0 12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              background: 'rgba(10, 15, 36, 0.85)'
            }}>
              <MapPin size={15} color="#94A3B8" />
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {cities.map(c => (
                  <option key={c} value={c} style={{ background: '#0E1330', color: '#FFF' }}>{c === 'all' ? 'All Service Areas' : c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Categories Horizontal Scrolling Pills */}
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '2px'
          }}>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                padding: '7px 16px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                background: selectedCategory === 'all' ? '#F97316' : 'rgba(255, 255, 255, 0.05)',
                color: selectedCategory === 'all' ? '#FFFFFF' : '#94A3B8',
                border: selectedCategory === 'all' ? '1px solid #F97316' : '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              All Services
            </button>

            {REPAIR_SERVICES.map(srv => {
              const active = selectedCategory === srv.id;
              return (
                <button
                  key={srv.id}
                  onClick={() => setSelectedCategory(srv.id)}
                  style={{
                    padding: '7px 16px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    background: active ? '#F97316' : 'rgba(255, 255, 255, 0.05)',
                    color: active ? '#FFFFFF' : '#94A3B8',
                    border: active ? '1px solid #F97316' : '1px solid rgba(255, 255, 255, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease'
                  }}
                >
                  {srv.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Technician Cards Grid or Empty State */}
        {filteredTechnicians.length === 0 ? (
          technicians.filter(t => t.status === 'Approved').length === 0 ? (
            <div style={{
              background: 'rgba(14, 19, 48, 0.7)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '20px',
              border: '1.5px dashed rgba(255, 255, 255, 0.15)',
              padding: '56px 24px',
              textAlign: 'center',
              maxWidth: '560px',
              margin: '20px auto',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔧</div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                No verified technicians yet.
              </h3>
              <p style={{ fontSize: '14.5px', color: '#94A3B8', lineHeight: 1.5, marginBottom: '24px' }}>
                Become one of the first professionals on RentiPair.
              </p>
              <button
                onClick={() => openModal('becomeTechnician')}
                className="btn btn-orange"
                style={{ padding: '12px 28px', fontSize: '14.5px', fontWeight: 700 }}
              >
                Become a Technician
              </button>
            </div>
          ) : (
            <div style={{
              background: 'rgba(14, 19, 48, 0.7)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '16px',
              border: '1.5px dashed rgba(255, 255, 255, 0.15)',
              padding: '48px 24px',
              textAlign: 'center',
              maxWidth: '500px',
              margin: '20px auto'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '8px' }}>🔍</div>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                No technicians matched your search
              </h3>
              <p style={{ fontSize: '13.5px', color: '#94A3B8', marginBottom: '16px' }}>
                Try selecting "All Services" or changing the city filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedCity('all');
                  setSearchQuery('');
                }}
                className="btn btn-orange btn-sm"
              >
                Reset Search Filters
              </button>
            </div>
          )
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '20px'
          }}>
            {filteredTechnicians.map(tech => (
              <div
                key={tech.id}
                className="card card-hover"
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: 'linear-gradient(180deg, rgba(14, 19, 48, 0.85) 0%, rgba(10, 15, 36, 0.95) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%'
                }}
              >
                <div>
                  {/* Tech Profile Header */}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                    {tech.avatar ? (
                      <img
                        src={tech.avatar}
                        alt={tech.name}
                        style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(249, 115, 22, 0.4)',
                        boxShadow: '0 4px 14px rgba(249, 115, 22, 0.3)'
                      }}>
                        {tech.name ? tech.name.charAt(0).toUpperCase() : 'T'}
                      </div>
                    )}
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF' }}>
                        {tech.name}
                      </h3>
                      <div style={{ fontSize: '11px', color: '#34D399', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <CheckCircle2 size={12} /> Identity & Skill Verified
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                        <MapPin size={11} /> {tech.city}
                      </div>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#CBD5E1',
                    marginBottom: '10px',
                    minHeight: '34px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {tech.title}
                  </p>

                  {/* Rating & Job Metric Pill */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    padding: '7px 10px',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    fontSize: '12px'
                  }}>
                    <span style={{ fontWeight: 700, color: '#FBBF24', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Star size={11} fill="#F59E0B" color="#F59E0B" /> {tech.rating || 0} ({tech.reviewsCount || 0})
                    </span>
                    <span style={{ fontWeight: 600, color: '#FFFFFF' }}>
                      {tech.jobsCompleted || 0} Repairs
                    </span>
                    <span style={{ color: '#60A5FA', fontWeight: 600 }}>
                      {tech.yearsExperience || 0} yrs exp
                    </span>
                  </div>

                  {/* Services Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '14px' }}>
                    {Array.isArray(tech.categories) && tech.categories.map((c, i) => (
                      <span key={i} className="badge badge-orange" style={{ fontSize: '10.5px' }}>
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Bio Snippet */}
                  <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: 1.45, marginBottom: '14px' }}>
                    {tech.bio ? tech.bio.slice(0, 95) : 'Experienced technician available for service.'}...
                  </p>
                </div>

                {/* Bottom Actions */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <button
                    onClick={() => openModal('techProfile', tech)}
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1 }}
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => openModal('repairRequest', { initialTech: tech, initialCategory: tech.categories?.[0] })}
                    className="btn btn-orange btn-sm"
                    style={{ flex: 1 }}
                  >
                    Request Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
