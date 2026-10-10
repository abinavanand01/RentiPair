import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DATABASE_SCHEMA_DOCUMENTATION } from '../../data/mockData';
import { Database, X, Shield, Key, Layers, Server, Code2 } from 'lucide-react';

export default function DatabaseSchemaModal() {
  const { modalState, closeModal } = useApp();
  const [selectedTable, setSelectedTable] = useState(DATABASE_SCHEMA_DOCUMENTATION[0].table);

  if (!modalState.schemaDoc?.open) return null;

  const currentTableData = DATABASE_SCHEMA_DOCUMENTATION.find(t => t.table === selectedTable);

  return (
    <div className="modal-overlay" onClick={() => closeModal('schemaDoc')}>
      <div
        className="modal-content extra-wide"
        onClick={e => e.stopPropagation()}
        style={{
          padding: 0,
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #0B1028 0%, #060919 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(59, 130, 246, 0.15)',
          borderRadius: '20px'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          background: 'linear-gradient(90deg, #0A1128 0%, #15234A 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(0, 102, 255, 0.25)',
              border: '1px solid rgba(96, 165, 250, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Database size={22} color="#60A5FA" />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                RentiPair Relational Database Architecture
              </div>
              <div style={{ fontSize: '12.5px', color: '#94A3B8' }}>
                Production-ready PostgreSQL / CockroachDB Schema Specification & Integrity Constraints
              </div>
            </div>
          </div>

          <button
            onClick={() => closeModal('schemaDoc')}
            style={{
              color: '#94A3B8',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '6px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '480px', maxHeight: '70vh' }}>
          {/* Table List Sidebar */}
          <div style={{
            background: 'rgba(11, 16, 40, 0.85)',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '16px 12px',
            overflowY: 'auto'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px', letterSpacing: '0.04em' }}>
              Relational Tables ({DATABASE_SCHEMA_DOCUMENTATION.length})
            </div>
            {DATABASE_SCHEMA_DOCUMENTATION.map(item => (
              <button
                key={item.table}
                onClick={() => setSelectedTable(item.table)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  fontWeight: selectedTable === item.table ? 700 : 500,
                  background: selectedTable === item.table ? 'linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)' : 'transparent',
                  color: selectedTable === item.table ? '#FFFFFF' : '#94A3B8',
                  border: selectedTable === item.table ? '1px solid rgba(96, 165, 250, 0.4)' : '1px solid transparent',
                  boxShadow: selectedTable === item.table ? '0 0 12px rgba(37, 99, 235, 0.3)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '3px',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                <span>{item.table}</span>
                <span style={{
                  fontSize: '11px',
                  opacity: 0.85,
                  background: selectedTable === item.table ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  color: selectedTable === item.table ? '#FFFFFF' : '#64748B'
                }}>
                  {item.columns.length} cols
                </span>
              </button>
            ))}
          </div>

          {/* Table Details */}
          <div style={{ padding: '24px', overflowY: 'auto', background: 'rgba(7, 10, 26, 0.7)' }}>
            {currentTableData && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Server size={20} color="#38BDF8" />
                      TABLE {currentTableData.table}
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#94A3B8', marginTop: '4px' }}>
                      {currentTableData.description}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '12px',
                    padding: '4px 10px',
                    background: 'rgba(16, 185, 129, 0.12)',
                    color: '#34D399',
                    borderRadius: '6px',
                    fontWeight: 600,
                    border: '1px solid rgba(52, 211, 153, 0.3)'
                  }}>
                    Normal Form: 3NF Compliant
                  </span>
                </div>

                <div style={{
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginTop: '16px',
                  background: 'rgba(14, 20, 48, 0.6)'
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#94A3B8', fontWeight: 700 }}>
                        <th style={{ padding: '10px 14px' }}>Column</th>
                        <th style={{ padding: '10px 14px' }}>Type & Constraints</th>
                        <th style={{ padding: '10px 14px' }}>Description & Relational Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTableData.columns.map((col, idx) => (
                        <tr
                          key={idx}
                          style={{
                            borderBottom: idx === currentTableData.columns.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                            background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)'
                          }}
                        >
                          <td style={{ padding: '10px 14px', fontWeight: 600, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {col.name === 'id' ? <Key size={13} color="#F59E0B" /> : <div style={{ width: 13 }} />}
                            <code>{col.name}</code>
                          </td>
                          <td style={{ padding: '10px 14px', color: '#60A5FA', fontFamily: 'monospace', fontSize: '12px' }}>
                            {col.type}
                          </td>
                          <td style={{ padding: '10px 14px', color: '#94A3B8' }}>
                            {col.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Security & Access Control Info */}
                <div style={{
                  marginTop: '20px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'rgba(14, 165, 233, 0.08)',
                  border: '1px solid rgba(14, 165, 233, 0.25)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <Shield size={20} color="#38BDF8" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '12.5px', color: '#BAE6FD', lineHeight: 1.5 }}>
                    <strong style={{ color: '#FFFFFF' }}>Security Rule Enforced:</strong> Sensitive fields like <code>encrypted_file_path</code>, Aadhaar/Govt ID documents and PAN details are encrypted at rest with AES-256-GCM. Public technician profiles only display masked document hashes (e.g. <code>****-9204</code>) and never render raw documents to client applications.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px',
          background: 'rgba(11, 16, 40, 0.85)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#94A3B8'
        }}>
          <div>Entity Relationship Diagram: 19 Entities, Foreign Key Referential Integrity Cascades</div>
          <button
            onClick={() => closeModal('schemaDoc')}
            className="btn btn-primary btn-sm"
          >
            Close Schema View
          </button>
        </div>
      </div>
    </div>
  );
}
