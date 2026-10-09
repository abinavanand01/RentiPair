import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  PlusCircle,
  Wrench,
  Layers,
  ShieldAlert,
  Menu,
  X,
  ChevronDown,
  Database,
  Box,
  LayoutDashboard,
  CheckCircle2,
  User,
  LogOut,
  Settings,
  CreditCard,
  MessageSquare,
  LogIn,
  UserPlus
} from 'lucide-react';

export default function Navbar() {
  const {
    currentPage,
    navigateTo,
    currentRole,
    setCurrentRole,
    currentUser,
    userCapabilities,
    logout,
    unreadNotifCount,
    openModal,
    showToast
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isTechnician = Boolean(
    userCapabilities?.includes('TECHNICIAN') ||
    currentRole === 'technician'
  );

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleProfileMenuClick = (tab) => {
    setProfileDropdownOpen(false);
    navigateTo('dashboard', { tab });
  };

  const handleLogout = async () => {
    setProfileDropdownOpen(false);
    await logout();
  };

  return (
    <>
      {/* Primary Clean Unified Navbar (~76px height) */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        boxShadow: '0 1px 4px 0 rgba(11, 21, 51, 0.03)',
        transition: 'all 0.2s ease'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px',
          gap: '20px'
        }}>
          {/* LEFT: Brand Container (Logo + Name + Tagline) */}
          <div
            onClick={() => navigateTo('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              userSelect: 'none',
              flexShrink: 0
            }}
          >
            {/* Logo Icon */}
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#0B1533',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(11, 21, 51, 0.15)',
              flexShrink: 0
            }}>
              <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                <path
                  d="M14 24 C14 18, 20 14, 24 18 C28 22, 34 26, 34 20 C34 16, 30 14, 28 14"
                  stroke="#1677FF"
                  strokeWidth="4.2"
                  strokeLinecap="round"
                />
                <path
                  d="M34 24 C34 30, 28 34, 24 30 C20 26, 14 22, 14 28 C14 32, 18 34, 20 34"
                  stroke="#FF7A00"
                  strokeWidth="4.2"
                  strokeLinecap="round"
                />
                <circle cx="24" cy="24" r="3" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Brand Title & Tagline */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', lineHeight: 1.15 }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '21px',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#0B1533'
                }}>
                  Renti<span style={{ color: '#1677FF' }}>Pair</span>
                </span>
                <span style={{
                  background: '#EEF4FF',
                  color: '#1677FF',
                  fontSize: '9.5px',
                  fontWeight: 700,
                  padding: '1.5px 5px',
                  borderRadius: '4px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(22, 119, 255, 0.2)'
                }}>
                  BETA
                </span>
              </div>
              <div style={{
                fontSize: '11px',
                color: '#64748B',
                fontWeight: 500,
                letterSpacing: '0.01em',
                lineHeight: 1.2,
                marginTop: '2px',
                whiteSpace: 'nowrap'
              }}>
                Rent it. Repair it. RentiPair it.
              </div>
            </div>
          </div>

          {/* CENTER: Main Navigation Links (Desktop) */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '6px'
          }} className="desktop-nav-center">
            <button
              onClick={() => navigateTo('rent')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: currentPage === 'rent' ? 700 : 600,
                color: currentPage === 'rent' ? '#1677FF' : '#334155',
                background: currentPage === 'rent' ? '#EEF4FF' : 'transparent',
                fontSize: '14px',
                transition: 'all 0.16s ease'
              }}
            >
              Rent Equipment
            </button>

            <button
              onClick={() => navigateTo('repairs')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: currentPage === 'repairs' ? 700 : 600,
                color: currentPage === 'repairs' ? '#1677FF' : '#334155',
                background: currentPage === 'repairs' ? '#EEF4FF' : 'transparent',
                fontSize: '14px',
                transition: 'all 0.16s ease'
              }}
            >
              Repair Services
            </button>

            <button
              onClick={() => navigateTo('dashboard')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: currentPage === 'dashboard' ? 700 : 600,
                color: currentPage === 'dashboard' ? '#1677FF' : '#334155',
                background: currentPage === 'dashboard' ? '#EEF4FF' : 'transparent',
                fontSize: '14px',
                transition: 'all 0.16s ease'
              }}
            >
              Dashboard
            </button>

            {currentUser?.isAdmin && (
              <button
                onClick={() => navigateTo('admin')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  color: '#DC2626',
                  background: '#FEF2F2',
                  fontSize: '13.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <ShieldAlert size={14} />
                <span>Admin</span>
              </button>
            )}
          </div>

          <style>{`
            @media (min-width: 900px) {
              .desktop-nav-center {
                display: flex !important;
              }
            }
          `}</style>

          {/* RIGHT: Actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            {/* Quick Search Button */}
            <button
              onClick={() => openModal('search')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 12px',
                borderRadius: '999px',
                border: '1.5px solid #E2E8F0',
                background: '#F8FAFC',
                color: '#64748B',
                fontSize: '13px',
                height: '38px',
                transition: 'all 0.15s ease'
              }}
              aria-label="Global Search"
            >
              <Search size={15} />
              <span style={{ display: 'none' }} className="nav-search-label">Search</span>
              <kbd style={{
                background: '#E2E8F0',
                color: '#475569',
                padding: '1px 5px',
                borderRadius: '4px',
                fontSize: '10.5px',
                fontWeight: 700,
                fontFamily: 'monospace'
              }}>
                ⌘K
              </kbd>
            </button>

            <style>{`
              @media (min-width: 1040px) {
                .nav-search-label {
                  display: inline !important;
                }
              }
            `}</style>

            {/* Authenticated State */}
            {currentUser ? (
              <>
                {/* Notifications Bell */}
                <button
                  onClick={() => openModal('notificationDrawer')}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#334155',
                    background: '#FFFFFF',
                    position: 'relative'
                  }}
                  aria-label="Notifications"
                >
                  <Bell size={17} />
                  {unreadNotifCount > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-2px',
                      background: '#EF4444',
                      color: '#FFFFFF',
                      borderRadius: '999px',
                      width: '16px',
                      height: '16px',
                      fontSize: '10px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1.5px solid #FFFFFF'
                    }}>
                      {unreadNotifCount}
                    </span>
                  )}
                </button>

                {/* List Equipment (Secondary Button) */}
                <button
                  onClick={() => openModal('listEquipment')}
                  className="btn btn-outline btn-sm"
                  style={{ display: 'none' }}
                  id="nav-list-btn"
                >
                  <PlusCircle size={14} />
                  <span>List Equipment</span>
                </button>

                {/* User-Aware: Technician Dashboard OR Become Tech */}
                {isTechnician ? (
                  <button
                    onClick={() => navigateTo('dashboard', { tab: 'technician' })}
                    className="btn btn-sm"
                    style={{
                      display: 'none',
                      background: '#FFF5EB',
                      color: '#EA580C',
                      border: '1.5px solid #FDBA74',
                      fontWeight: 700
                    }}
                    id="nav-tech-btn"
                  >
                    <Wrench size={14} color="#EA580C" />
                    <span>Technician Dashboard</span>
                  </button>
                ) : (
                  <button
                    onClick={() => openModal('becomeTechnician')}
                    className="btn btn-orange btn-sm"
                    style={{ display: 'none' }}
                    id="nav-tech-btn"
                  >
                    <Wrench size={14} />
                    <span>Become Tech</span>
                  </button>
                )}

                <style>{`
                  @media (min-width: 1080px) {
                    #nav-list-btn, #nav-tech-btn {
                      display: inline-flex !important;
                    }
                  }
                `}</style>

                {/* User Profile Avatar with Menu */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '3px 8px 3px 3px',
                      borderRadius: '999px',
                      border: '1.5px solid #E2E8F0',
                      background: '#FFFFFF',
                      cursor: 'pointer'
                    }}
                    aria-label="User Profile Menu"
                  >
                    {currentUser.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#0B1533',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1.5px solid #1677FF'
                      }}>
                        {getInitials(currentUser.name)}
                      </div>
                    )}

                    <span style={{
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: '#0B1533',
                      display: 'none'
                    }} className="nav-profile-name">
                      {currentUser.name ? currentUser.name.split(' ')[0] : 'Account'}
                    </span>
                    <ChevronDown size={13} color="#64748B" />
                  </button>

                  <style>{`
                    @media (min-width: 640px) {
                      .nav-profile-name {
                        display: inline !important;
                      }
                    }
                  `}</style>

                  {/* Profile Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      top: '100%',
                      marginTop: '8px',
                      background: '#FFFFFF',
                      color: '#0B1533',
                      borderRadius: '14px',
                      boxShadow: '0 12px 32px rgba(11, 21, 51, 0.15)',
                      border: '1px solid #E2E8F0',
                      width: '260px',
                      padding: '6px',
                      zIndex: 1000
                    }}>
                      {/* User Header */}
                      <div style={{ padding: '10px 12px', borderBottom: '1px solid #F1F5F9' }}>
                        <div style={{ fontWeight: 800, fontSize: '14px', color: '#0B1533' }}>
                          {currentUser.name}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '1px' }}>
                          {currentUser.email}
                        </div>
                        <div style={{
                          marginTop: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: '#059669',
                          background: '#ECFDF5',
                          padding: '2px 7px',
                          borderRadius: '4px'
                        }}>
                          <CheckCircle2 size={11} />
                          <span>{currentUser.city || 'Verified User'}</span>
                        </div>
                      </div>

                      {/* Navigation Links */}
                      <div style={{ padding: '6px 0' }}>
                        <button
                          onClick={() => handleProfileMenuClick('profile')}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            color: '#334155',
                            fontWeight: 500,
                            textAlign: 'left'
                          }}
                        >
                          <User size={15} color="#64748B" />
                          <span>Profile &amp; KYC</span>
                        </button>

                        <button
                          onClick={() => handleProfileMenuClick('rentals')}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            color: '#334155',
                            fontWeight: 500,
                            textAlign: 'left'
                          }}
                        >
                          <Box size={15} color="#64748B" />
                          <span>My Rentals</span>
                        </button>

                        <button
                          onClick={() => handleProfileMenuClick('equipment')}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            color: '#334155',
                            fontWeight: 500,
                            textAlign: 'left'
                          }}
                        >
                          <Layers size={15} color="#64748B" />
                          <span>My Equipment</span>
                        </button>

                        <button
                          onClick={() => handleProfileMenuClick('repairs')}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            color: '#334155',
                            fontWeight: 500,
                            textAlign: 'left'
                          }}
                        >
                          <Wrench size={15} color="#64748B" />
                          <span>Repair Requests</span>
                        </button>

                        {/* Technician Profile Option (Only if started/completed technician onboarding) */}
                        {isTechnician && (
                          <button
                            onClick={() => handleProfileMenuClick('technician')}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              fontSize: '13px',
                              color: '#EA580C',
                              background: '#FFF7ED',
                              fontWeight: 700,
                              textAlign: 'left'
                            }}
                          >
                            <Wrench size={15} color="#EA580C" />
                            <span>Technician Profile</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleProfileMenuClick('messages')}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            color: '#334155',
                            fontWeight: 500,
                            textAlign: 'left'
                          }}
                        >
                          <MessageSquare size={15} color="#64748B" />
                          <span>Messages</span>
                        </button>

                        <button
                          onClick={() => handleProfileMenuClick('payments')}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            color: '#334155',
                            fontWeight: 500,
                            textAlign: 'left'
                          }}
                        >
                          <CreditCard size={15} color="#64748B" />
                          <span>Payments &amp; Escrow</span>
                        </button>

                        <button
                          onClick={() => handleProfileMenuClick('settings')}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            color: '#334155',
                            fontWeight: 500,
                            textAlign: 'left'
                          }}
                        >
                          <Settings size={15} color="#64748B" />
                          <span>Settings</span>
                        </button>
                      </div>

                      {/* Footer: Schema Doc & Logout */}
                      <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '6px', marginTop: '2px' }}>
                        <button
                          onClick={() => { setProfileDropdownOpen(false); openModal('schemaDoc'); }}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '7px 12px',
                            borderRadius: '6px',
                            color: '#64748B',
                            fontSize: '12px',
                            textAlign: 'left'
                          }}
                        >
                          <Database size={13} />
                          <span>Database Schema (10 Tables)</span>
                        </button>

                        <button
                          onClick={handleLogout}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '7px 12px',
                            borderRadius: '6px',
                            color: '#DC2626',
                            fontSize: '13px',
                            fontWeight: 600,
                            textAlign: 'left',
                            marginTop: '2px'
                          }}
                        >
                          <LogOut size={14} color="#DC2626" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Unauthenticated Actions */
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => navigateTo('login')}
                  className="btn btn-outline btn-sm"
                  style={{
                    height: '38px',
                    borderRadius: '8px',
                    fontSize: '13.5px',
                    fontWeight: 600
                  }}
                >
                  <LogIn size={15} />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => navigateTo('signup')}
                  className="btn btn-primary btn-sm"
                  style={{
                    height: '38px',
                    borderRadius: '8px',
                    fontSize: '13.5px',
                    fontWeight: 700
                  }}
                >
                  <UserPlus size={15} />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                color: '#334155'
              }}
              className="mobile-hamburger-btn"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <style>{`
              @media (min-width: 900px) {
                .mobile-hamburger-btn {
                  display: none !important;
                }
              }
            `}</style>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            padding: '16px 20px',
            background: '#FFFFFF',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <button
              onClick={() => { navigateTo('rent'); setMobileMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '8px',
                background: currentPage === 'rent' ? '#EFF6FF' : '#F8FAFC',
                color: currentPage === 'rent' ? '#1677FF' : '#0B1533',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              <Box size={18} color="#1677FF" />
              <span>Rent Equipment</span>
            </button>

            <button
              onClick={() => { navigateTo('repairs'); setMobileMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '8px',
                background: currentPage === 'repairs' ? '#FFF5EB' : '#F8FAFC',
                color: currentPage === 'repairs' ? '#E66A00' : '#0B1533',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              <Wrench size={18} color="#FF7A00" />
              <span>Repair Services</span>
            </button>

            <button
              onClick={() => { navigateTo('dashboard'); setMobileMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '8px',
                background: currentPage === 'dashboard' ? '#EFF6FF' : '#F8FAFC',
                color: currentPage === 'dashboard' ? '#1677FF' : '#0B1533',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              <LayoutDashboard size={18} color="#64748B" />
              <span>User Dashboard</span>
            </button>

            {currentUser ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
                <button
                  onClick={() => { openModal('listEquipment'); setMobileMenuOpen(false); }}
                  className="btn btn-outline"
                  style={{ fontSize: '13px', height: '38px' }}
                >
                  <PlusCircle size={15} /> List Gear
                </button>
                <button
                  onClick={() => {
                    if (isTechnician) {
                      navigateTo('dashboard', { tab: 'technician' });
                    } else {
                      openModal('becomeTechnician');
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-orange"
                  style={{ fontSize: '13px', height: '38px' }}
                >
                  <Wrench size={15} /> {isTechnician ? 'Tech Jobs' : 'Become Tech'}
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
                <button
                  onClick={() => { navigateTo('login'); setMobileMenuOpen(false); }}
                  className="btn btn-outline"
                  style={{ fontSize: '13px', height: '38px' }}
                >
                  <LogIn size={15} /> Log In
                </button>
                <button
                  onClick={() => { navigateTo('signup'); setMobileMenuOpen(false); }}
                  className="btn btn-primary"
                  style={{ fontSize: '13px', height: '38px' }}
                >
                  <UserPlus size={15} /> Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="mobile-bottom-nav">
        <button
          onClick={() => navigateTo('home')}
          className={`mobile-nav-item ${currentPage === 'home' ? 'active' : ''}`}
        >
          <Box size={19} />
          <span>Home</span>
        </button>

        <button
          onClick={() => navigateTo('rent')}
          className={`mobile-nav-item ${currentPage === 'rent' ? 'active' : ''}`}
        >
          <Layers size={19} />
          <span>Rent</span>
        </button>

        <button
          onClick={() => navigateTo('repairs')}
          className={`mobile-nav-item ${currentPage === 'repairs' ? 'repair-active' : ''}`}
        >
          <Wrench size={19} />
          <span>Repair</span>
        </button>

        <button
          onClick={() => openModal('search')}
          className="mobile-nav-item"
        >
          <Search size={19} />
          <span>Search</span>
        </button>

        <button
          onClick={() => navigateTo('dashboard')}
          className={`mobile-nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
        >
          <LayoutDashboard size={19} />
          <span>Account</span>
        </button>
      </div>
    </>
  );
}
