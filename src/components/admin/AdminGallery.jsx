// src/components/admin/AdminGallery.jsx
import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Sparkles, 
  User, 
  Code2, 
  Video,
  Eye
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminGallery = () => {
  const { gallery, profile, saveGalleryItem, deleteGalleryItem, updateProfile } = usePortfolio();

  const [isAdding, setIsAdding] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const [notification, setNotification] = useState(null);

  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Portrait',
    url: '',
    date: new Date().toISOString().slice(0, 7)
  });

  const categories = ['Portrait', 'Developer', 'Creator', 'Project', 'Thumbnail', 'Other'];

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddMedia = async (e) => {
    e.preventDefault();
    if (!newItem.title || !newItem.url) return;
    await saveGalleryItem(newItem);
    setNewItem({
      title: '',
      category: 'Portrait',
      url: '',
      date: new Date().toISOString().slice(0, 7)
    });
    setIsAdding(false);
    showToast('Media item added to gallery!');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this media item from gallery?')) {
      await deleteGalleryItem(id);
      showToast('Media item deleted.');
    }
  };

  const handleSetAs = async (item, role) => {
    let updatedProfile = { ...profile };

    switch (role) {
      case 'profile':
        updatedProfile.profileImage = item.url;
        break;
      case 'heroPersonal':
        updatedProfile.heroImagePersonal = item.url;
        break;
      case 'heroDeveloper':
        updatedProfile.heroImageDeveloper = item.url;
        break;
      case 'heroCreator':
        updatedProfile.heroImageCreator = item.url;
        break;
      default:
        break;
    }

    await updateProfile(updatedProfile);
    showToast(`Updated! Image assigned as ${role}`);
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">Dedicated Media & Asset Gallery</h2>
          <p className="admin-pane-desc">
            Organize portraits, thumbnails, project screenshots, and one-click assign them to your hero portraits.
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setIsAdding(true)}>
          <Plus size={16} />
          <span>Add Media Asset</span>
        </button>
      </div>

      {notification && (
        <div className="form-alert success mb-4">
          <Check size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* Add Media Modal */}
      {isAdding && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <div className="admin-modal-header">
              <h3 className="modal-heading">Add Media Asset to Gallery</h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setIsAdding(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMedia} className="admin-modal-form">
              <div className="form-field">
                <label>Media Title *</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  placeholder="e.g. Studio Portrait (Head & Shoulders)"
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label>Asset Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({ ...newItem, category: e.target.value })
                    }
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Date Tag</label>
                  <input
                    type="text"
                    value={newItem.date}
                    onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Direct Image URL or Asset Path *</label>
                <input
                  type="text"
                  value={newItem.url}
                  onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                  placeholder="https://... or relative path"
                  required
                />
              </div>

              {newItem.url && (
                <div className="preview-container-mini">
                  <p className="preview-label">Live Preview:</p>
                  <img src={newItem.url} alt="Preview" className="media-mini-preview" />
                </div>
              )}

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsAdding(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={16} />
                  <span>Save to Gallery</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Cards Grid */}
      <div className="gallery-admin-grid">
        {gallery.map((item) => {
          const isCurrentProfile = profile?.profileImage === item.url;
          const isCurrentHeroPersonal = profile?.heroImagePersonal === item.url;
          const isCurrentHeroDev = profile?.heroImageDeveloper === item.url;
          const isCurrentHeroCreator = profile?.heroImageCreator === item.url;

          return (
            <div key={item.id || item.url} className="gallery-admin-card">
              <div className="gallery-media-frame">
                <img src={item.url} alt={item.title} loading="lazy" />
                <button
                  type="button"
                  className="btn-preview-zoom"
                  onClick={() => setPreviewItem(item)}
                  title="Full Preview"
                >
                  <Eye size={16} />
                </button>
                <span className="gallery-category-badge">{item.category}</span>
              </div>

              <div className="gallery-card-body">
                <h4 className="gallery-item-title">{item.title}</h4>
                <p className="gallery-item-date">{item.date}</p>

                {/* Quick Role Assignment Buttons */}
                <div className="gallery-role-assignment-box">
                  <span className="role-assign-label">Quick Set As:</span>
                  <div className="assign-btn-group">
                    <button
                      type="button"
                      className={`btn-assign ${isCurrentProfile ? 'active' : ''}`}
                      onClick={() => handleSetAs(item, 'profile')}
                      title="Set as Main Profile Picture"
                    >
                      <User size={12} /> Profile
                    </button>
                    <button
                      type="button"
                      className={`btn-assign ${isCurrentHeroPersonal ? 'active' : ''}`}
                      onClick={() => handleSetAs(item, 'heroPersonal')}
                      title="Set as Split Hero Portrait"
                    >
                      <Sparkles size={12} /> Personal
                    </button>
                    <button
                      type="button"
                      className={`btn-assign ${isCurrentHeroDev ? 'active' : ''}`}
                      onClick={() => handleSetAs(item, 'heroDeveloper')}
                      title="Set as Developer Hero Portrait"
                    >
                      <Code2 size={12} /> Dev Hero
                    </button>
                    <button
                      type="button"
                      className={`btn-assign ${isCurrentHeroCreator ? 'active' : ''}`}
                      onClick={() => handleSetAs(item, 'heroCreator')}
                      title="Set as Creator Hero Portrait"
                    >
                      <Video size={12} /> Creator Hero
                    </button>
                  </div>
                </div>

                <div className="gallery-card-footer">
                  <button
                    type="button"
                    className="btn-delete-media"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 size={14} /> Remove Media
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Preview Modal */}
      {previewItem && (
        <div className="admin-modal-overlay" onClick={() => setPreviewItem(null)}>
          <div className="gallery-preview-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setPreviewItem(null)}
            >
              <X size={20} />
            </button>
            <img src={previewItem.url} alt={previewItem.title} className="preview-full-img" />
            <div className="preview-caption">
              <h3>{previewItem.title}</h3>
              <p>Category: {previewItem.category} • Date: {previewItem.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
