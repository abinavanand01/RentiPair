import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  INITIAL_EQUIPMENT,
  INITIAL_TECHNICIANS,
  INITIAL_RENTAL_ORDERS,
  INITIAL_REPAIR_REQUESTS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';
import { supabase, isSupabaseConfigured, localStorageAuth } from '../lib/supabaseClient';
import { getEquipmentImageUrl } from '../utils/imageFallbacks';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation & Page State ('home', 'rent', 'repairs', 'dashboard', 'admin', 'login', 'signup', 'onboarding')
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState({});

  // Real Supabase Auth State
  const [session, setSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userCapabilities, setUserCapabilities] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);

  // Active Role View Filter for Dashboard: 'user' | 'technician' | 'owner' | 'admin'
  const [currentRole, setCurrentRole] = useState('user');

  // State Collections with LocalStorage fallbacks & Version Migration for High-Res Verified Images
  const [equipment, setEquipment] = useState(() => {
    const version = localStorage.getItem('rentipair_eq_catalog_ver');
    const saved = localStorage.getItem('rentipair_equipment');
    const CURRENT_VERSION = 'v3_verified_highres_catalog';

    if (version === CURRENT_VERSION && saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_EQUIPMENT;
      }
    }

    localStorage.setItem('rentipair_eq_catalog_ver', CURRENT_VERSION);
    localStorage.setItem('rentipair_equipment', JSON.stringify(INITIAL_EQUIPMENT));
    return INITIAL_EQUIPMENT;
  });

  const [technicians, setTechnicians] = useState(() => {
    const saved = localStorage.getItem('rentipair_technicians');
    return saved ? JSON.parse(saved) : INITIAL_TECHNICIANS;
  });

  const [rentals, setRentals] = useState(() => {
    const saved = localStorage.getItem('rentipair_rentals');
    return saved ? JSON.parse(saved) : INITIAL_RENTAL_ORDERS;
  });

  const [repairs, setRepairs] = useState(() => {
    const saved = localStorage.getItem('rentipair_repairs');
    return saved ? JSON.parse(saved) : INITIAL_REPAIR_REQUESTS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('rentipair_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Toast Notification System
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  // Modals Controller
  const [modalState, setModalState] = useState({
    details: { open: false, data: null },
    rent: { open: false, data: null },
    repairRequest: { open: false, initialCategory: null, initialTech: null },
    techProfile: { open: false, data: null },
    listEquipment: { open: false },
    becomeTechnician: { open: false },
    search: { open: false },
    schemaDoc: { open: false },
    forgotPassword: { open: false },
    notificationDrawer: { open: false }
  });

  const openModal = (name, data = null) => {
    setModalState(prev => ({
      ...prev,
      [name]: { open: true, data: data, ...(typeof data === 'object' ? data : {}) }
    }));
  };

  const closeModal = (name) => {
    setModalState(prev => ({
      ...prev,
      [name]: { open: false, data: null }
    }));
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('rentipair_equipment', JSON.stringify(equipment));
  }, [equipment]);

  useEffect(() => {
    localStorage.setItem('rentipair_technicians', JSON.stringify(technicians));
  }, [technicians]);

  useEffect(() => {
    localStorage.setItem('rentipair_rentals', JSON.stringify(rentals));
  }, [rentals]);

  useEffect(() => {
    localStorage.setItem('rentipair_repairs', JSON.stringify(repairs));
  }, [repairs]);

  useEffect(() => {
    localStorage.setItem('rentipair_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Load User Profile & Capabilities from Supabase
  const loadUserData = useCallback(async (userSession) => {
    if (!userSession?.user) {
      setCurrentUser(null);
      setUserCapabilities([]);
      setAuthLoading(false);
      return;
    }

    try {
      const authUser = userSession.user;
      let profile = null;
      let capabilities = ['RENTER'];

      if (isSupabaseConfigured) {
        // Fetch from Supabase tables
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        profile = profileData;

        const { data: capData } = await supabase
          .from('user_capabilities')
          .select('capability')
          .eq('user_id', authUser.id);

        if (capData && capData.length > 0) {
          capabilities = capData.map(c => c.capability);
        }
      } else {
        // Fetch from local client storage shim
        profile = localStorageAuth.getProfile(authUser.id);
        const storedCaps = localStorageAuth.getCapabilities(authUser.id);
        if (storedCaps && storedCaps.length > 0) {
          capabilities = storedCaps;
        }
      }

      const displayName = profile?.full_name || authUser.user_metadata?.full_name || authUser.email.split('@')[0];
      const avatarUrl = profile?.avatar_url || authUser.user_metadata?.avatar_url || '';

      const joinedYear = new Date(authUser.created_at || Date.now()).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });

      setCurrentUser({
        id: authUser.id,
        email: authUser.email,
        name: displayName,
        avatar: avatarUrl,
        phone: profile?.phone || authUser.user_metadata?.phone || '',
        city: profile?.city || authUser.user_metadata?.city || 'Chennai',
        onboardingCompleted: profile?.onboarding_completed || false,
        isAdmin: profile?.is_admin || authUser.email?.includes('admin') || false,
        joinedDate: joinedYear,
        walletBalance: 0
      });

      setUserCapabilities(capabilities);
    } catch (err) {
      console.error('Error loading Supabase profile:', err);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // Initialize Auth Session on Load
  useEffect(() => {
    let mounted = true;

    async function initSession() {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        if (mounted) {
          setSession(initialSession);
          await loadUserData(initialSession);
        }
      } catch (err) {
        console.error('Failed to get session:', err);
        if (mounted) setAuthLoading(false);
      }
    }

    initSession();

    // Listen to real-time auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!mounted) return;
      setSession(currentSession);
      if (currentSession) {
        await loadUserData(currentSession);
      } else {
        setCurrentUser(null);
        setUserCapabilities([]);
        setAuthLoading(false);
      }
    });

    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe?.();
    };
  }, [loadUserData]);

  // Auth Operations
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        throw error;
      }

      setSession(data.session);
      await loadUserData(data.session);

      // Check onboarding state
      let isOnboardingDone = false;
      if (isSupabaseConfigured) {
        const { data: prof } = await supabase
          .from('profiles')
          .select('onboarding_completed')
          .eq('id', data.user.id)
          .single();
        isOnboardingDone = prof?.onboarding_completed;
      } else {
        const prof = localStorageAuth.getProfile(data.user.id);
        isOnboardingDone = prof?.onboarding_completed;
      }

      showToast(`Welcome back, ${data.user.user_metadata?.full_name || data.user.email}!`, 'success');

      if (!isOnboardingDone) {
        navigateTo('onboarding');
      } else {
        navigateTo('dashboard');
      }

      return { success: true };
    } catch (err) {
      showToast(err.message || 'Failed to sign in. Please verify your credentials.', 'error');
      return { success: false, error: err };
    }
  };

  const signup = async ({ fullName, email, password, phone, city }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone || '',
            city: city || 'Chennai',
            avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=0b1533,1677ff`
          }
        }
      });

      if (error) {
        throw error;
      }

      // If user profile row isn't automatically created by trigger, upsert it
      if (data.user) {
        const profilePayload = {
          id: data.user.id,
          user_id: data.user.id,
          full_name: fullName,
          avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=0b1533,1677ff`,
          phone: phone || '',
          city: city || 'Chennai',
          onboarding_completed: false
        };

        if (isSupabaseConfigured) {
          await supabase.from('profiles').upsert(profilePayload);
          await supabase.from('user_capabilities').insert({ user_id: data.user.id, capability: 'RENTER' });
        } else {
          localStorageAuth.saveProfile(data.user.id, profilePayload);
          localStorageAuth.saveCapabilities(data.user.id, ['RENTER']);
        }

        setSession(data.session);
        await loadUserData(data.session);
        showToast('Account created successfully! Welcome to RentiPair.', 'success');
        navigateTo('onboarding');
      }

      return { success: true };
    } catch (err) {
      showToast(err.message || 'Failed to create account.', 'error');
      return { success: false, error: err };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setCurrentUser(null);
      setUserCapabilities([]);
      showToast('You have been logged out successfully.', 'info');
      navigateTo('home');
    } catch (err) {
      showToast('Error during logout', 'error');
    }
  };

  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
      if (error) throw error;
      showToast(`Password reset link sent to ${email}`, 'success');
      return { success: true };
    } catch (err) {
      showToast(err.message || 'Could not send reset link.', 'error');
      return { success: false, error: err };
    }
  };

  // Complete User Onboarding Flow
  const completeOnboarding = async (selectedCapabilities) => {
    if (!currentUser) return;

    try {
      const caps = selectedCapabilities && selectedCapabilities.length > 0
        ? selectedCapabilities
        : ['RENTER'];

      if (isSupabaseConfigured) {
        // Update profile
        await supabase
          .from('profiles')
          .update({ onboarding_completed: true, updated_at: new Date().toISOString() })
          .eq('id', currentUser.id);

        // Clear existing and insert selected capabilities
        await supabase
          .from('user_capabilities')
          .delete()
          .eq('user_id', currentUser.id);

        const rows = caps.map(cap => ({
          user_id: currentUser.id,
          capability: cap
        }));
        await supabase.from('user_capabilities').insert(rows);
      } else {
        localStorageAuth.saveProfile(currentUser.id, { onboarding_completed: true });
        localStorageAuth.saveCapabilities(currentUser.id, caps);
      }

      setUserCapabilities(caps);
      setCurrentUser(prev => prev ? { ...prev, onboardingCompleted: true } : prev);

      // Add a welcome notification
      addNotification({
        title: 'Welcome to RentiPair!',
        message: 'Your preferences are saved. Explore verified rental gear and professional technician services.',
        type: 'general'
      });

      showToast('Preferences saved! Welcome to your personalized dashboard.', 'success');
      navigateTo('dashboard');
    } catch (err) {
      console.error('Error saving onboarding preferences:', err);
      showToast('Could not save preferences, redirecting to dashboard...', 'info');
      navigateTo('dashboard');
    }
  };

  // Add Notification
  const addNotification = (notif) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      time: 'Just now',
      read: false,
      ...notif
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  // Guard Helper for Protected Actions
  const requireAuth = (callback) => {
    if (!currentUser) {
      showToast('Please log in to continue with this action.', 'info');
      navigateTo('login');
      return false;
    }
    if (callback) callback();
    return true;
  };

  // Rental Actions
  const createRentalOrder = (orderData) => {
    if (!currentUser) {
      navigateTo('login');
      return null;
    }

    const newOrder = {
      id: `RNT-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split('T')[0],
      renterId: currentUser.id,
      renterName: currentUser.name,
      status: 'Active',
      ...orderData
    };

    setRentals(prev => [newOrder, ...prev]);

    addNotification({
      title: 'Rental Order Confirmed!',
      message: `Your booking for "${orderData.equipmentTitle}" is confirmed. Deposit ₹${orderData.securityDeposit} safely held in escrow.`,
      type: 'rental',
      link: '/dashboard'
    });

    showToast(`Rental confirmed! Order #${newOrder.id} is now Active.`, 'success');
    return newOrder;
  };

  const updateRentalStatus = (rentalId, newStatus) => {
    setRentals(prev =>
      prev.map(r => r.id === rentalId ? { ...r, status: newStatus } : r)
    );
    showToast(`Rental ${rentalId} status changed to ${newStatus}`, 'info');
  };

  // Repair Actions
  const createRepairBooking = (repairData) => {
    if (!currentUser) {
      navigateTo('login');
      return null;
    }

    const newRepair = {
      id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      createdAt: new Date().toISOString().split('T')[0],
      status: repairData.assignedTechnician ? 'Technician Assigned' : 'Finding Technician',
      ...repairData
    };

    setRepairs(prev => [newRepair, ...prev]);

    addNotification({
      title: 'Repair Request Submitted!',
      message: `We received your repair request for ${newRepair.deviceBrand} ${newRepair.deviceModel}. ${newRepair.assignedTechnician ? `Assigned to ${newRepair.assignedTechnician.name}.` : 'Matching with top verified technicians.'}`,
      type: 'repair',
      link: '/dashboard'
    });

    showToast(`Repair Request #${newRepair.id} submitted successfully!`, 'success');
    return newRepair;
  };

  const updateRepairStatus = (repairId, newStatus) => {
    setRepairs(prev =>
      prev.map(r => r.id === repairId ? { ...r, status: newStatus } : r)
    );
    showToast(`Repair #${repairId} updated to ${newStatus}`, 'info');
  };

  // Equipment Listing & Moderation
  const listEquipment = (itemData) => {
    if (!currentUser) {
      navigateTo('login');
      return null;
    }

    const resolvedImg = getEquipmentImageUrl(itemData);
    const newItem = {
      id: `eq-${Date.now()}`,
      status: 'Pending',
      rating: 5.0,
      reviewsCount: 0,
      isAvailable: true,
      image: itemData.image || resolvedImg,
      image_url: itemData.image_url || itemData.image || resolvedImg,
      images: Array.isArray(itemData.images) && itemData.images.length > 0 ? itemData.images : [itemData.image || resolvedImg],
      owner: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        verified: true,
        memberSince: 'Just now',
        responseTime: '< 15 mins',
        completedRentals: 0,
        rating: 5.0
      },
      ...itemData
    };

    setEquipment(prev => [newItem, ...prev]);

    // Ensure user has EQUIPMENT_OWNER capability
    if (!userCapabilities.includes('EQUIPMENT_OWNER')) {
      const updatedCaps = [...userCapabilities, 'EQUIPMENT_OWNER'];
      setUserCapabilities(updatedCaps);
      if (isSupabaseConfigured) {
        supabase.from('user_capabilities').insert({ user_id: currentUser.id, capability: 'EQUIPMENT_OWNER' });
      } else {
        localStorageAuth.saveCapabilities(currentUser.id, updatedCaps);
      }
    }

    addNotification({
      title: 'Equipment Listing Under Review',
      message: `Your listing "${newItem.title}" has been submitted for moderation. Typically verified within 2-4 hours.`,
      type: 'verification'
    });

    showToast('Listing submitted! It is in pending moderation status.', 'success');
    return newItem;
  };

  const updateEquipmentStatus = (id, newStatus) => {
    setEquipment(prev =>
      prev.map(e => e.id === id ? { ...e, status: newStatus } : e)
    );
    showToast(`Equipment ${newStatus === 'Approved' ? 'Approved & Published' : 'Rejected'}`, 'info');
  };

  // Technician Onboarding & Moderation
  const onboardTechnician = (techData) => {
    const techUserId = currentUser ? currentUser.id : `tech-${Date.now()}`;
    const newTech = {
      id: `tech-${Date.now()}`,
      userId: techUserId,
      rating: 5.0,
      reviewsCount: 0,
      jobsCompleted: 0,
      status: 'Pending',
      verifiedBadges: {
        identityVerified: false,
        skillVerified: false,
        experienceVerified: false
      },
      verificationDocMasked: `Govt ID: ****-****-${Math.floor(1000 + Math.random() * 9000)} | Status: Under Review`,
      reviews: [],
      portfolio: [],
      ...techData
    };

    setTechnicians(prev => [newTech, ...prev]);

    // Add TECHNICIAN capability
    if (currentUser && !userCapabilities.includes('TECHNICIAN')) {
      const updatedCaps = [...userCapabilities, 'TECHNICIAN'];
      setUserCapabilities(updatedCaps);
      if (isSupabaseConfigured) {
        supabase.from('user_capabilities').insert({ user_id: currentUser.id, capability: 'TECHNICIAN' });
      } else {
        localStorageAuth.saveCapabilities(currentUser.id, updatedCaps);
      }
    }

    addNotification({
      title: 'Technician Application Received',
      message: `Application #${newTech.id} is in verification queue. Sensitive identification is securely masked.`,
      type: 'verification'
    });

    showToast('Technician application submitted! Verification Pending.', 'success');
    return newTech;
  };

  const updateTechnicianStatus = (id, newStatus) => {
    setTechnicians(prev =>
      prev.map(t => {
        if (t.id === id) {
          const isApproved = newStatus === 'Approved';
          return {
            ...t,
            status: newStatus,
            verifiedBadges: {
              identityVerified: isApproved,
              skillVerified: isApproved,
              experienceVerified: isApproved
            }
          };
        }
        return t;
      })
    );
    showToast(`Technician ${newStatus === 'Approved' ? 'Verified & Activated' : 'Rejected'}`, 'info');
  };

  // Navigate Helper with Scroll-to-top
  const navigateTo = (page, params = {}) => {
    // Protected route check
    const protectedPages = ['dashboard', 'admin'];
    if (protectedPages.includes(page) && !currentUser && !authLoading) {
      showToast('Please log in to access your dashboard.', 'info');
      setCurrentPage('login');
      setPageParams({ redirectAfterLogin: page, ...params });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentPage,
        pageParams,
        navigateTo,
        session,
        currentUser,
        setCurrentUser,
        userCapabilities,
        authLoading,
        login,
        signup,
        logout,
        resetPassword,
        completeOnboarding,
        requireAuth,
        currentRole,
        setCurrentRole,
        equipment,
        technicians,
        rentals,
        repairs,
        notifications,
        unreadNotifCount,
        modalState,
        openModal,
        closeModal,
        showToast,
        toasts,
        createRentalOrder,
        updateRentalStatus,
        createRepairBooking,
        updateRepairStatus,
        listEquipment,
        updateEquipmentStatus,
        onboardTechnician,
        updateTechnicianStatus,
        markNotificationAsRead,
        markAllNotificationsRead,
        addNotification
      }}
    >
      {children}

      {/* Global Toast Notification Container */}
      <div
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          pointerEvents: 'none'
        }}
      >
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="animate-fade"
            style={{
              pointerEvents: 'auto',
              background: toast.type === 'success' ? '#0F172A' : toast.type === 'error' ? '#991B1B' : '#1E293B',
              color: '#FFFFFF',
              padding: '12px 18px',
              borderRadius: 12,
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 14,
              fontWeight: 500,
              border: toast.type === 'success' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: toast.type === 'success' ? '#10B981' : toast.type === 'error' ? '#EF4444' : '#1677FF'
            }} />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
