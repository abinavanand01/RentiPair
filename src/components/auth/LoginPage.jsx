import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Wrench, Box } from 'lucide-react';

export default function LoginPage() {
  const { login, navigateTo, openModal, showToast, intendedDestination } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (!res.success && res.error) {
      setErrorMsg(res.error.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleGoogleLogin = () => {
    showToast('Redirecting to Google OAuth authentication...', 'info');
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 76px)',
      background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 130, 246, 0.15) 0%, #050816 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glow Accents */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
        top: '-100px',
        left: '-100px',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%)',
        bottom: '-100px',
        right: '-50px',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }} />

      {/* Main Split Authentication Card */}
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        background: 'rgba(14, 19, 48, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6)',
        display: 'grid',
        gridTemplateColumns: '1.05fr 1fr',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10
      }} className="login-split-card">

        {/* LEFT COLUMN: RentiPair Brand & Value Proposition */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(10, 15, 36, 0.95) 0%, rgba(14, 19, 48, 0.85) 100%)',
          padding: '48px 40px',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            {/* Logo & Brand Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#0E1330',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.3)'
              }}>
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                  <path d="M14 24 C14 18, 20 14, 24 18 C28 22, 34 26, 34 20 C34 16, 30 14, 28 14" stroke="#3B82F6" strokeWidth="4.2" strokeLinecap="round" />
                  <path d="M34 24 C34 30, 28 34, 24 30 C20 26, 14 22, 14 28 C14 32, 18 34, 20 34" stroke="#F97316" strokeWidth="4.2" strokeLinecap="round" />
                  <circle cx="24" cy="24" r="3" fill="#FFFFFF" />
                </svg>
              </div>

              <div>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '22px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em'
                }}>
                  Renti<span style={{ color: '#3B82F6' }}>Pair</span>
                </span>
                <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>
                  Rent it. Repair it. RentiPair it.
                </div>
              </div>
            </div>

            {/* Platform Tagline */}
            <h2 style={{
              fontSize: '24px',
              fontWeight: 800,
              lineHeight: 1.3,
              marginBottom: '14px',
              color: '#FFFFFF'
            }}>
              Your complete equipment rental and repair hub.
            </h2>
            <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '28px' }}>
              Access premium hardware on demand, or connect with verified electronics technicians for certified repairs.
            </p>

            {/* Feature Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(59, 130, 246, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Box size={17} color="#60A5FA" />
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#F1F5F9' }}>Verified Tech & Camera Gear</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>Every item serial number tracked with escrow deposit security.</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(249, 115, 22, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Wrench size={17} color="#FB923C" />
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#F1F5F9' }}>Triple-Verified Technicians</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>Background-checked, certified micro-soldering and diagnostics specialists.</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <ShieldCheck size={17} color="#34D399" />
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#F1F5F9' }}>Dynamic Multi-Capability Account</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>Rent gear, list your equipment, or offer technician services with a single login.</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '36px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            fontSize: '11.5px',
            color: '#64748B'
          }}>
            Protected by Supabase Auth &amp; Enterprise Row-Level Security
          </div>
        </div>

        {/* RIGHT COLUMN: Login Form */}
        <div style={{
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'rgba(10, 15, 36, 0.95)'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{
              fontSize: '26px',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              marginBottom: '6px'
            }}>
              Welcome Back
            </h1>
            <p style={{ fontSize: '14px', color: '#94A3B8' }}>
              Log in to manage your rentals, repair requests, and listings.
            </p>
          </div>

          {/* Intended Destination Context Banner */}
          {intendedDestination && (
            <div style={{
              background: 'rgba(59, 130, 246, 0.12)',
              border: '1.5px solid rgba(59, 130, 246, 0.4)',
              borderRadius: '12px',
              padding: '12px 14px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <AlertCircle size={20} color="#60A5FA" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '13px', color: '#BFDBFE', lineHeight: 1.4 }}>
                {intendedDestination.modal === 'listEquipment' && (
                  <span><strong>Action Required:</strong> Please log in to list your equipment. Your listing form will open immediately after login.</span>
                )}
                {intendedDestination.modal === 'becomeTechnician' && (
                  <span><strong>Action Required:</strong> Please log in to apply as a verified technician. Your application form will open immediately after login.</span>
                )}
                {intendedDestination.view && (
                  <span><strong>Action Required:</strong> Please log in to access your account dashboard and manage your marketplace activity.</span>
                )}
              </div>
            </div>
          )}

          {/* Quick Admin Access */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '12px',
            padding: '12px 14px',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#F87171', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
              🛡️ Admin Verification & Management Access
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@rentipair.in');
                  setPassword('admin123');
                }}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#FCA5A5',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>🛡️ Platform Admin</span>
                <span style={{ fontSize: '10px', opacity: 0.8 }}>(Review & Approvals)</span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '10px',
              padding: '12px 14px',
              color: '#F87171',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Email Field */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#E2E8F0', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={17} color="#64748B" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  style={{
                    paddingLeft: '40px',
                    height: '44px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    background: 'rgba(14, 19, 48, 0.8)',
                    color: '#FFFFFF',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, color: '#E2E8F0' }}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => openModal('forgotPassword')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#60A5FA',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Forgot Password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={17} color="#64748B" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{
                    paddingLeft: '40px',
                    height: '44px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    background: 'rgba(14, 19, 48, 0.8)',
                    color: '#FFFFFF',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                height: '46px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 700,
                marginTop: '4px',
                justifyContent: 'center',
                boxShadow: '0 0 25px rgba(59, 130, 246, 0.35)'
              }}
            >
              {loading ? 'Authenticating...' : 'Log In'}
              {!loading && <ArrowRight size={16} />}
            </button>

            {/* Google OAuth Option */}
            <div style={{ position: 'relative', textAlign: 'center', margin: '8px 0' }}>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
              <span style={{ position: 'relative', background: 'rgba(10, 15, 36, 0.95)', padding: '0 12px', fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
                OR
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              style={{
                width: '100%',
                height: '44px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                background: 'rgba(255, 255, 255, 0.04)',
                color: '#E2E8F0',
                fontSize: '13.5px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </form>

          {/* Bottom Switch to Signup */}
          <div style={{ marginTop: '28px', textAlign: 'center', fontSize: '13.5px', color: '#94A3B8' }}>
            Don't have an account?{' '}
            <button
              onClick={() => navigateTo('signup')}
              style={{
                background: 'none',
                border: 'none',
                color: '#60A5FA',
                fontWeight: 700,
                cursor: 'pointer',
                padding: 0
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .login-split-card {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
