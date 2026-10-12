import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  INITIAL_EQUIPMENT,
  INITIAL_TECHNICIANS,
  INITIAL_RENTAL_ORDERS,
  INITIAL_REPAIR_REQUESTS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';
import { supabase, isSupabaseConfigured, localStorageAuth } from '../lib/supabaseClient';
import {
  uploadEquipmentImage,
  uploadProfileAvatar,
  uploadTechnicianPortfolio,
  uploadTechnicianVerificationDoc
} from '../lib/storageHelper';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation & Page State ('home', 'rent', 'repairs', 'dashboard', 'admin', 'login', 'signup', 'onboarding')
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState({});

  // Intended Destination after login (e.g. { modal: 'listEquipment' } or { modal: 'becomeTechnician' })
  const [intendedDestination, setIntendedDestination] = useState(null);

  // Real Supabase Auth State
  const [session, setSession] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userCapabilities, setUserCapabilities] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);

  // Active Role View Filter for Dashboard: 'user' | 'technician' | 'owner' | 'admin'
  const [currentRole, setCurrentRole] = useState('user');

  // Helper to filter out legacy demo data
  const isRealItem = (item) => {
    if (!item) return false;
    const isDemoId = typeof item.id === 'string' && (item.id.startsWith('eq-10') || item.id.startsWith('eq-11') || item.id.startsWith('eq-12') || item.id.startsWith('tech-30') || item.id.startsWith('RNT-90') || item.id.startsWith('RNT-88') || item.id.startsWith('REP-40') || item.id.startsWith('REP-39'));
    const isDemoName = item.owner?.name === 'Karthik Subramanian' || item.renterName === 'Aditya Narayan' || item.name === 'Rajesh Kannan';
    return !isDemoId && !isDemoName;
  };

  // State Collections — 100% data-driven from real user actions and Supabase
  const [equipment, setEquipment] = useState(() => {
    try {
      const saved = localStorage.getItem('rentipair_equipment');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed.filter(isRealItem) : [];
      }
    } catch {
      // ignore
    }
    return INITIAL_EQUIPMENT;
  });

  const [technicians, setTechnicians] = useState(() => {
    try {
      const saved = localStorage.getItem('rentipair_technicians');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed.filter(isRealItem) : [];
      }
    } catch {
      // ignore
    }
    return INITIAL_TECHNICIANS;
  });

  const [rentals, setRentals] = useState(() => {
    try {
      const saved = localStorage.getItem('rentipair_rentals');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed.filter(isRealItem) : [];
      }
    } catch {
      // ignore
    }
    return INITIAL_RENTAL_ORDERS;
  });

  const [repairs, setRepairs] = useState(() => {
    try {
      const saved = localStorage.getItem('rentipair_repairs');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed.filter(isRealItem) : [];
      }
    } catch {
      // ignore
    }
    return INITIAL_REPAIR_REQUESTS;
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('rentipair_notifications');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed.filter(n => !n.id?.startsWith('notif-1') && !n.id?.startsWith('notif-2')) : [];
      }
    } catch {
      // ignore
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Purge legacy storage keys on boot
  useEffect(() => {
    try {
      localStorage.removeItem('rentipair_eq_catalog_ver');
    } catch {
      // ignore
    }
  }, []);

  // Toast Notification System
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  // Wishlist State (equipment IDs)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('rentipair_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Compare Gadgets State (equipment items array, max 4)
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('rentipair_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Availability Alerts State
  const [availabilityAlerts, setAvailabilityAlerts] = useState(() => {
    try {
      const saved = localStorage.getItem('rentipair_availability_alerts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // In-App Chat Conversations & Messages State
  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem('rentipair_conversations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('rentipair_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeConversation, setActiveConversation] = useState(null);

  // Referrals State
  const [referrals, setReferrals] = useState(() => {
    try {
      const saved = localStorage.getItem('rentipair_referrals');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Student Verifications State
  const [studentVerifications, setStudentVerifications] = useState(() => {
    try {
      const saved = localStorage.getItem('rentipair_student_verifications');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync new state collections to local storage
  useEffect(() => {
    localStorage.setItem('rentipair_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('rentipair_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('rentipair_availability_alerts', JSON.stringify(availabilityAlerts));
  }, [availabilityAlerts]);

  useEffect(() => {
    localStorage.setItem('rentipair_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('rentipair_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('rentipair_referrals', JSON.stringify(referrals));
  }, [referrals]);

  useEffect(() => {
    localStorage.setItem('rentipair_student_verifications', JSON.stringify(studentVerifications));
  }, [studentVerifications]);

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
    notificationDrawer: { open: false },
    compare: { open: false },
    chat: { open: false, data: null },
    studentVerify: { open: false }
  });

  const openModal = (name, data = null) => {
    // Require Login Before Adding Equipment
    if (name === 'listEquipment' && !currentUser) {
      showToast('Please log in before listing equipment.', 'info');
      setIntendedDestination({ modal: 'listEquipment', data });
      navigateTo('login');
      return;
    }

    // Require Login Before Becoming a Technician
    if (name === 'becomeTechnician' && !currentUser) {
      showToast('Please log in before applying as a technician.', 'info');
      setIntendedDestination({ modal: 'becomeTechnician', data });
      navigateTo('login');
      return;
    }

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

  // Load Remote Data from Supabase when available
  useEffect(() => {
    async function loadRemoteData() {
      if (isSupabaseConfigured) {
        try {
          const { data: eqData } = await supabase.from('equipment').select('*');
          if (eqData && eqData.length > 0) {
            setEquipment(eqData.map(e => ({
              ...e,
              title: e.name || e.title,
              dailyRate: Number(e.price_per_day || e.dailyRate),
              securityDeposit: Number(e.security_deposit || e.securityDeposit || 0),
              image: (e.images && e.images[0]) || e.image || '',
              images: e.images || [e.image].filter(Boolean),
              isAvailable: e.is_available ?? e.isAvailable ?? true,
              status: e.status === 'APPROVED' ? 'Approved' : e.status === 'PENDING' ? 'Pending' : e.status
            })));
          }

          const { data: techData } = await supabase.from('technicians').select('*, profiles(*)');
          if (techData && techData.length > 0) {
            setTechnicians(techData.map(t => ({
              ...t,
              name: t.profiles?.full_name || t.name,
              avatar: t.profiles?.avatar_url || t.avatar || '',
              status: t.verification_status === 'VERIFIED' ? 'Approved' : 'Pending',
              yearsExperience: t.experience_years || t.yearsExperience || 0,
              serviceArea: t.service_area || t.serviceArea || '',
              categories: t.categories || []
            })));
          }

          const { data: rentData } = await supabase.from('rentals').select('*');
          if (rentData && rentData.length > 0) {
            setRentals(rentData);
          }

          const { data: repData } = await supabase.from('repair_requests').select('*');
          if (repData && repData.length > 0) {
            setRepairs(repData);
          }
        } catch (err) {
          console.error('Error fetching data from Supabase:', err);
        }
      }
    }

    loadRemoteData();
  }, []);

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

      // User's permanent referral code
      const defaultRefCode = `${displayName.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 6) || 'USER'}-RP26`;
      const userRefCode = profile?.referral_code || authUser.user_metadata?.referral_code || defaultRefCode;

      // Student verification status check
      const studentRec = studentVerifications.find(s => s.userId === authUser.id && s.status === 'VERIFIED');
      const isStudentVerified = Boolean(studentRec || profile?.is_student_verified);

      // Referral rewards balance
      const qualifiedRefs = referrals.filter(r => r.referrerId === authUser.id && (r.status === 'QUALIFIED' || r.status === 'REWARDED')).length;
      const walletCredits = qualifiedRefs * 100;

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
        referralCode: userRefCode,
        isStudentVerified,
        studentInstitution: studentRec?.institutionName || profile?.institution_name || '',
        walletBalance: walletCredits
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

      // Preserve and continue to intended destination if user clicked List Equipment / Become Tech
      if (intendedDestination) {
        const dest = intendedDestination;
        setIntendedDestination(null);
        if (dest.modal) {
          openModal(dest.modal, dest.data);
        } else if (dest.page) {
          navigateTo(dest.page, dest.params);
        }
      } else if (!isOnboardingDone) {
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

  const signup = async ({ fullName, email, password, phone, city, avatarUrl = '' }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone || '',
            city: city || 'Chennai',
            avatar_url: avatarUrl || ''
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        const profilePayload = {
          id: data.user.id,
          user_id: data.user.id,
          full_name: fullName,
          avatar_url: avatarUrl || '',
          phone: phone || '',
          city: city || 'Chennai',
          onboarding_completed: false,
          is_admin: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        if (isSupabaseConfigured) {
          await supabase.from('profiles').upsert(profilePayload);
          await supabase.from('user_capabilities').insert({ user_id: data.user.id, capability: 'RENTER' });
        } else {
          localStorageAuth.saveProfile(data.user.id, profilePayload);
          localStorageAuth.saveCapabilities(data.user.id, ['RENTER']);
        }

        // Handle Email Verification if enabled on Supabase
        if (!data.session) {
          showToast('Account created! Please check your email to verify your registration before logging in.', 'info');
          navigateTo('login');
          return { success: true };
        }

        setSession(data.session);
        await loadUserData(data.session);
        showToast('Account created successfully! Welcome to RentiPair.', 'success');

        if (intendedDestination) {
          const dest = intendedDestination;
          setIntendedDestination(null);
          if (dest.modal) {
            openModal(dest.modal, dest.data);
          } else if (dest.page) {
            navigateTo(dest.page, dest.params);
          }
        } else {
          navigateTo('onboarding');
        }
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
      setIntendedDestination(null);
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

  const updateProfilePhoto = async (newAvatarUrl) => {
    if (!currentUser) return;
    try {
      setCurrentUser(prev => ({ ...prev, avatar: newAvatarUrl }));
      if (isSupabaseConfigured) {
        await supabase.from('profiles').update({ avatar_url: newAvatarUrl }).eq('id', currentUser.id);
      } else {
        localStorageAuth.saveProfile(currentUser.id, { avatar_url: newAvatarUrl });
      }
      showToast('Profile photo updated successfully!', 'success');
    } catch (err) {
      showToast('Failed to update profile photo.', 'error');
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
        await supabase
          .from('profiles')
          .update({ onboarding_completed: true, updated_at: new Date().toISOString() })
          .eq('id', currentUser.id);

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

      addNotification({
        title: 'Welcome to RentiPair!',
        message: 'Your profile is ready. You can now list equipment or book verified services.',
        type: 'general'
      });

      showToast('Preferences saved! Welcome to your dashboard.', 'success');
      navigateTo('dashboard');
    } catch (err) {
      console.error('Error saving onboarding preferences:', err);
      navigateTo('dashboard');
    }
  };

  // Notifications
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

  // Guard Helper
  const requireAuth = (callback) => {
    if (!currentUser) {
      showToast('Please log in to continue.', 'info');
      navigateTo('login');
      return false;
    }
    if (callback) callback();
    return true;
  };

  // Equipment Listing (Mandatory real image validation, stored in Supabase)
  const listEquipment = async (itemData) => {
    if (!currentUser) {
      showToast('Please log in to list equipment.', 'info');
      setIntendedDestination({ modal: 'listEquipment' });
      navigateTo('login');
      return null;
    }

    let uploadedImages = [];

    // If actual File objects were provided, upload them to Supabase Storage
    if (Array.isArray(itemData.fileObjects) && itemData.fileObjects.length > 0) {
      try {
        const uploadPromises = itemData.fileObjects.map(file =>
          uploadEquipmentImage(file, currentUser.id)
        );
        uploadedImages = await Promise.all(uploadPromises);
      } catch (uploadErr) {
        showToast(uploadErr.message || 'Image upload failed. Please try again.', 'error');
        return null;
      }
    } else if (Array.isArray(itemData.images) && itemData.images.length > 0) {
      uploadedImages = itemData.images;
    } else if (itemData.image) {
      uploadedImages = [itemData.image];
    }

    // Product Image Rule: Must have at least one uploaded photo
    if (uploadedImages.length === 0) {
      showToast('Please upload at least one photo of your equipment.', 'error');
      return null;
    }

    const newItem = {
      id: `eq-${Date.now()}`,
      title: itemData.title,
      name: itemData.title,
      category: itemData.category,
      brand: itemData.brand || '',
      model: itemData.model || '',
      description: itemData.description || '',
      condition: itemData.condition || 'Good',
      dailyRate: Number(itemData.dailyRate),
      price_per_day: Number(itemData.dailyRate),
      securityDeposit: Number(itemData.securityDeposit || 0),
      security_deposit: Number(itemData.securityDeposit || 0),
      location: itemData.location || itemData.pickupLocation || '',
      city: itemData.city || 'Chennai',
      deliveryAvailable: itemData.deliveryAvailable ?? true,
      pickupAvailable: itemData.pickupAvailable ?? true,
      specs: itemData.specs || {},
      rentalRules: itemData.rentalRules || [],
      rent_to_buy_enabled: Boolean(itemData.rentToBuyEnabled || itemData.rent_to_buy_enabled),
      purchase_price: itemData.purchasePrice || itemData.purchase_price || null,
      rent_to_buy_terms: itemData.rentToBuyTerms || itemData.rent_to_buy_terms || null,
      student_discount_enabled: Boolean(itemData.studentDiscountEnabled || itemData.student_discount_enabled),
      student_discount_percent: itemData.studentDiscountPercent || itemData.student_discount_percent || 10,
      status: 'Approved', // Default active in marketplace
      rating: 0,
      reviewsCount: 0,
      isAvailable: true,
      image: uploadedImages[0],
      image_url: uploadedImages[0],
      images: uploadedImages,
      owner: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar || '',
        verified: true,
        memberSince: 'Today',
        responseTime: '< 15 mins',
        completedRentals: 0,
        rating: 0
      }
    };

    // Save to Supabase
    if (isSupabaseConfigured) {
      try {
        const { data: dbItem, error: insertError } = await supabase.from('equipment').insert([{
          owner_id: currentUser.id,
          name: newItem.title,
          category: newItem.category,
          brand: newItem.brand,
          model: newItem.model,
          description: newItem.description,
          condition: newItem.condition,
          price_per_day: newItem.dailyRate,
          security_deposit: newItem.securityDeposit,
          location: newItem.location,
          city: newItem.city,
          images: newItem.images,
          status: 'APPROVED',
          is_available: true,
          rent_to_buy_enabled: newItem.rent_to_buy_enabled,
          purchase_price: newItem.purchase_price,
          rent_to_buy_terms: newItem.rent_to_buy_terms,
          student_discount_enabled: newItem.student_discount_enabled,
          student_discount_percent: newItem.student_discount_percent
        }]).select().single();

        if (insertError) {
          throw insertError;
        }

        if (dbItem?.id) {
          newItem.id = dbItem.id;
        }
      } catch (err) {
        console.error('Supabase equipment insert error:', err);
        showToast(err.message || 'Failed to save listing to database.', 'error');
        return null;
      }
    } else {
      supabase.from('equipment').insert([newItem]);
    }

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
      title: 'Equipment Listing Published',
      message: `Your equipment "${newItem.title}" is now active in the marketplace!`,
      type: 'general'
    });

    showToast('Equipment listed successfully!', 'success');
    return newItem;
  };

  const deleteEquipment = async (id) => {
    setEquipment(prev => prev.filter(e => e.id !== id));
    if (isSupabaseConfigured) {
      await supabase.from('equipment').delete().eq('id', id);
    } else {
      supabase.from('equipment').delete().eq('id', id);
    }
    showToast('Equipment listing removed.', 'info');
  };

  const updateEquipmentStatus = async (id, newStatus) => {
    setEquipment(prev =>
      prev.map(e => e.id === id ? { ...e, status: newStatus } : e)
    );
    if (isSupabaseConfigured) {
      await supabase.from('equipment').update({ status: newStatus.toUpperCase() }).eq('id', id);
    } else {
      supabase.from('equipment').update({ status: newStatus }).eq('id', id);
    }
    showToast(`Equipment status updated to ${newStatus}`, 'info');
  };

  // Technician Onboarding & Moderation
  const onboardTechnician = async (techData) => {
    if (!currentUser) {
      showToast('Please log in before applying as a technician.', 'info');
      setIntendedDestination({ modal: 'becomeTechnician' });
      navigateTo('login');
      return null;
    }

    let avatarUrl = techData.avatar || currentUser.avatar || '';
    if (techData.avatarFile) {
      try {
        avatarUrl = await uploadProfileAvatar(techData.avatarFile, currentUser.id);
      } catch (err) {
        console.warn('Avatar upload fallback:', err);
      }
    }

    let portfolioUrls = techData.portfolio || [];
    if (Array.isArray(techData.portfolioFiles) && techData.portfolioFiles.length > 0) {
      try {
        const uploadPromises = techData.portfolioFiles.map(file =>
          uploadTechnicianPortfolio(file, currentUser.id)
        );
        portfolioUrls = await Promise.all(uploadPromises);
      } catch (err) {
        console.warn('Portfolio upload fallback:', err);
      }
    }

    let verificationDocPath = '';
    if (techData.verificationDocFile) {
      try {
        verificationDocPath = await uploadTechnicianVerificationDoc(techData.verificationDocFile, currentUser.id);
      } catch (err) {
        console.warn('Verification doc upload fallback:', err);
      }
    }

    // Set initial status to Pending / PENDING for admin review
    const newTech = {
      id: `tech-${Date.now()}`,
      userId: currentUser.id,
      name: techData.name || currentUser.name,
      avatar: avatarUrl,
      title: techData.title || techData.specialization || 'Electronics Repair Specialist',
      specialization: techData.specialization || techData.title || 'Electronics Repair Specialist',
      rating: 5.0,
      reviewsCount: 0,
      jobsCompleted: 0,
      status: 'Pending', // PENDING for admin verification
      verification_status: 'PENDING',
      yearsExperience: Number(techData.yearsExperience || 0),
      baseRate: Number(techData.baseRate || 399),
      serviceArea: techData.serviceArea || techData.city || 'Chennai',
      city: techData.city || 'Chennai',
      categories: Array.isArray(techData.categories) && techData.categories.length > 0 ? techData.categories : ['Electronics Repair'],
      verifiedBadges: {
        identityVerified: false,
        skillVerified: false,
        experienceVerified: false
      },
      verificationDocMasked: techData.idNumberMasked ? `${techData.idType || 'Govt ID'}: ${techData.idNumberMasked}` : (techData.verificationDocMasked || 'Govt ID Provided - Pending Review'),
      verificationDocPath: verificationDocPath,
      reviews: [],
      portfolio: portfolioUrls,
      bio: techData.bio || `${techData.specialization || 'Technician'}. ${techData.yearsExperience || 0} years experience.`,
      ...techData
    };

    if (isSupabaseConfigured) {
      try {
        const { data: techRow, error: techError } = await supabase.from('technicians').upsert([{
          user_id: currentUser.id,
          bio: newTech.bio || '',
          experience_years: Number(newTech.yearsExperience || 0),
          service_area: newTech.serviceArea || '',
          city: newTech.city || 'Chennai',
          verification_status: 'PENDING',
          rating: 5.0,
          completed_jobs: 0
        }], { onConflict: 'user_id' }).select().single();

        if (techError) {
          throw techError;
        }

        if (techRow?.id) {
          newTech.id = techRow.id;
          // Insert verification document record
          await supabase.from('technician_verifications').insert([{
            technician_id: techRow.id,
            verification_type: techData.idType || 'GOVT_ID',
            status: 'PENDING',
            document_path: verificationDocPath || 'secure_id',
            document_masked_preview: newTech.verificationDocMasked
          }]);

          // Insert services
          if (Array.isArray(newTech.categories)) {
            const srvRows = newTech.categories.map(c => ({
              technician_id: techRow.id,
              service_name: c,
              category: c,
              price: newTech.baseRate || 399
            }));
            await supabase.from('technician_services').insert(srvRows);
          }
        }
      } catch (err) {
        console.error('Supabase technician insert error:', err);
        showToast(err.message || 'Failed to submit technician application', 'error');
        return null;
      }
    } else {
      supabase.from('technicians').insert([newTech]);
    }

    // Update or add technician in state (avoid duplicates)
    setTechnicians(prev => {
      const filtered = prev.filter(t => t.userId !== currentUser.id && t.id !== newTech.id);
      return [newTech, ...filtered];
    });

    // Add TECHNICIAN capability
    if (!userCapabilities.includes('TECHNICIAN')) {
      const updatedCaps = [...userCapabilities, 'TECHNICIAN'];
      setUserCapabilities(updatedCaps);
      if (isSupabaseConfigured) {
        supabase.from('user_capabilities').insert({ user_id: currentUser.id, capability: 'TECHNICIAN' });
      } else {
        localStorageAuth.saveCapabilities(currentUser.id, updatedCaps);
      }
    }

    addNotification({
      title: 'Technician Application Submitted',
      message: 'Your application has been received and is currently under admin verification.',
      type: 'verification'
    });

    showToast('Application submitted! Our admin team will review your verification details.', 'success');
    return newTech;
  };

  const updateTechnicianStatus = async (id, newStatus) => {
    setTechnicians(prev =>
      prev.map(t => t.id === id ? { ...t, status: newStatus } : t)
    );
    if (isSupabaseConfigured) {
      await supabase.from('technicians').update({ verification_status: newStatus === 'Approved' ? 'VERIFIED' : 'REJECTED' }).eq('id', id);
    } else {
      supabase.from('technicians').update({ status: newStatus }).eq('id', id);
    }
    showToast(`Technician ${newStatus === 'Approved' ? 'Verified' : 'Rejected'}`, 'info');
  };

  // Rental Actions
  const createRentalOrder = async (orderData) => {
    if (!currentUser) {
      navigateTo('login');
      return null;
    }

    const targetEqId = orderData.equipment?.id || orderData.equipmentId;
    const reqStart = orderData.startDate || new Date().toISOString().split('T')[0];
    const reqEnd = orderData.endDate || new Date(Date.now() + 86400000 * (orderData.durationDays || 3)).toISOString().split('T')[0];

    // Smart Availability Check: Prevent overlapping reservations for the same equipment
    const isOverlapping = rentals.some(r =>
      (r.equipmentId === targetEqId || r.equipment?.id === targetEqId) &&
      r.status === 'Active' &&
      !(reqEnd < r.startDate || reqStart > r.endDate)
    );

    if (isOverlapping) {
      showToast('This equipment is already reserved for overlapping dates. Please select other dates.', 'error');
      return null;
    }

    const newOrder = {
      id: `RNT-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split('T')[0],
      renterId: currentUser.id,
      renterName: currentUser.name,
      status: 'Active',
      startDate: reqStart,
      endDate: reqEnd,
      equipmentId: targetEqId,
      damageProtectionSelected: Boolean(orderData.damageProtectionSelected),
      damageProtectionFee: orderData.damageProtectionFee || 0,
      isRentToBuy: Boolean(orderData.isRentToBuy),
      studentDiscountApplied: orderData.studentDiscountApplied || 0,
      ...orderData
    };

    setRentals(prev => [newOrder, ...prev]);

    // Update equipment availability state
    setEquipment(prev => prev.map(e => e.id === targetEqId ? {
      ...e,
      isAvailable: false,
      currentlyRentedUntil: reqEnd
    } : e));

    if (isSupabaseConfigured) {
      try {
        await supabase.from('rentals').insert([{
          renter_id: currentUser.id,
          equipment_id: targetEqId,
          start_date: reqStart,
          end_date: reqEnd,
          rental_price: orderData.rentalFee || 0,
          deposit: orderData.securityDeposit || 0,
          damage_protection_selected: Boolean(orderData.damageProtectionSelected),
          damage_protection_fee: orderData.damageProtectionFee || 0,
          is_rent_to_buy: Boolean(orderData.isRentToBuy),
          student_discount_applied: orderData.studentDiscountApplied || 0,
          status: 'ACTIVE'
        }]);
      } catch (err) {
        console.error('Supabase rental insert error:', err);
      }
    } else {
      supabase.from('rentals').insert([newOrder]);
    }

    // Check if this user was referred by another user - qualify referral on first rental!
    const pendingRef = referrals.find(r => r.referredUserId === currentUser.id && r.status === 'REGISTERED');
    if (pendingRef) {
      setReferrals(prev => prev.map(r => r.id === pendingRef.id ? { ...r, status: 'QUALIFIED', qualifiedAt: new Date().toISOString() } : r));
      addNotification({
        userId: pendingRef.referrerId,
        title: '🎉 Referral Reward Unlocked!',
        message: 'Your referred friend completed their first rental. ₹100 credit has been added to your balance!',
        type: 'referral'
      });
    }

    addNotification({
      title: 'Rental Booking Confirmed!',
      message: `Your rental for "${orderData.equipmentTitle}" is active. Deposit ₹${orderData.securityDeposit} safely secured in escrow.`,
      type: 'rental'
    });

    showToast(`Rental confirmed! Order #${newOrder.id} is active.`, 'success');
    return newOrder;
  };

  const updateRentalStatus = async (rentalId, newStatus) => {
    setRentals(prev =>
      prev.map(r => r.id === rentalId ? { ...r, status: newStatus } : r)
    );

    const rental = rentals.find(r => r.id === rentalId);
    if (rental && (newStatus === 'Completed' || newStatus === 'Returned')) {
      const eqId = rental.equipmentId || rental.equipment?.id;
      // Mark equipment as available again
      setEquipment(prev => prev.map(e => e.id === eqId ? { ...e, isAvailable: true, currentlyRentedUntil: null } : e));

      // Trigger Availability Alerts to subscribers!
      const activeAlerts = availabilityAlerts.filter(a => a.equipmentId === eqId && a.status === 'ACTIVE');
      if (activeAlerts.length > 0) {
        const item = equipment.find(e => e.id === eqId);
        activeAlerts.forEach(alert => {
          addNotification({
            userId: alert.userId,
            title: 'Equipment Now Available! 🔔',
            message: `Good news! "${item?.title || 'Equipment'}" has been returned and is now available for rental.`,
            type: 'availability'
          });
        });

        setAvailabilityAlerts(prev => prev.map(a => a.equipmentId === eqId ? {
          ...a,
          status: 'NOTIFIED',
          notifiedAt: new Date().toISOString()
        } : a));
      }
    }

    if (isSupabaseConfigured) {
      await supabase.from('rentals').update({ status: newStatus.toUpperCase() }).eq('id', rentalId);
    } else {
      supabase.from('rentals').update({ status: newStatus }).eq('id', rentalId);
    }
    showToast(`Rental #${rentalId} status: ${newStatus}`, 'info');
  };

  // =========================================================================
  // Wishlist Methods
  // =========================================================================
  const toggleWishlist = (equipmentId) => {
    if (!currentUser) {
      requireAuth();
      return;
    }

    setWishlist(prev => {
      const exists = prev.includes(equipmentId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== equipmentId);
      } else {
        showToast('Saved to wishlist ♡', 'success');
        addNotification({
          title: 'Saved to Wishlist',
          message: 'Equipment saved to your favorites list.',
          type: 'wishlist'
        });
        return [...prev, equipmentId];
      }
    });

    if (isSupabaseConfigured) {
      const exists = wishlist.includes(equipmentId);
      if (exists) {
        supabase.from('wishlists').delete().eq('equipment_id', equipmentId).eq('user_id', currentUser.id);
      } else {
        supabase.from('wishlists').insert([{ user_id: currentUser.id, equipment_id: equipmentId }]);
      }
    }
  };

  const isInWishlist = (equipmentId) => wishlist.includes(equipmentId);

  // =========================================================================
  // Compare Gadgets Methods (Max 4 items)
  // =========================================================================
  const addToCompare = (item) => {
    if (!item) return;
    if (compareList.some(c => c.id === item.id)) {
      showToast('Item is already in your comparison dock.', 'info');
      return;
    }
    if (compareList.length >= 4) {
      showToast('You can compare a maximum of 4 items at once.', 'warning');
      return;
    }
    setCompareList(prev => [...prev, item]);
    showToast(`Added ${item.title} to comparison (+ Compare)`, 'success');
  };

  const removeFromCompare = (itemId) => {
    setCompareList(prev => prev.filter(c => c.id !== itemId));
    showToast('Removed from comparison', 'info');
  };

  const clearCompare = () => {
    setCompareList([]);
    showToast('Comparison cleared', 'info');
  };

  const isInCompare = (itemId) => compareList.some(c => c.id === itemId);

  // =========================================================================
  // Availability Alerts Methods
  // =========================================================================
  const subscribeAvailabilityAlert = (equipmentId) => {
    if (!currentUser) {
      requireAuth();
      return;
    }

    const alreadySubscribed = availabilityAlerts.some(
      a => a.userId === currentUser.id && a.equipmentId === equipmentId && a.status === 'ACTIVE'
    );

    if (alreadySubscribed) {
      showToast('You are already subscribed to alerts for this gear.', 'info');
      return;
    }

    const newAlert = {
      id: `al-${Date.now()}`,
      userId: currentUser.id,
      equipmentId,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };

    setAvailabilityAlerts(prev => [newAlert, ...prev]);

    if (isSupabaseConfigured) {
      supabase.from('availability_alerts').insert([{
        user_id: currentUser.id,
        equipment_id: equipmentId,
        status: 'ACTIVE'
      }]);
    }

    addNotification({
      title: 'Availability Alert Set 🔔',
      message: 'We will notify you immediately when this equipment is returned and ready.',
      type: 'alert'
    });

    showToast('Alert set! We will notify you when this item is available.', 'success');
  };

  const isAlertSubscribed = (equipmentId) => {
    return Boolean(currentUser && availabilityAlerts.some(
      a => a.userId === currentUser.id && a.equipmentId === equipmentId && a.status === 'ACTIVE'
    ));
  };

  // =========================================================================
  // In-App Chat & Messaging Methods
  // =========================================================================
  const startOrGetConversation = ({ recipientId, recipientName, recipientAvatar = '', equipmentId = null, equipmentTitle = '', repairId = null, title = '' }) => {
    if (!currentUser) {
      requireAuth();
      return null;
    }

    if (recipientId === currentUser.id) {
      showToast('You cannot start a conversation with yourself.', 'info');
      return null;
    }

    // Check if conversation already exists between these users
    const existing = conversations.find(c =>
      c.participantIds?.includes(currentUser.id) &&
      c.participantIds?.includes(recipientId) &&
      (!equipmentId || c.equipmentId === equipmentId) &&
      (!repairId || c.repairId === repairId)
    );

    if (existing) {
      setActiveConversation(existing);
      openModal('chat', existing);
      return existing;
    }

    // Create new conversation
    const newConv = {
      id: `conv-${Date.now()}`,
      createdBy: currentUser.id,
      participantIds: [currentUser.id, recipientId],
      participants: [
        { id: currentUser.id, name: currentUser.name, avatar: currentUser.avatar || '' },
        { id: recipientId, name: recipientName, avatar: recipientAvatar || '' }
      ],
      equipmentId,
      equipmentTitle,
      repairId,
      title: title || `${recipientName} & ${currentUser.name}`,
      lastMessage: '',
      lastMessageAt: new Date().toISOString(),
      unreadCount: 0
    };

    setConversations(prev => [newConv, ...prev]);
    setActiveConversation(newConv);
    openModal('chat', newConv);

    if (isSupabaseConfigured) {
      supabase.from('conversations').insert([{
        id: newConv.id,
        created_by: currentUser.id,
        equipment_id: equipmentId,
        repair_id: repairId,
        title: newConv.title,
        last_message: '',
        last_message_at: newConv.lastMessageAt
      }]);
    }

    return newConv;
  };

  const sendMessage = ({ conversationId, text, recipientId }) => {
    if (!currentUser || !text?.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: text.trim(),
      createdAt: new Date().toISOString(),
      read: false
    };

    setMessages(prev => [...prev, newMsg]);

    // Update conversation last message
    setConversations(prev => prev.map(c => c.id === conversationId ? {
      ...c,
      lastMessage: text.trim(),
      lastMessageAt: new Date().toISOString()
    } : c));

    // Send in-app notification to recipient
    if (recipientId && recipientId !== currentUser.id) {
      addNotification({
        userId: recipientId,
        title: `Message from ${currentUser.name}`,
        message: text.trim().slice(0, 60),
        type: 'message'
      });
    }

    if (isSupabaseConfigured) {
      supabase.from('messages').insert([{
        id: newMsg.id,
        conversation_id: conversationId,
        sender_id: currentUser.id,
        message: text.trim(),
        created_at: newMsg.createdAt
      }]);
    }
  };

  const markConversationRead = (conversationId) => {
    setMessages(prev => prev.map(m =>
      m.conversationId === conversationId && m.senderId !== currentUser?.id
        ? { ...m, read: true }
        : m
    ));
  };

  // =========================================================================
  // Student Verification Method
  // =========================================================================
  const applyForStudentVerification = ({ institutionName, studentEmail, documentUrl }) => {
    if (!currentUser) return requireAuth();

    const newVerif = {
      id: `sv-${Date.now()}`,
      userId: currentUser.id,
      institutionName,
      studentEmail,
      documentUrl,
      status: 'VERIFIED', // Instant beta approval
      createdAt: new Date().toISOString()
    };

    setStudentVerifications(prev => [newVerif, ...prev.filter(v => v.userId !== currentUser.id)]);

    setCurrentUser(prev => prev ? {
      ...prev,
      isStudentVerified: true,
      studentInstitution: institutionName
    } : prev);

    addNotification({
      title: '🎓 Student Status Verified!',
      message: `Congratulations! Your student identity for ${institutionName} is verified. Student discount prices are now unlocked on eligible gear.`,
      type: 'student'
    });

    if (isSupabaseConfigured) {
      supabase.from('student_verifications').insert([{
        user_id: currentUser.id,
        institution_name: institutionName,
        student_email: studentEmail,
        document_url: documentUrl,
        status: 'VERIFIED'
      }]);
    }

    showToast('Student status verified! Student discounts now active across RentiPair.', 'success');
  };

  // Repair Actions
  const createRepairBooking = async (repairData) => {
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

    if (isSupabaseConfigured) {
      try {
        await supabase.from('repair_requests').insert([{
          customer_id: currentUser.id,
          technician_id: repairData.assignedTechnician?.id || null,
          device_type: repairData.deviceType || 'Device',
          device_model: repairData.deviceModel || 'Model',
          problem_description: repairData.problemDescription || repairData.issueSummary || 'Repair needed',
          location: repairData.address || 'Chennai',
          status: 'REQUESTED'
        }]);
      } catch (err) {
        console.error('Supabase repair request error:', err);
      }
    } else {
      supabase.from('repair_requests').insert([newRepair]);
    }

    addNotification({
      title: 'Repair Request Submitted',
      message: `Your repair request for ${newRepair.deviceBrand || ''} ${newRepair.deviceModel} is recorded.`,
      type: 'repair'
    });

    showToast(`Repair Request #${newRepair.id} submitted!`, 'success');
    return newRepair;
  };

  const updateRepairStatus = async (repairId, newStatus) => {
    setRepairs(prev =>
      prev.map(r => r.id === repairId ? { ...r, status: newStatus } : r)
    );
    if (isSupabaseConfigured) {
      await supabase.from('repair_requests').update({ status: newStatus.toUpperCase() }).eq('id', repairId);
    } else {
      supabase.from('repair_requests').update({ status: newStatus }).eq('id', repairId);
    }
    showToast(`Repair #${repairId} updated to ${newStatus}`, 'info');
  };

  // Navigation Helper
  const navigateTo = (page, params = {}) => {
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
        updateProfilePhoto,
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
        deleteEquipment,
        updateEquipmentStatus,
        onboardTechnician,
        updateTechnicianStatus,
        markNotificationAsRead,
        markAllNotificationsRead,
        addNotification,
        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,
        // Compare
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        // Availability Alerts
        availabilityAlerts,
        subscribeAvailabilityAlert,
        isAlertSubscribed,
        // In-App Chat
        conversations,
        messages,
        activeConversation,
        setActiveConversation,
        startOrGetConversation,
        sendMessage,
        markConversationRead,
        unreadMessagesCount: messages.filter(m => !m.read && m.senderId !== currentUser?.id).length,
        // Student Verifications
        studentVerifications,
        applyForStudentVerification,
        isStudentVerified: (userId) => {
          if (!userId && currentUser) return Boolean(currentUser.isStudentVerified);
          return studentVerifications.some(v => v.userId === userId && v.status === 'VERIFIED') || (currentUser?.id === userId && Boolean(currentUser?.isStudentVerified));
        },
        // Referrals
        referrals,
        // Intended destination across auth redirects
        intendedDestination,
        setIntendedDestination
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
