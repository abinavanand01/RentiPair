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
    !q ||
    item.title.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q) ||
    item.brand.toLowerCase().includes(q) ||
    item.location.toLowerCase().includes(q)
  ).slice(0, 5);

  const filteredTechnicians = technicians.filter(tech =>
    !q ||
    tech.name.toLowerCase().includes(q) ||
    tech.title.toLowerCase().includes(q) ||
    tech.categories.some(c => c.toLowerCase().includes(q)) ||
    tech.serviceArea.toLowerCase().includes(q)
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
        style={{ padding: 0, overflow: 'hidden' }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid #E2E8F0',
          gap: '12px',
          background: '#FFFFFF'
        }}>
          <Search size={22} color="var(--color-primary)" />
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
              color: '#0F172A',
              background: 'transparent',
              outline: 'none'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ color: '#94A3B8', padding: '4px' }}
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={() => closeModal('search')}
            style={{
              background: '#F1F5F9',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#64748B'
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
          background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0'
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
                background: activeTab === tab ? '#0066FF' : '#FFFFFF',
                color: activeTab === tab ? '#FFFFFF' : '#475569',
                border: activeTab === tab ? '1px solid #0066FF' : '1px solid #CBD5E1'
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
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '8px' }}>
                Popular Searches
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {popularSearches.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(s.label)}
                    style={{
                      background: '#F1F5F9',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: '#334155',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Sparkles size={13} color="var(--color-primary)" />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Equipment Results */}
          {(activeTab === 'all' || activeTab === 'equipment') && filteredEquipment.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Box size={14} color="#0066FF" /> Equipment for Rent ({filteredEquipment.length})
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
                      border: '1px solid #F1F5F9',
                      background: '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#F1F5F9' }}>
                        <EquipmentImage
                          item={item}
                          alt={item.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#0F172A' }}>{item.title}</div>
                        <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', gap: '10px' }}>
                          <span>{item.category}</span>
                          <span>•</span>
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '15px' }}>
                        ₹{item.dailyRate}<span style={{ fontSize: '11px', color: '#64748B' }}>/day</span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>Available</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technicians Results */}
          {(activeTab === 'all' || activeTab === 'technicians') && filteredTechnicians.length > 0 && (
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Wrench size={14} color="#FF6B00" /> Verified Technicians ({filteredTechnicians.length})
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
                      border: '1px solid #F1F5F9',
                      background: '#FFFFFF',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FFFBF8'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={tech.avatar}
                        alt={tech.name}
                        style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {tech.name}
                          <span style={{ fontSize: '11px', background: '#ECFDF5', color: '#059669', padding: '1px 6px', borderRadius: '4px' }}>
                            ✓ Verified
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>
                          {tech.title}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 700, color: '#B45309' }}>
                        <Star size={13} fill="#F59E0B" color="#F59E0B" /> {tech.rating}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{tech.jobsCompleted} repairs</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {query && filteredEquipment.length === 0 && filteredTechnicians.length === 0 && (
            <div style={{ padding: '36px 20px', textAlign: 'center', color: '#64748B' }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔍</div>
              <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: '4px' }}>No matches found for "{query}"</div>
              <div style={{ fontSize: '13px' }}>Try searching for calculators, cameras, laptops, or screen repair.</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 20px',
          background: '#F8FAFC',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          color: '#64748B'
        }}>
          <div>Press <strong>ESC</strong> to dismiss</div>
          <button
            onClick={() => { closeModal('search'); navigateTo('rent'); }}
            style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            Browse All Marketplace <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
