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

  const sortedTimeline = [...(timeline || [])].sort((a, b) => {
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

  const filteredTimeline = sortedTimeline.filter((item) => {
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
    <section id="about" className="section-container about-section" aria-label="About Ashinshana Ishan">
      {/* Section Header */}
      <div className="section-heading-wrap">
        <div className="section-pill-tag tag-personal">
          <Sparkles size={14} />
          <span>PERSONAL & JOURNEY</span>
        </div>
        <h2 className="section-title">
          ABOUT <span className="title-gradient personal-gradient">ASHINSHANA ISHAN</span>
        </h2>
        <p className="section-subtext">
          Undergraduate software engineer, tech creator, and digital builder bridging technical systems with visual media.
        </p>
      </div>

      {/* Personal Profile Header Card (Positioned & Symmetrical to Channel Card) */}
      <div className="personal-profile-header">
        <div className="personal-profile-left">
          <div className="personal-avatar-wrapper">
            <img 
              src={profile?.personalImage || profile?.heroImagePersonal || profile?.profileImage} 
              alt={profile?.fullName || profile?.name || 'Ashinshana Ishan'} 
              className="personal-avatar-img"
            />
            <div className="personal-verified-badge" title="Undergraduate & Tech Creator">
              <GraduationCap size={15} />
            </div>
          </div>

          <div className="personal-profile-text">
            <div className="personal-title-row">
              <h3 className="personal-channel-name">{profile?.fullName || profile?.name || 'Ashinshana Ishan'}</h3>
              <span className="personal-handle-badge">Undergraduate '26</span>
            </div>
            <p className="personal-bio-text">
              {profile?.bio || 'Undergraduate at Sabaragamuwa University of Sri Lanka passionate about modern web development, backend engineering, UI/UX design, and tech content creation. I enjoy turning complex ideas into elegant, user-focused digital experiences.'}
            </p>
          </div>
        </div>

        {/* High-Impact Action Button */}
        <div className="personal-cta-wrap">
          {profile?.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-personal-resume btn-personal-glow"
            >
              <div className="personal-icon-box">
                <FileText size={22} className="personal-icon-svg" />
              </div>
              <div className="personal-btn-text">
                <span className="personal-btn-primary">VIEW RESUME / CV</span>
                <span className="personal-btn-sub">OFFICIAL CREDENTIALS</span>
              </div>
              <ArrowUpRight size={16} className="personal-btn-arrow" />
            </a>
          ) : (
            <a href="#contact" className="btn btn-personal-resume btn-personal-glow">
              <div className="personal-icon-box">
                <Compass size={22} className="personal-icon-svg" />
              </div>
              <div className="personal-btn-text">
                <span className="personal-btn-primary">GET IN TOUCH</span>
                <span className="personal-btn-sub">CONNECT DIRECTLY</span>
              </div>
              <ArrowUpRight size={16} className="personal-btn-arrow" />
            </a>
          )}
        </div>
      </div>

      {/* Personal Insights & Highlights Grid (Positioned matching Channel stats) */}
      <div className="personal-insights-grid">
        <div className="personal-stat-card">
          <div className="stat-icon-wrapper degree">
            <GraduationCap size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-number-row">
              <span className="stat-count-number">BSc</span>
              <span className="stat-count-suffix">(Hons)</span>
            </div>
            <span className="stat-label-text">Computing & IS '26</span>
          </div>
        </div>

        <div className="personal-stat-card">
          <div className="stat-icon-wrapper location">
            <MapPin size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-number-row">
              <span className="stat-count-number">SUSL</span>
            </div>
            <span className="stat-label-text">Sabaragamuwa Univ</span>
          </div>
        </div>

        <div className="personal-stat-card">
          <div className="stat-icon-wrapper motto">
            <Compass size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-number-row">
              <span className="stat-count-number">Builder</span>
            </div>
            <span className="stat-label-text">"I BUILD. CREATE. SHARE."</span>
          </div>
        </div>
      </div>

      <div className="about-grid-layout">
        {/* Left Column: Bio Card & Details */}
        <div className="about-bio-card">
          <h3 className="about-card-title" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Academic Background & Identity
          </h3>

          <div className="bio-body">
            <div className="bio-facts-list">
              <div className="fact-item">
                <GraduationCap size={18} className="fact-icon" />
                <div>
                  <span className="fact-label">University</span>
                  <p className="fact-val">{profile?.university || 'Sabaragamuwa University of Sri Lanka'}</p>
                  <p className="fact-sub">{profile?.degree || 'BSc (Hons) in Computing'}</p>
                </div>
              </div>

              <div className="fact-item">
                <Award size={18} className="fact-icon" />
                <div>
                  <span className="fact-label">Secondary Education</span>
                  <p className="fact-val">{profile?.school || 'Bandaranayake College, Gampaha'}</p>
                  <p className="fact-sub">{profile?.alStream || 'G.C.E. (A/L) Physical Science Stream (2014 - 2022)'}</p>
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
              <a href="#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
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
