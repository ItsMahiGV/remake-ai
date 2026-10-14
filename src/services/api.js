// Client-side API service to communicate with backend endpoints

export async function fetchServerStatus() {
  try {
    const res = await fetch('/api/status');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Server status check failed:', err);
    return { ok: false, hasEnvKey: false, error: err.message };
  }
}

export async function fetchSamples() {
  try {
    const res = await fetch('/api/samples');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.samples || [];
  } catch (err) {
    console.error('Failed to fetch samples:', err);
    return [];
  }
}

export async function submitReimagine({
  imageBase64,
  mimeType,
  description,
  problem,
  budget,
  tools,
  time,
  preserveMaterials,
  restrictions,
  isDemoMode = false,
  selectedSampleId = null,
  customApiKey = null
}) {
  const headers = { 'Content-Type': 'application/json' };
  if (customApiKey) {
    headers['x-gemini-key'] = customApiKey;
  }

  const res = await fetch('/api/reimagine', {
    method: 'POST',
    headers,
    body: JSON.stringify({
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
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error || `Server responded with ${res.status}`);
  }

  return data;
}

export async function submitConstraintSwitch({
  previousSolution,
  changedConstraint,
  userNote = '',
  isDemoMode = false,
  selectedSampleId = null,
  customApiKey = null
}) {
  const headers = { 'Content-Type': 'application/json' };
  if (customApiKey) {
    headers['x-gemini-key'] = customApiKey;
  }

  const res = await fetch('/api/switch-constraint', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      previousSolution,
      changedConstraint,
      userNote,
      isDemoMode,
      selectedSampleId
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.error || `Server responded with ${res.status}`);
  }

  return data;
}
