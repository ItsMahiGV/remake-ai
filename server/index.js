import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateReuseSolution, switchConstraintSolution } from './geminiService.js';
import { SAMPLE_PROJECTS } from './sampleData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
// Allow up to 20mb for base64 photo uploads
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Helper to get active API key
function getApiKey(req) {
  // Check custom header if user provided one in app settings, else use server env var
  const customHeader = req.headers['x-gemini-key'];
  if (customHeader && typeof customHeader === 'string' && customHeader.trim().length > 10) {
    return customHeader.trim();
  }
  return process.env.GEMINI_API_KEY || null;
}

// 1. Health & Configuration Status
app.get('/api/status', (req, res) => {
  const hasEnvKey = !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 5);
  res.json({
    ok: true,
    hasEnvKey,
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    samplesCount: SAMPLE_PROJECTS.length,
    timestamp: new Date().toISOString()
  });
});

// 2. Sample Demonstrations
app.get('/api/samples', (req, res) => {
  res.json({
    ok: true,
    samples: SAMPLE_PROJECTS
  });
});

// 3. Feature 4: Multimodal AI Reimagining
app.post('/api/reimagine', async (req, res) => {
  try {
    const {
      imageBase64,
      mimeType,
      description,
      problem,
      budget,
      tools,
      time,
      preserveMaterials,
      restrictions,
      isDemoMode,
      selectedSampleId
    } = req.body;

    // Handle demo mode explicitly
    if (isDemoMode && selectedSampleId) {
      const found = SAMPLE_PROJECTS.find(s => s.id === selectedSampleId) || SAMPLE_PROJECTS[0];
      return res.json({
        ok: true,
        isDemo: true,
        solution: found.solution,
        sampleData: found
      });
    }

    const apiKey = getApiKey(req);
    if (!apiKey) {
      return res.status(403).json({
        ok: false,
        error: 'GEMINI_API_KEY_MISSING',
        message: 'No GEMINI_API_KEY configured on server or in request header.',
        suggestion: 'Add your GEMINI_API_KEY to the .env file or test with our interactive sample demonstrations.'
      });
    }

    // Validation: Image presence and format
    if (!imageBase64) {
      return res.status(400).json({
        ok: false,
        error: 'IMAGE_REQUIRED',
        message: 'Please upload a photograph of your unused materials.'
      });
    }

    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic'];
    if (mimeType && !validMimes.includes(mimeType.toLowerCase())) {
      return res.status(400).json({
        ok: false,
        error: 'INVALID_IMAGE_TYPE',
        message: `Supported image formats: JPG, PNG, WEBP, GIF. Received: ${mimeType}`
      });
    }

    // Check payload size (approximate from base64 length)
    const approximateSizeMB = (imageBase64.length * 0.75) / (1024 * 1024);
    if (approximateSizeMB > 12) {
      return res.status(400).json({
        ok: false,
        error: 'IMAGE_TOO_LARGE',
        message: `Image is too large (${approximateSizeMB.toFixed(1)}MB). Please upload an image under 10MB.`
      });
    }

    // Validation: Problem statement
    if (!problem || !problem.trim()) {
      return res.status(400).json({
        ok: false,
        error: 'PROBLEM_REQUIRED',
        message: 'Please tell RE:MAKE AI what you would like to create or solve.'
      });
    }

    const solution = await generateReuseSolution({
      imageBase64,
      mimeType,
      description,
      problem,
      budget,
      tools,
      time,
      preserveMaterials,
      restrictions,
      apiKey
    });

    res.json({
      ok: true,
      isDemo: false,
      solution
    });
  } catch (error) {
    console.error('Error in /api/reimagine:', error);
    const status = error.message === 'GEMINI_API_KEY_MISSING' ? 403 : 500;
    res.status(status).json({
      ok: false,
      error: error.message,
      message: error.message || 'An error occurred during AI analysis.'
    });
  }
});

// 4. Feature 5: Signature Feature - Constraint Switch
app.post('/api/switch-constraint', async (req, res) => {
  try {
    const {
      previousSolution,
      changedConstraint,
      userNote,
      isDemoMode,
      selectedSampleId
    } = req.body;

    if (!previousSolution) {
      return res.status(400).json({
        ok: false,
        error: 'PREVIOUS_SOLUTION_REQUIRED',
        message: 'Previous reuse design is required to switch constraints.'
      });
    }

    if (!changedConstraint) {
      return res.status(400).json({
        ok: false,
        error: 'CONSTRAINT_REQUIRED',
        message: 'Please select or type a constraint to switch.'
      });
    }

    // If demo mode or no key, check if we have a sample pre-computed adaptation
    const apiKey = getApiKey(req);
    if (!apiKey) {
      // Look for sample match
      if (selectedSampleId) {
        const sample = SAMPLE_PROJECTS.find(s => s.id === selectedSampleId);
        if (sample && sample.sampleConstraintSwitch) {
          return res.json({
            ok: true,
            isDemo: true,
            adaptedSolution: sample.sampleConstraintSwitch.adaptedSolution,
            message: 'Generated via Demo Mode (pre-computed constraint adaptation)'
          });
        }
      }
      return res.status(403).json({
        ok: false,
        error: 'GEMINI_API_KEY_MISSING',
        message: 'No GEMINI_API_KEY configured. Please configure your key in .env or switch to a sample demonstration.'
      });
    }

    const adaptedSolution = await switchConstraintSolution({
      previousSolution,
      changedConstraint,
      userNote,
      apiKey
    });

    res.json({
      ok: true,
      isDemo: false,
      adaptedSolution
    });
  } catch (error) {
    console.error('Error in /api/switch-constraint:', error);
    res.status(500).json({
      ok: false,
      error: error.message,
      message: error.message || 'An error occurred while adapting the design.'
    });
  }
});

// Serve frontend build in production
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Fallback to index.html for client routing
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n===========================================`);
  console.log(`🌿 RE:MAKE AI Server running on port ${PORT}`);
  console.log(`   Gemini API Key: ${process.env.GEMINI_API_KEY ? 'CONFIGURED' : 'NOT SET (Demo mode available)'}`);
  console.log(`===========================================\n`);
});
