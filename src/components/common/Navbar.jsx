import React, { useRef, useState } from 'react';
import { Code2, Menu, User, Video, X } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';

const roleSections = {
  personal: [['About', 'about'], ['Currently', 'currently'], ['Achievements', 'achievements']],
  developer: [['Overview', 'developer'], ['Skills', 'skills'], ['Projects', 'projects'], ['Releases', 'published']],
  creator: [['Channel', 'creator'], ['Videos', 'videos']]
};

const views = [['personal', 'Personal', User], ['developer', 'Developer', Code2], ['creator', 'Creator', Video]];

export const Navbar = ({ activeSection = 'home', activeRole = 'personal', onSelectRole }) => {
  const { profile, siteSettings, publishedProjects } = usePortfolio();
  const { theme, changeTheme, themes } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButton = useRef(null);

  const showRoleContent = (activeRole !== 'developer' || siteSettings?.showDeveloperSection !== false) &&
    (activeRole !== 'creator' || siteSettings?.showCreatorSection !== false);
  const sections = showRoleContent ? roleSections[activeRole].filter(([, id]) => id !== 'published' || publishedProjects?.length) : [];
  const links = [['Home', 'home'], ...sections];
  if (siteSettings?.showContactForm !== false) links.push(['Contact', 'contact']);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const renderLink = ([label, id]) => (
    <a
      key={id}
      href={`#${id}`}
      className={`nav-link${activeSection === id ? ' active' : ''}`}
      aria-current={activeSection === id ? 'location' : undefined}
      onClick={closeMobileMenu}
    >
      {label}
    </a>
  );
  const renderTheme = () => (
    <label className="site-theme-control">
      <span>Theme</span>
      <select value={theme} onChange={(event) => changeTheme(event.target.value)}>
        {themes.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
      </select>
    </label>
  );

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && mobileMenuOpen) {
          closeMobileMenu();
          menuButton.current?.focus();
        }
      }}
    >
      <div className="header-container">
        <a href="#home" className="site-brand" onClick={closeMobileMenu}>
          <span className="site-brand-mark" aria-hidden="true">A</span>
          <span>{profile?.fullName || 'Ashinshana Ishan'}</span>
        </a>

        <div className="site-nav-desktop">
          <nav aria-label="Main navigation">{links.map(renderLink)}</nav>
          {renderTheme()}
        </div>

        <button
          ref={menuButton}
          type="button"
          className="mobile-toggle-btn"
          aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          aria-controls="mobile-navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="site-nav-mobile" id="mobile-navigation">
          <div className="site-mobile-views" role="group" aria-label="Portfolio view">
            {views.map(([id, label, Icon]) => (
              <button
                key={id}
                type="button"
                aria-pressed={activeRole === id}
                onClick={() => {
                  onSelectRole(id);
                  closeMobileMenu();
                  menuButton.current?.focus();
                }}
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>

          <nav aria-label="Mobile navigation">{links.map(renderLink)}</nav>
          {renderTheme()}
        </div>
      )}
    </header>
  );
};
