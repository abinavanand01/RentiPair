import React from 'react';
import { useApp } from '../../context/AppContext';
import { Scale, X, ArrowRight } from 'lucide-react';

export default function CompareDock() {
  const { compareList, removeFromCompare, clearCompare, openModal } = useApp();

  if (compareList.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 950,
      background: 'rgba(11, 21, 51, 0.95)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1.5px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '20px',
      padding: '10px 16px',
      boxShadow: '0 18px 40px -10px rgba(11, 21, 51, 0.5)',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      maxWidth: '92vw',
      animation: 'modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards'
    }}>
      {/* Icon & Count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFFFFF' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: '#1677FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Scale size={16} />
        </div>
        <div style={{ display: 'none', flexDirection: 'column' }} className="compare-dock-label">
          <span style={{ fontSize: '13px', fontWeight: 800 }}>Compare</span>
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>{compareList.length}/4 items</span>
        </div>
      </div>

      {/* Thumbnails */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {compareList.map(item => (
          <div
            key={item.id}
            style={{
              position: 'relative',
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              overflow: 'hidden',
              background: '#FFFFFF',
              border: '1.5px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <button
              type="button"
              onClick={() => removeFromCompare(item.id)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '16px',
                height: '16px',
                background: 'rgba(0,0,0,0.6)',
                color: '#FFFFFF',
                borderRadius: '0 0 0 6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Remove"
            >
              <X size={10} />
            </button>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          type="button"
          onClick={() => openModal('compare')}
          className="btn btn-primary btn-sm"
          style={{ height: '34px', padding: '0 14px', borderRadius: '10px' }}
        >
          <span>Compare ({compareList.length})</span>
          <ArrowRight size={13} />
        </button>

        <button
          type="button"
          onClick={clearCompare}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94A3B8',
            fontSize: '12px',
            padding: '4px 6px',
            cursor: 'pointer'
          }}
        >
          Clear
        </button>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .compare-dock-label {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
