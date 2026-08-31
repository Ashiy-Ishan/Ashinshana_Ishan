import React from 'react';
import { Hammer, BookOpen, Video, Compass } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const CurrentlyBuilding = () => {
  const { currentlyBuilding } = usePortfolio();

  if (!currentlyBuilding) return null;

  const items = [
    {
      key: 'building',
      label: 'BUILDING',
      icon: <Hammer size={20} className="status-icon build" />,
      badge: currentlyBuilding.building?.badge || 'ONGOING',
      badgeClass: 'badge-build',
      role: currentlyBuilding.building?.role,
      tech: currentlyBuilding.building?.tech,
      title: currentlyBuilding.building?.title || 'Lumina Instant Messaging (Individual)',
      desc: currentlyBuilding.building?.description || 'Built a fast real-time chat app designed to handle thousands of users at once.'
    },
    {
      key: 'learning',
      label: 'AUTOMATING & BUILDING',
      icon: <BookOpen size={20} className="status-icon learn" />,
      badge: currentlyBuilding.learning?.badge || 'ONGOING',
      badgeClass: 'badge-learn',
      role: currentlyBuilding.learning?.role,
      tech: currentlyBuilding.learning?.tech,
      title: currentlyBuilding.learning?.title || 'ShortM (Individual)',
      desc: currentlyBuilding.learning?.description || 'A Windows and Linux application automating YouTube Shorts creation and direct publishing.'
    },
    {
      key: 'creating',
      label: 'CREATING & EXPLAINING',
      icon: <Video size={20} className="status-icon create" />,
      badge: currentlyBuilding.creating?.badge || 'Content',
      badgeClass: 'badge-create',
      role: currentlyBuilding.creating?.role,
      tech: currentlyBuilding.creating?.tech,
      title: currentlyBuilding.creating?.title || 'Technical Flows & Architectural Walkthroughs',
      desc: currentlyBuilding.creating?.description || 'Producing tech breakdowns focused on technical flows, systems architecture explanations, and interactive live demos.'
    },
    {
      key: 'exploring',
      label: 'EXPLORING',
      icon: <Compass size={20} className="status-icon explore" />,
      badge: currentlyBuilding.exploring?.badge || 'R&D',
      badgeClass: 'badge-explore',
      role: currentlyBuilding.exploring?.role,
      tech: currentlyBuilding.exploring?.tech,
      title: currentlyBuilding.exploring?.title || 'Generative AI & IoT Edge',
      desc: currentlyBuilding.exploring?.description || 'Testing multimodal AI models and hardware micro-controllers for smart automation and edge telemetry.'
    }
  ];

  return (
    <section id="currently" className="currently-building-container">
      <div className="currently-header">
        <div className="live-pulse-wrapper">
          <span className="live-pulse-dot" />
          <span className="live-pulse-text">LIVE ACTIVITY RADAR</span>
        </div>
        <h3 className="currently-main-title">
          CURRENTLY <span className="title-gradient">IN MOTION</span>
        </h3>
        <p className="currently-subtitle">
          Real-time snapshot of my active projects, systems engineering, content production, and tech explorations.
        </p>
      </div>

      <div className="currently-grid">
        {items.map((item) => (
          <div key={item.key} className="currently-card">
            <div className="card-top-bar">
              <div className="card-icon-box">{item.icon}</div>
              <span className={`status-pill ${item.badgeClass}`}>{item.badge}</span>
            </div>
            <div className="card-content">
              <span className="card-action-type">{item.label}</span>
              <h4 className="card-heading">{item.title}</h4>
              {item.role && (
                <p className="card-role-meta" style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 600, marginTop: '0.2rem', marginBottom: '0.35rem' }}>
                  Role: {item.role}
                </p>
              )}
              <p className="card-description">{item.desc}</p>
              {item.tech && (
                <div className="card-tech-wrap" style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {item.tech.split(',').map((t, idx) => (
                    <span key={idx} style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
                      {t.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="card-accent-line" />
          </div>
        ))}
      </div>
    </section>
  );
};
