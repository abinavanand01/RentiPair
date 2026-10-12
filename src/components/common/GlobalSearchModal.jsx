import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import EquipmentImage from './EquipmentImage';
import {
  Search,
  X,
  Box,
  Wrench,
  User,
  ArrowRight,
  Sparkles,
  MapPin,
  Star
} from 'lucide-react';

export default function GlobalSearchModal() {
  const {
    modalState,
    closeModal,
    equipment,
    technicians,
    openModal,
    navigateTo
  } = useApp();

  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, equipment, technicians, services

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (modalState.search?.open) {
          closeModal('search');
        } else {
          openModal('search');
        }
      }
      if (e.key === 'Escape' && modalState.search?.open) {
        closeModal('search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalState.search?.open]);

  if (!modalState.search?.open) return null;

  const q = query.toLowerCase().trim();

  const filteredEquipment = equipment.filter(item =>
    (item.status === 'Approved' || item.status === 'APPROVED') && (
      !q ||
      item.title?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q) ||
      item.brand?.toLowerCase().includes(q) ||
      item.location?.toLowerCase().includes(q)
    )
  ).slice(0, 5);

  const filteredTechnicians = technicians.filter(tech =>
    (tech.status === 'Approved' || tech.verification_status === 'VERIFIED') && (
      !q ||
      tech.name?.toLowerCase().includes(q) ||
      tech.title?.toLowerCase().includes(q) ||
      (Array.isArray(tech.categories) && tech.categories.some(c => c.toLowerCase().includes(q))) ||
      tech.serviceArea?.toLowerCase().includes(q)
    )
  ).slice(0, 4);

  const popularSearches = [
    { label: "Scientific Calculator", type: "equipment" },
    { label: "MacBook Pro", type: "equipment" },
    { label: "Sony A7 IV", type: "equipment" },
    { label: "Laptop Screen Repair", type: "repair" },
    { label: "OLED Glass Lamination", type: "repair" },
    { label: "Oscilloscope", type: "equipment" }
  ];

  const handleSelectEquipment = (item) => {
    closeModal('search');
    openModal('details', item);
  };

  const handleSelectTechnician = (tech) => {
    closeModal('search');
    openModal('techProfile', tech);
  };

  return (
    <div className="modal-overlay" onClick={() => closeModal('search')}>
      <div
        className="modal-content wide"
        onClick={e => e.stopPropagation()}
        style={{
          padding: 0,
          overflow: 'hidden',
          background: '#0E1330',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 24px 64px -16px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          gap: '12px',
          background: 'rgba(10, 15, 36, 0.95)'
        }}>
          <Search size={22} color="#3B82F6" />
          <input
            type="text"
            placeholder="Search equipment to rent, verified technicians, or repair issues..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              fontSize: '17px',
              fontWeight: 500,
              color: '#FFFFFF',
              background: 'transparent',
              outline: 'none'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ color: '#94A3B8', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={() => closeModal('search')}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#94A3B8',
              cursor: 'pointer'
            }}
          >
            ESC
          </button>
        </div>

        {/* Tab Filters */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '10px 20px',
          background: 'rgba(14, 19, 48, 0.75)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          {['all', 'equipment', 'technicians'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '12.5px',
                fontWeight: 600,
                textTransform: 'capitalize',
                background: activeTab === tab ? '#3B82F6' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === tab ? '#FFFFFF' : '#94A3B8',
                border: activeTab === tab ? '1px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {tab === 'all' ? 'All Results' : tab === 'equipment' ? 'Equipment' : 'Technicians'}
            </button>
          ))}
        </div>

        {/* Search Content */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '16px 20px' }}>
          {!query && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                Popular Searches
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {popularSearches.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(s.label)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: '#CBD5E1',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <Sparkles size={13} color="#3B82F6" />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Equipment Results */}
          {(activeTab === 'all' || activeTab === 'equipment') && filteredEquipment.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Box size={14} color="#3B82F6" /> Equipment for Rent ({filteredEquipment.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredEquipment.map(item => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectEquipment(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#0F172A' }}>
                        <EquipmentImage
                          item={item}
                          alt={item.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#FFFFFF' }}>{item.title}</div>
                        <div style={{ fontSize: '12px', color: '#94A3B8', display: 'flex', gap: '10px' }}>
                          <span>{item.category}</span>
                          <span>•</span>
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, color: '#3B82F6', fontSize: '15px' }}>
                        ₹{item.dailyRate}<span style={{ fontSize: '11px', color: '#94A3B8' }}>/day</span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#34D399', fontWeight: 600 }}>Available</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technicians Results */}
          {(activeTab === 'all' || activeTab === 'technicians') && filteredTechnicians.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Wrench size={14} color="#F97316" /> Verified Technicians ({filteredTechnicians.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filteredTechnicians.map(tech => (
                  <div
                    key={tech.id}
                    onClick={() => handleSelectTechnician(tech)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(249, 115, 22, 0.1)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {tech.avatar ? (
                        <img
                          src={tech.avatar}
                          alt={tech.name}
                          style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {tech.name ? tech.name.charAt(0).toUpperCase() : 'T'}
                        </div>
                      )}
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {tech.name}
                          <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', padding: '1px 6px', borderRadius: '4px' }}>
                            ✓ Verified
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                          {tech.title}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 700, color: '#FBBF24' }}>
                        <Star size={13} fill="#F59E0B" color="#F59E0B" /> {tech.rating}
                      </div>
                      <div style={{ fontSize: '11px', color: '#94A3B8' }}>{tech.jobsCompleted} repairs</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Explicit Empty States */}
          {activeTab === 'equipment' && filteredEquipment.length === 0 && (
            <div style={{ padding: '36px 20px', textAlign: 'center', color: '#94A3B8' }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>📦</div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '4px', fontSize: '15px' }}>
                No equipment listed yet.
              </div>
              <div style={{ fontSize: '13px', marginBottom: '14px' }}>
                Be the first to list equipment and start earning on RentiPair.
              </div>
              <button
                type="button"
                onClick={() => { closeModal('search'); openModal('listEquipment'); }}
                className="btn btn-primary btn-sm"
              >
                + List Your Equipment
              </button>
            </div>
          )}

          {activeTab === 'technicians' && filteredTechnicians.length === 0 && (
            <div style={{ padding: '36px 20px', textAlign: 'center', color: '#94A3B8' }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔧</div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '4px', fontSize: '15px' }}>
                No technicians available yet.
              </div>
              <div style={{ fontSize: '13px', marginBottom: '14px' }}>
                Join as a verified technician and receive repair requests.
              </div>
              <button
                type="button"
                onClick={() => { closeModal('search'); openModal('becomeTechnician'); }}
                className="btn btn-orange btn-sm"
              >
                Become a Technician
              </button>
            </div>
          )}

          {activeTab === 'all' && (query || (filteredEquipment.length === 0 && filteredTechnicians.length === 0)) && filteredEquipment.length === 0 && filteredTechnicians.length === 0 && (
            <div style={{ padding: '36px 20px', textAlign: 'center', color: '#94A3B8' }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔍</div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: '4px', fontSize: '15px' }}>
                {query ? `No matches found for "${query}"` : 'No equipment listed yet and no technicians available yet.'}
              </div>
              <div style={{ fontSize: '13px' }}>
                Try searching for calculators, cameras, laptops, or screen repair.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 20px',
          background: 'rgba(10, 15, 36, 0.95)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: '#94A3B8'
        }}>
          <div>Press <strong>ESC</strong> to dismiss</div>
          <button
            onClick={() => { closeModal('search'); navigateTo('rent'); }}
            style={{ color: '#60A5FA', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Browse All Marketplace <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
