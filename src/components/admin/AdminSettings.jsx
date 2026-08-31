import React, { useState } from 'react';
import { Save, Check, Globe, Eye, Palette } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminSettings = () => {
  const { siteSettings, updateSiteSettings } = usePortfolio();

  const [formData, setFormData] = useState({
    siteTitle: siteSettings?.siteTitle || 'Ashinshana Ishan | Developer • Creator • Builder',
    tagline: siteSettings?.tagline || 'I BUILD. I CREATE. I SHARE.',
    metaDescription: siteSettings?.metaDescription || 'Ashinshana Ishan is a software developer and content creator.',
    accentColor: siteSettings?.accentColor || '#00d2ff',
    developerAccent: siteSettings?.developerAccent || '#38bdf8',
    creatorAccent: siteSettings?.creatorAccent || '#ff3366',
    showHeroRoles: siteSettings?.showHeroRoles !== false,
    showDeveloperSection: siteSettings?.showDeveloperSection !== false,
    showCreatorSection: siteSettings?.showCreatorSection !== false,
    showPublishedProjects: siteSettings?.showPublishedProjects !== false,
    showTimeline: siteSettings?.showTimeline !== false,
    showContactForm: siteSettings?.showContactForm !== false
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSiteSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">Global Site & SEO Settings</h2>
          <p className="admin-pane-desc">
            Configure global website metadata, OpenGraph tags, dynamic section visibility, and color accents.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-form-card max-w-3xl">
        {saved && (
          <div className="form-alert success">
            <Check size={16} />
            <span>Site settings & SEO metadata successfully saved!</span>
          </div>
        )}

        <div className="admin-card-section">
          <h3 className="card-section-title">
            <Globe size={18} /> SEO & Browser Metadata
          </h3>

          <div className="form-field">
            <label>Browser Page Title</label>
            <input
              type="text"
              name="siteTitle"
              value={formData.siteTitle}
              onChange={handleChange}
              placeholder="Ashinshana Ishan | Developer • Creator • Builder"
            />
          </div>

          <div className="form-field">
            <label>Tagline / Headline Motto</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="I BUILD. I CREATE. I SHARE."
            />
          </div>

          <div className="form-field">
            <label>Meta Description (SEO & Social Cards)</label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows={3}
              placeholder="Ashinshana Ishan is a software developer, creator, and Sabaragamuwa University computing undergraduate..."
            />
          </div>
        </div>

        <div className="admin-card-section">
          <h3 className="card-section-title">
            <Palette size={18} /> Theme Accents & Visual Style
          </h3>

          <div className="form-grid-3">
            <div className="form-field">
              <label>Primary Brand Accent</label>
              <div className="color-picker-row">
                <input
                  type="color"
                  name="accentColor"
                  value={formData.accentColor}
                  onChange={handleChange}
                  className="color-swatch-input"
                />
                <input
                  type="text"
                  name="accentColor"
                  value={formData.accentColor}
                  onChange={handleChange}
                  className="color-hex-text"
                />
              </div>
            </div>

            <div className="form-field">
              <label>Developer Mode Accent</label>
              <div className="color-picker-row">
                <input
                  type="color"
                  name="developerAccent"
                  value={formData.developerAccent}
                  onChange={handleChange}
                  className="color-swatch-input"
                />
                <input
                  type="text"
                  name="developerAccent"
                  value={formData.developerAccent}
                  onChange={handleChange}
                  className="color-hex-text"
                />
              </div>
            </div>

            <div className="form-field">
              <label>Creator Mode Accent</label>
              <div className="color-picker-row">
                <input
                  type="color"
                  name="creatorAccent"
                  value={formData.creatorAccent}
                  onChange={handleChange}
                  className="color-swatch-input"
                />
                <input
                  type="text"
                  name="creatorAccent"
                  value={formData.creatorAccent}
                  onChange={handleChange}
                  className="color-hex-text"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="admin-card-section">
          <h3 className="card-section-title">
            <Eye size={18} /> Section Toggles & Public Visibility
          </h3>

          <div className="checkboxes-stack">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="showHeroRoles"
                checked={formData.showHeroRoles}
                onChange={handleChange}
              />
              <span>Enable 3-Role Interactive Hero Switcher (Personal, Developer, Creator)</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="showDeveloperSection"
                checked={formData.showDeveloperSection}
                onChange={handleChange}
              />
              <span>Display Software Developer Showcase Section</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="showCreatorSection"
                checked={formData.showCreatorSection}
                onChange={handleChange}
              />
              <span>Display YouTube & Tech Creator Studio Section</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="showPublishedProjects"
                checked={formData.showPublishedProjects}
                onChange={handleChange}
              />
              <span>Display Published Software & Open Source Releases</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="showTimeline"
                checked={formData.showTimeline}
                onChange={handleChange}
              />
              <span>Display Milestone Timeline in About Section</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="showContactForm"
                checked={formData.showContactForm}
                onChange={handleChange}
              />
              <span>Display Interactive Contact Inquiry Form</span>
            </label>
          </div>
        </div>

        <div className="form-action-bar">
          <button type="submit" className="btn btn-primary">
            <Save size={16} />
            <span>Save Global Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
