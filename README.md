# 🌿 RE:MAKE AI

> **Waste Less. Imagine More. Create Differently.**

An intelligent circular design web application that transforms unused physical materials into useful, durable creations using **multimodal Google Gemini AI**.

Users upload photographs of materials they have lying around (packaging, scrap timber, glass containers, fabric, etc.), specify what problem they want to solve, set their real-world constraints, and receive an engineered step-by-step upcycling blueprint with real-time constraint switching.

---

## 🌟 Key Features

### 1. Material Input & Multimodal Vision
- **Photo Upload**: Drag-and-drop or file selector supporting JPEG, PNG, WEBP, and GIF up to 10MB.
- **Visual Preview**: Instant high-fidelity preview with dimensional and format indicators.
- **Additional Materials**: Text input to list complementary fasteners, adhesives, rubber bands, or scraps.
- **Sample Presets**: One-click curated material setups for testing without uploading your own images.

### 2. Problem Input
- Open-ended prompt asking what you want to create or organize (e.g., *"I need an inexpensive organizer for my study desk to hold pens, notebooks, and my phone"*).
- Idea spark chips to populate popular use cases (study desk caddy, herb garden, laptop riser, cable organizer).

### 3. Constraints & Boundary Conditions
- **Budget**: Quick presets ($0 strictly free, under $5, under $15, flexible) plus custom amount.
- **Available Tools**: Interactive multi-select (scissors, utility knife, hot glue gun, hand saw, drill, screwdriver, sandpaper, or hands-only).
- **Time Available**: 15 minutes, 30 minutes, 45 minutes, 1 hour, or weekend project.
- **Materials that MUST NOT be damaged**: Reversible joinery rules (e.g., preserve vintage labels, do not drill into glass).
- **Other Restrictions**: Child-safe corners, waterproof for outdoors, non-toxic finishes.

### 4. AI Reimagining (Gemini Multimodal)
- **Material Detection & Uncertainty**: Vision analysis identifies likely materials, estimates structural condition, and notes uncertainty honestly (e.g., unknown polymer heat resistance, hidden staples in wood).
- **Complete Blueprint**:
  - Catchy project name and tagline
  - Clear design purpose
  - Reused materials checklist with surface preparation notes
  - Additional required materials with price estimates
  - Required tools and household substitutions
  - Step-by-step instructions with duration, pro craft tips, and safety warnings
  - Difficulty level and total build time
  - **Environmental Impact**: Estimated weight diverted from landfill, embodied CO₂ saved, circular benefits, and physical limitations.

### 5. Signature Feature: The Constraint Switch
- After generating a solution, real-world conditions may change. Switch a constraint on the fly:
  - ✂️ *No cutting allowed* (fold only or use raw dimensions)
  - 🧴 *No glue available* (interlocking tabs, friction fit, or ties)
  - 💸 *Zero budget* ($0 strictly)
  - ⏱️ *Only 15 minutes available* (rapid assembly)
  - 👶 *Child-safe / Non-toxic*
  - 🌧️ *Weatherproof for outdoor garden*
  - ✍️ *Custom constraint*
- **Adaptation Diff Log**:
  - **What Changed**: Specific modifications to materials, tools, and joinery.
  - **Why It Changed**: Technical and physical rationale.
  - **Trade-offs**: Honest assessment of compromises (durability, footprint, or build time).
- **Version Toggle**: Switch back and forth between **Original (v1)** and **Adapted (v2)**.

### 6. Sustainability Design System
- Forest green, warm off-white linen surfaces, and subtle vibrant lime accents.
- Modern typography via *Outfit* and *Plus Jakarta Sans*.
- Fully responsive, accessible, and print-optimized (print recipe directly to PDF or paper).
- Honest mode indicator (**Live Gemini API** vs. **Demonstration Mode**).

---

## 🛠️ Architecture & Security

```
remake-ai/
├── server/
│   ├── index.js           # Express API backend (serves API & dist/ in production)
│   ├── geminiService.js   # Multimodal Gemini API integration & prompt engineering
│   ├── sampleData.js      # Curated zero-setup demonstration projects
│   └── test-api.js        # Automated API test suite
├── src/
│   ├── components/        # React components (Navbar, Hero, MaterialInput, etc.)
│   ├── services/api.js    # API communication layer
│   ├── App.jsx            # Main application state & workflows
│   ├── index.css          # Design system & responsive styles
│   └── main.jsx           # React DOM root
├── .env.example           # Environment template
├── vite.config.js         # Vite configuration with /api proxy
└── package.json           # Unified scripts & dependencies
```

### 🔒 Security Principles
- **No Client-Side API Keys**: `GEMINI_API_KEY` is read strictly on the Express backend server from environment variables. It is **never** bundled or exposed in frontend code.
- **Zero Telemetry on User Photos**: Image base64 payloads are sent directly to the server in memory and forwarded to Gemini without being written to disk or third-party analytics.
- **Honest Missing Key Handling**: If no API key is set, the server does not hallucinate fake AI outputs; it transparently informs the user and provides a rich curated demonstration mode.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- (Optional) A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### 1. Clone & Install
```bash
git clone <repo-url>
cd remake-ai
npm install
```

### 2. Configure Environment (Optional for Live Mode)
Copy the environment template:
```bash
cp .env.example .env
```
Open `.env` and add your Gemini API key:
```ini
PORT=3001
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
```
*(If you leave `GEMINI_API_KEY` blank, RE:MAKE AI automatically activates **Sample Demonstration Mode**, allowing you to explore all features, sample projects, and constraint switching without an API key).*

### 3. Run Locally in Development
To run both the Express backend and the Vite frontend simultaneously:
```bash
npm run dev
```
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

### 4. Run Automated Test Suite
```bash
node server/test-api.js
```

---

## 📦 Production Build & Deployment

### Production Build
```bash
npm run build
npm start
```
The Express server will automatically serve the built static assets from `dist/` and handle all `/api` requests on the configured `PORT`.

### Deploying to Render / Railway / Fly.io / VPS
1. Set the build command: `npm install && npm run build`
2. Set the start command: `npm start`
3. Add the environment variable: `GEMINI_API_KEY=<your_api_key>`
4. Add `PORT=3001` (or your host's `$PORT`).

---

## 📜 License
MIT License. Built for zero-waste makers and sustainable communities.
