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
    showToast
  } = useApp();

  const [activeSection, setActiveSection] = useState('verification'); // 'verification', 'equipment', 'technicians', 'disputes', 'metrics'

  // Admin metrics
  const totalUsersCount = 1420;
  const verifiedTechsCount = technicians.filter(t => t.status === 'Approved').length;
  const totalEquipmentCount = equipment.length;
  const pendingEquipmentCount = equipment.filter(e => e.status === 'Pending').length;
  const pendingTechCount = technicians.filter(t => t.status === 'Pending').length;
  const activeRentalsCount = rentals.filter(r => r.status === 'Active').length;
  const repairRequestsCount = repairs.length;
  const totalRevenue = '₹1,42,850';

  const [usersList, setUsersList] = useState([
    { id: 'usr-1', name: 'Aditya Narayan', email: 'aditya.n@rentipair.in', role: 'User / Renter', status: 'Active', kyc: 'Verified' },
    { id: 'usr-2', name: 'Rajesh Kannan', email: 'rajesh.k@rentipair.in', role: 'Verified Technician', status: 'Active', kyc: 'Verified' },
    { id: 'usr-3', name: 'Manoj Swaminathan', email: 'manoj.s@gmail.com', role: 'Equipment Owner', status: 'Active', kyc: 'Verified' },
    { id: 'usr-4', name: 'Suspect User #809', email: 'anon9912@tempmail.com', role: 'User', status: 'Suspicious', kyc: 'Failed' }
  ]);

  const [disputesList, setDisputesList] = useState([
    {
      id: 'DISP-101',
      rentalId: 'RNT-9041',
      reportedBy: 'Karthik Subramanian (Owner)',
      reason: 'Calculator returned with faint battery cover smudge',
      claimAmount: '₹150 cleaning fee',
      status: 'Open Review'
    }
  ]);

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
    <div style={{ background: '#F8FAFC', minHeight: 'calc(100vh - 76px)', padding: '28px 0 80px' }}>
      <div className="container">
        {/* Admin Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0B1533 0%, #111D42 60%, #0F1A3A 100%)',
          borderRadius: '16px',
          padding: '20px 24px',
          color: '#FFFFFF',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                background: '#EF4444',
                color: '#FFFFFF',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '10.5px',
                fontWeight: 800,
                textTransform: 'uppercase'
              }}>
                ADMIN CONSOLE
              </span>
              <span style={{ fontSize: '12.5px', color: '#CBD5E1' }}>Secure Moderation & Operations Panel</span>
            </div>
            <h1 style={{ fontSize: '21px', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
              RentiPair Platform Administration
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: 'rgba(255,255,255,0.1)',
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
          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Total Users</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>{totalUsersCount}</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Verified Techs</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0066FF' }}>{verifiedTechsCount}</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Equipment Listings</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>{totalEquipmentCount}</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Active Rentals</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#059669' }}>{activeRentalsCount}</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Repair Requests</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#EA580C' }}>{repairRequestsCount}</div>
          </div>

          <div style={{ background: '#FEF3C7', padding: '14px', borderRadius: '12px', border: '1px solid #FCD34D' }}>
            <div style={{ fontSize: '11.5px', color: '#92400E', fontWeight: 700 }}>Pending Review</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#B45309' }}>{pendingTechCount + pendingEquipmentCount}</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>Completed Services</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>482</div>
          </div>

          <div style={{ background: '#ECFDF5', padding: '14px', borderRadius: '12px', border: '1px solid #A7F3D0' }}>
            <div style={{ fontSize: '11.5px', color: '#065F46', fontWeight: 700 }}>Revenue</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#047857' }}>{totalRevenue}</div>
          </div>
        </div>

        {/* Admin Navigation Pills */}
        <div style={{
          display: 'flex',
          gap: '8px',
          background: '#FFFFFF',
          padding: '8px',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
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
                background: activeSection === tab.id ? '#0F172A' : 'transparent',
                color: activeSection === tab.id ? '#FFFFFF' : '#475569',
                border: 'none',
                cursor: 'pointer'
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
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
                Technician Applications Awaiting Verification ({pendingTechCount})
              </h3>

              {pendingTechCount === 0 ? (
                <div style={{ color: '#059669', fontSize: '13px', fontWeight: 600 }}>
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
                        border: '1px solid #FED7AA',
                        background: '#FFFBF8',
                        flexWrap: 'wrap',
                        gap: '12px'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '15px', color: '#0F172A' }}>{t.name}</div>
                        <div style={{ fontSize: '12.5px', color: '#64748B' }}>
                          Specialty: {t.title} • {t.yearsExperience} yrs exp • {t.city}
                        </div>
                        <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px' }}>
                          Secure Docs: <code>{t.verificationDocMasked || 'Govt ID Masked: ****-****-7102'}</code>
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
                          style={{ color: '#DC2626' }}
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
            <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
                Equipment Listings Awaiting Moderation ({pendingEquipmentCount})
              </h3>

              {pendingEquipmentCount === 0 ? (
                <div style={{ color: '#059669', fontSize: '13px', fontWeight: 600 }}>
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
                        border: '1px solid #E2E8F0',
                        background: '#FFFFFF',
                        flexWrap: 'wrap',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '54px', height: '54px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#F1F5F9' }}>
                          <EquipmentImage item={item} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '14.5px', color: '#0F172A' }}>{item.title}</div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>
                            {item.category} • ₹{item.dailyRate}/day • Deposit: ₹{item.securityDeposit}
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#475569' }}>
                            Owner: {item.owner.name} (Adyar, Chennai)
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
                          style={{ color: '#DC2626' }}
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
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
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
                    border: '1px solid #F1F5F9',
                    background: '#FAFAFA'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={t.avatar} alt="" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>{t.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{t.title} • {t.city}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      fontSize: '11.5px',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '999px',
                      background: t.status === 'Approved' ? '#ECFDF5' : '#FEF3C7',
                      color: t.status === 'Approved' ? '#059669' : '#B45309'
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
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
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
                    border: '1px solid #F1F5F9',
                    background: '#FAFAFA'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, background: '#F1F5F9' }}>
                      <EquipmentImage item={item} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>{item.title}</div>
                      <div style={{ fontSize: '11.5px', color: '#64748B' }}>₹{item.dailyRate}/day • {item.location}</div>
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
                        style={{ color: '#DC2626', fontSize: '11.5px' }}
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
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
              Dispute Resolution & Escrow Mediation Tickets
            </h3>

            {disputesList.length === 0 ? (
              <div style={{ color: '#059669', fontSize: '13px' }}>✓ Zero open disputes currently.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {disputesList.map(disp => (
                  <div
                    key={disp.id}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid #FECACA',
                      background: '#FEF2F2'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 800, color: '#991B1B' }}>Ticket {disp.id} • Order {disp.rentalId}</span>
                      <span style={{ fontWeight: 700, color: '#B91C1C' }}>{disp.claimAmount}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#374151', marginBottom: '12px' }}>
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
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
              User Moderation & Account Suspension Control
            </h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px' }}>User</th>
                  <th style={{ padding: '10px 12px' }}>Role</th>
                  <th style={{ padding: '10px 12px' }}>KYC Status</th>
                  <th style={{ padding: '10px 12px' }}>Account State</th>
                  <th style={{ padding: '10px 12px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>{u.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748B' }}>{u.email}</div>
                    </td>
                    <td style={{ padding: '10px 12px', color: '#334155' }}>{u.role}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span className={u.kyc === 'Verified' ? 'badge badge-green' : 'badge badge-orange'}>
                        {u.kyc}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{
                        color: u.status === 'Active' ? '#059669' : '#DC2626',
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
                        style={{ color: u.status === 'Suspended' ? '#059669' : '#DC2626' }}
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
