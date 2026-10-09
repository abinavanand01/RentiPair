import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { REPAIR_SERVICES } from '../../data/mockData';
import {
  X,
  Wrench,
  ShieldCheck,
  CheckCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Lock,
  Upload,
  User,
  MapPin,
  Briefcase,
  FileCheck
} from 'lucide-react';

export default function BecomeTechnicianModal() {
  const { modalState, closeModal, onboardTechnician, currentUser } = useApp();
  const [currentStep, setCurrentStep] = useState(1); // 1 through 7

  const [formData, setFormData] = useState(() => ({
    // Step 1: Personal
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    city: currentUser?.city || 'Chennai',
    address: '',

    // Step 2: Skills & Services
    selectedServices: ['Laptop Repair', 'Electronics Repair'],
    specialization: 'Apple MacBook Board-Level Tech & BGA Soldering Specialist',

    // Step 3: Experience
    yearsExperience: 8,
    workshopName: 'Suresh Micro-Tech Solutions',
    certificationsList: 'Apple Certified Technician (ACMT), IPC Rework Specialist',

    // Step 4: Service Area
    serviceArea: 'Porur, Guindy, Vadapalani, Koyambedu, Ashok Nagar',
    onSiteAvailable: true,

    // Step 5: Documents (Masked)
    idType: 'Aadhaar Card',
    idNumberMasked: '****-****-7102',
    certUploadName: 'ACMT_Certificate_2023.pdf',

    // Step 6: Portfolio
    portfolioSample: 'Revived 240+ liquid-damaged Apple logic boards and Dell XPS motherboards with warranty.'
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

  const handleFinalSubmit = () => {
    onboardTechnician({
      name: formData.fullName,
      title: formData.specialization,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      yearsExperience: Number(formData.yearsExperience),
      baseRate: 499,
      serviceArea: formData.serviceArea,
      city: formData.city,
      categories: formData.selectedServices,
      verificationDocMasked: `Govt ID: ${formData.idNumberMasked} | ${formData.certUploadName}`,
      bio: `${formData.specialization}. ${formData.yearsExperience} years experience at ${formData.workshopName}. ${formData.portfolioSample}`
    });

    setCurrentStep(8); // Completed state
  };

  return (
    <div className="modal-overlay" onClick={() => closeModal('becomeTechnician')}>
      <div
        className="modal-content wide"
        onClick={e => e.stopPropagation()}
        style={{ padding: '28px', maxWidth: '720px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-orange-dark)', textTransform: 'uppercase' }}>
              TECHNICIAN ONBOARDING PROTOCOL • STEP {Math.min(7, currentStep)} OF 7
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>
              {currentStep === 8 ? 'Verification Application Submitted' : 'Become a RentiPair Verified Technician'}
            </h3>
          </div>
          <button onClick={() => closeModal('becomeTechnician')} style={{ color: '#64748B' }}>
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
                  background: currentStep >= s ? '#FF6B00' : '#E2E8F0',
                  transition: 'background 0.2s'
                }}
              />
            ))}
          </div>
        )}

        {/* STEP 1: Personal Information */}
        {currentStep === 1 && (
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '14px' }}>
              Step 1: Personal & Contact Information
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Full Name (As on Govt ID)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number (OTP Verified)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Operational City</label>
                <select
                  className="form-select"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                >
                  <option value="Chennai">Chennai</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>
            </div>

            <button onClick={() => setCurrentStep(2)} className="btn btn-orange" style={{ width: '100%', marginTop: '12px' }}>
              <span>Next: Skills & Services</span> <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: Skills & Services */}
        {currentStep === 2 && (
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '14px' }}>
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
                        background: selected ? '#FFF4EB' : '#F8FAFC',
                        color: selected ? '#EA580C' : '#334155',
                        border: selected ? '1.5px solid #FF6B00' : '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{srv.name}</span>
                      {selected && <CheckCircle size={15} color="#FF6B00" />}
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
                placeholder="e.g. Master iPhone Screen & Micro-Soldering Specialist"
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
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '14px' }}>
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
                  min="1"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Shop / Workshop / Freelance Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.workshopName}
                  onChange={e => setFormData({ ...formData, workshopName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Certifications & Training Background</label>
              <textarea
                className="form-textarea"
                value={formData.certificationsList}
                onChange={e => setFormData({ ...formData, certificationsList: e.target.value })}
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
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '14px' }}>
              Step 4: Operational Service Area & Coverage
            </h4>

            <div className="form-group">
              <label className="form-label">Localities & Radius Covered</label>
              <textarea
                className="form-textarea"
                value={formData.serviceArea}
                onChange={e => setFormData({ ...formData, serviceArea: e.target.value })}
                placeholder="List localities in your city (e.g. Adyar, T. Nagar, Velachery)"
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', cursor: 'pointer', marginTop: '10px' }}>
              <input
                type="checkbox"
                checked={formData.onSiteAvailable}
                onChange={e => setFormData({ ...formData, onSiteAvailable: e.target.checked })}
                style={{ accentColor: '#FF6B00', width: '18px', height: '18px' }}
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
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
              Step 5: Identity & Skill Verification Documents
            </h4>

            <div style={{
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '12px',
              color: '#065F46',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Lock size={18} color="#059669" />
              <span>
                <strong>Privacy Protected:</strong> Uploaded government IDs and certificates are stored in private encrypted storage. Document numbers are masked and NEVER displayed publicly.
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
                  <option value="Aadhaar Card">Aadhaar Card</option>
                  <option value="Driving License">Driving License</option>
                  <option value="Passport">Passport</option>
                  <option value="PAN Card">PAN Card</option>
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
              <label className="form-label">Professional / Technical Certificate Upload</label>
              <div style={{
                border: '2px dashed #CBD5E1',
                borderRadius: '10px',
                padding: '18px',
                textAlign: 'center',
                background: '#F8FAFC'
              }}>
                <Upload size={24} color="#64748B" style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  {formData.certUploadName} (Verified Sample)
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>PDF, PNG, JPG up to 10MB</div>
              </div>
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
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '14px' }}>
              Step 6: Work Samples & Repair Portfolio
            </h4>

            <div className="form-group">
              <label className="form-label">Summary of Past Repairs</label>
              <textarea
                className="form-textarea"
                value={formData.portfolioSample}
                onChange={e => setFormData({ ...formData, portfolioSample: e.target.value })}
                placeholder="Give examples of complex diagnostics, component replacements, or customer outcomes..."
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
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '14px' }}>
              Step 7: Final Review & Submission
            </h4>

            <div style={{
              background: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              padding: '16px',
              fontSize: '13px',
              lineHeight: 1.6,
              marginBottom: '20px'
            }}>
              <div><strong>Name:</strong> {formData.fullName} ({formData.phone})</div>
              <div><strong>Specialization:</strong> {formData.specialization}</div>
              <div><strong>Services:</strong> {formData.selectedServices.join(', ')}</div>
              <div><strong>Experience:</strong> {formData.yearsExperience} Years ({formData.workshopName})</div>
              <div><strong>Coverage:</strong> {formData.serviceArea} ({formData.city})</div>
              <div><strong>Document Mask:</strong> {formData.idType} ({formData.idNumberMasked})</div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setCurrentStep(6)} className="btn btn-outline" style={{ flex: 1 }}>
                Back
              </button>
              <button onClick={handleFinalSubmit} className="btn btn-orange" style={{ flex: 2 }}>
                <CheckCircle size={16} />
                <span>Submit for Verification</span>
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
              background: '#FFF4EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              border: '2px solid #FF6B00'
            }}>
              <Clock size={32} color="#EA580C" />
            </div>

            <div style={{
              display: 'inline-block',
              background: '#FFF4EB',
              color: '#EA580C',
              padding: '4px 14px',
              borderRadius: '999px',
              fontSize: '12.5px',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}>
              Verification Pending
            </div>

            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Application Queued for Review
            </h3>

            <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.5 }}>
              Thank you for applying, {formData.fullName}. Our technical screening panel checks document authenticity within 1–2 business days.
              Once approved, you will display the badge:
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#ECFDF5',
              color: '#059669',
              border: '1.5px solid #10B981',
              padding: '8px 18px',
              borderRadius: '999px',
              fontWeight: 800,
              fontSize: '14px',
              marginBottom: '24px'
            }}>
              <CheckCircle2 size={16} /> RentiPair Verified Technician
            </div>

            <div>
              <button onClick={() => closeModal('becomeTechnician')} className="btn btn-primary" style={{ minWidth: '160px' }}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
