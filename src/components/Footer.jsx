import React from 'react';
import { Leaf, Heart, Globe, ArrowUp } from 'lucide-react';

export default function Footer({ onScrollToTop }) {
  return (
    <footer className="no-print" style={{
      borderTop: '1px solid var(--color-border-subtle)',
      backgroundColor: 'rgba(247, 245, 239, 0.95)',
      padding: '3rem 0 2rem 0',
      marginTop: '4rem'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Brand info */}
          <div style={{ maxWidth: '380px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-forest-800)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-lime-400)'
              }}>
                <Leaf size={18} />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--color-forest-950)'
              }}>
                RE:MAKE AI
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              Waste Less. Imagine More. Create Differently. An intelligent circular design platform
              transforming unused physical scrap into functional, beautiful everyday objects.
            </p>
            <div style={{ fontSize: '0.74rem', color: 'var(--color-text-light)' }}>
              Powered by Google Gemini Multimodal AI & Industrial Circular Principles.
            </div>
          </div>

          {/* Quick links & Back to Top */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
            <button
              onClick={onScrollToTop}
              className="btn btn-outline"
              style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem' }}
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '0.5rem' }}>
              Designed for zero-waste makers worldwide
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--color-border-subtle)',
          paddingTop: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.76rem',
          color: 'var(--color-text-light)'
        }}>
          <div>
            © {new Date().getFullYear()} RE:MAKE AI. All rights reserved. Open-source sustainability.
          </div>
          <div>
            API keys kept secure server-side • Zero telemetry on uploaded photos
          </div>
        </div>
      </div>
    </footer>
  );
}
