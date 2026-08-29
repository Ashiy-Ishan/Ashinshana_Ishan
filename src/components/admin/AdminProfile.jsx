// src/components/admin/AdminProfile.jsx
import React, { useState } from 'react';
import { Save, Check, User, Image, Sparkles, Link2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminProfile = () => {
  const { profile, updateProfile } = usePortfolio();
  const [formData, setFormData] = useState({ ...profile });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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

        {/* Section 3: Hero Portraits Image Configuration */}
        <div className="admin-form-card">
          <h3 className="card-section-title">
            <Image size={18} /> Hero & Role Identity Image Manager
          </h3>
          <p className="card-sub-info">
            Manage and update website portrait images for Personal, Developer, and Creator roles. Supports ImageKit.io CDN URLs and custom web links.
          </p>

          <div className="form-grid-3">
            {/* Personal Role Image */}
            <div className="form-field role-image-box">
              <label>Personal Role Image</label>
              <div className="role-thumb-preview">
                <img
                  src={formData.heroImagePersonal || formData.personalImage || formData.profileImage}
                  alt="Personal Role Preview"
                />
              </div>
              <input
                type="text"
                name="heroImagePersonal"
                value={formData.heroImagePersonal || ''}
                onChange={handleChange}
                placeholder="https://ik.imagekit.io/x2eerczu0/... or image URL"
              />
            </div>

            {/* Developer Role Image */}
            <div className="form-field role-image-box">
              <label>Developer Role Image</label>
              <div className="role-thumb-preview">
                <img
                  src={formData.heroImageDeveloper || formData.developerImage || formData.profileImage}
                  alt="Developer Role Preview"
                />
              </div>
              <input
                type="text"
                name="heroImageDeveloper"
                value={formData.heroImageDeveloper || ''}
                onChange={handleChange}
                placeholder="https://ik.imagekit.io/x2eerczu0/... or image URL"
              />
            </div>

            {/* Creator Role Image */}
            <div className="form-field role-image-box">
              <label>Creator / YouTuber Role Image</label>
              <div className="role-thumb-preview">
                <img
                  src={formData.heroImageCreator || formData.creatorImage || formData.profileImage}
                  alt="Creator Role Preview"
                />
              </div>
              <input
                type="text"
                name="heroImageCreator"
                value={formData.heroImageCreator || ''}
                onChange={handleChange}
                placeholder="https://ik.imagekit.io/x2eerczu0/... or image URL"
              />
            </div>
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
