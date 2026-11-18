import React, { useState } from 'react';
import {
  ArrowUpRight, Award, Code2, Database, Image, Layers, Loader2, Mail, Trash2, Video, Workflow
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { IMAGEKIT_URL_ENDPOINT } from '../../config/imagekit';

export const AdminOverview = ({ onNavigateTab }) => {
  const {
    profile, skills, projects, publishedProjects, youtubeVideos, achievements, contactMessages,
    gallery, syncAllToFirestore
  } = usePortfolio();
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState(null);

  const handleSyncFirestore = async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      const result = await syncAllToFirestore();
      setSyncResult({ message: result.message });
    } catch {
      setSyncResult({ error: true, message: 'Sync failed. Please check your connection and try again.' });
    } finally {
      setSyncing(false);
    }
  };

  const stats = [
    { id: 'messages', label: 'Inbox', count: contactMessages.length, icon: Mail },
    { id: 'projects', label: 'Projects', count: projects.length, icon: Workflow },
    { id: 'published', label: 'Published releases', count: publishedProjects.length, icon: Code2 },
    { id: 'skills', label: 'Skills', count: skills.length, icon: Layers },
    { id: 'achievements', label: 'Achievements', count: achievements?.length || 0, icon: Award },
    { id: 'gallery', label: 'Gallery images', count: gallery.length, icon: Image },
    { id: 'creator', label: 'YouTube videos', count: youtubeVideos.length, icon: Video }
  ];

  return (
    <div className="admin-tab-pane">
      <header className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">Overview</h2>
          <p className="admin-pane-desc">Manage portfolio content and contact messages{profile?.name ? ` for ${profile.name}` : ''}.</p>
        </div>
      </header>

      <section aria-labelledby="admin-collection-heading">
        <h3 className="admin-section-heading" id="admin-collection-heading">Content & activity</h3>
        <div className="admin-metrics-row">
          {stats.map(({ id, label, count, icon: Icon }) => (
            <button type="button" key={id} className="admin-stat-card" onClick={() => onNavigateTab(id)}>
              <Icon size={20} className="admin-stat-icon" aria-hidden="true" />
              <span className="stat-card-val">{count}</span>
              <span className="stat-card-lbl">{label}</span>
              <ArrowUpRight size={16} className="admin-stat-arrow" aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      <details className="admin-card-section admin-integrations">
        <summary>Data & integrations</summary>
        <div className="admin-integration-content">
          <p>ImageKit endpoint <code>{IMAGEKIT_URL_ENDPOINT}</code></p>
          <p>Sync the bundled defaults to Firestore. This can overwrite existing fields that share the same record IDs.</p>
          <button type="button" className="btn btn-outline" onClick={handleSyncFirestore} disabled={syncing}>
            {syncing ? <Loader2 size={16} className="spinner-spin" aria-hidden="true" /> : <Database size={16} aria-hidden="true" />}
            <span>{syncing ? 'Syncing…' : 'Sync default content'}</span>
          </button>
          {syncResult && <p role={syncResult.error ? 'alert' : 'status'}>{syncResult.message}</p>}
        </div>
      </details>
    </div>
  );
};

export const AdminInbox = () => {
  const { contactMessages, inboxError, deleteContactMessage } = usePortfolio();
  const [deleteError, setDeleteError] = useState(false);

  const handleDelete = async (id) => {
    setDeleteError(false);
    try {
      await deleteContactMessage(id);
    } catch {
      setDeleteError(true);
    }
  };

  return (
    <div className="admin-tab-pane">
      <header className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">Inbox</h2>
          <p className="admin-pane-desc">Messages from the public contact form.</p>
        </div>
      </header>

      {deleteError && <p role="alert">Could not delete the message. Try again.</p>}
      {inboxError ? (
        <p role="alert">Could not load contact messages.</p>
      ) : contactMessages.length === 0 ? (
        <p className="admin-card-section">No contact messages yet.</p>
      ) : (
        <ul className="admin-message-list">
          {contactMessages.map((message) => {
            const subject = (typeof message.subject === 'string' ? message.subject.trim() : '') || 'General inquiry';
            const email = typeof message.email === 'string' ? message.email : '';
            const replyTo = /^[^\s@,;?&#]+@[^\s@,;?&#]+$/.test(email)
              ? `mailto:${encodeURIComponent(email).replace('%40', '@')}?subject=${encodeURIComponent(`Re: ${subject}`)}`
              : '';
            return (
              <li className="admin-card-section admin-message" key={message.id}>
                <div className="admin-message-heading">
                  <div>
                    <h3>{subject}</h3>
                    <p>{typeof message.name === 'string' ? message.name : 'Unknown sender'}{email && ` · ${email}`}</p>
                  </div>
                  {typeof message.createdAt === 'string' && <span>{new Date(message.createdAt).toLocaleDateString()}</span>}
                </div>
                {typeof message.message === 'string' && <p className="admin-message-body">{message.message}</p>}
                <div className="admin-message-actions">
                  {replyTo && <a className="btn btn-outline" href={replyTo}><Mail size={16} aria-hidden="true" /> Reply</a>}
                  <button type="button" className="btn btn-outline admin-message-delete" onClick={() => handleDelete(message.id)}>
                    <Trash2 size={16} aria-hidden="true" /> Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
