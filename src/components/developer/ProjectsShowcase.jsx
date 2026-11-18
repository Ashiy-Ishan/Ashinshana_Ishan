import React, { useState } from 'react';
import { 
  ExternalLink, 
  Calendar, 
  FolderGit2 
} from 'lucide-react';
import { Github } from '../common/Icons';
import { usePortfolio } from '../../context/PortfolioContext';

export const ProjectsShowcase = () => {
  const { projects } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web', 'Backend', 'Mobile', 'AI', 'IoT', 'Desktop', 'Other'];

  const publishedProjects = projects.filter((p) => p.published !== false);

  const getProjectCategories = (p) => {
    if (Array.isArray(p.categories) && p.categories.length > 0) {
      return p.categories;
    }
    if (p.category) {
      return p.category.split(',').map((c) => c.trim()).filter(Boolean);
    }
    return ['Web'];
  };

  const projectMatchesCategory = (project, cat) => {
    if (cat === 'All') return true;
    const cats = getProjectCategories(project);
    return cats.includes(cat);
  };

  const filteredProjects = publishedProjects.filter((p) => projectMatchesCategory(p, selectedCategory));

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'live':
        return 'status-live';
      case 'open source':
        return 'status-opensource';
      case 'released':
        return 'status-released';
      case 'in development':
        return 'status-dev';
      default:
        return 'status-general';
    }
  };

  return (
    <div className="projects-showcase-container">
      {/* Category Navigation Bar */}
      <div className="project-category-tabs" role="group" aria-label="Filter projects">
        {categories.map((cat) => {
          const count =
            cat === 'All'
              ? publishedProjects.length
              : publishedProjects.filter((p) => projectMatchesCategory(p, cat)).length;
          
          if (cat !== 'All' && count === 0) return null;

          return (
            <button
              key={cat}
              type="button"
              aria-pressed={selectedCategory === cat}
              className={`project-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span>{cat}</span>
              <span className="tab-badge">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="projects-editorial-grid">
        {filteredProjects.map((project) => {
          const image = project.imageUrl || project.image;

          return (
            <article
              key={project.id || project.title}
              className={`project-editorial-card ${project.featured ? 'featured-spotlight' : ''}`}
            >
              {image && (
                <div className="project-media-wrapper">
                  <img
                    key={image}
                    src={image}
                    alt=""
                    className="project-cover-image"
                    loading="lazy"
                    decoding="async"
                    onError={(event) => { event.currentTarget.hidden = true; }}
                  />
                </div>
              )}

              {/* Card Meta & Info */}
              <div className="project-info-wrapper">
                <div className="project-header-row">
                  <div className="public-card-tags">
                    {project.featured && <span className="spotlight-pill">Featured</span>}
                    {project.status && (
                      <span className={`status-pill ${getStatusBadgeClass(project.status)}`}>{project.status}</span>
                    )}
                  </div>
                  {project.date && (
                    <span className="project-date-tag">
                      <Calendar size={12} /> {project.date}
                    </span>
                  )}
                </div>

                <h3 className="project-headline">{project.title}</h3>
                
                <div className="public-card-tags project-categories">
                  {getProjectCategories(project).map((category) => (
                    <span key={category} className="project-category-tag">{category}</span>
                  ))}
                </div>

                <p className="project-summary">
                  {project.shortDescription || project.description}
                </p>

                {/* Technology Pills */}
                <div className="project-tech-stack">
                  {Array.isArray(project.technologies) &&
                    project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                </div>

                {/* Card Footer Links */}
                <div className="project-card-footer">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link source-link"
                    >
                      <Github size={15} />
                      <span>Source code</span>
                    </a>
                  )}

                  {(project.liveUrl || project.demoUrl) && (
                    <a
                      href={project.liveUrl || project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link demo-link"
                    >
                      <span>Live demo</span>
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="empty-projects-notice">
          <FolderGit2 size={36} className="empty-icon" />
          <h4>No projects matching this filter</h4>
          <p>Try selecting "All" to view the complete catalog.</p>
        </div>
      )}
    </div>
  );
};
