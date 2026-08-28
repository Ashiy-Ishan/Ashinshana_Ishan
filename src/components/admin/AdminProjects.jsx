// src/components/admin/AdminProjects.jsx
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star, Check, X, Eye, EyeOff } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminProjects = () => {
  const { projects, saveProject, deleteProject } = usePortfolio();

  const [editingProject, setEditingProject] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [techInput, setTechInput] = useState('');

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
    featured: false,
    published: true,
    order: projects.length + 1
  };

  const handleStartNew = () => {
    setEditingProject({ ...emptyProject });
    setTechInput('');
    setIsNew(true);
  };

  const handleStartEdit = (proj) => {
    setEditingProject({ ...proj });
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

    await saveProject({
      ...editingProject,
      technologies: techs
    });

    setEditingProject(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
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
        <button type="button" className="btn btn-primary" onClick={handleStartNew}>
          <Plus size={16} />
          <span>Add New Project</span>
        </button>
      </div>

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
              <div className="form-grid-2">
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

                <div className="form-field">
                  <label>Category *</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
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

              <div className="form-field">
                <label>Cover Image URL or Path</label>
                <input
                  type="text"
                  value={editingProject.imageUrl || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, imageUrl: e.target.value })
                  }
                  placeholder="https://... or relative path"
                />
              </div>

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
                    <span className="table-cat-pill">{proj.category}</span>
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
