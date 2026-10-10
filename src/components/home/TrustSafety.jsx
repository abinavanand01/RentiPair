import React from 'react';
import {
  ShieldCheck,
  UserCheck,
  ClipboardCheck,
  Star,
  Lock,
  Scale,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function TrustSafety() {
  const safetyPillars = [
    {
      icon: UserCheck,
      title: 'Verified Technicians',
      desc: 'Government photo identification, professional certifications, and technical track record are validated by our operations team before listing.',
      badge: 'Identity & Skill Screened',
      color: '#60A5FA',
      glowColor: 'rgba(59, 130, 246, 0.12)'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Users & KYC',
      desc: 'Both renters and equipment owners undergo identity verification to eliminate fraudulent profiles and ensure trusted, respectful community exchanges.',
      badge: 'Government ID Validated',
      color: '#A78BFA',
      glowColor: 'rgba(139, 92, 246, 0.12)'
    },
    {
      icon: ClipboardCheck,
      title: 'Equipment Condition Logs',
      desc: 'Pre-rental and post-rental photo checklists protect both parties against false damage claims. Clear conditions recorded before dispatch.',
      badge: 'Transparent Handover',
      color: '#22D3EE',
      glowColor: 'rgba(6, 182, 212, 0.12)'
    },
    {
      icon: Star,
      title: 'Authentic Verified Reviews',
      desc: 'Reviews can ONLY be submitted by users with completed rental or repair transactions. Zero fabricated reviews or fake ratings.',
      badge: '100% Transaction Linked',
      color: '#FBBF24',
      glowColor: 'rgba(245, 158, 11, 0.12)'
    },
    {
      icon: Lock,
      title: 'Secure Escrow Transactions',
      desc: 'Security deposits are safely locked in platform escrow and are automatically refunded upon equipment return inspection without delay.',
      badge: 'Bank-Grade Escrow',
      color: '#34D399',
      glowColor: 'rgba(16, 185, 129, 0.12)'
    },
    {
      icon: Scale,
      title: 'Dedicated Dispute Support',
      desc: 'Our dispute resolution team arbitrates any rental return or repair service discrepancy within 24 hours with dedicated mediation.',
      badge: 'Fair Arbitration Guarantee',
      color: '#FB923C',
      glowColor: 'rgba(249, 115, 22, 0.12)'
    }
  ];

  return (
    <section style={{
      padding: '80px 0',
      background: 'linear-gradient(180deg, #0A0F24 0%, #0C1128 50%, #050816 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.03) 40%, transparent 60%)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 44px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11.5px',
            fontWeight: 700,
            color: '#60A5FA',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.15)',
            padding: '4px 14px',
            borderRadius: '999px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '12px'
          }}>
            <ShieldCheck size={13} /> BUILT ON UNCOMPROMISING TRUST
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: 800, color: '#F8FAFC' }}>
            Trust & Safety at RentiPair
          </h2>
          <p style={{ fontSize: '15px', color: '#94A3B8', marginTop: '10px', lineHeight: 1.6 }}>
            RentiPair was engineered from the ground up to protect high-value electronic gear, personal data, and service standards.
          </p>
        </div>

        {/* Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px'
        }}>
          {safetyPillars.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '26px',
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                background: 'rgba(14, 19, 48, 0.5)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${item.color}25`;
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Ambient card glow */}
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                width: '80px',
                height: '80px',
                background: `radial-gradient(circle, ${item.glowColor} 0%, transparent 70%)`,
                filter: 'blur(25px)',
                pointerEvents: 'none'
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: `${item.color}12`,
                    border: `1px solid ${item.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color
                  }}>
                    <item.icon size={22} />
                  </div>

                  <span style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    color: '#34D399',
                    background: 'rgba(16, 185, 129, 0.1)',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    border: '1px solid rgba(16, 185, 129, 0.15)'
                  }}>
                    {item.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#F8FAFC', marginBottom: '8px' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>

              <div style={{
                marginTop: '18px',
                paddingTop: '14px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '11.5px',
                color: item.color,
                fontWeight: 600,
                position: 'relative',
                zIndex: 1
              }}>
                <CheckCircle2 size={12} />
                <span>RentiPair Platform Guarantee</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
