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
  Video,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { CurrentlyBuilding } from './CurrentlyBuilding';

export const AboutSection = () => {
  const { profile, timeline } = usePortfolio();
  const [filter, setFilter] = useState('all');
  const [expandedMilestones, setExpandedMilestones] = useState({});

  const toggleMilestone = (id) => {
    setExpandedMilestones((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const parseStartYear = (it) => {
    const str = String(it.year || it.date || '');
    const years = str.match(/\b(19\d\d|20\d\d)\b/g);
    if (years && years.length > 0) {
      return parseInt(years[0], 10);
    }
    return 9999;
  };

  const sortedTimeline = [...(timeline || [])]
    .filter((item) => item.type !== 'project')
    .sort((a, b) => parseStartYear(a) - parseStartYear(b));

  const filteredTimeline = sortedTimeline.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'education':
        return <GraduationCap size={18} />;
      case 'creator':
        return <Video size={18} />;
      case 'milestone':
      default:
        return <Award size={18} />;
    }
  };

  const cleanFullName = (profile?.fullName || profile?.name || 'Ashinshana Ishan')
    .replace(/Ashiy\s*Ishan/gi, 'Ashinshana Ishan')
    .replace(/AshiyIshan/gi, 'Ashinshana Ishan')
    .replace(/Ashiy/gi, 'Ashinshana');

  const cleanBio = (profile?.bio || 'Undergraduate at Sabaragamuwa University of Sri Lanka passionate about modern web development, backend engineering, UI/UX design, and tech content creation. I enjoy turning complex ideas into elegant, user-focused digital experiences.')
    .replace(/Ashiy\s*Ishan/gi, 'Ashinshana Ishan')
    .replace(/AshiyIshan/gi, 'Ashinshana Ishan');

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
          Undergraduate software engineer and tech creator bridging technical software architecture with visual media.
        </p>
      </div>

      {/* Personal Profile Header Card */}
      <div className="personal-profile-header">
        <div className="personal-profile-left">
          <div className="personal-avatar-wrapper">
            <img 
              src={profile?.personalImage || profile?.heroImagePersonal || profile?.profileImage} 
              alt={cleanFullName} 
              className="personal-avatar-img"
            />
            <div className="personal-verified-badge" title="Undergraduate & Tech Creator">
              <GraduationCap size={15} />
            </div>
          </div>

          <div className="personal-profile-text">
            <div className="personal-title-row">
              <h3 className="personal-channel-name">{cleanFullName}</h3>
              <span className="personal-handle-badge">Undergraduate '26</span>
            </div>
            <p className="personal-bio-text">
              {cleanBio}
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

      {/* Personal Insights & Highlights Grid (Without SUSL card & Without Builder) */}
      <div className="personal-insights-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
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
          <div className="stat-icon-wrapper motto">
            <Sparkles size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-number-row">
              <span className="stat-count-number">Creator</span>
            </div>
            <span className="stat-label-text">Tech & Tutorials</span>
          </div>
        </div>

        <div className="personal-stat-card">
          <div className="stat-icon-wrapper location">
            <MapPin size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-number-row">
              <span className="stat-count-number">Sri Lanka</span>
            </div>
            <span className="stat-label-text">South Asia</span>
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
                  <p className="fact-val">"{profile?.motto || 'I DEVELOP. I CREATE. I SHARE.'}"</p>
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

        {/* Right Column: Visual Milestone Timeline with Click-to-Expand Details */}
        <div className="timeline-wrapper">
          <div className="timeline-header-bar">
            <h3 className="timeline-title">
              <Sparkles size={20} className="title-icon" />
              <span>Milestone & Journey Timeline</span>
            </h3>

            {/* Filter Pills without projects */}
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
                className={`filter-btn ${filter === 'milestone' ? 'active' : ''}`}
                onClick={() => setFilter('milestone')}
              >
                Milestones
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
            {filteredTimeline.map((item, idx) => {
              const isExpanded = Boolean(expandedMilestones[item.id || idx]);

              return (
                <div 
                  key={item.id || idx} 
                  className={`timeline-node milestone-interactive-node ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => toggleMilestone(item.id || idx)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="node-marker">
                    <div className={`marker-icon-box ${item.type}`}>
                      {getTimelineIcon(item.type)}
                    </div>
                    <div className="node-line" />
                  </div>

                  <div className="node-content milestone-clickable-card">
                    <div className="node-top">
                      <span className="node-year">
                        <Calendar size={13} />
                        <span>{item.year}</span>
                      </span>
                      {item.badge && (
                        <span className={`node-badge badge-${item.type}`}>{item.badge}</span>
                      )}
                      <div className="milestone-toggle-hint">
                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </div>
                    </div>

                    {/* Main Event Name */}
                    <div className="milestone-title-row">
                      <h4 className="node-title">{item.title}</h4>
                    </div>

                    {/* Expandable Details Area (Shown When Clicked) */}
                    {isExpanded && (
                      <div className="milestone-expanded-details animate-fade-in" style={{ marginTop: '0.65rem', paddingTop: '0.65rem', borderTop: '1px dashed var(--border-subtle)' }}>
                        {item.subtitle && <p className="node-subtitle" style={{ fontWeight: 600, color: 'var(--accent-cyan)', marginBottom: '0.35rem' }}>{item.subtitle}</p>}
                        {item.description && <p className="node-desc" style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{item.description}</p>}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Activity Radar */}
      <CurrentlyBuilding />
    </section>
  );
};
