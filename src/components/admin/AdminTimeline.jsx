import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, CloudUpload, CheckCircle2, GraduationCap, Code2, Video, Sparkles, Briefcase, Calendar } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminTimeline = () => {
  const { timeline, saveTimelineItem, deleteTimelineItem, syncAllTimeline } = usePortfolio();

  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [syncing, setSyncing] = useState(false);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState(null);

  const timelineTypes = [
    { id: 'education', label: 'Education', icon: <GraduationCap size={15} /> },
    { id: 'project', label: 'Projects', icon: <Code2 size={15} /> },
    { id: 'creator', label: 'Creator', icon: <Video size={15} /> },
    { id: 'milestone', label: 'Milestone', icon: <Sparkles size={15} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={15} /> }
  ];

  const suggestedBadges = [
    'School',
    'University',
    'Content',
    'Current',
    'Hackathon',
    'Architecture',
    'Launch',
    'Certified'
  ];

  const emptyTimelineItem = {
    year: new Date().getFullYear().toString(),
    title: '',
    subtitle: '',
    description: '',
    type: 'milestone',
    badge: 'Current',
    order: (timeline || []).length + 1
  };

  const handleStartNew = () => {
    setEditingItem({ ...emptyTimelineItem });
    setIsNew(true);
  };

  const handleStartEdit = (item) => {
    setEditingItem({ ...item, type: item.type || 'milestone' });
    setIsNew(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingItem.title) return;
    await saveTimelineItem(editingItem);
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this timeline milestone?')) {
      await deleteTimelineItem(id);
    }
  };

  const handleSyncAllBaseline = async () => {
    setSyncing(true);
    setSyncSuccessMessage(null);
    try {
      await syncAllTimeline();
      setSyncSuccessMessage('All baseline timeline milestones successfully uploaded and synchronized to Firestore database!');
      setTimeout(() => setSyncSuccessMessage(null), 4000);
    } catch (err) {
      alert(`Sync failed: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'education':
        return <GraduationCap size={14} />;
      case 'project':
        return <Code2 size={14} />;
      case 'creator':
        return <Video size={14} />;
      case 'experience':
        return <Briefcase size={14} />;
      default:
        return <Sparkles size={14} />;
    }
  };

  const sortTimeline = (list) => {
    if (!list || !Array.isArray(list)) return [];
    return [...list].sort((a, b) => {
      if (typeof a.order === 'number' && typeof b.order === 'number') {
        return a.order - b.order;
      }
      const parseKey = (it) => {
        const str = String(it.year || it.date || '');
        const years = str.match(/\b(19\d\d|20\d\d)\b/g);
        if (years && years.length > 0) {
          const start = parseInt(years[0], 10);
          const end = years.length > 1 ? parseInt(years[1], 10) : (str.toLowerCase().includes('present') ? 2099 : start);
          return start * 1000 + end;
        }
        return 999999;
      };
      return parseKey(a) - parseKey(b);
    });
  };

  const filtered = sortTimeline((timeline || []).filter((item) => {
    if (filterType === 'all') return true;
    return (item.type || 'milestone') === filterType;
  }));

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">Milestone & Journey Timeline</h2>
          <p className="admin-pane-desc">
            Edit, add, and refactor educational history, major project milestones, YouTube creator achievements, and career transitions.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleSyncAllBaseline}
            disabled={syncing}
            title="Upload all default milestones into the Firestore database once"
          >
            <CloudUpload size={16} />
            <span>{syncing ? 'Uploading All Milestones...' : 'Upload All Default Milestones Once'}</span>
          </button>
          <button type="button" className="btn btn-primary" onClick={handleStartNew}>
            <Plus size={16} />
            <span>Add New Milestone</span>
          </button>
        </div>
      </div>

      {syncSuccessMessage && (
        <div className="form-alert success" style={{ marginBottom: '1.5rem' }}>
          <CheckCircle2 size={18} />
          <span>{syncSuccessMessage}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="project-category-tabs" style={{ marginBottom: '1.5rem' }}>
        {[{ id: 'all', label: 'All' }, ...timelineTypes].map((t) => {
          const count =
            t.id === 'all'
              ? (timeline || []).length
              : (timeline || []).filter((it) => (it.type || 'milestone') === t.id).length;

          return (
            <button
              key={t.id}
              type="button"
              className={`project-tab-btn ${filterType === t.id ? 'active' : ''}`}
              onClick={() => setFilterType(t.id)}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                {t.icon}
                {t.label}
              </span>
              <span className="tab-badge">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Modal / Form */}
      {editingItem && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <div className="admin-modal-header">
              <h3 className="modal-heading">
                {isNew ? 'Create New Journey Milestone' : `Edit Milestone: ${editingItem.title}`}
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
                <label>Milestone Title *</label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, title: e.target.value })
                  }
                  placeholder="e.g. Sabaragamuwa University of Sri Lanka"
                  required
                />
              </div>

              <div className="form-field">
                <label>Subtitle / Stream / Role</label>
                <input
                  type="text"
                  value={editingItem.subtitle || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, subtitle: e.target.value })
                  }
                  placeholder="e.g. Undergraduate Studies in Computing / Software Development"
                />
              </div>

              {/* Type Quick Selector */}
              <div className="form-field">
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Milestone Category Type *</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.35rem' }}>
                  {timelineTypes.map((t) => {
                    const active = (editingItem.type || 'milestone') === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        style={{
                          padding: '0.35rem 0.75rem',
                          borderRadius: '8px',
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
                        onClick={() => setEditingItem({ ...editingItem, type: t.id })}
                      >
                        {t.icon}
                        <span>{t.label}</span>
                        {active && <Check size={13} strokeWidth={3} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label>Year / Duration *</label>
                  <input
                    type="text"
                    value={editingItem.year || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, year: e.target.value })
                    }
                    placeholder="e.g. 2023 - Present or 2014 - 2022"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Badge / Status Label</label>
                  <input
                    type="text"
                    value={editingItem.badge || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, badge: e.target.value })
                    }
                    placeholder="e.g. University, School, Content, Current"
                  />
                  {/* Suggested Badge Chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.35rem' }}>
                    {suggestedBadges.map((b) => (
                      <button
                        key={b}
                        type="button"
                        style={{
                          padding: '0.2rem 0.45rem',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          background: editingItem.badge === b ? 'var(--accent-dev)' : 'var(--bg-surface-elevated)',
                          color: editingItem.badge === b ? '#000' : 'var(--text-secondary)',
                          border: '1px solid var(--border-medium)'
                        }}
                        onClick={() => setEditingItem({ ...editingItem, badge: b })}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label>Sort Order Index (Chronological)</label>
                  <input
                    type="number"
                    value={editingItem.order || 1}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, order: parseInt(e.target.value, 10) || 1 })
                    }
                    placeholder="1, 2, 3, 4..."
                    min="1"
                  />
                  <small className="field-hint">Lower numbers appear first chronologically (1: School, 2: University, etc.)</small>
                </div>
              </div>

              <div className="form-field">
                <label>Description & Learnings</label>
                <textarea
                  value={editingItem.description || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  placeholder="Summary of studies, technologies, responsibilities, or milestones achieved..."
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
                  <span>{isNew ? 'Create Milestone' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Timeline Milestones Table */}
      <div className="admin-card-section">
        <div className="admin-table-responsive">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Timeline Title & Subtitle</th>
                <th>Year</th>
                <th>Type</th>
                <th>Badge</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => {
                const itemType = item.type || 'milestone';
                return (
                  <tr key={item.id || item.title}>
                    <td>
                      <span className="table-cat-pill" style={{ fontWeight: 700 }}>
                        #{item.order || idx + 1}
                      </span>
                    </td>
                    <td>
                      <strong>{item.title}</strong>
                      {item.subtitle && <p className="table-subtext" style={{ color: 'var(--accent-cyan)' }}>{item.subtitle}</p>}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={13} />
                        {item.year}
                      </span>
                    </td>
                    <td>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          background: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-medium)',
                          padding: '0.25rem 0.55rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          textTransform: 'capitalize'
                        }}
                      >
                        {getIconForType(itemType)}
                        {itemType}
                      </span>
                    </td>
                    <td>
                      {item.badge ? (
                        <span className="table-status-pill">{item.badge}</span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>-</span>
                      )}
                    </td>
                    <td>
                      <p className="table-subtext" style={{ maxWidth: '350px', lineHeight: '1.4' }}>
                        {item.description}
                      </p>
                    </td>
                    <td className="cell-actions">
                      <button
                        type="button"
                        className="btn-action edit"
                        onClick={() => handleStartEdit(item)}
                        title="Edit Milestone"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        type="button"
                        className="btn-action delete"
                        onClick={() => handleDelete(item.id)}
                        title="Delete Milestone"
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
