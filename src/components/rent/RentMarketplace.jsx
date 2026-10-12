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
  ArrowRight,
  Heart,
  Scale,
  Bell,
  GraduationCap,
  Clock,
  XCircle
} from 'lucide-react';

export default function RentMarketplace() {
  const {
    equipment,
    openModal,
    pageParams,
    wishlist,
    toggleWishlist,
    isInWishlist,
    compareList,
    addToCompare,
    removeFromCompare,
    isInCompare,
    subscribeAvailabilityAlert,
    isAlertSubscribed
  } = useApp();

  // Filters State
  const [searchQuery, setSearchQuery] = useState(pageParams?.q || '');
  const [selectedCategory, setSelectedCategory] = useState(pageParams?.category || 'all');
  const [selectedCity, setSelectedCity] = useState(pageParams?.city || 'all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minRating, setMinRating] = useState(0);
  const [availableOnly, setAvailableOnly] = useState(pageParams?.availability === 'now');
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [rentToBuyOnly, setRentToBuyOnly] = useState(false);
  const [studentDiscountOnly, setStudentDiscountOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Cities
  const cities = ['all', 'Chennai', 'Bengaluru', 'Hyderabad', 'Mumbai', 'Delhi', 'Pune'];

  // Dynamic unique brands extracted from active equipment listings
  const availableBrands = useMemo(() => {
    const brandsSet = new Set();
    equipment.forEach(item => {
      if (item.brand && item.brand.trim()) {
        brandsSet.add(item.brand.trim());
      }
    });
    return ['all', ...Array.from(brandsSet)];
  }, [equipment]);

  // Active filter count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedCategory !== 'all') count++;
    if (selectedCity !== 'all') count++;
    if (selectedCondition !== 'all') count++;
    if (selectedBrand !== 'all') count++;
    if (minPrice > 0 || maxPrice < 5000) count++;
    if (minRating > 0) count++;
    if (availableOnly) count++;
    if (deliveryOnly) count++;
    if (rentToBuyOnly) count++;
    if (studentDiscountOnly) count++;
    return count;
  }, [
    searchQuery,
    selectedCategory,
    selectedCity,
    selectedCondition,
    selectedBrand,
    minPrice,
    maxPrice,
    minRating,
    availableOnly,
    deliveryOnly,
    rentToBuyOnly,
    studentDiscountOnly
  ]);

  // Filter Logic (100% Real Database Items)
  const filteredItems = useMemo(() => {
    return equipment
      .filter(item => item.status === 'Approved' || item.status === 'APPROVED')
      .filter(item => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          item.title?.toLowerCase().includes(q) ||
          item.brand?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          item.location?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
        );
      })
      .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
      .filter(item => selectedCity === 'all' || item.city?.toLowerCase() === selectedCity.toLowerCase())
      .filter(item => selectedCondition === 'all' || item.condition === selectedCondition)
      .filter(item => selectedBrand === 'all' || item.brand?.toLowerCase() === selectedBrand.toLowerCase())
      .filter(item => item.dailyRate >= minPrice && item.dailyRate <= maxPrice)
      .filter(item => (item.rating || 0) >= minRating)
      .filter(item => !deliveryOnly || item.deliveryAvailable)
      .filter(item => !availableOnly || item.isAvailable)
      .filter(item => !rentToBuyOnly || item.rent_to_buy_enabled || item.rentToBuyEnabled)
      .filter(item => !studentDiscountOnly || item.student_discount_enabled || item.studentDiscountEnabled)
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.dailyRate - b.dailyRate;
        if (sortBy === 'price-high') return b.dailyRate - a.dailyRate;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      });
  }, [
    equipment,
    searchQuery,
    selectedCategory,
    selectedCity,
    selectedCondition,
    selectedBrand,
    minPrice,
    maxPrice,
    minRating,
    deliveryOnly,
    availableOnly,
    rentToBuyOnly,
    studentDiscountOnly,
    sortBy
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCity('all');
    setSelectedCondition('all');
    setSelectedBrand('all');
    setMinPrice(0);
    setMaxPrice(5000);
    setMinRating(0);
    setDeliveryOnly(false);
    setAvailableOnly(false);
    setRentToBuyOnly(false);
    setStudentDiscountOnly(false);
    setSortBy('popularity');
  };

  return (
    <div style={{ background: '#050816', minHeight: 'calc(100vh - 76px)', paddingBottom: '80px', position: 'relative' }}>
      {/* Ambient background glows */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '15%',
        width: '500px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      {/* COMPACT HERO */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(10, 15, 36, 0.95) 0%, rgba(14, 19, 48, 0.8) 100%)',
        color: '#FFFFFF',
        padding: '38px 0 34px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ maxWidth: '640px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontWeight: 700,
              color: '#06B6D4',
              background: 'rgba(6, 182, 212, 0.12)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              padding: '4px 12px',
              borderRadius: '999px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '10px'
            }}>
              <Box size={13} /> EQUIPMENT RENTAL MARKETPLACE
            </span>

            <h1 style={{
              fontSize: 'clamp(26px, 3.5vw, 36px)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '8px',
              letterSpacing: '-0.02em'
            }}>
              Rent Verified Equipment & Tech Gear
            </h1>

            <p style={{ fontSize: '14.5px', color: '#94A3B8', margin: 0 }}>
              Inspected calculators, laptops, lab gear & cameras with escrow protection and verified owners.
            </p>
          </div>

          <div>
            <button
              onClick={() => openModal('listEquipment')}
              className="btn btn-primary btn-lg"
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 700,
                boxShadow: '0 0 25px rgba(59, 130, 246, 0.4)'
              }}
            >
              + List Your Equipment
            </button>
          </div>
        </div>
      </section>

      {/* SEARCH & TOOLBAR SECTION */}
      <div className="container" style={{ marginTop: '24px', position: 'relative', zIndex: 2 }}>
        <div style={{
          background: 'rgba(14, 19, 48, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '12px 16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '24px'
        }}>
          {/* Main Search Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(10, 15, 36, 0.85)',
            padding: '0 14px',
            height: '44px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            flex: '1 1 300px'
          }}>
            <Search size={17} color="#3B82F6" />
            <input
              type="text"
              placeholder="Search laptops, scientific calculators, cameras, oscilloscopes..."
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
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ color: '#94A3B8', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Right Controls: Sort & Mobile Filter Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              height: '44px',
              padding: '0 12px',
              background: 'rgba(10, 15, 36, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px'
            }}>
              <span style={{ fontSize: '12.5px', color: '#94A3B8', fontWeight: 600 }}>Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
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
                <option value="popularity" style={{ background: '#0E1330', color: '#FFF' }}>Most Popular</option>
                <option value="price-low" style={{ background: '#0E1330', color: '#FFF' }}>Price: Low to High</option>
                <option value="price-high" style={{ background: '#0E1330', color: '#FFF' }}>Price: High to Low</option>
                <option value="rating" style={{ background: '#0E1330', color: '#FFF' }}>Top Rated</option>
              </select>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="btn btn-outline"
              style={{ height: '44px', padding: '0 14px', display: 'none' }}
              id="mobile-filter-trigger"
            >
              <Filter size={16} />
              <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
            </button>
          </div>
        </div>

        {/* LAYOUT: SIDEBAR + PRODUCT GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '270px 1fr',
          gap: '24px',
          alignItems: 'start'
        }} className="marketplace-layout-grid">

          {/* DESKTOP FILTERS SIDEBAR */}
          <aside style={{
            background: 'rgba(14, 19, 48, 0.8)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }} className="desktop-filters-aside">
            {/* Filter Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '12px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '16px'
            }}>
              <span style={{ fontWeight: 800, fontSize: '14.5px', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '7px' }}>
                <SlidersHorizontal size={15} color="#3B82F6" /> Advanced Filters
              </span>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  style={{ fontSize: '12px', color: '#F87171', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Clear All
                </button>
              )}
            </div>

            {/* 1. Category */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Category
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', maxHeight: '180px', overflowY: 'auto' }}>
                {RENTAL_CATEGORIES.map(cat => {
                  const active = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      style={{
                        textAlign: 'left',
                        padding: '7px 10px',
                        borderRadius: '8px',
                        fontSize: '12.5px',
                        fontWeight: active ? 700 : 500,
                        background: active ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                        color: active ? '#60A5FA' : '#94A3B8',
                        border: active ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Price Range (Min & Max) */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>
                  Daily Rate (₹)
                </span>
                <span style={{ fontWeight: 700, color: '#3B82F6', fontSize: '12.5px' }}>
                  ₹{minPrice} – ₹{maxPrice}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                <input
                  type="number"
                  min="0"
                  max="5000"
                  value={minPrice}
                  onChange={e => setMinPrice(Number(e.target.value))}
                  placeholder="Min"
                  style={{
                    width: '50%',
                    padding: '6px 8px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(10, 15, 36, 0.85)',
                    color: '#FFFFFF',
                    fontSize: '12px'
                  }}
                />
                <span style={{ color: '#64748B' }}>–</span>
                <input
                  type="number"
                  min="0"
                  max="5000"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  placeholder="Max"
                  style={{
                    width: '50%',
                    padding: '6px 8px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(10, 15, 36, 0.85)',
                    color: '#FFFFFF',
                    fontSize: '12px'
                  }}
                />
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#3B82F6', cursor: 'pointer' }}
              />
            </div>

            {/* 3. Location / City */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em', marginBottom: '6px' }}>
                Location
              </div>
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="form-select"
                style={{
                  fontSize: '13px',
                  padding: '8px 10px',
                  height: '38px',
                  background: 'rgba(10, 15, 36, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF'
                }}
              >
                {cities.map(c => (
                  <option key={c} value={c} style={{ background: '#0E1330', color: '#FFF' }}>{c === 'all' ? 'All Operating Cities' : c}</option>
                ))}
              </select>
            </div>

            {/* 4. Brand Filter */}
            {availableBrands.length > 2 && (
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Brand
                </div>
                <select
                  value={selectedBrand}
                  onChange={e => setSelectedBrand(e.target.value)}
                  className="form-select"
                  style={{
                    fontSize: '13px',
                    padding: '8px 10px',
                    height: '38px',
                    background: 'rgba(10, 15, 36, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#FFFFFF'
                  }}
                >
                  {availableBrands.map(b => (
                    <option key={b} value={b} style={{ background: '#0E1330', color: '#FFF' }}>{b === 'all' ? 'All Brands' : b}</option>
                  ))}
                </select>
              </div>
            )}

            {/* 5. Rating Filter */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em', marginBottom: '6px' }}>
                Owner Rating
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[0, 3, 4, 4.5].map(rating => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setMinRating(rating)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      background: minRating === rating ? '#3B82F6' : 'rgba(255, 255, 255, 0.05)',
                      color: minRating === rating ? '#FFFFFF' : '#94A3B8',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer'
                    }}
                  >
                    {rating === 0 ? 'Any' : `${rating}★+`}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Condition */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em', marginBottom: '6px' }}>
                Condition
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {['all', 'Like New', 'Excellent', 'Good'].map(cond => (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setSelectedCondition(cond)}
                    style={{
                      padding: '4px 9px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      background: selectedCondition === cond ? '#3B82F6' : 'rgba(255, 255, 255, 0.05)',
                      color: selectedCondition === cond ? '#FFFFFF' : '#94A3B8',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer'
                    }}
                  >
                    {cond === 'all' ? 'All' : cond}
                  </button>
                ))}
              </div>
            </div>

            {/* 7. Special Checkbox Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', cursor: 'pointer', color: '#94A3B8' }}>
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={e => setAvailableOnly(e.target.checked)}
                  style={{ accentColor: '#3B82F6', width: '15px', height: '15px' }}
                />
                <span>Available Now</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', cursor: 'pointer', color: '#94A3B8' }}>
                <input
                  type="checkbox"
                  checked={rentToBuyOnly}
                  onChange={e => setRentToBuyOnly(e.target.checked)}
                  style={{ accentColor: '#F97316', width: '15px', height: '15px' }}
                />
                <span>Rent-to-Buy Option</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', cursor: 'pointer', color: '#94A3B8' }}>
                <input
                  type="checkbox"
                  checked={studentDiscountOnly}
                  onChange={e => setStudentDiscountOnly(e.target.checked)}
                  style={{ accentColor: '#8B5CF6', width: '15px', height: '15px' }}
                />
                <span>🎓 Student Discount</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', cursor: 'pointer', color: '#94A3B8' }}>
                <input
                  type="checkbox"
                  checked={deliveryOnly}
                  onChange={e => setDeliveryOnly(e.target.checked)}
                  style={{ accentColor: '#3B82F6', width: '15px', height: '15px' }}
                />
                <span>Doorstep Delivery</span>
              </label>
            </div>
          </aside>

          {/* MAIN RESULTS AREA */}
          <div>
            {/* Header: Result count & Active Filter tags */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <div>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF' }}>
                  {filteredItems.length} Equipment Available
                </span>
                {activeFiltersCount > 0 && (
                  <span style={{ fontSize: '12.5px', color: '#94A3B8', marginLeft: '6px' }}>
                    ({activeFiltersCount} filters applied)
                  </span>
                )}
              </div>
            </div>

            {/* RESULTS GRID OR BEAUTIFUL EMPTY STATES */}
            {filteredItems.length === 0 ? (
              equipment.filter(e => e.status === 'Approved' || e.status === 'APPROVED').length === 0 ? (
                /* Empty Database State */
                <div style={{
                  background: 'rgba(14, 19, 48, 0.7)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: '20px',
                  border: '1.5px dashed rgba(255, 255, 255, 0.15)',
                  padding: '56px 24px',
                  textAlign: 'center',
                  maxWidth: '560px',
                  margin: '0 auto',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                    No equipment listed yet.
                  </h3>
                  <p style={{ fontSize: '14.5px', color: '#94A3B8', lineHeight: 1.5, marginBottom: '24px' }}>
                    Be the first person to list equipment on RentiPair. Share your gear and start earning rental income.
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
                /* No Filter Matches State */
                <div style={{
                  background: 'rgba(14, 19, 48, 0.7)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: '16px',
                  border: '1.5px dashed rgba(255, 255, 255, 0.15)',
                  padding: '48px 24px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '40px', marginBottom: '8px' }}>🔍</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                    No equipment matched your filters
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#94A3B8', maxWidth: '380px', margin: '0 auto 16px' }}>
                    Try expanding your price range, choosing another city, or resetting active filters.
                  </p>
                  <button onClick={resetFilters} className="btn btn-primary btn-sm">
                    <RotateCcw size={14} /> Clear All Filters
                  </button>
                </div>
              )
            ) : (
              /* PRODUCT CARDS GRID */
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                {filteredItems.map(item => {
                  const itemInWishlist = isInWishlist(item.id);
                  const itemInCompare = isInCompare(item.id);
                  const itemAlertSet = isAlertSubscribed(item.id);

                  return (
                    <div
                      key={item.id}
                      className="card card-hover"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '16px',
                        background: 'linear-gradient(180deg, rgba(14, 19, 48, 0.85) 0%, rgba(10, 15, 36, 0.95) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Image Box */}
                      <div className="equipment-card-img-wrapper" style={{ position: 'relative' }}>
                        <EquipmentImage
                          item={item}
                          alt={item.title}
                          loading="lazy"
                        />

                        {/* Top Left: Category Badge */}
                        <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2 }}>
                          <span className="badge badge-blue">
                            {item.category}
                          </span>
                        </div>

                        {/* Top Right: Wishlist Heart Button */}
                        <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 2 }}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(item.id);
                            }}
                            style={{
                              width: '34px',
                              height: '34px',
                              borderRadius: '50%',
                              background: 'rgba(10, 15, 36, 0.85)',
                              backdropFilter: 'blur(8px)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                            }}
                            title={itemInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                          >
                            <Heart
                              size={16}
                              color={itemInWishlist ? '#EF4444' : '#94A3B8'}
                              fill={itemInWishlist ? '#EF4444' : 'none'}
                            />
                          </button>
                        </div>

                        {/* Bottom Left: Rating Pill */}
                        <div style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 2 }}>
                          <span className="rating-pill">
                            <Star size={11} fill="#F59E0B" color="#F59E0B" />
                            <span>{item.rating || 0}</span>
                            <span style={{ fontSize: '10.5px', color: '#FCD34D' }}>({item.reviewsCount || 0})</span>
                          </span>
                        </div>

                        {/* Bottom Right: Compare Button */}
                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 2 }}>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (itemInCompare) {
                                removeFromCompare(item.id);
                              } else {
                                addToCompare(item);
                              }
                            }}
                            style={{
                              background: itemInCompare ? '#3B82F6' : 'rgba(10, 15, 36, 0.85)',
                              color: '#FFFFFF',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              backdropFilter: 'blur(8px)',
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '4px 10px',
                              borderRadius: '999px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              cursor: 'pointer'
                            }}
                          >
                            <Scale size={11} />
                            <span>{itemInCompare ? '✓ In Compare' : '+ Compare'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div style={{
                        padding: '16px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}>
                        <div>
                          {/* Special Badges: Rent-to-Buy & Student Discount */}
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                            {(item.student_discount_enabled || item.studentDiscountEnabled) && (
                              <span style={{
                                background: 'rgba(139, 92, 246, 0.15)',
                                color: '#C4B5FD',
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                padding: '2px 7px',
                                borderRadius: '4px',
                                fontSize: '10.5px',
                                fontWeight: 700,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px'
                              }}>
                                <GraduationCap size={12} /> Student: ₹{Math.round(item.dailyRate * 0.9)}/d
                              </span>
                            )}

                            {(item.rent_to_buy_enabled || item.rentToBuyEnabled) && (
                              <span style={{
                                background: 'rgba(249, 115, 22, 0.15)',
                                color: '#FDBA74',
                                border: '1px solid rgba(249, 115, 22, 0.3)',
                                padding: '2px 7px',
                                borderRadius: '4px',
                                fontSize: '10.5px',
                                fontWeight: 700
                              }}>
                                Rent-to-Buy
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 style={{
                            fontSize: '15px',
                            fontWeight: 700,
                            color: '#FFFFFF',
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
                            color: '#94A3B8',
                            lineHeight: 1.45,
                            marginBottom: '10px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {item.description}
                          </p>

                          {/* Location & Smart Availability */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '12px',
                            marginBottom: '10px'
                          }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#94A3B8' }}>
                              <MapPin size={12} color="#64748B" /> {item.city}
                            </span>

                            {item.isAvailable ? (
                              <span style={{ color: '#34D399', fontWeight: 600 }}>
                                ✓ Available Now
                              </span>
                            ) : (
                              <span style={{ color: '#F87171', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                                <Clock size={11} />
                                {item.currentlyRentedUntil ? `Rented till ${new Date(item.currentlyRentedUntil).toLocaleDateString([], { month: 'short', day: 'numeric' })}` : 'Currently Rented'}
                              </span>
                            )}
                          </div>

                          {/* Owner Badge */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 10px',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '8px',
                            marginBottom: '12px',
                            fontSize: '11px'
                          }}>
                            <span style={{ color: '#94A3B8' }}>Owner: <strong style={{ color: '#FFFFFF' }}>{item.owner?.name?.split(' ')[0] || 'Member'}</strong></span>
                            <span style={{ color: '#60A5FA', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 700 }}>
                              <CheckCircle2 size={11} /> Verified
                            </span>
                          </div>
                        </div>

                        {/* Pricing & CTA Button / Notify Me */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '12px',
                          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                        }}>
                          <div>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: '#3B82F6' }}>
                              ₹{item.dailyRate}<span style={{ fontSize: '11.5px', color: '#94A3B8', fontWeight: 500 }}>/day</span>
                            </div>
                            <div style={{ fontSize: '10px', color: '#64748B' }}>Deposit: ₹{item.securityDeposit}</div>
                          </div>

                          <div style={{ display: 'flex', gap: '6px' }}>
                            {!item.isAvailable && (
                              <button
                                type="button"
                                onClick={() => subscribeAvailabilityAlert(item.id)}
                                className={itemAlertSet ? 'btn btn-outline btn-sm' : 'btn btn-orange btn-sm'}
                                style={{ fontSize: '12px', padding: '0 10px' }}
                                title="Get notified when available"
                              >
                                <Bell size={13} />
                                <span>{itemAlertSet ? 'Alert Set' : 'Notify'}</span>
                              </button>
                            )}

                            <button
                              onClick={() => openModal('details', item)}
                              className="btn btn-primary btn-sm"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE SLIDE-UP FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="modal-overlay" onClick={() => setMobileFilterOpen(false)}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{
              padding: '24px',
              maxHeight: '85vh',
              overflowY: 'auto',
              borderRadius: '24px 24px 0 0',
              margin: 'auto 0 0 0',
              width: '100%',
              maxWidth: '100%',
              background: '#0E1330',
              border: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>
                Filter Equipment ({activeFiltersCount})
              </span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                style={{ color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
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
              <label className="form-label">Location</label>
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
              <label className="form-label">Max Daily Rate: ₹{maxPrice}/day</label>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#3B82F6' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '20px 0' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#E2E8F0' }}>
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={e => setAvailableOnly(e.target.checked)}
                  style={{ accentColor: '#3B82F6', width: '16px', height: '16px' }}
                />
                <span>Available Now</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#E2E8F0' }}>
                <input
                  type="checkbox"
                  checked={rentToBuyOnly}
                  onChange={e => setRentToBuyOnly(e.target.checked)}
                  style={{ accentColor: '#F97316', width: '16px', height: '16px' }}
                />
                <span>Rent-to-Buy Option</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#E2E8F0' }}>
                <input
                  type="checkbox"
                  checked={studentDiscountOnly}
                  onChange={e => setStudentDiscountOnly(e.target.checked)}
                  style={{ accentColor: '#8B5CF6', width: '16px', height: '16px' }}
                />
                <span>🎓 Student Discount</span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                type="button"
                onClick={resetFilters}
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="btn btn-primary"
                style={{ flex: 1.5 }}
              >
                Apply Filters ({filteredItems.length})
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .marketplace-layout-grid {
            grid-template-columns: 1fr !important;
          }
          .desktop-filters-aside {
            display: none !important;
          }
          #mobile-filter-trigger {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
}
