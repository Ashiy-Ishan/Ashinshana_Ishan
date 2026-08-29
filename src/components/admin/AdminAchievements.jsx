import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, CloudUpload, CheckCircle2, Award, FileCheck2, BookOpen, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ImageUploadField } from './ImageUploadField';

export const AdminAchievements = () => {
  const { achievements, saveAchievement, deleteAchievement, syncAllAchievements } = usePortfolio();

  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [syncing, setSyncing] = useState(false);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState(null);

  const certificateTypes = [
    'Achievement',
    'Participation Certificate',
    'Learning Certificate'
  ];

  const suggestedCategories = [
    'AI & Machine Learning',
    'Cybersecurity',
    'Software Engineering',
    'IoT & Innovation',
    'Mobile Development',
    'Cloud Architecture',
    'Algorithms',
    'Problem Solving',
    'AI & Vibe Coding',
    'Hackathon'
  ];

  const emptyAchievement = {
    title: '',
    issuer: '',
    date: new Date().getFullYear().toString(),
    type: 'Achievement',
    category: 'Software Engineering',
    badge: 'Verified',
    description: '',
    imageUrl: '',
    credentialUrl: '',
    order: (achievements || []).length + 1
  };

  const handleStartNew = () => {
    setEditingItem({ ...emptyAchievement });
    setIsNew(true);
  };

  const handleStartEdit = (item) => {
    setEditingItem({ ...item, type: item.type || 'Achievement' });
    setIsNew(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingItem.title) return;
    await saveAchievement(editingItem);
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this certificate/achievement?')) {
      await deleteAchievement(id);
    }
  };

  const handleSyncAllBaseline = async () => {
    setSyncing(true);
    setSyncSuccessMessage(null);
    try {
      await syncAllAchievements();
      setSyncSuccessMessage('All baseline achievements and certificates successfully uploaded and synchronized to Firestore database!');
      setTimeout(() => setSyncSuccessMessage(null), 4000);
    } catch (err) {
      alert(`Sync failed: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Achievement':
        return <Award size={14} />;
      case 'Participation Certificate':
        return <FileCheck2 size={14} />;
      case 'Learning Certificate':
        return <BookOpen size={14} />;
      default:
        return <Award size={14} />;
    }
  };

  const filtered = (achievements || []).filter((item) => {
    if (filterType === 'All') return true;
    return (item.type || 'Achievement') === filterType;
  });

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">Achievements & Batch Certificates</h2>
          <p className="admin-pane-desc">
            Manage academic degrees, competitive hackathon awards, participation certificates, and verified learning credentials.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleSyncAllBaseline}
            disabled={syncing}
            title="Upload all default certificates into the Firestore database once"
          >
            <CloudUpload size={16} />
            <span>{syncing ? 'Uploading All Certificates...' : 'Upload All Default Certificates Once'}</span>
          </button>
          <button type="button" className="btn btn-primary" onClick={handleStartNew}>
            <Plus size={16} />
            <span>Add New Certificate / Achievement</span>
          </button>
        </div>
      </div>

      {syncSuccessMessage && (
        <div className="form-alert success" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={18} />
          <span>{syncSuccessMessage}</span>
        </div>
      )}

      {/* Filter Tabs Bar */}
      <div className="project-category-tabs" style={{ marginBottom: '1.5rem' }}>
        {['All', ...certificateTypes].map((t) => {
          const count =
            t === 'All'
              ? (achievements || []).length
              : (achievements || []).filter((it) => (it.type || 'Achievement') === t).length;

          return (
            <button
              key={t}
              type="button"
              className={`project-tab-btn ${filterType === t ? 'active' : ''}`}
              onClick={() => setFilterType(t)}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                {t !== 'All' && getTypeIcon(t)}
                {t}
              </span>
              <span className="tab-badge">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Modal / Form when editing */}
      {editingItem && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box large">
            <div className="admin-modal-header">
              <h3 className="modal-heading">
                {isNew ? 'Create New Certificate / Achievement' : `Edit: ${editingItem.title}`}
              </h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setEditingItem(null)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="admin-modal-form">
              <div className="form-field">
                <label>Certificate / Achievement Title *</label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, title: e.target.value })
                  }
                  placeholder="e.g. 1st Runner Up in TENSORFORGE or Cisco Python Essentials"
                  required
                />
              </div>

              {/* Certificate Classification Type */}
              <div className="form-field">
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Certificate Category Type *</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.35rem' }}>
                  {certificateTypes.map((t) => {
                    const active = editingItem.type === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        style={{
                          padding: '0.4rem 0.85rem',
                          borderRadius: '8px',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          background: active ? (t === 'Achievement' ? '#ffb800' : t === 'Participation Certificate' ? '#00d2ff' : '#10b981') : 'var(--bg-surface-elevated)',
                          color: active ? '#000' : 'var(--text-secondary)',
                          border: active ? '1px solid currentColor' : '1px solid var(--border-medium)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          transition: 'all 0.2s ease'
                        }}
                        onClick={() => setEditingItem({ ...editingItem, type: t })}
                      >
                        {getTypeIcon(t)}
                        <span>{t}</span>
                        {active && <Check size={14} strokeWidth={3} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label>Issuing Organization / University *</label>
                  <input
                    type="text"
                    value={editingItem.issuer || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, issuer: e.target.value })
                    }
                    placeholder="e.g. General Sir John Kotelawala Defence University"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Date / Year</label>
                  <input
                    type="text"
                    value={editingItem.date || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, date: e.target.value })
                    }
                    placeholder="e.g. Oct 2025"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label>Domain / Category</label>
                  <input
                    type="text"
                    value={editingItem.category || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value })
                    }
                    placeholder="e.g. AI & Machine Learning, Cybersecurity"
                  />
                  {/* Category Quick Chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.4rem' }}>
                    {suggestedCategories.map((sc) => (
                      <button
                        key={sc}
                        type="button"
                        style={{
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          background: editingItem.category === sc ? 'var(--accent-dev)' : 'var(--bg-surface-elevated)',
                          color: editingItem.category === sc ? '#000' : 'var(--text-secondary)',
                          border: '1px solid var(--border-medium)'
                        }}
                        onClick={() => setEditingItem({ ...editingItem, category: sc })}
                      >
                        {sc}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-field">
                  <label>Badge / Ribbon Label</label>
                  <input
                    type="text"
                    value={editingItem.badge || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, badge: e.target.value })
                    }
                    placeholder="e.g. 1st Runner Up, Semi-Finalist, Cisco Certified"
                  />
                  <small className="field-hint">Highlighted badge shown on the certificate banner</small>
                </div>
              </div>

              <ImageUploadField
                label="Certificate Banner / Cover Image"
                value={editingItem.imageUrl || ''}
                onChange={(url) =>
                  setEditingItem({ ...editingItem, imageUrl: url })
                }
                folder="certificates"
                placeholder="https://ik.imagekit.io/... or upload certificate image"
                hint="Upload high-res PNG/JPEG or scan of certificate to ImageKit CDN"
              />

              <div className="form-field">
                <label>Verification / Credential URL</label>
                <input
                  type="url"
                  value={editingItem.credentialUrl || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, credentialUrl: e.target.value })
                  }
                  placeholder="https://drive.google.com/... or https://www.credly.com/..."
                />
                <small className="field-hint">Public link where visitors can inspect and verify the credential</small>
              </div>

              <div className="form-field">
                <label>Description & Scope</label>
                <textarea
                  value={editingItem.description || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  placeholder="Summary of skills validated, competition achievements, or project scope..."
                  rows={3}
                />
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setEditingItem(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={16} />
                  <span>{isNew ? 'Create Certificate' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificates Data Table */}
      <div className="admin-card-section">
        <div className="admin-table-responsive">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Type</th>
                <th>Domain</th>
                <th>Issuer</th>
                <th>Date</th>
                <th>Badge</th>
                <th>Credential</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const itemType = item.type || 'Achievement';
                return (
                  <tr key={item.id || item.title}>
                    <td>
                      <div className="table-project-thumb">
                        <img 
                          src={item.imageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'} 
                          alt={item.title} 
                        />
                      </div>
                    </td>
                    <td>
                      <strong>{item.title}</strong>
                      <p className="table-subtext">{item.description}</p>
                    </td>
                    <td>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          background: itemType === 'Achievement' ? 'rgba(255, 184, 0, 0.15)' : itemType === 'Participation Certificate' ? 'rgba(0, 210, 255, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                          color: itemType === 'Achievement' ? '#ffb800' : itemType === 'Participation Certificate' ? '#00d2ff' : '#10b981',
                          padding: '0.25rem 0.55rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {getTypeIcon(itemType)}
                        {itemType}
                      </span>
                    </td>
                    <td>
                      <span className="table-cat-pill">{item.category}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem' }}>{item.issuer}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.date}</span>
                    </td>
                    <td>
                      <span className="table-status-pill">{item.badge || 'Verified'}</span>
                    </td>
                    <td>
                      {item.credentialUrl ? (
                        <a
                          href={item.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-action edit"
                          style={{ display: 'inline-flex', padding: '0.3rem 0.5rem', borderRadius: '4px' }}
                          title="Open Credential"
                        >
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>None</span>
                      )}
                    </td>
                    <td className="cell-actions">
                      <button
                        type="button"
                        className="btn-action edit"
                        onClick={() => handleStartEdit(item)}
                        title="Edit Certificate"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        className="btn-action delete"
                        onClick={() => handleDelete(item.id)}
                        title="Delete Certificate"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
