import React from 'react';
import { Leaf, Sparkles, Settings, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Navbar({ serverStatus, onOpenSettings, onSelectSample, sampleProjects }) {
  const isLive = serverStatus?.hasEnvKey || Boolean(localStorage.getItem('remake_custom_gemini_key'));

  return (
    <header className="no-print" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(247, 245, 239, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--color-border-subtle)',
      padding: '0.85rem 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: 'var(--color-forest-800)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-lime-400)',
            boxShadow: '0 4px 12px rgba(16, 42, 29, 0.2)'
          }}>
            <Leaf size={22} strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--color-forest-950)'
              }}>
                RE:MAKE
              </span>
              <span style={{
                backgroundColor: 'var(--color-lime-400)',
                color: 'var(--color-forest-950)',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '0.7rem',
                padding: '0.15rem 0.45rem',
                borderRadius: '6px',
                letterSpacing: '0.05em'
              }}>
                AI
              </span>
            </div>
            <div style={{
              fontSize: '0.72rem',
              color: 'var(--color-text-muted)',
              fontWeight: 500
            }}>
              Waste Less. Imagine More. Create Differently.
            </div>
          </div>
        </div>

        {/* Right side navigation & status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Status Pill */}
          <button
            onClick={onOpenSettings}
            title={isLive ? "Connected to Gemini Multimodal API" : "Running in Demonstration Mode (Click to configure key)"}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: '#ffffff',
              border: `1px solid ${isLive ? 'rgba(132, 204, 22, 0.4)' : '#fde68a'}`,
              borderRadius: 'var(--radius-full)',
              padding: '0.4rem 0.85rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              color: 'var(--color-forest-900)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <span className={`status-dot ${isLive ? 'status-dot-active' : 'status-dot-demo'}`}></span>
            <span>{isLive ? 'Gemini Live AI' : 'Demo Mode Active'}</span>
          </button>

          {/* Quick Demo Dropdown or Trigger */}
          {sampleProjects && sampleProjects.length > 0 && (
            <button
              onClick={() => onSelectSample(sampleProjects[0])}
              className="btn btn-outline"
              style={{
                fontSize: '0.82rem',
                padding: '0.45rem 0.9rem',
                display: 'inline-flex'
              }}
            >
              <Sparkles size={14} color="var(--color-forest-600)" />
              <span>Try Sample</span>
            </button>
          )}

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="btn btn-ghost"
            title="Settings & API Key"
            style={{
              width: '38px',
              height: '38px',
              padding: 0,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
