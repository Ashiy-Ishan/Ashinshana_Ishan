// src/components/admin/AdminHeroImages.jsx
import React, { useState } from 'react';
import { Save, Check, User, Code2, Video, Upload, Image as ImageIcon } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { uploadImageToImageKit } from '../../services/imagekitService';

export const AdminHeroImages = () => {
  const { profile, updateProfile } = usePortfolio();
  const [images, setImages] = useState({
    heroImagePersonal: profile?.heroImagePersonal || profile?.personalImage || profile?.profileImage || '',
    heroImageDeveloper: profile?.heroImageDeveloper || profile?.developerImage || '',
    heroImageCreator: profile?.heroImageCreator || profile?.creatorImage || ''
  });

  const [uploadingRole, setUploadingRole] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleUrlChange = (roleKey, value) => {
    setImages(prev => ({ ...prev, [roleKey]: value }));
  };

  const handleFileUpload = async (roleKey, file) => {
    if (!file) return;
    setUploadingRole(roleKey);
    try {
      const folderName = `hero-${roleKey.replace('heroImage', '').toLowerCase()}`;
      const uploadedUrl = await uploadImageToImageKit(file, folderName);
      setImages(prev => ({ ...prev, [roleKey]: uploadedUrl }));
    } catch (err) {
      alert(`Error uploading image to ImageKit: ${err.message}`);
    } finally {
      setUploadingRole(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({
        heroImagePersonal: images.heroImagePersonal,
        heroImageDeveloper: images.heroImageDeveloper,
        heroImageCreator: images.heroImageCreator
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert('Error updating role images: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const roleConfigs = [
    {
      key: 'heroImagePersonal',
      title: 'Personal Role Image',
      subtitle: 'Main hero portrait shown in Personal & Undergraduate mode',
      icon: <User size={20} className="icon-personal" />,
      colorClass: 'card-personal-role'
    },
    {
      key: 'heroImageDeveloper',
      title: 'Developer Role Image',
      subtitle: 'Hero portrait shown in Software Engineering mode',
      icon: <Code2 size={20} className="icon-dev" />,
      colorClass: 'card-dev-role'
    },
    {
      key: 'heroImageCreator',
      title: 'Creator Role Image',
      subtitle: 'Hero portrait shown in YouTuber & Content Creator mode',
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
            Upload and manage individual portrait images for Personal, Developer, and Creator hero modes.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-hero-images-form">
        {saveSuccess && (
          <div className="form-alert success">
            <Check size={18} />
            <span>Role images successfully updated and synced across all pages!</span>
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
                  <div>
                    <h3 className="role-card-title">{config.title}</h3>
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
                    <label className="upload-btn-label">
                      <Upload size={14} />
                      <span>{isUploading ? 'Uploading to ImageKit...' : 'Upload New File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploading}
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
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <Save size={16} />
            <span>{saving ? 'Saving Changes...' : 'Save Role Images'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

