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
    <section style={{ padding: '64px 0', background: '#F8FAFC' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11.5px',
              fontWeight: 700,
              color: '#1677FF',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '6px'
            }}>
              <Sparkles size={13} /> QUALITY TESTED & VERIFIED
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 32px)', fontWeight: 800, color: '#0B1533' }}>
              Featured Equipment for Rent
            </h2>
            <p style={{ fontSize: '14.5px', color: '#64748B', marginTop: '4px' }}>
              Inspected gear from verified community owners. Ready for immediate pickup or delivery.
            </p>
          </div>

          <button
            onClick={() => navigateTo('rent')}
            className="btn btn-outline"
            style={{ fontSize: '13px', height: '38px' }}
          >
            <span>View All Equipment ({equipment.length})</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '10px',
          marginBottom: '24px'
        }}>
          {filterOptions.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '12.5px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                background: selectedFilter === cat ? '#1677FF' : '#FFFFFF',
                color: selectedFilter === cat ? '#FFFFFF' : '#475569',
                border: selectedFilter === cat ? '1px solid #1677FF' : '1px solid #E2E8F0',
                boxShadow: selectedFilter === cat ? '0 2px 6px rgba(22, 119, 255, 0.22)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Equipment Cards Grid (Uniform 16:10 Aspect Ratio, Identical Card Heights) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
                background: '#FFFFFF',
                height: '100%'
              }}
            >
              {/* Uniform Fixed Aspect Ratio Image Box */}
              <div className="equipment-card-img-wrapper">
                <EquipmentImage
                  item={item}
                  alt={item.title}
                  loading="lazy"
                />

                {/* Top Badges */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px'
                }}>
                  <span className="badge badge-blue">
                    {item.category}
                  </span>
                </div>

                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px'
                }}>
                  <span style={{
                    background: 'rgba(11, 21, 51, 0.75)',
                    color: '#FFFFFF',
                    backdropFilter: 'blur(4px)',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    padding: '2px 7px',
                    borderRadius: '999px'
                  }}>
                    {item.condition}
                  </span>
                </div>

                {/* Rating Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px'
                }}>
                  <span className="rating-pill">
                    <Star size={11} fill="#F59E0B" color="#F59E0B" />
                    <span>{item.rating}</span>
                    <span style={{ color: '#92400E', fontWeight: 500, fontSize: '10.5px' }}>
                      ({item.reviewsCount})
                    </span>
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div style={{
                padding: '16px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#0B1533',
                    lineHeight: 1.35,
                    marginBottom: '4px',
                    minHeight: '40px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.title}
                  </h3>

                  {/* Short Description */}
                  <p style={{
                    fontSize: '12.5px',
                    color: '#64748B',
                    lineHeight: 1.45,
                    marginBottom: '10px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.description}
                  </p>

                  {/* Location & Availability */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#64748B',
                    marginBottom: '10px'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <MapPin size={12} color="#94A3B8" /> {item.city}
                    </span>
                    <span style={{
                      color: item.isAvailable ? '#059669' : '#DC2626',
                      fontWeight: 600
                    }}>
                      {item.isAvailable ? '✓ Available' : 'Rented'}
                    </span>
                  </div>

                  {/* Owner Badge */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 8px',
                    background: '#F8FAFC',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    fontSize: '11px'
                  }}>
                    <span style={{ color: '#475569' }}>Owner: <strong>{item.owner.name.split(' ')[0]}</strong></span>
                    <span style={{ color: '#1677FF', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 700 }}>
                      <CheckCircle2 size={11} /> Verified
                    </span>
                  </div>
                </div>

                {/* Price & CTA Action */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid #F1F5F9'
                }}>
                  <div>
                    <div style={{ fontSize: '17px', fontWeight: 800, color: '#1677FF' }}>
                      ₹{item.dailyRate}
                      <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>/day</span>
                    </div>
                  </div>

                  <button
                    onClick={() => openModal('details', item)}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
