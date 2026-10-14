import React, { useState } from 'react';
import {
  CheckCircle2, AlertTriangle, ShieldCheck, Clock, DollarSign,
  Gauge, Recycle, Leaf, Printer, Copy, Check, Wrench, Package,
  Sparkles, HelpCircle, ExternalLink, ArrowRight
} from 'lucide-react';

export default function ResultsView({
  solution,
  isDemo = false,
  uploadedImagePreview,
  onReset
}) {
  const [copied, setCopied] = useState(false);
  const [completedSteps, setCompletedSteps] = useState({});

  if (!solution) return null;

  const toggleStep = (stepNumber) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  const handleCopy = () => {
    const textSummary = `
# ${solution.projectName}
*${solution.tagline}*

## Purpose
${solution.purpose}

## Materials Reused:
${(solution.materialsReused || []).map(m => `- ${m.item} (${m.source}): ${m.prepRequired}`).join('\n')}

## Tools Required:
${(solution.toolsRequired || []).map(t => `- ${t.name}${t.substitute ? ` (or ${t.substitute})` : ''}`).join('\n')}

## Steps:
${(solution.steps || []).map(s => `${s.stepNumber}. ${s.title} (${s.duration}): ${s.instructions}`).join('\n')}

## Environmental Impact:
- Waste Diverted: ${solution.environmentalImpact?.wasteDiverted || 'N/A'}
- Carbon Saved: ${solution.environmentalImpact?.carbonSaved || 'N/A'}
    `.trim();

    navigator.clipboard.writeText(textSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in" style={{ marginBottom: '3rem' }}>
      {/* Top Banner if Demo Mode */}
      {isDemo && (
        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #fde68a',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#92400e' }}>
            <Sparkles size={16} />
            <span>
              <strong>Sample Demonstration Mode:</strong> Displaying curated real-world multimodal reuse design. To run with your own custom photographs, add a Gemini API key.
            </span>
          </div>
          <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>
            Curated Demo
          </span>
        </div>
      )}

      {/* Main Project Card */}
      <div className="card-glass" style={{
        padding: '2.25rem',
        marginBottom: '1.75rem',
        borderTop: '5px solid var(--color-forest-700)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Header with Title & Action buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.25rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-forest" style={{ fontSize: '0.72rem' }}>
                AI Reimagined Blueprint
              </span>
              <span className="badge badge-lime" style={{ fontSize: '0.72rem' }}>
                100% Upcycled
              </span>
            </div>
            <h1 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)',
              color: 'var(--color-forest-950)',
              marginBottom: '0.35rem'
            }}>
              {solution.projectName}
            </h1>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              color: 'var(--color-forest-600)',
              fontWeight: 600
            }}>
              {solution.tagline}
            </p>
          </div>

          {/* Action buttons */}
          <div className="no-print" style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleCopy}
              className="btn btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
              title="Copy project blueprint to clipboard"
            >
              {copied ? <Check size={14} color="var(--color-forest-600)" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="btn btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
              title="Print or save as PDF"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>
            <button
              onClick={onReset}
              className="btn btn-ghost"
              style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
            >
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Purpose Statement */}
        <div style={{
          backgroundColor: 'rgba(22, 61, 43, 0.04)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          borderLeft: '4px solid var(--color-forest-600)',
          marginBottom: '1.75rem',
          fontSize: '0.95rem',
          color: 'var(--color-forest-900)',
          lineHeight: 1.6
        }}>
          <strong>Design Purpose: </strong>
          {solution.purpose}
        </div>

        {/* Quick Spec Metrics Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--color-border-subtle)'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-text-light)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
              <Clock size={14} />
              <span>Total Time</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-forest-950)' }}>
              {solution.totalTime || '45 mins'}
            </div>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-text-light)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
              <DollarSign size={14} />
              <span>Estimated Cost</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-forest-950)' }}>
              {solution.estimatedCost?.total || '$0.00'}
            </div>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-text-light)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
              <Gauge size={14} />
              <span>Difficulty</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-forest-950)' }}>
              {solution.difficulty || 'Beginner'}
            </div>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            padding: '0.85rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-text-light)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
              <Recycle size={14} />
              <span>Waste Diverted</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-forest-700)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {solution.environmentalImpact?.wasteDiverted || 'Materials diverted'}
            </div>
          </div>
        </div>

        {/* Section 1: Multimodal Vision Material Identification */}
        {solution.materialsDetected && solution.materialsDetected.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.85rem'
            }}>
              <Sparkles size={18} color="var(--color-forest-600)" />
              <h3 style={{ fontSize: '1.1rem', color: 'var(--color-forest-950)' }}>
                Multimodal Material Vision & Uncertainty Assessment
              </h3>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '0.85rem'
            }}>
              {solution.materialsDetected.map((mat, idx) => {
                const conf = (mat.confidence || '').toLowerCase();
                const badgeClass = conf.includes('high') ? 'badge-forest' : conf.includes('low') ? 'badge-warning' : 'badge-lime';

                return (
                  <div key={idx} style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--color-border-medium)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-forest-950)' }}>
                        {mat.name}
                      </span>
                      <span className={`badge ${badgeClass}`} style={{ fontSize: '0.65rem' }}>
                        {mat.confidence || 'Detected'}
                      </span>
                    </div>
                    {mat.condition && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.3rem' }}>
                        <strong>Condition: </strong>{mat.condition}
                      </div>
                    )}
                    {mat.notes && (
                      <div style={{ fontSize: '0.76rem', color: 'var(--color-text-light)', fontStyle: 'italic' }}>
                        ⚠️ {mat.notes}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 2: Materials Reused vs Additional Required */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Reused Materials */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-medium)',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-forest-800)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.85rem' }}>
              <Package size={17} color="var(--color-forest-600)" />
              <span>Materials Reused from Your Unused Stock</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {(solution.materialsReused || []).map((m, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  fontSize: '0.84rem'
                }}>
                  <CheckCircle2 size={16} color="var(--color-forest-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <span style={{ fontWeight: 600, color: 'var(--color-forest-950)' }}>{m.item}</span>
                    {m.prepRequired && (
                      <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>
                        Prep: {m.prepRequired}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Materials & Tools */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-medium)',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-forest-800)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.85rem' }}>
              <Wrench size={17} color="var(--color-forest-600)" />
              <span>Tools & Additional Items</span>
            </div>
            {/* Additional Materials */}
            {solution.additionalMaterialsRequired && solution.additionalMaterialsRequired.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-light)', marginBottom: '0.35rem' }}>
                  Additional Common Items:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {solution.additionalMaterialsRequired.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                      <span>• {item.item}</span>
                      <span style={{ fontWeight: 600, color: 'var(--color-forest-700)' }}>{item.estCost}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Tools */}
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-light)', marginBottom: '0.35rem' }}>
                Tools Required (with substitutions):
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {(solution.toolsRequired || []).map((t, idx) => (
                  <div key={idx} style={{ fontSize: '0.82rem', color: 'var(--color-text-main)' }}>
                    • <strong>{t.name}</strong>
                    {t.substitute && (
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}> (sub: {t.substitute})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Step-by-Step Instructions */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="var(--color-forest-600)" />
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-forest-950)' }}>
                Step-by-Step Construction Guide
              </h3>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>
              Click circle to mark progress
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {(solution.steps || []).map((step) => {
              const isChecked = completedSteps[step.stepNumber];
              return (
                <div
                  key={step.stepNumber}
                  style={{
                    backgroundColor: isChecked ? 'rgba(239, 249, 244, 0.7)' : '#ffffff',
                    border: isChecked ? '1px solid var(--color-forest-400)' : '1px solid var(--color-border-medium)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    transition: 'all 0.2s ease',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <button
                      type="button"
                      onClick={() => toggleStep(step.stepNumber)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        marginTop: '2px',
                        color: isChecked ? 'var(--color-forest-600)' : 'var(--color-border-medium)'
                      }}
                    >
                      <CheckCircle2 size={24} fill={isChecked ? 'var(--color-forest-50)' : 'none'} />
                    </button>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.45rem' }}>
                        <h4 style={{
                          fontSize: '1rem',
                          color: isChecked ? 'var(--color-forest-800)' : 'var(--color-forest-950)',
                          textDecoration: isChecked ? 'line-through' : 'none'
                        }}>
                          Step {step.stepNumber}: {step.title}
                        </h4>
                        <span className="badge badge-forest" style={{ fontSize: '0.68rem' }}>
                          {step.duration}
                        </span>
                      </div>

                      <p style={{
                        fontSize: '0.88rem',
                        color: isChecked ? 'var(--color-text-muted)' : 'var(--color-text-main)',
                        lineHeight: 1.6,
                        marginBottom: (step.tip || step.safetyWarning) ? '0.65rem' : 0
                      }}>
                        {step.instructions}
                      </p>

                      {step.tip && (
                        <div style={{
                          backgroundColor: 'rgba(163, 230, 53, 0.12)',
                          borderLeft: '3px solid var(--color-lime-500)',
                          padding: '0.4rem 0.75rem',
                          borderRadius: '0 6px 6px 0',
                          fontSize: '0.78rem',
                          color: 'var(--color-forest-900)',
                          marginBottom: step.safetyWarning ? '0.4rem' : 0
                        }}>
                          <strong>💡 Pro-Tip: </strong>{step.tip}
                        </div>
                      )}

                      {step.safetyWarning && (
                        <div style={{
                          backgroundColor: '#fef2f2',
                          borderLeft: '3px solid #ef4444',
                          padding: '0.4rem 0.75rem',
                          borderRadius: '0 6px 6px 0',
                          fontSize: '0.78rem',
                          color: '#991b1b'
                        }}>
                          <strong>⚠️ Safety Warning: </strong>{step.safetyWarning}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Safety Considerations */}
        {solution.safetyConsiderations && solution.safetyConsiderations.length > 0 && (
          <div style={{
            backgroundColor: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#92400e', fontWeight: 700, fontSize: '0.92rem', marginBottom: '0.5rem' }}>
              <AlertTriangle size={18} />
              <span>Safety Considerations & Precautions</span>
            </div>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.82rem', color: '#78350f', lineHeight: 1.5 }}>
              {solution.safetyConsiderations.map((safety, idx) => (
                <li key={idx} style={{ marginBottom: '0.25rem' }}>{safety}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Section 5: Environmental Benefits & Real Limitations */}
        {solution.environmentalImpact && (
          <div style={{
            backgroundColor: 'var(--color-forest-900)',
            color: 'var(--color-text-on-dark)',
            borderRadius: 'var(--radius-md)',
            padding: '1.75rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Leaf size={20} color="var(--color-lime-400)" />
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff' }}>
                Circular Impact & Honest Environmental Limits
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {/* Benefits */}
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-lime-400)', marginBottom: '0.5rem' }}>
                  🌱 Verified Circularity Benefits:
                </div>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#e5e7eb', lineHeight: 1.5 }}>
                  {(solution.environmentalImpact.benefits || []).map((ben, idx) => (
                    <li key={idx} style={{ marginBottom: '0.35rem' }}>{ben}</li>
                  ))}
                  {solution.environmentalImpact.carbonSaved && (
                    <li style={{ marginTop: '0.5rem', fontWeight: 600, color: 'var(--color-lime-300)' }}>
                      Embodied Carbon Saved: {solution.environmentalImpact.carbonSaved}
                    </li>
                  )}
                </ul>
              </div>

              {/* Honest Limitations */}
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fde68a', marginBottom: '0.5rem' }}>
                  ⚖️ Real-World Limitations & Longevity:
                </div>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#e5e7eb', lineHeight: 1.5 }}>
                  {(solution.environmentalImpact.limitations || []).map((lim, idx) => (
                    <li key={idx} style={{ marginBottom: '0.35rem' }}>{lim}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
