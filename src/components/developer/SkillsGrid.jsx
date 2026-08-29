// src/components/developer/SkillsGrid.jsx
import React, { useState } from 'react';
import { Layers, Star, Sparkles } from 'lucide-react';
import { PremierePro, Photoshop } from '../common/Icons';
import ballerinaImg from '../../Iamage/ballerina.jpeg';
import { usePortfolio } from '../../context/PortfolioContext';

export const SkillsGrid = () => {
  const { skills } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Extract unique categories from actual skill items + defaults
  const categories = [
    'All',
    ...Array.from(new Set(skills.map((s) => s.category || 'Other')))
  ];

  const filteredSkills = skills.filter((skill) => {
    const matchCat = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchFeatured = !featuredOnly || skill.featured;
    return matchCat && matchFeatured;
  });

  const renderSkillIcon = (skill) => {
    const icon = (skill.icon || '').toLowerCase();
    const name = (skill.name || '').toLowerCase();

    if (skill.imageUrl || icon.includes('ballerina') || name.includes('ballerina')) {
      const imgSrc = skill.imageUrl || ballerinaImg;
      return (
        <img
          src={imgSrc}
          alt={skill.name || 'Ballerina'}
          className="skill-custom-img"
          style={{ width: '34px', height: '34px', objectFit: 'contain', borderRadius: '6px' }}
        />
      );
    }
    if (icon.includes('premiere') || name.includes('premiere')) {
      return <PremierePro size={32} />;
    }
    if (icon.includes('photoshop') || name.includes('photoshop')) {
      return <Photoshop size={32} />;
    }
    if (skill.icon && skill.icon.startsWith('devicon-')) {
      return <i className={`${skill.icon} colored dev-icon-render`} />;
    }
    return <Sparkles size={24} className="dev-icon-fallback" />;
  };

  return (
    <div className="skills-showcase-container">
      <div className="skills-control-bar">
        <div className="category-scroll-container">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cat-filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'All' && <Layers size={14} />}
              <span>{cat}</span>
              <span className="cat-count">
                {cat === 'All'
                  ? skills.length
                  : skills.filter((s) => s.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`featured-toggle-btn ${featuredOnly ? 'active' : ''}`}
          onClick={() => setFeaturedOnly(!featuredOnly)}
          title="Toggle Key Featured Technologies"
        >
          <Star size={14} className={featuredOnly ? 'fill-star' : ''} />
          <span>Featured Only</span>
        </button>
      </div>

      <div className="skills-cards-grid">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id || skill.name}
            className={`skill-card-modern ${skill.featured ? 'is-featured' : ''}`}
          >
            <div className="skill-card-header">
              <div className="skill-icon-wrapper">
                {renderSkillIcon(skill)}
              </div>
              <div className="skill-badges">
                {skill.featured && (
                  <span className="featured-pill" title="Core Primary Competency">
                    <Star size={11} className="fill-star" /> Featured
                  </span>
                )}
                {skill.level && (
                  <span className="level-pill">{skill.level}</span>
                )}
              </div>
            </div>

            <div className="skill-card-body">
              <h4 className="skill-name">{skill.name}</h4>
              <span className="skill-category-label">{skill.category}</span>
              {skill.description && (
                <p className="skill-desc-text">{skill.description}</p>
              )}
            </div>

            <div className="skill-card-hover-border" />
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="empty-state-notice">
          <p>No skills found in the selected category.</p>
        </div>
      )}
    </div>
  );
};
