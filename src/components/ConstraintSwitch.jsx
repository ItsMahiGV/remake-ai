import React, { useState } from 'react';
import { SlidersHorizontal, RefreshCw, Sparkles, Check, AlertTriangle, ArrowRight, GitCommit, Layers } from 'lucide-react';

const PRESET_SWITCHES = [
  { label: '✂️ No cutting allowed', value: 'No cutting allowed (Zero cuts, preserve raw shapes or fold only)' },
  { label: '🧴 No glue available', value: 'No glue available (Zero adhesives, mechanical joinery or friction only)' },
  { label: '💸 Zero budget', value: 'Zero budget ($0.00 strictly, only existing materials)' },
  { label: '⏱️ Only 15 minutes', value: 'Only 15 minutes available (Fastest possible assembly)' },
  { label: '👶 Child-safe / Non-toxic', value: 'Must be completely child-safe with no sharp edges or toxic finishes' },
  { label: '🌧️ Weatherproof / Outdoor', value: 'Must be weatherproof for outdoor balcony or garden use' }
];

export default function ConstraintSwitch({
  solution,
  adaptedSolution,
  onApplySwitch,
  isLoading,
  currentConstraint,
  activeVersion,
  onToggleVersion
}) {
  const [selectedPreset, setSelectedPreset] = useState('');
  const [customConstraint, setCustomConstraint] = useState('');
  const [userNote, setUserNote] = useState('');

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset.value);
    setCustomConstraint('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalConstraint = customConstraint.trim() || selectedPreset;
    if (!finalConstraint) return;
    onApplySwitch(finalConstraint, userNote);
  };

  const hasAdapted = !!adaptedSolution;
  const adaptation = adaptedSolution?.adaptationSummary;

  return (
    <div className="card-glass" style={{
      padding: '2rem',
      marginBottom: '2rem',
      border: '2px solid rgba(132, 204, 22, 0.5)',
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(244, 249, 245, 0.95) 100%)',
      boxShadow: '0 8px 30px rgba(22, 61, 43, 0.08)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: 'var(--color-lime-400)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-forest-950)'
          }}>
            <SlidersHorizontal size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-950)' }}>
                Signature Feature: Constraint Switch
              </h3>
              <span className="badge badge-forest" style={{ fontSize: '0.68rem' }}>
                AI Re-engineering
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              Real-world conditions change. Switch a constraint to make Gemini re-engineer joinery, tools, and steps.
            </p>
          </div>
        </div>

        {/* Version Switcher if adapted */}
        {hasAdapted && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: 'rgba(22, 61, 43, 0.08)',
            padding: '0.25rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(22, 61, 43, 0.15)'
          }}>
            <button
              type="button"
              onClick={() => onToggleVersion('original')}
              style={{
                border: 'none',
                background: activeVersion === 'original' ? '#ffffff' : 'transparent',
                color: activeVersion === 'original' ? 'var(--color-forest-950)' : 'var(--color-text-muted)',
                fontWeight: 600,
                fontSize: '0.78rem',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                boxShadow: activeVersion === 'original' ? 'var(--shadow-sm)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Original (v1)
            </button>
            <button
              type="button"
              onClick={() => onToggleVersion('adapted')}
              style={{
                border: 'none',
                background: activeVersion === 'adapted' ? 'var(--color-forest-800)' : 'transparent',
                color: activeVersion === 'adapted' ? '#ffffff' : 'var(--color-text-muted)',
                fontWeight: 600,
                fontSize: '0.78rem',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                boxShadow: activeVersion === 'adapted' ? '0 2px 8px rgba(22, 61, 43, 0.2)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              Adapted (v2 active)
            </button>
          </div>
        )}
      </div>

      {/* Adaptation Diff Summary Box (What changed & Why) */}
      {hasAdapted && adaptation && (
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(132, 204, 22, 0.6)',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-forest-800)',
            fontWeight: 700,
            fontSize: '0.92rem',
            marginBottom: '0.75rem',
            borderBottom: '1px solid var(--color-border-subtle)',
            paddingBottom: '0.5rem'
          }}>
            <GitCommit size={18} color="var(--color-lime-500)" />
            <span>Adaptation Log: Re-engineered for "{currentConstraint}"</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {/* What Changed */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-forest-900)', marginBottom: '0.4rem' }}>
                🔄 What Changed:
              </div>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
                {Array.isArray(adaptation.whatChanged) ? (
                  adaptation.whatChanged.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{item}</li>
                  ))
                ) : (
                  <li>{adaptation.whatChanged}</li>
                )}
              </ul>
            </div>

            {/* Why Changed */}
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-forest-900)', marginBottom: '0.4rem' }}>
                💡 Why It Changed:
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                {adaptation.whyChanged}
              </p>
            </div>
          </div>

          {/* Tradeoffs */}
          {adaptation.tradeoffs && (
            <div style={{
              marginTop: '0.85rem',
              paddingTop: '0.75rem',
              borderTop: '1px dashed var(--color-border-subtle)',
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem'
            }}>
              <span style={{ fontWeight: 700, color: 'var(--color-forest-900)', whiteSpace: 'nowrap' }}>⚖️ Trade-offs:</span>
              <span>{adaptation.tradeoffs}</span>
            </div>
          )}
        </div>
      )}

      {/* Selector Presets Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--color-forest-900)',
            marginBottom: '0.5rem'
          }}>
            Choose a new constraint to test AI adaptability:
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {PRESET_SWITCHES.map((preset) => {
              const isSelected = selectedPreset === preset.value && !customConstraint;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  style={{
                    borderRadius: 'var(--radius-full)',
                    border: isSelected
                      ? '2px solid var(--color-forest-700)'
                      : '1px solid var(--color-border-medium)',
                    backgroundColor: isSelected ? 'var(--color-forest-800)' : '#ffffff',
                    color: isSelected ? '#ffffff' : 'var(--color-text-main)',
                    fontWeight: 600,
                    fontSize: '0.82rem',
                    padding: '0.45rem 0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Constraint input */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
          <div>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>
              <span>Or type any custom constraint:</span>
            </label>
            <input
              type="text"
              className="input-text"
              placeholder="e.g. Must fold flat for travel, or cannot use any metal fasteners..."
              value={customConstraint}
              onChange={(e) => {
                setCustomConstraint(e.target.value);
                if (e.target.value) setSelectedPreset('');
              }}
              style={{ fontSize: '0.85rem', padding: '0.6rem 0.85rem' }}
            />
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>
              <span>Additional context / reason (optional):</span>
            </label>
            <input
              type="text"
              className="input-text"
              placeholder="e.g. My drill battery died, or I live in a quiet dorm..."
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              style={{ fontSize: '0.85rem', padding: '0.6rem 0.85rem' }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || (!selectedPreset && !customConstraint.trim())}
          className="btn btn-accent"
          style={{
            fontSize: '0.95rem',
            padding: '0.7rem 1.6rem',
            fontWeight: 700
          }}
        >
          {isLoading ? (
            <>
              <RefreshCw size={16} className="status-dot-active" />
              <span>Adapting Solution with Gemini...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Re-engineer Design With This Constraint</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
