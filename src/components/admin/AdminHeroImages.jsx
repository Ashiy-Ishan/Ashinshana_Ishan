// src/components/admin/AdminHeroImages.jsx
import React, { useState, useEffect } from 'react';
import { Save, Check, User, Code2, Video, Upload, Image as ImageIcon, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { uploadImageToImageKit } from '../../services/imagekitService';
import { initialData } from '../../data/initialData';

export const AdminHeroImages = () => {
  const { profile, updateProfile } = usePortfolio();
  const [images, setImages] = useState({
    heroImagePersonal: profile?.heroImagePersonal || profile?.personalImage || profile?.profileImage || initialData.profile.heroImagePersonal || '',
    heroImageDeveloper: profile?.heroImageDeveloper || profile?.developerImage || initialData.profile.heroImageDeveloper || '',
    heroImageCreator: profile?.heroImageCreator || profile?.creatorImage || initialData.profile.heroImageCreator || ''
  });

  const [uploadingRole, setUploadingRole] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Sync state when Firestore profile updates
  useEffect(() => {
    if (profile) {
      setImages({
        heroImagePersonal: profile.heroImagePersonal || profile.personalImage || profile.profileImage || initialData.profile.heroImagePersonal || '',
        heroImageDeveloper: profile.heroImageDeveloper || profile.developerImage || initialData.profile.heroImageDeveloper || '',
        heroImageCreator: profile.heroImageCreator || profile.creatorImage || initialData.profile.heroImageCreator || ''
      });
    }
  }, [profile]);

  const handleUrlChange = (roleKey, value) => {
    setImages(prev => ({ ...prev, [roleKey]: value }));
  };

  // Upload file to ImageKit and automatically override current image in Firestore
  const handleFileUpload = async (roleKey, file) => {
    if (!file) return;
    setErrorMessage(null);
    setUploadingRole(roleKey);
    try {
      const folderName = `hero-${roleKey.replace('heroImage', '').toLowerCase()}`;
      const uploadedUrl = await uploadImageToImageKit(file, folderName);
      
      const newImages = { ...images, [roleKey]: uploadedUrl };
      setImages(newImages);

      // Auto-save and immediately override in Firestore database
      await updateProfile({
        heroImagePersonal: newImages.heroImagePersonal,
        heroImageDeveloper: newImages.heroImageDeveloper,
        heroImageCreator: newImages.heroImageCreator
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      setErrorMessage(`Upload error: ${err.message}`);
    } finally {
      setUploadingRole(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSaving(true);
    try {
      await updateProfile({
        heroImagePersonal: images.heroImagePersonal,
        heroImageDeveloper: images.heroImageDeveloper,
        heroImageCreator: images.heroImageCreator
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      setErrorMessage(`Error saving role images: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const roleConfigs = [
    {
      key: 'heroImagePersonal',
      title: 'Personal Role Image',
      subtitle: 'Main hero portrait shown in Personal & Undergraduate mode',
      tag: 'PERSONAL MODE',
      icon: <User size={20} className="icon-personal" />,
      colorClass: 'card-personal-role'
    },
    {
      key: 'heroImageDeveloper',
      title: 'Developer Role Image',
      subtitle: 'Hero portrait shown in Software Engineering mode',
      tag: 'DEVELOPER MODE',
      icon: <Code2 size={20} className="icon-dev" />,
      colorClass: 'card-dev-role'
    },
    {
      key: 'heroImageCreator',
      title: 'Creator Role Image',
      subtitle: 'Hero portrait shown in YouTuber & Content Creator mode',
      tag: 'CREATOR MODE',
      icon: <Video size={20} className="icon-creator" />,
      colorClass: 'card-creator-role'
    }
  ];

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">Role Portrait Images</h2>
          <p className="admin-pane-desc">
            Upload and manage individual portrait images for Personal, Developer, and Creator hero modes. Uploading a new image will automatically replace and override the current image in real-time.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-hero-images-form">
        {saveSuccess && (
          <div className="form-alert success">
            <Check size={18} />
            <span>Role image successfully uploaded, overridden, and synced across all pages!</span>
          </div>
        )}

        {errorMessage && (
          <div className="form-alert error">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="role-images-grid">
          {roleConfigs.map((config) => {
            const currentUrl = images[config.key];
            const isUploading = uploadingRole === config.key;

            return (
              <div key={config.key} className={`role-image-card ${config.colorClass}`}>
                <div className="role-card-header">
                  {config.icon}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <h3 className="role-card-title">{config.title}</h3>
                      <span className="role-badge-pill" style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', padding: '0.2rem 0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', fontWeight: 700 }}>
                        {config.tag}
                      </span>
                    </div>
                    <p className="role-card-subtitle">{config.subtitle}</p>
                  </div>
                </div>

                {/* Image Live Preview */}
                <div className="role-preview-container">
                  {currentUrl ? (
                    <img 
                      src={currentUrl} 
                      alt={config.title} 
                      className="role-preview-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = initialData.profile[config.key] || '';
                      }}
                    />
                  ) : (
                    <div className="role-preview-placeholder">
                      <ImageIcon size={32} />
                      <span>No image set</span>
                    </div>
                  )}
                </div>

                {/* Image URL & File Upload controls */}
                <div className="role-controls-body">
                  <div className="form-field">
                    <label>Image CDN URL</label>
                    <input
                      type="url"
                      value={currentUrl}
                      onChange={(e) => handleUrlChange(config.key, e.target.value)}
                      placeholder="https://ik.imagekit.io/x2eerczu0/..."
                    />
                  </div>

                  <div className="file-upload-box">
                    <label className={`upload-btn-label ${isUploading ? 'uploading' : ''}`}>
                      {isUploading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Uploading & Overriding Image...</span>
                        </>
                      ) : currentUrl ? (
                        <>
                          <RefreshCw size={14} />
                          <span>Replace / Override Image</span>
                        </>
                      ) : (
                        <>
                          <Upload size={14} />
                          <span>Upload New File</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploading || saving}
                        onChange={(e) => handleFileUpload(config.key, e.target.files[0])}
                        className="file-hidden-input"
                      />
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving || Boolean(uploadingRole)}>
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Role Images</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
