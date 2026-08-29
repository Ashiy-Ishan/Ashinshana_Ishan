import React, { useState, useEffect } from 'react';
import { Save, Check, User, Image, Sparkles, Link2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ImageUploadField } from './ImageUploadField';
import { initialData } from '../../data/initialData';

export const AdminProfile = () => {
  const { profile, updateProfile } = usePortfolio();
  const [formData, setFormData] = useState({ 
    ...initialData.profile, 
    ...(profile || {}) 
  });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...initialData.profile,
        ...profile
      }));
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);
    try {
      await updateProfile(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Profile update failed:', err);
      const isPermission = err?.message?.includes('insufficient permissions') || err?.code === 'permission-denied';
      if (isPermission) {
        setErrorMessage('Firebase Permission Error: Ensure you are logged into Firebase with ashinshanaishan@gmail.com and firestore.rules have been deployed to your Firebase console.');
      } else {
        setErrorMessage('Error updating profile: ' + (err.message || 'Unknown error occurred.'));
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">Profile & Identity Settings</h2>
          <p className="admin-pane-desc">
            Edit your core personal brand, bio, university information, social channels, and hero portrait sources.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-form-container">
        {savedSuccess && (
          <div className="form-alert success">
            <Check size={18} />
            <span>Profile successfully updated and synchronized!</span>
          </div>
        )}

        {errorMessage && (
          <div className="form-alert error" style={{ background: 'rgba(255, 51, 102, 0.15)', border: '1px solid rgba(255, 51, 102, 0.4)', color: '#ff6b8b', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Section 1: Basic Identity */}
        <div className="admin-form-card">
          <h3 className="card-section-title">
            <User size={18} /> Personal Brand Identity
          </h3>

          <div className="form-grid-2">
            <div className="form-field">
              <label>Public Name / Brand</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Full Legal Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-field">
              <label>Tagline / Title</label>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Brand Motto</label>
              <input
                type="text"
                name="motto"
                value={formData.motto || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-field">
            <label>Core Philosophy Statement</label>
            <textarea
              name="statement"
              value={formData.statement || ''}
              onChange={handleChange}
              rows={2}
            />
          </div>

          <div className="form-field">
            <label>Full Biography</label>
            <textarea
              name="bio"
              value={formData.bio || ''}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </div>

        {/* Section 2: Education & Academic Info */}
        <div className="admin-form-card">
          <h3 className="card-section-title">
            <Sparkles size={18} /> Academic & Location Background
          </h3>

          <div className="form-grid-2">
            <div className="form-field">
              <label>University / Institution</label>
              <input
                type="text"
                name="university"
                value={formData.university || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Degree Program</label>
              <input
                type="text"
                name="degree"
                value={formData.degree || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-field">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Status Badge</label>
              <input
                type="text"
                name="status"
                value={formData.status || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Profile Avatars & Hero Portraits */}
        <div className="admin-form-card">
          <h3 className="card-section-title">
            <Image size={18} /> Role Avatars & Hero Portraits Manager
          </h3>
          <p className="card-sub-info">
            Manage circular avatars (shown in About, Personal, Developer, and Channel cards) and large hero portraits. Upload directly to ImageKit CDN.
          </p>

          <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', margin: '1.25rem 0 0.75rem 0' }}>
            Circular Profile & Role Avatars:
          </h4>
          <div className="form-grid-3" style={{ marginBottom: '1.75rem' }}>
            {/* Personal Avatar */}
            <ImageUploadField
              label="Personal Card Avatar"
              value={formData.personalImage || formData.profileImage || ''}
              onChange={(url) => setFormData((prev) => ({ 
                ...prev, 
                personalImage: url,
                profileImage: url 
              }))}
              folder="avatars"
              hint="About / Personal card circular avatar"
            />

            {/* Developer Avatar */}
            <ImageUploadField
              label="Developer Card Avatar"
              value={formData.developerImage || ''}
              onChange={(url) => setFormData((prev) => ({ 
                ...prev, 
                developerImage: url 
              }))}
              folder="avatars"
              hint="Developer card circular avatar"
            />

            {/* Creator Avatar */}
            <ImageUploadField
              label="Creator Card Avatar"
              value={formData.creatorImage || ''}
              onChange={(url) => setFormData((prev) => ({ 
                ...prev, 
                creatorImage: url 
              }))}
              folder="avatars"
              hint="YouTube channel circular avatar"
            />
          </div>

          <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-dev)', fontFamily: 'var(--font-mono)', margin: '1.25rem 0 0.75rem 0' }}>
            Hero Large Standing Portraits:
          </h4>
          <div className="form-grid-3">
            {/* Personal Hero Image */}
            <ImageUploadField
              label="Personal Hero Portrait"
              value={formData.heroImagePersonal || ''}
              onChange={(url) => setFormData((prev) => ({ 
                ...prev, 
                heroImagePersonal: url
              }))}
              folder="hero"
              hint="Hero Personal standing portrait"
            />

            {/* Developer Hero Image */}
            <ImageUploadField
              label="Developer Hero Portrait"
              value={formData.heroImageDeveloper || ''}
              onChange={(url) => setFormData((prev) => ({ 
                ...prev, 
                heroImageDeveloper: url 
              }))}
              folder="hero"
              hint="Hero Developer standing portrait"
            />

            {/* Creator Hero Image */}
            <ImageUploadField
              label="Creator Hero Portrait"
              value={formData.heroImageCreator || ''}
              onChange={(url) => setFormData((prev) => ({ 
                ...prev, 
                heroImageCreator: url 
              }))}
              folder="hero"
              hint="Hero Creator standing portrait"
            />
          </div>
        </div>

        {/* Section 4: Contact & Social Links */}
        <div className="admin-form-card">
          <h3 className="card-section-title">
            <Link2 size={18} /> Channels & Contact Endpoints
          </h3>

          <div className="form-grid-2">
            <div className="form-field">
              <label>Primary Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>WhatsApp Number (with country code)</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-field">
              <label>GitHub URL</label>
              <input
                type="url"
                name="github"
                value={formData.github || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-grid-3">
            <div className="form-field">
              <label>YouTube Channel URL</label>
              <input
                type="url"
                name="youtube"
                value={formData.youtube || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Instagram URL</label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label>Facebook URL</label>
              <input
                type="url"
                name="facebook"
                value={formData.facebook || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-field">
            <label>Resume / CV URL</label>
            <input
              type="url"
              name="resumeUrl"
              value={formData.resumeUrl || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Form Submit Bar */}
        <div className="admin-form-sticky-bar">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <Save size={18} />
            <span>{saving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
