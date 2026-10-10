import React, { useState, useRef } from 'react';
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
  Star,
  Image as ImageIcon,
  Trash2,
  AlertCircle
} from 'lucide-react';

export default function ListEquipmentModal() {
  const { modalState, closeModal, listEquipment, currentUser } = useApp();
  const [step, setStep] = useState(1); // 1: Basic Info, 2: Specs & Photos, 3: Pricing & Rules, 4: Preview & Submit, 5: Done
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  // Form Fields - starts completely clean and empty
  const [formData, setFormData] = useState({
    title: '',
    category: 'Cameras',
    brand: '',
    model: '',
    description: '',
    condition: 'Like New',
    dailyRate: '',
    securityDeposit: '',
    pickupLocation: '',
    city: currentUser?.city || 'Chennai',
    deliveryAvailable: true,
    pickupAvailable: true,
    specs: '',
    rentalRules: '',
    images: [], // Real photos uploaded by user
    rentToBuyEnabled: false,
    purchasePrice: '',
    rentToBuyTerms: '70% of all rental payments are credited toward final outright buyout price.',
    studentDiscountEnabled: true,
    studentDiscountPercent: 10
  });

  if (!modalState.listEquipment?.open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setErrorMsg('');
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setErrorMsg('');
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64Url = uploadEvent.target.result;
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, base64Url]
        }));
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const validateStep1 = () => {
    if (!formData.title.trim()) {
      setErrorMsg('Please enter an equipment title.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const validateStep2 = () => {
    if (!formData.images || formData.images.length === 0) {
      setErrorMsg('Please upload at least one photo of your equipment.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const validateStep3 = () => {
    if (!formData.dailyRate || Number(formData.dailyRate) <= 0) {
      setErrorMsg('Please specify a valid daily rental rate.');
      return false;
    }
    if (!formData.pickupLocation.trim()) {
      setErrorMsg('Please enter a pickup locality or landmark.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.images || formData.images.length === 0) {
      setErrorMsg('Please upload at least one photo of your equipment.');
      setStep(2);
      return;
    }

    const parsedSpecs = {};
    if (formData.specs) {
      formData.specs.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          parsedSpecs[parts[0].trim()] = parts.slice(1).join(':').trim();
        }
      });
    }

    const parsedRules = formData.rentalRules
      ? formData.rentalRules.split('\n').filter(r => r.trim().length > 0)
      : [];

    listEquipment({
      title: formData.title,
      category: formData.category,
      brand: formData.brand,
      model: formData.model,
      description: formData.description,
      condition: formData.condition,
      dailyRate: Number(formData.dailyRate),
      securityDeposit: Number(formData.securityDeposit || 0),
      location: formData.pickupLocation,
      city: formData.city,
      deliveryAvailable: formData.deliveryAvailable,
      pickupAvailable: formData.pickupAvailable,
      specs: parsedSpecs,
      rentalRules: parsedRules,
      image: formData.images[0],
      images: formData.images,
      rent_to_buy_enabled: formData.rentToBuyEnabled,
      purchase_price: formData.rentToBuyEnabled ? Number(formData.purchasePrice || 0) : null,
      rent_to_buy_terms: formData.rentToBuyEnabled ? formData.rentToBuyTerms : null,
      student_discount_enabled: formData.studentDiscountEnabled,
      student_discount_percent: formData.studentDiscountEnabled ? Number(formData.studentDiscountPercent || 10) : 0
    });

    setStep(5);
  };

  const resetFormAndClose = () => {
    setFormData({
      title: '',
      category: 'Cameras',
      brand: '',
      model: '',
      description: '',
      condition: 'Like New',
      dailyRate: '',
      securityDeposit: '',
      pickupLocation: '',
      city: currentUser?.city || 'Chennai',
      deliveryAvailable: true,
      pickupAvailable: true,
      specs: '',
      rentalRules: '',
      images: [],
      rentToBuyEnabled: false,
      purchasePrice: '',
      rentToBuyTerms: '70% of all rental payments are credited toward final outright buyout price.',
      studentDiscountEnabled: true,
      studentDiscountPercent: 10
    });
    setStep(1);
    setErrorMsg('');
    closeModal('listEquipment');
  };

  return (
    <div className="modal-overlay" onClick={resetFormAndClose}>
      <div
        className="modal-content wide"
        onClick={e => e.stopPropagation()}
        style={{
          padding: '28px',
          maxWidth: '780px',
          background: '#0E1330',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 24px 64px -16px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Equipment Listing • Step {Math.min(step, 4)} of 4
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF' }}>
              {step === 5 ? 'Listing Published Successfully' : 'List Your Equipment on RentiPair'}
            </h3>
          </div>
          <button onClick={resetFormAndClose} style={{ color: '#94A3B8', cursor: 'pointer', background: 'none', border: 'none' }}>
            <X size={20} />
          </button>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 14px',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            fontSize: '13px',
            color: '#F87171',
            marginBottom: '16px'
          }}>
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: Basic Information */}
        {step === 1 && (
          <div>
            <div className="form-group">
              <label className="form-label">Equipment Name / Title *</label>
              <input
                type="text"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Casio fx-991CW Calculator or Sony A7 IV Camera"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {RENTAL_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.name} style={{ background: '#0E1330', color: '#FFF' }}>{c.name}</option>
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
                  placeholder="e.g. Sony, Casio, Apple, Rigol, Canon"
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
                  placeholder="e.g. fx-991CW, ILCE-7M4"
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
                placeholder="Describe condition, what accessories are included, and any special guidelines..."
                style={{ minHeight: '90px' }}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                if (validateStep1()) setStep(2);
              }}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '12px' }}
            >
              <span>Continue: Photos & Specs</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: Photos, Specs & Condition */}
        {step === 2 && (
          <div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '2px dashed rgba(255, 255, 255, 0.15)',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center',
              marginBottom: '18px'
            }}>
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />

              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(59, 130, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px',
                color: '#60A5FA'
              }}>
                <Upload size={24} />
              </div>

              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', marginBottom: '4px' }}>
                Upload Equipment Photos *
              </h4>
              <p style={{ fontSize: '12.5px', color: '#94A3B8', maxWidth: '420px', margin: '0 auto 14px' }}>
                Please upload real photos of your equipment. Stock images or generic photos are not permitted.
              </p>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-outline btn-sm"
              >
                <PlusCircle size={15} /> Select Photos from Device
              </button>
            </div>

            {/* Photo Previews */}
            {formData.images.length > 0 ? (
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#CBD5E1', marginBottom: '8px' }}>
                  Uploaded Photos ({formData.images.length})
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '10px' }}>
                  {formData.images.map((imgSrc, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: 'relative',
                        height: '80px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: idx === 0 ? '2px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: '#0F172A'
                      }}
                    >
                      <img
                        src={imgSrc}
                        alt={`Upload ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {idx === 0 && (
                        <span style={{
                          position: 'absolute',
                          bottom: '3px',
                          left: '3px',
                          background: '#3B82F6',
                          color: '#FFFFFF',
                          fontSize: '9px',
                          fontWeight: 700,
                          padding: '1px 5px',
                          borderRadius: '4px'
                        }}>
                          Cover
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        style={{
                          position: 'absolute',
                          top: '3px',
                          right: '3px',
                          background: 'rgba(239, 68, 68, 0.9)',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                        title="Remove photo"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{
                padding: '10px 14px',
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '8px',
                fontSize: '12.5px',
                color: '#FCD34D',
                marginBottom: '16px'
              }}>
                ⚠️ Please upload at least one photo of your equipment to proceed.
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Item Condition</label>
                <select
                  name="condition"
                  className="form-select"
                  value={formData.condition}
                  onChange={handleChange}
                >
                  <option value="Like New" style={{ background: '#0E1330', color: '#FFF' }}>Like New (Mint, flawless)</option>
                  <option value="Excellent" style={{ background: '#0E1330', color: '#FFF' }}>Excellent (Minor cosmetic signs)</option>
                  <option value="Good" style={{ background: '#0E1330', color: '#FFF' }}>Good (Fully functional, normal wear)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Key Specifications (Key: Value per line)</label>
                <textarea
                  name="specs"
                  className="form-textarea"
                  value={formData.specs}
                  onChange={handleChange}
                  placeholder="Battery: 2 Included\nSensor: 24MP\nCase: Included"
                  style={{ fontFamily: 'monospace', fontSize: '12px', minHeight: '70px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
              <button type="button" onClick={() => setStep(1)} className="btn btn-outline" style={{ flex: 1 }}>
                <ArrowLeft size={16} /> Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (validateStep2()) setStep(3);
                }}
                className="btn btn-primary"
                style={{ flex: 2 }}
              >
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
                <label className="form-label">Rental Rate Per Day (₹) *</label>
                <input
                  type="number"
                  name="dailyRate"
                  className="form-input"
                  value={formData.dailyRate}
                  onChange={handleChange}
                  placeholder="e.g. 50, 500, 1500"
                  min="1"
                  required
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
                  placeholder="e.g. 200, 2000, 10000"
                  min="0"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Pickup Locality / Area *</label>
                <input
                  type="text"
                  name="pickupLocation"
                  className="form-input"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  placeholder="e.g. Adyar, T. Nagar, HSR Layout"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">City</label>
                <select name="city" className="form-select" value={formData.city} onChange={handleChange}>
                  <option value="Chennai" style={{ background: '#0E1330', color: '#FFF' }}>Chennai</option>
                  <option value="Bengaluru" style={{ background: '#0E1330', color: '#FFF' }}>Bengaluru</option>
                  <option value="Hyderabad" style={{ background: '#0E1330', color: '#FFF' }}>Hyderabad</option>
                  <option value="Mumbai" style={{ background: '#0E1330', color: '#FFF' }}>Mumbai</option>
                  <option value="Delhi" style={{ background: '#0E1330', color: '#FFF' }}>Delhi</option>
                  <option value="Pune" style={{ background: '#0E1330', color: '#FFF' }}>Pune</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Rental Rules / Requirements (One per line)</label>
              <textarea
                name="rentalRules"
                className="form-textarea"
                value={formData.rentalRules}
                onChange={handleChange}
                placeholder="1. Government Photo ID required\n2. Return in original box"
                style={{ minHeight: '65px' }}
              />
            </div>

            {/* Special Growth Features: Student Discount & Rent-to-Buy */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
              {/* Student Discount Toggle Card */}
              <div style={{
                background: formData.studentDiscountEnabled ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                border: formData.studentDiscountEnabled ? '1.5px solid rgba(16, 185, 129, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '14px'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', color: '#FFFFFF' }}>
                  <input
                    type="checkbox"
                    name="studentDiscountEnabled"
                    checked={formData.studentDiscountEnabled}
                    onChange={handleChange}
                    style={{ accentColor: '#10B981', width: '16px', height: '16px' }}
                  />
                  <span>🎓 Enable Student Discount</span>
                </label>
                <p style={{ fontSize: '11.5px', color: '#94A3B8', margin: '6px 0 10px' }}>
                  Attract verified college students with special rates.
                </p>
                {formData.studentDiscountEnabled && (
                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                      Discount Percentage (%)
                    </label>
                    <input
                      type="number"
                      name="studentDiscountPercent"
                      className="form-input"
                      value={formData.studentDiscountPercent}
                      onChange={handleChange}
                      placeholder="e.g. 10, 15, 20"
                      min="1"
                      max="50"
                      style={{ fontSize: '13px', padding: '6px 10px' }}
                    />
                    {formData.dailyRate && (
                      <div style={{ fontSize: '11px', color: '#34D399', fontWeight: 600, marginTop: '4px' }}>
                        Student Price: ₹{Math.round(Number(formData.dailyRate) * (1 - (Number(formData.studentDiscountPercent || 10) / 100)))}/day
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Rent-to-Buy Toggle Card */}
              <div style={{
                background: formData.rentToBuyEnabled ? 'rgba(139, 92, 246, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                border: formData.rentToBuyEnabled ? '1.5px solid rgba(139, 92, 246, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '14px'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', color: '#FFFFFF' }}>
                  <input
                    type="checkbox"
                    name="rentToBuyEnabled"
                    checked={formData.rentToBuyEnabled}
                    onChange={handleChange}
                    style={{ accentColor: '#8B5CF6', width: '16px', height: '16px' }}
                  />
                  <span>⚡ Available for Rent-to-Buy</span>
                </label>
                <p style={{ fontSize: '11.5px', color: '#94A3B8', margin: '6px 0 10px' }}>
                  Allow renters to buy out this equipment after renting.
                </p>
                {formData.rentToBuyEnabled && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                        Outright Purchase Price (₹) *
                      </label>
                      <input
                        type="number"
                        name="purchasePrice"
                        className="form-input"
                        value={formData.purchasePrice}
                        onChange={handleChange}
                        placeholder="e.g. 25000, 65000"
                        min="100"
                        required
                        style={{ fontSize: '13px', padding: '6px 10px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 600, color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                        Rent-to-Buy Terms
                      </label>
                      <input
                        type="text"
                        name="rentToBuyTerms"
                        className="form-input"
                        value={formData.rentToBuyTerms}
                        onChange={handleChange}
                        placeholder="e.g. 70% rent credited towards buyout"
                        style={{ fontSize: '12px', padding: '6px 10px' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
              <button type="button" onClick={() => setStep(2)} className="btn btn-outline" style={{ flex: 1 }}>
                <ArrowLeft size={16} /> Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (validateStep3()) setStep(4);
                }}
                className="btn btn-primary"
                style={{ flex: 2 }}
              >
                <Eye size={16} />
                <span>Live Preview Listing</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Live Preview & Submission */}
        {step === 4 && (
          <div>
            <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '12px' }}>
              Here is how your equipment listing will appear to verified renters:
            </div>

            {/* Live Preview Card */}
            <div style={{
              background: 'rgba(14, 19, 48, 0.9)',
              border: '2px solid #3B82F6',
              borderRadius: '16px',
              padding: '18px',
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              marginBottom: '20px',
              boxShadow: '0 8px 30px rgba(59, 130, 246, 0.2)'
            }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, background: '#0F172A' }}>
                <img
                  src={formData.images[0]}
                  alt="preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
                  <span className="badge badge-blue">{formData.category}</span>
                  <span className="badge badge-green">{formData.condition}</span>
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                  {formData.title}
                </h4>
                <div style={{ fontSize: '12.5px', color: '#94A3B8', marginBottom: '6px' }}>
                  📍 {formData.pickupLocation}, {formData.city} • Owner: {currentUser?.name}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#3B82F6' }}>
                  ₹{formData.dailyRate}/day {formData.securityDeposit ? <span style={{ fontSize: '11px', color: '#94A3B8' }}>(Deposit: ₹{formData.securityDeposit})</span> : null}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={() => setStep(3)} className="btn btn-outline" style={{ flex: 1 }}>
                Edit Details
              </button>
              <button type="button" onClick={handleSubmit} className="btn btn-primary" style={{ flex: 2 }}>
                <CheckCircle size={16} />
                <span>Publish Listing</span>
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
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              border: '2px solid #10B981',
              boxShadow: '0 0 25px rgba(16, 185, 129, 0.35)'
            }}>
              <CheckCircle size={32} color="#10B981" />
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
              Equipment Listed Successfully!
            </h3>

            <p style={{ fontSize: '14px', color: '#94A3B8', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.5 }}>
              Your item <strong>"{formData.title}"</strong> is now live in the RentiPair marketplace with your uploaded photos.
            </p>

            <button
              onClick={resetFormAndClose}
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
