import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Box, Upload, Wrench, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

export default function OnboardingModal() {
  const { completeOnboarding, openModal, navigateTo } = useApp();

  // Multi-selectable capability cards
  const [selectedCapabilities, setSelectedCapabilities] = useState(['RENTER']);

  const capabilityCards = [
    {
      id: 'RENTER',
      title: 'RENT EQUIPMENT',
      icon: Box,
      description: 'Find laptops, calculators, cameras, electronics, lab equipment and more.',
      tag: 'Most Popular'
    },
    {
      id: 'EQUIPMENT_OWNER',
      title: 'LIST MY EQUIPMENT',
      icon: Upload,
      description: 'Earn by renting out equipment you already own with escrow protection.',
      tag: 'Earn Income'
    },
    {
      id: 'REPAIR_CUSTOMER',
      title: 'FIND REPAIR SERVICES',
      icon: Wrench,
      description: 'Find trusted technicians for laptops, phones, tablets and electronics.',
      tag: 'Fast Repairs'
    },
    {
      id: 'TECHNICIAN',
      title: 'BECOME A TECHNICIAN',
      icon: Shield,
      description: 'Offer your repair skills and get verified on RentiPair.',
      tag: 'Verified Work'
    }
  ];

  const toggleCapability = (capId) => {
    setSelectedCapabilities(prev => {
      if (prev.includes(capId)) {
        // Allow unchecking, but ensure at least one remains or let them uncheck
        return prev.filter(c => c !== capId);
      } else {
        return [...prev, capId];
      }
    });
  };

  const handleContinue = async () => {
    // If empty, default to RENTER
    const toSave = selectedCapabilities.length > 0 ? selectedCapabilities : ['RENTER'];
    await completeOnboarding(toSave);

    // If user chose BECOME A TECHNICIAN, open the technician application flow
    if (toSave.includes('TECHNICIAN')) {
      openModal('becomeTechnician');
    }
  };

  const handleSkip = async () => {
    await completeOnboarding(['RENTER']);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 76px)',
      background: 'linear-gradient(135deg, #0B1533 0%, #0F1D46 60%, #080F26 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative'
    }}>
      {/* Container */}
      <div style={{
        width: '100%',
        maxWidth: '780px',
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '48px 40px',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#EEF4FF',
            padding: '4px 14px',
            borderRadius: '999px',
            color: '#1677FF',
            fontSize: '12px',
            fontWeight: 700,
            marginBottom: '14px',
            border: '1px solid rgba(22, 119, 255, 0.15)'
          }}>
            <span>Welcome to RentiPair</span>
          </div>

          <h1 style={{
            fontSize: '30px',
            fontWeight: 800,
            color: '#0B1533',
            letterSpacing: '-0.02em',
            marginBottom: '10px'
          }}>
            What brings you to RentiPair?
          </h1>

          <p style={{
            fontSize: '15px',
            color: '#64748B',
            maxWidth: '540px',
            margin: '0 auto',
            lineHeight: 1.5
          }}>
            You can choose more than one. You can change these preferences anytime from your profile settings.
          </p>
        </div>

        {/* 4 Selectable Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          marginBottom: '32px'
        }}>
          {capabilityCards.map(card => {
            const isSelected = selectedCapabilities.includes(card.id);
            return (
              <div
                key={card.id}
                onClick={() => toggleCapability(card.id)}
                style={{
                  border: isSelected ? '2px solid #1677FF' : '2px solid #E2E8F0',
                  background: isSelected ? '#F0F7FF' : '#FFFFFF',
                  borderRadius: '16px',
                  padding: '22px 20px',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isSelected ? '0 8px 24px -4px rgba(22, 119, 255, 0.16)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  userSelect: 'none'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: isSelected ? '#1677FF' : '#F1F5F9',
                      color: isSelected ? '#FFFFFF' : '#334155',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.18s ease'
                    }}>
                      <card.icon size={22} />
                    </div>

                    {/* Check indicator or hollow circle */}
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: isSelected ? '2px solid #1677FF' : '2px solid #CBD5E1',
                      background: isSelected ? '#1677FF' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease'
                    }}>
                      {isSelected && <CheckCircle2 size={16} color="#FFFFFF" strokeWidth={3} />}
                    </div>
                  </div>

                  <div style={{
                    fontSize: '15px',
                    fontWeight: 800,
                    color: isSelected ? '#0B1533' : '#1E293B',
                    letterSpacing: '-0.01em',
                    marginBottom: '6px'
                  }}>
                    {card.title}
                  </div>

                  <p style={{
                    fontSize: '13px',
                    color: isSelected ? '#334155' : '#64748B',
                    lineHeight: 1.5,
                    margin: 0
                  }}>
                    {card.description}
                  </p>
                </div>

                <div style={{ marginTop: '14px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: isSelected ? 'rgba(22, 119, 255, 0.12)' : '#F1F5F9',
                    color: isSelected ? '#1677FF' : '#64748B'
                  }}>
                    {card.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px'
        }}>
          <button
            onClick={handleContinue}
            className="btn btn-primary"
            style={{
              width: '100%',
              maxWidth: '340px',
              height: '48px',
              fontSize: '15px',
              fontWeight: 700,
              borderRadius: '12px',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(22, 119, 255, 0.28)'
            }}
          >
            <span>Continue</span>
            <ArrowRight size={17} />
          </button>

          <button
            onClick={handleSkip}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748B',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: '6px',
              transition: 'color 0.15s ease'
            }}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
