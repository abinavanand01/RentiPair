import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import EquipmentImage from '../common/EquipmentImage';
import {
  Star,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react';

export default function FeaturedEquipment() {
  const { equipment, openModal, navigateTo } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterOptions = ['All', 'Scientific Calculators', 'Cameras', 'Laptops', 'Electronics', 'Tools'];

  const filteredItems = equipment
    .filter(item => item.status === 'Approved')
    .filter(item => selectedFilter === 'All' || item.category === selectedFilter)
    .slice(0, 6);

  return (
    <section style={{
      padding: '80px 0',
      background: 'linear-gradient(180deg, #0A0F24 0%, #0C1128 100%)',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '28px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11.5px',
              fontWeight: 700,
              color: '#60A5FA',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '8px'
            }}>
              <Sparkles size={13} /> QUALITY TESTED & VERIFIED
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 34px)', fontWeight: 800, color: '#F8FAFC' }}>
              Explore Equipment
            </h2>
            <p style={{ fontSize: '14.5px', color: '#94A3B8', marginTop: '6px' }}>
              Real gear from verified community owners. Ready for immediate pickup or rental.
            </p>
          </div>

          <button
            onClick={() => navigateTo('rent')}
            className="btn btn-outline"
            style={{ fontSize: '13px', height: '38px' }}
          >
            <span>View All Equipment ({equipment.filter(e => e.status === 'Approved').length})</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '24px'
        }}>
          {filterOptions.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              style={{
                padding: '7px 16px',
                borderRadius: '999px',
                fontSize: '12.5px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                background: selectedFilter === cat
                  ? 'linear-gradient(135deg, #3B82F6, #2563EB)'
                  : 'rgba(255, 255, 255, 0.04)',
                color: selectedFilter === cat ? '#FFFFFF' : '#94A3B8',
                border: selectedFilter === cat
                  ? '1px solid #3B82F6'
                  : '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: selectedFilter === cat ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none',
                transition: 'all 0.18s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Equipment Cards or Empty State */}
        {filteredItems.length === 0 ? (
          <div style={{
            background: 'rgba(14, 19, 48, 0.5)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            border: '1px dashed rgba(255, 255, 255, 0.12)',
            padding: '60px 24px',
            textAlign: 'center',
            maxWidth: '560px',
            margin: '0 auto'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#F8FAFC', marginBottom: '8px' }}>
              No equipment has been listed yet.
            </h3>
            <p style={{ fontSize: '14.5px', color: '#94A3B8', lineHeight: 1.5, marginBottom: '24px' }}>
              Be the first person to list equipment on RentiPair.
            </p>
            <button
              onClick={() => openModal('listEquipment')}
              className="btn btn-primary"
              style={{ padding: '12px 28px', fontSize: '14.5px', fontWeight: 700 }}
            >
              List Your Equipment
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {filteredItems.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '18px',
                  background: 'rgba(14, 19, 48, 0.5)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  height: '100%',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer'
                }}
                onClick={() => openModal('details', item)}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 48px -8px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Image */}
                <div className="equipment-card-img-wrapper">
                  <EquipmentImage item={item} alt={item.title} loading="lazy" />

                  <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    <span className="badge badge-blue">{item.category}</span>
                  </div>

                  <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <span style={{
                      background: 'rgba(0, 0, 0, 0.6)',
                      color: '#FFFFFF',
                      backdropFilter: 'blur(4px)',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '999px'
                    }}>
                      {item.condition}
                    </span>
                  </div>

                  <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                    <span className="rating-pill">
                      <Star size={11} fill="#FBBF24" color="#FBBF24" />
                      <span>{item.rating || 0}</span>
                      <span style={{ color: '#D97706', fontWeight: 500, fontSize: '10.5px' }}>
                        ({item.reviewsCount || 0})
                      </span>
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div style={{
                  padding: '18px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#F8FAFC',
                      lineHeight: 1.35,
                      marginBottom: '5px',
                      minHeight: '40px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {item.title}
                    </h3>

                    <p style={{
                      fontSize: '12.5px',
                      color: '#94A3B8',
                      lineHeight: 1.45,
                      marginBottom: '12px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {item.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '12px',
                      color: '#64748B',
                      marginBottom: '12px'
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <MapPin size={12} color="#64748B" /> {item.city}
                      </span>
                      <span style={{
                        color: item.isAvailable ? '#34D399' : '#F87171',
                        fontWeight: 600
                      }}>
                        {item.isAvailable ? '✓ Available' : 'Rented'}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 10px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '8px',
                      marginBottom: '14px',
                      fontSize: '11px',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                      <span style={{ color: '#CBD5E1' }}>Owner: <strong>{item.owner?.name ? item.owner.name.split(' ')[0] : 'Member'}</strong></span>
                      <span style={{
                        color: '#60A5FA',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        fontWeight: 700
                      }}>
                        <CheckCircle2 size={11} /> Verified
                      </span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '14px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                  }}>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#60A5FA' }}>
                        ₹{item.dailyRate}
                        <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>/day</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); openModal('details', item); }}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
