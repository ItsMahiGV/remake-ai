import React, { useEffect, useState } from 'react';
import { Sparkles, Eye, Cpu, Compass, CheckCircle2 } from 'lucide-react';

const STAGES = [
  { label: 'Reading image & preparing multimodal payload...', icon: Eye },
  { label: 'Gemini Vision identifying materials & condition...', icon: Sparkles },
  { label: 'Synthesizing structural joinery against your constraints...', icon: Compass },
  { label: 'Calculating circular metrics & step-by-step instructions...', icon: Cpu }
];

export default function LoadingState({ isSwitching = false, constraintName = '' }) {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStage((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card-glass animate-fade-in" style={{
      padding: '3rem 2rem',
      textAlign: 'center',
      maxWidth: '650px',
      margin: '2rem auto'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-forest-50)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-forest-700)',
        marginBottom: '1.25rem',
        boxShadow: '0 0 24px rgba(132, 204, 22, 0.3)'
      }}>
        <Sparkles size={32} className="status-dot-active" />
      </div>

      <h3 style={{
        fontSize: '1.4rem',
        color: 'var(--color-forest-950)',
        marginBottom: '0.5rem'
      }}>
        {isSwitching
          ? `Re-engineering for: "${constraintName}"`
          : 'Reimagining Your Materials with Gemini AI'}
      </h3>

      <p style={{
        fontSize: '0.88rem',
        color: 'var(--color-text-muted)',
        maxWidth: '460px',
        margin: '0 auto 1.5rem auto'
      }}>
        {isSwitching
          ? 'Analyzing constraint violations, redesigning joinery, and compiling the adaptation summary...'
          : 'Examining visual characteristics, testing structural hypotheses, and honoring your budget & tool limits.'}
      </p>

      {/* Shimmer Bar */}
      <div className="shimmer-bar" style={{ maxWidth: '380px', margin: '0 auto 1.75rem auto' }}></div>

      {/* Stages list */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
        textAlign: 'left',
        maxWidth: '420px',
        margin: '0 auto'
      }}>
        {STAGES.map((st, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;
          const Icon = st.icon;

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                fontSize: '0.82rem',
                fontWeight: isCurrent ? 600 : 400,
                color: isCurrent
                  ? 'var(--color-forest-900)'
                  : isDone
                  ? 'var(--color-forest-600)'
                  : 'var(--color-text-light)',
                transition: 'all 0.3s ease'
              }}
            >
              {isDone ? (
                <CheckCircle2 size={16} color="var(--color-forest-600)" />
              ) : (
                <Icon size={16} color={isCurrent ? 'var(--color-lime-500)' : 'var(--color-text-light)'} />
              )}
              <span>{st.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
