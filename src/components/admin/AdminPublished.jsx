import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ImageUploadField } from './ImageUploadField';

export const AdminPublished = () => {
  const { publishedProjects, savePublishedProject, deletePublishedProject } = usePortfolio();

  const [editingPub, setEditingPub] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const statusOptions = ['Released', 'Open Source', 'Live', 'In Development', 'Archived'];

  const emptyPub = {
    name: '',
    version: 'v1.0.0',
    releaseDate: new Date().toISOString().slice(0, 7),
    technology: '',
    github: '',
    liveDemo: '',
    status: 'Released',
    description: ''
  };

  const handleStartNew = () => {
    setEditingPub({ ...emptyPub });
    setIsNew(true);
  };

  const handleStartEdit = (pub) => {
    setEditingPub({ ...pub });
    setIsNew(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingPub.name) return;
    await savePublishedProject(editingPub);
    setEditingPub(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this published software release?')) {
      await deletePublishedProject(id);
    }
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">Published Software & Open Source Releases</h2>
          <p className="admin-pane-desc">
            Manage software versions, release dates, repository links, and distribution statuses.
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleStartNew}>
          <Plus size={16} />
          <span>Add Published Software</span>
        </button>
      </div>

      {editingPub && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <div className="admin-modal-header">
              <h3 className="modal-heading">
                {isNew ? 'New Published Release' : `Edit Release: ${editingPub.name}`}
              </h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setEditingPub(null)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="admin-modal-form">
              <div className="form-grid-2">
                <div className="form-field">
                  <label>Software / Name *</label>
                  <input
                    type="text"
                    value={editingPub.name}
                    onChange={(e) =>
                      setEditingPub({ ...editingPub, name: e.target.value })
                    }
                    placeholder="e.g. Slithering Engine Core"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Version</label>
                  <input
                    type="text"
                    value={editingPub.version || ''}
                    onChange={(e) =>
                      setEditingPub({ ...editingPub, version: e.target.value })
                    }
                    placeholder="e.g. v2.1.0"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label>Release Date</label>
                  <input
                    type="text"
                    value={editingPub.releaseDate || ''}
                    onChange={(e) =>
                      setEditingPub({ ...editingPub, releaseDate: e.target.value })
                    }
                    placeholder="e.g. 2025-02"
                  />
                </div>

                <div className="form-field">
                  <label>Status</label>
                  <select
                    value={editingPub.status}
                    onChange={(e) =>
                      setEditingPub({ ...editingPub, status: e.target.value })
                    }
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>Technology Stack</label>
                <input
                  type="text"
                  value={editingPub.technology || ''}
                  onChange={(e) =>
                    setEditingPub({ ...editingPub, technology: e.target.value })
                  }
                  placeholder="e.g. Java 17, Spring Boot, MySQL"
                />
              </div>

              <div className="form-field">
                <label>Description</label>
                <textarea
                  value={editingPub.description || ''}
                  onChange={(e) =>
                    setEditingPub({ ...editingPub, description: e.target.value })
                  }
                  rows={2}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label>GitHub Link</label>
                  <input
                    type="url"
                    value={editingPub.github || ''}
                    onChange={(e) =>
                      setEditingPub({ ...editingPub, github: e.target.value })
                    }
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className="form-field">
                  <label>Live Demo Link</label>
                  <input
                    type="url"
                    value={editingPub.liveDemo || ''}
                    onChange={(e) =>
                      setEditingPub({ ...editingPub, liveDemo: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>

              <ImageUploadField
                label="Release Banner / Cover Image"
                value={editingPub.imageUrl || editingPub.banner || ''}
                onChange={(url) =>
                  setEditingPub({ ...editingPub, imageUrl: url, banner: url })
                }
                folder="published"
                placeholder="https://ik.imagekit.io/... or upload release banner"
                hint="Upload software artwork or release screenshot"
              />

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setEditingPub(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={16} />
                  <span>{isNew ? 'Create Release' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-card-section">
        <div className="admin-table-responsive">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Software Name</th>
                <th>Version</th>
                <th>Status</th>
                <th>Release Date</th>
                <th>Technology</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {publishedProjects.map((pub) => (
                <tr key={pub.id || pub.name}>
                  <td>
                    <strong>{pub.name}</strong>
                    <p className="table-subtext">{pub.description}</p>
                  </td>
                  <td>
                    <span className="pub-version-pill">{pub.version}</span>
                  </td>
                  <td>
                    <span className="table-status-pill">{pub.status}</span>
                  </td>
                  <td>{pub.releaseDate}</td>
                  <td>{pub.technology}</td>
                  <td className="cell-actions">
                    <button
                      type="button"
                      className="btn-action edit"
                      onClick={() => handleStartEdit(pub)}
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn-action delete"
                      onClick={() => handleDelete(pub.id)}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
