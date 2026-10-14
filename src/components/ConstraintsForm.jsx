import React, { useState } from 'react';
import { Sliders, Wrench, Clock, DollarSign, ShieldAlert, Ban, Plus, X } from 'lucide-react';

const COMMON_TOOLS = [
  'Scissors',
  'Utility knife',
  'Hot glue gun',
  'Ruler / Tape measure',
  'Screwdriver',
  'Hand saw',
  'Sandpaper',
  'Drill',
  'Sewing needle & thread',
  'None (Hands only)'
];

const TIME_PRESETS = [
  '15 minutes',
  '30 minutes',
  '45 minutes',
  '1 hour',
  'Weekend project'
];

const BUDGET_PRESETS = [
  '$0 (Strictly free)',
  'Under $5',
  'Under $15',
  'Flexible'
];

export default function ConstraintsForm({
  constraints,
  onConstraintChange
}) {
  const [customToolInput, setCustomToolInput] = useState('');

  const toggleTool = (tool) => {
    let current = Array.isArray(constraints.tools) ? [...constraints.tools] : [];
    if (tool === 'None (Hands only)') {
      if (current.includes(tool)) {
        current = [];
      } else {
        current = [tool];
      }
    } else {
      current = current.filter(t => t !== 'None (Hands only)');
      if (current.includes(tool)) {
        current = current.filter(t => t !== tool);
      } else {
        current.push(tool);
      }
    }
    onConstraintChange('tools', current);
  };

  const handleAddCustomTool = (e) => {
    e.preventDefault();
    if (!customToolInput.trim()) return;
    const current = Array.isArray(constraints.tools) ? [...constraints.tools] : [];
    if (!current.includes(customToolInput.trim())) {
      onConstraintChange('tools', [...current, customToolInput.trim()]);
    }
    setCustomToolInput('');
  };

  const handleRemoveTool = (tool) => {
    const current = Array.isArray(constraints.tools) ? [...constraints.tools] : [];
    onConstraintChange('tools', current.filter(t => t !== tool));
  };

  return (
    <div className="card-glass" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        marginBottom: '1.25rem'
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
          03
        </div>
        <div>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--color-forest-950)' }}>
            Constraints & Boundary Conditions
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            Tell RE:MAKE AI your budget, available tools, time, and rules for what must not be damaged.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {/* Budget */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <DollarSign size={15} color="var(--color-forest-600)" />
              <span>Budget</span>
            </span>
            <span className="form-hint">{constraints.budget || 'Minimal'}</span>
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.5rem' }}>
            {BUDGET_PRESETS.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => onConstraintChange('budget', b)}
                className={`tool-chip ${constraints.budget === b ? 'selected' : ''}`}
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
              >
                {b}
              </button>
            ))}
          </div>
          <input
            type="text"
            className="input-text"
            value={constraints.budget}
            onChange={(e) => onConstraintChange('budget', e.target.value)}
            placeholder="Custom budget (e.g. $10 maximum)"
            style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
          />
        </div>

        {/* Time Available */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={15} color="var(--color-forest-600)" />
              <span>Time Available</span>
            </span>
            <span className="form-hint">{constraints.time || '1 hour'}</span>
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.5rem' }}>
            {TIME_PRESETS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onConstraintChange('time', t)}
                className={`tool-chip ${constraints.time === t ? 'selected' : ''}`}
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
              >
                {t}
              </button>
            ))}
          </div>
          <input
            type="text"
            className="input-text"
            value={constraints.time}
            onChange={(e) => onConstraintChange('time', e.target.value)}
            placeholder="Custom time (e.g. 20 minutes before work)"
            style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem' }}
          />
        </div>
      </div>

      {/* Available Tools */}
      <div className="form-group" style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
        <label className="form-label">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Wrench size={15} color="var(--color-forest-600)" />
            <span>Available Tools & Gear</span>
          </span>
          <span className="form-hint">
            {(constraints.tools || []).length} selected
          </span>
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '0.65rem' }}>
          {COMMON_TOOLS.map((tool) => {
            const isSelected = (constraints.tools || []).includes(tool);
            return (
              <button
                key={tool}
                type="button"
                onClick={() => toggleTool(tool)}
                className={`tool-chip ${isSelected ? 'selected' : ''}`}
              >
                {tool}
              </button>
            );
          })}
        </div>

        {/* Custom tool tag adder */}
        <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '380px' }}>
          <input
            type="text"
            className="input-text"
            placeholder="Add custom tool (e.g. staple gun, clamps)..."
            value={customToolInput}
            onChange={(e) => setCustomToolInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAddCustomTool(e); }}
            style={{ fontSize: '0.82rem', padding: '0.45rem 0.75rem' }}
          />
          <button
            type="button"
            onClick={handleAddCustomTool}
            className="btn btn-outline"
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
          >
            <Plus size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {/* Materials that MUST NOT be damaged */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldAlert size={15} color="#b45309" />
              <span>Materials That Must NOT Be Damaged</span>
            </span>
            <span className="form-hint">Crucial for reversible reuse</span>
          </label>
          <input
            type="text"
            className="input-text"
            value={constraints.preserveMaterials}
            onChange={(e) => onConstraintChange('preserveMaterials', e.target.value)}
            placeholder="e.g. Keep glass jars intact, don't peel vintage book cover..."
          />
        </div>

        {/* Other Restrictions */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Ban size={15} color="var(--color-forest-700)" />
              <span>Other Restrictions & Safety Limits</span>
            </span>
            <span className="form-hint">Physical, health, or aesthetic limits</span>
          </label>
          <input
            type="text"
            className="input-text"
            value={constraints.restrictions}
            onChange={(e) => onConstraintChange('restrictions', e.target.value)}
            placeholder="e.g. Child-safe rounded corners, waterproof, no smelly fumes..."
          />
        </div>
      </div>
    </div>
  );
}
