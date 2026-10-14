import React, { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, ExternalLink, Check, AlertCircle, RefreshCw } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, serverStatus, onKeySaved }) {
  const [customKey, setCustomKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem('remake_custom_gemini_key') || '';
    setCustomKey(existing);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (customKey.trim()) {
      localStorage.setItem('remake_custom_gemini_key', customKey.trim());
    } else {
      localStorage.removeItem('remake_custom_gemini_key');
    }
    setSavedSuccess(true);
    onKeySaved();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    localStorage.removeItem('remake_custom_gemini_key');
    setCustomKey('');
    onKeySaved();
  };

  const hasEnv = serverStatus?.hasEnvKey;
  const hasCustom = !!localStorage.getItem('remake_custom_gemini_key');
  const isKeyActive = hasEnv || hasCustom;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(10, 27, 18, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      zIndex: 100
    }}>
      <div className="card-glass animate-fade-in" style={{
        maxWidth: '520px',
        width: '100%',
        padding: '2rem',
        backgroundColor: '#ffffff',
        boxShadow: 'var(--shadow-xl)',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-text-light)'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'var(--color-forest-50)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-forest-700)'
          }}>
            <Key size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--color-forest-950)' }}>
              Gemini API & Server Status
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              RE:MAKE AI genuine multimodal configuration
            </p>
          </div>
        </div>

        {/* Server status alert */}
        <div style={{
          backgroundColor: isKeyActive ? 'var(--color-forest-50)' : '#fef3c7',
          border: `1px solid ${isKeyActive ? 'var(--color-forest-100)' : '#fde68a'}`,
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1rem',
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.65rem',
          fontSize: '0.82rem'
        }}>
          {isKeyActive ? (
            <ShieldCheck size={18} color="var(--color-forest-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
          ) : (
            <AlertCircle size={18} color="#b45309" style={{ flexShrink: 0, marginTop: '2px' }} />
          )}
          <div>
            <div style={{ fontWeight: 700, color: isKeyActive ? 'var(--color-forest-900)' : '#92400e', marginBottom: '0.2rem' }}>
              {isKeyActive ? 'Active Live AI Connection' : 'Running in Demonstration Mode'}
            </div>
            <div style={{ color: isKeyActive ? 'var(--color-forest-700)' : '#78350f', lineHeight: 1.4 }}>
              {hasEnv
                ? 'Server environment variable GEMINI_API_KEY is active and loaded from .env.'
                : hasCustom
                ? 'Using custom client-configured key sent securely via request header.'
                : 'No GEMINI_API_KEY found in .env. You can enter one below or test using the sample demonstrations.'}
            </div>
            <div style={{ marginTop: '0.35rem', fontSize: '0.74rem', color: 'var(--color-text-light)' }}>
              Active Model: <code>{serverStatus?.model || 'gemini-1.5-flash'}</code>
            </div>
          </div>
        </div>

        {/* Key Form */}
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">
              <span>Client Session Gemini API Key</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-forest-600)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                <span>Get Free Key</span>
                <ExternalLink size={12} />
              </a>
            </label>
            <input
              type="password"
              className="input-text"
              placeholder="AIzaSy..."
              value={customKey}
              onChange={(e) => setCustomKey(e.target.value)}
              style={{ fontFamily: 'monospace', fontSize: '0.88rem' }}
            />
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', marginTop: '0.35rem' }}>
              Your key is kept safe and never stored on third-party servers. Alternatively, you can add <code>GEMINI_API_KEY=your_key</code> directly into the server's <code>.env</code> file.
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
            {hasCustom ? (
              <button
                type="button"
                onClick={handleClear}
                className="btn btn-ghost"
                style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem', color: '#991b1b' }}
              >
                Remove Custom Key
              </button>
            ) : <div />}

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline"
                style={{ fontSize: '0.85rem' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ fontSize: '0.85rem' }}
              >
                {savedSuccess ? (
                  <>
                    <Check size={16} />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Key</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
