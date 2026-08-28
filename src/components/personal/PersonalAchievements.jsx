// src/components/personal/PersonalAchievements.jsx
import React from 'react';
import { ExternalLink, Calendar, GraduationCap, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const PersonalAchievements = () => {
  const { achievements } = usePortfolio();

  const items = achievements || [
    {
      id: 'ach-1',
      title: 'BSc (Hons) Computing & Information Systems Batch Certificate',
      issuer: 'Sabaragamuwa University of Sri Lanka',
      date: '2023 - 2026',
      category: 'Academic & University',
      description: 'Official academic enrollment and batch certification in Computing and Information Systems, specializing in software engineering, database management systems, and system design.',
      badge: 'Batch Certificate',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      credentialUrl: 'https://www.linkedin.com/in/ashinshana-ishan/'
    },
    {
      id: 'ach-2',
      title: 'Full-Stack Web Development & Software Architecture Certification',
      issuer: 'Online Professional Academy & Dev Community',
      date: '2024',
      category: 'Professional Software Engineering',
      description: 'Certified in modern React 19 frontend engineering, RESTful backend microservices, SQL/NoSQL databases, and cloud deployment pipelines.',
      badge: 'Certified Developer',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      credentialUrl: 'https://github.com/Ashiy-Ishan'
    }
  ];

  return (
    <section id="achievements" className="section-container personal-achievements-section">
      <div className="section-heading-wrap">
        <span className="section-tag">CREDENTIALS & MILESTONES</span>
        <h2 className="section-title">
          ACHIEVEMENTS & <span className="title-gradient">BATCH CERTIFICATES</span>
        </h2>
        <p className="section-subtext">
          Verified academic certificates, university batch credentials, professional developer certifications, and creator awards.
        </p>
      </div>

      <div className="achievements-grid">
        {items.map((item) => (
          <div key={item.id} className="achievement-card">
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
                <span className="achievement-category">{item.category}</span>
                <span className="achievement-date">
                  <Calendar size={12} /> {item.date}
                </span>
              </div>

              <h3 className="achievement-title">{item.title}</h3>
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
        ))}
      </div>
    </section>
  );
};
