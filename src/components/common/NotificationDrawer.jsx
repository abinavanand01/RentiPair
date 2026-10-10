import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  X,
  CheckCircle,
  Clock,
  ShieldCheck,
  PackageCheck,
  Wrench,
  CheckCheck
} from 'lucide-react';

export default function NotificationDrawer() {
  const {
    modalState,
    closeModal,
    notifications,
    markNotificationAsRead,
    markAllNotificationsRead,
    navigateTo
  } = useApp();

  if (!modalState.notificationDrawer?.open) return null;

  const getNotifIcon = (type) => {
    switch (type) {
      case 'rental':
        return <PackageCheck size={18} color="#0066FF" />;
      case 'repair':
        return <Wrench size={18} color="#FF6B00" />;
      case 'payment':
        return <CheckCircle size={18} color="#10B981" />;
      case 'verification':
        return <ShieldCheck size={18} color="#6366F1" />;
      default:
        return <Bell size={18} color="#64748B" />;
    }
  };

  return (
    <div className="modal-overlay" onClick={() => closeModal('notificationDrawer')}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '460px',
          padding: 0,
          position: 'fixed',
          top: '20px',
          right: '20px',
          bottom: 'auto',
          maxHeight: '85vh',
          background: 'linear-gradient(180deg, #0B1028 0%, #060919 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(59, 130, 246, 0.15)',
          borderRadius: '18px',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(180deg, rgba(20, 30, 70, 0.6) 0%, rgba(11, 16, 40, 0.4) 100%)',
          backdropFilter: 'blur(16px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={20} color="#38BDF8" />
            <span style={{ fontWeight: 800, fontSize: '16px', color: '#FFFFFF', letterSpacing: '-0.01em' }}>
              Notifications
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={markAllNotificationsRead}
              style={{
                fontSize: '12px',
                color: '#38BDF8',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                padding: '4px 10px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              <CheckCheck size={14} /> Mark all read
            </button>
            <button
              onClick={() => closeModal('notificationDrawer')}
              style={{
                color: '#94A3B8',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '5px',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
              onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '10px' }}>
          {notifications.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#94A3B8' }}>
              <Bell size={32} style={{ opacity: 0.3, margin: '0 auto 8px', color: '#38BDF8' }} />
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>No notifications yet</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>Updates regarding rentals and repairs will appear here.</div>
            </div>
          ) : (
            notifications.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  markNotificationAsRead(item.id);
                  if (item.link) {
                    closeModal('notificationDrawer');
                    navigateTo('dashboard');
                  }
                }}
                style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: item.read ? 'rgba(255, 255, 255, 0.03)' : 'rgba(59, 130, 246, 0.12)',
                  marginBottom: '6px',
                  cursor: 'pointer',
                  border: item.read ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(59, 130, 246, 0.35)',
                  boxShadow: item.read ? 'none' : '0 0 15px rgba(59, 130, 246, 0.12)',
                  transition: 'all 0.15s'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {getNotifIcon(item.type)}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '2px'
                  }}>
                    <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#FFFFFF' }}>
                      {item.title}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Clock size={11} /> {item.time}
                    </span>
                  </div>

                  <p style={{ fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.4, margin: 0 }}>
                    {item.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 16px',
          background: 'rgba(11, 16, 40, 0.7)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          textAlign: 'center'
        }}>
          <button
            onClick={() => { closeModal('notificationDrawer'); navigateTo('dashboard'); }}
            style={{
              fontSize: '12.5px',
              color: '#38BDF8',
              fontWeight: 600,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            View Notification Center in Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
}
