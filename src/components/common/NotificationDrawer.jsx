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
          maxHeight: '85vh'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={20} color="var(--color-primary)" />
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#0F172A' }}>
              Notifications
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={markAllNotificationsRead}
              style={{
                fontSize: '12px',
                color: 'var(--color-primary)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <CheckCheck size={14} /> Mark all read
            </button>
            <button
              onClick={() => closeModal('notificationDrawer')}
              style={{ color: '#64748B', padding: '4px' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '8px' }}>
          {notifications.length === 0 ? (
            <div style={{ padding: '36px 20px', textAlign: 'center', color: '#64748B' }}>
              <Bell size={32} style={{ opacity: 0.3, margin: '0 auto 8px' }} />
              <div>No notifications yet</div>
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
                  borderRadius: '10px',
                  background: item.read ? '#FFFFFF' : '#F0F7FF',
                  marginBottom: '4px',
                  cursor: 'pointer',
                  border: item.read ? '1px solid #F1F5F9' : '1px solid rgba(0, 102, 255, 0.2)',
                  transition: 'background 0.15s'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  flexShrink: 0
                }}>
                  {getNotifIcon(item.type)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '2px'
                  }}>
                    <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#0F172A' }}>
                      {item.title}
                    </span>
                    <span style={{ fontSize: '11px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Clock size={11} /> {item.time}
                    </span>
                  </div>

                  <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.4, margin: 0 }}>
                    {item.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '10px 16px',
          background: '#F8FAFC',
          borderTop: '1px solid #E2E8F0',
          textAlign: 'center'
        }}>
          <button
            onClick={() => { closeModal('notificationDrawer'); navigateTo('dashboard'); }}
            style={{ fontSize: '12.5px', color: 'var(--color-primary)', fontWeight: 600 }}
          >
            View Notification Center in Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
