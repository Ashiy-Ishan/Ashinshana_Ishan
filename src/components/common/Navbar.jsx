import React from 'react';
import { ArrowDownRight, Mail } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';
import '../hero/HeroNavigation.css';

export const Navbar = () => {
  const { profile, siteSettings } = usePortfolio();
  const { theme, changeTheme, themes } = useTheme();

  return (
    <header className="site-header portfolio-header">
      <div className="header-container">
        <a href="#home" className="site-brand">
          <span className="site-brand-mark" aria-hidden="true">A</span>
          <span>{profile?.fullName || 'Ashinshana Ishan'}</span>
        </a>

        <nav className="portfolio-header-actions" aria-label="Quick navigation">
          <a className="portfolio-header-link" href="#portfolio-map">
            Explore map <ArrowDownRight size={15} aria-hidden="true" />
          </a>
          {siteSettings?.showContactForm !== false && (
            <a className="portfolio-header-link portfolio-header-contact" href="#contact">
              Contact <Mail size={15} aria-hidden="true" />
            </a>
          )}
          <label className="site-theme-control">
            <select aria-label="Theme" value={theme} onChange={(event) => changeTheme(event.target.value)}>
              {themes.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
            </select>
          </label>
        </nav>
      </div>
    </header>
  );
};
