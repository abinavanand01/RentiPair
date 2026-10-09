import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import EquipmentImage from '../common/EquipmentImage';
import {
  LayoutDashboard,
  Box,
  Layers,
  Wrench,
  CalendarCheck,
  MessageSquare,
  CreditCard,
  Star,
  User,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  RotateCcw,
  AlertTriangle,
  Send,
  PlusCircle,
  Download,
  DollarSign,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function UserDashboard() {
  const {
    currentUser,
    userCapabilities,
    rentals,
    repairs,
    equipment,
    technicians,
    updateRentalStatus,
    updateRepairStatus,
    openModal,
    showToast,
    navigateTo,
    pageParams
  } = useApp();

  const [activeTab, setActiveTab] = useState(pageParams?.tab || 'overview');
  const [chatMessage, setChatMessage] = useState('');
  const [messagesList, setMessagesList] = useState([]);

  // Capability Flags
  const hasRenter = userCapabilities.includes('RENTER') || userCapabilities.length === 0;
  const hasOwner = userCapabilities.includes('EQUIPMENT_OWNER');
  const hasRepairCustomer = userCapabilities.includes('REPAIR_CUSTOMER');
  const hasTechnician = userCapabilities.includes('TECHNICIAN');

  // Filter user specific data based on authenticated user ID
  const userRentals = rentals.filter(r => r.renterId === currentUser?.id);
  const userRepairs = repairs.filter(r => r.userId === currentUser?.id);
  const userEquipment = equipment.filter(e => e.owner?.id === currentUser?.id);
  const userTechProfile = technicians.find(t => t.userId === currentUser?.id);

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setMessagesList(prev => [
      ...prev,
      { id: Date.now(), sender: 'You', text: chatMessage, time: 'Just now', isMe: true }
    ]);
    setChatMessage('');
    showToast('Message sent', 'success');
  };

  // Dynamic Navigation Items adapted to user capabilities
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    ...(hasRenter ? [{ id: 'rentals', label: 'My Rentals', icon: Box, count: userRentals.length }] : []),
    ...(hasOwner || userEquipment.length > 0 ? [{ id: 'equipment', label: 'My Equipment', icon: Layers, count: userEquipment.length }] : []),
    ...(hasRepairCustomer || userRepairs.length > 0 ? [{ id: 'repairs', label: 'Repair Requests', icon: Wrench, count: userRepairs.length }] : []),
    ...(hasTechnician ? [{ id: 'technician', label: 'Technician Portal', icon: Wrench, count: userTechProfile?.jobsCompleted || 0 }] : []),
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: messagesList.length },
    { id: 'payments', label: 'Payments & Escrow', icon: CreditCard },
    { id: 'profile', label: 'Profile & KYC', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  if (!currentUser) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 76px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: '#EFF6FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }}>
          <User size={30} color="#1677FF" />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0B1533', marginBottom: '8px' }}>
          Please Log In to View Your Dashboard
        </h2>
        <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '400px', marginBottom: '24px' }}>
          Access your equipment leases, technician appointments, and account details.
        </p>
        <button onClick={() => navigateTo('login')} className="btn btn-primary" style={{ padding: '10px 24px' }}>
          Log In to Account
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: '#F8FAFC', minHeight: 'calc(100vh - 76px)', padding: '28px 0 80px' }}>
      <div className="container">

        {/* TOP PROFILE GREETING BANNER */}
        <div style={{
          background: 'linear-gradient(135deg, #0B1533 0%, #111D42 60%, #0F1A3A 100%)',
          borderRadius: '20px',
          padding: '24px 28px',
          color: '#FFFFFF',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          boxShadow: '0 4px 20px rgba(11, 21, 51, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Real Avatar or Generated Initials */}
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2.5px solid rgba(255,255,255,0.25)'
                }}
              />
            ) : (
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#1677FF',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2.5px solid rgba(255,255,255,0.3)',
                boxShadow: '0 4px 12px rgba(22, 119, 255, 0.3)'
              }}>
                {getInitials(currentUser.name)}
              </div>
            )}

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  {currentUser.name}
                </h1>

                {hasTechnician ? (
                  <span style={{
                    background: 'rgba(249, 115, 22, 0.2)',
                    color: '#FB923C',
                    border: '1px solid rgba(249, 115, 22, 0.4)',
                    padding: '2px 9px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Wrench size={11} /> Technician Applicant
                  </span>
                ) : (
                  <span style={{
                    background: 'rgba(16, 185, 129, 0.2)',
                    color: '#34D399',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    padding: '2px 9px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <ShieldCheck size={12} /> Verified Member
                  </span>
                )}
              </div>

              <div style={{ fontSize: '12.5px', color: '#94A3B8', marginTop: '4px' }}>
                {currentUser.email} • {currentUser.city} • Joined {currentUser.joinedDate}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => openModal('listEquipment')}
              className="btn btn-outline-white btn-sm"
              style={{ borderRadius: '8px' }}
            >
              <PlusCircle size={14} />
              <span>List Gear</span>
            </button>
            <button
              onClick={() => openModal('repairRequest')}
              className="btn btn-orange btn-sm"
              style={{ borderRadius: '8px' }}
            >
              <Wrench size={14} />
              <span>Book Repair</span>
            </button>
          </div>
        </div>

        {/* LAYOUT GRID: SIDEBAR TABS + CONTENT AREA */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          gap: '20px',
          alignItems: 'start'
        }} className="dashboard-grid">

          {/* Navigation Sidebar */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '10px',
            boxShadow: '0 1px 4px rgba(11, 21, 51, 0.02)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    fontSize: '13.5px',
                    fontWeight: activeTab === item.id ? 700 : 500,
                    background: activeTab === item.id ? '#EEF4FF' : 'transparent',
                    color: activeTab === item.id ? '#1677FF' : '#334155',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <item.icon size={16} color={activeTab === item.id ? '#1677FF' : '#64748B'} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span style={{
                      fontSize: '11px',
                      background: activeTab === item.id ? '#1677FF' : '#F1F5F9',
                      color: activeTab === item.id ? '#FFFFFF' : '#64748B',
                      padding: '1px 7px',
                      borderRadius: '999px',
                      fontWeight: 700
                    }}>
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <style>{`
            @media (max-width: 860px) {
              .dashboard-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>

          {/* Tab Content Panes */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '18px',
            padding: '28px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
            minHeight: '480px'
          }}>

            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '18px' }}>
                  Account Activity &amp; Overview
                </h3>

                {/* Metric Summary Cards adapted to user capabilities */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '16px',
                  marginBottom: '28px'
                }}>
                  <div style={{ background: '#EFF6FF', padding: '18px', borderRadius: '12px', border: '1px solid #BFDBFE' }}>
                    <div style={{ fontSize: '12px', color: '#1E40AF', fontWeight: 600 }}>Active Rentals</div>
                    <div style={{ fontSize: '26px', fontWeight: 800, color: '#1E3A8A', marginTop: '4px' }}>
                      {userRentals.filter(r => r.status === 'Active').length}
                    </div>
                  </div>

                  <div style={{ background: '#FFF4EB', padding: '18px', borderRadius: '12px', border: '1px solid #FED7AA' }}>
                    <div style={{ fontSize: '12px', color: '#9A3412', fontWeight: 600 }}>Repair Requests</div>
                    <div style={{ fontSize: '26px', fontWeight: 800, color: '#7C2D12', marginTop: '4px' }}>
                      {userRepairs.length}
                    </div>
                  </div>

                  <div style={{ background: '#ECFDF5', padding: '18px', borderRadius: '12px', border: '1px solid #A7F3D0' }}>
                    <div style={{ fontSize: '12px', color: '#065F46', fontWeight: 600 }}>Escrow Deposits Held</div>
                    <div style={{ fontSize: '26px', fontWeight: 800, color: '#064E3B', marginTop: '4px' }}>
                      ₹{userRentals.filter(r => r.status === 'Active').reduce((sum, r) => sum + (r.securityDeposit || 0), 0)}
                    </div>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '18px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Listed Equipment</div>
                    <div style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                      {userEquipment.length}
                    </div>
                  </div>
                </div>

                {/* Recent Activity Sections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Current Active Rentals */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                        Current Active Rentals
                      </h4>
                      {userRentals.length > 0 && (
                        <button onClick={() => setActiveTab('rentals')} style={{ background: 'none', border: 'none', color: '#1677FF', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                          View All ({userRentals.length})
                        </button>
                      )}
                    </div>

                    {userRentals.length === 0 ? (
                      <div style={{
                        padding: '24px',
                        borderRadius: '12px',
                        background: '#F8FAFC',
                        border: '1.5px dashed #E2E8F0',
                        textAlign: 'center'
                      }}>
                        <p style={{ color: '#64748B', fontSize: '13.5px', marginBottom: '12px' }}>
                          No active rentals yet.
                        </p>
                        <button onClick={() => navigateTo('rent')} className="btn btn-outline btn-sm">
                          Explore Equipment
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {userRentals.map(r => (
                          <div
                            key={r.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '14px 18px',
                              borderRadius: '12px',
                              border: '1px solid #E2E8F0',
                              background: '#FFFFFF',
                              flexWrap: 'wrap',
                              gap: '12px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#F1F5F9' }}>
                                <EquipmentImage src={r.equipmentImage} title={r.equipmentTitle} alt={r.equipmentTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                              <div>
                                <div style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>{r.equipmentTitle}</div>
                                <div style={{ fontSize: '12px', color: '#64748B' }}>
                                  Order #{r.id} • Return deadline: <strong>{r.endDate}</strong>
                                </div>
                              </div>
                            </div>

                            <span style={{
                              fontSize: '11.5px',
                              fontWeight: 700,
                              padding: '3px 10px',
                              borderRadius: '999px',
                              background: r.status === 'Active' ? '#ECFDF5' : '#F1F5F9',
                              color: r.status === 'Active' ? '#059669' : '#475569'
                            }}>
                              {r.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: MY RENTALS */}
            {activeTab === 'rentals' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                    My Equipment Rentals ({userRentals.length})
                  </h3>
                  {userRentals.length > 0 && (
                    <button onClick={() => showToast('Rental invoice receipt downloaded', 'info')} className="btn btn-outline btn-sm">
                      <Download size={14} /> Download Invoices
                    </button>
                  )}
                </div>

                {userRentals.length === 0 ? (
                  /* Empty State as requested in Section 20 */
                  <div style={{
                    textAlign: 'center',
                    padding: '48px 24px',
                    borderRadius: '16px',
                    border: '1.5px dashed #CBD5E1',
                    background: '#F8FAFC'
                  }}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>📦</div>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                      You haven't rented anything yet.
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '420px', margin: '0 auto 20px' }}>
                      Browse scientific calculators, mirrorless cameras, laptops, and lab tools available with zero collateral.
                    </p>
                    <button onClick={() => navigateTo('rent')} className="btn btn-primary">
                      Explore Equipment
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {userRentals.map(r => (
                      <div
                        key={r.id}
                        style={{
                          padding: '18px',
                          borderRadius: '12px',
                          border: '1.5px solid #E2E8F0',
                          background: '#FFFFFF'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                          <div style={{ display: 'flex', gap: '14px' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: '#F1F5F9' }}>
                              <EquipmentImage src={r.equipmentImage} title={r.equipmentTitle} alt={r.equipmentTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div>
                              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>{r.equipmentTitle}</div>
                              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                                Owner: {r.ownerName} • Order ID: <code>{r.id}</code>
                              </div>
                              <div style={{ fontSize: '12px', color: '#64748B' }}>
                                Period: {r.startDate} to {r.endDate} ({r.durationDays} days)
                              </div>
                            </div>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: '#1677FF' }}>₹{r.totalPaid}</div>
                            <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>
                              ₹{r.securityDeposit} Escrow Deposit
                            </div>
                          </div>
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '12px',
                          borderTop: '1px solid #F1F5F9',
                          flexWrap: 'wrap',
                          gap: '10px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#475569' }}>
                            <Clock size={14} color="#1677FF" />
                            <span>Status: <strong style={{ color: r.status === 'Active' ? '#059669' : '#0F172A' }}>{r.status}</strong></span>
                          </div>

                          <div style={{ display: 'flex', gap: '8px' }}>
                            {r.status === 'Active' && (
                              <button
                                onClick={() => updateRentalStatus(r.id, 'Return Pending')}
                                className="btn btn-primary btn-sm"
                              >
                                <RotateCcw size={13} />
                                <span>Initiate Return Handover</span>
                              </button>
                            )}

                            {r.status === 'Return Pending' && (
                              <button
                                onClick={() => updateRentalStatus(r.id, 'Completed')}
                                className="btn btn-outline btn-sm"
                                style={{ color: '#059669' }}
                              >
                                <CheckCircle2 size={13} /> Confirm Handover Completed
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: MY EQUIPMENT */}
            {activeTab === 'equipment' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                    My Listed Equipment ({userEquipment.length})
                  </h3>
                  <button onClick={() => openModal('listEquipment')} className="btn btn-primary btn-sm">
                    <PlusCircle size={15} /> Add New Equipment
                  </button>
                </div>

                {userEquipment.length === 0 ? (
                  /* Empty State as requested in Section 20 */
                  <div style={{
                    textAlign: 'center',
                    padding: '48px 24px',
                    borderRadius: '16px',
                    border: '1.5px dashed #CBD5E1',
                    background: '#F8FAFC'
                  }}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>🧰</div>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                      You haven't listed any equipment.
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '420px', margin: '0 auto 20px' }}>
                      Earn daily rental income from your camera lenses, laptops, or tools with guaranteed escrow protection.
                    </p>
                    <button onClick={() => openModal('listEquipment')} className="btn btn-primary">
                      List Equipment
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {userEquipment.map(item => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '14px 18px',
                          borderRadius: '12px',
                          border: '1px solid #E2E8F0',
                          background: '#FFFFFF'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{ width: '52px', height: '52px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#F1F5F9' }}>
                            <EquipmentImage item={item} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>{item.title}</div>
                            <div style={{ fontSize: '12px', color: '#64748B' }}>
                              ₹{item.dailyRate}/day • Deposit: ₹{item.securityDeposit}
                            </div>
                          </div>
                        </div>

                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: '999px',
                          background: item.status === 'Approved' ? '#ECFDF5' : '#FEF3C7',
                          color: item.status === 'Approved' ? '#059669' : '#B45309'
                        }}>
                          {item.status === 'Approved' ? 'LIVE & PUBLISHED' : 'MODERATION PENDING'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: REPAIR REQUESTS */}
            {activeTab === 'repairs' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                    My Repair Service Requests ({userRepairs.length})
                  </h3>
                  <button onClick={() => openModal('repairRequest')} className="btn btn-orange btn-sm">
                    <Wrench size={15} /> New Repair Ticket
                  </button>
                </div>

                {userRepairs.length === 0 ? (
                  /* Empty State as requested in Section 20 */
                  <div style={{
                    textAlign: 'center',
                    padding: '48px 24px',
                    borderRadius: '16px',
                    border: '1.5px dashed #CBD5E1',
                    background: '#F8FAFC'
                  }}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔧</div>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                      No repair requests yet.
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '420px', margin: '0 auto 20px' }}>
                      Have a damaged screen, motherboard issue, or water damage? Connect with top verified technicians.
                    </p>
                    <button onClick={() => navigateTo('repairs')} className="btn btn-orange">
                      Find a Technician
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {userRepairs.map(rep => (
                      <div
                        key={rep.id}
                        style={{
                          padding: '18px',
                          borderRadius: '12px',
                          border: '1.5px solid #E2E8F0',
                          background: '#FFFFFF'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                          <div>
                            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A' }}>
                              {rep.deviceBrand} {rep.deviceModel}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748B' }}>
                              Ticket #{rep.id} • Category: {rep.problemCategory}
                            </div>
                          </div>

                          <span style={{
                            fontSize: '11.5px',
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: '999px',
                            background: rep.status === 'Completed' ? '#ECFDF5' : '#FFF4EB',
                            color: rep.status === 'Completed' ? '#059669' : '#EA580C'
                          }}>
                            {rep.status}
                          </span>
                        </div>

                        <p style={{ fontSize: '13px', color: '#475569', marginBottom: '14px', lineHeight: 1.5 }}>
                          <strong>Issue:</strong> {rep.issueSummary}
                        </p>

                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: '12px',
                          borderTop: '1px solid #F1F5F9',
                          flexWrap: 'wrap',
                          gap: '10px'
                        }}>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>
                            {rep.assignedTechnician ? (
                              <span>Assigned: <strong>{rep.assignedTechnician.name}</strong></span>
                            ) : (
                              <span>Status: Matching with local verified technician...</span>
                            )}
                          </div>

                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => setActiveTab('messages')}
                              className="btn btn-outline btn-sm"
                            >
                              <MessageSquare size={13} /> Chat with Tech
                            </button>
                            {rep.status !== 'Completed' && (
                              <button
                                onClick={() => updateRepairStatus(rep.id, 'Completed')}
                                className="btn btn-orange btn-sm"
                              >
                                Mark Completed
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: TECHNICIAN PORTAL */}
            {activeTab === 'technician' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                    Technician Status &amp; Service Portal
                  </h3>
                  <button onClick={() => openModal('becomeTechnician')} className="btn btn-outline btn-sm">
                    Update Application / Credentials
                  </button>
                </div>

                {userTechProfile ? (
                  <div>
                    {/* Status Badge Banner */}
                    <div style={{
                      background: '#FFF7ED',
                      border: '1.5px solid #FED7AA',
                      borderRadius: '12px',
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '20px',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FFEDD5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Clock size={20} color="#EA580C" />
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '14.5px', color: '#9A3412' }}>
                            Application Status: {userTechProfile.status?.toUpperCase() || 'UNDER REVIEW'}
                          </div>
                          <div style={{ fontSize: '12px', color: '#7C2D12' }}>
                            {userTechProfile.verificationDocMasked || 'Govt ID credentials encrypted & masked'}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#FFFFFF', color: '#059669', border: '1px solid #BBF7D0' }}>
                          ✓ Identity Protected
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#FFFFFF', color: '#1677FF', border: '1px solid #BFDBFE' }}>
                          ✓ Skills Screened
                        </span>
                      </div>
                    </div>

                    {/* Jobs & Service Metrics */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '24px' }}>
                      <div style={{ padding: '16px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Completed Jobs</div>
                        <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                          {userTechProfile.jobsCompleted || 0}
                        </div>
                      </div>

                      <div style={{ padding: '16px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Rating</div>
                        <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                          {userTechProfile.rating || '5.0'} ★
                        </div>
                      </div>

                      <div style={{ padding: '16px', borderRadius: '12px', background: '#ECFDF5', border: '1px solid #BBF7D0' }}>
                        <div style={{ fontSize: '12px', color: '#065F46', fontWeight: 600 }}>Total Service Payouts</div>
                        <div style={{ fontSize: '24px', fontWeight: 800, color: '#047857', marginTop: '4px' }}>
                          ₹0
                        </div>
                      </div>
                    </div>

                    <p style={{ color: '#64748B', fontSize: '13px' }}>
                      No incoming service requests yet. Once our administrator verifies your application, service tickets matching your skills ({userTechProfile.categories?.join(', ') || 'All'}) will appear here automatically.
                    </p>
                  </div>
                ) : (
                  /* Technician Empty State as requested in Section 20 */
                  <div style={{
                    textAlign: 'center',
                    padding: '48px 24px',
                    borderRadius: '16px',
                    border: '1.5px dashed #CBD5E1',
                    background: '#FFF7ED'
                  }}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>🛠️</div>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#9A3412', marginBottom: '6px' }}>
                      You're not a verified technician yet.
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#7C2D12', maxWidth: '440px', margin: '0 auto 20px' }}>
                      Complete your technical credentials, certifications, and service area to start receiving repair jobs across your city.
                    </p>
                    <button onClick={() => openModal('becomeTechnician')} className="btn btn-orange">
                      Start Verification
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB: MESSAGES */}
            {activeTab === 'messages' && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
                  Direct Messages
                </h3>

                <div style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '420px',
                  background: '#FFFFFF'
                }}>
                  <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {messagesList.length === 0 ? (
                      <div style={{ textAlign: 'center', color: '#94A3B8', marginTop: '100px', fontSize: '13.5px' }}>
                        No conversations yet. When you book a rental or repair, you can chat with the equipment owner or technician here.
                      </div>
                    ) : (
                      messagesList.map(msg => (
                        <div
                          key={msg.id}
                          style={{
                            alignSelf: msg.isMe ? 'flex-end' : 'flex-start',
                            maxWidth: '75%',
                            background: msg.isMe ? '#1677FF' : '#F1F5F9',
                            color: msg.isMe ? '#FFFFFF' : '#0F172A',
                            padding: '10px 14px',
                            borderRadius: '12px',
                            fontSize: '13px'
                          }}
                        >
                          <div style={{ fontSize: '10.5px', opacity: 0.8, marginBottom: '2px', fontWeight: 600 }}>
                            {msg.sender} • {msg.time}
                          </div>
                          <div>{msg.text}</div>
                        </div>
                      ))
                    )}
                  </div>

                  <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', padding: '12px', borderTop: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={e => setChatMessage(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                      <Send size={15} /> Send
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* TAB: PAYMENTS & ESCROW */}
            {activeTab === 'payments' && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
                  Payments &amp; Escrow Security
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
                  <div style={{ padding: '16px', borderRadius: '12px', background: '#ECFDF5', border: '1px solid #A7F3D0' }}>
                    <div style={{ fontSize: '12px', color: '#065F46', fontWeight: 600 }}>Active Escrow Held</div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#047857', marginTop: '4px' }}>
                      ₹{userRentals.filter(r => r.status === 'Active').reduce((sum, r) => sum + (r.securityDeposit || 0), 0)}
                    </div>
                    <div style={{ fontSize: '11px', color: '#059669', marginTop: '4px' }}>Refunds automatically upon safe return</div>
                  </div>

                  <div style={{ padding: '16px', borderRadius: '12px', background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                    <div style={{ fontSize: '12px', color: '#1E40AF', fontWeight: 600 }}>Completed Transactions</div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#1D4ED8', marginTop: '4px' }}>
                      {userRentals.filter(r => r.status === 'Completed').length}
                    </div>
                    <div style={{ fontSize: '11px', color: '#2563EB', marginTop: '4px' }}>100% secured transactions</div>
                  </div>
                </div>

                <p style={{ fontSize: '13px', color: '#64748B' }}>
                  All security deposits on RentiPair are governed by smart escrow contracts. Deposits are never paid directly to equipment owners; they are locked safely until the physical return condition inspection is confirmed by both parties.
                </p>
              </div>
            )}

            {/* TAB: PROFILE & KYC */}
            {(activeTab === 'profile' || activeTab === 'settings') && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
                  Profile &amp; Identity Verification
                </h3>

                <div style={{
                  background: '#F8FAFC',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  padding: '20px',
                  fontSize: '13.5px',
                  lineHeight: 1.7
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontWeight: 700, marginBottom: '10px' }}>
                    <CheckCircle2 size={18} /> Account Status: Verified
                  </div>
                  <p style={{ color: '#475569', marginBottom: '14px' }}>
                    Your RentiPair account is backed by real Supabase authentication. You can participate in rental leases and book certified technician services seamlessly.
                  </p>
                  <div><strong>Full Name:</strong> {currentUser.name}</div>
                  <div><strong>Email:</strong> {currentUser.email}</div>
                  <div><strong>Phone:</strong> {currentUser.phone || 'Not provided'}</div>
                  <div><strong>City:</strong> {currentUser.city}</div>
                  <div><strong>Capabilities:</strong> {userCapabilities.join(', ') || 'RENTER'}</div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
