import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import EquipmentImage from '../common/EquipmentImage';
import {
  ShieldAlert,
  Users,
  Wrench,
  Layers,
  Box,
  FileCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  CreditCard,
  DollarSign,
  TrendingUp,
  Sliders,
  Filter,
  Check,
  Ban,
  FileText
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    equipment,
    technicians,
    rentals,
    repairs,
    updateEquipmentStatus,
    updateTechnicianStatus,
    showToast,
    currentUser
  } = useApp();

  const [activeSection, setActiveSection] = useState('verification'); // 'verification', 'equipment', 'technicians', 'disputes', 'users'

  // Real users from storage or currentUser
  const [usersList, setUsersList] = useState(() => {
    try {
      const stored = localStorage.getItem('rentipair_sb_users');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const realUsers = parsed.filter(u =>
            !u.email?.includes('demo') &&
            u.email !== 'aditya.n@rentipair.in' &&
            u.email !== 'rajesh.k@rentipair.in'
          );
          if (realUsers.length > 0) {
            return realUsers.map(u => ({
              id: u.id,
              name: u.user_metadata?.full_name || u.email?.split('@')[0] || 'User',
              email: u.email,
              role: u.email?.includes('admin') ? 'Admin' : 'User',
              status: 'Active',
              kyc: 'Verified'
            }));
          }
        }
      }
    } catch {
      // ignore
    }
    return currentUser ? [{
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.isAdmin ? 'Admin' : 'User',
      status: 'Active',
      kyc: 'Verified'
    }] : [];
  });

  const [disputesList, setDisputesList] = useState([]);

  // Admin metrics derived 100% dynamically from real database collections
  const totalUsersCount = usersList.length;
  const verifiedTechsCount = technicians.filter(t => t.status === 'Approved').length;
  const totalEquipmentCount = equipment.length;
  const pendingEquipmentCount = equipment.filter(e => e.status === 'Pending').length;
  const pendingTechCount = technicians.filter(t => t.status === 'Pending').length;
  const activeRentalsCount = rentals.filter(r => r.status === 'Active').length;
  const repairRequestsCount = repairs.length;
  const completedServicesCount = rentals.filter(r => r.status === 'Completed').length + repairs.filter(r => r.status === 'Completed').length;
  const totalRevenue = '₹' + rentals.filter(r => r.status === 'Completed').reduce((sum, r) => sum + (r.totalAmount || 0), 0).toLocaleString('en-IN');

  const handleSuspendUser = (userId) => {
    setUsersList(prev =>
      prev.map(u => u.id === userId ? { ...u, status: u.status === 'Suspended' ? 'Active' : 'Suspended' } : u)
    );
    showToast(`User status updated`, 'info');
  };

  const handleResolveDispute = (dispId, action) => {
    setDisputesList(prev => prev.filter(d => d.id !== dispId));
    showToast(`Dispute ${dispId} resolved: ${action}`, 'success');
  };

  return (
    <div style={{ background: '#050816', minHeight: 'calc(100vh - 76px)', padding: '28px 0 80px', position: 'relative' }}>
      {/* Ambient background glows */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '20%',
        width: '500px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Admin Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(14, 19, 48, 0.85) 0%, rgba(10, 15, 36, 0.95) 100%)',
          backdropFilter: 'blur(16px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '20px 24px',
          color: '#FFFFFF',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#F87171',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '10.5px',
                fontWeight: 800,
                textTransform: 'uppercase'
              }}>
                ADMIN CONSOLE
              </span>
              <span style={{ fontSize: '12.5px', color: '#94A3B8' }}>Secure Moderation & Operations Panel</span>
            </div>
            <h1 style={{ fontSize: '21px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
              RentiPair Platform Administration
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: 'rgba(239, 68, 68, 0.15)',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '12.5px',
              color: '#FCA5A5',
              border: '1px solid rgba(239, 68, 68, 0.4)'
            }}>
              🚨 Pending Verifications: <strong>{pendingTechCount + pendingEquipmentCount}</strong>
            </span>
          </div>
        </div>

        {/* 8 Primary Dashboard Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
          marginBottom: '28px'
        }}>
          <div style={{ background: 'rgba(14, 19, 48, 0.75)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '11.5px', color: '#94A3B8', fontWeight: 600 }}>Total Users</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>{totalUsersCount}</div>
          </div>

          <div style={{ background: 'rgba(14, 19, 48, 0.75)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '11.5px', color: '#94A3B8', fontWeight: 600 }}>Verified Techs</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#60A5FA' }}>{verifiedTechsCount}</div>
          </div>

          <div style={{ background: 'rgba(14, 19, 48, 0.75)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '11.5px', color: '#94A3B8', fontWeight: 600 }}>Equipment Listings</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>{totalEquipmentCount}</div>
          </div>

          <div style={{ background: 'rgba(14, 19, 48, 0.75)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '11.5px', color: '#94A3B8', fontWeight: 600 }}>Active Rentals</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#34D399' }}>{activeRentalsCount}</div>
          </div>

          <div style={{ background: 'rgba(14, 19, 48, 0.75)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '11.5px', color: '#94A3B8', fontWeight: 600 }}>Repair Requests</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#FB923C' }}>{repairRequestsCount}</div>
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.12)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <div style={{ fontSize: '11.5px', color: '#FCD34D', fontWeight: 700 }}>Pending Review</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#F59E0B' }}>{pendingTechCount + pendingEquipmentCount}</div>
          </div>

          <div style={{ background: 'rgba(14, 19, 48, 0.75)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '11.5px', color: '#94A3B8', fontWeight: 600 }}>Completed Services</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF' }}>{completedServicesCount}</div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.12)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ fontSize: '11.5px', color: '#6EE7B7', fontWeight: 700 }}>Revenue</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#10B981' }}>{totalRevenue}</div>
          </div>
        </div>

        {/* Admin Navigation Pills */}
        <div style={{
          display: 'flex',
          gap: '8px',
          background: 'rgba(14, 19, 48, 0.75)',
          backdropFilter: 'blur(16px)',
          padding: '8px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'verification', label: `Pending Verifications (${pendingTechCount + pendingEquipmentCount})` },
            { id: 'technicians', label: `Technicians Manager (${technicians.length})` },
            { id: 'equipment', label: `Equipment Catalog (${equipment.length})` },
            { id: 'disputes', label: `Disputes & Complaints (${disputesList.length})` },
            { id: 'users', label: 'User Directory & Access' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                background: activeSection === tab.id ? '#3B82F6' : 'transparent',
                color: activeSection === tab.id ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SECTION: PENDING VERIFICATIONS */}
        {activeSection === 'verification' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Pending Technicians */}
            <div style={{ background: 'rgba(14, 19, 48, 0.85)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px' }}>
                Technician Applications Awaiting Verification ({pendingTechCount})
              </h3>

              {pendingTechCount === 0 ? (
                <div style={{ color: '#34D399', fontSize: '13px', fontWeight: 600 }}>
                  ✓ All technician verification queues are up to date!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {technicians.filter(t => t.status === 'Pending').map(t => (
                    <div
                      key={t.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(249, 115, 22, 0.3)',
                        background: 'rgba(249, 115, 22, 0.06)',
                        flexWrap: 'wrap',
                        gap: '12px'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '15px', color: '#FFFFFF' }}>{t.name}</div>
                        <div style={{ fontSize: '12.5px', color: '#94A3B8' }}>
                          Specialty: {t.title} • {t.yearsExperience} yrs exp • {t.city}
                        </div>
                        <div style={{ fontSize: '12px', color: '#34D399', marginTop: '4px' }}>
                          Secure Docs: <code style={{ color: '#6EE7B7' }}>{t.verificationDocMasked || 'Govt ID Masked: ****-****-7102'}</code>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => updateTechnicianStatus(t.id, 'Approved')}
                          className="btn btn-primary btn-sm"
                        >
                          <Check size={14} /> Approve & Grant Verified Badge
                        </button>
                        <button
                          onClick={() => updateTechnicianStatus(t.id, 'Rejected')}
                          className="btn btn-outline btn-sm"
                          style={{ color: '#F87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                        >
                          <XCircle size={14} /> Reject Application
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pending Equipment Listings */}
            <div style={{ background: 'rgba(14, 19, 48, 0.85)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px' }}>
                Equipment Listings Awaiting Moderation ({pendingEquipmentCount})
              </h3>

              {pendingEquipmentCount === 0 ? (
                <div style={{ color: '#34D399', fontSize: '13px', fontWeight: 600 }}>
                  ✓ All equipment listings reviewed and active!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {equipment.filter(e => e.status === 'Pending').map(item => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        background: 'rgba(255, 255, 255, 0.03)',
                        flexWrap: 'wrap',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '54px', height: '54px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: 'rgba(255, 255, 255, 0.06)' }}>
                          <EquipmentImage item={item} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '14.5px', color: '#FFFFFF' }}>{item.title}</div>
                          <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                            {item.category} • ₹{item.dailyRate}/day • Deposit: ₹{item.securityDeposit}
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#64748B' }}>
                            Owner: {item.owner?.name || 'Verified Owner'} ({item.city || 'Chennai'})
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => updateEquipmentStatus(item.id, 'Approved')}
                          className="btn btn-primary btn-sm"
                        >
                          <Check size={14} /> Approve & Publish
                        </button>
                        <button
                          onClick={() => updateEquipmentStatus(item.id, 'Rejected')}
                          className="btn btn-outline btn-sm"
                          style={{ color: '#F87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION: TECHNICIANS MANAGER */}
        {activeSection === 'technicians' && (
          <div style={{ background: 'rgba(14, 19, 48, 0.85)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
              All Verified Technicians on Platform
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {technicians.map(t => (
                <div
                  key={t.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={t.avatar} alt="" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#FFFFFF' }}>{t.name}</div>
                      <div style={{ fontSize: '12px', color: '#94A3B8' }}>{t.title} • {t.city}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      fontSize: '11.5px',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '999px',
                      background: t.status === 'Approved' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: t.status === 'Approved' ? '#34D399' : '#FBBF24',
                      border: t.status === 'Approved' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)'
                    }}>
                      {t.status}
                    </span>

                    {t.status === 'Approved' ? (
                      <button
                        onClick={() => updateTechnicianStatus(t.id, 'Pending')}
                        className="btn btn-outline btn-sm"
                        style={{ fontSize: '11.5px' }}
                      >
                        Revoke Badge
                      </button>
                    ) : (
                      <button
                        onClick={() => updateTechnicianStatus(t.id, 'Approved')}
                        className="btn btn-primary btn-sm"
                        style={{ fontSize: '11.5px' }}
                      >
                        Re-Verify
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: EQUIPMENT CATALOG */}
        {activeSection === 'equipment' && (
          <div style={{ background: 'rgba(14, 19, 48, 0.85)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
              Full Equipment Catalog Moderation
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {equipment.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, background: 'rgba(255, 255, 255, 0.06)' }}>
                      <EquipmentImage item={item} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#FFFFFF' }}>{item.title}</div>
                      <div style={{ fontSize: '11.5px', color: '#94A3B8' }}>₹{item.dailyRate}/day • {item.location}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={item.status === 'Approved' ? 'badge badge-green' : 'badge badge-orange'}>
                      {item.status}
                    </span>

                    {item.status === 'Approved' ? (
                      <button
                        onClick={() => updateEquipmentStatus(item.id, 'Rejected')}
                        className="btn btn-ghost btn-sm"
                        style={{ color: '#F87171', fontSize: '11.5px' }}
                      >
                        Delist Item
                      </button>
                    ) : (
                      <button
                        onClick={() => updateEquipmentStatus(item.id, 'Approved')}
                        className="btn btn-primary btn-sm"
                        style={{ fontSize: '11.5px' }}
                      >
                        Approve
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION: DISPUTES & COMPLAINTS */}
        {activeSection === 'disputes' && (
          <div style={{ background: 'rgba(14, 19, 48, 0.85)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
              Dispute Resolution & Escrow Mediation Tickets
            </h3>

            {disputesList.length === 0 ? (
              <div style={{ color: '#34D399', fontSize: '13px' }}>✓ Zero open disputes currently.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {disputesList.map(disp => (
                  <div
                    key={disp.id}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      background: 'rgba(239, 68, 68, 0.08)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 800, color: '#FCA5A5' }}>Ticket {disp.id} • Order {disp.rentalId}</span>
                      <span style={{ fontWeight: 700, color: '#F87171' }}>{disp.claimAmount}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#E2E8F0', marginBottom: '12px' }}>
                      <strong>Claim:</strong> {disp.reason} (Reported by {disp.reportedBy})
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleResolveDispute(disp.id, 'Full deposit refunded to renter')}
                        className="btn btn-outline btn-sm"
                      >
                        Dismiss Claim (Full Refund to Renter)
                      </button>
                      <button
                        onClick={() => handleResolveDispute(disp.id, 'Partial cleaning fee awarded to owner')}
                        className="btn btn-primary btn-sm"
                      >
                        Award Claim to Owner
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION: USERS DIRECTORY */}
        {activeSection === 'users' && (
          <div style={{ background: 'rgba(14, 19, 48, 0.85)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
              User Moderation & Account Suspension Control
            </h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#94A3B8', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px' }}>User</th>
                  <th style={{ padding: '10px 12px' }}>Role</th>
                  <th style={{ padding: '10px 12px' }}>KYC Status</th>
                  <th style={{ padding: '10px 12px' }}>Account State</th>
                  <th style={{ padding: '10px 12px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{u.name}</div>
                      <div style={{ fontSize: '11px', color: '#94A3B8' }}>{u.email}</div>
                    </td>
                    <td style={{ padding: '10px 12px', color: '#E2E8F0' }}>{u.role}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span className={u.kyc === 'Verified' ? 'badge badge-green' : 'badge badge-orange'}>
                        {u.kyc}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{
                        color: u.status === 'Active' ? '#34D399' : '#F87171',
                        fontWeight: 700,
                        fontSize: '12px'
                      }}>
                        {u.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <button
                        onClick={() => handleSuspendUser(u.id)}
                        className="btn btn-outline btn-sm"
                        style={{ color: u.status === 'Suspended' ? '#34D399' : '#F87171', borderColor: u.status === 'Suspended' ? 'rgba(52, 211, 153, 0.3)' : 'rgba(239, 68, 68, 0.3)' }}
                      >
                        {u.status === 'Suspended' ? 'Unsuspend' : 'Suspend User'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
