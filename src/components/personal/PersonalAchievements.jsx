// src/components/personal/PersonalAchievements.jsx
import React, { useState } from 'react';
import { ExternalLink, Calendar, GraduationCap, ShieldCheck, Award, FileCheck2, BookOpen } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { initialData } from '../../data/initialData';

export const PersonalAchievements = () => {
  const { achievements } = usePortfolio();
  const [selectedType, setSelectedType] = useState('All');

  const items = (achievements && achievements.length > 0) ? achievements : initialData.achievements;

  const certificateTypes = [
    'All',
    'Achievement',
    'Participation Certificate',
    'Learning Certificate'
  ];

  const getCertType = (item) => {
    if (item.type) return item.type;
    const cat = (item.category || '').toLowerCase();
    const title = (item.title || '').toLowerCase();
    const badge = (item.badge || '').toLowerCase();

    if (badge.includes('runner') || badge.includes('winner') || badge.includes('finalist') || title.includes('appreciation')) {
      return 'Achievement';
    }
    if (title.includes('participation') || badge.includes('participant') || cat.includes('hackathon') || title.includes('hackathon') || badge.includes('finish')) {
      return 'Participation Certificate';
    }
    return 'Learning Certificate';
  };

  const filteredItems = items.filter((item) => {
    if (selectedType === 'All') return true;
    return getCertType(item) === selectedType;
  });

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

  return (
    <section id="achievements" className="section-container personal-achievements-section">
      <div className="section-heading-wrap">
        <span className="section-tag">CREDENTIALS & MILESTONES</span>
        <h2 className="section-title">
          ACHIEVEMENTS & <span className="title-gradient">BATCH CERTIFICATES</span>
        </h2>
        <p className="section-subtext">
          Verified academic certificates, university batch credentials, professional developer certifications, and competitive honors.
        </p>
      </div>

      {/* Categorized Filter Tabs */}
      <div className="project-category-tabs" role="tablist" style={{ justifyContent: 'center', marginBottom: '2.5rem' }}>
        {certificateTypes.map((type) => {
          const count =
            type === 'All'
              ? items.length
              : items.filter((it) => getCertType(it) === type).length;

          if (type !== 'All' && count === 0) return null;

          return (
            <button
              key={type}
              type="button"
              role="tab"
              aria-selected={selectedType === type}
              className={`project-tab-btn ${selectedType === type ? 'active' : ''}`}
              onClick={() => setSelectedType(type)}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                {type !== 'All' && getTypeIcon(type)}
                {type}
              </span>
              <span className="tab-badge">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="achievements-grid">
        {filteredItems.map((item) => {
          const itemType = getCertType(item);

          return (
            <div key={item.id || item.title} className="achievement-card">
              {/* Card Cover Image / Certificate Banner */}
              <div className="achievement-media-box">
                <img 
                  src={item.imageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'} 
                  alt={item.title} 
                  className="achievement-cover-img" 
                  loading="lazy"
                />
                <div className="achievement-badge-pill">
                  <ShieldCheck size={12} />
                  <span>{item.badge || 'Verified'}</span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="achievement-card-body">
                <div className="achievement-meta-bar">
                  <span 
                    className="achievement-category"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: itemType === 'Achievement' ? 'rgba(255, 184, 0, 0.15)' : itemType === 'Participation Certificate' ? 'rgba(0, 210, 255, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      color: itemType === 'Achievement' ? '#ffb800' : itemType === 'Participation Certificate' ? '#00d2ff' : '#10b981',
                      border: itemType === 'Achievement' ? '1px solid rgba(255, 184, 0, 0.3)' : itemType === 'Participation Certificate' ? '1px solid rgba(0, 210, 255, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    {getTypeIcon(itemType)}
                    {itemType}
                  </span>
                  <span className="achievement-date">
                    <Calendar size={12} /> {item.date}
                  </span>
                </div>

                <h3 className="achievement-title">{item.title}</h3>
                
                {item.category && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                    Domain: <strong style={{ color: 'var(--text-primary)' }}>{item.category}</strong>
                  </p>
                )}

                <p className="achievement-issuer">
                  <GraduationCap size={14} className="issuer-icon" />
                  <span>{item.issuer}</span>
                </p>

                <p className="achievement-desc">{item.description}</p>

                {item.credentialUrl && (
                  <div className="achievement-card-footer">
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-achievement-verify"
                    >
                      <span>View Certificate / Credential</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
