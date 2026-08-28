// src/components/about/CurrentlyBuilding.jsx
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
      badge: currentlyBuilding.building?.badge || 'In Progress',
      badgeClass: 'badge-build',
      title: currentlyBuilding.building?.title || 'Next-Gen Web Platform',
      desc: currentlyBuilding.building?.description || 'Crafting interactive software interfaces and modular systems.'
    },
    {
      key: 'learning',
      label: 'LEARNING',
      icon: <BookOpen size={20} className="status-icon learn" />,
      badge: currentlyBuilding.learning?.badge || 'Continuous',
      badgeClass: 'badge-learn',
      title: currentlyBuilding.learning?.title || 'Distributed Cloud & Shaders',
      desc: currentlyBuilding.learning?.description || 'Deepening knowledge in cloud architecture and WebGL performance.'
    },
    {
      key: 'creating',
      label: 'CREATING',
      icon: <Video size={20} className="status-icon create" />,
      badge: currentlyBuilding.creating?.badge || 'Content',
      badgeClass: 'badge-create',
      title: currentlyBuilding.creating?.title || 'Full-Stack YouTube Series',
      desc: currentlyBuilding.creating?.description || 'Producing hands-on coding walkthroughs and UI design guides.'
    },
    {
      key: 'exploring',
      label: 'EXPLORING',
      icon: <Compass size={20} className="status-icon explore" />,
      badge: currentlyBuilding.exploring?.badge || 'R&D',
      badgeClass: 'badge-explore',
      title: currentlyBuilding.exploring?.title || 'Generative AI & IoT Edge',
      desc: currentlyBuilding.exploring?.description || 'Experimenting with AI workflows and embedded microcontrollers.'
    }
  ];

  return (
    <div className="currently-building-container">
      <div className="currently-header">
        <div className="live-pulse-wrapper">
          <span className="live-pulse-dot" />
          <span className="live-pulse-text">LIVE ACTIVITY RADAR</span>
        </div>
        <h3 className="currently-main-title">
          CURRENTLY <span className="title-gradient">IN MOTION</span>
        </h3>
        <p className="currently-subtitle">
          Real-time snapshot of my active projects, studies, content production, and tech explorations.
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
              <p className="card-description">{item.desc}</p>
            </div>
            <div className="card-accent-line" />
          </div>
        ))}
      </div>
    </div>
  );
};
