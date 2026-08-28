// src/components/developer/PublishedProjects.jsx
import React from 'react';
import { Package, ExternalLink, Tag, Calendar } from 'lucide-react';
import { Github } from '../common/Icons';
import { usePortfolio } from '../../context/PortfolioContext';

export const PublishedProjects = () => {
  const { publishedProjects } = usePortfolio();

  if (!publishedProjects || publishedProjects.length === 0) return null;

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'released':
        return { label: 'Released', className: 'badge-pub-released' };
      case 'open source':
        return { label: 'Open Source', className: 'badge-pub-opensource' };
      case 'live':
        return { label: 'Live', className: 'badge-pub-live' };
      case 'in development':
        return { label: 'In Development', className: 'badge-pub-dev' };
      case 'archived':
        return { label: 'Archived', className: 'badge-pub-archived' };
      default:
        return { label: status || 'Active', className: 'badge-pub-general' };
    }
  };

  return (
    <div className="published-projects-wrapper">
      <div className="published-header-bar">
        <div className="published-header-left">
          <Package size={22} className="pub-icon" />
          <div>
            <h3 className="pub-title">PUBLISHED SOFTWARE & OPEN SOURCE</h3>
            <p className="pub-desc">
              Officially published software packages, repositories, release versions, and open source architectures.
            </p>
          </div>
        </div>
      </div>

      <div className="published-cards-list">
        {publishedProjects.map((pub) => {
          const badge = getStatusBadge(pub.status);

          return (
            <div key={pub.id || pub.name} className="published-item-card">
              <div className="pub-item-top">
                <div className="pub-item-identity">
                  <span className="pub-name">{pub.name}</span>
                  {pub.version && (
                    <span className="pub-version-pill">
                      <Tag size={11} /> {pub.version}
                    </span>
                  )}
                </div>
                <span className={`pub-status-badge ${badge.className}`}>
                  {badge.label}
                </span>
              </div>

              <p className="pub-item-desc">{pub.description}</p>

              <div className="pub-item-meta">
                <div className="pub-meta-tech">
                  <span className="meta-label">Engine / Tech:</span>
                  <span className="meta-val">{pub.technology}</span>
                </div>

                {pub.releaseDate && (
                  <div className="pub-meta-date">
                    <Calendar size={13} />
                    <span>{pub.releaseDate}</span>
                  </div>
                )}
              </div>

              <div className="pub-item-links">
                {pub.github && (
                  <a
                    href={pub.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pub-link github"
                  >
                    <Github size={15} />
                    <span>View Repository</span>
                  </a>
                )}
                {pub.liveDemo && (
                  <a
                    href={pub.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pub-link demo"
                  >
                    <ExternalLink size={15} />
                    <span>Live Showcase</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
