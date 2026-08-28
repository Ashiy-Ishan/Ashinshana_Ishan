// src/components/admin/AdminOverview.jsx
import React from 'react';
import { 
  Code2, 
  Workflow, 
  Video, 
  Mail, 
  Image, 
  Trash2, 
  CheckCircle,
  Layers
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminOverview = ({ onNavigateTab }) => {
  const { 
    profile, 
    skills, 
    projects, 
    publishedProjects, 
    youtubeVideos, 
    contactMessages, 
    gallery,
    deleteContactMessage 
  } = usePortfolio();

  const stats = [
    {
      label: 'Total Skills',
      val: skills.length,
      icon: <Layers size={22} className="stat-icon-dev" />,
      tab: 'skills'
    },
    {
      label: 'Showcase Projects',
      val: projects.length,
      icon: <Workflow size={22} className="stat-icon-proj" />,
      tab: 'projects'
    },
    {
      label: 'Published Releases',
      val: publishedProjects.length,
      icon: <Code2 size={22} className="stat-icon-pub" />,
      tab: 'published'
    },
    {
      label: 'YouTube Videos',
      val: youtubeVideos.length,
      icon: <Video size={22} className="stat-icon-creator" />,
      tab: 'creator'
    },
    {
      label: 'Gallery Assets',
      val: gallery.length,
      icon: <Image size={22} className="stat-icon-gal" />,
      tab: 'gallery'
    },
    {
      label: 'Contact Inquiries',
      val: contactMessages.length,
      icon: <Mail size={22} className="stat-icon-msg" />,
      tab: 'messages'
    }
  ];

  return (
    <div className="admin-tab-pane">
      <div className="admin-pane-header">
        <div>
          <h2 className="admin-pane-title">CMS Dashboard Overview</h2>
          <p className="admin-pane-desc">
            Welcome, <strong>{profile?.name}</strong>. Here is the operational state of your personal brand platform.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="admin-metrics-row">
        {stats.map((item) => (
          <div 
            key={item.label} 
            className="admin-stat-card clickable"
            onClick={() => onNavigateTab(item.tab)}
          >
            <div className="stat-card-icon">{item.icon}</div>
            <div className="stat-card-body">
              <span className="stat-card-val">{item.val}</span>
              <span className="stat-card-lbl">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Inquiries Inbox */}
      <div className="admin-card-section" id="messages-inbox">
        <div className="admin-card-header-row">
          <div className="header-icon-title">
            <Mail size={20} />
            <h3 className="section-title-text">Contact Messages Inbox ({contactMessages.length})</h3>
          </div>
        </div>

        {contactMessages.length === 0 ? (
          <div className="empty-table-notice">
            <CheckCircle size={32} className="check-empty-icon" />
            <p>No new contact messages in your inbox. All clear!</p>
          </div>
        ) : (
          <div className="admin-table-responsive">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Sender</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contactMessages.map((msg) => (
                  <tr key={msg.id}>
                    <td className="cell-nowrap">
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td><strong>{msg.name}</strong></td>
                    <td>
                      <a href={`mailto:${msg.email}`} className="table-email-link">
                        {msg.email}
                      </a>
                    </td>
                    <td>{msg.subject || 'General Inquiry'}</td>
                    <td className="cell-message-preview">{msg.message}</td>
                    <td className="cell-actions">
                      <a 
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                        className="btn-action reply"
                        title="Reply via Email"
                      >
                        <Mail size={14} />
                      </a>
                      <button
                        type="button"
                        className="btn-action delete"
                        onClick={() => deleteContactMessage(msg.id)}
                        title="Delete Message"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
