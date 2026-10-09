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

  const approvedTechs = technicians.filter(t => t.status === 'Approved').slice(0, 4);

  return (
    <section style={{ padding: '64px 0', background: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '20px',
          marginBottom: '28px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11.5px',
              fontWeight: 700,
              color: '#FF7A00',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '6px'
            }}>
              <Sparkles size={13} /> CERTIFIED REPAIR EXPERTS
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 32px)', fontWeight: 800, color: '#0B1533' }}>
              Verified Technicians Near You
            </h2>
            <p style={{ fontSize: '14.5px', color: '#64748B', marginTop: '4px' }}>
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

        {/* Technician Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {approvedTechs.map(tech => (
            <div
              key={tech.id}
              className="card"
              style={{
                padding: '20px',
                borderRadius: '16px',
                background: '#FFFFFF',
                border: '1.5px solid #F1F5F9',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <div>
                {/* Profile Header */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={tech.avatar}
                      alt={tech.name}
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        objectFit: 'cover',
                        border: '2px solid #E2E8F0'
                      }}
                    />
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
                      border: '2px solid #FFFFFF'
                    }}>
                      <CheckCircle2 size={11} />
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0B1533' }}>
                      {tech.name}
                    </h3>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#059669',
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

                {/* Subtitle / Specialization */}
                <p style={{
                  fontSize: '12.5px',
                  color: '#334155',
                  fontWeight: 600,
                  marginBottom: '12px',
                  lineHeight: 1.4,
                  minHeight: '34px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {tech.title}
                </p>

                {/* Metrics Pill Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '4px',
                  background: '#F8FAFC',
                  padding: '8px',
                  borderRadius: '10px',
                  marginBottom: '14px',
                  textAlign: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                      <Star size={11} fill="#F59E0B" color="#F59E0B" /> {tech.rating}
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748B' }}>{tech.reviewsCount} reviews</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0B1533' }}>
                      {tech.jobsCompleted}+
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748B' }}>Jobs Done</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#1677FF' }}>
                      {tech.yearsExperience} yrs
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748B' }}>Experience</div>
                  </div>
                </div>

                {/* Services Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
                  {tech.categories.slice(0, 2).map((c, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '10.5px',
                        background: '#FFF5EB',
                        color: '#E66A00',
                        padding: '2px 7px',
                        borderRadius: '6px',
                        fontWeight: 600
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingTop: '12px',
                borderTop: '1px solid #F1F5F9'
              }}>
                <button
                  onClick={() => openModal('techProfile', tech)}
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1 }}
                >
                  View Profile
                </button>
                <button
                  onClick={() => openModal('repairRequest', { initialTech: tech, initialCategory: tech.categories[0] })}
                  className="btn btn-orange btn-sm"
                  style={{ flex: 1 }}
                >
                  Request Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
