import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Loader2, Check, X } from 'lucide-react';
import { uploadImageToImageKit } from '../../services/imagekitService';

export const ImageUploadField = ({
  label,
  value = '',
  onChange,
  folder = 'uploads',
  placeholder = 'https://ik.imagekit.io/... or upload image',
  hint,
  required = false
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const uploadedUrl = await uploadImageToImageKit(file, folder);
      onChange(uploadedUrl);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3500);
    } catch (err) {
      console.error('Image upload failed:', err);
      setUploadError(err.message || 'Image upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClear = () => {
    onChange('');
    setUploadSuccess(false);
    setUploadError(null);
  };

  return (
    <div className="image-upload-field-group">
      {label && (
        <label className="upload-field-label">
          <span>{label}</span>
          {required && <span className="text-required">*</span>}
        </label>
      )}

      <div className="image-upload-card">
        {/* Live Image Preview Box */}
        <div className="image-preview-thumbnail">
          {value ? (
            <img
              src={value}
              alt="Preview"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="preview-placeholder">
              <ImageIcon size={22} className="placeholder-icon" />
              <span className="placeholder-text">No Image</span>
            </div>
          )}
        </div>

        {/* Input & Action Buttons */}
        <div className="image-upload-controls">
          <div className="image-input-action-row">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="image-url-input"
              required={required}
            />

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
              className="hidden-file-input"
              id={`file-input-${folder}-${label ? label.replace(/\s+/g, '-').toLowerCase() : 'field'}`}
              disabled={uploading}
            />

            {/* Upload Button */}
            <label
              htmlFor={`file-input-${folder}-${label ? label.replace(/\s+/g, '-').toLowerCase() : 'field'}`}
              className={`btn-image-upload ${uploading ? 'disabled' : ''}`}
              title="Upload image to ImageKit CDN"
            >
              {uploading ? (
                <>
                  <Loader2 size={15} className="spinner-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload size={15} />
                  <span>Upload</span>
                </>
              )}
            </label>

            {/* Clear Button */}
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="btn-image-clear"
                title="Clear image URL"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Upload Status / Hint */}
          <div className="image-upload-meta">
            {uploadSuccess && (
              <span className="upload-status success">
                <Check size={13} /> Uploaded to ImageKit CDN successfully!
              </span>
            )}
            {uploadError && (
              <span className="upload-status error">
                <X size={13} /> {uploadError}
              </span>
            )}
            {!uploadSuccess && !uploadError && (
              <span className="upload-hint-text">
                {hint || `Folder: /${folder} • Max size: 10MB (PNG, JPG, WEBP, SVG, GIF)`}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
