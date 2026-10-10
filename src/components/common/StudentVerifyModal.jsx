import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  GraduationCap,
  Upload,
  CheckCircle2,
  Building,
  Mail,
  FileText,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function StudentVerifyModal() {
  const { modalState, closeModal, applyForStudentVerification, currentUser } = useApp();
  const [institutionName, setInstitutionName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [idCardPreview, setIdCardPreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!modalState.studentVerify?.open) return null;

  const handleIdUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdCardPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!institutionName.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      applyForStudentVerification({
        institutionName: institutionName.trim(),
        studentEmail: studentEmail.trim() || `${currentUser?.email}`,
        documentUrl: idCardPreview || 'student_id_card.png'
      });
      setIsSubmitting(false);
      closeModal('studentVerify');
    }, 400);
  };

  return (
    <div className="modal-overlay" onClick={() => closeModal('studentVerify')}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '520px',
          padding: '28px',
          background: 'linear-gradient(180deg, #0B1028 0%, #060919 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(139, 92, 246, 0.15)',
          borderRadius: '20px'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(167, 139, 250, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#A78BFA'
            }}>
              <GraduationCap size={22} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#A78BFA', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                EDUCATION PARTNERSHIP
              </div>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginTop: '2px' }}>
                Student Discount Verification
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => closeModal('studentVerify')}
            style={{
              color: '#94A3B8',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '6px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Benefits Box */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%)',
          borderRadius: '14px',
          border: '1px solid rgba(167, 139, 250, 0.25)',
          padding: '14px 16px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#DDD6FE', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <SparklesIcon size={14} /> Unlock Exclusive Student Pricing
          </div>
          <p style={{ fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.45, margin: 0 }}>
            Verified college students get up to 20% off on scientific calculators, development boards, laptops, testing oscilloscopes, and lab gear.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Institution */}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#CBD5E1' }}>
              <Building size={14} color="#A78BFA" /> College / University / School Name *
            </label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. IIT Madras, BITS Pilani, Delhi University"
              value={institutionName}
              onChange={e => setInstitutionName(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF'
              }}
            />
          </div>

          {/* Student Email */}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#CBD5E1' }}>
              <Mail size={14} color="#A78BFA" /> Student Email (.edu / college domain)
            </label>
            <input
              type="email"
              className="form-input"
              placeholder="e.g. rahul@iitm.ac.in (or personal email)"
              value={studentEmail}
              onChange={e => setStudentEmail(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF'
              }}
            />
          </div>

          {/* Upload Student ID Photo */}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#CBD5E1' }}>
              <FileText size={14} color="#A78BFA" /> Student ID Card / Bonafide Certificate
            </label>

            {idCardPreview ? (
              <div style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                height: '140px',
                background: 'rgba(0,0,0,0.4)'
              }}>
                <img
                  src={idCardPreview}
                  alt="Student ID Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  onClick={() => setIdCardPreview('')}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(0,0,0,0.7)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  Change Photo
                </button>
              </div>
            ) : (
              <label style={{
                border: '2px dashed rgba(255, 255, 255, 0.18)',
                borderRadius: '12px',
                padding: '24px 16px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                background: 'rgba(255, 255, 255, 0.02)',
                transition: 'border-color 0.2s'
              }}>
                <Upload size={22} color="#A78BFA" />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>
                  Upload Student ID Card Photo
                </span>
                <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>
                  PNG, JPG or PDF under 5MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIdUpload}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
            <button
              type="button"
              onClick={() => closeModal('studentVerify')}
              className="btn btn-outline"
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#CBD5E1'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{
                flex: 1.5,
                background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                border: 'none',
                boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)'
              }}
            >
              <CheckCircle2 size={16} />
              <span>{isSubmitting ? 'Verifying...' : 'Submit & Verify Student'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SparklesIcon(props) {
  return (
    <svg width={props.size || 16} height={props.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  );
}
