import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RENTAL_CATEGORIES } from '../../data/mockData';
import EquipmentImage from '../common/EquipmentImage';
import {
  X,
  Upload,
  PlusCircle,
  Eye,
  CheckCircle,
  Clock,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Star
} from 'lucide-react';

export default function ListEquipmentModal() {
  const { modalState, closeModal, listEquipment, currentUser } = useApp();
  const [step, setStep] = useState(1); // 1: Basic Info, 2: Specs & Condition, 3: Pricing & Rules, 4: Preview & Submit, 5: Done

  // Form Fields
  const [formData, setFormData] = useState({
    title: 'Sony FX3 Cinema Line Full-Frame Camera',
    category: 'Cameras',
    brand: 'Sony',
    model: 'ILME-FX3',
    description: 'Professional cinematic 4K 120p camera with active cooling, dual base ISO 800/12800, and XLR audio handle unit.',
    condition: 'Like New',
    dailyRate: 1800,
    securityDeposit: 15000,
    pickupLocation: 'Besant Nagar, Chennai',
    city: 'Chennai',
    deliveryAvailable: true,
    pickupAvailable: true,
    specs: 'Sensor: 12.1MP Exmor R CMOS\nVideo: 4K 120p 10-bit 4:2:2\nMount: Sony E-mount\nCooling: Built-in active fan',
    rentalRules: '1. Government Photo ID mandatory\n2. No lens swaps in open outdoor rain\n3. Return with both batteries charged',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80'
  });

  if (!modalState.listEquipment?.open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parse specs into key-value
    const parsedSpecs = {};
    formData.specs.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        parsedSpecs[parts[0].trim()] = parts.slice(1).join(':').trim();
      }
    });

    const parsedRules = formData.rentalRules.split('\n').filter(r => r.trim().length > 0);

    listEquipment({
      title: formData.title,
      category: formData.category,
      brand: formData.brand,
      model: formData.model,
      description: formData.description,
      condition: formData.condition,
      dailyRate: Number(formData.dailyRate),
      securityDeposit: Number(formData.securityDeposit),
      location: formData.pickupLocation,
      city: formData.city,
      deliveryAvailable: formData.deliveryAvailable,
      pickupAvailable: formData.pickupAvailable,
      specs: parsedSpecs,
      rentalRules: parsedRules,
      image: formData.imageUrl,
      images: [formData.imageUrl]
    });

    setStep(5);
  };

  return (
    <div className="modal-overlay" onClick={() => closeModal('listEquipment')}>
      <div
        className="modal-content wide"
        onClick={e => e.stopPropagation()}
        style={{ padding: '28px', maxWidth: '780px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
              Equipment Monetization Wizard • Step {step} of 4
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A' }}>
              {step === 5 ? 'Listing Submitted for Moderation' : 'List Your Equipment on RentiPair'}
            </h3>
          </div>
          <button onClick={() => closeModal('listEquipment')} style={{ color: '#64748B' }}>
            <X size={20} />
          </button>
        </div>

        {/* Moderation Notice Badge */}
        {step < 5 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            background: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: '8px',
            fontSize: '12px',
            color: '#B45309',
            marginBottom: '20px'
          }}>
            <ShieldAlert size={16} />
            <span>
              <strong>Quality Protection:</strong> All new equipment listings undergo team verification for serial authenticity and safety standards before appearing publicly.
            </span>
          </div>
        )}

        {/* STEP 1: Basic Information */}
        {step === 1 && (
          <div>
            <div className="form-group">
              <label className="form-label">Equipment Title / Name</label>
              <input
                type="text"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Casio fx-991EX ClassWiz or Sony A7 IV"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {RENTAL_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Brand</label>
                <input
                  type="text"
                  name="brand"
                  className="form-input"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g. Sony, Casio, Apple, Rigol"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Model Number</label>
                <input
                  type="text"
                  name="model"
                  className="form-input"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g. ILME-FX3, fx-991EX"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe condition, what's included, and ideal use cases..."
              />
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '12px' }}
            >
              <span>Continue: Specs & Condition</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: Specs, Photos, Condition */}
        {step === 2 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Item Condition</label>
                <select
                  name="condition"
                  className="form-select"
                  value={formData.condition}
                  onChange={handleChange}
                >
                  <option value="Like New">Like New (Mint, zero marks)</option>
                  <option value="Excellent">Excellent (Minor signs of gentle use)</option>
                  <option value="Good">Good (Fully functional, normal cosmetic wear)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Photo URL / Demo Image</label>
                <input
                  type="text"
                  name="imageUrl"
                  className="form-input"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Paste image URL..."
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Specifications (Key : Value per line)
              </label>
              <textarea
                name="specs"
                className="form-textarea"
                value={formData.specs}
                onChange={handleChange}
                placeholder="Resolution: 4K\nBattery: 2 included\nWeight: 715g"
                style={{ fontFamily: 'monospace', fontSize: '13px', minHeight: '90px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
              <button onClick={() => setStep(1)} className="btn btn-outline" style={{ flex: 1 }}>
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={() => setStep(3)} className="btn btn-primary" style={{ flex: 2 }}>
                <span>Continue: Pricing & Deposit</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Pricing, Deposit, Pickup Location & Rules */}
        {step === 3 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Rental Rate Per Day (₹)</label>
                <input
                  type="number"
                  name="dailyRate"
                  className="form-input"
                  value={formData.dailyRate}
                  onChange={handleChange}
                  min="20"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Security Deposit (₹ Held in Escrow)</label>
                <input
                  type="number"
                  name="securityDeposit"
                  className="form-input"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  min="100"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Pickup Locality / Landmark</label>
                <input
                  type="text"
                  name="pickupLocation"
                  className="form-input"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  placeholder="e.g. Adyar, Chennai"
                />
              </div>

              <div className="form-group">
                <label className="form-label">City</label>
                <select name="city" className="form-select" value={formData.city} onChange={handleChange}>
                  <option value="Chennai">Chennai</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Rental Rules (One per line)</label>
              <textarea
                name="rentalRules"
                className="form-textarea"
                value={formData.rentalRules}
                onChange={handleChange}
                style={{ minHeight: '70px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
              <button onClick={() => setStep(2)} className="btn btn-outline" style={{ flex: 1 }}>
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={() => setStep(4)} className="btn btn-primary" style={{ flex: 2 }}>
                <Eye size={16} />
                <span>Live Preview Listing</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Live Preview & Submission */}
        {step === 4 && (
          <div>
            <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '12px' }}>
              Here is how your equipment listing will appear to verified renters:
            </div>

            {/* Live Preview Card */}
            <div style={{
              background: '#FFFFFF',
              border: '2px solid #0066FF',
              borderRadius: '16px',
              padding: '18px',
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              marginBottom: '20px',
              boxShadow: '0 8px 24px rgba(0, 102, 255, 0.12)'
            }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, background: '#F1F5F9' }}>
                <EquipmentImage
                  src={formData.imageUrl}
                  item={{
                    category: formData.category,
                    title: formData.title,
                    brand: formData.brand,
                    model: formData.model
                  }}
                  alt="preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
                  <span className="badge badge-blue">{formData.category}</span>
                  <span className="badge badge-green">{formData.condition}</span>
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                  {formData.title}
                </h4>
                <div style={{ fontSize: '12.5px', color: '#64748B', marginBottom: '6px' }}>
                  📍 {formData.pickupLocation} • Owner: {currentUser.name}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0066FF' }}>
                  ₹{formData.dailyRate}/day <span style={{ fontSize: '11px', color: '#64748B' }}>(Deposit: ₹{formData.securityDeposit})</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(3)} className="btn btn-outline" style={{ flex: 1 }}>
                Edit Details
              </button>
              <button onClick={handleSubmit} className="btn btn-primary" style={{ flex: 2 }}>
                <CheckCircle size={16} />
                <span>Submit for Moderation</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Success Screen */}
        {step === 5 && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#FEF3C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              border: '2px solid #F59E0B'
            }}>
              <Clock size={32} color="#D97706" />
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Listing Submitted for Moderation!
            </h3>

            <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.5 }}>
              Your item <strong>"{formData.title}"</strong> has been queued for admin review.
              Our moderation team verifies that equipment details meet quality & safety benchmarks. You will receive a notification within 2–4 hours once it goes live.
            </p>

            <button
              onClick={() => closeModal('listEquipment')}
              className="btn btn-primary"
              style={{ minWidth: '160px' }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
