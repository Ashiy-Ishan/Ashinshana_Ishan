import React, { useState } from 'react';
import { Save, Check, Hammer, BookOpen, Video, Compass } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminBuilding = () => {
  const { currentlyBuilding, updateCurrentlyBuilding } = usePortfolio();

  const [formData, setFormData] = useState({
    building: { ...(currentlyBuilding?.building || {}) },
    learning: { ...(currentlyBuilding?.learning || {}) },
    creating: { ...(currentlyBuilding?.creating || {}) },
    exploring: { ...(currentlyBuilding?.exploring || {}) }
  });

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleFieldChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateCurrentlyBuilding(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Error updating currently building: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">Currently Building & Exploring Radar</h2>
          <p className="admin-pane-desc">
            Keep your visitors informed on your live engineering, academic learning, content production, and research explorations.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-form-container">
        {saved && (
          <div className="form-alert success">
            <Check size={18} />
            <span>Currently Building radar updated successfully!</span>
          </div>
        )}

        {/* 1. Building */}
        <div className="admin-form-card">
          <h3 className="card-section-title">
            <Hammer size={18} className="text-accent" /> 1. What You Are Currently Building
          </h3>
          <div className="form-grid-2">
            <div className="form-field">
              <label>Project / System Title</label>
              <input
                type="text"
                value={formData.building?.title || ''}
                onChange={(e) => handleFieldChange('building', 'title', e.target.value)}
                placeholder="e.g. Next-Gen Portfolio & Headless CMS"
              />
            </div>
            <div className="form-field">
              <label>Status Badge</label>
              <input
                type="text"
                value={formData.building?.badge || ''}
                onChange={(e) => handleFieldChange('building', 'badge', e.target.value)}
                placeholder="e.g. Active Development"
              />
            </div>
          </div>
          <div className="form-field">
            <label>Description</label>
            <textarea
              value={formData.building?.description || ''}
              onChange={(e) => handleFieldChange('building', 'description', e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* 2. Learning */}
        <div className="admin-form-card">
          <h3 className="card-section-title">
            <BookOpen size={18} className="text-accent" /> 2. What You Are Currently Learning
          </h3>
          <div className="form-grid-2">
            <div className="form-field">
              <label>Subject / Tech Stack</label>
              <input
                type="text"
                value={formData.learning?.title || ''}
                onChange={(e) => handleFieldChange('learning', 'title', e.target.value)}
                placeholder="e.g. Cloud Distributed Systems & Shaders"
              />
            </div>
            <div className="form-field">
              <label>Status Badge</label>
              <input
                type="text"
                value={formData.learning?.badge || ''}
                onChange={(e) => handleFieldChange('learning', 'badge', e.target.value)}
                placeholder="e.g. Continuous Learning"
              />
            </div>
          </div>
          <div className="form-field">
            <label>Description</label>
            <textarea
              value={formData.learning?.description || ''}
              onChange={(e) => handleFieldChange('learning', 'description', e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* 3. Creating */}
        <div className="admin-form-card">
          <h3 className="card-section-title">
            <Video size={18} className="text-accent" /> 3. What You Are Currently Creating
          </h3>
          <div className="form-grid-2">
            <div className="form-field">
              <label>Content Title / Series</label>
              <input
                type="text"
                value={formData.creating?.title || ''}
                onChange={(e) => handleFieldChange('creating', 'title', e.target.value)}
                placeholder="e.g. YouTube Series on Full-Stack Dev"
              />
            </div>
            <div className="form-field">
              <label>Status Badge</label>
              <input
                type="text"
                value={formData.creating?.badge || ''}
                onChange={(e) => handleFieldChange('creating', 'badge', e.target.value)}
                placeholder="e.g. Content Creation"
              />
            </div>
          </div>
          <div className="form-field">
            <label>Description</label>
            <textarea
              value={formData.creating?.description || ''}
              onChange={(e) => handleFieldChange('creating', 'description', e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* 4. Exploring */}
        <div className="admin-form-card">
          <h3 className="card-section-title">
            <Compass size={18} className="text-accent" /> 4. What You Are Currently Exploring
          </h3>
          <div className="form-grid-2">
            <div className="form-field">
              <label>Tech / Topic of Interest</label>
              <input
                type="text"
                value={formData.exploring?.title || ''}
                onChange={(e) => handleFieldChange('exploring', 'title', e.target.value)}
                placeholder="e.g. Generative AI Agents & IoT Edge Devices"
              />
            </div>
            <div className="form-field">
              <label>Status Badge</label>
              <input
                type="text"
                value={formData.exploring?.badge || ''}
                onChange={(e) => handleFieldChange('exploring', 'badge', e.target.value)}
                placeholder="e.g. Research"
              />
            </div>
          </div>
          <div className="form-field">
            <label>Description</label>
            <textarea
              value={formData.exploring?.description || ''}
              onChange={(e) => handleFieldChange('exploring', 'description', e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="admin-form-sticky-bar">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            <Save size={18} />
            <span>{saving ? 'Updating Radar...' : 'Save Radar Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
