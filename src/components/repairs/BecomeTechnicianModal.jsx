import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { REPAIR_SERVICES } from '../../data/mockData';
import {
  X,
  Wrench,
  ShieldCheck,
  CheckCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  Lock,
  Upload,
  User,
  MapPin,
  Briefcase,
  FileCheck,
  Camera,
  AlertCircle
} from 'lucide-react';

export default function BecomeTechnicianModal() {
  const { modalState, closeModal, onboardTechnician, currentUser } = useApp();
  const [currentStep, setCurrentStep] = useState(1); // 1 through 7
  const [errorMsg, setErrorMsg] = useState('');
  const avatarInputRef = useRef(null);

  const [formData, setFormData] = useState(() => ({
    // Step 1: Personal
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    city: currentUser?.city || 'Chennai',
    address: '',
    avatar: currentUser?.avatar || '',

    // Step 2: Skills & Services
    selectedServices: [],
    specialization: '',

    // Step 3: Experience
    yearsExperience: '',
    workshopName: '',
    certificationsList: '',

    // Step 4: Service Area
    serviceArea: '',
    onSiteAvailable: true,

    // Step 5: Documents (Masked)
    idType: 'Aadhaar Card',
    idNumberMasked: '',
    certUploadName: '',

    // Step 6: Portfolio
    portfolioSample: ''
  }));

  if (!modalState.becomeTechnician?.open) return null;

  const toggleService = (srvName) => {
    setFormData(prev => {
      const exists = prev.selectedServices.includes(srvName);
      return {
        ...prev,
        selectedServices: exists
          ? prev.selectedServices.filter(s => s !== srvName)
          : [...prev.selectedServices, srvName]
      };
    });
  };

  const handleAvatarFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData(prev => ({ ...prev, avatar: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleFinalSubmit = () => {
    onboardTechnician({
      name: formData.fullName || currentUser?.name || 'Technician',
      title: formData.specialization || 'Electronics Repair Specialist',
      avatar: formData.avatar || currentUser?.avatar || '',
      yearsExperience: Number(formData.yearsExperience || 0),
      baseRate: 399,
      serviceArea: formData.serviceArea || formData.city,
      city: formData.city,
      categories: formData.selectedServices.length > 0 ? formData.selectedServices : ['Electronics Repair'],
      verificationDocMasked: formData.idNumberMasked ? `Govt ID: ${formData.idNumberMasked}` : 'ID Verification Pending',
      bio: formData.portfolioSample || `${formData.specialization}. ${formData.yearsExperience} years experience at ${formData.workshopName || formData.city}.`
    });

    setCurrentStep(8); // Completed state
  };

  const resetAndClose = () => {
    setCurrentStep(1);
    setErrorMsg('');
    closeModal('becomeTechnician');
  };

  return (
    <div className="modal-overlay" onClick={resetAndClose}>
      <div
        className="modal-content wide"
        onClick={e => e.stopPropagation()}
        style={{
          padding: '28px',
          maxWidth: '720px',
          background: '#0E1330',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 24px 64px -16px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              TECHNICIAN ONBOARDING PROTOCOL • STEP {Math.min(7, currentStep)} OF 7
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>
              {currentStep === 8 ? 'Verification Application Submitted' : 'Become a RentiPair Verified Technician'}
            </h3>
          </div>
          <button onClick={resetAndClose} style={{ color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* 7-Step Progress Indicator */}
        {currentStep <= 7 && (
          <div style={{ display: 'flex', gap: '4px', marginBottom: '22px' }}>
            {[1, 2, 3, 4, 5, 6, 7].map(s => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: '4px',
                  borderRadius: '2px',
                  background: currentStep >= s ? '#F97316' : 'rgba(255, 255, 255, 0.08)',
                  transition: 'background 0.2s'
                }}
              />
            ))}
          </div>
        )}

        {/* STEP 1: Personal Information */}
        {currentStep === 1 && (
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
              Step 1: Personal & Contact Information
            </h4>

            {/* Profile Photo Upload */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '18px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '2px solid rgba(255, 255, 255, 0.12)'
              }}>
                {formData.avatar ? (
                  <img src={formData.avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <User size={28} color="#94A3B8" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  ref={avatarInputRef}
                  accept="image/*"
                  onChange={handleAvatarFile}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '12px' }}
                >
                  <Camera size={14} /> Upload Profile Photo
                </button>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
                  Professional headshot visible to customers
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Full Name (As on Govt ID) *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Suresh Kumar"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. +91 98765 43210"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Operational City *</label>
                <select
                  className="form-select"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                >
                  <option value="Chennai" style={{ background: '#0E1330', color: '#FFF' }}>Chennai</option>
                  <option value="Bengaluru" style={{ background: '#0E1330', color: '#FFF' }}>Bengaluru</option>
                  <option value="Hyderabad" style={{ background: '#0E1330', color: '#FFF' }}>Hyderabad</option>
                  <option value="Mumbai" style={{ background: '#0E1330', color: '#FFF' }}>Mumbai</option>
                  <option value="Pune" style={{ background: '#0E1330', color: '#FFF' }}>Pune</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                if (!formData.fullName.trim()) {
                  alert('Please enter your full name.');
                  return;
                }
                setCurrentStep(2);
              }}
              className="btn btn-orange"
              style={{ width: '100%', marginTop: '12px' }}
            >
              <span>Next: Skills & Services</span> <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: Skills & Services */}
        {currentStep === 2 && (
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
              Step 2: Service Specialties & Categories
            </h4>

            <div className="form-group">
              <label className="form-label">Select Services You Specialize In</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
                {REPAIR_SERVICES.map(srv => {
                  const selected = formData.selectedServices.includes(srv.name);
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => toggleService(srv.name)}
                      style={{
                        padding: '10px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 600,
                        textAlign: 'left',
                        background: selected ? 'rgba(249, 115, 22, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                        color: selected ? '#FB923C' : '#94A3B8',
                        border: selected ? '1.5px solid #F97316' : '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>{srv.name}</span>
                      {selected && <CheckCircle size={15} color="#F97316" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '16px' }}>
              <label className="form-label">Professional Title / Headline</label>
              <input
                type="text"
                className="form-input"
                value={formData.specialization}
                onChange={e => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="e.g. Laptop Screen & Motherboard Level Tech"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => setCurrentStep(1)} className="btn btn-outline" style={{ flex: 1 }}>
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={() => setCurrentStep(3)} className="btn btn-orange" style={{ flex: 2 }}>
                <span>Next: Experience</span> <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Experience */}
        {currentStep === 3 && (
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
              Step 3: Industry Experience & Workshop
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Years of Repair Experience</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.yearsExperience}
                  onChange={e => setFormData({ ...formData, yearsExperience: e.target.value })}
                  placeholder="e.g. 5"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Shop / Workshop / Freelance Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.workshopName}
                  onChange={e => setFormData({ ...formData, workshopName: e.target.value })}
                  placeholder="e.g. Apex Tech Lab or Independent"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Certifications & Training Background</label>
              <textarea
                className="form-textarea"
                value={formData.certificationsList}
                onChange={e => setFormData({ ...formData, certificationsList: e.target.value })}
                placeholder="e.g. Certified Hardware Technician, Diploma in Electronics"
                style={{ minHeight: '60px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => setCurrentStep(2)} className="btn btn-outline" style={{ flex: 1 }}>
                Back
              </button>
              <button onClick={() => setCurrentStep(4)} className="btn btn-orange" style={{ flex: 2 }}>
                <span>Next: Service Area</span> <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Service Area */}
        {currentStep === 4 && (
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
              Step 4: Operational Service Area & Coverage
            </h4>

            <div className="form-group">
              <label className="form-label">Localities & Radius Covered</label>
              <textarea
                className="form-textarea"
                value={formData.serviceArea}
                onChange={e => setFormData({ ...formData, serviceArea: e.target.value })}
                placeholder="List localities in your city (e.g. Adyar, T. Nagar, Velachery, Anna Nagar)"
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', cursor: 'pointer', marginTop: '10px', color: '#E2E8F0' }}>
              <input
                type="checkbox"
                checked={formData.onSiteAvailable}
                onChange={e => setFormData({ ...formData, onSiteAvailable: e.target.checked })}
                style={{ accentColor: '#F97316', width: '18px', height: '18px' }}
              />
              <span>Available for on-site / doorstep customer visits</span>
            </label>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setCurrentStep(3)} className="btn btn-outline" style={{ flex: 1 }}>
                Back
              </button>
              <button onClick={() => setCurrentStep(5)} className="btn btn-orange" style={{ flex: 2 }}>
                <span>Next: Verification Documents</span> <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Verification Documents (Masked & Protected) */}
        {currentStep === 5 && (
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
              Step 5: Identity & Skill Verification Documents
            </h4>

            <div style={{
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '12px',
              color: '#6EE7B7',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Lock size={18} color="#34D399" />
              <span>
                <strong style={{ color: '#FFFFFF' }}>Privacy Protected:</strong> Uploaded government IDs and certificates are stored in private encrypted storage. Document numbers are masked and NEVER displayed publicly.
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Government ID Type</label>
                <select
                  className="form-select"
                  value={formData.idType}
                  onChange={e => setFormData({ ...formData, idType: e.target.value })}
                >
                  <option value="Aadhaar Card" style={{ background: '#0E1330', color: '#FFF' }}>Aadhaar Card</option>
                  <option value="Driving License" style={{ background: '#0E1330', color: '#FFF' }}>Driving License</option>
                  <option value="Passport" style={{ background: '#0E1330', color: '#FFF' }}>Passport</option>
                  <option value="PAN Card" style={{ background: '#0E1330', color: '#FFF' }}>PAN Card</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">ID Number (Stored Masked)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.idNumberMasked}
                  onChange={e => setFormData({ ...formData, idNumberMasked: e.target.value })}
                  placeholder="e.g. ****-****-1234"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Professional / Technical Certificate Name (Optional)</label>
              <input
                type="text"
                className="form-input"
                value={formData.certUploadName}
                onChange={e => setFormData({ ...formData, certUploadName: e.target.value })}
                placeholder="e.g. ACMT / IPC Certificate 2024"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => setCurrentStep(4)} className="btn btn-outline" style={{ flex: 1 }}>
                Back
              </button>
              <button onClick={() => setCurrentStep(6)} className="btn btn-orange" style={{ flex: 2 }}>
                <span>Next: Portfolio Samples</span> <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: Portfolio / Work Samples */}
        {currentStep === 6 && (
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
              Step 6: Work Samples & Repair Experience
            </h4>

            <div className="form-group">
              <label className="form-label">Summary of Past Repairs</label>
              <textarea
                className="form-textarea"
                value={formData.portfolioSample}
                onChange={e => setFormData({ ...formData, portfolioSample: e.target.value })}
                placeholder="Describe types of repairs you handle, tools you use, or experience with specific devices..."
                style={{ minHeight: '80px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => setCurrentStep(5)} className="btn btn-outline" style={{ flex: 1 }}>
                Back
              </button>
              <button onClick={() => setCurrentStep(7)} className="btn btn-orange" style={{ flex: 2 }}>
                <span>Review & Submit Application</span> <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: Final Review & Submission */}
        {currentStep === 7 && (
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF', marginBottom: '14px' }}>
              Step 7: Final Review & Submission
            </h4>

            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '16px',
              fontSize: '13px',
              lineHeight: 1.6,
              marginBottom: '20px',
              color: '#CBD5E1'
            }}>
              <div><strong style={{ color: '#FFFFFF' }}>Name:</strong> {formData.fullName} ({formData.phone || 'Phone not set'})</div>
              <div><strong style={{ color: '#FFFFFF' }}>Specialization:</strong> {formData.specialization || 'General Tech'}</div>
              <div><strong style={{ color: '#FFFFFF' }}>Services:</strong> {formData.selectedServices.join(', ') || 'General Repair'}</div>
              <div><strong style={{ color: '#FFFFFF' }}>Experience:</strong> {formData.yearsExperience || '0'} Years ({formData.workshopName || 'Independent'})</div>
              <div><strong style={{ color: '#FFFFFF' }}>Coverage:</strong> {formData.serviceArea || formData.city} ({formData.city})</div>
              <div><strong style={{ color: '#FFFFFF' }}>Document Mask:</strong> {formData.idType} ({formData.idNumberMasked || 'Provided'})</div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setCurrentStep(6)} className="btn btn-outline" style={{ flex: 1 }}>
                Back
              </button>
              <button onClick={handleFinalSubmit} className="btn btn-orange" style={{ flex: 2 }}>
                <CheckCircle size={16} />
                <span>Submit Verification Application</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 8: Success State */}
        {currentStep === 8 && (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(249, 115, 22, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              border: '2px solid #F97316',
              boxShadow: '0 0 25px rgba(249, 115, 22, 0.35)'
            }}>
              <CheckCircle size={32} color="#F97316" />
            </div>

            <div style={{
              display: 'inline-block',
              background: 'rgba(249, 115, 22, 0.15)',
              color: '#FB923C',
              border: '1px solid rgba(249, 115, 22, 0.3)',
              padding: '4px 14px',
              borderRadius: '999px',
              fontSize: '12.5px',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              Application Received
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
              Technician Profile Active!
            </h3>

            <p style={{ fontSize: '14px', color: '#94A3B8', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.5 }}>
              Thank you for applying, {formData.fullName}. Your technician profile has been registered in the RentiPair directory.
            </p>

            <div>
              <button onClick={resetAndClose} className="btn btn-primary" style={{ minWidth: '160px' }}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
