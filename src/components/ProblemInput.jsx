import React from 'react';
import { Target, Lightbulb } from 'lucide-react';

const SUGGESTED_GOALS = [
  'Inexpensive organizer for study desk',
  'Low-maintenance indoor herb planter',
  'Ergonomic laptop riser for work',
  'Wall-mounted key & mail catchall',
  'Cable management dock for bedside',
  'Cat scratching post or pet toy',
  'Acoustic sound-dampening wall panel'
];

export default function ProblemInput({ problem, onProblemChange }) {
  return (
    <div className="card-glass" style={{ padding: '1.75rem', marginBottom: '1.75rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        marginBottom: '1rem'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          backgroundColor: 'var(--color-forest-50)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-forest-700)',
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
          fontSize: '0.85rem'
        }}>
          02
        </div>
        <div>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--color-forest-950)' }}>
            Problem & Goal Input
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            What do you want to create, solve, or organize with these materials?
          </p>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          <span>What do you want to make or solve?</span>
          <span className="form-hint" style={{ color: problem ? 'var(--color-forest-600)' : 'var(--color-text-light)' }}>
            {problem ? `${problem.length} chars` : 'Required'}
          </span>
        </label>
        <textarea
          className="input-textarea"
          value={problem}
          onChange={(e) => onProblemChange(e.target.value)}
          placeholder="e.g. I need an inexpensive organizer for my study desk to hold pens, notebooks, and my phone..."
          rows={3}
          style={{ fontSize: '1rem', lineHeight: '1.5' }}
        />
      </div>

      {/* Suggested Goal Sparks */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.78rem',
          fontWeight: 600,
          color: 'var(--color-forest-800)',
          marginBottom: '0.5rem'
        }}>
          <Lightbulb size={14} color="var(--color-lime-500)" />
          <span>Idea Sparks (Click to populate):</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
          {SUGGESTED_GOALS.map((goal, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onProblemChange(goal)}
              style={{
                background: '#ffffff',
                border: '1px solid var(--color-border-medium)',
                borderRadius: 'var(--radius-full)',
                padding: '0.35rem 0.75rem',
                fontSize: '0.78rem',
                color: 'var(--color-forest-900)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-forest-600)';
                e.currentTarget.style.backgroundColor = 'var(--color-forest-50)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-medium)';
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              + {goal}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
