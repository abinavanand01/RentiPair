import React, { useState, useRef } from 'react';
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
  ChevronRight,
  Camera,
  Heart,
  GitCompare,
  Bell,
  Share2,
  GraduationCap,
  Copy,
  Check,
  Trash2,
  Sparkles,
  MapPin
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
    pageParams,
    updateProfilePhoto,
    // Wishlist
    wishlist,
    toggleWishlist,
    // Compare
    compareList,
    removeFromCompare,
    clearCompare,
    // Real In-App Messages
    conversations,
    messages,
    activeConversation,
    setActiveConversation,
    sendMessage,
    startOrGetConversation,
    unreadMessagesCount,
    // Real Notifications
    notifications,
    unreadNotifCount,
    markNotificationAsRead,
    markAllNotificationsRead,
    // Referrals
    referrals,
    // Student
    isStudentVerified
  } = useApp();

  const [activeTab, setActiveTab] = useState(pageParams?.tab || 'overview');
  const [inDashboardChatMessage, setInDashboardChatMessage] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [notifFilter, setNotifFilter] = useState('all'); // 'all' or 'unread'
  const profilePhotoInputRef = useRef(null);

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
  const userWishlistItems = equipment.filter(e => wishlist.includes(e.id));
  const userCompareItems = equipment.filter(e => compareList.includes(e.id));
  const userReferrals = referrals.filter(r => r.referrerId === currentUser?.id);
  const isUserStudent = isStudentVerified(currentUser?.id);

  // User active conversation
  const userConversations = conversations.filter(c =>
    c.participantIds?.includes(currentUser?.id) || c.createdBy === currentUser?.id
  );
  const currentChatConv = activeConversation || userConversations[0] || null;
  const currentChatMessages = currentChatConv ? (messages[currentChatConv.id] || []) : [];

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleSendDashboardMessage = (e) => {
    e.preventDefault();
    if (!inDashboardChatMessage.trim() || !currentChatConv) return;
    sendMessage(currentChatConv.id, inDashboardChatMessage.trim());
    setInDashboardChatMessage('');
  };

  const referralCode = currentUser?.referralCode || `${currentUser?.name?.replace(/\s+/g, '').toUpperCase().slice(0, 6) || 'USER'}-RP26`;
  const referralLink = `https://rentipair.in/signup?ref=${referralCode}`;

  const handleCopyReferral = () => {
    navigator.clipboard?.writeText(referralLink);
    setCopiedCode(true);
    showToast('Referral link copied to clipboard!', 'success');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Dynamic Navigation Items adapted to user capabilities
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    ...(hasRenter ? [{ id: 'rentals', label: 'My Rentals', icon: Box, count: userRentals.length }] : []),
    ...(hasOwner || userEquipment.length > 0 ? [{ id: 'equipment', label: 'My Equipment', icon: Layers, count: userEquipment.length }] : []),
    { id: 'wishlist', label: 'My Wishlist', icon: Heart, count: userWishlistItems.length },
    { id: 'compare', label: 'Compare Gadgets', icon: GitCompare, count: userCompareItems.length },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: unreadMessagesCount },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: unreadNotifCount },
    ...(hasRepairCustomer || userRepairs.length > 0 ? [{ id: 'repairs', label: 'Repair Requests', icon: Wrench, count: userRepairs.length }] : []),
    ...(hasTechnician ? [{ id: 'technician', label: 'Technician Portal', icon: Wrench, count: userTechProfile?.jobsCompleted || 0 }] : []),
    { id: 'referrals', label: 'Referrals & Rewards', icon: Share2 },
    { id: 'student', label: 'Student Benefits', icon: GraduationCap },
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
    <div style={{ background: '#050816', minHeight: 'calc(100vh - 76px)', padding: '28px 0 80px', position: 'relative' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

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
            background: 'rgba(14, 19, 48, 0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '10px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
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
                    background: activeTab === item.id ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                    color: activeTab === item.id ? '#60A5FA' : '#94A3B8',
                    border: activeTab === item.id ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <item.icon size={16} color={activeTab === item.id ? '#3B82F6' : '#64748B'} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span style={{
                      fontSize: '11px',
                      background: activeTab === item.id ? '#3B82F6' : 'rgba(255, 255, 255, 0.08)',
                      color: activeTab === item.id ? '#FFFFFF' : '#94A3B8',
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
            background: 'rgba(14, 19, 48, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '18px',
            padding: '28px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
            minHeight: '480px'
          }}>

            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0B1533', marginBottom: '18px' }}>
                  Welcome, {currentUser.name}
                </h3>

                {/* Metric Summary Cards from Supabase */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '16px',
                  marginBottom: '28px'
                }}>
                  <div style={{ background: '#EFF6FF', padding: '18px', borderRadius: '14px', border: '1.5px solid #BFDBFE' }}>
                    <div style={{ fontSize: '12.5px', color: '#1E40AF', fontWeight: 600 }}>Active Rentals</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#1E3A8A', marginTop: '4px' }}>
                      {userRentals.filter(r => r.status === 'Active').length}
                    </div>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '18px', borderRadius: '14px', border: '1.5px solid #CBD5E1' }}>
                    <div style={{ fontSize: '12.5px', color: '#475569', fontWeight: 600 }}>Listed Equipment</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#0B1533', marginTop: '4px' }}>
                      {userEquipment.length}
                    </div>
                  </div>

                  <div style={{ background: '#FFF4EB', padding: '18px', borderRadius: '14px', border: '1.5px solid #FED7AA' }}>
                    <div style={{ fontSize: '12.5px', color: '#9A3412', fontWeight: 600 }}>Repair Requests</div>
                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#7C2D12', marginTop: '4px' }}>
                      {userRepairs.length}
                    </div>
                  </div>

                  <div style={{ background: '#F5F3FF', padding: '18px', borderRadius: '14px', border: '1.5px solid #DDD6FE' }}>
                    <div style={{ fontSize: '12.5px', color: '#6D28D9', fontWeight: 600 }}>Technician Status</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#5B21B6', marginTop: '8px' }}>
                      {userTechProfile ? userTechProfile.status : 'Not Registered'}
                    </div>
                  </div>
                </div>

                {/* Recent Activity & Useful Empty States */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Rentals Section */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                        Active Rentals
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
                          You haven't rented anything yet.
                        </p>
                        <button onClick={() => navigateTo('rent')} className="btn btn-primary btn-sm">
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

                  {/* Listed Equipment Section */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                        Listed Equipment
                      </h4>
                      {userEquipment.length > 0 && (
                        <button onClick={() => setActiveTab('equipment')} style={{ background: 'none', border: 'none', color: '#1677FF', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                          View All ({userEquipment.length})
                        </button>
                      )}
                    </div>

                    {userEquipment.length === 0 ? (
                      <div style={{
                        padding: '24px',
                        borderRadius: '12px',
                        background: '#F8FAFC',
                        border: '1.5px dashed #E2E8F0',
                        textAlign: 'center'
                      }}>
                        <p style={{ color: '#64748B', fontSize: '13.5px', marginBottom: '12px' }}>
                          You haven't listed any equipment yet.
                        </p>
                        <button onClick={() => openModal('listEquipment')} className="btn btn-outline btn-sm">
                          List Equipment
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {userEquipment.slice(0, 3).map(e => (
                          <div
                            key={e.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '12px 16px',
                              borderRadius: '12px',
                              border: '1px solid #E2E8F0',
                              background: '#FFFFFF'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img src={e.image || e.images?.[0]} alt={e.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                              <div>
                                <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>{e.title}</div>
                                <div style={{ fontSize: '11.5px', color: '#64748B' }}>₹{e.dailyRate}/day • {e.status}</div>
                              </div>
                            </div>
                            <span className="badge badge-blue">{e.category}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Repair Requests Section */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                        Repair Requests
                      </h4>
                      {userRepairs.length > 0 && (
                        <button onClick={() => setActiveTab('repairs')} style={{ background: 'none', border: 'none', color: '#EA580C', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer' }}>
                          View All ({userRepairs.length})
                        </button>
                      )}
                    </div>

                    {userRepairs.length === 0 ? (
                      <div style={{
                        padding: '24px',
                        borderRadius: '12px',
                        background: '#FFF7ED',
                        border: '1.5px dashed #FED7AA',
                        textAlign: 'center'
                      }}>
                        <p style={{ color: '#9A3412', fontSize: '13.5px', marginBottom: '12px' }}>
                          You haven't requested a repair yet.
                        </p>
                        <button onClick={() => navigateTo('repairs')} className="btn btn-orange btn-sm">
                          Find a Technician
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {userRepairs.slice(0, 3).map(rep => (
                          <div
                            key={rep.id}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '12px 16px',
                              borderRadius: '12px',
                              border: '1px solid #E2E8F0',
                              background: '#FFFFFF'
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>{rep.deviceModel} ({rep.category})</div>
                              <div style={{ fontSize: '11.5px', color: '#64748B' }}>{rep.issueDescription?.slice(0, 50)}...</div>
                            </div>
                            <span className="badge badge-orange">{rep.status}</span>
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

                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <button
                              onClick={() => {
                                startOrGetConversation({
                                  recipientId: r.ownerId,
                                  recipientName: r.ownerName,
                                  equipmentId: r.equipmentId,
                                  equipmentTitle: r.equipmentTitle,
                                  title: `Rental: ${r.equipmentTitle}`
                                });
                              }}
                              className="btn btn-outline btn-sm"
                            >
                              <MessageSquare size={13} color="#1677FF" />
                              <span>Message Owner</span>
                            </button>

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
                          background: (item.status === 'Approved' || item.status === 'APPROVED') ? '#ECFDF5' : '#FEF3C7',
                          color: (item.status === 'Approved' || item.status === 'APPROVED') ? '#059669' : '#B45309'
                        }}>
                          {(item.status === 'Approved' || item.status === 'APPROVED') ? 'LIVE & PUBLISHED' : 'MODERATION PENDING'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: MY WISHLIST */}
            {activeTab === 'wishlist' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                    My Wishlist ({userWishlistItems.length})
                  </h3>
                  <button onClick={() => navigateTo('rent')} className="btn btn-outline btn-sm">
                    Browse Marketplace
                  </button>
                </div>

                {userWishlistItems.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '48px 24px',
                    borderRadius: '16px',
                    border: '1.5px dashed #CBD5E1',
                    background: '#F8FAFC'
                  }}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>♡</div>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                      No saved equipment yet.
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '420px', margin: '0 auto 20px' }}>
                      Save your favorite gear for later by tapping the heart icon on any equipment card.
                    </p>
                    <button onClick={() => navigateTo('rent')} className="btn btn-primary">
                      Explore Equipment
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                    {userWishlistItems.map(item => (
                      <div
                        key={item.id}
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #E2E8F0',
                          borderRadius: '14px',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                        }}
                      >
                        <div style={{ height: '140px', position: 'relative', background: '#F1F5F9' }}>
                          <EquipmentImage item={item} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button
                            onClick={() => toggleWishlist(item.id)}
                            style={{
                              position: 'absolute',
                              top: '8px',
                              right: '8px',
                              background: 'rgba(255,255,255,0.9)',
                              border: 'none',
                              borderRadius: '50%',
                              width: '32px',
                              height: '32px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#EF4444',
                              cursor: 'pointer'
                            }}
                            title="Remove from wishlist"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', fontWeight: 600 }}>{item.category}</div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginTop: '2px', lineHeight: 1.3 }}>{item.title}</div>
                          <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                            <MapPin size={12} /> {item.location || item.city}
                          </div>
                          <div style={{ marginTop: 'auto', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                              <span style={{ fontSize: '16px', fontWeight: 800, color: '#0066FF' }}>₹{item.dailyRate}</span>
                              <span style={{ fontSize: '11px', color: '#64748B' }}>/day</span>
                            </div>
                            <span style={{
                              fontSize: '10.5px',
                              fontWeight: 700,
                              padding: '2px 7px',
                              borderRadius: '999px',
                              background: item.isAvailable ? '#ECFDF5' : '#FEF3C7',
                              color: item.isAvailable ? '#059669' : '#B45309'
                            }}>
                              {item.isAvailable ? 'Available' : 'Rented'}
                            </span>
                          </div>
                          <button
                            onClick={() => openModal('details', item)}
                            className="btn btn-primary btn-sm"
                            style={{ width: '100%', marginTop: '10px' }}
                          >
                            Rent Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: COMPARE GADGETS */}
            {activeTab === 'compare' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                      Gadget Comparison ({userCompareItems.length}/4)
                    </h3>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
                      Compare specifications, pricing, security deposits and terms side-by-side.
                    </p>
                  </div>
                  {userCompareItems.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={clearCompare} className="btn btn-outline btn-sm">
                        Clear All
                      </button>
                      <button onClick={() => openModal('compare')} className="btn btn-primary btn-sm">
                        <GitCompare size={14} /> Open Comparison Table
                      </button>
                    </div>
                  )}
                </div>

                {userCompareItems.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '48px 24px',
                    borderRadius: '16px',
                    border: '1.5px dashed #CBD5E1',
                    background: '#F8FAFC'
                  }}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>⚖️</div>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                      Add equipment to compare.
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '440px', margin: '0 auto 20px' }}>
                      Browse the marketplace and tap <strong>+ Compare</strong> on up to 4 gadgets to see a comprehensive side-by-side spec comparison.
                    </p>
                    <button onClick={() => navigateTo('rent')} className="btn btn-primary">
                      Browse Marketplace
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                      {userCompareItems.map(item => (
                        <div
                          key={item.id}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #E2E8F0',
                            borderRadius: '12px',
                            padding: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            position: 'relative'
                          }}
                        >
                          <button
                            onClick={() => removeFromCompare(item.id)}
                            style={{
                              position: 'absolute',
                              top: '8px',
                              right: '8px',
                              background: '#F1F5F9',
                              border: 'none',
                              borderRadius: '50%',
                              width: '24px',
                              height: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#64748B',
                              cursor: 'pointer'
                            }}
                          >
                            ×
                          </button>
                          <div style={{ width: '100%', height: '110px', borderRadius: '8px', overflow: 'hidden', background: '#F8FAFC' }}>
                            <EquipmentImage item={item} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ fontWeight: 700, fontSize: '13px', color: '#0F172A' }}>{item.title}</div>
                          <div style={{ fontSize: '12px', color: '#0066FF', fontWeight: 800 }}>₹{item.dailyRate}/day</div>
                          <button
                            onClick={() => openModal('details', item)}
                            className="btn btn-outline btn-sm"
                            style={{ marginTop: 'auto', fontSize: '11.5px', padding: '5px' }}
                          >
                            View Details
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => openModal('compare')}
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '12px' }}
                    >
                      <GitCompare size={16} /> Open Side-by-Side Comparison Modal
                    </button>
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
                              onClick={() => {
                                if (rep.assignedTechnician) {
                                  startOrGetConversation({
                                    recipientId: rep.assignedTechnician.userId || rep.assignedTechnician.id,
                                    recipientName: rep.assignedTechnician.name,
                                    recipientAvatar: rep.assignedTechnician.avatar || '',
                                    repairId: rep.id,
                                    title: `Repair #${rep.id}: ${rep.deviceBrand} ${rep.deviceModel}`
                                  });
                                } else {
                                  openModal('chat');
                                }
                              }}
                              className="btn btn-outline btn-sm"
                            >
                              <MessageSquare size={13} color="#1677FF" /> Chat with Tech
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                      In-App Direct Messaging
                    </h3>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
                      Real-time secure chat between Equipment Owners, Renters, and Certified Technicians.
                    </p>
                  </div>
                  <button onClick={() => openModal('chat')} className="btn btn-outline btn-sm">
                    Open Full Chat Window
                  </button>
                </div>

                {userConversations.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '56px 24px',
                    borderRadius: '16px',
                    border: '1.5px dashed #CBD5E1',
                    background: '#F8FAFC'
                  }}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>💬</div>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                      No conversations yet.
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '440px', margin: '0 auto 20px' }}>
                      Start a chat by tapping <strong>Message Owner</strong> on any equipment listing or <strong>Message Technician</strong> on a repair service ticket.
                    </p>
                    <button onClick={() => navigateTo('rent')} className="btn btn-primary">
                      Explore Marketplace
                    </button>
                  </div>
                ) : (
                  <div style={{
                    border: '1px solid #E2E8F0',
                    borderRadius: '14px',
                    display: 'grid',
                    gridTemplateColumns: '260px 1fr',
                    height: '480px',
                    background: '#FFFFFF',
                    overflow: 'hidden'
                  }} className="dashboard-chat-box">
                    {/* Conversations List */}
                    <div style={{ borderRight: '1px solid #E2E8F0', overflowY: 'auto', background: '#F8FAFC' }}>
                      <div style={{ padding: '12px 14px', borderBottom: '1px solid #E2E8F0', fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                        Active Threads ({userConversations.length})
                      </div>
                      {userConversations.map(conv => {
                        const isSelected = (currentChatConv?.id === conv.id);
                        const otherP = conv.participants?.find(p => p.id !== currentUser?.id) || { name: conv.title || 'Chat' };
                        return (
                          <div
                            key={conv.id}
                            onClick={() => setActiveConversation(conv)}
                            style={{
                              padding: '12px 14px',
                              borderBottom: '1px solid #F1F5F9',
                              cursor: 'pointer',
                              background: isSelected ? '#EFF6FF' : 'transparent',
                              borderLeft: isSelected ? '3px solid #1677FF' : '3px solid transparent',
                              transition: 'all 0.15s'
                            }}
                          >
                            <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>{otherP.name}</div>
                            {conv.equipmentTitle && (
                              <div style={{ fontSize: '11px', color: '#1677FF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                📦 {conv.equipmentTitle}
                              </div>
                            )}
                            <div style={{ fontSize: '12px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                              {conv.lastMessage || 'Start conversation...'}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Messages Thread Pane */}
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFFFFF' }}>
                      {currentChatConv ? (
                        <>
                          <div style={{ padding: '12px 18px', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                              <div style={{ fontWeight: 800, fontSize: '14px', color: '#0F172A' }}>
                                {currentChatConv.participants?.find(p => p.id !== currentUser?.id)?.name || currentChatConv.title}
                              </div>
                              <div style={{ fontSize: '11px', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} /> Active in Supabase Realtime
                              </div>
                            </div>
                            {currentChatConv.equipmentTitle && (
                              <span style={{ fontSize: '11px', background: '#EFF6FF', color: '#1E40AF', padding: '3px 8px', borderRadius: '6px', fontWeight: 600 }}>
                                {currentChatConv.equipmentTitle}
                              </span>
                            )}
                          </div>

                          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {currentChatMessages.length === 0 ? (
                              <div style={{ textAlign: 'center', color: '#94A3B8', marginTop: '80px', fontSize: '13px' }}>
                                Send a message to start this discussion.
                              </div>
                            ) : (
                              currentChatMessages.map(msg => {
                                const isMe = msg.senderId === currentUser?.id;
                                return (
                                  <div
                                    key={msg.id}
                                    style={{
                                      alignSelf: isMe ? 'flex-end' : 'flex-start',
                                      maxWidth: '75%',
                                      background: isMe ? '#1677FF' : '#F1F5F9',
                                      color: isMe ? '#FFFFFF' : '#0F172A',
                                      padding: '10px 14px',
                                      borderRadius: isMe ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                                      fontSize: '13px',
                                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                                    }}
                                  >
                                    <div style={{ fontSize: '10px', opacity: 0.8, marginBottom: '2px', fontWeight: 600 }}>
                                      {isMe ? 'You' : msg.senderName} • {msg.timestamp}
                                    </div>
                                    <div style={{ wordBreak: 'break-word', lineHeight: 1.45 }}>{msg.text}</div>
                                  </div>
                                );
                              })
                            )}
                          </div>

                          <form onSubmit={handleSendDashboardMessage} style={{ display: 'flex', gap: '8px', padding: '12px', borderTop: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                            <input
                              type="text"
                              className="form-input"
                              placeholder="Type your message..."
                              value={inDashboardChatMessage}
                              onChange={e => setInDashboardChatMessage(e.target.value)}
                            />
                            <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>
                              <Send size={15} /> Send
                            </button>
                          </form>
                        </>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94A3B8' }}>
                          Select a conversation to start chatting
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: NOTIFICATIONS */}
            {activeTab === 'notifications' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                      Notification Center ({notifications.length})
                    </h3>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
                      System alerts for rentals, equipment availability, repairs, and student verification.
                    </p>
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="btn btn-outline btn-sm"
                    >
                      <Check size={14} /> Mark All as Read
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
                  <button
                    onClick={() => setNotifFilter('all')}
                    className={`btn btn-sm ${notifFilter === 'all' ? 'btn-primary' : 'btn-outline'}`}
                    style={{ fontSize: '12px' }}
                  >
                    All ({notifications.length})
                  </button>
                  <button
                    onClick={() => setNotifFilter('unread')}
                    className={`btn btn-sm ${notifFilter === 'unread' ? 'btn-primary' : 'btn-outline'}`}
                    style={{ fontSize: '12px' }}
                  >
                    Unread ({unreadNotifCount})
                  </button>
                </div>

                {(() => {
                  const filtered = notifFilter === 'unread'
                    ? notifications.filter(n => !n.read)
                    : notifications;

                  if (filtered.length === 0) {
                    return (
                      <div style={{
                        textAlign: 'center',
                        padding: '48px 24px',
                        borderRadius: '16px',
                        border: '1.5px dashed #CBD5E1',
                        background: '#F8FAFC'
                      }}>
                        <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔔</div>
                        <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                          {notifFilter === 'unread' ? 'No unread notifications.' : 'No notifications yet.'}
                        </h4>
                        <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '420px', margin: '0 auto' }}>
                          Alerts regarding your equipment rentals, return deadlines, technician bookings, and availability will appear here.
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {filtered.map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationAsRead(notif.id)}
                          style={{
                            padding: '14px 18px',
                            borderRadius: '12px',
                            background: notif.read ? '#FFFFFF' : '#EFF6FF',
                            border: notif.read ? '1px solid #E2E8F0' : '1.5px solid #93C5FD',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.15s'
                          }}
                        >
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: notif.read ? '#F1F5F9' : '#DBEAFE',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#1677FF',
                            flexShrink: 0
                          }}>
                            <Bell size={16} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ fontWeight: notif.read ? 600 : 800, fontSize: '13.5px', color: '#0F172A' }}>
                                {notif.title}
                              </div>
                              <span style={{ fontSize: '11px', color: '#64748B' }}>{notif.time || 'Recently'}</span>
                            </div>
                            <p style={{ fontSize: '12.5px', color: '#475569', margin: '4px 0 0', lineHeight: 1.45 }}>
                              {notif.message}
                            </p>
                          </div>
                          {!notif.read && (
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0066FF', flexShrink: 0, marginTop: '6px' }} />
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* TAB: REFERRALS & REWARDS */}
            {activeTab === 'referrals' && (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                    Referral Rewards Program
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
                    Invite colleagues, creators, or fellow engineers to RentiPair and earn wallet rental credits.
                  </p>
                </div>

                {/* Referral Code & Share Card */}
                <div style={{
                  background: 'linear-gradient(135deg, #0B1533 0%, #162456 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  color: '#FFFFFF',
                  marginBottom: '24px',
                  boxShadow: '0 8px 24px rgba(11, 21, 51, 0.15)'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#00C2FF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    YOUR UNIQUE REFERRAL CODE
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginTop: '10px' }}>
                    <div>
                      <div style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '0.08em', color: '#FFFFFF', fontFamily: 'monospace' }}>
                        {referralCode}
                      </div>
                      <div style={{ fontSize: '12.5px', color: '#94A3B8', marginTop: '4px' }}>
                        Give ₹50 off on your friend's first rental • Get ₹100 direct wallet credit
                      </div>
                    </div>

                    <button
                      onClick={handleCopyReferral}
                      className="btn"
                      style={{
                        background: '#0066FF',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '10px 18px',
                        borderRadius: '10px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      {copiedCode ? <Check size={16} /> : <Copy size={16} />}
                      <span>{copiedCode ? 'Copied Link!' : 'Share Referral Link'}</span>
                    </button>
                  </div>
                </div>

                {/* Referral Metrics */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '14px',
                  marginBottom: '28px'
                }}>
                  <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Friends Invited</div>
                    <div style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>
                      {userReferrals.length}
                    </div>
                  </div>

                  <div style={{ background: '#EFF6FF', padding: '16px', borderRadius: '12px', border: '1px solid #BFDBFE' }}>
                    <div style={{ fontSize: '12px', color: '#1E40AF', fontWeight: 600 }}>Successful Referrals</div>
                    <div style={{ fontSize: '26px', fontWeight: 800, color: '#1D4ED8', marginTop: '4px' }}>
                      {userReferrals.filter(r => r.status === 'QUALIFIED' || r.status === 'REWARDED').length}
                    </div>
                  </div>

                  <div style={{ background: '#ECFDF5', padding: '16px', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                    <div style={{ fontSize: '12px', color: '#065F46', fontWeight: 600 }}>Available Credit</div>
                    <div style={{ fontSize: '26px', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
                      ₹{currentUser?.walletBalance || (userReferrals.filter(r => r.status === 'QUALIFIED' || r.status === 'REWARDED').length * 100)}
                    </div>
                  </div>
                </div>

                {/* How Referral Rewards Work */}
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
                  How Eligible Rewards Work
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '24px' }}>
                  <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#EFF6FF', color: '#1677FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '10px' }}>1</div>
                    <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>Share Unique Link</div>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 0', lineHeight: 1.4 }}>
                      Send your link to classmates, colleagues, or studio teams.
                    </p>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#EFF6FF', color: '#1677FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '10px' }}>2</div>
                    <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>First Qualifying Rental</div>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 0', lineHeight: 1.4 }}>
                      Reward is unlocked when the referred user completes their first legitimate rental transaction.
                    </p>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '10px' }}>3</div>
                    <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>₹100 Wallet Credit</div>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0 0', lineHeight: 1.4 }}>
                      Credit is credited directly to your RentiPair wallet and applied at checkout.
                    </p>
                  </div>
                </div>

                {userReferrals.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '24px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '13px', color: '#64748B' }}>
                    You haven't invited anyone yet. Copy your referral link above and share it with friends!
                  </div>
                )}
              </div>
            )}

            {/* TAB: STUDENT BENEFITS */}
            {activeTab === 'student' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>
                      Student Discount Program
                    </h3>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0 }}>
                      Special pricing for college students on laptops, scientific calculators, cameras, and lab gear.
                    </p>
                  </div>
                  {!isUserStudent && (
                    <button
                      onClick={() => openModal('studentVerify')}
                      className="btn btn-primary btn-sm"
                    >
                      <GraduationCap size={15} /> Apply for Student Verification
                    </button>
                  )}
                </div>

                {isUserStudent ? (
                  <div>
                    <div style={{
                      background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
                      border: '1.5px solid #6EE7B7',
                      borderRadius: '16px',
                      padding: '24px',
                      marginBottom: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '16px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '50%',
                          background: '#059669',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
                        }}>
                          <GraduationCap size={28} />
                        </div>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '18px', fontWeight: 900, color: '#065F46' }}>
                              🎓 Student Verified
                            </span>
                            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: '#059669', color: '#FFFFFF' }}>
                              ACTIVE
                            </span>
                          </div>
                          <div style={{ fontSize: '13px', color: '#047857', marginTop: '4px' }}>
                            Institution: <strong>{currentUser?.studentInstitution || 'Verified College/University'}</strong>
                          </div>
                        </div>
                      </div>

                      <div style={{ background: '#FFFFFF', padding: '10px 16px', borderRadius: '10px', border: '1px solid #A7F3D0', textAlign: 'right' }}>
                        <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>Active Benefit</div>
                        <div style={{ fontSize: '16px', fontWeight: 800, color: '#065F46' }}>10% – 20% Off Eligible Gear</div>
                      </div>
                    </div>

                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
                      Your Unlocked Student Privileges
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                      <div style={{ padding: '16px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                          ⚡ Automatic Student Rates
                        </div>
                        <p style={{ fontSize: '12px', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
                          Every equipment listing with student discount enabled will automatically apply reduced rates during checkout.
                        </p>
                      </div>

                      <div style={{ padding: '16px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                          📅 Semester Rental Flexibility
                        </div>
                        <p style={{ fontSize: '12px', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
                          Special 30-day and 90-day extended rental terms for academic assignments and hackathons.
                        </p>
                      </div>

                      <div style={{ padding: '16px', borderRadius: '12px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                          🛡️ Escrow Protected Security
                        </div>
                        <p style={{ fontSize: '12px', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
                          Student security deposits are safely kept in institutional escrow and refunded instantly upon item check-in.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '48px 24px',
                    borderRadius: '16px',
                    border: '1.5px dashed #CBD5E1',
                    background: '#F8FAFC'
                  }}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎓</div>
                    <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                      Unlock 10%–20% Student Discounts
                    </h4>
                    <p style={{ fontSize: '13.5px', color: '#64748B', maxWidth: '460px', margin: '0 auto 20px', lineHeight: 1.5 }}>
                      Are you a student in need of laptops, scientific calculators, cameras, or development boards for your coursework? Verify your student credentials in under 2 minutes.
                    </p>
                    <button
                      onClick={() => openModal('studentVerify')}
                      className="btn btn-primary"
                    >
                      <GraduationCap size={16} /> Apply for Student Verification
                    </button>
                  </div>
                )}
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

                {/* Profile Photo Uploader */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  padding: '18px',
                  borderRadius: '12px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  marginBottom: '16px'
                }}>
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #E2E8F0' }}
                    />
                  ) : (
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: '#1677FF',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {getInitials(currentUser.name)}
                    </div>
                  )}

                  <div>
                    <input
                      type="file"
                      ref={profilePhotoInputRef}
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          updateProfilePhoto(ev.target.result);
                        };
                        reader.readAsDataURL(file);
                      }}
                      style={{ display: 'none' }}
                    />
                    <button
                      type="button"
                      onClick={() => profilePhotoInputRef.current?.click()}
                      className="btn btn-outline btn-sm"
                    >
                      <Camera size={14} /> Upload Profile Photo
                    </button>
                    <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                      PNG, JPG or WEBP. Upload your real photo for community verification.
                    </div>
                  </div>
                </div>

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
