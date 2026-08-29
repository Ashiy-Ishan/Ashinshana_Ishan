import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star, Check, X, Eye, EyeOff, CloudUpload, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ImageUploadField } from './ImageUploadField';

export const AdminProjects = () => {
  const { projects, saveProject, deleteProject, syncAllProjects } = usePortfolio();

  const [editingProject, setEditingProject] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState(null);

  const categories = ['Web', 'Backend', 'Mobile', 'AI', 'IoT', 'Desktop', 'Other'];
  const statusOptions = ['Live', 'Open Source', 'Released', 'In Development', 'Archived'];

  const emptyProject = {
    title: '',
    shortDescription: '',
    description: '',
    imageUrl: '',
    technologies: [],
    category: 'Web',
    githubUrl: '',
    liveUrl: '',
    demoUrl: '',
    date: new Date().getFullYear().toString(),
    status: 'Live',
    featured: false, // Default featured is NO
    published: true,
    order: projects.length + 1
  };

  const handleStartNew = () => {
    setEditingProject({ ...emptyProject, featured: false });
    setTechInput('');
    setIsNew(true);
  };

  const handleStartEdit = (proj) => {
    setEditingProject({ ...proj, featured: proj.featured || false });
    setTechInput(Array.isArray(proj.technologies) ? proj.technologies.join(', ') : '');
    setIsNew(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingProject.title) return;

    const techs = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const cats = getProjectCategories(editingProject);

    await saveProject({
      ...editingProject,
      categories: cats,
      category: cats.join(', '),
      technologies: techs
    });

    setEditingProject(null);
  };

  const getProjectCategories = (p) => {
    if (!p) return ['Web'];
    if (Array.isArray(p.categories) && p.categories.length > 0) {
      return p.categories;
    }
    if (p.category) {
      return p.category.split(',').map((c) => c.trim()).filter(Boolean);
    }
    return ['Web'];
  };

  const toggleCategory = (cat) => {
    const currentCats = getProjectCategories(editingProject);
    let newCats;
    if (currentCats.includes(cat)) {
      newCats = currentCats.filter((c) => c !== cat);
      if (newCats.length === 0) newCats = ['Web']; // keep at least 1
    } else {
      newCats = [...currentCats, cat];
    }
    setEditingProject({
      ...editingProject,
      categories: newCats,
      category: newCats.join(', ')
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
    }
  };

  const handleSyncAllBaseline = async () => {
    setSyncing(true);
    setSyncSuccessMessage(null);
    try {
      await syncAllProjects();
      setSyncSuccessMessage('All baseline projects successfully uploaded and synchronized to Firestore database!');
      setTimeout(() => setSyncSuccessMessage(null), 4000);
    } catch (err) {
      alert(`Sync failed: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">Projects Showcase Management</h2>
          <p className="admin-pane-desc">
            Add, update, feature, or publish software applications, live links, and repositories.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleSyncAllBaseline}
            disabled={syncing}
            title="Upload all default projects into the Firestore database once"
          >
            <CloudUpload size={16} />
            <span>{syncing ? 'Uploading All Projects...' : 'Upload All Default Projects Once'}</span>
          </button>
          <button type="button" className="btn btn-primary" onClick={handleStartNew}>
            <Plus size={16} />
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {syncSuccessMessage && (
        <div className="form-alert success" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={18} />
          <span>{syncSuccessMessage}</span>
        </div>
      )}

      {/* Modal / Form */}
      {editingProject && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box large">
            <div className="admin-modal-header">
              <h3 className="modal-heading">
                {isNew ? 'Create New Project' : `Edit Project: ${editingProject.title}`}
              </h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setEditingProject(null)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="admin-modal-form">
              <div className="form-field">
                <label>Project Title *</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, title: e.target.value })
                  }
                  placeholder="e.g. Slithering E-Commerce Engine"
                  required
                />
              </div>

              {/* Multi-Select Categories */}
              <div className="form-field">
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Categories (Click to select multiple) *</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Selected: <strong>{getProjectCategories(editingProject).join(', ')}</strong>
                  </span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.4rem' }}>
                  {categories.map((c) => {
                    const active = getProjectCategories(editingProject).includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        style={{
                          padding: '0.35rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          background: active ? 'var(--accent-dev)' : 'var(--bg-surface-elevated)',
                          color: active ? '#000' : 'var(--text-secondary)',
                          border: active ? '1px solid var(--accent-dev)' : '1px solid var(--border-medium)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          transition: 'all 0.2s ease'
                        }}
                        onClick={() => toggleCategory(c)}
                      >
                        {active && <Check size={13} strokeWidth={3} />}
                        <span>{c}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label>Status</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, status: e.target.value })
                    }
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label>Date / Year</label>
                  <input
                    type="text"
                    value={editingProject.date || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, date: e.target.value })
                    }
                    placeholder="e.g. 2025"
                  />
                </div>
              </div>

              {/* Predefined Status Quick-Select Buttons */}
              <div className="form-field">
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Quick-Select Status:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.35rem' }}>
                  {statusOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      style={{
                        padding: '0.3rem 0.65rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: editingProject.status === s ? '#38bdf8' : 'var(--bg-surface-elevated)',
                        color: editingProject.status === s ? '#000' : 'var(--text-secondary)',
                        border: editingProject.status === s ? '1px solid #38bdf8' : '1px solid var(--border-medium)',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => setEditingProject({ ...editingProject, status: s })}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <ImageUploadField
                label="Cover Image (ImageKit CDN or URL)"
                value={editingProject.imageUrl || ''}
                onChange={(url) =>
                  setEditingProject({ ...editingProject, imageUrl: url })
                }
                folder="projects"
                placeholder="https://ik.imagekit.io/... or upload cover image"
                hint="Upload project screenshot or card banner to ImageKit CDN"
              />

              <div className="form-field">
                <label>Short Description (for cards)</label>
                <input
                  type="text"
                  value={editingProject.shortDescription || ''}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      shortDescription: e.target.value
                    })
                  }
                  placeholder="Brief 1-2 sentence overview"
                />
              </div>

              <div className="form-field">
                <label>Detailed Description</label>
                <textarea
                  value={editingProject.description || ''}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: e.target.value
                    })
                  }
                  placeholder="Full technical architecture, problem solved, features..."
                  rows={3}
                />
              </div>

              <div className="form-field">
                <label>Technologies (Comma separated)</label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="e.g. React, Firebase, CSS Grid, Ballerina"
                />
              </div>

              <div className="form-grid-3">
                <div className="form-field">
                  <label>GitHub Repository URL</label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        githubUrl: e.target.value
                      })
                    }
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className="form-field">
                  <label>Live URL</label>
                  <input
                    type="url"
                    value={editingProject.liveUrl || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, liveUrl: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>

                <div className="form-field">
                  <label>Demo URL</label>
                  <input
                    type="url"
                    value={editingProject.demoUrl || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, demoUrl: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingProject.featured || false}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        featured: e.target.checked
                      })
                    }
                  />
                  <span>Feature as Spotlight Project</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingProject.published !== false}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        published: e.target.checked
                      })
                    }
                  />
                  <span>Published on Public Website</span>
                </label>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setEditingProject(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={16} />
                  <span>{isNew ? 'Create Project' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="admin-card-section">
        <div className="admin-table-responsive">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj) => (
                <tr key={proj.id || proj.title}>
                  <td>
                    <div className="table-project-thumb">
                      <img src={proj.imageUrl || proj.image} alt={proj.title} />
                    </div>
                  </td>
                  <td>
                    <strong>{proj.title}</strong>
                    <p className="table-subtext">{proj.shortDescription}</p>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                      {getProjectCategories(proj).map((c) => (
                        <span key={c} className="table-cat-pill">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="table-status-pill">{proj.status}</span>
                  </td>
                  <td>
                    {proj.featured ? (
                      <span className="featured-badge">
                        <Star size={12} className="fill-star" /> Spotlight
                      </span>
                    ) : (
                      'Standard'
                    )}
                  </td>
                  <td>
                    {proj.published !== false ? (
                      <span className="published-badge">
                        <Eye size={12} /> Live
                      </span>
                    ) : (
                      <span className="draft-badge">
                        <EyeOff size={12} /> Draft
                      </span>
                    )}
                  </td>
                  <td className="cell-actions">
                    <button
                      type="button"
                      className="btn-action edit"
                      onClick={() => handleStartEdit(proj)}
                      title="Edit Project"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn-action delete"
                      onClick={() => handleDelete(proj.id)}
                      title="Delete Project"
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
