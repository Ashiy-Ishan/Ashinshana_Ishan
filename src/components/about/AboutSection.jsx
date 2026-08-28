// src/components/about/AboutSection.jsx
import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  FileText, 
  MapPin, 
  Calendar, 
  ArrowUpRight, 
  Compass, 
  Award, 
  Terminal,
  Video
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { CurrentlyBuilding } from './CurrentlyBuilding';

export const AboutSection = () => {
  const { profile, timeline } = usePortfolio();
  const [filter, setFilter] = useState('all');

  const filteredTimeline = timeline.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'education':
        return <GraduationCap size={18} />;
      case 'project':
        return <Terminal size={18} />;
      case 'creator':
        return <Video size={18} />;
      case 'milestone':
      default:
        return <Award size={18} />;
    }
  };

  return (
    <section id="about" className="section-container about-section" aria-label="About Ashiy Ishan">
      <div className="section-heading-wrap">
        <span className="section-tag">PERSONAL & JOURNEY</span>
        <h2 className="section-title">
          ABOUT <span className="title-gradient">ASHIY ISHAN</span>
        </h2>
        <p className="section-subtext">
          Undergraduate software engineer, tech creator, and digital builder bridging technical systems with visual media.
        </p>
      </div>

      <div className="about-grid-layout">
        {/* Left Column: Bio Card & Details */}
        <div className="about-bio-card">
          <div className="bio-photo-header">
            <div className="bio-avatar-ring">
              <img 
                src={profile?.profileImage} 
                alt={profile?.name || 'Ashiy Ishan'} 
                className="bio-avatar-img"
              />
            </div>
            <div className="bio-header-meta">
              <h3 className="bio-name">{profile?.name}</h3>
              <p className="bio-legal-name">({profile?.fullName})</p>
              <p className="bio-status-badge">
                <span className="dot-pulse" />
                {profile?.status || 'Undergraduate & Creator'}
              </p>
            </div>
          </div>

          <div className="bio-body">
            <p className="bio-paragraph">
              {profile?.bio}
            </p>

            <div className="bio-facts-list">
              <div className="fact-item">
                <GraduationCap size={18} className="fact-icon" />
                <div>
                  <span className="fact-label">Education</span>
                  <p className="fact-val">{profile?.university || 'Sabaragamuwa University of Sri Lanka'}</p>
                  <p className="fact-sub">{profile?.degree || 'BSc (Hons) in Computing'}</p>
                </div>
              </div>

              <div className="fact-item">
                <MapPin size={18} className="fact-icon" />
                <div>
                  <span className="fact-label">Location</span>
                  <p className="fact-val">{profile?.location || 'Sri Lanka'}</p>
                </div>
              </div>

              <div className="fact-item">
                <Compass size={18} className="fact-icon" />
                <div>
                  <span className="fact-label">Core Philosophy</span>
                  <p className="fact-val">"{profile?.motto || 'I BUILD. I CREATE. I SHARE.'}"</p>
                </div>
              </div>
            </div>

            <div className="bio-actions">
              {profile?.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <FileText size={16} />
                  <span>View Resume / CV</span>
                  <ArrowUpRight size={16} />
                </a>
              )}
              <a href="#contact" className="btn btn-primary">
                <span>Let's Connect</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Milestone Timeline */}
        <div className="timeline-wrapper">
          <div className="timeline-header-bar">
            <h3 className="timeline-title">
              <Sparkles size={20} className="title-icon" />
              <span>Milestone & Journey Timeline</span>
            </h3>

            {/* Filter Pills */}
            <div className="timeline-filters">
              <button
                type="button"
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === 'education' ? 'active' : ''}`}
                onClick={() => setFilter('education')}
              >
                Education
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === 'project' ? 'active' : ''}`}
                onClick={() => setFilter('project')}
              >
                Projects
              </button>
              <button
                type="button"
                className={`filter-btn ${filter === 'creator' ? 'active' : ''}`}
                onClick={() => setFilter('creator')}
              >
                Creator
              </button>
            </div>
          </div>

          <div className="timeline-items">
            {filteredTimeline.map((item, idx) => (
              <div key={item.id || idx} className="timeline-node">
                <div className="node-marker">
                  <div className={`marker-icon-box ${item.type}`}>
                    {getTimelineIcon(item.type)}
                  </div>
                  <div className="node-line" />
                </div>
                <div className="node-content">
                  <div className="node-top">
                    <span className="node-year">
                      <Calendar size={13} />
                      <span>{item.year}</span>
                    </span>
                    {item.badge && (
                      <span className={`node-badge badge-${item.type}`}>{item.badge}</span>
                    )}
                  </div>
                  <h4 className="node-title">{item.title}</h4>
                  {item.subtitle && <p className="node-subtitle">{item.subtitle}</p>}
                  <p className="node-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Activity Radar */}
      <CurrentlyBuilding />
    </section>
  );
};
