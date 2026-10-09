import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Mail, Lock, Phone, MapPin, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  const { signup, navigateTo } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Chennai');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !email.trim() || !password) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    const res = await signup({
      fullName: fullName.trim(),
      email: email.trim(),
      password,
      phone: phone.trim(),
      city: city.trim()
    });
    setLoading(false);

    if (!res.success && res.error) {
      setErrorMsg(res.error.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 76px)',
      background: 'linear-gradient(135deg, #0B1533 0%, #0F1D46 50%, #080F26 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative'
    }}>
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(22, 119, 255, 0.15) 0%, transparent 70%)',
        top: '-100px',
        right: '-100px',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%',
        maxWidth: '560px',
        background: '#FFFFFF',
        borderRadius: '24px',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
        padding: '40px',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#EEF4FF',
            padding: '4px 12px',
            borderRadius: '999px',
            color: '#1677FF',
            fontSize: '12px',
            fontWeight: 700,
            marginBottom: '12px'
          }}>
            <span>✨ Join the Verified Community</span>
          </div>

          <h1 style={{
            fontSize: '28px',
            fontWeight: 800,
            color: '#0B1533',
            letterSpacing: '-0.02em',
            marginBottom: '6px'
          }}>
            Create your RentiPair account
          </h1>
          <p style={{ fontSize: '14px', color: '#64748B' }}>
            Get instant access to equipment rentals and certified repair technicians.
          </p>
        </div>

        {errorMsg && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '10px',
            padding: '12px 14px',
            color: '#B91C1C',
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Full Name */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Full Name <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <User size={17} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input"
                style={{
                  paddingLeft: '40px',
                  height: '44px',
                  borderRadius: '10px',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Email Address <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={17} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
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
                  border: '1.5px solid #E2E8F0',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Password & Confirm Password (2 Columns) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Password <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={17} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  required
                  placeholder="Min 6 chars"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{
                    paddingLeft: '40px',
                    height: '44px',
                    borderRadius: '10px',
                    border: '1.5px solid #E2E8F0',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Confirm Password <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={17} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  required
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  style={{
                    paddingLeft: '40px',
                    height: '44px',
                    borderRadius: '10px',
                    border: '1.5px solid #E2E8F0',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Optional Phone & City (2 Columns) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Phone Number <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 400 }}>(Optional)</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={17} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="tel"
                  placeholder="+91 98400 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                  style={{
                    paddingLeft: '40px',
                    height: '44px',
                    borderRadius: '10px',
                    border: '1.5px solid #E2E8F0',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                City / Location
              </label>
              <div style={{ position: 'relative' }}>
                <MapPin size={17} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="form-input"
                  style={{
                    paddingLeft: '40px',
                    height: '44px',
                    borderRadius: '10px',
                    border: '1.5px solid #E2E8F0',
                    fontSize: '14px'
                  }}
                >
                  <option value="Chennai">Chennai</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
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
              marginTop: '8px',
              justifyContent: 'center',
              background: '#1677FF'
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        {/* Footer Link */}
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13.5px', color: '#64748B' }}>
          Already have an account?{' '}
          <button
            onClick={() => navigateTo('login')}
            style={{
              background: 'none',
              border: 'none',
              color: '#1677FF',
              fontWeight: 700,
              cursor: 'pointer',
              padding: 0
            }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
