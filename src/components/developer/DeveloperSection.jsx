// src/components/developer/DeveloperSection.jsx
import React from 'react';
import { 
  Terminal, 
  Cpu, 
  Workflow, 
  Layers, 
  ExternalLink,
  GitBranch
} from 'lucide-react';
import { Github } from '../common/Icons';
import { usePortfolio } from '../../context/PortfolioContext';
import { SkillsGrid } from './SkillsGrid';
import { ProjectsShowcase } from './ProjectsShowcase';
import { PublishedProjects } from './PublishedProjects';

export const DeveloperSection = () => {
  const { profile } = usePortfolio();

  const cleanDevName = (profile?.name || 'Ashinshana')
    .replace(/Ashiy\s*Ishan/gi, 'Ashinshana')
    .replace(/AshiyIshan/gi, 'Ashinshana')
    .replace(/Ashiy/gi, 'Ashinshana');

  return (
    <section id="developer" className="section-container developer-section" aria-label="Developer Experience">
      {/* Section Header */}
      <div className="section-heading-wrap">
        <div className="section-pill-tag tag-dev">
          <Terminal size={14} />
          <span>ENGINEERING & DEVELOPMENT</span>
        </div>
        <h2 className="section-title">
          SOFTWARE <span className="title-gradient dev-gradient">DEVELOPER EXPERIENCE</span>
        </h2>
        <p className="section-subtext">
          Turning algorithmic logic and architectural design into robust, performant, human-centric software.
        </p>
      </div>

      {/* Developer Profile Header Card (Positioned & Symmetrical to Channel Card) */}
      <div className="dev-profile-header">
        <div className="dev-profile-left">
          <div className="dev-avatar-wrapper">
            <img
              src={profile?.developerImage || profile?.heroImageDeveloper || profile?.profileImage}
              alt={`${cleanDevName} Software Engineer`}
              className="dev-avatar-img"
            />
            <div className="dev-verified-badge" title="Full-Stack Developer">
              <Terminal size={15} />
            </div>
          </div>

          <div className="dev-profile-text">
            <div className="dev-title-row">
              <h3 className="dev-channel-name">{cleanDevName}</h3>
              <span className="dev-handle-badge">@ashiy_ish / Dev</span>
            </div>
            <p className="dev-bio-text">
              Specializing in full-stack web applications, relational and document databases, object-oriented system modeling in Java, and reactive client interfaces in React. Every line of code is structured for readability, testability, and real-world utility.
            </p>
          </div>
        </div>

        {/* High-Impact GitHub / Code Action Button */}
        <div className="dev-cta-wrap">
          <a
            href={profile?.github || 'https://github.com/Ashiy-Ishan'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-github btn-dev-glow"
          >
            <div className="dev-icon-box">
              <Github size={22} className="dev-icon-svg" />
            </div>
            <div className="dev-btn-text">
              <span className="dev-btn-primary">VISIT GITHUB PROFILE</span>
              <span className="dev-btn-sub">REPOSITORIES & ARCHITECTURE</span>
            </div>
            <ExternalLink size={16} className="dev-btn-arrow" />
          </a>
        </div>
      </div>

      {/* Developer Insights & Performance Grid (Positioned matching Channel stats) */}
      <div className="dev-insights-grid">
        <div className="dev-stat-card">
          <div className="stat-icon-wrapper tech-stack">
            <Cpu size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-number-row">
              <span className="stat-count-number">15</span>
              <span className="stat-count-suffix">+</span>
            </div>
            <span className="stat-label-text">Tech Stacks & Tools</span>
          </div>
        </div>

        <div className="dev-stat-card">
          <div className="stat-icon-wrapper architecture">
            <Layers size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-number-row">
              <span className="stat-count-number">100</span>
              <span className="stat-count-suffix">%</span>
            </div>
            <span className="stat-label-text">Modular Architecture</span>
          </div>
        </div>

        <div className="dev-stat-card">
          <div className="stat-icon-wrapper repositories">
            <GitBranch size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-number-row">
              <span className="stat-count-number">20</span>
              <span className="stat-count-suffix">+</span>
            </div>
            <span className="stat-label-text">Git Repos & Projects</span>
          </div>
        </div>
      </div>

      {/* 1. Skills Showcase */}
      <div className="dev-subsection" id="skills">
        <div className="subsection-header">
          <div className="subsection-title-wrap">
            <Layers size={20} className="subsection-icon dev-icon" />
            <h3 className="subsection-title">TECHNICAL SKILLS & PROFICIENCIES</h3>
          </div>
          <p className="subsection-subtitle">
            Database-driven competency catalog organized across full-stack software development.
          </p>
        </div>

        <SkillsGrid />
      </div>

      {/* 2. Featured Projects Showcase */}
      <div className="dev-subsection" id="projects">
        <div className="subsection-header">
          <div className="subsection-title-wrap">
            <Workflow size={20} className="subsection-icon dev-icon" />
            <h3 className="subsection-title">FEATURED PROJECTS & CASE STUDIES</h3>
          </div>
          <p className="subsection-subtitle">
            Explore selected production, backend, and frontend applications with source code and live previews.
          </p>
        </div>

        <ProjectsShowcase />
      </div>

      {/* 3. Published Software & Releases */}
      <div className="dev-subsection" id="published">
        <PublishedProjects />
      </div>
    </section>
  );
};

