// src/components/developer/DeveloperSection.jsx
import React from 'react';
import { 
  Terminal, 
  Cpu, 
  Workflow, 
  Layers, 
} from 'lucide-react';
import { SkillsGrid } from './SkillsGrid';
import { ProjectsShowcase } from './ProjectsShowcase';
import { PublishedProjects } from './PublishedProjects';


export const DeveloperSection = () => {
  

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

      {/* Developer Engineering Ethos & Stats Card */}
      <div className="dev-ethos-card">
        <div className="ethos-left">
          <div className="ethos-badge">
            <Cpu size={18} />
            <span>DEVELOPMENT PHILOSOPHY</span>
          </div>
          <h3 className="ethos-title">Clean Code. Scalable Architecture. Pragmatic Problem Solving.</h3>
          <p className="ethos-desc">
            I specialize in full-stack web applications, relational and document databases, object-oriented system modeling in Java, and reactive client interfaces in React. Every line of code is structured for readability, testability, and real-world utility.
          </p>
        </div>

        <div className="ethos-stats-grid">
          <div className="ethos-stat-box">
            <span className="stat-num">100%</span>
            <span className="stat-lbl">Curiosity & Dedication</span>
          </div>
          <div className="ethos-stat-box">
            <span className="stat-num">Full-Stack</span>
            <span className="stat-lbl">Web & Backend Engineering</span>
          </div>
          <div className="ethos-stat-box">
            <span className="stat-num">Open Source</span>
            <span className="stat-lbl">Community Mindset</span>
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
