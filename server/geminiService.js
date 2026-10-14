import { GoogleGenerativeAI } from '@google/generative-ai';

const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

// Clean markdown code blocks from model JSON output
function extractJsonFromText(rawText) {
  if (!rawText) return null;
  let text = rawText.trim();
  // Strip ```json or ``` if present
  if (text.startsWith('```')) {
    text = text.replace(/^```[a-zA-Z]*\n?/, '').replace(/```\s*$/, '').trim();
  }
  try {
    return JSON.parse(text);
  } catch (err) {
    // Attempt to extract the first balanced { ... } substring
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const extracted = text.substring(firstBrace, lastBrace + 1);
      return JSON.parse(extracted);
    }
    throw new Error(`Failed to parse AI output as JSON: ${err.message}`);
  }
}

/**
 * Multimodal Gemini Reimagining Service
 */
export async function generateReuseSolution({
  imageBase64,
  mimeType = 'image/jpeg',
  description = '',
  problem = '',
  budget = 'Under $10',
  tools = [],
  time = '1 hour',
  preserveMaterials = '',
  restrictions = '',
  apiKey = null,
  modelName = DEFAULT_MODEL
}) {
  const activeKey = apiKey || process.env.GEMINI_API_KEY;
  if (!activeKey) {
    throw new Error('GEMINI_API_KEY_MISSING');
  }

  // Validate image payload
  if (!imageBase64) {
    throw new Error('An image of unused materials is required for multimodal analysis.');
  }

  // Remove potential data URL prefix if sent
  const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');

  const prompt = `
You are RE:MAKE AI, an expert sustainable industrial designer, upcycling engineer, and circular economy specialist.
Your mission: "Waste Less. Imagine More. Create Differently."

You are analyzing a photograph of unused materials to generate a practical, durable, high-utility reuse design.

USER'S PROBLEM / GOAL:
"${problem}"

ADDITIONAL MATERIALS MENTIONED BY USER:
"${description || 'None'}"

CONSTRAINTS:
- Budget: ${budget || 'Minimal / zero'}
- Available Tools: ${Array.isArray(tools) ? tools.join(', ') : (tools || 'Standard household tools')}
- Time Available: ${time || 'Flexible'}
- Materials that MUST NOT be damaged or altered: ${preserveMaterials || 'None specified'}
- Other Restrictions / Preferences: ${restrictions || 'None'}

INSTRUCTIONS FOR MULTIMODAL ANALYSIS:
1. Examine the uploaded image carefully. Identify the likely materials, components, and condition.
   - For every material, assess your confidence (High, Medium, Low).
   - Note uncertainty honestly where visual clues are ambiguous (e.g. "Unknown clear polymer; test heat tolerance", "Aged timber; inspect for hidden fasteners").
2. Create a functional, well-engineered reuse proposal that directly solves the user's problem while strictly honoring all constraints.
3. If the user specified materials that must not be damaged, design non-destructive, reversible joinery or mounting methods.
4. Calculate realistic environmental benefits and honest limitations.

You must respond ONLY with a raw JSON object (no commentary before or after). Follow this exact JSON structure:
{
  "projectName": "Catchy, evocative project name",
  "tagline": "Short 4-8 word descriptive subtitle",
  "purpose": "2-3 sentences explaining exactly how this design solves the user's problem through clever material reuse",
  "materialsDetected": [
    {
      "name": "Material or object name from the photo",
      "confidence": "High | Medium | Low",
      "condition": "Visual assessment of condition (e.g. Sturdy corrugated board, intact glass, weathered pine)",
      "notes": "Engineering notes, material properties, or uncertainty caveats"
    }
  ],
  "materialsReused": [
    {
      "item": "Reused item name and dimensions/quantity",
      "source": "From photograph or additional user materials",
      "prepRequired": "Surface prep, de-labeling, cleaning, or de-nailing required"
    }
  ],
  "additionalMaterialsRequired": [
    {
      "item": "Any extra common item needed (e.g. glue, twine, screws)",
      "estCost": "$X.XX or $0",
      "essential": true
    }
  ],
  "toolsRequired": [
    {
      "name": "Tool name",
      "optional": false,
      "substitute": "Household substitute if user lacks this tool"
    }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "title": "Action-oriented step title",
      "duration": "Estimated time (e.g. 10 mins)",
      "instructions": "Clear, detailed step-by-step guidance on measuring, cutting, folding, or assembly",
      "tip": "Pro-tip for cleaner craft, structural integrity, or aesthetic finish",
      "safetyWarning": "Specific hazard or safety precaution (or leave null if safe)"
    }
  ],
  "estimatedCost": {
    "total": "$X.XX",
    "assumptions": "Clear explanation of what costs are assumed (e.g. Reused items are free, $1.50 for glue)"
  },
  "difficulty": "Beginner | Intermediate | Advanced",
  "totalTime": "e.g. 45 minutes",
  "safetyConsiderations": [
    "Safety consideration 1",
    "Safety consideration 2"
  ],
  "environmentalImpact": {
    "wasteDiverted": "Estimated weight and category diverted from landfill",
    "carbonSaved": "Estimated CO2e saved vs buying new equivalent product",
    "benefits": [
      "Circularity benefit 1",
      "Circularity benefit 2"
    ],
    "limitations": [
      "Honest physical limitation 1 (e.g. not waterproof)",
      "Honest limitation 2 (e.g. max load capacity)"
    ]
  }
}
`;

  try {
    const genAI = new GoogleGenerativeAI(activeKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    const imagePart = {
      inlineData: {
        data: cleanBase64,
        mimeType: mimeType || 'image/jpeg'
      }
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    return extractJsonFromText(text);
  } catch (error) {
    // If the error was missing key, pass it through cleanly
    if (error.message === 'GEMINI_API_KEY_MISSING') throw error;

    // Detailed error logging for backend diagnostics
    console.error('Gemini API Error in generateReuseSolution:', error);

    // Provide friendly error messages
    if (error.message?.includes('API_KEY_INVALID') || error.status === 400 && error.message?.includes('key')) {
      throw new Error('The provided Gemini API Key is invalid or expired. Please check your key in Google AI Studio.');
    }
    if (error.message?.includes('RESOURCE_EXHAUSTED') || error.status === 429) {
      throw new Error('Gemini API rate limit reached. Please wait a minute and try again, or use Sample Demonstration Mode.');
    }
    throw new Error(`AI Generation failed: ${error.message || 'Unknown Gemini error'}`);
  }
}

/**
 * Signature Feature: Constraint Switch Service
 */
export async function switchConstraintSolution({
  previousSolution,
  changedConstraint,
  userNote = '',
  apiKey = null,
  modelName = DEFAULT_MODEL
}) {
  const activeKey = apiKey || process.env.GEMINI_API_KEY;
  if (!activeKey) {
    throw new Error('GEMINI_API_KEY_MISSING');
  }

  if (!previousSolution) {
    throw new Error('A previous solution is required to perform a constraint switch.');
  }

  if (!changedConstraint) {
    throw new Error('Please select or specify a changed constraint.');
  }

  const prompt = `
You are RE:MAKE AI performing the SIGNATURE CONSTRAINT SWITCH.
TAGLINE: "Waste Less. Imagine More. Create Differently."

A user previously received an AI reuse design for their problem, but now one of their critical real-world constraints has CHANGED.
You must re-engineer the previous solution to strictly satisfy the new constraint while still achieving the original purpose.

PREVIOUS REUSE DESIGN:
Project Name: ${previousSolution.projectName}
Original Purpose: ${previousSolution.purpose}
Previous Materials Reused: ${JSON.stringify(previousSolution.materialsReused)}
Previous Tools Required: ${JSON.stringify(previousSolution.toolsRequired)}
Previous Steps: ${JSON.stringify(previousSolution.steps)}
Previous Cost: ${JSON.stringify(previousSolution.estimatedCost)}

NEW CONSTRAINT SWITCHED BY USER:
>>> "${changedConstraint}" <<<
User Additional Notes: "${userNote || 'None'}"

YOUR TASK:
1. Identify specifically how the previous design violated or depended upon what is now restricted (e.g. if "No cutting allowed", remove all sawing/cutting steps and find full-length or folding configurations; if "No glue available", switch to interlocking tabs, friction fits, mechanical pins, or ties; if "Zero budget", eliminate all purchased adhesives/fasteners; if "Only 15 minutes", compress and simplify assembly).
2. Create an adapted, newly engineered version of the project that respects this constraint completely.
3. Formulate an in-depth "adaptationSummary" that transparently details:
   - whatChanged: Array of clear bullet points highlighting key modifications from the previous version.
   - whyChanged: Clear engineering and material rationale for why these changes were necessary under the new constraint.
   - tradeoffs: What was gained vs what was sacrificed (e.g. durability, time, visual refinement, or payload capacity).

Respond ONLY with a valid raw JSON object matching this schema:
{
  "projectName": "Adapted project name reflecting the constraint",
  "tagline": "Updated descriptive subtitle",
  "purpose": "Updated purpose and design strategy under the new constraint",
  "adaptationSummary": {
    "whatChanged": [
      "Specific change 1 compared to previous solution",
      "Specific change 2 compared to previous solution"
    ],
    "whyChanged": "Technical explanation of why the previous approach had to be replaced to satisfy the new constraint",
    "tradeoffs": "Honest assessment of the advantages and compromises of this adaptation"
  },
  "materialsDetected": ${JSON.stringify(previousSolution.materialsDetected || [])},
  "materialsReused": [
    {
      "item": "Reused item name",
      "source": "From materials",
      "prepRequired": "Surface prep"
    }
  ],
  "additionalMaterialsRequired": [
    {
      "item": "Item name",
      "estCost": "$X.XX or $0",
      "essential": false
    }
  ],
  "toolsRequired": [
    {
      "name": "Tool name",
      "optional": false,
      "substitute": "Household alternative"
    }
  ],
  "steps": [
    {
      "stepNumber": 1,
      "title": "Adapted step title",
      "duration": "e.g. 5 mins",
      "instructions": "Updated step instructions strictly complying with the new constraint",
      "tip": "Helpful tip",
      "safetyWarning": null
    }
  ],
  "estimatedCost": {
    "total": "$X.XX",
    "assumptions": "Updated cost assumptions"
  },
  "difficulty": "Beginner | Intermediate | Advanced",
  "totalTime": "Updated total time",
  "safetyConsiderations": [
    "Safety consideration"
  ],
  "environmentalImpact": {
    "wasteDiverted": "Updated waste diverted metric",
    "carbonSaved": "Updated carbon saved metric",
    "benefits": [
      "Benefit 1"
    ],
    "limitations": [
      "Updated limitation under this constraint"
    ]
  }
}
`;

  try {
    const genAI = new GoogleGenerativeAI(activeKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return extractJsonFromText(text);
  } catch (error) {
    if (error.message === 'GEMINI_API_KEY_MISSING') throw error;
    console.error('Gemini API Error in switchConstraintSolution:', error);
    throw new Error(`Constraint switch adaptation failed: ${error.message || 'Unknown Gemini error'}`);
  }
}
