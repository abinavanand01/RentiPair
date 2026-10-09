import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { RENTAL_CATEGORIES } from '../../data/mockData';
import EquipmentImage from '../common/EquipmentImage';
import {
  Search,
  Filter,
  SlidersHorizontal,
  MapPin,
  Star,
  CheckCircle2,
  Box,
  X,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Check,
  ArrowRight
} from 'lucide-react';

export default function RentMarketplace() {
  const { equipment, openModal, pageParams } = useApp();

  // Filters State
  const [searchQuery, setSearchQuery] = useState(pageParams?.q || '');
  const [selectedCategory, setSelectedCategory] = useState(pageParams?.category || 'all');
  const [selectedCity, setSelectedCity] = useState(pageParams?.city || 'all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Cities
  const cities = ['all', 'Chennai', 'Bengaluru', 'Hyderabad', 'Mumbai', 'Delhi', 'Pune'];

  // Filter Logic
  const filteredItems = useMemo(() => {
    return equipment
      .filter(item => item.status === 'Approved')
      .filter(item => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q)
        );
      })
      .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
      .filter(item => selectedCity === 'all' || item.city.toLowerCase() === selectedCity.toLowerCase())
      .filter(item => selectedCondition === 'all' || item.condition === selectedCondition)
      .filter(item => item.dailyRate <= maxPrice)
      .filter(item => item.rating >= minRating)
      .filter(item => !deliveryOnly || item.deliveryAvailable)
      .filter(item => !availableOnly || item.isAvailable)
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.dailyRate - b.dailyRate;
        if (sortBy === 'price-high') return b.dailyRate - a.dailyRate;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.reviewsCount - a.reviewsCount;
      });
  }, [
    equipment,
    searchQuery,
    selectedCategory,
    selectedCity,
    selectedCondition,
    maxPrice,
    minRating,
    deliveryOnly,
    availableOnly,
    sortBy
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCity('all');
    setSelectedCondition('all');
    setMaxPrice(2000);
    setMinRating(0);
    setDeliveryOnly(false);
    setAvailableOnly(false);
    setSortBy('popularity');
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: 'calc(100vh - 76px)', paddingBottom: '80px' }}>
      {/* 4. REDESIGNED COMPACT HERO (Dark Navy, vertical center, clean typography) */}
      <section style={{
        background: 'linear-gradient(135deg, #0B1533 0%, #111D42 60%, #0F1A3A 100%)',
        color: '#FFFFFF',
        padding: '40px 0 36px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px'
        }}>
          {/* Left Text Block */}
          <div style={{ maxWidth: '640px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: 700,
              color: '#60A5FA',
              background: 'rgba(22, 119, 255, 0.18)',
              border: '1px solid rgba(96, 165, 250, 0.25)',
              padding: '3px 10px',
              borderRadius: '999px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '10px'
            }}>
              <Box size={12} /> EQUIPMENT RENTAL MARKETPLACE
            </span>

            <h1 style={{
              fontSize: 'clamp(26px, 3.5vw, 36px)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '8px'
            }}>
              Rent Verified Equipment & Tech Gear
            </h1>

            <p style={{
              fontSize: '14.5px',
              color: '#94A3B8',
              lineHeight: 1.5,
              margin: 0
            }}>
              Calculators for exam day, cameras for shoot days, oscilloscopes for capstones and more.
            </p>
          </div>

          {/* Right Subtle Visual Accent (Floating Minimalist Badges) */}
          <div style={{
            display: 'none',
            flexDirection: 'column',
            gap: '8px',
            flexShrink: 0
          }} className="hero-desktop-pills">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '12px',
              color: '#E2E8F0'
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
              <span>Casio fx-991EX • ₹40/day</span>
              <span style={{ color: '#60A5FA', fontWeight: 600 }}>Exam Ready</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '12px',
              color: '#E2E8F0'
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1677FF' }} />
              <span>Sony A7 IV Kit • 100% Escrow</span>
              <span style={{ color: '#34D399', fontWeight: 600 }}>Verified Owner</span>
            </div>
          </div>

          <style>{`
            @media (min-width: 900px) {
              .hero-desktop-pills {
                display: flex !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* 5. SEARCH & TOOLBAR SECTION (Directly below hero, unified height & alignment) */}
      <div className="container" style={{ marginTop: '24px' }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '12px 16px',
          boxShadow: '0 2px 8px rgba(11, 21, 51, 0.04)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '24px'
        }}>
          {/* Main Search Input (occupies most available width) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#F8FAFC',
            padding: '0 14px',
            height: '42px',
            borderRadius: '10px',
            border: '1.5px solid #E2E8F0',
            flex: '1 1 320px'
          }}>
            <Search size={17} color="#1677FF" />
            <input
              type="text"
              placeholder="Search equipment by name, model or brand..."
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
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ color: '#94A3B8', padding: '4px' }}>
                <X size={15} />
              </button>
            )}
          </div>

          {/* Right Toolbar Controls: Sort By & Mobile Filter Trigger */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '42px',
              padding: '0 12px',
              background: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              borderRadius: '10px'
            }}>
              <span style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 600 }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0B1533',
                  cursor: 'pointer'
                }}
              >
                <option value="popularity">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Mobile Filter Drawer Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="btn btn-outline"
              style={{ height: '42px', padding: '0 14px', fontSize: '13px' }}
              id="mobile-filter-open-btn"
            >
              <Filter size={15} color="#1677FF" />
              <span>Filters</span>
            </button>

            <style>{`
              @media (min-width: 900px) {
                #mobile-filter-open-btn {
                  display: none !important;
                }
              }
            `}</style>
          </div>
        </div>

        {/* 6. CLEAN TWO-COLUMN MARKETPLACE LAYOUT (Left filters, Right cards, max-width 1280px) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '24px',
          alignItems: 'start'
        }} className="marketplace-layout-grid">
          {/* LEFT: Structured Sticky Filter Sidebar (Desktop) */}
          <aside
            className="marketplace-desktop-sidebar"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '18px',
              boxShadow: '0 2px 6px rgba(11, 21, 51, 0.02)',
              position: 'sticky',
              top: '96px'
            }}
          >
            {/* Filter Header & Reset All */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '12px',
              borderBottom: '1px solid #F1F5F9',
              marginBottom: '16px'
            }}>
              <span style={{ fontWeight: 800, fontSize: '14.5px', color: '#0B1533', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <SlidersHorizontal size={15} color="#1677FF" /> Filters
              </span>
              <button
                onClick={resetFilters}
                style={{ fontSize: '12px', color: '#1677FF', fontWeight: 600 }}
              >
                Reset All
              </button>
            </div>

            {/* 1. Category Filter */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.04em', marginBottom: '8px' }}>
                Category
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxHeight: '180px', overflowY: 'auto' }}>
                {RENTAL_CATEGORIES.map(cat => {
                  const active = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      style={{
                        textAlign: 'left',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: '12.5px',
                        fontWeight: active ? 700 : 500,
                        background: active ? '#EEF4FF' : 'transparent',
                        color: active ? '#1677FF' : '#334155',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.name}</span>
                      <span style={{ fontSize: '11px', color: active ? '#1677FF' : '#94A3B8', fontWeight: 600 }}>{cat.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Price Range Slider */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.04em' }}>
                  Max Daily Rate
                </span>
                <span style={{ fontWeight: 700, color: '#1677FF', fontSize: '13px' }}>
                  ₹{maxPrice}/day
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1677FF', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
                <span>₹40</span>
                <span>₹2,000+</span>
              </div>
            </div>

            {/* 3. Location / City */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.04em', marginBottom: '6px' }}>
                Location
              </div>
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="form-select"
                style={{ fontSize: '13px', padding: '8px 10px', height: '38px' }}
              >
                {cities.map(c => (
                  <option key={c} value={c}>{c === 'all' ? 'All Operating Cities' : c}</option>
                ))}
              </select>
            </div>

            {/* 4. Condition */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.04em', marginBottom: '6px' }}>
                Condition
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {['all', 'Like New', 'Excellent', 'Good'].map(cond => {
                  const active = selectedCondition === cond;
                  return (
                    <button
                      key={cond}
                      onClick={() => setSelectedCondition(cond)}
                      style={{
                        padding: '4px 9px',
                        borderRadius: '6px',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        background: active ? '#1677FF' : '#F1F5F9',
                        color: active ? '#FFFFFF' : '#475569',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {cond === 'all' ? 'All' : cond}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Checkbox Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', cursor: 'pointer', color: '#334155' }}>
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={e => setAvailableOnly(e.target.checked)}
                  style={{ accentColor: '#1677FF', width: '15px', height: '15px' }}
                />
                <span>Available Now</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', cursor: 'pointer', color: '#334155' }}>
                <input
                  type="checkbox"
                  checked={deliveryOnly}
                  onChange={e => setDeliveryOnly(e.target.checked)}
                  style={{ accentColor: '#1677FF', width: '15px', height: '15px' }}
                />
                <span>Doorstep Delivery</span>
              </label>
            </div>
          </aside>

          <style>{`
            @media (max-width: 900px) {
              .marketplace-layout-grid {
                grid-template-columns: 1fr !important;
              }
              .marketplace-desktop-sidebar {
                display: none !important;
              }
            }
          `}</style>

          {/* RIGHT: Equipment Listings Grid */}
          <div>
            {/* Header info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '13.5px', color: '#64748B', fontWeight: 600 }}>
                Showing <strong>{filteredItems.length}</strong> equipment listings
              </span>
              {(selectedCategory !== 'all' || selectedCity !== 'all' || searchQuery || selectedCondition !== 'all') && (
                <button
                  onClick={resetFilters}
                  style={{ fontSize: '12px', color: '#1677FF', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <RotateCcw size={12} /> Clear filters
                </button>
              )}
            </div>

            {filteredItems.length === 0 ? (
              /* Empty State */
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px dashed #CBD5E1',
                padding: '48px 24px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>🔍</div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0B1533', marginBottom: '4px' }}>
                  No equipment matched your filters
                </h3>
                <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '380px', margin: '0 auto 16px' }}>
                  Try adjusting your price range or choosing another category or city.
                </p>
                <button onClick={resetFilters} className="btn btn-primary btn-sm">
                  <RotateCcw size={14} /> Reset All Filters
                </button>
              </div>
            ) : (
              /* 7. REDESIGNED EQUIPMENT CARDS (Identical aspect ratios, consistent heights, subtle hover) */
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
                    {/* Fixed 16:10 Aspect Ratio Image */}
                    <div className="equipment-card-img-wrapper">
                      <EquipmentImage
                        item={item}
                        alt={item.title}
                        loading="lazy"
                      />
                      {/* Category Badge */}
                      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                        <span className="badge badge-blue">
                          {item.category}
                        </span>
                      </div>

                      {/* Rating Badge */}
                      <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                        <span className="rating-pill">
                          <Star size={11} fill="#F59E0B" color="#F59E0B" />
                          <span>{item.rating}</span>
                          <span style={{ fontSize: '10.5px', color: '#92400E' }}>({item.reviewsCount})</span>
                        </span>
                      </div>

                      {/* Condition Pill */}
                      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
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
                    </div>

                    {/* Content Section with Standardized Spacing */}
                    <div style={{
                      padding: '16px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        {/* Title (Clean 2-line clamp height) */}
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

                      {/* Pricing & CTA Button */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '12px',
                        borderTop: '1px solid #F1F5F9'
                      }}>
                        <div>
                          <div style={{ fontSize: '17px', fontWeight: 800, color: '#1677FF' }}>
                            ₹{item.dailyRate}<span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>/day</span>
                          </div>
                          <div style={{ fontSize: '10px', color: '#94A3B8' }}>Dep: ₹{item.securityDeposit}</div>
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
            )}
          </div>
        </div>
      </div>

      {/* Slide-out Mobile Filter Drawer Modal */}
      {mobileFilterOpen && (
        <div className="modal-overlay" onClick={() => setMobileFilterOpen(false)}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{ padding: '20px', maxHeight: '85vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '17px', fontWeight: 800, color: '#0B1533' }}>Filter Equipment</span>
              <button onClick={() => setMobileFilterOpen(false)} style={{ color: '#64748B' }}>
                <X size={18} />
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="form-select"
              >
                {RENTAL_CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="form-select"
              >
                {cities.map(c => (
                  <option key={c} value={c}>{c === 'all' ? 'All Operating Cities' : c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">Max Price</label>
                <span style={{ fontWeight: 700, color: '#1677FF' }}>₹{maxPrice}/day</span>
              </div>
              <input
                type="range"
                min="40"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1677FF' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
              <button
                onClick={resetFilters}
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
