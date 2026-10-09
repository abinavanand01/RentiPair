import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Star,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Briefcase,
  Award,
  Clock,
  ArrowRight,
  ShieldAlert,
  Wrench,
  Lock
} from 'lucide-react';

export default function TechnicianProfileModal() {
  const { modalState, closeModal, openModal } = useApp();

  if (!modalState.techProfile?.open || !modalState.techProfile?.data) return null;

  const tech = modalState.techProfile.data;

  const handleRequestService = () => {
    closeModal('techProfile');
    openModal('repairRequest', {
      initialTech: tech,
      initialCategory: tech.categories[0]
    });
  };

  return (
    <div className="modal-overlay" onClick={() => closeModal('techProfile')}>
      <div
        className="modal-content extra-wide"
        onClick={e => e.stopPropagation()}
        style={{ padding: 0, overflow: 'hidden' }}
      >
        {/* Header Bar */}
        <div style={{
          padding: '18px 24px',
          background: 'linear-gradient(90deg, #0B132B 0%, #15234A 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: 'rgba(255, 107, 0, 0.25)',
              color: '#FF8A3D',
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}>
              Verified Technician Dossier
            </span>
            <span style={{ fontSize: '13px', color: '#94A3B8' }}>ID: {tech.id}</span>
          </div>

          <button onClick={() => closeModal('techProfile')} style={{ color: '#E2E8F0' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ maxHeight: 'calc(90vh - 70px)', overflowY: 'auto', padding: '24px' }}>
          {/* Top Profile Intro Card */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            paddingBottom: '24px',
            borderBottom: '1px solid #E2E8F0',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={tech.avatar}
                  alt={tech.name}
                  style={{ width: '84px', height: '84px', borderRadius: '20px', objectFit: 'cover', border: '3px solid #E2E8F0' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '-4px',
                  right: '-4px',
                  background: '#10B981',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #FFFFFF'
                }}>
                  <CheckCircle2 size={14} />
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {tech.name}
                  <span className="badge badge-green" style={{ fontSize: '11px' }}>
                    Active & Available
                  </span>
                </h2>
                <div style={{ fontSize: '14.5px', fontWeight: 600, color: '#475569', marginTop: '2px' }}>
                  {tech.title}
                </div>
                <div style={{ fontSize: '13px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <MapPin size={13} color="#94A3B8" /> {tech.serviceArea}
                </div>
              </div>
            </div>

            <button
              onClick={handleRequestService}
              className="btn btn-orange btn-lg"
            >
              <Wrench size={18} />
              <span>Request Service with {tech.name.split(' ')[0]}</span>
            </button>
          </div>

          {/* Tri-Pillar Trust Verification Badges Box */}
          <div style={{
            background: '#F0FDF4',
            border: '1.5px solid #BBF7D0',
            borderRadius: '16px',
            padding: '18px 22px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <ShieldCheck size={20} color="#059669" />
              <span style={{ fontWeight: 800, fontSize: '14.5px', color: '#065F46' }}>
                RentiPair Three-Tier Verification Guarantee
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px'
            }}>
              <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '10px', border: '1px solid #DCFCE7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 700, fontSize: '13px' }}>
                  <CheckCircle2 size={16} /> Identity Verified
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                  Government Photo ID (Masked: {tech.verificationDocMasked ? tech.verificationDocMasked.split('|')[0] : '****-9204'})
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '10px', border: '1px solid #DCFCE7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 700, fontSize: '13px' }}>
                  <CheckCircle2 size={16} /> Skill / Cert Verified
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                  Technical credential tested & verified by operations panel
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '10px', border: '1px solid #DCFCE7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 700, fontSize: '13px' }}>
                  <CheckCircle2 size={16} /> Experience Verified
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                  {tech.yearsExperience} years professional service track record
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              color: '#047857',
              marginTop: '10px'
            }}>
              <Lock size={12} />
              <span>Full identity documents are stored in secure AES-256 encrypted vaults and are never exposed publicly.</span>
            </div>
          </div>

          {/* Grid: Bio & Pricing vs Portfolio & Reviews */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px'
          }} className="tech-profile-grid">
            {/* Left Col: Bio, Certifications, Pricing */}
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                  Professional Bio
                </h4>
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6 }}>
                  {tech.bio}
                </p>
              </div>

              {/* Certifications */}
              {tech.certifications && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                    Accreditations & Certifications
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {tech.certifications.map((cert, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          background: '#F8FAFC',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid #E2E8F0',
                          fontSize: '13px',
                          color: '#334155'
                        }}
                      >
                        <Award size={16} color="var(--color-primary)" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing Information Table */}
              {tech.pricing && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                    Standard Diagnostic & Service Pricing
                  </h4>
                  <div style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    overflow: 'hidden'
                  }}>
                    {tech.pricing.map((p, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          fontSize: '13px',
                          borderBottom: idx === tech.pricing.length - 1 ? 'none' : '1px solid #F1F5F9'
                        }}
                      >
                        <span style={{ color: '#475569' }}>{p.service}</span>
                        <span style={{ fontWeight: 700, color: '#0F172A' }}>{p.price}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '6px' }}>
                    * Transparent quote provided after initial physical examination before any replacement part is purchased.
                  </div>
                </div>
              )}
            </div>

            {/* Right Col: Portfolio Showcase & Customer Reviews */}
            <div>
              {/* Portfolio */}
              {tech.portfolio && tech.portfolio.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                    Past Repair Portfolio
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {tech.portfolio.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          gap: '12px',
                          padding: '12px',
                          borderRadius: '12px',
                          background: '#F8FAFC',
                          border: '1px solid #E2E8F0'
                        }}
                      >
                        <img
                          src={item.beforeAfterImg}
                          alt={item.title}
                          style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>{item.title}</div>
                          <div style={{ fontSize: '11px', color: 'var(--color-orange-dark)', fontWeight: 600 }}>Device: {item.device}</div>
                          <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Customer Reviews */}
              {tech.reviews && (
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '10px' }}>
                    Customer Reviews ({tech.reviews.length})
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {tech.reviews.map(rev => (
                      <div
                        key={rev.id}
                        style={{
                          padding: '12px',
                          background: '#FFFFFF',
                          borderRadius: '10px',
                          border: '1px solid #E2E8F0'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 700, fontSize: '13px', color: '#0F172A' }}>{rev.author}</span>
                          <span style={{ fontSize: '12px', color: '#B45309', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                            <Star size={12} fill="#F59E0B" color="#F59E0B" /> {rev.rating}.0
                          </span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#059669', marginBottom: '6px' }}>
                          ✓ Verified Transaction • {rev.date}
                        </div>
                        <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.4, margin: 0 }}>
                          "{rev.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <style>{`
            @media (max-width: 800px) {
              .tech-profile-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
