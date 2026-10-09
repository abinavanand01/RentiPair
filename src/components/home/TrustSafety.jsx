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
      badge: 'Identity & Skill Screened'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Users & KYC',
      desc: 'Both renters and equipment owners undergo identity verification to eliminate fraudulent profiles and ensure trusted, respectful community exchanges.',
      badge: 'Government ID Validated'
    },
    {
      icon: ClipboardCheck,
      title: 'Equipment Condition Logs',
      desc: 'Pre-rental and post-rental photo checklists protect both parties against false damage claims. Clear conditions recorded before dispatch.',
      badge: 'Transparent Handover'
    },
    {
      icon: Star,
      title: 'Authentic Verified Reviews',
      desc: 'Reviews can ONLY be submitted by users with completed rental or repair transactions. Zero fabricated reviews or fake ratings.',
      badge: '100% Transaction Linked'
    },
    {
      icon: Lock,
      title: 'Secure Escrow Transactions',
      desc: 'Security deposits are safely locked in platform escrow and are automatically refunded upon equipment return inspection without delay.',
      badge: 'Bank-Grade Escrow'
    },
    {
      icon: Scale,
      title: 'Dedicated Dispute Support',
      desc: 'Our dispute resolution team arbitrates any rental return or repair service discrepancy within 24 hours with dedicated mediation.',
      badge: 'Fair Arbitration Guarantee'
    }
  ];

  return (
    <section className="section-navy" style={{ padding: '64px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11.5px',
            fontWeight: 700,
            color: '#60A5FA',
            background: 'rgba(22, 119, 255, 0.18)',
            border: '1px solid rgba(96, 165, 250, 0.3)',
            padding: '3px 12px',
            borderRadius: '999px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '10px'
          }}>
            <ShieldCheck size={13} /> BUILT ON UNCOMPROMISING TRUST
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 34px)', fontWeight: 800, color: '#FFFFFF' }}>
            Trust & Safety at RentiPair
          </h2>
          <p style={{ fontSize: '15px', color: '#94A3B8', marginTop: '8px', lineHeight: 1.55 }}>
            RentiPair was engineered from the ground up to protect high-value electronic gear, personal data, and service standards.
          </p>
        </div>

        {/* Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {safetyPillars.map((item, idx) => (
            <div
              key={idx}
              className="glass-navy"
              style={{
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'rgba(22, 119, 255, 0.2)',
                    border: '1px solid rgba(96, 165, 250, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#60A5FA'
                  }}>
                    <item.icon size={22} />
                  </div>

                  <span style={{
                    fontSize: '10.5px',
                    fontWeight: 700,
                    color: '#34D399',
                    background: 'rgba(16, 185, 129, 0.15)',
                    padding: '3px 9px',
                    borderRadius: '999px',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    {item.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '16.5px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>

              <div style={{
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '11.5px',
                color: '#60A5FA',
                fontWeight: 600
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
