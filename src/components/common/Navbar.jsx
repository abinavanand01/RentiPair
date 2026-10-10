import React, { useState, useEffect } from 'react';
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
    unreadMessagesCount,
    openModal,
    showToast
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown on click outside
  useEffect(() => {
    if (!profileDropdownOpen) return;
    const handler = (e) => {
      if (!e.target.closest('.profile-dropdown-zone')) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [profileDropdownOpen]);

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

  const navLinkStyle = (page) => ({
    padding: '8px 16px',
    borderRadius: '10px',
    fontWeight: currentPage === page ? 700 : 600,
    color: currentPage === page ? '#60A5FA' : '#CBD5E1',
    background: currentPage === page ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
    fontSize: '14px',
    transition: 'all 0.18s ease',
    letterSpacing: '-0.01em'
  });

  const iconBtnStyle = {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#CBD5E1',
    background: 'rgba(255, 255, 255, 0.04)',
    position: 'relative',
    cursor: 'pointer',
    transition: 'all 0.18s ease'
  };

  const dropdownItemStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '9px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#CBD5E1',
    fontWeight: 500,
    textAlign: 'left',
    transition: 'all 0.15s ease'
  };

  const notifBadge = (count, color = '#EF4444') => count > 0 && (
    <span style={{
      position: 'absolute',
      top: '-3px',
      right: '-3px',
      background: color,
      color: '#FFFFFF',
      borderRadius: '999px',
      width: '17px',
      height: '17px',
      fontSize: '10px',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid #0A0F24',
      boxShadow: `0 0 8px ${color}40`
    }}>
      {count}
    </span>
  );

  return (
    <>
      {/* Premium Floating Dark Navbar */}
      <header style={{
        position: 'fixed',
        top: scrolled ? '0px' : '12px',
        left: scrolled ? '0px' : '16px',
        right: scrolled ? '0px' : '16px',
        zIndex: 900,
        background: scrolled
          ? 'rgba(10, 15, 36, 0.92)'
          : 'rgba(14, 19, 48, 0.65)',
        backdropFilter: 'blur(24px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
        borderRadius: scrolled ? '0px' : '16px',
        border: scrolled
          ? 'none'
          : '1px solid rgba(255, 255, 255, 0.06)',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.06)' : undefined,
        boxShadow: scrolled
          ? '0 4px 24px rgba(0, 0, 0, 0.4)'
          : '0 8px 32px -4px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
          gap: '20px'
        }}>
          {/* LEFT: Brand */}
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
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0E1330 0%, #151B3B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)',
              flexShrink: 0
            }}>
              <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
                <path
                  d="M14 24 C14 18, 20 14, 24 18 C28 22, 34 26, 34 20 C34 16, 30 14, 28 14"
                  stroke="#3B82F6"
                  strokeWidth="4.2"
                  strokeLinecap="round"
                />
                <path
                  d="M34 24 C34 30, 28 34, 24 30 C20 26, 14 22, 14 28 C14 32, 18 34, 20 34"
                  stroke="#F97316"
                  strokeWidth="4.2"
                  strokeLinecap="round"
                />
                <circle cx="24" cy="24" r="3" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Brand Title */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', lineHeight: 1.15 }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '20px',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#F8FAFC'
                }}>
                  Renti<span style={{ color: '#3B82F6' }}>Pair</span>
                </span>
                <span style={{
                  background: 'rgba(59, 130, 246, 0.15)',
                  color: '#60A5FA',
                  fontSize: '9px',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  BETA
                </span>
              </div>
              <div style={{
                fontSize: '10.5px',
                color: '#64748B',
                fontWeight: 500,
                letterSpacing: '0.02em',
                lineHeight: 1.2,
                marginTop: '2px',
                whiteSpace: 'nowrap'
              }}>
                Rent it. Repair it. RentiPair it.
              </div>
            </div>
          </div>

          {/* CENTER: Navigation Links (Desktop) */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '4px'
          }} className="desktop-nav-center">
            <button
              onClick={() => navigateTo('rent')}
              style={navLinkStyle('rent')}
            >
              Rent Equipment
            </button>

            <button
              onClick={() => navigateTo('repairs')}
              style={navLinkStyle('repairs')}
            >
              Repair Services
            </button>

            <button
              onClick={() => navigateTo('dashboard')}
              style={navLinkStyle('dashboard')}
            >
              Dashboard
            </button>

            {currentUser?.isAdmin && (
              <button
                onClick={() => navigateTo('admin')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  color: '#F87171',
                  background: 'rgba(239, 68, 68, 0.1)',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  border: '1px solid rgba(239, 68, 68, 0.15)'
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
            gap: '8px'
          }}>
            {/* Quick Search Button */}
            <button
              onClick={() => openModal('search')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 14px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 255, 255, 0.04)',
                color: '#94A3B8',
                fontSize: '13px',
                height: '36px',
                transition: 'all 0.18s ease',
                backdropFilter: 'blur(8px)'
              }}
              aria-label="Global Search"
            >
              <Search size={14} />
              <span style={{ display: 'none' }} className="nav-search-label">Search</span>
              <kbd style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#64748B',
                padding: '1px 6px',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: 700,
                fontFamily: 'monospace',
                border: '1px solid rgba(255, 255, 255, 0.06)'
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
                {/* Messages */}
                <button
                  onClick={() => openModal('chat')}
                  style={iconBtnStyle}
                  aria-label="In-App Messages"
                  title="In-App Messages"
                >
                  <MessageSquare size={16} />
                  {notifBadge(unreadMessagesCount, '#3B82F6')}
                </button>

                {/* Notifications Bell */}
                <button
                  onClick={() => openModal('notificationDrawer')}
                  style={iconBtnStyle}
                  aria-label="Notifications"
                >
                  <Bell size={16} />
                  {notifBadge(unreadNotifCount)}
                </button>

                {/* List Equipment */}
                <button
                  onClick={() => openModal('listEquipment')}
                  className="btn btn-outline btn-sm"
                  style={{ display: 'none', height: '36px', borderRadius: '10px' }}
                  id="nav-list-btn"
                >
                  <PlusCircle size={14} />
                  <span>List Equipment</span>
                </button>

                {/* Technician Dashboard OR Become Tech */}
                {isTechnician ? (
                  <button
                    onClick={() => navigateTo('dashboard', { tab: 'technician' })}
                    className="btn btn-sm"
                    style={{
                      display: 'none',
                      background: 'rgba(249, 115, 22, 0.12)',
                      color: '#FB923C',
                      border: '1px solid rgba(249, 115, 22, 0.2)',
                      fontWeight: 700,
                      height: '36px',
                      borderRadius: '10px'
                    }}
                    id="nav-tech-btn"
                  >
                    <Wrench size={14} color="#FB923C" />
                    <span>Tech Dashboard</span>
                  </button>
                ) : (
                  <button
                    onClick={() => openModal('becomeTechnician')}
                    className="btn btn-orange btn-sm"
                    style={{ display: 'none', height: '36px', borderRadius: '10px' }}
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

                {/* User Profile Avatar */}
                <div style={{ position: 'relative' }} className="profile-dropdown-zone">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '3px 8px 3px 3px',
                      borderRadius: '999px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease'
                    }}
                    aria-label="User Profile Menu"
                  >
                    {currentUser.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '1.5px solid rgba(59, 130, 246, 0.3)'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '11px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {getInitials(currentUser.name)}
                      </div>
                    )}

                    <span style={{
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: '#E2E8F0',
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

                  {/* Profile Dropdown */}
                  {profileDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      top: '100%',
                      marginTop: '10px',
                      background: '#0E1330',
                      color: '#E2E8F0',
                      borderRadius: '16px',
                      boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      width: '270px',
                      padding: '6px',
                      zIndex: 1000,
                      animation: 'modalFadeIn 0.2s ease forwards'
                    }}>
                      {/* User Header */}
                      <div style={{
                        padding: '12px 14px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                        marginBottom: '4px'
                      }}>
                        <div style={{ fontWeight: 800, fontSize: '14px', color: '#F8FAFC' }}>
                          {currentUser.name}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                          {currentUser.email}
                        </div>
                        <div style={{
                          marginTop: '8px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: '#34D399',
                          background: 'rgba(16, 185, 129, 0.1)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: '1px solid rgba(16, 185, 129, 0.15)'
                        }}>
                          <CheckCircle2 size={11} />
                          <span>{currentUser.city || 'Verified User'}</span>
                        </div>
                      </div>

                      {/* Navigation Links */}
                      <div style={{ padding: '4px 0' }}>
                        <button onClick={() => handleProfileMenuClick('profile')} style={dropdownItemStyle}>
                          <User size={15} color="#64748B" />
                          <span>Profile & KYC</span>
                        </button>

                        <button onClick={() => handleProfileMenuClick('rentals')} style={dropdownItemStyle}>
                          <Box size={15} color="#64748B" />
                          <span>My Rentals</span>
                        </button>

                        <button onClick={() => handleProfileMenuClick('equipment')} style={dropdownItemStyle}>
                          <Layers size={15} color="#64748B" />
                          <span>My Equipment</span>
                        </button>

                        <button onClick={() => handleProfileMenuClick('repairs')} style={dropdownItemStyle}>
                          <Wrench size={15} color="#64748B" />
                          <span>Repair Requests</span>
                        </button>

                        {isTechnician && (
                          <button
                            onClick={() => handleProfileMenuClick('technician')}
                            style={{
                              ...dropdownItemStyle,
                              color: '#FB923C',
                              background: 'rgba(249, 115, 22, 0.08)',
                              fontWeight: 700,
                              border: '1px solid rgba(249, 115, 22, 0.12)'
                            }}
                          >
                            <Wrench size={15} color="#FB923C" />
                            <span>Technician Profile</span>
                          </button>
                        )}

                        <button onClick={() => handleProfileMenuClick('messages')} style={dropdownItemStyle}>
                          <MessageSquare size={15} color="#64748B" />
                          <span>Messages</span>
                        </button>

                        <button onClick={() => handleProfileMenuClick('payments')} style={dropdownItemStyle}>
                          <CreditCard size={15} color="#64748B" />
                          <span>Payments & Escrow</span>
                        </button>

                        <button onClick={() => handleProfileMenuClick('settings')} style={dropdownItemStyle}>
                          <Settings size={15} color="#64748B" />
                          <span>Settings</span>
                        </button>
                      </div>

                      {/* Footer */}
                      <div style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        paddingTop: '6px',
                        marginTop: '4px'
                      }}>
                        <button
                          onClick={() => { setProfileDropdownOpen(false); openModal('schemaDoc'); }}
                          style={{
                            ...dropdownItemStyle,
                            color: '#64748B',
                            fontSize: '12px',
                            gap: '8px'
                          }}
                        >
                          <Database size={13} />
                          <span>Database Schema (10 Tables)</span>
                        </button>

                        <button
                          onClick={handleLogout}
                          style={{
                            ...dropdownItemStyle,
                            color: '#F87171',
                            fontWeight: 600,
                            marginTop: '2px'
                          }}
                        >
                          <LogOut size={14} color="#F87171" />
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
                    height: '36px',
                    borderRadius: '10px',
                    fontSize: '13px',
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
                    height: '36px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700
                  }}
                >
                  <UserPlus size={15} />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                ...iconBtnStyle,
                color: '#E2E8F0'
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
            background: 'rgba(10, 15, 36, 0.98)',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            borderRadius: '0 0 16px 16px'
          }}>
            <button
              onClick={() => { navigateTo('rent'); setMobileMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: currentPage === 'rent' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                color: currentPage === 'rent' ? '#60A5FA' : '#E2E8F0',
                fontWeight: 600,
                fontSize: '14px',
                border: '1px solid ' + (currentPage === 'rent' ? 'rgba(59, 130, 246, 0.15)' : 'transparent')
              }}
            >
              <Box size={18} color="#3B82F6" />
              <span>Rent Equipment</span>
            </button>

            <button
              onClick={() => { navigateTo('repairs'); setMobileMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: currentPage === 'repairs' ? 'rgba(249, 115, 22, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                color: currentPage === 'repairs' ? '#FB923C' : '#E2E8F0',
                fontWeight: 600,
                fontSize: '14px',
                border: '1px solid ' + (currentPage === 'repairs' ? 'rgba(249, 115, 22, 0.15)' : 'transparent')
              }}
            >
              <Wrench size={18} color="#F97316" />
              <span>Repair Services</span>
            </button>

            <button
              onClick={() => { navigateTo('dashboard'); setMobileMenuOpen(false); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: currentPage === 'dashboard' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                color: currentPage === 'dashboard' ? '#60A5FA' : '#E2E8F0',
                fontWeight: 600,
                fontSize: '14px',
                border: '1px solid ' + (currentPage === 'dashboard' ? 'rgba(59, 130, 246, 0.15)' : 'transparent')
              }}
            >
              <LayoutDashboard size={18} color="#64748B" />
              <span>User Dashboard</span>
            </button>

            {currentUser ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                <button
                  onClick={() => { openModal('listEquipment'); setMobileMenuOpen(false); }}
                  className="btn btn-outline"
                  style={{ fontSize: '13px', height: '40px', borderRadius: '12px' }}
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
                  style={{ fontSize: '13px', height: '40px', borderRadius: '12px' }}
                >
                  <Wrench size={15} /> {isTechnician ? 'Tech Jobs' : 'Become Tech'}
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                <button
                  onClick={() => { navigateTo('login'); setMobileMenuOpen(false); }}
                  className="btn btn-outline"
                  style={{ fontSize: '13px', height: '40px', borderRadius: '12px' }}
                >
                  <LogIn size={15} /> Log In
                </button>
                <button
                  onClick={() => { navigateTo('signup'); setMobileMenuOpen(false); }}
                  className="btn btn-primary"
                  style={{ fontSize: '13px', height: '40px', borderRadius: '12px' }}
                >
                  <UserPlus size={15} /> Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Spacer for fixed navbar */}
      <div style={{ height: '92px' }} />

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
