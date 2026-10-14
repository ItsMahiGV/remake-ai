import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SamplePicker from './components/SamplePicker';
import MaterialInput from './components/MaterialInput';
import ProblemInput from './components/ProblemInput';
import ConstraintsForm from './components/ConstraintsForm';
import LoadingState from './components/LoadingState';
import ResultsView from './components/ResultsView';
import ConstraintSwitch from './components/ConstraintSwitch';
import SettingsModal from './components/SettingsModal';
import Footer from './components/Footer';

import {
  fetchServerStatus,
  fetchSamples,
  submitReimagine,
  submitConstraintSwitch
} from './services/api';

import { Sparkles, AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';

export default function App() {
  const [serverStatus, setServerStatus] = useState(null);
  const [sampleProjects, setSampleProjects] = useState([]);

  // Form State
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [additionalMaterials, setAdditionalMaterials] = useState('');
  const [problem, setProblem] = useState('');
  const [constraints, setConstraints] = useState({
    budget: 'Under $5',
    tools: ['Scissors', 'Ruler / Tape measure'],
    time: '45 minutes',
    preserveMaterials: '',
    restrictions: ''
  });

  // Flow & AI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [activeSwitchConstraint, setActiveSwitchConstraint] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedSampleId, setSelectedSampleId] = useState(null);

  // Result Solutions
  const [solution, setSolution] = useState(null);
  const [originalSolution, setOriginalSolution] = useState(null);
  const [adaptedSolution, setAdaptedSolution] = useState(null);
  const [activeVersion, setActiveVersion] = useState('original');
  const [isDemoResult, setIsDemoResult] = useState(false);

  // Modals & UI
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const formSectionRef = useRef(null);
  const resultsSectionRef = useRef(null);

  // Load initial server status & samples
  useEffect(() => {
    loadStatus();
    loadSamples();
  }, []);

  const loadStatus = async () => {
    const status = await fetchServerStatus();
    setServerStatus(status);
  };

  const loadSamples = async () => {
    const samples = await fetchSamples();
    setSampleProjects(samples);
  };

  // Preset sample loader
  const handleSelectSample = (sample) => {
    setSelectedSampleId(sample.id);
    setImagePreview(sample.uploadedImagePreview);
    setImageFile(null); // using sample image
    setAdditionalMaterials(sample.additionalMaterialsInput || '');
    setProblem(sample.problem || '');
    setConstraints({
      budget: sample.constraints?.budget || 'Under $5',
      tools: sample.constraints?.tools || ['Scissors', 'Utility knife'],
      time: sample.constraints?.time || '45 minutes',
      preserveMaterials: sample.constraints?.preserveMaterials || '',
      restrictions: sample.constraints?.restrictions || ''
    });
    setErrorMsg('');

    // Smooth scroll to form
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleConstraintChange = (field, value) => {
    setConstraints(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (file, dataUrl) => {
    setImageFile(file);
    setImagePreview(dataUrl);
    setSelectedSampleId(null);
    setErrorMsg('');
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
    setSelectedSampleId(null);
  };

  // Submit AI Reimagining (Feature 4)
  const handleReimagine = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!imagePreview) {
      setErrorMsg('Please upload a photo of your unused materials or pick a sample demonstration.');
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (!problem.trim()) {
      setErrorMsg('Please describe what you want to make or solve.');
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsGenerating(true);
    setAdaptedSolution(null);
    setActiveVersion('original');

    try {
      const customKey = localStorage.getItem('remake_custom_gemini_key') || null;
      const isDemoMode = !serverStatus?.hasEnvKey && !customKey;

      const res = await submitReimagine({
        imageBase64: imagePreview,
        mimeType: imageFile ? imageFile.type : 'image/svg+xml',
        description: additionalMaterials,
        problem,
        budget: constraints.budget,
        tools: constraints.tools,
        time: constraints.time,
        preserveMaterials: constraints.preserveMaterials,
        restrictions: constraints.restrictions,
        isDemoMode,
        selectedSampleId,
        customApiKey: customKey
      });

      setSolution(res.solution);
      setOriginalSolution(res.solution);
      setIsDemoResult(Boolean(res.isDemo));

      // Scroll to results
      setTimeout(() => {
        resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('Reimagining error:', err);
      setErrorMsg(err.message || 'Failed to generate reuse solution. Please check your inputs or try demo mode.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Apply Signature Feature: Constraint Switch (Feature 5)
  const handleApplySwitch = async (changedConstraint, userNote = '') => {
    setErrorMsg('');
    setIsSwitching(true);
    setActiveSwitchConstraint(changedConstraint);

    try {
      const customKey = localStorage.getItem('remake_custom_gemini_key') || null;
      const isDemoMode = !serverStatus?.hasEnvKey && !customKey;

      const res = await submitConstraintSwitch({
        previousSolution: solution,
        changedConstraint,
        userNote,
        isDemoMode,
        selectedSampleId,
        customApiKey: customKey
      });

      setAdaptedSolution(res.adaptedSolution);
      setActiveVersion('adapted');
      setSolution(res.adaptedSolution);
    } catch (err) {
      console.error('Constraint switch error:', err);
      setErrorMsg(err.message || 'Failed to adapt solution for this constraint.');
    } finally {
      setIsSwitching(false);
    }
  };

  const handleToggleVersion = (version) => {
    setActiveVersion(version);
    if (version === 'original') {
      setSolution(originalSolution);
    } else {
      setSolution(adaptedSolution);
    }
  };

  const handleReset = () => {
    setSolution(null);
    setOriginalSolution(null);
    setAdaptedSolution(null);
    setImageFile(null);
    setImagePreview(null);
    setAdditionalMaterials('');
    setProblem('');
    setSelectedSampleId(null);
    setErrorMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <Navbar
        serverStatus={serverStatus}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onSelectSample={handleSelectSample}
        sampleProjects={sampleProjects}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <Hero
          onScrollToForm={() => formSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
          onSelectSample={handleSelectSample}
          sampleProjects={sampleProjects}
        />

        <div className="container" style={{ maxWidth: '980px' }}>
          {/* Sample Demonstrations Banner */}
          <SamplePicker
            samples={sampleProjects}
            onSelectSample={handleSelectSample}
            activeSampleId={selectedSampleId}
          />

          {/* Form Anchor */}
          <div ref={formSectionRef} />

          {/* Global Error Banner */}
          {errorMsg && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#fef2f2',
              border: '1px solid #fee2e2',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              color: '#991b1b',
              fontSize: '0.88rem',
              marginBottom: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <AlertCircle size={20} style={{ flexShrink: 0 }} />
                <span>{errorMsg}</span>
              </div>
              {errorMsg.includes('API_KEY') && (
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(true)}
                  className="btn btn-outline"
                  style={{
                    fontSize: '0.78rem',
                    padding: '0.35rem 0.75rem',
                    borderColor: '#fca5a5',
                    color: '#991b1b'
                  }}
                >
                  Configure Key
                </button>
              )}
            </div>
          )}

          {/* The Core Input Workflow */}
          <form onSubmit={handleReimagine}>
            {/* Feature 1: Material Input */}
            <MaterialInput
              imageFile={imageFile}
              imagePreview={imagePreview}
              onImageChange={handleImageChange}
              onImageRemove={handleImageRemove}
              additionalMaterials={additionalMaterials}
              onAdditionalMaterialsChange={setAdditionalMaterials}
            />

            {/* Feature 2: Problem Input */}
            <ProblemInput
              problem={problem}
              onProblemChange={setProblem}
            />

            {/* Feature 3: Constraints */}
            <ConstraintsForm
              constraints={constraints}
              onConstraintChange={handleConstraintChange}
            />

            {/* Submit Action */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <button
                type="submit"
                disabled={isGenerating || !imagePreview || !problem.trim()}
                className="btn btn-accent"
                style={{
                  fontSize: '1.15rem',
                  padding: '1rem 2.5rem',
                  boxShadow: '0 6px 24px var(--color-lime-glow)'
                }}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={20} className="status-dot-active" />
                    <span>Analyzing Materials with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    <span>Generate AI Reuse Design</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div style={{
                fontSize: '0.78rem',
                color: 'var(--color-text-light)',
                marginTop: '0.65rem'
              }}>
                Multimodal vision checks material viability, structural balance, and waste diversion.
              </div>
            </div>
          </form>

          {/* Loading Indicator */}
          {isGenerating && <LoadingState />}
          {isSwitching && (
            <LoadingState
              isSwitching={true}
              constraintName={activeSwitchConstraint}
            />
          )}

          {/* Results Section */}
          <div ref={resultsSectionRef} />
          {solution && !isGenerating && (
            <>
              {/* Feature 5: Signature Constraint Switch */}
              <ConstraintSwitch
                solution={solution}
                adaptedSolution={adaptedSolution}
                onApplySwitch={handleApplySwitch}
                isLoading={isSwitching}
                currentConstraint={activeSwitchConstraint}
                activeVersion={activeVersion}
                onToggleVersion={handleToggleVersion}
              />

              {/* Feature 4: AI Reimagining Output */}
              <ResultsView
                solution={solution}
                isDemo={isDemoResult}
                uploadedImagePreview={imagePreview}
                onReset={handleReset}
              />
            </>
          )}
        </div>
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        serverStatus={serverStatus}
        onKeySaved={loadStatus}
      />

      {/* Footer */}
      <Footer onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
    </div>
  );
}
