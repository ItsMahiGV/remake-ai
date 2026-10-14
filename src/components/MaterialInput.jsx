import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, X, AlertCircle, FileCheck, Camera } from 'lucide-react';

export default function MaterialInput({
  imageFile,
  imagePreview,
  onImageChange,
  onImageRemove,
  additionalMaterials,
  onAdditionalMaterialsChange
}) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const processFile = (file) => {
    setErrorMsg('');
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Please upload a supported image file (JPEG, PNG, WEBP, or GIF).');
      return;
    }

    // Validate size (10 MB max)
    const maxSizeMB = 10;
    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrorMsg(`Image size exceeds ${maxSizeMB}MB. Please select a smaller photo.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onImageChange(file, e.target.result);
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read image file. Please try another image.');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

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
          01
        </div>
        <div>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--color-forest-950)' }}>
            Material Input & Vision
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            Upload a clear photo of the items, packaging, or scrap you want to transform.
          </p>
        </div>
      </div>

      {/* Upload Zone / Preview */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
          }
        }}
        style={{ display: 'none' }}
      />

      {errorMsg && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: '#fef2f2',
          border: '1px solid #fee2e2',
          borderRadius: 'var(--radius-md)',
          padding: '0.65rem 1rem',
          color: '#991b1b',
          fontSize: '0.82rem',
          marginBottom: '1rem'
        }}>
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {imagePreview ? (
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          border: '1px solid var(--color-border-medium)',
          backgroundColor: '#0a160f',
          marginBottom: '1.25rem'
        }}>
          <img
            src={imagePreview}
            alt="Uploaded unused materials"
            style={{
              width: '100%',
              maxHeight: '340px',
              objectFit: 'contain',
              display: 'block'
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '0.75rem 1rem',
            background: 'linear-gradient(transparent, rgba(10, 22, 15, 0.85))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#ffffff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}>
              <FileCheck size={16} color="var(--color-lime-400)" />
              <span>Image loaded for Gemini Multimodal Analysis</span>
            </div>
            <button
              type="button"
              onClick={onImageRemove}
              className="btn btn-outline"
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.4)',
                backgroundColor: 'rgba(0,0,0,0.4)'
              }}
            >
              <X size={14} />
              <span>Change Photo</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: isDragging
              ? '2px dashed var(--color-lime-500)'
              : '2px dashed var(--color-border-medium)',
            backgroundColor: isDragging
              ? 'var(--color-forest-50)'
              : 'rgba(255, 255, 255, 0.5)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginBottom: '1.25rem'
          }}
        >
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-forest-50)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-forest-700)',
            marginBottom: '0.85rem'
          }}>
            <UploadCloud size={28} />
          </div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-forest-950)', marginBottom: '0.25rem' }}>
            Click to upload or drag & drop photograph
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.85rem' }}>
            JPEG, PNG, WEBP up to 10MB • Multiple objects in one photo supported
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--color-forest-700)', fontWeight: 600 }}>
            <Camera size={14} />
            <span>Smart material identification will analyze texture, labels, and condition</span>
          </div>
        </div>
      )}

      {/* Additional Materials Text Description */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">
          <span>Additional Materials or Hardware You Have</span>
          <span className="form-hint">Optional</span>
        </label>
        <textarea
          className="input-textarea"
          value={additionalMaterials}
          onChange={(e) => onAdditionalMaterialsChange(e.target.value)}
          placeholder="e.g. 4 natural wine corks, a handful of rubber bands, some scrap craft wire, or wooden skewers..."
          rows={2}
        />
        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-light)', marginTop: '0.35rem' }}>
          Tip: List any small fastener, tape, string, or scraps you have lying around.
        </div>
      </div>
    </div>
  );
}
