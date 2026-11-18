import React from 'react';
import { ArrowDownRight, Mail, Moon, Sun } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';
import '../hero/HeroNavigation.css';

export const Navbar = () => {
  const { profile, siteSettings } = usePortfolio();
  const { theme, changeTheme } = useTheme();
  const isLight = theme === 'light';
  const ThemeIcon = isLight ? Moon : Sun;
  const nextTheme = isLight ? 'dark' : 'light';

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
          <button
            type="button"
            className="site-theme-control"
            onClick={() => changeTheme(nextTheme)}
            aria-label={`Switch to ${nextTheme} mode`}
          >
            <ThemeIcon size={16} aria-hidden="true" />
            {isLight ? 'Dark' : 'Light'}
          </button>
        </nav>
      </div>
    </header>
  );
};
