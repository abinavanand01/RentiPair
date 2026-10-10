import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Send,
  MessageSquare,
  User,
  Clock,
  Check,
  CheckCheck,
  Box,
  Wrench,
  Search,
  ArrowLeft
} from 'lucide-react';

export default function ChatModal() {
  const {
    modalState,
    closeModal,
    currentUser,
    conversations,
    messages,
    activeConversation,
    setActiveConversation,
    sendMessage,
    markConversationRead
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [chatSearch, setChatSearch] = useState('');
  const [mobileShowThread, setMobileShowThread] = useState(false);
  const messagesEndRef = useRef(null);

  // Filter conversations for the current user
  const userConversations = conversations.filter(c =>
    c.participantIds?.includes(currentUser?.id)
  );

  const filteredConversations = userConversations.filter(c => {
    if (!chatSearch.trim()) return true;
    const q = chatSearch.toLowerCase();
    const otherParticipant = c.participants?.find(p => p.id !== currentUser?.id);
    return (
      c.title?.toLowerCase().includes(q) ||
      otherParticipant?.name?.toLowerCase().includes(q) ||
      c.equipmentTitle?.toLowerCase().includes(q)
    );
  });

  // Current conversation messages
  const conversationMessages = messages.filter(m =>
    m.conversationId === activeConversation?.id
  );

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversationMessages.length]);

  // Mark read when active conversation changes
  useEffect(() => {
    if (activeConversation?.id) {
      markConversationRead(activeConversation.id);
    }
  }, [activeConversation?.id]);

  if (!modalState.chat?.open) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeConversation) return;

    const otherParticipant = activeConversation.participants?.find(p => p.id !== currentUser?.id);

    sendMessage({
      conversationId: activeConversation.id,
      text: inputMessage.trim(),
      recipientId: otherParticipant?.id
    });

    setInputMessage('');
  };

  const otherParticipant = activeConversation?.participants?.find(p => p.id !== currentUser?.id);

  return (
    <div className="modal-overlay" onClick={() => closeModal('chat')}>
      <div
        className="modal-content extra-wide"
        onClick={e => e.stopPropagation()}
        style={{
          height: '85vh',
          maxHeight: '750px',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #0B1028 0%, #060919 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(59, 130, 246, 0.15)',
          borderRadius: '20px'
        }}
      >
        {/* Main Modal Layout: Left Conversations List + Right Active Chat */}
        <div style={{ display: 'flex', flex: 1, height: '100%', overflow: 'hidden' }} className="chat-modal-container">

          {/* Left Column: Conversations List */}
          <div
            style={{
              width: '320px',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(11, 16, 40, 0.95)'
            }}
            className={`chat-sidebar ${mobileShowThread ? 'hide-mobile' : ''}`}
          >
            {/* Header */}
            <div style={{
              padding: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(20, 30, 70, 0.4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38BDF8'
                }}>
                  <MessageSquare size={17} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em' }}>Messages</h4>
                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>Direct In-App Communication</span>
                </div>
              </div>
            </div>

            {/* Search conversations */}
            <div style={{ padding: '10px 14px', background: 'transparent', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '6px 10px',
                borderRadius: '8px'
              }}>
                <Search size={14} color="#94A3B8" />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={chatSearch}
                  onChange={e => setChatSearch(e.target.value)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    fontSize: '12.5px',
                    width: '100%',
                    color: '#FFFFFF',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Conversation Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
              {filteredConversations.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '36px 14px', color: '#94A3B8' }}>
                  <MessageSquare size={28} style={{ opacity: 0.3, margin: '0 auto 8px', color: '#38BDF8' }} />
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#FFFFFF' }}>No conversations yet</div>
                  <div style={{ fontSize: '12px', marginTop: '4px', color: '#64748B' }}>
                    Messages with equipment owners and verified technicians will appear here.
                  </div>
                </div>
              ) : (
                filteredConversations.map(conv => {
                  const other = conv.participants?.find(p => p.id !== currentUser?.id);
                  const isSelected = activeConversation?.id === conv.id;
                  const convUnread = messages.filter(m => m.conversationId === conv.id && !m.read && m.senderId !== currentUser?.id).length;

                  return (
                    <div
                      key={conv.id}
                      onClick={() => {
                        setActiveConversation(conv);
                        setMobileShowThread(true);
                      }}
                      style={{
                        padding: '12px',
                        borderRadius: '12px',
                        marginBottom: '4px',
                        cursor: 'pointer',
                        background: isSelected ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                        border: isSelected ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid transparent',
                        boxShadow: isSelected ? '0 0 15px rgba(56, 189, 248, 0.1)' : 'none',
                        transition: 'all 0.16s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {/* Avatar with Online Dot */}
                        <div style={{ position: 'relative' }}>
                          {other?.avatar ? (
                            <img
                              src={other.avatar}
                              alt={other?.name}
                              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                          ) : (
                            <div style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '14px'
                            }}>
                              {other?.name ? other.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                          )}
                          <span style={{
                            position: 'absolute',
                            bottom: '1px',
                            right: '1px',
                            width: '9px',
                            height: '9px',
                            borderRadius: '50%',
                            background: '#10B981',
                            border: '1.5px solid #0B1028'
                          }} />
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                            <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {other?.name || conv.title}
                            </div>
                            {convUnread > 0 && (
                              <span style={{
                                background: '#38BDF8',
                                color: '#0B1028',
                                fontSize: '10px',
                                fontWeight: 800,
                                padding: '1px 6px',
                                borderRadius: '999px'
                              }}>
                                {convUnread}
                              </span>
                            )}
                          </div>

                          {conv.equipmentTitle && (
                            <div style={{ fontSize: '11px', color: '#38BDF8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                              <Box size={11} /> {conv.equipmentTitle}
                            </div>
                          )}

                          <div style={{
                            fontSize: '12px',
                            color: '#94A3B8',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {conv.lastMessage || 'Start conversation...'}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Active Chat Thread */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(7, 10, 26, 0.85)'
            }}
            className={`chat-thread ${!mobileShowThread ? 'hide-mobile' : ''}`}
          >
            {activeConversation ? (
              <>
                {/* Active Chat Header */}
                <div style={{
                  padding: '14px 20px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(11, 16, 40, 0.7)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* Mobile Back to List Button */}
                    <button
                      type="button"
                      onClick={() => setMobileShowThread(false)}
                      className="chat-back-btn"
                      style={{
                        display: 'none',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: 'none',
                        padding: '6px',
                        borderRadius: '6px',
                        color: '#CBD5E1',
                        cursor: 'pointer'
                      }}
                    >
                      <ArrowLeft size={16} />
                    </button>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>
                          {otherParticipant?.name || activeConversation.title}
                        </span>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          fontSize: '11px',
                          color: '#34D399',
                          fontWeight: 600
                        }}>
                          ● Active
                        </span>
                      </div>
                      {activeConversation.equipmentTitle && (
                        <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>
                          Regarding: {activeConversation.equipmentTitle}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => closeModal('chat')}
                    style={{
                      color: '#94A3B8',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '6px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                    onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Messages Body */}
                <div style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '20px',
                  background: 'rgba(5, 8, 22, 0.95)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {conversationMessages.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
                      <div style={{ fontSize: '36px', marginBottom: '8px' }}>💬</div>
                      <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '15px', marginBottom: '4px' }}>
                        No messages yet
                      </div>
                      <div style={{ fontSize: '13px', maxWidth: '320px', margin: '0 auto', color: '#94A3B8' }}>
                        Send a message to ask about gear availability, meetup locations, or repair diagnostics.
                      </div>
                    </div>
                  ) : (
                    conversationMessages.map(msg => {
                      const isMe = msg.senderId === currentUser?.id;
                      const timeStr = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                      return (
                        <div
                          key={msg.id}
                          style={{
                            alignSelf: isMe ? 'flex-end' : 'flex-start',
                            maxWidth: '75%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: isMe ? 'flex-end' : 'flex-start'
                          }}
                        >
                          <div style={{
                            padding: '10px 14px',
                            borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                            background: isMe ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' : 'rgba(18, 26, 60, 0.85)',
                            color: '#FFFFFF',
                            border: isMe ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                            boxShadow: isMe ? '0 4px 14px rgba(37, 99, 235, 0.35)' : '0 2px 8px rgba(0, 0, 0, 0.25)',
                            fontSize: '13.5px',
                            lineHeight: 1.45,
                            wordBreak: 'break-word'
                          }}>
                            {msg.text}
                          </div>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '11px',
                            color: '#64748B',
                            marginTop: '3px',
                            padding: '0 4px'
                          }}>
                            <span>{timeStr}</span>
                            {isMe && (
                              <CheckCheck size={13} color={msg.read ? '#38BDF8' : '#64748B'} />
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input Box */}
                <form onSubmit={handleSend} style={{
                  padding: '14px 20px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(11, 16, 40, 0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    style={{
                      flex: 1,
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '12px',
                      padding: '10px 16px',
                      fontSize: '14px',
                      outline: 'none',
                      color: '#FFFFFF',
                      background: 'rgba(255, 255, 255, 0.04)'
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!inputMessage.trim()}
                    style={{
                      height: '42px',
                      padding: '0 18px',
                      borderRadius: '12px',
                      opacity: inputMessage.trim() ? 1 : 0.6
                    }}
                  >
                    <Send size={16} />
                    <span>Send</span>
                  </button>
                </form>
              </>
            ) : (
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94A3B8',
                padding: '40px'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(56, 189, 248, 0.1)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38BDF8',
                  marginBottom: '16px'
                }}>
                  <MessageSquare size={30} />
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
                  Select a Conversation
                </h4>
                <p style={{ fontSize: '14px', maxWidth: '340px', textAlign: 'center', color: '#94A3B8' }}>
                  Choose a chat from the left panel or click "Message Owner" on any equipment listing to begin chatting.
                </p>
              </div>
            )}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .chat-modal-container {
              position: relative;
            }
            .chat-sidebar {
              width: 100% !important;
            }
            .chat-sidebar.hide-mobile {
              display: none !important;
            }
            .chat-thread.hide-mobile {
              display: none !important;
            }
            .chat-thread {
              width: 100% !important;
            }
            .chat-back-btn {
              display: flex !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
