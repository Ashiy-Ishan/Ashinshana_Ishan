// src/components/admin/AdminHeroImages.jsx
import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Check, 
  User, 
  Code2, 
  Video, 
  Upload, 
  Image as ImageIcon, 
  AlertCircle, 
  Loader2, 
  RefreshCw,
  GraduationCap,
  Terminal,
  Sparkles
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { uploadImageToImageKit } from '../../services/imagekitService';
import { initialData } from '../../data/initialData';

export const AdminHeroImages = () => {
  const { profile, updateProfile } = usePortfolio();
  const [images, setImages] = useState({
    // Circular Profile & Role Avatars
    personalImage: profile?.personalImage || profile?.profileImage || initialData.profile.personalImage || '',
    developerImage: profile?.developerImage || initialData.profile.developerImage || '',
    creatorImage: profile?.creatorImage || initialData.profile.creatorImage || '',
    profileImage: profile?.profileImage || initialData.profile.profileImage || '',
    
    // Hero Standing Role Portraits
    heroImagePersonal: profile?.heroImagePersonal || profile?.personalImage || initialData.profile.heroImagePersonal || '',
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
        personalImage: profile.personalImage || profile.profileImage || initialData.profile.personalImage || '',
        developerImage: profile.developerImage || initialData.profile.developerImage || '',
        creatorImage: profile.creatorImage || initialData.profile.creatorImage || '',
        profileImage: profile.profileImage || initialData.profile.profileImage || '',
        heroImagePersonal: profile.heroImagePersonal || profile.personalImage || initialData.profile.heroImagePersonal || '',
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
      const folderName = `avatar-${roleKey.toLowerCase()}`;
      const uploadedUrl = await uploadImageToImageKit(file, folderName);
      
      const newImages = { ...images, [roleKey]: uploadedUrl };
      setImages(newImages);

      // Auto-save and immediately override in Firestore database
      await updateProfile({
        [roleKey]: uploadedUrl
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
        personalImage: images.personalImage,
        developerImage: images.developerImage,
        creatorImage: images.creatorImage,
        profileImage: images.profileImage,
        heroImagePersonal: images.heroImagePersonal,
        heroImageDeveloper: images.heroImageDeveloper,
        heroImageCreator: images.heroImageCreator
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      setErrorMessage(`Error saving images: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // 1. Circular Avatar Configurations (for About, Personal, Developer, and Creator Cards)
  const avatarConfigs = [
    {
      key: 'personalImage',
      title: 'Personal Card Avatar',
      subtitle: 'Circular avatar with graduation badge used in the Personal & About header card',
      tag: 'ABOUT / PERSONAL CARD',
      badgeIcon: <GraduationCap size={16} />,
      badgeColor: 'linear-gradient(135deg, #00d2ff, #0099cc)',
      ringGlow: '0 0 25px rgba(0, 210, 255, 0.45)',
      ringBorder: 'linear-gradient(135deg, #00d2ff, #a855f7)'
    },
    {
      key: 'developerImage',
      title: 'Developer Card Avatar',
      subtitle: 'Circular avatar with terminal badge used in the Developer profile card',
      tag: 'DEVELOPER CARD',
      badgeIcon: <Terminal size={16} />,
      badgeColor: 'linear-gradient(135deg, #0284c7, #0369a1)',
      ringGlow: '0 0 25px rgba(56, 189, 248, 0.45)',
      ringBorder: 'linear-gradient(135deg, #38bdf8, #00d2ff)'
    },
    {
      key: 'creatorImage',
      title: 'Creator Card Avatar',
      subtitle: 'Circular avatar with video badge used in the YouTube channel profile card',
      tag: 'CREATOR CARD',
      badgeIcon: <Video size={16} />,
      badgeColor: 'linear-gradient(135deg, #ff0033, #cc0000)',
      ringGlow: '0 0 25px rgba(255, 51, 102, 0.45)',
      ringBorder: 'linear-gradient(135deg, #ff3366, #ff6b6b)'
    },
    {
      key: 'profileImage',
      title: 'Universal Profile Avatar',
      subtitle: 'Universal fallback profile image used across default card and bio components',
      tag: 'GLOBAL FALLBACK',
      badgeIcon: <Sparkles size={16} />,
      badgeColor: 'linear-gradient(135deg, #a855f7, #6366f1)',
      ringGlow: '0 0 25px rgba(168, 85, 247, 0.45)',
      ringBorder: 'linear-gradient(135deg, #a855f7, #38bdf8)'
    }
  ];

  // 2. Hero Large Portrait Configurations
  const heroConfigs = [
    {
      key: 'heroImagePersonal',
      title: 'Personal Hero Portrait',
      subtitle: 'Large standing portrait for Personal mode hero section',
      tag: 'HERO PERSONAL',
      icon: <User size={20} className="icon-personal" />,
      colorClass: 'card-personal-role'
    },
    {
      key: 'heroImageDeveloper',
      title: 'Developer Hero Portrait',
      subtitle: 'Large standing portrait for Developer mode hero section',
      tag: 'HERO DEVELOPER',
      icon: <Code2 size={20} className="icon-dev" />,
      colorClass: 'card-dev-role'
    },
    {
      key: 'heroImageCreator',
      title: 'Creator Hero Portrait',
      subtitle: 'Large standing portrait for Creator mode hero section',
      tag: 'HERO CREATOR',
      icon: <Video size={20} className="icon-creator" />,
      colorClass: 'card-creator-role'
    }
  ];

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">Role & Avatar Image Upload Portals</h2>
          <p className="admin-pane-desc">
            Directly upload, replace, and manage both Circular Profile Avatars (About / Personal / Dev / Channel Cards) and Hero Standing Portraits with real-time Firebase sync.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-hero-images-form">
        {saveSuccess && (
          <div className="form-alert success">
            <Check size={18} />
            <span>Image successfully uploaded and updated across live database!</span>
          </div>
        )}

        {errorMessage && (
          <div className="form-alert error">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* SECTION 1: CIRCULAR PROFILE & ROLE AVATARS */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
            <Sparkles size={20} style={{ color: 'var(--accent-cyan)' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              1. Circular Profile & Role Avatars
            </h3>
          </div>

          <div className="role-images-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {avatarConfigs.map((config) => {
              const currentUrl = images[config.key];
              const isUploading = uploadingRole === config.key;

              return (
                <div key={config.key} className="role-image-card" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: '20px', padding: '1.5rem' }}>
                  <div className="role-card-header" style={{ marginBottom: '1.25rem' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{config.title}</h4>
                        <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', padding: '0.2rem 0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                          {config.tag}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>{config.subtitle}</p>
                    </div>
                  </div>

                  {/* Circular Avatar Live Preview Stage */}
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem 0', background: 'rgba(0,0,0,0.3)', borderRadius: '14px', marginBottom: '1.25rem' }}>
                    <div style={{
                      position: 'relative',
                      width: '108px',
                      height: '108px',
                      borderRadius: '50%',
                      padding: '3.5px',
                      background: config.ringBorder,
                      boxShadow: config.ringGlow
                    }}>
                      {currentUrl ? (
                        <img 
                          src={currentUrl} 
                          alt={config.title} 
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            background: '#07080c'
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = initialData.profile.profileImage;
                          }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ImageIcon size={24} style={{ color: 'var(--text-muted)' }} />
                        </div>
                      )}
                      <div style={{
                        position: 'absolute',
                        bottom: '2px',
                        right: '2px',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: config.badgeColor,
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2.5px solid var(--bg-surface)',
                        boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                      }}>
                        {config.badgeIcon}
                      </div>
                    </div>
                  </div>

                  {/* Image URL & Upload Control */}
                  <div className="role-controls-body">
                    <div className="form-field" style={{ marginBottom: '0.85rem' }}>
                      <label style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Avatar Image CDN URL</label>
                      <input
                        type="url"
                        value={currentUrl}
                        onChange={(e) => handleUrlChange(config.key, e.target.value)}
                        placeholder="https://ik.imagekit.io/..."
                        style={{ fontSize: '0.82rem', padding: '0.6rem 0.8rem' }}
                      />
                    </div>

                    <div className="file-upload-box">
                      <label className={`upload-btn-label ${isUploading ? 'uploading' : ''}`}>
                        {isUploading ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            <span>Uploading Avatar...</span>
                          </>
                        ) : (
                          <>
                            <Upload size={14} />
                            <span>Upload Avatar Photo</span>
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
        </div>

        {/* SECTION 2: HERO LARGE PORTRAITS */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
            <User size={20} style={{ color: 'var(--accent-dev)' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              2. Hero Section Large Role Portraits
            </h3>
          </div>

          <div className="role-images-grid">
            {heroConfigs.map((config) => {
              const currentUrl = images[config.key];
              const isUploading = uploadingRole === config.key;

              return (
                <div key={config.key} className={`role-image-card ${config.colorClass}`}>
                  <div className="role-card-header">
                    {config.icon}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                        <h4 className="role-card-title">{config.title}</h4>
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
                      <label>Hero Image CDN URL</label>
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
                            <span>Uploading & Overriding Hero Image...</span>
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
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving || Boolean(uploadingRole)}>
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving All Images...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save All Images</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

