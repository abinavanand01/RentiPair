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
    <div style={{ background: '#F8FAFC', minHeight: 'calc(100vh - 76px)', paddingBottom: '80px' }}>
      {/* Compact Dark Navy Hero (Consistent with Rent Marketplace) */}
      <section style={{
        background: 'linear-gradient(135deg, #0B1533 0%, #111D42 60%, #0F1A3A 100%)',
        color: '#FFFFFF',
        padding: '40px 0 36px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
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
                color: '#FF7A00',
                background: 'rgba(255, 122, 0, 0.18)',
                border: '1px solid rgba(255, 122, 0, 0.3)',
                padding: '3px 10px',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '10px'
              }}>
                <Wrench size={12} /> CERTIFIED REPAIR MARKETPLACE
              </span>
              <h1 style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                Find Verified Electronics & Gadget Technicians
              </h1>
              <p style={{ fontSize: '14.5px', color: '#94A3B8', margin: 0 }}>
                From MacBook logic board micro-soldering to DSLR lens alignment. Book certified experts with guaranteed upfront pricing.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => openModal('repairRequest')}
                className="btn btn-orange"
                style={{ height: '42px', padding: '0 18px' }}
              >
                <PlusCircle size={16} />
                <span>Book a Repair Now</span>
              </button>

              <button
                onClick={() => openModal('becomeTechnician')}
                className="btn btn-outline-white"
                style={{ height: '42px', padding: '0 18px' }}
              >
                <span>Join as Technician</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar & Filter Bar directly below hero */}
      <div className="container" style={{ marginTop: '24px' }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '14px',
          boxShadow: '0 2px 8px rgba(11, 21, 51, 0.04)',
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
              background: '#F8FAFC',
              padding: '0 14px',
              height: '42px',
              borderRadius: '10px',
              border: '1.5px solid #E2E8F0',
              flex: '1 1 300px'
            }}>
              <Search size={16} color="#FF7A00" />
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
              height: '42px',
              padding: '0 12px',
              border: '1.5px solid #E2E8F0',
              borderRadius: '10px',
              background: '#FFFFFF'
            }}>
              <MapPin size={15} color="#64748B" />
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0B1533',
                  cursor: 'pointer'
                }}
              >
                {cities.map(c => (
                  <option key={c} value={c}>{c === 'all' ? 'All Service Areas' : c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Categories Horizontal Scrolling Pills */}
          <div style={{
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            paddingBottom: '2px'
          }}>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                background: selectedCategory === 'all' ? '#FF7A00' : '#F1F5F9',
                color: selectedCategory === 'all' ? '#FFFFFF' : '#475569',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
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
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    background: active ? '#FF7A00' : '#F1F5F9',
                    color: active ? '#FFFFFF' : '#475569',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {srv.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Technician Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '20px'
        }}>
          {filteredTechnicians.map(tech => (
            <div
              key={tech.id}
              className="card"
              style={{
                padding: '20px',
                borderRadius: '16px',
                background: '#FFFFFF',
                border: '1.5px solid #F1F5F9',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <div>
                {/* Tech Profile Header */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                  <img
                    src={tech.avatar}
                    alt={tech.name}
                    style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0B1533' }}>
                      {tech.name}
                    </h3>
                    <div style={{ fontSize: '11px', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <CheckCircle2 size={12} /> Identity & Skill Verified
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                      <MapPin size={11} /> {tech.city}
                    </div>
                  </div>
                </div>

                <p style={{
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: '#334155',
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
                  background: '#F8FAFC',
                  padding: '7px 10px',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  fontSize: '12px'
                }}>
                  <span style={{ fontWeight: 700, color: '#B45309', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Star size={11} fill="#F59E0B" color="#F59E0B" /> {tech.rating} ({tech.reviewsCount})
                  </span>
                  <span style={{ fontWeight: 600, color: '#0B1533' }}>
                    {tech.jobsCompleted}+ Repairs
                  </span>
                  <span style={{ color: '#1677FF', fontWeight: 600 }}>
                    {tech.yearsExperience} yrs exp
                  </span>
                </div>

                {/* Services Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '14px' }}>
                  {tech.categories.map((c, i) => (
                    <span key={i} className="badge badge-orange" style={{ fontSize: '10.5px' }}>
                      {c}
                    </span>
                  ))}
                </div>

                {/* Bio Snippet */}
                <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.45, marginBottom: '14px' }}>
                  {tech.bio.slice(0, 95)}...
                </p>
              </div>

              {/* Bottom Actions */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingTop: '12px',
                borderTop: '1px solid #F1F5F9'
              }}>
                <button
                  onClick={() => openModal('techProfile', tech)}
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1 }}
                >
                  View Profile
                </button>
                <button
                  onClick={() => openModal('repairRequest', { initialTech: tech, initialCategory: tech.categories[0] })}
                  className="btn btn-orange btn-sm"
                  style={{ flex: 1 }}
                >
                  Request Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
