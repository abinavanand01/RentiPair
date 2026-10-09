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
        style={{ padding: 0, overflow: 'hidden' }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          background: 'linear-gradient(90deg, #0A1128 0%, #15234A 100%)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
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
              <div style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em' }}>
                RentiPair Relational Database Architecture
              </div>
              <div style={{ fontSize: '12.5px', color: '#94A3B8' }}>
                Production-ready PostgreSQL / CockroachDB Schema Specification & Integrity Constraints
              </div>
            </div>
          </div>

          <button
            onClick={() => closeModal('schemaDoc')}
            style={{ color: '#E2E8F0', padding: '6px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '480px', maxHeight: '70vh' }}>
          {/* Table List Sidebar */}
          <div style={{
            background: '#F8FAFC',
            borderRight: '1px solid #E2E8F0',
            padding: '16px 12px',
            overflowY: 'auto'
          }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>
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
                  background: selectedTable === item.table ? '#0066FF' : 'transparent',
                  color: selectedTable === item.table ? '#FFFFFF' : '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '3px',
                  transition: 'all 0.15s'
                }}
              >
                <span>{item.table}</span>
                <span style={{
                  fontSize: '11px',
                  opacity: 0.8,
                  background: selectedTable === item.table ? 'rgba(255,255,255,0.2)' : '#E2E8F0',
                  padding: '1px 6px',
                  borderRadius: '4px',
                  color: selectedTable === item.table ? '#FFFFFF' : '#475569'
                }}>
                  {item.columns.length} cols
                </span>
              </button>
            ))}
          </div>

          {/* Table Details */}
          <div style={{ padding: '24px', overflowY: 'auto', background: '#FFFFFF' }}>
            {currentTableData && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Server size={20} color="var(--color-primary)" />
                      TABLE {currentTableData.table}
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#64748B', marginTop: '4px' }}>
                      {currentTableData.description}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '12px',
                    padding: '4px 10px',
                    background: '#ECFDF5',
                    color: '#047857',
                    borderRadius: '6px',
                    fontWeight: 600,
                    border: '1px solid #A7F3D0'
                  }}>
                    Normal Form: 3NF Compliant
                  </span>
                </div>

                <div style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginTop: '16px'
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontWeight: 700 }}>
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
                            borderBottom: idx === currentTableData.columns.length - 1 ? 'none' : '1px solid #F1F5F9',
                            background: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA'
                          }}
                        >
                          <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {col.name === 'id' ? <Key size={13} color="#F59E0B" /> : <div style={{ width: 13 }} />}
                            <code>{col.name}</code>
                          </td>
                          <td style={{ padding: '10px 14px', color: '#0066FF', fontFamily: 'monospace', fontSize: '12px' }}>
                            {col.type}
                          </td>
                          <td style={{ padding: '10px 14px', color: '#64748B' }}>
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
                  background: '#F0F9FF',
                  border: '1px solid #BAE6FD',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <Shield size={20} color="#0284C7" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '12.5px', color: '#0369A1' }}>
                    <strong>Security Rule Enforced:</strong> Sensitive fields like <code>encrypted_file_path</code>, Aadhaar/Govt ID documents and PAN details are encrypted at rest with AES-256-GCM. Public technician profiles only display masked document hashes (e.g. <code>****-9204</code>) and never render raw documents to client applications.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 24px',
          background: '#F8FAFC',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#64748B'
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
