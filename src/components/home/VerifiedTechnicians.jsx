import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Star,
  CheckCircle2,
  Wrench,
  MapPin,
  Briefcase,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function VerifiedTechnicians() {
  const { technicians, openModal, navigateTo } = useApp();

  const approvedTechs = technicians.filter(t => t.status === 'Approved' || t.verification_status === 'VERIFIED').slice(0, 4);

  return (
    <section style={{
      padding: '80px 0',
      background: 'linear-gradient(180deg, #0C1128 0%, #050816 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '20%',
        width: '500px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.06) 0%, transparent 60%)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11.5px',
              fontWeight: 700,
              color: '#FB923C',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '8px'
            }}>
              <Sparkles size={13} /> CERTIFIED REPAIR EXPERTS
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 34px)', fontWeight: 800, color: '#F8FAFC' }}>
              Verified Technicians Near You
            </h2>
            <p style={{ fontSize: '14.5px', color: '#94A3B8', marginTop: '6px' }}>
              Identity-checked, background-screened, and skill-certified engineers for gadgets, PCs, and lab gear.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => navigateTo('repairs')}
              className="btn btn-outline"
              style={{ fontSize: '13px', height: '38px' }}
            >
              <span>Explore All Technicians</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => openModal('becomeTechnician')}
              className="btn btn-orange"
              style={{ fontSize: '13px', height: '38px' }}
            >
              <Wrench size={14} />
              <span>Join as Technician</span>
            </button>
          </div>
        </div>

        {/* Cards or Empty State */}
        {approvedTechs.length === 0 ? (
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
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔧</div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#F8FAFC', marginBottom: '8px' }}>
              No verified technicians yet.
            </h3>
            <p style={{ fontSize: '14.5px', color: '#94A3B8', lineHeight: 1.5, marginBottom: '24px' }}>
              Become one of the first professionals on RentiPair.
            </p>
            <button
              onClick={() => openModal('becomeTechnician')}
              className="btn btn-orange"
              style={{ padding: '12px 28px', fontSize: '14.5px', fontWeight: 700 }}
            >
              Become a Technician
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {approvedTechs.map(tech => (
              <div
                key={tech.id}
                style={{
                  padding: '22px',
                  borderRadius: '18px',
                  background: 'rgba(14, 19, 48, 0.5)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 48px -8px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  {/* Profile Header */}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ position: 'relative' }}>
                      {tech.avatar ? (
                        <img
                          src={tech.avatar}
                          alt={tech.name}
                          style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '14px',
                            objectFit: 'cover',
                            border: '2px solid rgba(255, 255, 255, 0.1)'
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '14px',
                          background: 'linear-gradient(135deg, #F97316, #EA580C)',
                          color: '#FFFFFF',
                          fontWeight: 800,
                          fontSize: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {tech.name ? tech.name.charAt(0).toUpperCase() : 'T'}
                        </div>
                      )}
                      <div style={{
                        position: 'absolute',
                        bottom: '-3px',
                        right: '-3px',
                        background: '#10B981',
                        color: '#FFFFFF',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #0E1330'
                      }}>
                        <CheckCircle2 size={11} />
                      </div>
                    </div>

                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#F8FAFC' }}>
                        {tech.name}
                      </h3>
                      <div style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#34D399',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        marginTop: '2px'
                      }}>
                        <ShieldCheck size={12} /> Verified Tech
                      </div>
                      <div style={{
                        fontSize: '11.5px',
                        color: '#64748B',
                        marginTop: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px'
                      }}>
                        <MapPin size={11} /> {tech.city}
                      </div>
                    </div>
                  </div>

                  {/* Specialization */}
                  <p style={{
                    fontSize: '12.5px',
                    color: '#CBD5E1',
                    fontWeight: 600,
                    marginBottom: '14px',
                    lineHeight: 1.4,
                    minHeight: '34px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {tech.title}
                  </p>

                  {/* Metrics */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '4px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '10px',
                    borderRadius: '12px',
                    marginBottom: '14px',
                    textAlign: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.04)'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: 800,
                        color: '#FBBF24',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2px'
                      }}>
                        <Star size={11} fill="#FBBF24" color="#FBBF24" /> {tech.rating || 0}
                      </div>
                      <div style={{ fontSize: '10px', color: '#64748B' }}>{tech.reviewsCount || 0} reviews</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#F8FAFC' }}>
                        {tech.jobsCompleted || 0}
                      </div>
                      <div style={{ fontSize: '10px', color: '#64748B' }}>Jobs Done</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#60A5FA' }}>
                        {tech.yearsExperience || 0} yrs
                      </div>
                      <div style={{ fontSize: '10px', color: '#64748B' }}>Experience</div>
                    </div>
                  </div>

                  {/* Service Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
                    {Array.isArray(tech.categories) && tech.categories.slice(0, 2).map((c, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '10.5px',
                          background: 'rgba(249, 115, 22, 0.1)',
                          color: '#FB923C',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontWeight: 600,
                          border: '1px solid rgba(249, 115, 22, 0.15)'
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  paddingTop: '14px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <button
                    onClick={() => openModal('techProfile', tech)}
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1 }}
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => openModal('repairRequest', { initialTech: tech, initialCategory: tech.categories?.[0] })}
                    className="btn btn-orange btn-sm"
                    style={{ flex: 1 }}
                  >
                    Request Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
