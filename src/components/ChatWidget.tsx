import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../data/content';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isError?: boolean;
}

function cleanDisplay(text: string): string {
  if (!text) return '';
  return text
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
    .replace(/\*/g, '')
    .replace(/—/g, ', ')
    .replace(/–/g, '-')
    .replace(/ {2,}/g, ' ');
}

interface ChatWidgetProps {
  onOpenSupplyModal?: () => void;
}

const STORAGE_KEY = 'nimini_chat_history_v2';

const INITIAL_GREETING: ChatMessage = {
  id: 'init-greeting',
  role: 'assistant',
  content:
    "Hello! I am Nimi, the official AI assistant for NIMINI CO. How can I assist your healthcare facility today? You can ask about our medical supplies catalogue, ordering procedures, emergency requests, or Houston distribution.",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const SUGGESTED_PROMPTS = [
  'How do we request supplies for our clinic?',
  'What medical equipment categories do you carry?',
  'Do you provide emergency supply delivery?',
  'What are your operational hours and contact info?',
];

export function ChatWidget({ onOpenSupplyModal }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((m: ChatMessage) => ({
            ...m,
            content: cleanDisplay(m.content),
          }));
        }
      }
    } catch (err) {
      console.warn('Failed to load chat history from sessionStorage', err);
    }
    return [INITIAL_GREETING];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Persist messages to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (err) {
      console.warn('Failed to save chat history to sessionStorage', err);
    }
  }, [messages]);

  // Scroll to bottom when messages or loading state changes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input and handle Escape key when open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      // Format history for server API ({ role: 'user' | 'assistant', content: string })
      const payloadMessages = newHistory.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Server responded with status ${res.status}`);
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: cleanDisplay(data.reply) || "I am sorry, I could not process your request right now.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content:
          "I am currently having trouble connecting to the NIMINI assistant service. Please feel free to reach our team directly via phone or WhatsApp for immediate help.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleClearHistory = () => {
    setMessages([INITIAL_GREETING]);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          className="chat-float-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Open Nimi Ai Assistant"
          title="Chat with Nimi Ai Assistant"
        >
          <i className="fa-solid fa-comments"></i>
          <span className="chat-float-badge" aria-hidden="true"></span>
          <span className="chat-float-tooltip">Chat with Nimi Ai</span>
        </button>
      )}

      {/* Expanded Chat Panel */}
      {isOpen && (
        <div
          className="chat-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Nimi Ai Assistant"
        >
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <i className="fa-brands fa-neos"></i>
              </div>
              <div className="chat-header-text">
                <h3>Nimi Ai Assistant</h3>
                <div className="chat-header-status">
                  <span className="status-indicator"></span>
                  <span>Online • Medical Supplies</span>
                </div>
              </div>
            </div>
            <div className="chat-header-actions">
              <button
                className="chat-header-btn"
                onClick={handleClearHistory}
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                <i className="fa-solid fa-rotate-right"></i>
              </button>
              <button
                className="chat-header-btn"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="chat-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message-row ${msg.role === 'user' ? 'user' : 'bot'}`}
              >
                <div className="chat-bubble">
                  {/* Basic text rendering with linebreaks and sanitized characters */}
                  {cleanDisplay(msg.content).split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx}>
                      {paragraph.split('\n').map((line, lIdx) => (
                        <React.Fragment key={lIdx}>
                          {cleanDisplay(line)}
                          {lIdx < paragraph.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  ))}

                  {/* If message mentions requesting supplies and we have the modal trigger */}
                  {msg.role === 'assistant' &&
                    onOpenSupplyModal &&
                    msg.content.toLowerCase().includes('modal') && (
                      <div style={{ marginTop: '10px' }}>
                        <button
                          type="button"
                          className="btn"
                          style={{
                            fontSize: '13px',
                            padding: '6px 14px',
                            borderRadius: '6px',
                          }}
                          onClick={() => {
                            setIsOpen(false);
                            onOpenSupplyModal();
                          }}
                        >
                          Open Supply Request Form <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </button>
                      </div>
                    )}

                  {/* Fallback card if the message resulted in an error */}
                  {msg.isError && (
                    <div className="chat-fallback-card">
                      <p>
                        <strong>Direct Contact Alternatives:</strong>
                      </p>
                      <div className="chat-fallback-links">
                        <a href={`tel:${siteConfig.phoneTel}`}>
                          <i className="fa-solid fa-phone"></i> Call {siteConfig.phoneDisplay}
                        </a>
                        <a
                          href={siteConfig.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa-brands fa-whatsapp"></i> WhatsApp Line
                        </a>
                        <a href={`mailto:${siteConfig.email}`}>
                          <i className="fa-solid fa-envelope"></i> Email Us
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <span className="chat-time">{msg.timestamp}</span>
              </div>
            ))}

            {/* Quick Prompts when only greeting exists */}
            {messages.length === 1 && !isLoading && (
              <div className="chat-quick-prompts">
                <p
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-ink-soft)',
                    margin: '6px 0 2px 2px',
                  }}
                >
                  Suggested questions:
                </p>
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="chat-prompt-pill"
                    onClick={() => handleSendMessage(prompt)}
                  >
                    <i className="fa-solid fa-arrow-right" style={{ marginRight: '6px', fontSize: '10px' }}></i>
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="chat-message-row bot">
                <div className="chat-typing-bubble" aria-label="Nimi is thinking">
                  <span className="chat-typing-dot"></span>
                  <span className="chat-typing-dot"></span>
                  <span className="chat-typing-dot"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="chat-input-area">
            <form
              className="chat-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <input
                ref={inputRef}
                type="text"
                className="chat-input"
                placeholder="Ask about supplies, orders, catalog..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                aria-label="Your message"
                maxLength={2000}
              />
              <button
                type="submit"
                className="chat-send-btn"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
