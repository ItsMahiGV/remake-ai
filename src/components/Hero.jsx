import React from 'react';
import { Sparkles, Recycle, ArrowRight, ShieldCheck, Zap, SlidersHorizontal } from 'lucide-react';

export default function Hero({ onScrollToForm, onSelectSample, sampleProjects }) {
  return (
    <section style={{
      padding: '3rem 0 2rem 0',
      textAlign: 'center',
      position: 'relative'
    }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Top Tagline Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'rgba(22, 61, 43, 0.08)',
          border: '1px solid rgba(22, 61, 43, 0.12)',
          borderRadius: 'var(--radius-full)',
          padding: '0.4rem 1rem',
          marginBottom: '1.25rem',
          fontSize: '0.82rem',
          fontWeight: 600,
          color: 'var(--color-forest-800)'
        }}>
          <Recycle size={15} color="var(--color-forest-600)" />
          <span>Waste Less. Imagine More. Create Differently.</span>
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          color: 'var(--color-forest-950)',
          marginBottom: '1.25rem'
        }}>
          Turn Unused Materials Into Useful Creations with{' '}
          <span style={{
            background: 'linear-gradient(135deg, var(--color-forest-700) 0%, var(--color-forest-500) 50%, var(--color-lime-500) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline'
          }}>
            Multimodal AI
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
          color: 'var(--color-text-muted)',
          maxWidth: '680px',
          margin: '0 auto 2rem auto',
          lineHeight: 1.6
        }}>
          Upload a photo of leftover cardboard, glass, scrap wood, or fabric.
          Tell RE:MAKE AI what you need and your real-world constraints—then watch our AI
          engineer step-by-step upcycling blueprints and adapt them on the fly.
        </p>

        {/* Feature Badges */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            background: '#ffffff',
            border: '1px solid var(--color-border-subtle)',
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'var(--color-text-main)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Sparkles size={14} color="var(--color-forest-600)" />
            <span>Gemini Multimodal Vision</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            background: '#ffffff',
            border: '1px solid var(--color-border-subtle)',
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'var(--color-text-main)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <ShieldCheck size={14} color="var(--color-forest-600)" />
            <span>Honest Material Confidence</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            background: '#ffffff',
            border: '1px solid var(--color-border-subtle)',
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'var(--color-text-main)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <SlidersHorizontal size={14} color="var(--color-forest-600)" />
            <span>Signature Constraint Switch</span>
          </div>
        </div>

        {/* Call to action buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={onScrollToForm}
            className="btn btn-primary"
            style={{ fontSize: '1.05rem', padding: '0.85rem 1.8rem' }}
          >
            <span>Start Reimagining</span>
            <ArrowRight size={18} />
          </button>

          {sampleProjects && sampleProjects.length > 0 && (
            <button
              onClick={() => onSelectSample(sampleProjects[0])}
              className="btn btn-outline"
              style={{ fontSize: '1.05rem', padding: '0.85rem 1.6rem' }}
            >
              <span>Explore Instant Demo</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
