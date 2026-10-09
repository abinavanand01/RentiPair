import React from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import GlobalSearchModal from './components/common/GlobalSearchModal';
import NotificationDrawer from './components/common/NotificationDrawer';
import DatabaseSchemaModal from './components/common/DatabaseSchemaModal';

// Auth Components
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import OnboardingModal from './components/auth/OnboardingModal';
import ForgotPasswordModal from './components/auth/ForgotPasswordModal';

// Home Page Components
import Hero from './components/home/Hero';
import CategoriesSection from './components/home/CategoriesSection';
import FeaturedEquipment from './components/home/FeaturedEquipment';
import VerifiedTechnicians from './components/home/VerifiedTechnicians';
import HowItWorks from './components/home/HowItWorks';
import TrustSafety from './components/home/TrustSafety';
import CtaBanner from './components/home/CtaBanner';

// Marketplace & Flow Components
import RentMarketplace from './components/rent/RentMarketplace';
import EquipmentDetailsModal from './components/rent/EquipmentDetailsModal';
import RentalBookingModal from './components/rent/RentalBookingModal';
import ListEquipmentModal from './components/rent/ListEquipmentModal';

import RepairMarketplace from './components/repairs/RepairMarketplace';
import TechnicianProfileModal from './components/repairs/TechnicianProfileModal';
import RepairBookingModal from './components/repairs/RepairBookingModal';
import BecomeTechnicianModal from './components/repairs/BecomeTechnicianModal';

// Dashboards
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

function MainApp() {
  const { currentPage, currentUser, authLoading } = useApp();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Page Content Router */}
      <main style={{ flex: 1 }}>
        {currentPage === 'home' && (
          <>
            <Hero />
            <CategoriesSection />
            <FeaturedEquipment />
            <VerifiedTechnicians />
            <HowItWorks />
            <TrustSafety />
            <CtaBanner />
          </>
        )}

        {currentPage === 'rent' && <RentMarketplace />}
        {currentPage === 'repairs' && <RepairMarketplace />}

        {/* Auth Routes */}
        {currentPage === 'login' && <LoginPage />}
        {currentPage === 'signup' && <SignupPage />}
        {currentPage === 'onboarding' && <OnboardingModal />}

        {/* Protected Dashboard Route */}
        {currentPage === 'dashboard' && (
          currentUser ? <UserDashboard /> : <LoginPage />
        )}

        {/* Protected Admin Route */}
        {currentPage === 'admin' && (
          currentUser?.isAdmin ? <AdminDashboard /> : <LoginPage />
        )}
      </main>

      {/* Modals & Drawers */}
      <GlobalSearchModal />
      <NotificationDrawer />
      <DatabaseSchemaModal />
      <EquipmentDetailsModal />
      <RentalBookingModal />
      <ListEquipmentModal />
      <TechnicianProfileModal />
      <RepairBookingModal />
      <BecomeTechnicianModal />
      <ForgotPasswordModal />

      {/* Footer (hidden on auth pages for maximum focus) */}
      {currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'onboarding' && (
        <Footer />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
