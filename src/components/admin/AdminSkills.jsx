import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star, Check, X, Sparkles } from 'lucide-react';
import { PremierePro, Photoshop } from '../common/Icons';
import ballerinaImg from '../../Iamage/ballerina.jpeg';
import { usePortfolio } from '../../context/PortfolioContext';
import { ImageUploadField } from './ImageUploadField';

export const AdminSkills = () => {
  const { skills, saveSkill, deleteSkill } = usePortfolio();

  const [editingSkill, setEditingSkill] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');

  const renderAdminSkillIcon = (skill) => {
    const icon = (skill.icon || '').toLowerCase();
    const name = (skill.name || '').toLowerCase();

    if (skill.imageUrl || icon.includes('ballerina') || name.includes('ballerina')) {
      const imgSrc = skill.imageUrl || ballerinaImg;
      return (
        <img
          src={imgSrc}
          alt={skill.name || 'Ballerina'}
          style={{ width: '22px', height: '22px', objectFit: 'contain', borderRadius: '4px' }}
        />
      );
    }
    if (icon.includes('premiere') || name.includes('premiere')) {
      return <PremierePro size={20} />;
    }
    if (icon.includes('photoshop') || name.includes('photoshop')) {
      return <Photoshop size={20} />;
    }
    if (skill.icon && skill.icon.startsWith('devicon-')) {
      return <i className={`${skill.icon} colored`} />;
    }
    return <Sparkles size={16} />;
  };

  const categories = [
    'Programming Languages',
    'Frontend',
    'Backend',
    'Mobile',
    'Database',
    'AI / ML',
    'IoT',
    'DevOps & Cloud',
    'Design & Creative Tools',
    'Tools'
  ];

  const emptySkill = {
    name: '',
    category: 'Programming Languages',
    icon: 'devicon-react-original',
    description: '',
    level: 'Proficient',
    featured: false,
    order: skills.length + 1
  };

  const handleStartNew = () => {
    setEditingSkill({ ...emptySkill });
    setIsNew(true);
  };

  const handleStartEdit = (skill) => {
    setEditingSkill({ ...skill });
    setIsNew(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingSkill.name) return;
    await saveSkill(editingSkill);
    setEditingSkill(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      await deleteSkill(id);
    }
  };

  const filtered = skills.filter((s) => {
    if (filterCategory === 'All') return true;
    return s.category === filterCategory;
  });

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">Skills & Technical Proficiencies</h2>
          <p className="admin-pane-desc">
            Manage your database-driven competency matrix, categories, devicons, and featured highlights.
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleStartNew}>
          <Plus size={16} />
          <span>Add New Skill</span>
        </button>
      </div>

      {/* Modal / Form when editing */}
      {editingSkill && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <div className="admin-modal-header">
              <h3 className="modal-heading">
                {isNew ? 'Create New Skill' : `Edit Skill: ${editingSkill.name}`}
              </h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setEditingSkill(null)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="admin-modal-form">
              <div className="form-grid-2">
                <div className="form-field">
                  <label>Skill Name *</label>
                  <input
                    type="text"
                    value={editingSkill.name}
                    onChange={(e) =>
                      setEditingSkill({ ...editingSkill, name: e.target.value })
                    }
                    placeholder="e.g. React.js"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Category *</label>
                  <select
                    value={editingSkill.category}
                    onChange={(e) =>
                      setEditingSkill({ ...editingSkill, category: e.target.value })
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
                  <label>Devicon Class Name</label>
                  <input
                    type="text"
                    value={editingSkill.icon || ''}
                    onChange={(e) =>
                      setEditingSkill({ ...editingSkill, icon: e.target.value })
                    }
                    placeholder="e.g. devicon-react-original"
                  />
                  <small className="field-hint">e.g. devicon-java-plain, devicon-python-plain</small>
                </div>

                <div className="form-field">
                  <label>Proficiency Label</label>
                  <input
                    type="text"
                    value={editingSkill.level || ''}
                    onChange={(e) =>
                      setEditingSkill({ ...editingSkill, level: e.target.value })
                    }
                    placeholder="e.g. Advanced, Proficient, Familiar"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Custom Skill Icon / Logo (Optional)"
                value={editingSkill.imageUrl || ''}
                onChange={(url) =>
                  setEditingSkill({ ...editingSkill, imageUrl: url })
                }
                folder="skills"
                placeholder="https://ik.imagekit.io/... or upload logo image"
                hint="Upload PNG/SVG/JPEG logo (e.g. Ballerina, Flutter, etc.)"
              />

              <div className="form-field">
                <label>Description</label>
                <textarea
                  value={editingSkill.description || ''}
                  onChange={(e) =>
                    setEditingSkill({ ...editingSkill, description: e.target.value })
                  }
                  placeholder="Summary of usage and context..."
                  rows={2}
                />
              </div>

              <div className="form-checkbox-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingSkill.featured || false}
                    onChange={(e) =>
                      setEditingSkill({
                        ...editingSkill,
                        featured: e.target.checked
                      })
                    }
                  />
                  <span>Mark as Featured Skill (Spotlighted on Developer tab)</span>
                </label>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setEditingSkill(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={16} />
                  <span>{isNew ? 'Create Skill' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skills Table List */}
      <div className="admin-card-section">
        <div className="admin-table-filters">
          <div className="category-filter-chips">
            <button
              type="button"
              className={`chip ${filterCategory === 'All' ? 'active' : ''}`}
              onClick={() => setFilterCategory('All')}
            >
              All ({skills.length})
            </button>
            {categories.map((c) => {
              const count = skills.filter((s) => s.category === c).length;
              if (count === 0) return null;
              return (
                <button
                  key={c}
                  type="button"
                  className={`chip ${filterCategory === c ? 'active' : ''}`}
                  onClick={() => setFilterCategory(c)}
                >
                  {c} ({count})
                </button>
              );
            })}
          </div>
        </div>

        <div className="admin-table-responsive">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Name</th>
                <th>Category</th>
                <th>Proficiency</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((skill) => (
                <tr key={skill.id || skill.name}>
                  <td>
                    <div className="table-skill-icon">
                      {renderAdminSkillIcon(skill)}
                    </div>
                  </td>
                  <td>
                    <strong>{skill.name}</strong>
                    {skill.description && (
                      <p className="table-subtext">{skill.description}</p>
                    )}
                  </td>
                  <td>
                    <span className="table-cat-pill">{skill.category}</span>
                  </td>
                  <td>{skill.level || '—'}</td>
                  <td>
                    {skill.featured ? (
                      <span className="featured-badge">
                        <Star size={12} className="fill-star" /> Yes
                      </span>
                    ) : (
                      'No'
                    )}
                  </td>
                  <td className="cell-actions">
                    <button
                      type="button"
                      className="btn-action edit"
                      onClick={() => handleStartEdit(skill)}
                      title="Edit Skill"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      className="btn-action delete"
                      onClick={() => handleDelete(skill.id)}
                      title="Delete Skill"
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
