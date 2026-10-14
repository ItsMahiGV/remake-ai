import React from 'react';
import { Sparkles, Package, Sprout, Hammer, ArrowUpRight } from 'lucide-react';

export default function SamplePicker({ samples, onSelectSample, activeSampleId }) {
  if (!samples || samples.length === 0) return null;

  const sampleIcons = {
    'sample-cardboard-organizer': Package,
    'sample-glass-planter': Sprout,
    'sample-pallet-riser': Hammer
  };

  return (
    <div style={{
      marginBottom: '2.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      border: '1px solid var(--color-border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding: '1.25rem 1.5rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={16} color="var(--color-forest-600)" />
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.92rem',
            color: 'var(--color-forest-950)'
          }}>
            Sample Demonstrations
          </span>
          <span className="badge badge-lime" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
            Zero setup required
          </span>
        </div>
        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>
          Click any sample to pre-populate materials, problem, and constraints
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '0.85rem'
      }}>
        {samples.map((sample) => {
          const IconComponent = sampleIcons[sample.id] || Package;
          const isSelected = activeSampleId === sample.id;

          return (
            <div
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              style={{
                cursor: 'pointer',
                borderRadius: 'var(--radius-md)',
                border: isSelected
                  ? '2px solid var(--color-forest-600)'
                  : '1px solid var(--color-border-medium)',
                backgroundColor: isSelected ? 'var(--color-forest-50)' : '#ffffff',
                padding: '0.85rem 1rem',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isSelected ? '0 4px 12px rgba(22, 61, 43, 0.12)' : 'var(--shadow-sm)',
                transform: isSelected ? 'translateY(-2px)' : 'none'
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.4rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--color-forest-800)',
                    fontWeight: 700,
                    fontSize: '0.86rem'
                  }}>
                    <IconComponent size={16} />
                    <span>{sample.tagline}</span>
                  </div>
                  <ArrowUpRight size={14} color="var(--color-text-light)" />
                </div>
                <div style={{
                  fontSize: '0.78rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  "{sample.problem}"
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '0.75rem',
                fontSize: '0.72rem',
                color: 'var(--color-forest-700)',
                fontWeight: 600
              }}>
                <span className="badge badge-forest" style={{ padding: '0.15rem 0.45rem', fontSize: '0.65rem' }}>
                  {sample.constraints.time}
                </span>
                <span className="badge badge-forest" style={{ padding: '0.15rem 0.45rem', fontSize: '0.65rem' }}>
                  Budget: {sample.constraints.budget}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
